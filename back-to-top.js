(() => {
    const button = document.querySelector('.back-to-top');
    if (!button) return;
    const footer = document.querySelector('footer');
    const update = () => {
        const remaining = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
        const nearFooter = footer?.getBoundingClientRect ? footer.getBoundingClientRect().top <= window.innerHeight + 240 : remaining <= 300;
        button.hidden = window.scrollY < 120 || !nearFooter;
    };
    button.addEventListener('click', () => {
        const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({top: 0, behavior: reduced ? 'auto' : 'smooth'});
    });
    window.addEventListener('scroll', update, {passive: true});
    window.addEventListener('resize', update);
    window.addEventListener('hashchange', update);
    update();
})();
