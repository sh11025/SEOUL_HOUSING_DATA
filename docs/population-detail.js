// population-detail.js - 서울 인구 이동 상세 분석 스크립트
(async function(){
  const d = await get('market');
  const f = n => Number(n || 0).toLocaleString('ko-KR');
  const gus = [...new Set(d.map(x => x.guName))].sort((a, b) => a.localeCompare(b, 'ko'));

  const kpisEl = document.querySelector('#pop-kpis');
  if (kpisEl) {
    kpisEl.innerHTML = [
      ['분석 기간', '36개월', '2023.01 — 2025.12', 36, '개월'],
      ['분석 지역', gus.length + '개 자치구', '서울 전 자치구', gus.length, '개 자치구'],
      ['관측치', f(d.length) + '개', '자치구 × 월', d.length, '개']
    ].map(x => `<div class="detail-kpi"><span>${x[0]}</span><b data-count="${x[3]}" data-suffix="${x[4]}">${x[1]}</b><small>${x[2]}</small></div>`).join('');
    kpisEl.querySelectorAll('[data-count]').forEach(el => animateCount(el, el.dataset.count, { suffix: el.dataset.suffix }));
  }

  const s = document.querySelector('#pop-gu');
  if (s) {
    s.innerHTML = gus.map(g => `<option>${g}</option>`).join('');
    s.value = '강남구';
  }

  function draw(g){
    const r = d.filter(x => x.guName === g).sort((a, b) => String(a.yearMonth).localeCompare(String(b.yearMonth)));
    const W = 1000, H = 360, P = 50;
    const vals = r.flatMap(x => [+x.moveIn, +x.moveOut]);
    const min = Math.min(...vals), max = Math.max(...vals);
    const xx = i => P + i * (W - P * 2) / (r.length - 1);
    const yy = n => H - P - (n - min) / (max - min || 1) * (H - P * 2);
    const path = key => r.map((x, i) => `${i ? 'L' : 'M'} ${xx(i)} ${yy(+x[key])}`).join(' ');
    const ticks = [min, Math.round((min + max) / 2), max];

    const circleItems = r.map((x, i) => {
      const ymShort = String(x.yearMonth).slice(2); // '23-01'
      const inTip = `<strong>${ymShort} (${x.yearMonth})</strong><span>전입: <b>${f(x.moveIn)}명</b></span>`;
      const outTip = `<strong>${ymShort} (${x.yearMonth})</strong><span>전출: <b>${f(x.moveOut)}명</b></span>`;
      return `
        <circle cx="${xx(i)}" cy="${yy(+x.moveIn)}" r="5" class="pop-dot in" data-tooltip="${inTip}" tabindex="0"><title>${ymShort} 전입 ${f(x.moveIn)}명</title></circle>
        <circle cx="${xx(i)}" cy="${yy(+x.moveOut)}" r="5" class="pop-dot out" data-tooltip="${outTip}" tabindex="0"><title>${ymShort} 전출 ${f(x.moveOut)}명</title></circle>`;
    }).join('');

    // x축 하단 라벨 (연초 및 반기 시점 표기)
    const axisLabels = r.filter((_, i) => i % 6 === 0 || i === r.length - 1).map(x => {
      const i = r.indexOf(x);
      return `<text x="${xx(i)}" y="${H - 12}" text-anchor="middle" class="axis-label" style="font-weight:600;">${String(x.yearMonth).slice(2)}</text>`;
    }).join('');

    document.querySelector('#pop-flow').innerHTML = `
      <div class="chart-header">
        <div>
          <strong>${g} 월별 이동 흐름</strong>
          <span>2023.01–2025.12 · 단위: 명/월</span>
        </div>
        <div class="chart-legend">
          <span class="chart-legend-item legend-navy">전입</span>
          <span class="chart-legend-item legend-orange">전출</span>
        </div>
      </div>
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
        ${ticks.map(t => `<line x1="${P}" y1="${yy(t)}" x2="${W - P}" y2="${yy(t)}" class="pop-grid"/><text x="${P - 8}" y="${yy(t) + 4}" text-anchor="end" class="axis-label">${f(t)}</text>`).join('')}
        <path d="${path('moveIn')}" class="pop-line pop-in"/>
        <path d="${path('moveOut')}" class="pop-line pop-out"/>
        ${axisLabels}
        ${circleItems}
      </svg>`;
    bindTooltips(document.querySelector('#pop-flow'));
  }

  if (s) {
    draw(s.value);
    s.onchange = () => draw(s.value);
  }

  // 섹션 3: 2025년 순이동 랭킹 막대 차트 (막대 정상 출력: width와 --bar 모두 지정)
  const y25 = gus.map(g => {
    const r = d.filter(x => x.guName === g && String(x.yearMonth).startsWith('2025'));
    return { g, n: r.reduce((a, x) => a + (+x.netMove || 0), 0) };
  }).sort((a, b) => b.n - a.n);
  const m = Math.max(...y25.map(x => Math.abs(x.n)), 1);

  document.querySelector('#net-ranking').innerHTML = y25.map(x => `
    <div class="net-row">
      <strong>${x.g}</strong>
      <div class="net-axis">
        <i class="${x.n >= 0 ? 'plus' : 'minus'}" style="width:${Math.abs(x.n) / m * 48}%; --bar:${Math.abs(x.n) / m * 48}%;"></i>
      </div>
      <b class="${x.n >= 0 ? 'up' : 'down'}">${x.n >= 0 ? '+' : ''}${f(x.n)}</b>
    </div>`).join('');

  // 섹션 4: 생활인구 및 임대차 거래 표 (순이동 +면 빨간색 pop-plus, -면 파란색 pop-minus)
  const rows = gus.map(g => {
    const r = d.filter(x => x.guName === g && String(x.yearMonth).startsWith('2025'));
    return {
      g,
      p: r.reduce((a, x) => a + (+x.avgLivingPop || 0), 0) / (r.length || 1),
      c: r.reduce((a, x) => a + (+x.contractCount || 0), 0),
      n: r.reduce((a, x) => a + (+x.netMove || 0), 0)
    };
  }).sort((a, b) => b.p - a.p);

  document.querySelector('#living-table').innerHTML = `
    <table class="data-table">
      <thead>
        <tr><th>자치구</th><th>평균 생활인구</th><th>임대차 계약</th><th>순이동</th></tr>
      </thead>
      <tbody>
        ${rows.map((x, i) => `
          <tr style="--row: ${i}">
            <td>${x.g}</td>
            <td><b>${f(Math.round(x.p))}</b></td>
            <td>${f(x.c)}</td>
            <td class="${x.n >= 0 ? 'pop-plus' : 'pop-minus'}"><b>${x.n >= 0 ? '+' : ''}${f(x.n)}명</b></td>
          </tr>`).join('')}
      </tbody>
    </table>`;
  enhanceTables(document.querySelector('#living-table'));
})();
