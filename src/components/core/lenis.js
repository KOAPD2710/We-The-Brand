import Lenis from '@studio-freight/lenis';

let lenis;

function easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
}
function easeInSine(x) {
    return 1 - Math.cos((x * Math.PI) / 2);
}
function easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}
function easeOutCirc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
}
function easeInQuint(x) {
    return x * x * x * x * x;
}
function easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
}
function easeInQuad(x) {
    return x * x;
}
function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}
function easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function initLenis(isInfinite) {
    // console.log('init lenis')
    // console.log(isInfinite);
    if (!lenis) {
        lenis = new Lenis({
            duration: 1.5,
            easing: (t) => (easeOutExpo(t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: isInfinite ? true : false,
            syncTouch: true
        })
    }

    function onRaf(time) {
        lenis.raf(time)
        requestAnimationFrame(onRaf)
    }
    requestAnimationFrame(onRaf)
}

function getLenis(isInfinite) {
    if (!lenis) {
        initLenis(isInfinite);
    }

    return lenis;
}

export { initLenis, getLenis }