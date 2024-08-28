/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />


interface Window {
    gsap: typeof import("gsap").gsap;
    ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
    lenis: typeof import("lenis").lenis
}