
(async function(){
  const data = await get('vacancy');
  const fmt0 = n => Number(n||0).toLocaleString('ko-KR');
  const years = [2023,2024,2025];
  const byYear = y => data.filter(d => +d.year === +y);
  const totalYear = y => byYear(y).reduce((s,d)=>s+(+d.total||0),0);

  const totals = years.map(y=>({year:y,total:totalYear(y)}));
  const y25 = totalYear(2025), y24 = totalYear(2024);
  const change = y25-y24, rate=(change/y24*100);

  const kpisEl = document.querySelector('#vacancy-kpis');
  if (kpisEl) {
    kpisEl.innerHTML = [
      ['2025 서울 빈집', `${fmt0(y25)}호`, '서울 25개 자치구 합계', y25, '호', ''],
      ['전년 대비', `${change>=0?'+':''}${fmt0(change)}호`, `${rate>=0?'+':''}${rate.toFixed(1)}%`, Math.abs(change), '호', change>=0?'+':'-'],
      ['분석 지역', '25개 자치구', '2023—2025', null, '', ''],
    ].map(x=>`<div class="detail-kpi"><span>${x[0]}</span><b ${x[3]!==null?`data-count="${x[3]}" data-suffix="${x[4]}" data-prefix="${x[5]}"`:''}>${x[1]}</b><small>${x[2]}</small></div>`).join('');
    kpisEl.querySelectorAll('[data-count]').forEach(el=>animateCount(el,el.dataset.count,{suffix:el.dataset.suffix,prefix:el.dataset.prefix}));
  }

  const maxY=Math.max(...totals.map(d=>d.total));
  document.querySelector('#vacancy-year-chart').innerHTML = totals.map((d,i)=>`
    <div class="year-bar-item">
      <div class="year-value">${fmt0(d.total)}<small>호</small></div>
      <div class="year-bar-track">
        <div class="year-bar-fill" style="height:${d.total/maxY*100}%;animation-delay:${i*.12}s" title="${d.year}: ${fmt0(d.total)}호"></div>
      </div>
      <strong>${d.year}</strong>
    </div>`).join('');

  function ranking(year){
    const rows=byYear(year).sort((a,b)=>b.total-a.total);
    const max=rows[0].total;
    document.querySelector('#vacancy-ranking').innerHTML=rows.map((d,i)=>`
      <div class="rank-row">
        <span class="rank-no">${String(i+1).padStart(2,'0')}</span>
        <strong>${d.guName}</strong>
        <div class="rank-track"><i style="width:${d.total/max*100}%"></i></div>
        <b>${fmt0(d.total)}호</b>
      </div>`).join('');
    const top=rows[0], avg=Math.round(rows.reduce((s,d)=>s+d.total,0)/rows.length);
    document.querySelector('#vacancy-insight').innerHTML=`
      <span class="num">${year} INSIGHT</span>
      <h3>${top.guName}</h3>
      <div class="insight-big">${fmt0(top.total)}<small>호</small></div>
      <p>${year}년 서울에서 빈집 수가 가장 많은 자치구입니다.</p>
      <hr><span>자치구 평균</span><b>${fmt0(avg)}호</b>
      <a href="district.html">우리 동네 자세히 보기 →</a>`;
  }
  ranking(2025);
  document.querySelectorAll('.year-switch:not(#vacancy-diff-switch) button').forEach(b=>b.onclick=()=>{
    document.querySelectorAll('.year-switch:not(#vacancy-diff-switch) button').forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); ranking(+b.dataset.year);
  });

  // 전년 대비 증감 함수 (2024->2025 및 2023->2024 지원)
  function renderChange(fromY, toY){
    const mBase=new Map(byYear(fromY).map(d=>[d.guName,+d.total]));
    const changes=byYear(toY).map(d=>({gu:d.guName,diff:+d.total-(mBase.get(d.guName)||0)}))
      .sort((a,b)=>b.diff-a.diff);
    const maxAbs=Math.max(...changes.map(d=>Math.abs(d.diff)),1);
    const el = document.querySelector('#vacancy-change');
    if (el) {
      el.innerHTML=changes.map(d=>`
        <div class="change-row">
          <strong>${d.gu}</strong>
          <div class="change-axis">
            <span class="zero"></span>
            <i class="${d.diff>=0?'plus':'minus'}" style="width:${Math.abs(d.diff)/maxAbs*48}%;--bar:${Math.abs(d.diff)/maxAbs*48}%"></i>
          </div>
          <b class="${d.diff>=0?'up':'down'}">${d.diff>=0?'▲':'▼'} ${fmt0(Math.abs(d.diff))}</b>
        </div>`).join('');
    }
    const descEl = document.querySelector('#vacancy-diff-desc');
    if (descEl) {
      descEl.textContent = `${fromY}년 대비 ${toY}년으로 변화한 빈집 수를 자치구별로 비교합니다.`;
    }
  }
  renderChange(2024, 2025);

  const diffSwitch = document.querySelector('#vacancy-diff-switch');
  if (diffSwitch) {
    diffSwitch.querySelectorAll('button').forEach(btn=>{
      btn.onclick=()=>{
        diffSwitch.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        if (btn.dataset.diff === '2023-2024') {
          renderChange(2023, 2024);
        } else {
          renderChange(2024, 2025);
        }
      };
    });
  }

  const types=[
    ['detached','단독주택'],['apartment','아파트'],['rowHouse','연립주택'],
    ['multiFamily','다세대주택'],['nonResidential','비주거용']
  ];
  const typeTotals=types.map(([key,label])=>({
    key,label,value:byYear(2025).reduce((s,d)=>s+(+d[key]||0),0)
  }));
  const maxT=Math.max(...typeTotals.map(d=>d.value),1);
  document.querySelector('#vacancy-type-bars').innerHTML=typeTotals.map(d=>`
    <div class="type-row"><strong>${d.label}</strong><div><i style="width:${d.value/maxT*100}%;--bar:${d.value/maxT*100}%"></i></div><b>${fmt0(d.value)}호</b></div>`).join('');
  document.querySelector('#vacancy-type-cards').innerHTML=typeTotals.map(d=>`
    <div class="type-card"><span>${d.label}</span><b>${(d.value/y25*100).toFixed(1)}%</b><small>${fmt0(d.value)}호</small></div>`).join('');

  const search=document.querySelector('#vacancy-search');
  function table(q=''){
    const rows=byYear(2025).filter(d=>d.guName.includes(q)).sort((a,b)=>b.total-a.total);
    const tbodyHtml = rows.length > 0
      ? rows.map((d, i)=>`<tr style="--row: ${i}"><td>${d.guName}</td><td><b>${fmt0(d.total)}호</b></td><td>${fmt0(d.apartment)}호</td><td>${fmt0(d.multiFamily)}호</td><td>${fmt0(d.detached)}호</td><td>${fmt0(d.rowHouse)}호</td></tr>`).join('')
      : `<tr><td colspan="6" style="text-align:center;padding:32px 16px;color:var(--muted);font-size:14px;">검색 결과가 없습니다. 자치구명을 다시 확인해주세요.</td></tr>`;
    document.querySelector('#vacancy-detail-table').innerHTML=`
      <table class="data-table"><thead><tr><th>자치구</th><th>전체 빈집</th><th>아파트</th><th>다세대</th><th>단독</th><th>연립</th></tr></thead>
      <tbody>${tbodyHtml}</tbody></table>`;
    enhanceTables(document.querySelector('#vacancy-detail-table'));
  }
  table();
  if (search) search.oninput=e=>table(e.target.value.trim());
})();
