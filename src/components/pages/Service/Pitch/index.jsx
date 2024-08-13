import { useEffect, useState } from 'react';
import { scroll, inView } from 'motion';
import { scrambleText } from '@/js/scrambleText';
import './style.scss'

const ServicePitch = ({ PitchImg, ...props }) => {
    const [currIdxTxt, setcurrIdxTxt] = useState(0);
    const txtGradientArray = ['quirks', 'features', 'edges']

    function loopScrambleTxt(text) {
        const target = document.querySelector('.scramble-txt')
        scrambleText(target, text)
    }

    useEffect(() => {
        let timeout;
        inView('.service-pitch', () => {
            timeout = setTimeout(() => {
                const nextIndex = (currIdxTxt + 1) % txtGradientArray.length;
                setcurrIdxTxt(nextIndex);
                loopScrambleTxt(txtGradientArray[nextIndex]);
            }, 3000);

            return () => clearTimeout(timeout);
        }, { margin: '-10% 0% -10% 0%' });

        return () => clearTimeout(timeout);
    }, [currIdxTxt]);

    return (
        <section className="service-pitch" data-cursor-showcoor>
            <div className="container grid">
                <div className="service-pitch-content">
                    <div className="txt txt-16 service-pitch-label">
                        &#123; Out pitch &#125;
                    </div>
                    <h1 className='h1 txt-up service-pitch-title'>
                        We help brands be their most (<span className='txt-italic txt-med'>inspiring</span>) selves.<br /> Own their<br /><span className='txt-gradient scramble-txt'>quirks</span>.
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