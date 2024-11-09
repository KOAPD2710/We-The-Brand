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
                    <CurlyBrackets>What we do</CurlyBrackets>
                </div>
                <h2 className="h2 home-service-do-content">
                    From strategic digital marketing campaigns to captivating content creation, our team of digital specialists is equipped with the skills and creativity to elevate brands to new heights in the digital landscape.
                </h2>
                <div className="home-service-title-wrapper">
                    <h1 className='h1 txt-up home-service-title'>
                        Our<br />(<span className='txt-italic txt-med'>expertises</span>)
                    </h1>
                    <div className="home-service-cat">
                        <div className="img">
                            {props.SerCat}
                        </div>
                    </div>
                </div>
                <div className="home-service-list">
                    {Expertise.map((service) => (
                        <div className="home-service-item" key={service.name}>
                            <div className="home-service-label">
                                <CurlyBrackets>{service.name}</CurlyBrackets>
                            </div>
                            <div className="line"></div>
                            <div className="txt txt-16 home-service-desc">
                                {service.desc}
                            </div>
                            <div className="home-service-inner">
                                {service.list.map((item, idx) => (
                                    <div className="home-service-inner-item" key={item.title}>
                                        <div className="txt-24 home-service-inner-item-title-wrapper">
                                            <div className="home-service-inner-item-title-no">
                                                <CurlyBrackets><span className='txt-16'>0{idx + 1}</span></CurlyBrackets>
                                            </div>
                                            <div className="home-service-inner-item-title">{item.title}</div>
                                        </div>
                                        <div className="line"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div className="line"></div> */}
            </div>
        </section>
    )
}


export default HomeService;