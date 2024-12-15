import './style.scss'
import { useEffect, useRef } from 'react';
import { animate, inView, timeline, stagger } from 'motion';
import AnimMaskLine from '@/components/common/AnimMaskLine';
import CurlyBrackets from '@/components/common/CurlyBrackets';
import { useGSAP } from '@gsap/react';

const HomeCollaborate = ({ CollaImg, ...props }) => {
    const container = useRef()

    useEffect(() => {
        const target = {
            allThumb: document.querySelectorAll('.home-colla-thumb-img'),
        }

        animate(target.allThumb, { height: 0 }, { duration: 0 })
        let sequence = [
            [target.allThumb, { height: `${50}rem` }, { duration: 1, delay: stagger(.08) }]
        ]

        inView('.home-colla-thumb', () => {
            timeline(sequence).finished.then(() => {
                target.allThumb.forEach(el => el.removeAttribute('style'))
            })
        }, { margin: '-20% 0% -30% 0%' })
    }, [])

    return (
        <section className='home-colla' ref={container}>
            <div className="container grid">
                <div className="home-colla-label">
                    <CurlyBrackets>{props.primary.label[0].text}</CurlyBrackets>
                </div>
                <div className="txt txt-16 home-colla-desc">
                    {props.primary.subtitle[0].text}
                </div>
                <AnimMaskLine className="home-colla" textClass="h2">
                    {/* Alright, let's kick things off by getting to know each other better. We're all about diving <span>(<span className='txt-italic'>deep</span></span> <span><span className='txt-italic'>into</span>)</span> your brand, goals, and what you're aiming for. Then, we cook up a plan to tackle the awesome stuff ahead. */}
                    {props.primary.title[0].text}
                </AnimMaskLine>
                <div className="home-colla-thumb">
                    {props.items.map((img, idx) => (
                        <div className="home-colla-thumb-img-wrapper" key={idx}>
                            <div className="home-colla-thumb-img">
                                <img src={img.image.url} width={img.image.dimensions.width} height={img.image.dimensions.height} alt="" className='img img-fill' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}


export default HomeCollaborate;