import './style.scss'
import { useEffect, useRef } from 'react';
import { lerp, parseRem, rotGetter, rotSetter, xGetter, xSetter, yGetter, ySetter } from '@/js/utils';
import CurlyBrackets from '@/components/common/CurlyBrackets';
import { useGSAP } from '@gsap/react';
import { Mouse } from '@/components/core/mouse';
import Video from '@/components/common/VideoFormat';

const HomeWhy = ({ WhyData, ...props }) => {
    const container = useRef();

    useGSAP(() => {
        const tlStack = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: `top+=${.2 * window.innerHeight} bottom`,
                end: `top+=${.2 * window.innerHeight} top`,
                scrub: true,
            }
        })

        tlStack.from(container.current, {
            y: -.2 * window.innerHeight,
            ease: 'none'
        })
    }, {
        scope: container,
        revertOnUpdate: true
    })

    return (
        <section className='home-why' ref={container}>
            <div className="container grid">
                <div className="home-why-head">
                    <div className="txt txt-16 home-why-head-label">© 2024</div>
                    <div className="home-why-title-wrapper">
                        <div className="h1 txt-up home-why-title home-why-title-start">We build</div>
                        <div className="h1 home-why-title-img-wrapper">
                            &nbsp;
                            <div className="home-why-title-img">
                                {props.SerWhyImg}
                            </div>
                            &nbsp;
                        </div>
                        <div className="h1 txt-up home-why-title home-why-title-end">
                            <div className="home-why-title-end-inner mid">
                                (<span className='txt-italic txt-med'>creative</span> )
                            </div>
                            <div className="home-why-title-end-inner end">connection</div>
                        </div>
                    </div>
                </div>
                <div className="home-why-main">
                    <div className="txt txt-16 home-why-label">
                        <CurlyBrackets>Why choose us</CurlyBrackets>
                    </div>
                    <div className="home-why-link-wrapper">
                        <a href="./" className='txt-med hover-line home-why-link'>Let's work together!</a>
                    </div>
                    <div className="home-why-list">
                        {WhyData.map((reason, idx) => (
                            <div className="home-why-item" key={reason.title}>
                                <div className="txt txt-24 home-why-item-no">
                                    <CurlyBrackets>
                                        <span className='txt-16'>0{idx + 1}</span>
                                    </CurlyBrackets>
                                </div>
                                <div className="h3 txt-up home-why-item-title">{reason.title}</div>
                                <div className="txt txt-16 home-why-item-desc">
                                    {reason.desc}
                                </div>
                                <div className="line line-top"></div>
                                {idx == WhyData.length - 1 && (
                                    <div className="line line-bot"></div>
                                )}
                            </div>
                        ))}
                        <div className="home-why-list-thumb">
                            <div className="home-why-list-thumb-translate">
                                {WhyData.map((reason, idx) => (
                                    <div className="home-why-list-thumb-inner" key={idx}>
                                        <img src={reason.thumb.src} alt="" width={reason.thumb.width} className='img img-fill' />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default HomeWhy;