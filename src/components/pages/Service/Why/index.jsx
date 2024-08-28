import './style.scss'
import { useEffect, useRef } from 'react';
import { lerp, parseRem, rotGetter, rotSetter, xGetter, xSetter, yGetter, ySetter } from '@/js/utils';
import CurlyBrackets from '@/components/common/CurlyBrackets';
import { useGSAP } from '@gsap/react';
import { Mouse } from '@/components/core/mouse';
import Video from '@/components/common/VideoFormat';

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
        scope: container,
        revertOnUpdate: true
    })

    useEffect(() => {
        const target = {
            listItem: document.querySelectorAll('.service-why-item'),
            thumbWrapper: document.querySelector('.service-why-list'),
            thumbTranslate: document.querySelector('.service-why-list-thumb-translate'),
        }

        let raf;

        function moveThumbFunc() {
            let speed = 0.06
            let pointer = {
                x: 0,
                y: 0
            }
            let targetPos = {
                x: 0,
                y: 0
            }
            let activeIdx = undefined;

            target.listItem.forEach((el, idx) => {
                el.addEventListener('pointerenter', function (e) {
                    let itemIdx = [...target.listItem].indexOf(el)
                    activeIdx = itemIdx
                })
                el.addEventListener('pointerleave', function () {
                    activeIdx = undefined;
                })
            })



            function moveThumb() {
                let curPos = {
                    x: xGetter(target.thumbTranslate),
                    y: yGetter(target.thumbTranslate),
                    rotate: rotGetter(target.thumbTranslate)
                }

                if (ScrollTrigger.isInViewport(target.thumbWrapper)) {
                    pointer = Mouse()

                    let wrapperBounding = target.thumbWrapper.getBoundingClientRect()
                    targetPos = {
                        x: pointer.x - wrapperBounding.left - wrapperBounding.width / 2,
                        y: pointer.y - wrapperBounding.top - wrapperBounding.height / 2 - parseRem(50),
                    }
                    let targetRotate = targetPos.x / (wrapperBounding.width / 2) * 30

                    xSetter(target.thumbTranslate)(lerp(curPos.x, targetPos.x, speed))
                    ySetter(target.thumbTranslate)(lerp(curPos.y, targetPos.y, speed))
                    rotSetter(target.thumbTranslate)(lerp(curPos.rotate, targetRotate, speed))
                } else {
                    xSetter(target.thumbTranslate)(lerp(curPos.x, 0, speed))
                    ySetter(target.thumbTranslate)(lerp(curPos.y, 0, speed))
                    rotSetter(target.thumbTranslate)(lerp(curPos.rotate, 0, speed))
                }

                raf = window.requestAnimationFrame(moveThumb)
            }
            raf = window.requestAnimationFrame(moveThumb)
        }

        if (window.innerWidth > 991) {
            moveThumbFunc()
        }
        console.log(WhyData);
        return () => {
            cancelAnimationFrame(raf)
        }
    }, [])


    return (
        <section className='service-why' ref={container}>
            <div className="container grid">
                <div className="service-why-head">
                    <div className="txt txt-16 service-why-head-label">© 2024</div>
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
                            <div className="service-why-title-end-inner mid">
                                (<span className='txt-italic txt-med'>creative</span> )
                            </div>
                            <div className="service-why-title-end-inner end">connection</div>
                        </div>
                    </div>
                </div>
                <div className="service-why-main">
                    <div className="txt txt-16 service-why-label">
                        <CurlyBrackets>Why choose us</CurlyBrackets>
                    </div>
                    <div className="service-why-link-wrapper">
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
                                <div className="line line-top"></div>
                                {idx == WhyData.length - 1 && (
                                    <div className="line line-bot"></div>
                                )}
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
                            {WhyThumb.map((thumb, idx) => (
                                <div className="service-why-thumb-item" key={idx}>
                                    {thumb.thumbType == 'image' && (
                                        <img src={thumb.thumb.src} alt="" width={thumb.thumb.width} className='img img-fill' />
                                    )}
                                    {thumb.thumbType == 'video' && (
                                        <Video src={thumb.thumb} className='img img-fill' />
                                    )}
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