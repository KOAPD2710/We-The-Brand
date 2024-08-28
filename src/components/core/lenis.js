import Lenis from 'lenis';

let lenis;

function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function initLenis(isInfinite) {
    if (!lenis) {
        lenis = new Lenis({
            duration: 1.5,
            easing: (t) => (easeOutExpo(t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            smoothTouch: true,
            touchMultiplier: 2,
            infinite: isInfinite ? true : false,
            syncTouch: true,
            syncTouchLerp: 0.075
        })

        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        lenis.scrollTo(0, { immediate: true })
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