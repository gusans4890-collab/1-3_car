// Official release figures; wheel and seating conditions are retained with each value.
const verifiedModelData = {
    '제네시스|GV90': {
        price: 13950, priceText: '1억 3,950만~1억 4,550만 원', fuel: '전기',
        driving: '500km (22인치 · 6/7인승), 484km (24인치 · 6인승)',
        efficiency: '복합 3.4km/kWh', output: '합산 490kW', seats: '6인승 / 7인승',
        battery: '123.5kWh', dimensions: '전장 5,285 · 전폭 2,030 · 축거 3,245mm',
        source: 'https://www.genesis.com/kr/ko/shop/build/gv90',
    },
    '제네시스|GV90 Neolun': {
        price: 18990, priceText: '1억 8,990만~2억 3,950만 원', fuel: '전기',
        driving: '460km (24인치 · 6인승), 432km (24인치 · 4인승)',
        efficiency: '복합 3.2km/kWh (6인승), 3.0km/kWh (4인승)', output: '합산 490kW', seats: '4인승 / 6인승',
        battery: '123.5kWh', dimensions: '전장 5,285 · 전폭 2,030 · 축거 3,245mm',
        source: 'https://www.genesis.com/kr/ko/models/gv90-neolun',
    },
};
for (const car of cars) {
    const data = verifiedModelData[car.brand + '|' + car.name];
    if (!data) continue;
    car.officialSpecs = data;
    car.price = data.price;
    car.priceDisplay = data.priceText;
    car.hasElectricVariant = true;
}
const detailBeforeVerifiedModels = detail;
detail = function (id) {
    let html = detailBeforeVerifiedModels(id);
    const car = cars.find(c => c.id === id), data = car?.officialSpecs;
    if (!data) return html;
    html = html.replace('가격·제원·연식별 트림은 아직 확인 중입니다. 제조사 페이지에서 최신 정보를 확인하세요.', '2026년 11월 제네시스 출시 자료 기준입니다. 가격과 주행거리는 좌석·휠과 세제 조건에 따라 달라집니다.');
    const rows = [['가격',data.priceText],['연료',data.fuel],['1회 충전 주행거리',data.driving],['복합 전비',data.efficiency],['모터 최고 출력',data.output],['배터리',data.battery],['승차 정원',data.seats],['차체 크기',data.dimensions]];
    const section = '<section class="history-section"><div class="eyebrow">OFFICIAL SPECIFICATIONS</div><h2>가격과 주요 제원</h2><table class="specs">' + rows.map(([label,value]) => '<tr><th>' + esc(label) + '</th><td>' + esc(value) + '</td></tr>').join('') + '</table><p class="meta">공식 출시 자료 · 2026.11.10 기준. GV90 가격은 개별소비세 5%와 친환경차 세제 혜택을 반영하며, 네오룬은 개별소비세 5% 기준입니다.</p><a class="link" href="' + esc(data.source) + '" target="_blank" rel="noopener noreferrer">제네시스 공식 정보 ↗</a></section>';
    const at = html.lastIndexOf('</div>');
    return at < 0 ? html + section : html.slice(0, at) + section + html.slice(at);
};
if (location.hash.startsWith('#explore') || location.hash.startsWith('#car/')) render();
