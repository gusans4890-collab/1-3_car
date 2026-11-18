// Compare only collected values; no trim or equipment is inferred from a model name.
const compareChoices = {};
let compareDifferencesOnly = false;

function comparisonData(car) {
    const powers = car.variants ? Object.keys(car.variants) : [];
    const state = compareChoices[car.id] || (compareChoices[car.id] = {power: powers[0] || '', year: 'current', lineup: 0, trim: 0});
    if (powers.length && !powers.includes(state.power)) state.power = powers[0];
    const selected = powers.length ? car.variants[state.power] : car.naver;
    const sourceId = selected?.source?.match(/car_\d+/)?.[0];
    const history = sourceId ? (expandedHistoryById[sourceId] || []) : [];
    const old = state.year === 'current' ? null : history.find(row => row.modelId === state.year);
    if (state.year !== 'current' && !old) state.year = 'current';
    const year = old?.year || selected?.year || car.commercial?.fields?.['연식'] || '';
    const fields = old ? (naverYearDetails[old.modelId] || {}) : ((sourceId && naverYearDetails[sourceId]) || selected?.fields || {});
    const danawa = !old && (!powers.length || car.danawaVariants?.[state.power]) ? (car.danawaVariants?.[state.power]?.info || car.danawa) : null;
    const facts = danawa?.specs || [];
    const fact = regex => facts.find(value => regex.test(value)) || '';
    const snapshot = {
        fuel: fact(/^(?:가솔린|디젤|LPG|CNG|전기|수소|하이브리드|휘발유|경유)(?:\b|\(|,|\s|$)/i),
        efficiency: fact(/^복합(?:연비|전비)\s*(?!인증中|미정)/i),
        driving: fact(/^총주행거리\s*\d/i),
        displacement: fact(/^[\d,~.\s]+cc$/i),
        battery: fact(/^배터리 용량\s*\d/i),
    };
    const dedicated = car.danawaOptionIds?.[state.power];
    const optionId = dedicated || car.danawaId;
    let lineups = optionId ? (collectedOptions[optionId] || []) : [];
    if (state.power && !dedicated) {
        if (/하이브리드/.test(state.power)) lineups = lineups.filter(row => /하이브리드|hybrid/i.test(row.label));
        else if (/전기/.test(state.power)) lineups = lineups.filter(row => /전기|electric|\bEV\b/i.test(row.label));
        else lineups = lineups.filter(row => !/하이브리드|hybrid|전기|electric|\bEV\b/i.test(row.label));
    }
    if (year) lineups = lineups.filter(row => row.label.includes(year + '년형'));
    lineups = lineups.filter((row, i, all) => all.findIndex(x => x.label === row.label && JSON.stringify(x.trims) === JSON.stringify(row.trims)) === i);
    state.lineup = Math.max(0, Math.min(state.lineup, lineups.length - 1));
    const lineup = lineups[state.lineup];
    state.trim = Math.max(0, Math.min(state.trim, (lineup?.trims?.length || 1) - 1));
    const trim = lineup?.trims?.[state.trim];
    const price = trim?.price ? trim.price + '원' : old ? (old.priceDisplay || '') : (selected?.range || car.danawa?.price || car.officialSpecs?.priceText || '');
    return {car, state, powers, selected, history, old, year, fields, snapshot, lineups, lineup, trim, price, optionId};
}

function compareValue(value) {
    return value == null || value === '' || value === '정보 없음' ? '<span class="compare-missing">확인되지 않음</span>' : esc(String(value));
}

function compareSelect(label, id, field, options, selected) {
    return '<label class="compare-select"><span>' + esc(label) + '</span><select data-compare-id="' + esc(id) + '" data-compare-field="' + field + '">' + options.map(([value,text]) => '<option value="' + esc(value) + '" ' + (String(value) === String(selected) ? 'selected' : '') + '>' + esc(text) + '</option>').join('') + '</select></label>';
}

function comparableSuggestions(car, excluded) {
    if (!car?.size) return [];
    const body = ['세단', 'SUV', '해치백', '트럭', '버스', '밴'].find(type => car.type?.includes(type));
    if (!body) return [];
    const preferred = {
        '기아|K5': ['현대|쏘나타 디 엣지'],
        '현대|쏘나타 디 엣지': ['기아|K5'],
        '기아|쏘렌토': ['현대|싼타페'],
        '현대|싼타페': ['기아|쏘렌토'],
        '기아|스포티지': ['현대|디 올 뉴 투싼'],
        '현대|디 올 뉴 투싼': ['기아|스포티지'],
    }[car.brand + '|' + car.name] || [];
    return cars.filter(candidate => candidate.id !== car.id && !excluded.includes(candidate.id) && !candidate.classic && !candidate.commercial && !candidate.special && candidate.size === car.size && candidate.type?.includes(body) && (candidate.naver || candidate.danawa))
        .sort((a,b) => {
            const aPreferred = preferred.includes(a.brand + '|' + a.name), bPreferred = preferred.includes(b.brand + '|' + b.name);
            if (aPreferred !== bPreferred) return aPreferred ? -1 : 1;
            if (!!a.naver !== !!b.naver) return a.naver ? -1 : 1;
            if ((a.brand !== car.brand) !== (b.brand !== car.brand)) return a.brand !== car.brand ? -1 : 1;
            return a.name.localeCompare(b.name, 'ko');
        }).slice(0, 4);
}

comparison = function () {
    const selectedCars = compare.map(id => cars.find(car => car.id === id)).filter(Boolean).slice(0, 3);
    const data = selectedCars.map(comparisonData);
    const heading = '<div class="compare-intro"><div><div class="eyebrow">COMPARE CARS</div><h1 class="page-title">자동차 비교</h1><p class="sub">여러 브랜드의 차량을 최대 3대까지 나란히 살펴보세요.</p></div><a class="outline" href="#explore">＋ 차량 추가</a></div>';
    if (!data.length) return '<div class="page compare-page"><div class="breadcrumbs"><a href="#home">홈</a> / 차량 비교</div>' + heading + '<div class="compare-empty"><h2>비교할 차량을 담아보세요</h2><p>자동차 탐색에서 관심 차량의 ‘비교하기’를 누르면 여기에 표시됩니다.</p><a class="dark" href="#explore">차량 살펴보기 ↗</a></div></div>';
    const suggestions = data.length < 3 ? comparableSuggestions(selectedCars[0], compare) : [];
    const suggestionPanel = suggestions.length ? '<section class="compare-suggestions"><div><span class="eyebrow">SIMILAR CARS</span><h2>함께 비교하기 좋은 차</h2><p>' + esc(selectedCars[0].name) + '와 같은 차급과 차체를 기준으로 추천합니다.</p></div><div class="compare-suggestion-list">' + suggestions.map(car => '<button type="button" data-add="' + esc(car.id) + '"><span><small>' + esc(car.brand) + '</small><strong>' + esc(car.name) + '</strong></span><b aria-hidden="true">＋</b></button>').join('') + '</div></section>' : '';
    const headers = data.map(d => {
        const {car, state, powers, selected, history, year, lineups, lineup, trim} = d;
        const years = selected?.year ? [['current', selected.year + '년형'], ...history.filter(row => row.modelId && row.year).map(row => [row.modelId,row.year + '년형 · ' + row.name])] : [];
        const uniqueYears = years.filter((row,i,arr) => arr.findIndex(x => x[0] === row[0]) === i);
        return '<th scope="col" class="compare-car"><div class="compare-car-top"><span>' + esc(car.brand) + '</span><button type="button" data-add="' + esc(car.id) + '" aria-label="' + esc(car.name) + ' 비교에서 삭제">×</button></div><a href="#car/' + esc(car.id) + '" class="compare-car-image" aria-label="' + esc(car.name) + ' 상세 보기">' + (car.officialImage ? '<img src="' + esc(car.officialImage) + '" alt="" loading="lazy" referrerpolicy="no-referrer">' : '<span>이미지 준비 중</span>') + '</a><small class="compare-image-note">대표 이미지 · 연식과 다를 수 있음</small><a href="#car/' + esc(car.id) + '" class="compare-car-name">' + esc(car.name) + ' ↗</a>' + (powers.length ? compareSelect('동력', car.id, 'power', powers.map(x=>[x,x]), state.power) : '') + (uniqueYears.length ? compareSelect('연식',car.id,'year',uniqueYears,state.year) : '') + (lineups.length ? compareSelect('라인업',car.id,'lineup',lineups.map((x,i)=>[String(i),x.label]),state.lineup) + compareSelect('트림',car.id,'trim',(lineup?.trims || []).map((x,i)=>[String(i),x.name.replace(/\s+/g,' ')]),state.trim) : '<p class="compare-note">' + (year ? esc(year) + '년형 ' : '') + '트림 자료 확인 중</p>') + (trim ? '<p class="compare-note">트림 가격표 기준</p>' : '') + '</th>';
    }).join('');
    const rows = [
        ['차량 가격', d=>d.price], ['자료 연식',d=>d.year ? d.year+'년형' : ''],
        ['차체 유형',d=>d.car.type], ['차급',d=>d.car.size],
        ['연료',d=>d.old ? d.fields['연료'] : (d.selected?.fuel || d.fields['연료'] || d.car.officialSpecs?.fuel || d.snapshot.fuel)],
        ['연비 / 전비',d=>d.old ? (d.fields['연비'] || d.fields['전비'] || d.old.efficiency) : (d.selected?.efficiency || d.fields['연비'] || d.fields['전비'] || d.car.officialSpecs?.efficiency || d.snapshot.efficiency)],
        ['1회 충전 주행거리',d=>d.old ? d.fields['주행'] : (d.fields['주행'] || d.selected?.driving || d.car.officialSpecs?.driving || d.snapshot.driving)],
        ['최고 출력',d=>d.old ? d.fields['출력'] : (d.selected?.output || d.fields['출력'] || d.car.officialSpecs?.output)],
        ['최대 토크',d=>d.fields['토크']], ['배기량',d=>d.old ? d.fields['배기'] : (d.selected?.displacement || d.fields['배기'] || d.snapshot.displacement)],
        ['승차 정원',d=>d.old ? d.fields['정원'] : (d.selected?.seats || d.fields['정원'] || d.car.officialSpecs?.seats)],
        ['배터리 용량',d=>d.old ? '' : (d.car.officialSpecs?.battery || d.snapshot.battery)], ['차체 크기',d=>d.old ? '' : d.car.officialSpecs?.dimensions],
        ['상용차 추가 정보',d=>d.car.commercial?.fields?.['추가 정보']],
    ];
    const tableRows = rows.map(([label, fn]) => {
        const values = data.map(fn);
        const known = values.filter(v => v != null && v !== '' && v !== '정보 없음').map(String);
        if (compareDifferencesOnly && (known.length < 2 || new Set(known).size < 2)) return '';
        return '<tr><th scope="row">' + esc(label) + '</th>' + values.map(value=>'<td>' + compareValue(value) + '</td>').join('') + '</tr>';
    }).join('');
    const details = data.map(d => {
        const trim = d.trim;
        const options = trim?.options || [];
        return '<article class="compare-equipment"><h3>' + esc(d.car.brand + ' ' + d.car.name) + '</h3>' + (trim ? '<p>' + esc((d.lineup?.label || '') + ' · ' + trim.name.replace(/\s+/g,' ')) + '</p>' + (trim.basic ? '<details><summary>기본 사양 펼치기</summary><p class="compare-basic">' + esc(trim.basic) + '</p></details>' : '<p class="compare-missing">기본 사양 자료가 없습니다.</p>') + (options.length ? '<details><summary>선택 옵션 ' + options.length + '개 보기</summary><ul>' + options.map(o => '<li><span>' + esc(o.name) + '</span><strong>' + (o.price ? esc(o.price) + '원' : '가격 확인 필요') + '</strong></li>').join('') + '</ul></details>' : '<p class="compare-missing">수집된 선택 옵션이 없습니다.</p>') : '<p class="compare-missing">선택한 동력·연식의 트림 및 옵션 자료가 없습니다.</p>') + (d.optionId ? '<a href="https://auto.danawa.com/auto/?Work=model&amp;Model=' + esc(d.optionId) + '&amp;Tab=price" target="_blank" rel="noopener noreferrer">가격표 확인 ↗</a>' : '') + '</article>';
    }).join('');
    return '<div class="page compare-page"><div class="breadcrumbs"><a href="#home">홈</a> / 차량 비교</div>' + heading + suggestionPanel + '<p class="compare-disclaimer">가격은 선택한 트림 가격 또는 확인된 모델 가격 범위입니다. 제원은 선택 연식의 모델 기준으로, 트림별 수치와 다를 수 있습니다. 이전 연식은 당시 가격이며 확인되지 않은 정보는 비워 둡니다.</p><div class="compare-toolbar"><span>' + data.length + '대 비교 중 · 최대 3대</span><label><input type="checkbox" data-compare-differences ' + (compareDifferencesOnly ? 'checked' : '') + '> 차이 있는 항목만</label></div><p class="compare-mobile-hint">좌우로 움직여 차량을 비교할 수 있습니다.</p><div class="compare-table-wrap" tabindex="0" role="region" aria-label="차량 비교표"><table class="compare-matrix"><thead><tr><th scope="col">항목</th>' + headers + '</tr></thead><tbody>' + (tableRows || '<tr><th scope="row">비교 결과</th><td colspan="' + data.length + '">확인된 값 중 차이가 있는 항목이 없습니다.</td></tr>') + '</tbody></table></div><section class="compare-equipment-section"><div class="eyebrow">TRIMS &amp; OPTIONS</div><h2>트림별 기본 사양과 선택 옵션</h2><p>가격표의 원문 항목입니다. 기본 사양에 상위 트림의 추가 내용만 수집된 경우가 있어 다른 트림과 자동으로 비교하지 않습니다.</p><div class="compare-equipment-grid">' + details + '</div></section><p class="compare-disclaimer">자료는 저장된 스냅샷이며 실시간 가격이 아닙니다. 차량의 실제 판매 여부, 구성 및 가격은 제조사와 가격표에서 확인해 주세요.</p></div>';
};

document.addEventListener('change', event => {
    const target = event.target;
    if (target.matches('[data-compare-differences]')) compareDifferencesOnly = target.checked;
    else if (target.matches('[data-compare-id][data-compare-field]')) {
        const state = compareChoices[target.dataset.compareId];
        if (!state) return;
        const field = target.dataset.compareField;
        if (!['power','year','lineup','trim'].includes(field)) return;
        state[field] = field === 'lineup' || field === 'trim' ? Number(target.value) : target.value;
        if (field === 'power') state.year = 'current';
        if (field === 'power' || field === 'year') state.lineup = 0;
        if (field !== 'trim') state.trim = 0;
    } else return;
    const y = window.scrollY; render(); window.scrollTo(0, y);
});
if (location.hash.startsWith('#compare')) render();
