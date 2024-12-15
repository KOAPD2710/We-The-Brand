import './style.scss';
import { useEffect, useRef } from 'react';
import CurlyBrackets from '@/components/common/CurlyBrackets';
import { useGSAP } from '@gsap/react';


const HomeService = ({ Expertise, ...props }) => {
    const container = useRef()

    useGSAP(() => {
        const tlStack = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: true,
            }
        })

        tlStack.to(container.current, {
            y: .4 * window.innerHeight,
            ease: 'none'
        })
    }, {
        scope: container,
        revertOnUpdate: true
    })
    return (
        <section className="home-service" ref={container} id='servicesSc'>
            <div className="container grid">
                <div className="home-service-do-label">
                    <CurlyBrackets>{props.primary.label[0].text}</CurlyBrackets>
                </div>
                <h2 className="h2 home-service-do-content">
                    {/* From strategic digital marketing campaigns to captivating content creation, our team of digital specialists is equipped with the skills and creativity to elevate brands to new heights in the digital landscape. */}
                    {props.primary.description[0].text}
                </h2>
                <div className="home-service-title-wrapper">
                    <h1 className='h1 txt-up home-service-title'>
                        Our<br />(<span className='txt-italic txt-med'>expertises</span>)
                    </h1>
                    <div className="home-service-cat">
                        <img src={props.primary.image.url} width={props.primary.image.dimensions.width} height={props.primary.image.dimensions.height} className='img img-fill' />
                    </div>
                </div>
                <div className="home-service-list">
                    {Expertise.map((service, idx) => (
                        <div className="home-service-item" key={idx}>
                            <div className="home-service-label">
                                <CurlyBrackets>{service.data.service_title}</CurlyBrackets>
                            </div>
                            <div className="line" />
                            <div className="txt txt-16 home-service-desc">
                                {service.data.service_describe[0].text}
                            </div>
                            <div className="home-service-inner">
                                {service.data.service_scope_work_list.map((item, idx) => (
                                    <div className="home-service-inner-item" key={idx}>
                                        <div className="txt-24 home-service-inner-item-title-wrapper">
                                            <div className="home-service-inner-item-title-no">
                                                <CurlyBrackets><span className='txt-16'>0{idx + 1}</span></CurlyBrackets>
                                            </div>
                                            <div className="home-service-inner-item-title">{item.scope}</div>
                                        </div>
                                        <div className="line"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}


export default HomeService;