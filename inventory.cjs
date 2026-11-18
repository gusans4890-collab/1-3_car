const fs = require("fs"),
    vm = require("vm");
const files = [
    "naver-data.js",
    "naver-extra.js",
    "naver-imports.js",
    "naver-ev.js",
    "naver-more-photos.js",
    "naver-more-photos-2.js",
    "danawa-photos.js",
    "vehicle-snapshot.js",
    "trim-catalog.js",
    "history-catalog.js",
    "history-expanded.js",
    "year-details.js",
    "danawa-catalog.js",
    "danawa-specs.js",
    "vehicle-media.js",
    "commercial-catalog.js",
    "kia-special.js",
    "options-catalog.js",
    "quality-images.js",
    "classic-catalog.js",
    "app.js",
    "estimate.js",
    "verified-models.js",
    "compare.js",
    "county.js",
];
const element = {
    innerHTML: "",
    textContent: "",
    classList: { add() {} },
    querySelector() {
        return null;
    },
};
const listeners = {};
const sandbox = {
    console,
    URL,
    FormData: class { constructor(form) { this.form = form; } get(name) { return this.form.values[name]; } },
    app: element,
    document: {
        querySelector() {
            return element;
        },
        querySelectorAll() {
            return [];
        },
        addEventListener(type, callback) { (listeners[type] ||= []).push(callback); },
    },
    window: { addEventListener() {}, scrollTo() {} },
    location: { hash: "" },
    localStorage: {
        getItem() {
            return null;
        },
        setItem() {},
    },
    IntersectionObserver: class {
        observe() {}
        unobserve() {}
    },
    setTimeout() {},
};
vm.createContext(sandbox);
vm.runInContext(
    files.map((f) => fs.readFileSync(f, "utf8")).join("\n") +
        "\n;globalThis.inventory=cars.map(c=>({brand:c.brand,name:c.name,source:c.naver?.source||null,variants:c.variants&&Object.fromEntries(Object.entries(c.variants).map(([k,v])=>[k,v?.source||null]))}));",
    sandbox,
);
fs.writeFileSync("vehicle-inventory.json", JSON.stringify(sandbox.inventory, null, 2));
console.log("models", sandbox.inventory.length, "without sources", sandbox.inventory.filter((c) => !c.source).length);
const sample = vm.runInContext("detail(cars.find(c => c.brand === '현대' && c.name === '아이오닉 5').id)", sandbox);
if (
    !sample.includes("vehicle-gallery") ||
    !sample.includes('data-gallery-mode="colors"') ||
    !sample.includes('data-gallery-mode="photos"')
)
    throw Error("Gallery render check failed");
console.log("gallery render check passed");
const compareCheck = vm.runInContext(`(() => {
  const before=compare.slice();
  const a=cars.find(c=>c.brand==='기아'&&c.name==='쏘렌토'), b=cars.find(c=>c.brand==='현대'&&c.name==='디 올 뉴 아반떼');
  compare=[a.id,b.id];
  const initial=comparison(), data=comparisonData(a);
  const hybrid=a.variants && Object.keys(a.variants).find(x=>x.includes('하이브리드'));
  if (hybrid) { data.state.power=hybrid; data.state.lineup=0; data.state.trim=0; }
  const selected=comparisonData(a), updated=comparison();
  const passed=initial.includes('연비 / 전비') && initial.includes('최고 출력') && initial.includes('data-compare-field="year"') && initial.includes('data-compare-field="trim"') && updated.includes('선택 옵션') && selected.lineups.every(x=>!selected.year || x.label.includes(selected.year+'년형'));
  compare=before; delete compareChoices[a.id]; delete compareChoices[b.id];
  return passed;
})()`,sandbox);
if (!compareCheck) throw Error('Detailed comparison check failed');
console.log('detailed comparison check passed');
const suggestionCheck = vm.runInContext(`(() => {
  const k5=cars.find(c=>c.brand==='기아'&&c.name==='K5');
  const sonata=cars.find(c=>c.brand==='현대'&&c.name==='쏘나타 디 엣지');
  const previous=compare.slice(); compare=[k5.id];
  const list=comparableSuggestions(k5,compare), html=comparison();
  compare=previous;
  return list[0]?.id===sonata.id && html.includes('data-add="'+sonata.id+'"') && html.includes('함께 비교하기 좋은 차');
})()`, sandbox);
if (!suggestionCheck) throw Error('Comparable vehicle suggestion check failed');
console.log('comparable vehicle suggestion check passed');
const addClick = (listeners.click || []).find(handler => handler.toString().includes('b.dataset.add'));
const positions = [];
const oldScrollTo = sandbox.window.scrollTo;
sandbox.window.scrollY = 640;
sandbox.window.scrollTo = (x,y) => positions.push(y);
const addId = vm.runInContext("cars.find(c=>c.brand==='기아'&&c.name==='K5').id", sandbox);
addClick({target:{closest(selector){return selector === 'button' ? {dataset:{add:addId}} : null;}}});
const addStayed = positions.at(-1) === 640;
vm.runInContext('compare=[]',sandbox);
sandbox.window.scrollTo = oldScrollTo;
if (!addStayed) throw Error('Compare selection scroll position check failed');
console.log('compare selection scroll position check passed');
const verifiedModelCheck = vm.runInContext(`(() => {
  const gv90=cars.find(c=>c.brand==='제네시스'&&c.name==='GV90');
  const neolun=cars.find(c=>c.brand==='제네시스'&&c.name==='GV90 Neolun');
  const html=detail(gv90.id);
  const details=comparisonData(gv90), other=comparisonData(neolun);
  return gv90.price===13950 && neolun.price===18990 && html.includes('500km') && html.includes('123.5kWh') && (details.price.includes('139,500,000') || details.price.includes('3,950')) && other.car.officialSpecs.driving.includes('460km');
})()`, sandbox);
if (!verifiedModelCheck) throw Error('Official GV90 model information check failed');
console.log('official GV90 model information check passed');
const homeIntroduction = vm.runInContext('home()', sandbox);
if (!homeIntroduction.includes('차를 알아가는') || !homeIntroduction.includes('자동차 탐색하기') || homeIntroduction.includes('사진 출처 Kia'))
    throw Error('Neutral home introduction check failed');
console.log('neutral home introduction check passed');
const avanteCheck = vm.runInContext(
    `(() => {
  const c=cars.find(c=>c.brand==='현대'&&c.name==='디 올 뉴 아반떼');
  const media=vehicleMedia.car_171409;
  const state=galleryState.car_171409={mode:'rotate',color:0,photo:0,frame:20};
  const first=detail(c.id); state.color=media.colors.findIndex(x=>x.name==='아틀라스 화이트');
  const white=detail(c.id); const frame=galleryFrames(media,state)[20];
  delete galleryState.car_171409;
  return {colors:media.colorFrames.length,frames:media.colorFrames.every(x=>x&&x.length===60),render:first.includes('data-gallery-mode="rotate"')&&first.includes('data-gallery-color='),white:white.includes('/SAW/021.png'),frame:frame.endsWith('/SAW/021.png')};
})()`,
    sandbox,
);
if (avanteCheck.colors !== 9 || !avanteCheck.frames || !avanteCheck.render || !avanteCheck.white || !avanteCheck.frame)
    throw Error("Avante 360 check failed: " + JSON.stringify(avanteCheck));
console.log("Avante color 360 check passed");
const annualSpinCheck = vm.runInContext(`(() => {
  return [['쏘렌토','기본 모델','car_172115','car_166815'],['쏘렌토','하이브리드','car_172121','car_166817'],['스포티지','가솔린 · LPG','car_172099','car_167619'],['스포티지','하이브리드','car_172107','car_167617'],['카니발','','car_172085','car_167181']].every(([name,power,current,previous]) => {
    const car=cars.find(c=>c.brand==='기아'&&c.name===name);
    if(power) powerSelection[car.id]=power;
    const html=detail(car.id); delete powerSelection[car.id];
    return vehicleMedia[current].frames.length===36 && vehicleMedia[current].frames[0]===vehicleMedia[previous].frames[0] && html.includes('data-gallery-mode="rotate"') && html.includes('2026년형 기본 사양 참고 이미지');
  });
})()`, sandbox);
if (!annualSpinCheck) throw Error('Annual model 360 reference check failed');
console.log('annual model 360 reference check passed');
const importedSpinCheck = vm.runInContext(`(() => {
  return [['BMW','X1','car_168317',17], ['BMW','X3','car_168843',35], ['BMW','X5','car_168831',20], ['벤츠','GLC','car_167531',32]].every(([brand,name,id,count]) => {
    const car=cars.find(c=>c.brand===brand&&c.name===name), media=vehicleMedia[id];
    const html=detail(car.id);
    return media.frames.length===count && media.reverseDrag && html.includes('data-gallery-mode="rotate"') && html.includes('CarDekho 해외 사양') && html.includes('/img_0_0_0.jpg');
  });
})()`, sandbox);
if (!importedSpinCheck) throw Error('Imported 360 gallery check failed');
console.log('imported 360 gallery check passed');
const sonataCheck = vm.runInContext(
    `(() => {
  const car=cars.find(c=>c.brand==='현대'&&c.name==='쏘나타 디 엣지'), media=vehicleMedia.car_172475;
  const state=galleryState.car_172475={mode:'rotate',color:2,photo:0,frame:59};
  const html=detail(car.id); delete galleryState.car_172475;
  return media.colorFrames.length===8 && media.colorFrames.every(x=>x&&x.length===60) && html.includes('/DN26/exterior/W6H/060.png') && html.includes('data-gallery-color=');
})()`,
    sandbox,
);
if (!sonataCheck) throw Error("Sonata color 360 check failed");
console.log("Sonata color 360 check passed");
const commercialCheck = vm.runInContext(
    "({trucks:cars.filter(c=>c.type.includes('트럭')).length,buses:cars.filter(c=>c.type.includes('버스')).length, detail:detail(cars.find(c=>c.commercial && c.type.includes('버스')).id).includes('이트럭스')})",
    sandbox,
);
if (!commercialCheck.trucks || !commercialCheck.buses || !commercialCheck.detail)
    throw Error("Commercial vehicle check failed");
console.log("commercial check passed", JSON.stringify(commercialCheck));
const countyCheck = vm.runInContext(`(() => {
  const oldSearch=search, oldBrand=selectedBrand;
  selectedBrand='현대'; search='카운티';
  const listing=explore(), initial=detail(county.id);
  countyCategory='전기'; countySelected=countyModels.find(c=>c.name==='카운티 일렉트릭 마을버스').id;
  const electric=detail(county.id);
  countyCategory='전체'; countySelected=null; search=oldSearch; selectedBrand=oldBrand;
  return (listing.match(/class="model"/g)||[]).length===1 && countyModels.length>=10 && countyModels.every(c=>c.familyHidden) && county.officialImage.includes('county-key-visual-pc.jpg') && initial.includes('카운티 모델 살펴보기') && electric.includes('리튬이온 폴리머');
})()`, sandbox);
if (!countyCheck) throw Error('County family check failed');
console.log('County family check passed');
const specialCheck = vm.runInContext(
    "({models:cars.filter(c=>c.special).length, filter:explore().includes('data-body=\"특수차\"'), details:detail('kia-special-kltv').includes('data-special-variant=\"5\"')})",
    sandbox,
);
if (specialCheck.models !== 9 || !specialCheck.filter || !specialCheck.details)
    throw Error("Special vehicle check failed");
console.log("special vehicle check passed");
const classicsCheck = vm.runInContext(
    `(() => {
  const total=cars.filter(c=>c.classic).length;
  classicBrand='르노코리아'; classicYear='2018'; const view=classicPage();
  const c=cars.find(c=>c.classic&&c.name==='SM5'), html=detail(c.id);
  const data=(expandedHistoryById[c.naver.source.match(/car_\\d+/)[0]]||[])[0];
  selectedModelYears[c.id+'|']=data.modelId; const old=detail(c.id); delete selectedModelYears[c.id+'|'];
  classicBrand='전체'; classicYear='전체';
  return {total,filtered:view.includes('SM5')&&!view.includes('>클릭<'),notice:html.includes('차종 단종 모델'),noQuote:!html.includes('#estimate/'),year:old.includes(data.year+'년형')};
})()`,
    sandbox,
);
if (
    classicsCheck.total !== 21 ||
    !classicsCheck.filtered ||
    !classicsCheck.notice ||
    !classicsCheck.noQuote ||
    !classicsCheck.year
)
    throw Error("Classic catalogue check failed: " + JSON.stringify(classicsCheck));
console.log("classic catalogue check passed");
const imageCoverageCheck = vm.runInContext(`(() => {
  const car = cars.find(c => c.classic && c.name === 'SM3');
  const historical = expandedHistoryById.car_13277.find(row => row.modelId === 'car_55267');
  selectedModelYears[car.id+'|'] = historical.modelId;
  const html = detail(car.id);
  delete selectedModelYears[car.id+'|'];
  return cars.every(c => c.officialImage) && Object.values(expandedHistoryById).flat().every(row => row.image) &&
    !!historical.imageReference && html.includes(historical.imageReference) && html.includes(historical.image);
})()`, sandbox);
if (!imageCoverageCheck) throw Error('Image coverage check failed');
console.log('image coverage check passed');
const brandCollapseCheck = vm.runInContext(
    `(() => {
  brandGroup='수입'; brandExpanded['수입']=false;
  const collapsed=brandChooser(); brandExpanded['수입']=true;
  const expanded=brandChooser(); brandExpanded['수입']=false;
  return {collapsed:(collapsed.match(/data-brand="/g)||[]).length, expanded:(expanded.match(/data-brand="/g)||[]).length, toggle:collapsed.includes('브랜드 더 보기') && expanded.includes('브랜드 접기')};
})()`,
    sandbox,
);
if (brandCollapseCheck.collapsed !== 16 || brandCollapseCheck.expanded <= 16 || !brandCollapseCheck.toggle)
    throw Error("Brand expansion check failed");
console.log("brand expansion check passed");
const domesticBrandCheck = vm.runInContext(`(() => {
  brandGroup='국산'; brandExpanded['국산']=false;
  const collapsed=brandChooser(); brandExpanded['국산']=true;
  const expanded=brandChooser(); brandExpanded['국산']=false;
  return (collapsed.match(/data-brand="/g)||[]).length === 6 && collapsed.includes('data-brand="쉐보레"') && !collapsed.includes('data-brand="타타대우모빌리티"') && collapsed.includes('브랜드 더 보기') && expanded.includes('data-brand="타타대우모빌리티"') && expanded.includes('브랜드 접기');
})()`, sandbox);
if (!domesticBrandCheck) throw Error('Domestic brand expansion check failed');
console.log('domestic brand expansion check passed');
const menuClick = (listeners.click || []).find(handler => handler.toString().includes('[data-menu-toggle]'));
const menuKey = (listeners.keydown || []).find(handler => handler.toString().includes('Escape'));
const originalQuery = sandbox.document.querySelector;
const attributes = {'aria-expanded':'false'};
const menuButton = {getAttribute(name){return attributes[name];},setAttribute(name,value){attributes[name]=value;},focus(){this.focused=true;}};
const nav = {classList:{toggle(name,on){nav.open=on;}}};
sandbox.document.querySelector = selector => selector === '[data-menu-toggle]' ? menuButton : selector === '#main-navigation' ? nav : null;
menuClick({target:{closest(selector){return selector === '[data-menu-toggle]' ? menuButton : null;}}});
const opened = nav.open && attributes['aria-expanded'] === 'true';
menuKey({key:'Escape'});
const closed = !nav.open && attributes['aria-expanded'] === 'false' && menuButton.focused;
sandbox.document.querySelector = originalQuery;
if (!opened || !closed) throw Error('Mobile navigation check failed');
console.log('mobile navigation check passed');
const budgetSubmit = (listeners.submit || []).find(handler => handler.toString().includes('budget-form'));
if (!budgetSubmit) throw Error('Budget form handler missing');
let prevented = false;
budgetSubmit({target:{id:'budget-form',dataset:{},values:{budget:'5,000'}}, preventDefault(){ prevented = true; }});
const budgetCheck = vm.runInContext(`(() => {
  const html = explore();
  const selected = budgetFilter === 5000 && sortMode === '낮은 가격순' && html.includes('예산 5,000만 원 이하');
  budgetFilter = null; sortMode = '기본순';
  return selected;
})()`, sandbox);
if (!prevented || sandbox.location.hash !== 'explore' || !budgetCheck) throw Error('Budget search check failed');
console.log('budget search check passed');
const topListeners = {}, topButton = {hidden:true,addEventListener(type,fn){topListeners[type]=fn;}};
let topScroll;
const topWindow = {scrollY:0,innerHeight:800,addEventListener(type,fn){topListeners[type]=fn;},matchMedia(){return {matches:false};},scrollTo(value){topScroll=value;}};
const footerMarker = {top:2500,getBoundingClientRect(){return {top:this.top};}};
vm.runInNewContext(fs.readFileSync('back-to-top.js','utf8'), {document:{querySelector(selector){return selector==='footer'?footerMarker:topButton;},documentElement:{scrollHeight:4000}},window:topWindow});
const hiddenAtTop = topButton.hidden;
topWindow.scrollY=1500; footerMarker.top=1000; topListeners.scroll();
const visibleAtBottom = !topButton.hidden;
topListeners.click();
topWindow.scrollY=400; footerMarker.top=2500; topListeners.scroll();
if (!hiddenAtTop || !visibleAtBottom || !topButton.hidden || topScroll?.top !== 0 || topScroll?.behavior !== 'smooth') throw Error('Back to top check failed');
console.log('back to top check passed');
const importedFamiliesCheck = vm.runInContext(`(() => {
  const blocked = ['시트로엥','DS 오토모빌','재규어','리비안','루시드','빈패스트','피스커'];
  const family = cars.find(c => c.brand === 'BMW' && c.name === '5시리즈');
  powerSelection[family.id] = '전기';
  const electric = detail(family.id);
  delete powerSelection[family.id];
  return blocked.every(b => !brands.includes(b) && !cars.some(c => c.brand === b)) &&
    !cars.some(c => c.brand === 'BMW' && c.name === 'i5') &&
    family.danawaOptionIds['전기'] === '4528' && electric.includes('data-power="전기"') &&
    electric.includes('data-model-year=') &&
    !cars.some(c => c.brand === '마세라티' && /Folgore/.test(c.name)) &&
    cars.filter(c => c.brand === '토요타' && /^(캠리|Camry)$/.test(c.name)).length === 1;
})()`, sandbox);
if (!importedFamiliesCheck) throw Error('Imported model family check failed');
console.log('imported model family check passed');
const optionsCheck = vm.runInContext("detail('danawa-4746')", sandbox);
if (!optionsCheck.includes("data-option-lineup") || !optionsCheck.includes("data-option-trim"))
    throw Error("Trim options render check failed");
const danawaHistoryCheck = vm.runInContext(
    `(() => {
  const c=cars.find(c=>c.id==='danawa-4746');
  const year=(collectedOptions[c.danawaId]||[]).map(x=>x.label.match(/(20\\d{2})년형/)?.[1]).find(Boolean);
  const before=detail(c.id);
  selectedModelYears[c.id+'|']='danawa-year-'+year;
  const after=detail(c.id);
  delete selectedModelYears[c.id+'|'];
  return {year,selector:before.includes('danawa-year-'+year),shown:after.includes(year+'년형')&&after.includes('data-option-trim'),placeholder:after.includes('대표 이미지 · 선택한 연식과 외관이 다를 수 있습니다.')};
})()`,
    sandbox,
);
if (
    !danawaHistoryCheck.year ||
    !danawaHistoryCheck.selector ||
    !danawaHistoryCheck.shown ||
    !danawaHistoryCheck.placeholder
)
    throw Error("Danawa year selector check failed");
console.log("trim options render check passed");
const danawaYears = vm.runInContext(
    "cars.filter(c=>c.danawa && (collectedOptions[c.danawaId]||[]).some(x=>/\\d{4}년형/.test(x.label))).length",
    sandbox,
);
console.log("Danawa models with year choices", danawaYears);
const qualityCheck = vm.runInContext(
    "({image:cars.find(c=>c.id==='danawa-4746').officialImage, thumb:galleryThumbnail('https://imgauto-phinf.pstatic.net/example.jpg')})",
    sandbox,
);
if (!qualityCheck.image.includes("model_600.png") || !qualityCheck.thumb.includes("type=f120_80"))
    throw Error("Image quality check failed");
const photoCheck = vm.runInContext(
    "galleryState.car_171299 = {mode:'photos', color:0, photo:0, frame:0}; detail(cars.find(c=>c.brand==='현대'&&c.name==='아이오닉 5').id)",
    sandbox,
);
if (!photoCheck.includes("type=f120_80") || photoCheck.includes("type=h100"))
    throw Error("Gallery thumbnail check failed");
console.log("image quality check passed");
const estimateCheck = vm.runInContext(
    `(() => {
  const s={options:[0],discount:'1000000',subsidy:'3000000',taxBase:'',taxRate:'7',taxRelief:'500000',registration:'100000',bondCost:'50000',other:''};
  const total=estimateTotals(s,{price:'40,000,000',options:[{price:'1,000,000'}]});
  const missing=estimateTotals({...s,manualPrice:''},null);
  const override=estimateTotals({...s,taxBase:'10000000',taxRate:'4',taxRelief:'999999'}, {price:'40,000,000',options:[{price:'1,000,000'}]});
  const clamped=estimateTotals({...s,discount:'999999999',subsidy:'999999999'}, {price:'40,000,000',options:[{price:'1,000,000'}]});
  return {total:total.total,tax:total.tax,taxBase:total.taxBase,missing:missing.total,overrideTax:override.tax,clampedSubtotal:clamped.subtotal,clampedSubsidy:clamped.subsidy,detail:detail('danawa-4746').includes('#estimate/danawa-4746'),form:estimate('danawa-4746').includes('id="estimate-form"')};
})()`,
    sandbox,
);
if (
    estimateCheck.total !== 39195450 ||
    estimateCheck.tax !== 2045450 ||
    estimateCheck.missing !== null ||
    estimateCheck.overrideTax !== 0 ||
    estimateCheck.clampedSubtotal !== 0 ||
    estimateCheck.clampedSubsidy !== 0 ||
    !estimateCheck.detail ||
    !estimateCheck.form
)
    throw Error("Estimate calculation check failed: " + JSON.stringify(estimateCheck));
console.log("estimate calculation check passed");
const historyAudit = vm.runInContext(
    `(() => {
  const issues=[], counts={checked:0};
  for (const car of cars) {
    if (car.danawa || car.special || car.commercial) continue;
    const variants=car.variants?Object.entries(car.variants):[['',car.naver]];
    for(const [power,data] of variants){
      const source=data?.source?.match(/car_\\d+/)?.[0];
      if(!source) continue;
      const history=expandedHistoryById[source]||[];
      if(car.variants) powerSelection[car.id]=power;
      for(const row of history){
        selectedModelYears[car.id+'|'+power]=row.modelId;
        try {const html=detail(car.id);counts.checked++;if(!html.includes(row.name)||!html.includes(row.year)) issues.push(car.brand+' '+car.name+' '+row.year);}
        catch(e){issues.push(car.brand+' '+car.name+' '+row.year+': '+e.message);}
      }
      delete selectedModelYears[car.id+'|'+power];
      if(car.variants) delete powerSelection[car.id];
    }
  }
  return {checked:counts.checked,issues:issues.slice(0,20),total:issues.length};
})()`,
    sandbox,
);
console.log("history audit", JSON.stringify(historyAudit));
