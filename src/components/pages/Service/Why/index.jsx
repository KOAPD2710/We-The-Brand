import './style.scss'
import { useEffect, useRef } from 'react';
import { scroll, animate, spring, inView } from "motion";
import { getRotationDegrees, getTranslate, lerp, parseRem } from '@/js/utils';
import CurlyBrackets from '@/components/common/CurlyBrackets';
import { useGSAP } from '@gsap/react';

const ServiceWhy = ({ SerWhyImg, WhyData, WhyThumb, ...props }) => {
    const container = useRef();

    useGSAP((context) => {
        const target = {
            slide: document.querySelector('.service-why-thumb'),
            slideTranslate: document.querySelector('.service-why-thumb-translate'),
        }
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: target.slide,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true
            }
        })

        let distance = target.slideTranslate.offsetWidth - window.innerWidth;
        gsap.set(target.slide, { height: distance * 2 })

        tl.to(target.slideTranslate, {
            x: -distance
        })
    }, {
        scope: container
    })

    // useEffect(() => {
    //     const target = {
    //         wrap: document.querySelector('.service-why-thumb'),
    //         translate: document.querySelector('.service-why-thumb-translate'),
    //         thumbWrapper: document.querySelector('.service-why-list'),
    //         thumbTranslate: document.querySelector('.service-why-list-thumb-translate'),
    //     }

    //     // target.wrap.style.height = `${target.translate.offsetWidth * 1.5}px`;

    //     // let distance = target.translate.offsetWidth - window.innerWidth;

    //     // scroll(
    //     //     animate(target.translate,
    //     //         { transform: [getTranslate(0, 0, 0), getTranslate(-distance, 0, 0)] },
    //     //         { easing: spring({ velocity: 500 }) }
    //     //     ),
    //     //     { target: target.wrap, offset: ["start start", "end end"] }
    //     // )

    //     let raf;
    //     let speed = 0.05
    //     let pointer = {
    //         x: 0,
    //         y: 0
    //     }
    //     let isInView = false

    //     inView('.service-why-main', () => {
    //         isInView = true

    //         return () => isInView = false
    //     }, { margin: "-5% 0% -5% 0%" })

    //     function moveThumb() {
    //         let wrapperBounding = target.thumbWrapper.getBoundingClientRect()
    //         pointer = {
    //             x: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cursor-left').trim()),
    //             y: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cursor-top').trim())
    //         }
    //         let curPos = {
    //             x: new DOMMatrixReadOnly(getComputedStyle(target.thumbTranslate).transform).m41,
    //             y: new DOMMatrixReadOnly(getComputedStyle(target.thumbTranslate).transform).m42,
    //             rotate: getRotationDegrees(target.thumbTranslate)
    //         }
    //         let targetPos = {
    //             x: pointer.x - wrapperBounding.left - wrapperBounding.width / 2,
    //             y: pointer.y - wrapperBounding.top - wrapperBounding.height / 2 - parseRem(50),
    //         }
    //         let targetRotate = (targetPos.x / (wrapperBounding.width / 2)) * 20

    //         if (target.thumbWrapper.matches(':hover')) {
    //             if (!target.thumbTranslate.matches('.active')) {
    //                 target.thumbTranslate.classList.add('active')
    //             }
    //         } else {
    //             if (target.thumbTranslate.matches('.active')) {
    //                 target.thumbTranslate.classList.remove('active')
    //             }
    //         }

    //         if (isInView) {
    //             target.thumbTranslate.style.transform = `translate(${lerp(curPos.x, targetPos.x, speed)}px, ${lerp(curPos.y, targetPos.y, speed)}px)` + `rotate(${lerp(curPos.rotate, targetRotate, .01)}deg)`
    //         } else {
    //             target.thumbTranslate.style.transform = `translate(${lerp(curPos.x, 0, speed)}px, ${lerp(curPos.y, 0, speed)}px) rotate(${curPos.rotate, 0, speed}deg)`
    //         }

    //         raf = window.requestAnimationFrame(moveThumb)
    //     }
    //     raf = window.requestAnimationFrame(moveThumb)

    //     return () => {
    //         cancelAnimationFrame(raf)
    //     }
    // }, [])

    return (
        <section className='service-why' ref={container}>
            <div className="container grid">
                <div className="service-why-head">
                    <div className="txt txt-16 service-why-head-label">@2024</div>
                    <div className="service-why-title-wrapper">
                        <div className="h1 txt-up service-why-title service-why-title-start">We build</div>
                        <div className="h1 service-why-title-img-wrapper">
                            &nbsp;
                            <div className="service-why-title-img">
                                {SerWhyImg}
                            </div>
                            &nbsp;
                        </div>
                        <div className="h1 txt-up service-why-title service-why-title-end">
                            (<span className='txt-italic txt-med'>creative</span> )<br />connection
                        </div>
                    </div>
                </div>
                <div className="service-why-main">
                    <div className="service-why-label-wrapper">
                        <div className="txt txt-16 service-why-label">
                            <CurlyBrackets>
                                Why choose us
                            </CurlyBrackets>
                        </div>
                        <a href="./" className='txt-med hover-line service-why-link'>Let's work together!</a>
                    </div>
                    <div className="service-why-list">
                        {WhyData.map((reason, idx) => (
                            <div className="service-why-item" key={reason.title}>
                                <div className="txt txt-24 service-why-item-no">
                                    <CurlyBrackets>
                                        <span className='txt-16'>0{idx + 1}</span>
                                    </CurlyBrackets>
                                </div>
                                <div className="h3 txt-up service-why-item-title">{reason.title}</div>
                                <div className="txt txt-16 service-why-item-desc">
                                    {reason.desc}
                                </div>
                                <div className="line"></div>
                            </div>
                        ))}
                        <div className="service-why-list-thumb">
                            <div className="service-why-list-thumb-translate">
                                {WhyData.map((reason, idx) => (
                                    <div className="service-why-list-thumb-inner" key={idx}>
                                        <img src={reason.thumb.src} alt="" width={reason.thumb.width} className='img img-fill' />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="service-why-thumb">
                    <div className="service-why-thumb-sticky">
                        <div className="service-why-thumb-translate">
                            {WhyThumb.map((img, idx) => (
                                <div className="service-why-thumb-item" key={idx}>
                                    <img src={img.src} alt="" width={img.width} className='img img-fill' />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )


}


export default ServiceWhy;