import Lenis from '@studio-freight/lenis';

let lenis;

function initLenis() {
    console.log('init lenis')
    lenis = new Lenis({
        duration: 1.5,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    })


    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
}

function getLenis() {
    if (!lenis) {
        initLenis()
    }
    return lenis;
}

export { initLenis, getLenis }