const $=(s,e=document)=>e.querySelector(s), $$=(s,e=document)=>[...e.querySelectorAll(s)];
const fmt=n=>Number(n||0).toLocaleString('ko-KR');
async function get(name){const r=await fetch(`data/${name}.json`);if(!r.ok)throw new Error(`${name}.json 로드 실패: ${r.status}`);return r.json()}

const motionIO=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(!e.isIntersecting)return;
  e.target.classList.add('on');
  e.target.querySelectorAll?.('[data-count]').forEach(el=>countUp(el));
  motionIO.unobserve(e.target);
}),{threshold:.10,rootMargin:'0px 0px -8%'});
function observeMotion(root=document){
  const selector='.reveal,.section-head,.viz-panel,.detail-kpi,.insight-panel,.preview-card,.card,.district-kpis>div';
  const nodes=[...(root.matches?.(selector)?[root]:[]),...(root.querySelectorAll?.(selector)||[])];
  const vh = window.innerHeight || document.documentElement.clientHeight || 800;
  nodes.forEach((el,i)=>{
    if(el.dataset.motionBound)return;
    el.dataset.motionBound='1';
    el.style.setProperty('--stagger',`${Math.min(i%6,5)*55}ms`);
    // 뷰포트에 이미 들어와 있는 요소는 즉시 노출하여 텍스트 사라짐 방지
    const rect = el.getBoundingClientRect();
    if(rect.top < vh * 0.95 && rect.bottom > 0){
      el.classList.add('on');
      el.querySelectorAll?.('[data-count]').forEach(c=>countUp(c));
    } else {
      motionIO.observe(el);
    }
  });
}
function countUp(el){
  if(!el || el.dataset.counted==='1' || el.dataset.animating==='1') return;
  const end = Number(el.dataset.count);
  if(!Number.isFinite(end)) return;
  window.animateCount(el, end, {
    suffix: el.dataset.suffix || '',
    prefix: el.dataset.prefix || '',
    decimals: Number(el.dataset.decimals || 0)
  });
}
observeMotion();

const MAP_ROWS=[
 ['도봉구','노원구'],
 ['강북구','성북구','중랑구'],
 ['은평구','종로구','동대문구','광진구'],
 ['서대문구','중구','성동구','강동구'],
 ['마포구','용산구','송파구'],
 ['강서구','영등포구','동작구','서초구','강남구'],
 ['양천구','구로구','금천구','관악구']
];
function renderDistrictMap(root, gus, selected, onSelect){
  if(typeof root==='string') root=document.querySelector(root);
  if(!root) return;
  const allowed = new Set(gus);
  let html = '';
  MAP_ROWS.forEach((row, ri) => {
    if (ri === 5) {
      html += `<div class="district-map-river" title="한강 (Hangang River)"><span>한강</span></div>`;
    }
    html += `<div class="district-map-row row-${ri}">${row.filter(g=>allowed.has(g)).map(g=>`<button type="button" class="district-map-cell ${g===selected?'active':''}" data-gu="${g}">${g}</button>`).join('')}</div>`;
  });
  root.innerHTML = html;
  root.querySelectorAll('[data-gu]').forEach(b=>b.onclick=()=>{
    root.querySelectorAll('[data-gu]').forEach(x=>x.classList.toggle('active',x===b));
    onSelect?.(b.dataset.gu);
  });
}
window.renderDistrictMap=renderDistrictMap;

async function home(){
  const el=$('#home-stats'); if(!el)return; const s=await get('summary'); const v=s.vacancyTotal?.['2025']??126290;
  el.innerHTML=[['2025 서울 빈집',v,'호'],['분석 지역',s.districtCount||25,'개 자치구'],['분석 기간','2023—2025',''],['AI 예측','2026년 1월','']].map(x=>`<div class="stat"><small>${x[0]}</small><b ${typeof x[1]==='number'?`data-count="${x[1]}" data-suffix="${x[2]}"`:''}>${typeof x[1]==='number'?'0'+x[2]:x[1]}</b></div>`).join(''); observeMotion(el);
}
async function homeMiniVacancy(){const root=$('#vacancy-mini');if(!root)return;const s=await get('summary'),vals=[2023,2024,2025].map(y=>({y,v:+s.vacancyTotal?.[String(y)]})),max=Math.max(...vals.map(x=>x.v));root.innerHTML=vals.map((x,i)=>`<div class="mini-bar" style="height:${55+90*x.v/max}px;animation-delay:${i*.15}s"><span>${fmt(x.v)}</span><small>${x.y}</small></div>`).join('')}
home();homeMiniVacancy();


/* ===== 공유 인터랙션 시스템 ===== */
window.animateCount = function(el, target, opt={}){
  if(!el) return;
  // 이미 카운트가 완료되었거나 진행 중이면 중복 실행 차단
  if(el.dataset.animating==='1') return;

  const rawTarget = target !== undefined ? target : el.dataset.count;
  const end = Number(rawTarget) || 0;
  const duration = opt.duration ?? 820;
  const decimals = opt.decimals ?? 0;
  const prefix = opt.prefix ?? el.dataset.prefix ?? "";
  const suffix = opt.suffix ?? el.dataset.suffix ?? "";

  el.dataset.count = end;
  el.dataset.animating = '1';

  const render = v => {
    el.textContent = prefix + Number(v).toLocaleString("ko-KR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }) + suffix;
  };

  if(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches){
    render(end);
    el.dataset.animating = '0';
    el.dataset.counted = '1';
    return;
  }

  const start = 0;
  const t0 = performance.now();
  const tick = now => {
    const p = Math.min(1, (now - t0) / duration);
    const ease = 1 - Math.pow(1 - p, 3);
    const cur = decimals ? start + (end - start) * ease : Math.round(start + (end - start) * ease);
    render(cur);
    if(p < 1){
      requestAnimationFrame(tick);
    } else {
      render(end);
      el.dataset.animating = '0';
      el.dataset.counted = '1';
    }
  };
  requestAnimationFrame(tick);
};

window.observeCounts = function(root=document){
  const els=[...root.querySelectorAll("[data-count]")].filter(el=>el.dataset.counted!=='1');
  if(!els.length)return;
  const run=el=>animateCount(el,el.dataset.count,{
    prefix:el.dataset.prefix||"",suffix:el.dataset.suffix||"",
    decimals:Number(el.dataset.decimals||0)});
  if(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches){els.forEach(run);return}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){run(e.target);io.unobserve(e.target)}}),{threshold:.15});
  els.forEach(el=>io.observe(el));
};
window.getChartTooltip=function(){
  let t=document.querySelector(".chart-tooltip");
  if(!t){t=document.createElement("div");t.className="chart-tooltip";t.setAttribute("role","tooltip");document.body.appendChild(t)}
  return t;
};
window.bindTooltips=function(root=document){
  const t=getChartTooltip();
  root.querySelectorAll("[data-tooltip]").forEach(el=>{
    if(el.dataset.tooltipBound)return; el.dataset.tooltipBound="1";
    const show=()=>{const r=el.getBoundingClientRect();t.innerHTML=el.dataset.tooltip;
      t.style.left=(r.left+r.width/2)+"px";t.style.top=r.top+"px";t.classList.add("show")};
    const hide=()=>t.classList.remove("show");
    ["mouseenter","focus"].forEach(x=>el.addEventListener(x,show));
    ["mouseleave","blur"].forEach(x=>el.addEventListener(x,hide));
    el.addEventListener("click",()=>{show();setTimeout(hide,1600)});
  });
};
window.enhanceTables=function(root=document){
  root.querySelectorAll("table:not(.table-enhanced)").forEach(table=>{
    table.classList.add("table-enhanced","mobile-stack");
    const heads=[...table.querySelectorAll("thead th")];
    const headTexts=heads.map(x=>x.textContent.trim());

    table.querySelectorAll("tbody tr").forEach((tr,ri)=>{
      if(!tr.style.getPropertyValue('--row')) tr.style.setProperty('--row',ri);
      [...tr.children].forEach((td,i)=>td.dataset.label=headTexts[i]||"");
    });

    // 헤더 클릭 정렬 (Sorting) 기능
    heads.forEach((th,colIdx)=>{
      th.classList.add('sortable');
      th.setAttribute('title',`${th.textContent.trim()} 기준으로 정렬`);
      th.addEventListener('click',()=>{
        const tbody=table.querySelector('tbody');
        if(!tbody)return;
        const rows=[...tbody.querySelectorAll('tr')];
        const isAsc=th.classList.contains('sort-asc');

        heads.forEach(h=>h.classList.remove('sort-asc','sort-desc'));
        th.classList.add(isAsc?'sort-desc':'sort-asc');

        const parseVal=td=>{
          if(!td)return '';
          const txt=td.textContent.replace(/[,%\s호건명▲▼+]/g,'').trim();
          const num=Number(txt);
          return Number.isFinite(num)&&txt!==''?num:td.textContent.trim();
        };

        rows.sort((a,b)=>{
          const vA=parseVal(a.children[colIdx]);
          const vB=parseVal(b.children[colIdx]);
          if(typeof vA==='number'&&typeof vB==='number'){
            return isAsc?vB-vA:vA-vB;
          }
          const sA=String(vA),sB=String(vB);
          return isAsc?sB.localeCompare(sA,'ko'):sA.localeCompare(sB,'ko');
        });

        rows.forEach((tr,i)=>{
          tr.style.setProperty('--row',i);
          tbody.appendChild(tr);
        });
      });
    });
  });
};

// 스크롤 진행 바 (옵션 1: 자연스러운 휠 스크롤 연동)
function initScrollProgress(){
  let bar=document.querySelector('#scroll-progress-bar');
  if(!bar){
    bar=document.createElement('div');
    bar.id='scroll-progress-bar';
    bar.setAttribute('aria-hidden','true');
    document.body.appendChild(bar);
  }
  const update=()=>{
    const st=window.scrollY||document.documentElement.scrollTop;
    const dh=document.documentElement.scrollHeight-window.innerHeight;
    const p=dh>0?Math.min(100,Math.max(0,(st/dh)*100)):0;
    bar.style.width=p+'%';
  };
  window.addEventListener('scroll',update,{passive:true});
  update();
}
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',initScrollProgress);
}else{
  initScrollProgress();
}
window.initStoryProgress=function(){
  if(document.querySelector(".story-progress")) return;
  const sections=[...document.querySelectorAll("main section, .story-section")].filter((x,i,a)=>a.indexOf(x)===i);
  if(sections.length<2)return;
  sections.forEach((s,i)=>{s.classList.add("story-section");if(!s.id)s.id="story-section-"+(i+1)});
  const nav=document.createElement("nav");nav.className="story-progress";nav.setAttribute("aria-label","페이지 진행");
  sections.forEach((s,i)=>{
    const b=document.createElement("button");b.type="button";b.dataset.target=s.id;
    // 영문 eyebrow가 아닌 한글 제목(h1, h2, h3)을 우선 추출하여 한국어로 정제
    const heading = s.querySelector("h2, h1, h3");
    let label = "";
    if (heading) {
      label = (heading.innerText || heading.textContent || "").replace(/\s+/g, ' ').trim();
      if (label.includes("서울의 집은")) label = "도입";
      else if (label.includes("네 가지 흐름")) label = "주요 신호";
      else if (label.includes("흐름만 먼저")) label = "핵심 미리보기";
      else if (label.includes("데이터의 범위")) label = "데이터 범위";
      else if (label.includes("더 깊게")) label = "주제별 탐색";
      else if (label.includes("어디에 몰려")) label = "서울 빈집 개요";
      else if (label.includes("어떻게 변했을까")) label = "빈집 추이";
      else if (label.includes("어느 자치구에")) label = "자치구 순위";
      else if (label.includes("어디서 늘고")) label = "전년 대비 증감";
      else if (label.includes("어떤 주택")) label = "주택 유형";
      else if (label.includes("직접 확인") || label.includes("데이터를 직접")) label = "데이터 탐색";
      else if (label.includes("인구 이동")) label = "인구 이동 흐름";
      else if (label.includes("전입과 전출")) label = "순이동 비교";
      else if (label.includes("생활인구")) label = "생활인구 비교";
      else if (label.includes("우리 동네")) label = "우리 동네";
      else if (label.includes("AI 예측") || label.includes("예측 데이터")) label = "AI 예측";
      else if (label.length > 10) label = label.slice(0, 10) + '…';
    } else {
      label = `섹션 ${i+1}`;
    }
    b.textContent = label;
    b.onclick=()=>s.scrollIntoView({behavior:"smooth",block:"start"});
    nav.appendChild(b);
  });
  document.body.appendChild(nav);
  const buttons=[...nav.children];
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){
    buttons.forEach(b=>b.classList.toggle("active",b.dataset.target===e.target.id))}}),{rootMargin:"-35% 0px -55% 0px",threshold:0});
  sections.forEach(s=>io.observe(s));
};
// 상단 알약 내비게이션 페이지 간 슬라이딩 인디케이터 & 호버 연출
function initPillNavAnimation(){
  const nav=document.querySelector('.pill-nav');
  if(!nav) return;
  const links=[...nav.querySelectorAll('.pill-link')];
  if(!links.length) return;
  const activeLink=links.find(l=>l.classList.contains('active'))||links[0];

  let indicator=nav.querySelector('.pill-nav-indicator');
  if(!indicator){
    indicator=document.createElement('span');
    indicator.className='pill-nav-indicator';
    indicator.setAttribute('aria-hidden','true');
    nav.prepend(indicator);
  }
  nav.classList.add('has-indicator');

  const moveTo=(el,animate=true)=>{
    if(!el||!indicator) return;
    links.forEach(l=>l.classList.toggle('indicator-on', l===el));
    if(!animate){
      indicator.style.transition='none';
    } else {
      indicator.style.transition='';
    }
    const left=el.offsetLeft;
    const width=el.offsetWidth;
    indicator.style.transform=`translateX(${left}px)`;
    indicator.style.width=`${width}px`;
    indicator.style.opacity='1';
  };

  // 이전 페이지에서 클릭한 탭의 위치가 sessionStorage에 저장되어 있는지 확인
  let prevPos=null;
  try{
    const raw=sessionStorage.getItem('pill_nav_prev');
    if(raw) prevPos=JSON.parse(raw);
    sessionStorage.removeItem('pill_nav_prev');
  }catch(_e){}

  if(prevPos && Number.isFinite(prevPos.left) && Number.isFinite(prevPos.width)){
    // 이전 탭 위치에서 시작
    indicator.style.transition='none';
    indicator.style.transform=`translateX(${prevPos.left}px)`;
    indicator.style.width=`${prevPos.width}px`;
    indicator.style.opacity='1';
    void indicator.offsetWidth; // 강제 리플로우
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        moveTo(activeLink, true);
      });
    });
  } else {
    // 첫 진입 시 활성 탭 위치에 부드럽게 안착
    indicator.style.transition='none';
    moveTo(activeLink, false);
    void indicator.offsetWidth;
    requestAnimationFrame(()=>{
      indicator.style.transition='';
    });
  }

  // 마우스 호버 시 인디케이터 이동 및 벗어날 때 활성 탭으로 복귀
  links.forEach(l=>{
    l.addEventListener('mouseenter',()=>moveTo(l,true));
    l.addEventListener('click',()=>{
      // 클릭한 링크 위치를 저장하여 다음 페이지에서 슬라이드 시작점으로 사용
      try{
        sessionStorage.setItem('pill_nav_prev', JSON.stringify({
          left: l.offsetLeft,
          width: l.offsetWidth
        }));
      }catch(_e){}
      moveTo(l, true);
    });
  });

  nav.addEventListener('mouseleave',()=>moveTo(activeLink,true));

  window.addEventListener('resize',()=>{
    const curActive=links.find(l=>l.classList.contains('active'))||links[0];
    moveTo(curActive, false);
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  observeCounts();bindTooltips();enhanceTables();initStoryProgress();initPillNavAnimation();
});
if(document.readyState!=='loading'){
  initPillNavAnimation();
}

