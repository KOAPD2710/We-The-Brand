import { useEffect } from 'react';
import './style.scss';


const ServiceService = ({ Expertise, ...props }) => {
    // useEffect(() => {
    //     console.log(Expertise);
    // }, [])
    return (
        <section className="service-service">
            <div className="container grid">
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
                                &#123; {service.name} &#125;
                            </div>
                            <div className="line"></div>
                            <div className="txt txt-16 service-service-desc">
                                {service.desc}
                            </div>
                            <div className="service-service-inner">
                                {service.list.map((item, idx) => (
                                    <div className="service-service-inner-item" key={item.title}>
                                        <div className="txt-24 service-service-inner-item-title-wrapper">
                                            <div className="service-service-inner-item-title-no">&#123;<span className='txt-16'>&nbsp;0{idx + 1}&nbsp;</span>&#125;</div>
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