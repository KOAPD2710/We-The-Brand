import './style.scss';
import { useEffect, useState, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isHeaderLight } from '@/globals/Header/store';
import { animate, scroll, inView } from 'motion';
import { scrambleText } from '@/js/scrambleText';
import { useGSAP } from '@gsap/react';
import Video from '@/components/common/VideoFormat';
import CurlyBrackets from '@/components/common/CurlyBrackets';


const HomeHero = ({ ...props }) => {
    const container = useRef()
    const $isHeaderLight = useStore(isHeaderLight);

    const [currIdxTxt, setcurrIdxTxt] = useState(0);

    const txtArray = ['turn ', 'build']

    function loopScrambleTxt(text) {
        const target = document.querySelector('.home-hero-line .scramble-txt')
        scrambleText(target, text, { type: 'text' })
    }

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: container.current,
            start: 'top top+=5%',
            end: 'bottom center',
            onEnter: () => isHeaderLight.set(true),
            onLeaveBack: () => isHeaderLight.set(false),
            onEnterBack: () => isHeaderLight.set(true),
            onLeave: () => isHeaderLight.set(false),
        });

        const tlThumb = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top top',
                end: 'bottom top',
                scrub: .2,
            }
        })
        tlThumb.fromTo('.home-hero-bg-inner', {
            yPercent: 0
        }, {
            yPercent: 30,
            scale: .95,
            ease: 'none'
        })

        const tlStack = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: `bottom+=${(window.innerWidth > 991) ? 0 : '10%'} bottom`,
                end: 'bottom top',
                scrub: true,
                markers: true
            }
        })
        tlStack.to(container.current, {
            yPercent: 25,
            ease: 'none'
        })
    }, {
        scope: container,
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
    //         target: container.current,
    //         offset: ['start start', 'end start']
    //     })
    // }, [])

    useEffect(() => {
        let timeout;
        inView(container.current, () => {
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
        <section className="home-hero" ref={container} data-cursor-showcoor>
            <div className="container grid">
                <div className="home-hero-line line-1 slot-1">
                    <div className="txt txt-16">© 2024</div>
                </div>
                <div className="home-hero-line line-1 slot-2">
                    <div className="txt txt-16"><CurlyBrackets>Helping with</CurlyBrackets></div>
                </div>
                <div className="home-hero-line line-1 slot-3">
                    <div className="txt txt-16 home-hero-skill">
                        <div className="home-hero-skill-item">Marketing Strategy</div>
                        <div className="home-hero-skill-item">Brand Identity</div>
                        <div className="home-hero-skill-item">UI/UX Design</div>
                        <div className="home-hero-skill-item">Front-end Development</div>
                        <div className="home-hero-skill-item">Social Media</div>
                    </div>
                </div>
                <div className="home-hero-line line-2 slot-1">
                    <div className="txt h0 txt-up">We</div>
                </div>
                <div className="home-hero-line line-2 slot-2">
                    <div className="txt txt-16">We help you stand out in a crowded market and navigate your digital transformation through bespoke creative solutions, providing a personal touch.</div>
                </div>
                <div className="home-hero-line line-2 slot-3">
                    <div className="txt h0 txt-up">
                        (<span className='txt-italic txt-med scramble-txt'>Turn </span>)
                    </div>
                </div>
                <div className="home-hero-line line-3">
                    <div className="txt h0 txt-up">ideas</div>
                </div>
                <div className="home-hero-bg">
                    <div className="home-hero-bg-inner">
                        {/* <Video src={props.video} className='img img-fill'></Video> */}
                        <img src={props.HeroImg.src} alt="" className='img img-fill' />
                    </div>
                    <div className="home-hero-bg-filter"></div>
                </div>
            </div>
        </section>
    )
}


export default HomeHero;