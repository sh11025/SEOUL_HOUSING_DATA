// forecast-detail.js - 2026년 1월 AI 머신러닝 임대차 거래 예측 상세 분석
(async function () {
  const d = await get('forecast');
  const f = n => Math.round(Number(n || 0)).toLocaleString('ko-KR');
  const actual = x => +(x.actualContractCount ?? x.contractCount ?? x.actual ?? x.currentContractCount ?? 0);
  const pred = x => +(x.predictedContractCount_2026_01 ?? 0);
  const rows = d.map(x => ({ ...x, a: actual(x), p: pred(x) })).sort((a, b) => b.p - a.p);
  const top = rows[0], total = rows.reduce((s, x) => s + x.p, 0);
  const gus = [...rows].map(x => x.guName).sort((a, b) => a.localeCompare(b, 'ko'));

  const kpisEl = document.querySelector('#forecast-kpis');
  if (kpisEl) {
    kpisEl.innerHTML = [
      ['예측 시점', '2026년 1월', '1개월 선행 예측', null],
      ['예측 지역', `${rows.length}개 자치구`, '서울 전 자치구', rows.length, '개 자치구'],
      ['예측 계약 합계', `${f(total)}건`, '자치구 예측값 합계', total, '건']
    ].map(x => `
      <div class="detail-kpi">
        <span>${x[0]}</span>
        <b ${x[3] !== null ? `data-count="${x[3]}" data-suffix="${x[4]}"` : ''}>${x[1]}</b>
        <small>${x[2]}</small>
      </div>
    `).join('');
    kpisEl.querySelectorAll('[data-count]').forEach(el => animateCount(el, el.dataset.count, { suffix: el.dataset.suffix }));
  }

  // 랭킹 막대 그래프 (호버 시 선명한 배지 툴팁 표시)
  const max = Math.max(...rows.flatMap(x => [x.a, x.p]), 1);
  const rankEl = document.querySelector('#forecast-ranking');
  if (rankEl) {
    rankEl.innerHTML = rows.map((x, i) => {
      const diff = x.p - x.a, rate = x.a ? diff / x.a * 100 : 0;
      return `<div class="forecast-row">
        <span class="forecast-rank">${String(i + 1).padStart(2, '0')}</span><strong>${x.guName}</strong>
        <div class="forecast-bars">
          <i class="actual" style="width:${x.a / max * 100}%"><em>12월 실제: ${f(x.a)}건</em></i>
          <i class="pred" style="width:${x.p / max * 100}%"><em>1월 예측: ${f(x.p)}건</em></i>
        </div>
        <b class="${diff >= 0 ? 'up' : 'down'}">${diff >= 0 ? '▲' : '▼'} ${Math.abs(rate).toFixed(1)}%</b>
      </div>`;
    }).join('');
  }

  // 섹션 3: 자치구 도식 지도 및 포커스 카드 연동
  const sel = document.querySelector('#forecast-gu');
  const selectedGuLabel = document.querySelector('#forecast-selected-gu');

  function focus(g) {
    const x = rows.find(r => r.guName === g);
    if (!x) return;
    if (sel) sel.value = g;
    if (selectedGuLabel) selectedGuLabel.textContent = g;

    const diff = x.p - x.a, rate = x.a ? diff / x.a * 100 : 0;
    const focusEl = document.querySelector('#forecast-focus');
    if (!focusEl) return;

    focusEl.innerHTML = `
      <div class="focus-copy">
        <span>2026.01 FORECAST</span>
        <h3>${x.guName}</h3>
        <p>2025년 12월 실제 거래에서 다음 달 AI 예측으로 이어지는 변화를 보여줍니다.</p>
      </div>
      <div class="focus-compare-row">
        <div class="focus-number">
          <small>2025.12 실제</small>
          <b id="focus-actual" data-count="${x.a}">${f(x.a)}건</b>
          <span>실제 관측치</span>
        </div>
        <div class="focus-arrow">→</div>
        <div class="focus-number future">
          <small>2026.01 AI 예측</small>
          <b id="focus-pred" data-count="${x.p}">${f(x.p)}건</b>
          <span class="${diff >= 0 ? 'up' : 'down'}">${diff >= 0 ? '+' : ''}${f(diff)}건 · ${rate >= 0 ? '+' : ''}${rate.toFixed(1)}%</span>
        </div>
      </div>`;

    // 예측 숫자 카운트업 실행
    const predB = focusEl.querySelector('#focus-pred');
    if (predB) {
      predB.dataset.animating = '0';
      predB.dataset.counted = '0';
      animateCount(predB, x.p, { suffix: '건' });
    }
    const actualB = focusEl.querySelector('#focus-actual');
    if (actualB) {
      actualB.dataset.animating = '0';
      actualB.dataset.counted = '0';
      animateCount(actualB, x.a, { suffix: '건' });
    }
  }

  const choose = g => {
    focus(g);
    renderDistrictMap('#forecast-district-map', gus, g, choose);
  };

  if (sel) {
    sel.innerHTML = gus.map(name => `<option value="${name}">${name}</option>`).join('');
    sel.onchange = () => choose(sel.value);
  }

  renderDistrictMap('#forecast-district-map', gus, '강남구', choose);
  focus('강남구');

  const tableEl = document.querySelector('#forecast-table');
  if (tableEl) {
    tableEl.innerHTML = `
      <table class="data-table">
        <thead>
          <tr><th>순위</th><th>자치구</th><th>2025.12 실제</th><th>2026.01 예측</th><th>변화</th></tr>
        </thead>
        <tbody>
          ${rows.map((x, i) => {
            const diff = x.p - x.a;
            return `
              <tr>
                <td>${i + 1}</td>
                <td>${x.guName}</td>
                <td>${f(x.a)}건</td>
                <td><b>${f(x.p)}건</b></td>
                <td class="${diff >= 0 ? 'up' : 'down'}">${diff >= 0 ? '▲' : '▼'} ${f(Math.abs(diff))}건</td>
              </tr>`;
          }).join('')}
        </tbody>
      </table>`;
  }

  bindTooltips();
  enhanceTables();
})();
