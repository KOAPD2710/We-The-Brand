import './style.scss';
import { useEffect } from 'react';
import CurlyBrackets from '@/components/common/CurlyBrackets';


const ServiceService = ({ Expertise, ...props }) => {
    // useEffect(() => {
    //     console.log(Expertise);
    // }, [])
    return (
        <section className="service-service">
            <div className="container grid">
                <div className="service-service-do-label">
                    <CurlyBrackets>What we do</CurlyBrackets>
                </div>
                <h2 className="h2 service-service-do-content">
                    From strategic digital marketing campaigns to captivating content creation, our team of digital specialists is equipped with the skills and creativity to elevate brands to new heights in the digital landscape.
                </h2>
                <div className="service-service-title-wrapper">
                    <h1 className='h1 txt-up service-service-title'>
                        Our<br />(<span className='txt-italic txt-med'>expertises</span>)
                    </h1>
                    <div className="service-service-cat">
                        <div className="img">
                            {props.SerCat}
                        </div>
                    </div>
                </div>
                <div className="service-service-list">
                    {Expertise.map((service) => (
                        <div className="service-service-item" key={service.name}>
                            <div className="service-service-label">
                                <CurlyBrackets>{service.name}</CurlyBrackets>
                            </div>
                            <div className="line"></div>
                            <div className="txt txt-16 service-service-desc">
                                {service.desc}
                            </div>
                            <div className="service-service-inner">
                                {service.list.map((item, idx) => (
                                    <div className="service-service-inner-item" key={item.title}>
                                        <div className="txt-24 service-service-inner-item-title-wrapper">
                                            <div className="service-service-inner-item-title-no">
                                                <CurlyBrackets><span className='txt-16'>0{idx + 1}</span></CurlyBrackets>
                                            </div>
                                            <div className="service-service-inner-item-title">{item.title}</div>
                                        </div>
                                        <div className="line"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="line"></div>
            </div>
        </section>
    )
}


export default ServiceService;