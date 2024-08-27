import './style.scss'
import { useEffect } from 'react';
import { animate, inView, timeline, stagger } from 'motion';
import AnimMaskLine from '@/components/common/AnimMaskLine';
import CurlyBrackets from '@/components/common/CurlyBrackets';

const ServiceCollaborate = ({ CollaImg, ...props }) => {

    useEffect(() => {
        const target = {
            allThumb: document.querySelectorAll('.service-colla-thumb-img'),
        }

        animate(target.allThumb, { height: 0 }, { duration: 0 })
        let sequence = [
            [target.allThumb, { height: `${50}rem` }, { duration: 1, delay: stagger(.08) }]
        ]

        inView('.service-colla-thumb', () => {
            timeline(sequence).finished.then(() => {
                target.allThumb.forEach(el => el.removeAttribute('style'))
            })
        }, { margin: '-20% 0% -30% 0%' })
    }, [])

    return (
        <section className='service-colla'>
            <div className="container grid">
                <div className="service-colla-label">
                    <CurlyBrackets>How we collaborate</CurlyBrackets>
                </div>
                <div className="txt txt-16 service-colla-desc">
                    Mixing multicultural talents with top-notch service vibes!
                </div>
                <AnimMaskLine className="service-colla" textClass="h2">
                    Alright, let's kick things off by getting to know each other better. We're all about diving <span>(<span className='txt-italic'>deep</span></span> <span><span className='txt-italic'>into</span>)</span> your brand, goals, and what you're aiming for. Then, we cook up a plan to tackle the awesome stuff ahead.
                </AnimMaskLine>
                <div className="service-colla-thumb">
                    {CollaImg.map((img) => (
                        <div className="service-colla-thumb-img-wrapper" key={img.name}>
                            <div className="service-colla-thumb-img">
                                <img src={img.img.src} width={img.img.width} alt="" className='img img-fill' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}


export default ServiceCollaborate;