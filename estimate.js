// A local, editable estimate. Prices and availability are a saved data snapshot.
const estimateStates = {};
const estimateNumber = value => /^\d[\d,]*$/.test(String(value || '').trim()) ? Number(String(value).replace(/,/g,'')) : null;
const estimateMoney = value => Math.round(value).toLocaleString('ko-KR') + '원';

function estimateLineups(car, power) {
    const dedicated = car.danawaOptionIds?.[power];
    const modelId = dedicated || car.danawaId;
    let list = modelId ? (collectedOptions[modelId] || []) : [];
    if (power && !dedicated) {
        if (/하이브리드/.test(power)) list = list.filter(row => /하이브리드|hybrid/i.test(row.label));
        else if (/전기/.test(power)) list = list.filter(row => /전기|electric|\bEV\b/i.test(row.label));
        else list = list.filter(row => !/하이브리드|hybrid|전기|electric|\bEV\b/i.test(row.label));
    }
    return list.filter((row,i,all) => row.trims.some(t => estimateNumber(t.price) !== null) && all.findIndex(other => other.label === row.label && JSON.stringify(other.trims) === JSON.stringify(row.trims)) === i);
}
function estimateState(car) {
    if (!estimateStates[car.id]) {
        const power = car.variants ? (powerSelection[car.id] || Object.keys(car.variants)[0]) : '';
        const selected = car.variants ? car.variants[power] : car.naver;
        const oldKey = selectedModelYears[car.id + '|' + power];
        const oldId = selected?.source?.match(/car_\d+/)?.[0];
        const old = oldId && (expandedHistoryById[oldId] || []).find(row => row.modelId === oldKey);
        const year = oldKey?.match(/^danawa-year-(\d{4})$/)?.[1] || old?.year || selected?.year;
        const lineups = estimateLineups(car,power);
        const yearIndex = year ? lineups.findIndex(row => row.label.includes(year + '년형')) : -1;
        estimateStates[car.id] = {power, lineup: Math.max(0, yearIndex), trim:0, options:[], colorName:'', includeColor:false, colorPrice:'', downPayment:'', annualRate:'', months:'36', manualPrice:'', discount:'', subsidy:'', taxRate:car.size === '경형' ? '4' : /트럭|버스/.test(car.type) ? '5' : '7', taxBase:'', taxRelief:'', registration:'', bondMode:'discount', bondCost:'', other:'', region:''};
    }
    return estimateStates[car.id];
}
function estimateTotals(state, trim) {
    const base = trim ? estimateNumber(trim.price) : estimateNumber(state.manualPrice);
    const selectedOptions = (trim?.options || []).filter((_,i) => state.options.includes(i));
    const optionTotal = selectedOptions.reduce((sum,option) => sum + (estimateNumber(option.price) || 0),0);
    const colorTotal = state.includeColor ? (estimateNumber(state.colorPrice) || 0) : 0;
    const requestedDiscount = estimateNumber(state.discount) || 0;
    const discount = base === null ? requestedDiscount : Math.min(requestedDiscount,base + optionTotal + colorTotal);
    const subtotal = base === null ? null : Math.max(0,base + optionTotal + colorTotal - discount);
    const requestedSubsidy = estimateNumber(state.subsidy) || 0;
    const subsidy = subtotal === null ? requestedSubsidy : Math.min(requestedSubsidy,subtotal);
    const customTaxBase = estimateNumber(state.taxBase);
    const taxBase = customTaxBase !== null ? customTaxBase : subtotal === null ? null : Math.round(subtotal / 1.1);
    const grossTax = taxBase === null ? null : Math.floor((taxBase * Number(state.taxRate) / 100) / 10) * 10;
    const relief = estimateNumber(state.taxRelief) || 0;
    const tax = grossTax === null ? null : Math.max(0,grossTax - relief);
    const extras = ['registration','bondCost','other'].reduce((sum,key) => sum + (estimateNumber(state[key]) || 0),0);
    const total = subtotal === null ? null : Math.max(0,subtotal - subsidy) + tax + extras;
    return {base,optionTotal,colorTotal,discount,subsidy,subtotal,taxBase,grossTax,tax,relief,extras,total};
}
function estimateFinance(state, total) {
    const down = estimateNumber(state.downPayment) || 0;
    const annual = state.annualRate === '' ? null : Number(state.annualRate);
    const months = Number(state.months);
    if (total === null || annual === null || !Number.isFinite(annual) || annual < 0 || annual > 100 || !Number.isInteger(months) || months < 1 || down > total) return null;
    const principal = total - down, rate = annual / 1200;
    const payment = rate === 0 ? principal / months : principal * rate / (1 - Math.pow(1 + rate, -months));
    return { principal, payment, interest: Math.max(0, payment * months - principal) };
}
function estimate(id) {
    const car = cars.find(c => c.id === id);
    if (!car) return '<div class="page"><h1>차량을 찾을 수 없습니다</h1><a class="link" href="#explore">차량 탐색으로 돌아가기 ↗</a></div>';
    if (car.classic) return '<div class="page"><h1>신차 견적을 제공하지 않습니다</h1><p class="sub">국내 판매가 종료된 차량입니다.</p><a class="link" href="#car/'+esc(car.id)+'">차량 상세로 돌아가기 ↗</a></div>';
    const state = estimateState(car), lineups = estimateLineups(car,state.power);
    state.lineup = Math.min(state.lineup,Math.max(lineups.length-1,0));
    const lineup = lineups[state.lineup];
    state.trim = Math.min(state.trim,Math.max((lineup?.trims.length || 1)-1,0));
    let trim = lineup?.trims[state.trim];
    if (trim && estimateNumber(trim.price) === null) trim = null;
    const total = estimateTotals(state,trim);
    const input = (name,label,help,placeholder='0') => '<label class="estimate-field"><span>'+esc(label)+'</span><div class="estimate-input"><input type="number" name="'+name+'" min="0" step="1" inputmode="numeric" placeholder="'+placeholder+'" value="'+esc(state[name])+'"><b>원</b></div>'+(help?'<small>'+esc(help)+'</small>':'')+'</label>';
    const selectPowers = car.variants ? '<label class="estimate-field"><span>동력</span><select name="power">'+Object.keys(car.variants).map(p=>'<option '+(p===state.power?'selected':'')+'>'+esc(p)+'</option>').join('')+'</select></label>' : '';
    const lineupSelect = lineups.length ? '<label class="estimate-field"><span>연식과 라인업</span><select name="lineup">'+lineups.map((row,i)=>'<option value="'+i+'" '+(i===state.lineup?'selected':'')+'>'+esc(row.label || '라인업 '+(i+1))+'</option>').join('')+'</select></label><label class="estimate-field"><span>트림</span><select name="trim">'+lineup.trims.map((row,i)=>'<option value="'+i+'" '+(i===state.trim?'selected':'')+'>'+esc(row.name.replace(/\s+/g,' '))+' · '+esc(displayOptionPrice(row.price,'가격 확인 필요'))+'</option>').join('')+'</select></label>' : '';
    const isColorOption = option => /^(?:2\s*톤|투톤)\s*컬러/.test((option.name || '').trim());
    const optionRows = (trim?.options || []).map((option, index) => ({option, index}));
    const colorOptions = optionRows.filter(row => isColorOption(row.option));
    const ordinaryOptions = optionRows.filter(row => !isColorOption(row.option));
    const renderOption = ({option, index}) => { const price=estimateNumber(option.price); return '<label class="estimate-option"><input type="checkbox" name="option" value="'+index+'" '+(state.options.includes(index)?'checked':'')+' '+(price===null?'disabled':'')+'><span><b>'+esc(option.name)+'</b>'+(option.details?.length?'<small>'+esc(option.details.join(' · '))+'</small>':'')+'</span><strong>'+esc(displayOptionPrice(option.price,'가격 미확인'))+'</strong></label>'; };
    const options = ordinaryOptions.length ? '<div class="estimate-option-list">'+ordinaryOptions.map(renderOption).join('')+'</div><p class="estimate-hint">옵션 간 중복·필수 조합은 자동 검증되지 않습니다.</p>' : '<p class="estimate-hint">수집된 선택 품목이 없습니다. 실제 품목은 가격표를 확인하세요.</p>';
    const selectedData = car.variants ? car.variants[state.power] : car.naver;
    const sourceId = selectedData?.source?.match(/car_\d+/)?.[0];
    const lineupYear = lineup?.label?.match(/(19\d{2}|20\d{2})년형/)?.[1];
    const matchesYear = !lineupYear || String(selectedData?.year || '') === lineupYear;
    const colors = matchesYear && sourceId ? (vehicleMedia[sourceId]?.colors || []) : [];
    const colorSelect = colors.length ? '<label class="estimate-field"><span>외장 색상</span><select name="colorName"><option value="">선택 안 함</option>' + colors.map(color => '<option value="' + esc(color.name) + '" ' + (state.colorName === color.name ? 'selected' : '') + '>' + esc(color.name) + '</option>').join('') + '</select></label>' : '<p class="estimate-hint">선택한 연식의 색상 정보는 확인하지 못했습니다.</p>';
    const colorControls = '<div class="estimate-color"><h3>외장 색상</h3>' + colorSelect + (colorOptions.length ? '<p class="estimate-hint">가격표에서 확인된 색상 관련 선택 품목</p><div class="estimate-option-list">' + colorOptions.map(renderOption).join('') + '</div>' : '') + '<label class="estimate-color-check"><input type="checkbox" name="includeColor" ' + (state.includeColor ? 'checked' : '') + '> 색상 추가금 반영</label>' + (state.includeColor ? input('colorPrice','색상 추가금','가격표를 확인해 직접 입력하세요. 선택 품목과 중복 입력하지 않도록 확인하세요.') : '') + '<p class="estimate-hint">색상별 추가금은 자동 확인되지 않으며, 미입력 시 0원으로 계산됩니다.</p></div>';
    const finance = estimateFinance(state,total.total);
    const financeSection = '<section class="estimate-section"><div class="estimate-step">05</div><h2>할부 계산기</h2><p class="estimate-hint">예상 구매 합계에서 선수금을 빼고 나머지를 원리금 균등으로 나누어 계산합니다.</p><div class="estimate-fields">' + input('downPayment','선수금','') + '<label class="estimate-field"><span>연 금리</span><div class="estimate-input"><input type="number" name="annualRate" min="0" max="100" step="0.01" inputmode="decimal" value="' + esc(state.annualRate) + '" placeholder="0"><b>%</b></div></label><label class="estimate-field"><span>할부 기간</span><select name="months">' + [12,24,36,48,60,72].map(n => '<option value="' + n + '" ' + (String(n) === String(state.months) ? 'selected' : '') + '>' + n + '개월</option>').join('') + '</select></label></div><div class="finance-result"><span>예상 월 납입액</span><strong data-finance="payment">' + (finance ? estimateMoney(finance.payment) : '금리와 견적을 입력하세요') + '</strong><small data-finance="detail">' + (finance ? '할부 원금 ' + estimateMoney(finance.principal) + ' · 예상 총이자 ' + estimateMoney(finance.interest) : '선수금은 합계를 넘을 수 없습니다.') + '</small></div><p class="estimate-hint">단순 예상치이며 금융사 수수료·중도상환비용 등은 포함하지 않습니다.</p></section>';
    const numberOrDash = value => value === null ? '가격 입력 필요' : estimateMoney(value);
    const summaryRows = [['차량 기본 가격',total.base],['선택 옵션',total.optionTotal],['차량 할인',-total.discount],['보조금',-total.subsidy],['취득세',total.tax],['등록비·공채 등',total.extras]];
    return '<div class="page estimate-page"><div class="breadcrumbs"><a href="#explore">자동차 탐색</a> / <a href="#car/'+esc(car.id)+'">'+esc(car.name)+'</a> / 견적</div><div class="estimate-heading"><div><div class="eyebrow">BUILD YOUR ESTIMATE</div><h1 class="page-title">내 차 견적 만들기</h1><p class="sub">'+esc(car.brand+' '+car.name)+' · 트림과 비용을 선택해 예상 금액을 확인하세요.</p></div><a class="outline estimate-back" href="#car/'+esc(car.id)+'">차량 상세로</a></div><div class="estimate-notice">가격표는 저장된 자료이며 실제 판매 여부와 가격은 달라질 수 있습니다. 이전 연식의 가격표도 선택할 수 있습니다.</div><form id="estimate-form" data-estimate-id="'+esc(car.id)+'"><div class="estimate-layout"><div class="estimate-main"><section class="estimate-section"><div class="estimate-step">01</div><h2>차량 선택</h2>'+selectPowers+lineupSelect+(trim ? '<p class="estimate-base-price">선택 트림 <strong>'+estimateMoney(total.base)+'</strong></p>' : input('manualPrice','차량 기본 가격','확인된 트림 가격이 없어 직접 입력합니다.'))+'<p class="estimate-hint">가격표 확인일 2026.11.17 · 연식, 트림 및 세제혜택 조건에 따라 금액이 달라집니다.</p></section><section class="estimate-section"><div class="estimate-step">02</div><h2>옵션 선택</h2>'+options+colorControls+'</section><section class="estimate-section"><div class="estimate-step">03</div><h2>할인과 보조금</h2><div class="estimate-fields">'+input('discount','차량 할인','차량 가격에서 차감합니다.')+input('subsidy','전기차 등 구매 보조금','확정된 금액을 직접 입력하세요.')+'</div></section><section class="estimate-section"><div class="estimate-step">04</div><h2>취득세와 등록비</h2><div class="estimate-fields"><label class="estimate-field"><span>등록 지역</span><select name="region"><option value="">선택 안 함</option>'+['서울','부산','대구','인천','광주','대전','울산','세종','경기','강원','충북','충남','전북','전남','경북','경남','제주'].map(r=>'<option '+(state.region===r?'selected':'')+'>'+r+'</option>').join('')+'</select><small>공채와 수수료는 지역별로 달라 직접 입력합니다.</small></label><label class="estimate-field"><span>취득세율</span><select name="taxRate">'+[['7','7% · 비영업 승용'],['4','4% · 경차 또는 영업용'],['5','5% · 비영업 승합·화물']].map(([rate,label])=>'<option value="'+rate+'" '+(state.taxRate===rate?'selected':'')+'>'+label+'</option>').join('')+'</select><small>차량의 실제 등록 용도와 분류를 확인하세요.</small></label>'+input('taxBase','과세표준 직접 입력','비우면 차량 가격에서 부가가치세를 제외한 금액으로 계산합니다.','자동 계산')+input('taxRelief','취득세 감면액','적용 대상과 감면액을 확인해 입력하세요.')+input('registration','등록 수수료·번호판 비용','합산 금액을 입력하세요.')+'<label class="estimate-field"><span>공채 처리 방식</span><select name="bondMode"><option value="discount" '+(state.bondMode==='discount'?'selected':'')+'>즉시 매도 · 할인 비용</option><option value="hold" '+(state.bondMode==='hold'?'selected':'')+'>매입 후 보유 · 매입 금액</option></select><small>매입 금액과 즉시 매도 비용은 서로 다릅니다.</small></label>'+input('bondCost',state.bondMode==='hold'?'공채 매입 금액':'공채 할인 비용','지역과 적용일 기준 금액을 입력하세요.')+input('other','기타 비용','탁송료 등 추가 비용을 입력하세요.')+'</div><p class="estimate-hint">보조금은 차량 대금에서만 차감하며 과세표준에는 자동 반영하지 않습니다. 실제 취득세 과표는 등록기관에서 확인하세요.</p><div class="estimate-sources"><a href="https://www.suwon.go.kr/sw-www/deptHome/dep_traffic/traffic05/traffic05-04/traffic05-04-02.jsp" target="_blank" rel="noopener noreferrer">과세표준 안내 ↗</a><a href="https://www.ulsan.go.kr/s/vehicle/contents.ulsan?mId=001006001000000000" target="_blank" rel="noopener noreferrer">차종별 취득세율 ↗</a><a href="https://www.car365.go.kr/ccpt/schdcar/trde/regCstCalcView.do" target="_blank" rel="noopener noreferrer">지역별 등록비용 확인 ↗</a></div></section>'+financeSection+'</div><aside class="estimate-summary"><div class="eyebrow">ESTIMATE SUMMARY</div><h2>예상 구매 비용</h2><p>'+esc(car.brand+' '+car.name)+'</p><div class="estimate-summary-rows">'+summaryRows.map(([label,value],i)=>'<div><span>'+label+'</span><strong data-estimate-value="'+['base','optionTotal','colorTotal','discount','subsidy','tax','extras'][i]+'">'+(value===null?'가격 입력 필요':(value<0?'- ':'')+estimateMoney(Math.abs(value)))+'</strong></div>').join('')+'</div><div class="estimate-total"><span>입력 기준 예상 합계</span><strong data-estimate-value="total">'+numberOrDash(total.total)+'</strong></div><p class="estimate-hint" data-estimate-missing>등록비·공채·감면액 중 입력하지 않은 항목은 합계에 포함되지 않습니다.</p><div class="estimate-tax-detail">취득세 과세표준 <b data-estimate-value="taxBase">'+numberOrDash(total.taxBase)+'</b><br>감면 전 취득세 <b data-estimate-value="grossTax">'+numberOrDash(total.grossTax)+'</b></div><button type="button" class="outline estimate-print" data-estimate-print>견적 인쇄 / PDF 저장</button></aside></div></form></div>';
}

const detailBeforeEstimate = detail;
detail = function(id) {
    const html = detailBeforeEstimate(id), car = cars.find(c => c.id === id);
    if (!car) return html;
    const template = document.createElement('template');
    template.innerHTML = html;
    const root = template.content;
    const top = root.querySelector('.detail-top');
    const summary = top?.lastElementChild;
    const priceLine = summary?.querySelector('p.sub');
    if (priceLine) {
        const match = priceLine.textContent.trim().match(/^(.*?년형)\s*·\s*(.+)$/);
        if (match) {
            priceLine.classList.add('detail-price-line');
            priceLine.textContent = '';
            const yearText = document.createElement('span');
            yearText.className = 'detail-price-year';
            yearText.textContent = match[1];
            const priceText = document.createElement('strong');
            priceText.className = 'detail-price-amount';
            priceText.textContent = match[2];
            priceLine.append(yearText, priceText);
        }
    }
    const visual = top?.firstElementChild;
    if (visual) {
        visual.classList.add('detail-brand-visual');
        const badge = document.createElement('button');
        badge.type = 'button';
        badge.className = 'detail-brand-badge';
        badge.dataset.brandBack = '';
        badge.setAttribute('aria-label', '이전 페이지로 돌아가기');
        if (logoSources[car.brand]) {
            const image = document.createElement('img');
            image.src = brandLogoUrl(car.brand);
            image.alt = '';
            image.setAttribute('onerror', "this.hidden=true;this.parentElement.classList.add('logo-unavailable')");
            badge.append(image);
        } else badge.classList.add('logo-unavailable');
        const name = document.createElement('span');
        const koreanNames = { BMW: "비엠더블유", BYD: "비와이디", GMC: "지엠씨" };
        name.textContent = ({'현대':'현대자동차', '기아':'기아', '벤츠':'메르세데스-벤츠', ...koreanNames})[car.brand] || car.brand;
        name.className = 'detail-brand-name';
        const brandRow = document.createElement('div');
        brandRow.className = 'detail-brand-row';
        brandRow.append(badge, name);
        const powerTabs = root.querySelector('.power-tabs');
        if (powerTabs) powerTabs.before(brandRow);
        else top.before(brandRow);
    }
    const year = root.querySelector('.year-selector');
    const options = root.querySelector('.options-section');
    if (top && summary && year) {
        year.classList.add('year-selector-inline');
        const action = summary.querySelector('button[data-add]');
        summary.insertBefore(year, action || null);
    }
    if (top && options) {
        const primary = Array.from(root.querySelectorAll('section.history-section')).find(section => {
            const heading = section.querySelector('h2');
            return heading && ['주요 정보', '주요 제원', '해당 연식 정보'].includes(heading.textContent.trim());
        });
        if (primary) {
            top.insertAdjacentElement('afterend', primary);
            primary.insertAdjacentElement('afterend', options);
        } else top.insertAdjacentElement('afterend', options);
    }
    if (!car.classic && summary) {
        const button = summary.querySelector('button[data-add]');
        if (button) {
            const actions = document.createElement('div');
            actions.className = 'detail-actions';
            button.before(actions);
            const link = document.createElement('a');
            link.className = 'dark detail-estimate-link';
            link.dataset.estimateFromOptions = '';
            link.href = '#estimate/' + encodeURIComponent(id);
            link.textContent = '견적 내기 ↗';
            actions.append(link, button);
        }
    }
    return template.innerHTML;
};
document.addEventListener('click', event => {
    if (!event.target.closest('[data-brand-back]')) return;
    if (history.length > 1) history.back();
    else location.hash = '#explore';
});
document.addEventListener('click', event => {
    if (!event.target.closest('[data-estimate-from-options]')) return;
    const id = location.hash.split('/')[1];
    const car = cars.find(item => item.id === id);
    if (!car) return;
    const power = car.variants ? powerSelection[id] || Object.keys(car.variants)[0] : '';
    const selected = car.variants ? car.variants[power] : car.naver;
    const key = selectedModelYears[id + '|' + power];
    const sourceId = selected?.source?.match(/car_\d+/)?.[0];
    const old = sourceId && (expandedHistoryById[sourceId] || []).find(row => row.modelId === key);
    const year = key?.match(/^danawa-year-(\d{4})$/)?.[1] || old?.year || (!car.danawa && selected?.year) || 'all';
    const selection = optionsSelection[id + '|' + power + '|' + year];
    delete estimateStates[id];
    const state = estimateState(car);
    if (!selection) return;
    const all = estimateLineups(car, power);
    const matching = all.map((row, index) => ({row,index})).filter(item => year === 'all' || item.row.label.includes(year));
    const chosen = matching[selection.lineup];
    if (chosen) { state.lineup = chosen.index; state.trim = Math.min(selection.trim, chosen.row.trims.length - 1); }
});
document.addEventListener('change', event => {
    const form = event.target.closest('#estimate-form');
    if (!form) return;
    const car = cars.find(c=>c.id===form.dataset.estimateId); if (!car) return;
    const state=estimateState(car), target=event.target;
    if (target.name === 'power') {state.power=target.value;state.lineup=0;state.trim=0;state.options=[];state.colorName='';state.includeColor=false;state.colorPrice='';}
    else if (target.name === 'lineup') {state.lineup=Number(target.value);state.trim=0;state.options=[];state.colorName='';state.includeColor=false;state.colorPrice='';}
    else if (target.name === 'trim') {state.trim=Number(target.value);state.options=[];}
    else if (target.name === 'includeColor') state.includeColor=target.checked;
    else if (target.name === 'option') {const i=Number(target.value);state.options=target.checked?[...new Set([...state.options,i])]:state.options.filter(x=>x!==i);}
    else if (target.name in state) state[target.name]=target.value;
    const y=window.scrollY;render();window.scrollTo(0,y);
});
document.addEventListener('input', event => {
    const target = event.target, form = target.closest('#estimate-form');
    if (!form || target.type !== 'number') return;
    const car = cars.find(c=>c.id===form.dataset.estimateId); if (!car) return;
    const state = estimateState(car); if (!(target.name in state)) return;
    state[target.name] = target.value;
    const lineup = estimateLineups(car,state.power)[state.lineup];
    const candidate = lineup?.trims[state.trim];
    const trim = candidate && estimateNumber(candidate.price) !== null ? candidate : null;
    const total = estimateTotals(state,trim);
    for (const key of ['base','optionTotal','colorTotal','discount','subsidy','tax','extras','total','taxBase','grossTax']) {
        const element = form.querySelector('[data-estimate-value="'+key+'"]'); if (!element) continue;
        const value = total[key];
        element.textContent = value === null ? '가격 입력 필요' : ((key === 'discount' || key === 'subsidy') && value ? '- ' : '') + estimateMoney(Math.abs(value));
    }
    const finance = estimateFinance(state,total.total);
    const payment = form.querySelector('[data-finance="payment"]');
    const detail = form.querySelector('[data-finance="detail"]');
    if (payment) payment.textContent = finance ? estimateMoney(finance.payment) : '금리와 견적을 입력하세요';
    if (detail) detail.textContent = finance ? '할부 원금 ' + estimateMoney(finance.principal) + ' · 예상 총이자 ' + estimateMoney(finance.interest) : '선수금은 합계를 넘을 수 없습니다.';
});
document.addEventListener('click', event => { if (event.target.closest('[data-estimate-print]')) window.print(); });
if (location.hash.startsWith('#estimate/')) render();
