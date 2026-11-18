// Keep County variants in one catalogue entry while retaining their own data.
const county = cars.find(car => car.brand === '현대' && car.name === '카운티' && !car.commercial);
const countyModels = cars.filter(car => car.brand === '현대' && car.commercial && /카운티/i.test(car.name));
let countyCategory = '전체';
let countySelected = null;

function countyModelCategory(car) {
    if (/일렉트릭|전기/.test(car.name + ' ' + car.type)) return '전기';
    if (/어린이/.test(car.name)) return '어린이버스';
    if (/마을/.test(car.name)) return '마을버스';
    if (/리무진/.test(car.name)) return '리무진';
    return '일반';
}

if (county) {
    county.officialImage = 'https://www.hyundai.com/ccontents/carmng/KV00000015/county-key-visual-pc.jpg';
    county.imageSource = '현대자동차 카운티 공식 이미지';
    county.hasElectricVariant = countyModels.some(car => countyModelCategory(car) === '전기');
    county.ice = true;
    county.searchAliases = [county.searchAliases, ...countyModels.map(car => car.name)].filter(Boolean).join(' ');
    for (const car of countyModels) car.familyHidden = true;
}

const detailBeforeCounty = detail;
detail = function (id) {
    let html = detailBeforeCounty(id);
    if (!county || id !== county.id) return html;
    const groups = ['전체', '일반', '마을버스', '어린이버스', '리무진', '전기'];
    const filtered = countyModels.filter(car => countyCategory === '전체' || countyModelCategory(car) === countyCategory);
    const chosen = countyModels.find(car => car.id === countySelected);
    const filters = groups.map(group => '<button type="button" data-county-category="' + esc(group) + '" class="' + (countyCategory === group ? 'active' : '') + '" aria-pressed="' + (countyCategory === group) + '">' + esc(group) + '</button>').join('');
    const list = filtered.map(car => '<button type="button" class="county-model ' + (countySelected === car.id ? 'active' : '') + '" data-county-model="' + esc(car.id) + '" aria-pressed="' + (countySelected === car.id) + '"><span><strong>' + esc(car.name) + '</strong><small>' + esc(car.commercial.fields?.['연식'] || '연식 확인 중') + '</small></span><b aria-hidden="true">↗</b></button>').join('');
    const fields = chosen ? Object.entries(chosen.commercial.fields || {}).filter(([,value]) => value).map(([key,value]) => '<tr><th>' + esc(key) + '</th><td>' + esc(value) + '</td></tr>').join('') : '';
    const selected = chosen ? '<div class="county-selection"><div class="county-selection-image">' + (chosen.officialImage ? '<img src="' + esc(chosen.officialImage) + '" alt="' + esc(chosen.name) + '" loading="lazy" referrerpolicy="no-referrer">' : '') + '</div><div><span class="eyebrow">SELECTED MODEL</span><h3>' + esc(chosen.name) + '</h3><table class="specs">' + fields + '</table><a class="link" href="' + esc(chosen.source) + '" target="_blank" rel="noopener noreferrer">해당 모델 자료 보기 ↗</a></div></div>' : '<p class="county-hint">모델을 선택하면 사진과 수집된 차량 정보를 볼 수 있습니다.</p>';
    const section = '<section class="county-family"><div class="eyebrow">COUNTY LINEUP</div><h2>카운티 모델 살펴보기</h2><p>용도와 동력별 모델을 한곳에 모았습니다. 과거 연식이 포함되어 현재 판매 여부는 별도 확인이 필요합니다.</p><div class="county-categories" role="group" aria-label="카운티 모델 분류">' + filters + '</div><div class="county-model-list">' + list + '</div>' + selected + '<div class="county-sources"><a href="https://www.hyundai.com/kr/ko/c/products/bus/county" target="_blank" rel="noopener noreferrer">현대자동차 카운티 공식 정보 ↗</a><a href="https://www.hyundai.com/ccontents/carmng/CP00000007/county-2026-10-price.pdf" target="_blank" rel="noopener noreferrer">2026년 10월 가격표 ↗</a></div></section>';
    const at = html.lastIndexOf('</div>');
    return at < 0 ? html + section : html.slice(0, at) + section + html.slice(at);
};

document.addEventListener('click', event => {
    const category = event.target.closest('[data-county-category]');
    const model = event.target.closest('[data-county-model]');
    if (!category && !model) return;
    if (category) { countyCategory = category.dataset.countyCategory; countySelected = null; }
    if (model && countyModels.some(car => car.id === model.dataset.countyModel)) countySelected = model.dataset.countyModel;
    const y = window.scrollY; render(); window.scrollTo(0, y);
});

function redirectCountyModel() {
    const id = location.hash.startsWith('#car/') ? location.hash.slice(5) : '';
    if (county && countyModels.some(car => car.id === id)) {
        countySelected = id;
        countyCategory = '전체';
        location.hash = '#car/' + county.id;
    }
}
window.addEventListener('hashchange', redirectCountyModel);
redirectCountyModel();
if (location.hash === '#explore' || location.hash === '#car/' + county?.id) render();
