// market-detail.js - 서울 임대차 시장 상세 분석 스크립트
(async function(){
  const data = await get('market');
  const fmt0 = n => Number(n||0).toLocaleString('ko-KR');
  const gus = [...new Set(data.map(d=>d.guName))].sort((a,b)=>a.localeCompare(b,'ko'));

  const kpisEl = document.querySelector('#market-kpis');
  if (kpisEl) {
    kpisEl.innerHTML = [
      ['분석 기간', '36개월', '2023.01 — 2025.12', 36, '개월'],
      ['분석 지역', `${gus.length}개 자치구`, '서울 전 자치구', gus.length, '개 자치구'],
      ['구·월 관측치', `${fmt0(data.length)}개`, '25개 구 × 36개월', data.length, '개']
    ].map(x => `<div class="detail-kpi"><span>${x[0]}</span><b data-count="${x[3]}" data-suffix="${x[4]}">${x[1]}</b><small>${x[2]}</small></div>`).join('');
    kpisEl.querySelectorAll('[data-count]').forEach(el => animateCount(el, el.dataset.count, { suffix: el.dataset.suffix }));
  }

  const sel = document.querySelector('#market-gu');
  if (sel) {
    sel.innerHTML = gus.map(g => `<option>${g}</option>`).join('');
    sel.value = '강남구';
  }

  function lineChart(gu){
    const selectedGuEl = document.querySelector('#market-selected-gu');
    if (selectedGuEl) selectedGuEl.textContent = gu;

    const rows = data.filter(d=>d.guName===gu).sort((a,b)=>String(a.yearMonth).localeCompare(String(b.yearMonth)));
    const vals = rows.map(d=>+d.contractCount);
    const W = 1000, H = 340, P = 50;
    const max = Math.max(...vals), min = Math.min(...vals);
    const x = i => P + i * (W - P * 2) / (rows.length - 1);
    const y = v => H - P - (v - min) / (max - min || 1) * (H - P * 2);
    const pts = rows.map((d,i) => `${x(i)},${y(+d.contractCount)}`).join(' ');
    const ticks = [min, Math.round((min + max) / 2), max];

    // 연도 구분선 및 라벨 (2023: 0, 2024: 12, 2025: 24)
    const yearLabels = [
      { idx: 0, label: '2023년' },
      { idx: 12, label: '2024년' },
      { idx: 24, label: '2025년' }
    ];

    const circleItems = rows.map((d, i) => {
      const ymParts = String(d.yearMonth).split('-');
      const yr = ymParts[0];
      const mo = ymParts[1];
      const tipText = `<strong>${yr}년 ${mo}월</strong><span>임대차 계약: <b>${fmt0(d.contractCount)}건</b></span>`;
      return `<circle cx="${x(i)}" cy="${y(+d.contractCount)}" r="5" data-tooltip="${tipText}" tabindex="0"><title>${yr}년 ${mo}월 · ${fmt0(d.contractCount)}건</title></circle>`;
    }).join('');

    const yearTextSvg = yearLabels.map(item => {
      const xPos = x(item.idx);
      return `<line x1="${xPos}" y1="${H - P}" x2="${xPos}" y2="${H - P + 8}" stroke="#8b9098" stroke-width="1.5"/>
              <text x="${xPos + 6}" y="${H - P + 22}" class="axis-label" style="font-weight:700;fill:var(--navy);font-size:12px;">${item.label}</text>`;
    }).join('');

    document.querySelector('#market-line').innerHTML = `
      <div class="chart-header">
        <div>
          <strong>${gu} 월별 계약 추이</strong>
          <span>2023.01–2025.12 · 단위: 건</span>
        </div>
        <div class="chart-legend">
          <span class="chart-legend-item legend-orange">임대차 계약</span>
        </div>
      </div>
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
        ${ticks.map(t => `<line x1="${P}" y1="${y(t)}" x2="${W - P}" y2="${y(t)}" class="chart-grid"/><text x="${P - 8}" y="${y(t) + 4}" text-anchor="end" class="axis-label">${fmt0(t)}</text>`).join('')}
        ${yearTextSvg}
        <polyline points="${pts}" class="market-polyline"/>
        ${circleItems}
      </svg>`;

    bindTooltips(document.querySelector('#market-line'));
    requestAnimationFrame(() => document.querySelector('#market-line svg')?.classList.add('draw-on'));
  }

  const choose = g => {
    if (sel) sel.value = g;
    lineChart(g);
    renderDistrictMap('#market-district-map', gus, g, choose);
  };
  renderDistrictMap('#market-district-map', gus, '강남구', choose);
  lineChart('강남구');
  if (sel) sel.onchange = () => choose(sel.value);

  // 2025년 자치구 계약 순위 (표 막대 버그 수정: width와 --bar 모두 지정)
  const rows25 = gus.map(g => ({
    gu: g,
    total: data.filter(d => d.guName === g && String(d.yearMonth).startsWith('2025')).reduce((s, d) => s + (+d.contractCount || 0), 0)
  })).sort((a, b) => b.total - a.total);
  const max25 = rows25[0]?.total || 1;

  document.querySelector('#market-ranking').innerHTML = rows25.map((d, i) => `
    <div class="rank-row">
      <span class="rank-no">${String(i + 1).padStart(2, '0')}</span>
      <strong>${d.gu}</strong>
      <div class="rank-track"><i style="width:${d.total / max25 * 100}%; --bar:${d.total / max25 * 100}%;"></i></div>
      <b>${fmt0(d.total)}건</b>
    </div>`).join('');

  const avg = Math.round(rows25.reduce((s, d) => s + d.total, 0) / rows25.length);
  document.querySelector('#market-insight').innerHTML = `
    <span class="num">2025 INSIGHT</span>
    <h3>${rows25[0].gu}</h3>
    <div class="insight-big">${fmt0(rows25[0].total)}<small>건</small></div>
    <p>2025년 연간 임대차 계약 건수가 가장 많은 자치구입니다.</p>
    <hr>
    <span>자치구 평균</span>
    <b>${fmt0(avg)}건</b>
    <a href="district.html">우리 동네 비교하기 →</a>`;

  // 월별 전체 거래량 막대 그래프 (정상 출력 및 호버 툴팁)
  const monthTotals = {};
  data.forEach(d => monthTotals[d.yearMonth] = (monthTotals[d.yearMonth] || 0) + (+d.contractCount || 0));
  const months = Object.entries(monthTotals).sort(([a], [b]) => a.localeCompare(b));
  const maxM = Math.max(...months.map(x => x[1]), 1);

  document.querySelector('#market-month-bars').innerHTML = months.map(([ym, v], i) => {
    const yr = ym.slice(0, 4);
    const mo = ym.slice(5);
    const tip = `<strong>${yr}년 ${mo}월</strong><span>서울 전체 계약: <b>${fmt0(v)}건</b></span>`;
    return `
      <div class="market-month-item" data-tooltip="${tip}" tabindex="0">
        <div class="market-month-bar" style="height:${Math.max(16, v / maxM * 100)}%; --h:${Math.max(16, v / maxM * 100)}%;"></div>
        <span>${ym.endsWith('-01') ? ym.slice(2, 4) + '년' : mo}</span>
      </div>`;
  }).join('');
  bindTooltips(document.querySelector('#market-month-bars'));

  // DATA EXPLORER 테이블 필터
  // 자치구 선택 시 연도/월 필터를 무시하고 해당 구의 36개월 전체 데이터를 최신순으로 표시
  const fy = document.querySelector('#market-filter-year');
  const fm = document.querySelector('#market-filter-month');
  const fg = document.querySelector('#market-filter-gu');

  fm.innerHTML = '<option value="all">전체</option>' + Array.from({ length: 12 }, (_, i) => `<option value="${String(i + 1).padStart(2, '0')}">${i + 1}월</option>`).join('');
  fm.value = '12';
  fg.innerHTML = '<option value="all">전체</option>' + gus.map(g => `<option>${g}</option>`).join('');

  fg.addEventListener('change', () => {
    // 자치구를 특정 구로 선택하면 연도와 월을 전체(all)로 자동 설정하여 해당 구의 모든 기록을 보여줌
    if (fg.value !== 'all') {
      fy.value = 'all';
      fm.value = 'all';
    }
    table();
  });

  function table(){
    const y = fy.value;
    const m = fm.value;
    const g = fg.value;

    let rows;
    if (g !== 'all') {
      // 자치구가 선택되었을 때는 연도와 월을 무시하고 해당 구의 36개월 전체 관측치를 최신순으로 정렬
      rows = data.filter(d => d.guName === g)
        .sort((a, b) => String(b.yearMonth).localeCompare(String(a.yearMonth)));
    } else {
      // 전체 자치구일 때는 연도/월 필터 적용
      rows = data.filter(d =>
        (y === 'all' || String(d.yearMonth).startsWith(y)) &&
        (m === 'all' || String(d.yearMonth).slice(5, 7) === m)
      ).sort((a, b) => String(b.yearMonth).localeCompare(String(a.yearMonth)) || a.guName.localeCompare(b.guName, 'ko'));
    }

    const filterNotice = g !== 'all'
      ? `<strong>${g}</strong> 전체 기록 · 36개 관측치 (2023.01 ~ 2025.12)`
      : `선택 조건 · ${fmt0(rows.length)}개 관측치`;

    document.querySelector('#market-detail-table').innerHTML = `
      <div class="filtered-count">${filterNotice}</div>
      <table class="data-table">
        <thead>
          <tr>
            <th>자치구</th><th class="center-col">월</th><th>계약 건수</th><th>전입</th><th>전출</th><th>순이동</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((d, i) => `
            <tr style="--row: ${i}">
              <td>${d.guName}</td>
              <td class="center-col">${d.yearMonth}</td>
              <td><b>${fmt0(d.contractCount)}건</b></td>
              <td>${fmt0(d.moveIn)}명</td>
              <td>${fmt0(d.moveOut)}명</td>
              <td class="${+d.netMove >= 0 ? 'pop-plus' : 'pop-minus'}"><b>${+d.netMove >= 0 ? '+' : ''}${fmt0(d.netMove)}명</b></td>
            </tr>`).join('')}
        </tbody>
      </table>`;
    enhanceTables(document.querySelector('#market-detail-table'));
  }

  [fy, fm].forEach(e => e.addEventListener('change', () => {
    // 사용자가 연도나 월을 직접 변경했을 때 현재 자치구가 선택되어 있다면 그대로 필터 적용
    table();
  }));
  table();
})();
