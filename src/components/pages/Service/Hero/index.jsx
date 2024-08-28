import './style.scss';
import { useEffect, useState, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isHeaderLight } from '@/globals/Header/store';
import { animate, scroll, inView } from 'motion';
import { scrambleText } from '@/js/scrambleText';
import { useGSAP } from '@gsap/react';
import Video from '@/components/common/VideoFormat';


const ServiceHero = ({ ...props }) => {
    const ref = useRef()
    const $isHeaderLight = useStore(isHeaderLight);

    const [currIdxTxt, setcurrIdxTxt] = useState(0);

    const txtArray = ['turn ', 'build']

    function loopScrambleTxt(text) {
        const target = document.querySelector('.service-hero-line .scramble-txt')
        scrambleText(target, text, { type: 'text' })
    }

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: ref.current,
            start: 'top top+=5%',
            end: 'bottom center',
            onEnter: () => isHeaderLight.set(true),
            onLeaveBack: () => isHeaderLight.set(false),
            onEnterBack: () => isHeaderLight.set(true),
            onLeave: () => isHeaderLight.set(false),
        });
    }, {
        scope: ref,
        revertOnUpdate: true
    })


    // useEffect(() => {
    //     scroll(({ y }) => {
    //         if (y.progress > 0.5) {
    //             isHeaderLight.set(false)
    //         } else {
    //             isHeaderLight.set(true)
    //         }
    //     }, {
    //         target: ref.current,
    //         offset: ['start start', 'end start']
    //     })
    // }, [])

    useEffect(() => {
        let timeout;
        inView(ref.current, () => {
            timeout = setTimeout(() => {
                const nextIndex = (currIdxTxt + 1) % txtArray.length;
                setcurrIdxTxt(nextIndex);
                loopScrambleTxt(txtArray[nextIndex]);
            }, 2500);

            return () => clearTimeout(timeout);
        }, { margin: '-10% 0% -10% 0%' });

        return () => clearTimeout(timeout);
    }, [currIdxTxt]);


    return (
        <section className="service-hero" ref={ref} data-cursor-showcoor>
            <div className="container grid">
                <div className="service-hero-line line-1 slot-1">
                    <div className="txt txt-16">© 2024</div>
                </div>
                <div className="service-hero-line line-1 slot-2">
                    <div className="txt txt-16">&#123; Helping with &#125;</div>
                </div>
                <div className="service-hero-line line-1 slot-3">
                    <div className="txt txt-16 service-hero-skill">
                        <div className="service-hero-skill-item">Marketing Strategy</div>
                        <div className="service-hero-skill-item">Brand Identity</div>
                        <div className="service-hero-skill-item">UI/UX Design</div>
                        <div className="service-hero-skill-item">Front-end Development</div>
                        <div className="service-hero-skill-item">Social Media</div>
                    </div>
                </div>
                <div className="service-hero-line line-2 slot-1">
                    <div className="txt h0 txt-up">We</div>
                </div>
                <div className="service-hero-line line-2 slot-2">
                    <div className="txt txt-16">We help you stand out in a crowded market and navigate your digital transformation through bespoke creative solutions, providing a personal touch.</div>
                </div>
                <div className="service-hero-line line-2 slot-3">
                    <div className="txt h0 txt-up">
                        (<span className='txt-italic txt-med scramble-txt'>Turn </span>)
                    </div>
                </div>
                <div className="service-hero-line line-3">
                    <div className="txt h0 txt-up">ideas</div>
                </div>
                <div className="service-hero-bg">
                    <Video src={props.video} className='img img-fill'></Video>
                    <div className="service-hero-bg-filter"></div>
                </div>
            </div>
        </section>
    )
}


export default ServiceHero;