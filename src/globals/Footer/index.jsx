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
            onEnter: () => isHeaderHide.set(true),
            onLeaveBack: () => isHeaderHide.set(false)
        })

        const tlStack = gsap.timeline({
            scrollTrigger: {
                trigger: footerRef.current,
                start: 'top+=25% bottom',
                end: 'top+=25% top',
                scrub: true,
            }
        })

        tlStack.from(footerRef.current, {
            yPercent: -25,
            ease: 'none'
        })
    }, {
        scope: footerRef,
        revertOnUpdate: true
    })

    const formatPhoneNumber = (number) => {
        const digits = number.toString().replace(/\D/g, '');

        if (digits.startsWith('0')) {
            return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
        } else {
            return `+ ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 11)} `;
        }
    };

    return (
        <footer className='footer' data-cursor-showcoor ref={footerRef}>
            <div className="container grid">
                <div className="h0 footer-display">
                    We The (<span className='txt-italic txt-med'>Brand</span>)
                </div>
                <div className="footer-nav">
                    {/* {FooterData.map((item) => (
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
                    ))} */}
                    <div className="footer-nav-item">
                        <div className="txt txt-16 footer-nav-item-name">
                            <CurlyBrackets>Social Media</CurlyBrackets>
                        </div>
                        <div className="footer-nav-item-link-wrapper">
                            {props.group_social.map((item, idx) => (
                                <div className="footer-nav-item-link" key={idx}>
                                    <a href={item.link.url} target={item.link.target} className='txt txt-16 hover-under'>{item.platform[0].text}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="footer-nav-item">
                        <div className="txt txt-16 footer-nav-item-name">
                            <CurlyBrackets>Contact</CurlyBrackets>
                        </div>
                        <div className="footer-nav-item-link-wrapper">
                            <div className="footer-nav-item-link">
                                <a href={`tel:${props.phone_number} `} className='txt txt-16 hover-under'>{formatPhoneNumber(props.phone_number)}</a>
                            </div>
                            <div className="footer-nav-item-link">
                                <a href={`mailto:${props.email.url}`} className='txt txt-16 hover-under'>{props.email.url}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-message">
                    <div className="txt txt-16">We strive to push boundaries and create experiences that enable big brands to cut through the noise.</div>
                </div>
                <div className="footer-bot">
                    <div className="txt txt-16 footer-bot-name">We The Brand</div>
                    <div className="txt txt-16 footer-bot-date">© {new Date().getFullYear()}</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
