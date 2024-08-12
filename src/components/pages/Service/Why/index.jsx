import { useEffect } from 'react';
import './style.scss'

import { scroll, animate, spring } from "motion";
import { getTranslate } from '@/js/utils';


const ServiceWhy = ({ SerWhyImg, WhyData, WhyThumb, ...props }) => {
    useEffect(() => {
        const target = {
            wrap: document.querySelector('.service-why-thumb'),
            translate: document.querySelector('.service-why-thumb-translate')
        }

        target.wrap.style.height = `${target.translate.offsetWidth * 1.5}px`;

        let distance = target.translate.offsetWidth - window.innerWidth;

        scroll(
            animate(target.translate,
                {
                    transform: [getTranslate(0, 0, 0), getTranslate(-distance, 0, 0)]
                },
                {
                    easing: spring({ velocity: 500 })
                }
            ),
            { target: target.wrap, offset: ["start start", "end end"] }
        )
    }, [])

    return (
        <section className='service-why'>
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
                        <div className="txt txt-16 service-why-label">&#123; Why choose us &#125;</div>
                        <a href="./" className='hover-line service-why-link'>Let's work together!</a>
                    </div>
                    <div className="service-why-list">
                        {WhyData.map((reason, idx) => (
                            <div className="service-why-item" key={reason.title}>
                                <div className="txt txt-24 service-why-item-no">
                                    &#123;&nbsp;<span className='txt-16'>0{idx + 1}</span>&nbsp;&#125;
                                </div>
                                <div className="h3 txt-up service-why-item-title">{reason.title}</div>
                                <div className="txt txt-16 service-why-item-desc">
                                    {reason.desc}
                                </div>
                                <div className="line"></div>
                            </div>
                        ))}
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