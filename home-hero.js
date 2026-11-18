(() => {
    let playing = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timer;
    let drag;
    const app = document.querySelector('#app');
    const carousel = () => app && app.querySelector('[data-hero-carousel]');

    function show(hero, requested) {
        const slides = Array.from(hero.querySelectorAll('.hero-slide'));
        const dots = hero.querySelectorAll('[data-hero-index]');
        if (!slides.length) return;
        const index = (requested + slides.length) % slides.length;
        slides.forEach((slide, i) => {
            slide.classList.toggle('is-active', i === index);
            slide.setAttribute('aria-hidden', String(i !== index));
            slide.inert = i !== index;
            if (i === index) dots[i].setAttribute('aria-current', 'true');
            else dots[i].removeAttribute('aria-current');
        });
        hero.dataset.current = String(index);
        hero.querySelector('[data-hero-count]').textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    }
    function updatePlay(hero) {
        const button = hero.querySelector('[data-hero-play]');
        button.textContent = playing ? 'Ⅱ' : '▶';
        button.setAttribute('aria-label', playing ? '자동 넘김 일시정지' : '자동 넘김 재생');
    }
    function start() {
        window.clearInterval(timer);
        const hero = carousel();
        if (!hero) return;
        updatePlay(hero);
        timer = window.setInterval(() => {
            if (playing && !document.hidden && !hero.matches(':hover') && !hero.contains(document.activeElement)) {
                show(hero, Number(hero.dataset.current || 0) + 1);
            }
        }, 7000);
    }
    document.addEventListener('click', event => {
        const hero = carousel();
        if (!hero || !hero.contains(event.target)) return;
        const button = event.target.closest('button');
        if (!button) return;
        const current = Number(hero.dataset.current || 0);
        if (button.hasAttribute('data-hero-prev')) show(hero, current - 1);
        else if (button.hasAttribute('data-hero-next')) show(hero, current + 1);
        else if (button.hasAttribute('data-hero-index')) show(hero, Number(button.dataset.heroIndex));
        else if (button.hasAttribute('data-hero-play')) { playing = !playing; updatePlay(hero); }
    });
    document.addEventListener('keydown', event => {
        const hero = carousel();
        if (!hero || event.target !== hero) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            show(hero, Number(hero.dataset.current || 0) + (event.key === 'ArrowRight' ? 1 : -1));
        }
    });
    document.addEventListener('pointerdown', event => {
        const hero = carousel();
        if (!hero || !hero.contains(event.target) || event.target.closest('a, button')) return;
        drag = { x: event.clientX, y: event.clientY, id: event.pointerId };
    });
    document.addEventListener('pointerup', event => {
        const hero = carousel();
        if (!drag || !hero || drag.id !== event.pointerId) return;
        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;
        drag = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) show(hero, Number(hero.dataset.current || 0) + (dx < 0 ? 1 : -1));
    });
    document.addEventListener('pointercancel', () => { drag = null; });
    if (app) new MutationObserver(start).observe(app, { childList: true });
    start();
})();
