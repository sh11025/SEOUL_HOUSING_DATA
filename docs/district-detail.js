// district-detail.js - 우리 동네(자치구) 통합 데이터 탐색 스크립트
(async () => {
  const [m, v, f] = await Promise.all([get('market'), get('vacancy'), get('forecast')]);
  const fmt = n => Math.round(Number(n || 0)).toLocaleString('ko-KR');
  const gus = [...new Set(m.map(x => x.guName))].sort((a, b) => a.localeCompare(b, 'ko'));
  const s = document.querySelector('#district-gu');
  const search = document.querySelector('#district-search');

  if (s) {
    s.innerHTML = gus.map(g => `<option>${g}</option>`).join('');
  }

  const actual = x => +(x.actualContractCount ?? x.contractCount ?? x.actual ?? x.currentContractCount ?? 0);
  const pred = x => +(x.predictedContractCount_2026_01 ?? 0);

  function draw(g) {
    if (!gus.includes(g)) return;

    if (s) s.value = g;
    if (search && document.activeElement !== search) search.value = g;

    renderDistrictMap('#district-map', gus, g, choose);

    const mr = m.filter(x => x.guName === g).sort((a, b) => String(a.yearMonth).localeCompare(String(b.yearMonth)));
    const vr = v.filter(x => x.guName === g).sort((a, b) => +a.year - +b.year);
    const last = mr.at(-1) || {};
    const vac = vr.find(x => +x.year === 2025) || {};
    const fc = f.find(x => x.guName === g) || {};

    const titleEl = document.querySelector('#district-title');
    if (titleEl) titleEl.textContent = `${g} 핵심 지표`;

    // 핵심 지표(KPI) 즉시 업데이트
    const kpisEl = document.querySelector('#district-kpis');
    if (kpisEl) {
      kpisEl.innerHTML = [
        ["2025 빈집", fmt(vac.total) + "호", vac.total, "호", ""],
        ["2025.12 임대차", fmt(last.contractCount) + "건", last.contractCount, "건", ""],
        ["2025.12 순이동", (last.netMove >= 0 ? '+' : '') + fmt(last.netMove) + "명", Math.abs(last.netMove || 0), "명", last.netMove >= 0 ? '+' : '-'],
        ["생활인구", fmt(last.avgLivingPop) + "명", Math.round(last.avgLivingPop || 0), "명", ""]
      ].map(x => `
        <div class="on" style="opacity:1!important;transform:none!important;">
          <span>${x[0]}</span>
          <b data-count="${x[2]}" data-suffix="${x[3]}" data-prefix="${x[4]}">${x[1]}</b>
        </div>
      `).join('');

      kpisEl.querySelectorAll('[data-count]').forEach(el => {
        el.dataset.animating = '0';
        el.dataset.counted = '0';
        animateCount(el, el.dataset.count, { suffix: el.dataset.suffix, prefix: el.dataset.prefix });
      });
    }

    // 월별 임대차 차트
    const vals = mr.map(x => +x.contractCount);
    const W = 1000, H = 330, P = 50;
    const max = Math.max(...vals), min = Math.min(...vals);
    const xx = i => P + i * (W - P * 2) / (mr.length - 1);
    const yy = n => H - P - (n - min) / (max - min || 1) * (H - P * 2);
    const pts = mr.map((x, i) => `${xx(i)},${yy(+x.contractCount)}`).join(' ');
    const ticks = [min, Math.round((min + max) / 2), max];

    const circleItems = mr.map((x, i) => {
      const ym = String(x.yearMonth);
      const yr = ym.slice(0, 4), mo = Number(ym.slice(5));
      const tip = `<strong>${yr}년 ${mo}월</strong><span>임대차 계약: <b>${fmt(x.contractCount)}건</b></span>`;
      return `<circle cx="${xx(i)}" cy="${yy(+x.contractCount)}" r="5" data-tooltip="${tip}" tabindex="0"><title>${yr}년 ${mo}월 · ${fmt(x.contractCount)}건</title></circle>`;
    }).join('');

    document.querySelector('#district-trend').innerHTML = `
      <div class="chart-header">
        <div>
          <strong>${g} 월별 계약 추이</strong>
          <span>2023.01–2025.12 · 단위: 건</span>
        </div>
        <div class="chart-legend">
          <span class="chart-legend-item legend-navy">임대차 계약</span>
        </div>
      </div>
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
        ${ticks.map(t => `<line x1="${P}" y1="${yy(t)}" x2="${W - P}" y2="${yy(t)}" class="district-grid"/><text x="${P - 8}" y="${yy(t) + 4}" text-anchor="end" class="axis-label">${fmt(t)}</text>`).join('')}
        <polyline points="${pts}" class="district-line"/>
        ${mr.filter((_, i) => i % 6 === 0 || i === mr.length - 1).map(x => {
          const i = mr.indexOf(x);
          return `<text x="${xx(i)}" y="${H - 10}" text-anchor="middle" class="axis-label" style="font-weight:600;">${String(x.yearMonth).slice(2)}</text>`;
        }).join('')}
        ${circleItems}
      </svg>`;
    bindTooltips(document.querySelector('#district-trend'));

    // 빈집 추이 막대
    const vm = Math.max(...vr.map(x => +x.total), 1);
    document.querySelector('#district-vacancy').innerHTML = vr.map(x => `
      <div>
        <span>${x.year}년</span>
        <b>${fmt(x.total)}호</b>
        <i style="width:${+x.total / vm * 100}%; --bar:${+x.total / vm * 100}%"></i>
      </div>`).join('');

    // AI 예측 카드
    const a = actual(fc), p = pred(fc), dif = p - a, rate = a ? dif / a * 100 : 0;
    const fcEl = document.querySelector('#district-forecast');
    if (fcEl) {
      fcEl.innerHTML = `
        <div><span>2025.12 실제</span><b id="df-actual" data-count="${a}">${fmt(a)}건</b></div>
        <em>→</em>
        <div class="future">
          <span>2026.01 AI 예측</span>
          <b id="df-pred" data-count="${p}">${fmt(p)}건</b>
          <small class="${dif >= 0 ? 'up' : 'down'}">${dif >= 0 ? '+' : ''}${fmt(dif)}건 · ${rate >= 0 ? '+' : ''}${rate.toFixed(1)}%</small>
        </div>`;
      const bPred = fcEl.querySelector('#df-pred');
      if (bPred) {
        bPred.dataset.animating = '0';
        bPred.dataset.counted = '0';
        animateCount(bPred, p, { suffix: '건' });
      }
      const bAct = fcEl.querySelector('#df-actual');
      if (bAct) {
        bAct.dataset.animating = '0';
        bAct.dataset.counted = '0';
        animateCount(bAct, a, { suffix: '건' });
      }
    }
  }

  function choose(g) {
    if (gus.includes(g)) {
      draw(g);
    }
  }

  renderDistrictMap('#district-map', gus, '강남구', choose);
  draw('강남구');

  if (s) {
    s.addEventListener('change', () => choose(s.value));
  }

  if (search) {
    const handleSearch = () => {
      const q = search.value.trim();
      const exact = gus.find(g => g === q);
      const partial = gus.find(g => g.includes(q));
      if (exact) {
        choose(exact);
      } else if (q.length >= 2 && partial) {
        choose(partial);
      }
    };
    search.addEventListener('input', handleSearch);
    search.addEventListener('change', handleSearch);
    search.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    });
  }
})();
