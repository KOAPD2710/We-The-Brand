import { useEffect } from 'react';
import './style.scss'


const ServiceHero = ({ ...props }) => {
    return (
        <section className="service-hero">
            <div className="container">

            </div>
            <div className="service-hero-bg">
                <video className='img img-fill' muted autoPlay loop>
                    <source src='/public/video/Ser-hero.webm' type="video/webm" />
                </video>
            </div>
        </section>
    )
}


export default ServiceHero;