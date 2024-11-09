import './style.scss';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';


const HomeWork = ({ Work, ...props }) => {
    const container = useRef();
    useGSAP((context) => {
        let mm = gsap.matchMedia();


        const target = {
            triggerTranslateImg: document.querySelectorAll('.home-work-spacer-inner'),
            slideTranslate: document.querySelector('.home-work-translate'),
            slideItems: [...document.querySelectorAll('.home-work-item')],
            linkItems: [...document.querySelectorAll('.home-work-info-item')],
        }

        mm.add("(min-width: 992px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: .2
                }
            })

            let distance = target.slideTranslate.offsetWidth - window.innerWidth;

            tl.to(target.slideTranslate, {
                x: -distance
            })

            target.triggerTranslateImg.forEach((item, idx) => {
                let triggerStart;
                let triggerEnd;

                if (idx === 0) {
                    triggerStart = 'top top'
                } else {
                    triggerStart = 'top+=-100% top'
                }

                if (idx === target.triggerTranslateImg.length - 1) {
                    triggerEnd = 'bottom bottom'
                } else {
                    triggerEnd = 'bottom top'
                }

                const tlTranslate = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: triggerStart,
                        end: triggerEnd,
                        scrub: true,
                        // id: idx,
                        // markers: true,
                    },
                    defaults: {
                        ease: 'none'
                    }
                })

                let maskStart;
                let maskEnd;

                if (idx === 0) {
                    maskStart = 'bottom bottom'
                } else {
                    maskStart = 'top bottom'
                }

                if (idx === target.triggerTranslateImg.length - 1) {
                    maskEnd = 'bottom bottom'
                } else {
                    maskEnd = 'bottom top'
                }

                const tlMask = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: maskStart,
                        end: maskEnd,
                        scrub: true,
                        id: idx,
                    },
                    defaults: {
                        ease: 'none'
                    }
                })

                if (idx === 0) {
                    tlTranslate.fromTo(target.slideItems[idx].querySelector('.home-work-item-thumb'), {
                        xPercent: 0,
                    }, {
                        xPercent: 12
                    })

                    gsap.set(target.linkItems[idx], {
                        '--offset-left': '0%'
                    })
                    tlMask.to(target.linkItems[idx], {
                        '--offset-right': '100%'
                    })
                } else if (idx === target.triggerTranslateImg.length - 1) {
                    tlTranslate.fromTo(target.slideItems[idx].querySelector('.home-work-item-thumb'), {
                        xPercent: -12,
                    }, {
                        xPercent: 0
                    })

                    gsap.set(target.linkItems[idx], {
                        '--offset-right': '0%'
                    })
                    tlMask.to(target.linkItems[idx], {
                        '--offset-left': '0%'
                    })
                } else {
                    tlTranslate
                        .fromTo(target.slideItems[idx].querySelector('.home-work-item-thumb'), {
                            xPercent: -12,
                        }, {
                            xPercent: 12
                        })

                    tlMask
                        .to(target.linkItems[idx], {
                            '--offset-left': '0%'
                        })
                        .to(target.linkItems[idx], {
                            '--offset-right': '100%'
                        })
                }
            })
        })

        mm.add("(max-width: 991px)", () => {
            target.triggerTranslateImg.forEach((el, idx) => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        scrub: true,
                        // markers: true
                    }
                })

                tl
                    .fromTo(target.slideItems[idx].querySelector('.home-work-item-thumb'), {
                        yPercent: -12,
                    }, {
                        yPercent: 12
                    })
            })
        })

    }, {
        scope: container,
        revertOnUpdate: true
    })

    return (
        <section className='home-work' ref={container} id='workSc'>
            <div className="container grid">
                <div className="home-work-sticky-wrapper">
                    <div className="home-work-sticky">
                        <div className="home-work-translate">
                            {Work.map((item, idx) => (
                                <a href={item.link} target='_blank' className="home-work-item container grid" key={idx}>
                                    <div className="home-work-item-thumb">
                                        <img src={item.thumb.src} alt={item.thumb.alt} className='img img-fill' />
                                    </div>
                                    <div className="home-work-item-scope">
                                        {item.scope.map((scope, idx) => (
                                            <div className="home-work-item-scope-item" key={scope}>
                                                {scope}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="home-work-item-name">{item.name}</div>
                                </a>
                            ))}
                        </div>
                        <div className="home-work-info">
                            {Work.map((item, idx) => (
                                <a href={item.link} target='_blank' className='home-work-info-item container grid' key={idx}>
                                    <div className="home-work-info-item-scope">
                                        {item.scope.map((scope, idx) => (
                                            <div className="home-work-info-item-scope-item" key={scope}>
                                                {scope}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="home-work-info-item-title h0">{item.name}</div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="home-work-spacer">
                    {Work.map((el, idx) => (
                        <div className="home-work-spacer-inner" key={idx} />
                    ))}
                </div>
            </div>
        </section>
    )
}


export default HomeWork