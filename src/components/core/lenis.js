import Lenis from '@studio-freight/lenis';

let lenis;

function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
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

        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)
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