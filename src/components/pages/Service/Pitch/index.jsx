
import './style.scss'

const ServicePitch = ({ PitchImg, ...props }) => {
    return (
        <section className="service-pitch" data-cursor-showcoor>
            <div className="container grid">
                <div className="service-pitch-content">
                    <div className="txt txt-16 service-pitch-label">
                        &#123; Out pitch &#125;
                    </div>
                    <h1 className='h1 txt-up service-pitch-title'>
                        We help brands be their most (<span className='txt-italic txt-med'>inspiring</span>) selves.<br /> Own their <span className='txt-gradient'>quirks</span>.
                    </h1>
                </div>
                <div className="service-pitch-thumb">
                    {PitchImg.map((img) => (
                        <div className="service-pitch-thumb-img" key={img.name}>
                            <img src={img.img.src} alt="" className='img img-fill' />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}


export default ServicePitch;