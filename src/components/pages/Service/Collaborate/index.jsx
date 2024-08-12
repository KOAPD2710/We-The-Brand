import { useEffect } from 'react';
import './style.scss'

const ServiceCollaborate = ({ CollaImg, ...props }) => {

    useEffect(() => {
        // console.log(CollaImg);
    }, [])

    return (
        <section className='service-colla'>
            <div className="container grid">
                <div className="service-colla-label">&#123; How we collaborate &#125;</div>
                <div className="txt txt-16 service-colla-desc">
                    Mixing multicultural talents with top-notch service vibes!
                </div>
                <div className="h2 service-colla-content">
                    Alright, let's kick things off by getting to know each other better. We're all about diving (<span className='txt-italic'>deep into</span>) your brand, goals, and what you're aiming for. Then, we cook up a plan to tackle the awesome stuff ahead.
                </div>
                <div className="service-colla-thumb">
                    {CollaImg.map((img) => (
                        <div className="service-colla-thumb-img" key={img.name}>
                            <img src={img.img.src} width={img.img.width} alt="" className='img img-fill' />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}


export default ServiceCollaborate;