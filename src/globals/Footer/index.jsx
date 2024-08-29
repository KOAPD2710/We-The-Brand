import './style.scss'
import { useStore } from '@nanostores/react';
import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { scroll } from 'motion';

import { isHeaderHide } from '../Header/store';
import CurlyBrackets from '@/components/common/CurlyBrackets';

const Footer = ({ FooterData, ...props }) => {
    const footerRef = useRef();
    const $isHeaderHide = useStore(isHeaderHide);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: footerRef.current,
            start: 'top top+=35%',
            // markers: true,
            onEnter: () => isHeaderHide.set(true),
            onLeaveBack: () => isHeaderHide.set(false)
        })
    }, {
        scope: footerRef,
        revertOnUpdate: true
    })

    // useEffect(() => {
    //     scroll(({ y }) => {
    //         if (y.progress > 0.75) {
    //             isHeaderHide.set(true)
    //         } else {
    //             isHeaderHide.set(false)
    //         }
    //     }, {
    //         target: footerRef.current,
    //         offset: ['start end', 'end end']
    //     })
    // }, [])

    return (
        <footer className='footer' data-cursor-showcoor ref={footerRef}>
            <div className="container grid">
                <div className="h0 footer-display">
                    We The (<span className='txt-italic txt-med'>Brand</span>)
                </div>
                <div className="footer-nav">
                    {FooterData.map((item) => (
                        <div className="footer-nav-item" key={item.name}>
                            <div className="txt txt-16 footer-nav-item-name">
                                <CurlyBrackets>{item.name}</CurlyBrackets>
                            </div>
                            <div className="footer-nav-item-link-wrapper">
                                {item.list.map((link) => (
                                    <div className="footer-nav-item-link" key={link.name}>
                                        <a href={link.link} target='__blank' className='txt txt-16 hover-under'>{link.name}</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="footer-message">
                    <div className="txt txt-16">We strive to push boundaries and create experiences that enable big brands to cut through the noise.</div>
                </div>
                <div className="footer-bot">
                    <div className="txt txt-16 footer-bot-name">We The Brand Studio</div>
                    <div className="txt txt-16 footer-bot-date">© 2024</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
