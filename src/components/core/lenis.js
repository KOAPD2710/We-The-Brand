import Lenis from 'lenis';

let lenis;
let lenisRaf;

function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function callLenis(isInfinite) {
    lenis = new Lenis({
        duration: 1.5,
        // easing: (window.innerWidth > 991) ? (t) => easeOutExpo(t) : undefined,
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: true,
        touchMultiplier: 2,
        infinite: isInfinite ? true : false,
        syncTouch: isInfinite ? true : false,
        syncTouchLerp: isInfinite ? 0.075 : false
    })
}

function initLenis(isInfinite) {
    callLenis(isInfinite)
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    function onRaf(time) {
        lenis.raf(time)
        lenisRaf = window.requestAnimationFrame(onRaf)
    }
    lenisRaf = window.requestAnimationFrame(onRaf)

    lenis.scrollTo(0, { immediate: true })
}

function resetLenis(isInfinite) {
    if (!lenis) {
        initLenis(isInfinite)
    } else {
        lenis.destroy()
        initLenis(isInfinite)
    }
}


function getLenis(isInfinite) {
    if (!lenis) {
        initLenis(isInfinite)
    }
    return lenis;
}

export { initLenis, getLenis, resetLenis, lenisRaf }