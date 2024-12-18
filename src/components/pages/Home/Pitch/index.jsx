import './style.scss'
import { useEffect, useState, useRef } from 'react';
import { scroll, inView, animate, timeline, stagger } from 'motion';
import { scrambleText } from '@/js/scrambleText';
import { parseToRem, lerp, typeSplit } from '@/js/utils';
import SplitType from 'split-type';
import CurlyBrackets from '@/components/common/CurlyBrackets';
import { useGSAP } from '@gsap/react';

const HomePitch = ({ PitchImg, ...props }) => {
    const [currIdxTxt, setcurrIdxTxt] = useState(0);
    const txtGradientArray = ['quirks', 'features', 'edges'];
    const [isScrambleRun, setIsScrambleRun] = useState(false);

    const container = useRef()

    useGSAP(() => {
        const tlStack = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: true,
                // markers: true
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


    function loopScrambleTxt(text) {
        const target = document.querySelector('.home-pitch .scramble-txt')
        scrambleText(target, text)
    }

    useEffect(() => {
        // if (!isScrambleRun) return;

        let timeout;
        inView('.home-pitch', () => {
            timeout = setTimeout(() => {
                const nextIndex = (currIdxTxt + 1) % txtGradientArray.length;
                setcurrIdxTxt(nextIndex);
                loopScrambleTxt(txtGradientArray[nextIndex]);
            }, 2500);

            return () => clearTimeout(timeout);
        }, { margin: '150% 0% 0% 0%' });

        return () => clearTimeout(timeout);
    }, [currIdxTxt, isScrambleRun]);



    useEffect(() => {
        const target = {
            allThumb: document.querySelectorAll('.home-pitch-thumb-img-wrapper'),
            allTranslateDOM: document.querySelectorAll('.home-pitch-thumb-img-translate'),
            content: document.querySelector('.home-pitch-content'),
        }

        target.allThumb.forEach((el) => {
            let { height } = el.getBoundingClientRect()
            animate(el.querySelector('.home-pitch-thumb-img'), { height: 0 }, { duration: 0 })

            let sequence = [
                [el.querySelector('.home-pitch-thumb-img'), { height: `${parseToRem(height)}rem` }, { duration: .6 }]
            ]

            inView(el, () => {
                timeline(sequence).finished.then(() => {
                    el.querySelector('.home-pitch-thumb-img').removeAttribute('style')
                })
            }, { margin: '-20% 0% -30% 0%' })
        })

        scroll(({ y }) => {
            let progress = y.progress;

            target.allTranslateDOM.forEach((el, idx) => {
                el.style.transform = `translateY(${(-(progress - .5) * 2) * (idx / 2) * 100}%)`;
            });

            target.content.style.transform = `translateY(${(-(progress - .5) * 2) * 5}rem)`;
        }, {
            target: document.querySelector('.home-pitch'),
            offset: ["start end", "end start"]
        })

        const SplitTxt = {
            label: new SplitType('.home-pitch-label', { types: 'lines, chars', ...typeSplit }),
        }
        animate(SplitTxt.label.chars, { opacity: 0, y: '100%' }, { duration: 0 })

        let sequence = [
            [SplitTxt.label.chars, { opacity: 1, y: '0%' }, { duration: 0.5, delay: stagger(0.02), at: '0' }]
        ]

        inView('.home-pitch .container', () => {
            timeline(sequence).finished.then(() => {
                SplitTxt.label.revert()
            })
        }, { margin: "-30% 0% -20% 0%" })



        // Raf Mouse Move
        let pointer = {
            x: 0,
            y: 0
        }
        let myReq;
        let speed = .05;
        let inview = false

        inView('.home-pitch', () => {
            inview = true

            return () => inview = false
        }, { margin: "-5% 0% -5% 0%" })

        function moveCursor() {
            pointer = {
                x: getComputedStyle(document.documentElement).getPropertyValue('--cursor-left').trim(),
                y: getComputedStyle(document.documentElement).getPropertyValue('--cursor-top').trim()
            }

            target.allThumb.forEach((el) => {
                let currPos = {
                    x: new DOMMatrixReadOnly(getComputedStyle(el).transform).m41,
                    y: new DOMMatrixReadOnly(getComputedStyle(el).transform).m42
                }

                if (inview) {
                    let { height, width } = el.getBoundingClientRect()
                    let itemCoor = Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2))
                    let targetPos = {
                        x: (parseFloat(pointer.x) - window.innerWidth / 2) / window.innerWidth / 2 * itemCoor,
                        y: (parseFloat(pointer.y) - window.innerHeight / 2) / window.innerHeight / 2 * itemCoor
                    }
                    el.style.transform = `translate(${lerp(currPos.x, targetPos.x, speed)}px, ${lerp(currPos.y, targetPos.y, speed)}px)`;
                } else {
                    el.style.transform = `translate(${lerp(currPos.x, 0, speed)}px, ${lerp(currPos.y, 0, speed)}px)`;
                }
            })
            myReq = requestAnimationFrame(moveCursor)
        }

        // myReq = requestAnimationFrame(moveCursor)

        return () => {
            // cancelAnimationFrame(myReq)
        }
    }, [])

    return (
        <section className="home-pitch" ref={container} data-cursor-showcoor>
            <div className="container grid">
                <div className="home-pitch-content">
                    <div className="txt txt-16 home-pitch-label">
                        <CurlyBrackets>Out pitch</CurlyBrackets>
                    </div>
                    <h1 className='h1 txt-up home-pitch-title'>
                        We help brands be their most <span>(<span className='txt-italic txt-med'>inspiring</span>)</span> selves.<br /> Own their<br /><span className='txt-gradient txt-clip scramble-txt'>quirks</span>.
                    </h1>
                </div>
                <div className="home-pitch-thumb">
                    {PitchImg.map((img) => (
                        <div className="home-pitch-thumb-img-wrapper" key={img.name}>
                            <div className="home-pitch-thumb-img-translate">
                                <div className="home-pitch-thumb-img">
                                    <img src={img.img.src} alt="" className='img img-fill' />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}


export default HomePitch;