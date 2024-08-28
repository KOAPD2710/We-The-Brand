import './style.scss';
import React, { useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { scroll, animate } from 'motion';
import { useStore } from '@nanostores/react';
import { isHeaderLight, isHeaderHide } from './store';
import CurlyBrackets from '@/components/common/CurlyBrackets';
import { getLenis } from '@/components/core/lenis';

function getCurrTime(timeZone) {
    let result = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: timeZone || 'Asia/Ho_Chi_Minh',
    }).format(new Date())

    return result
}

const Header = ({ logo, pathNav, socialData, contact, currPath, ...props }) => {
    const header = useRef();
    const $isHeaderLight = useStore(isHeaderLight);
    const $isHeaderHide = useStore(isHeaderHide);


    const [isNavOpen, setIsNavOpen] = useState(false);

    const [vietnamTime, setVietnamTime] = useState(getCurrTime('Asia/Ho_Chi_Minh'));
    const [singaporeTime, setSingaporeTime] = useState(getCurrTime('Asia/Singapore'));


    useEffect(() => { isHeaderHide.set(false); console.log('troll'); }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            if (getCurrTime('Asia/Ho_Chi_Minh') != vietnamTime) {
                setVietnamTime(getCurrTime('Asia/Ho_Chi_Minh'))
            }
            if (getCurrTime('Asia/Singapore') != singaporeTime) {
                setSingaporeTime(getCurrTime('Asia/Singapore'))
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [vietnamTime, singaporeTime]);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen)
    }
    const toggleScroll = () => {
        const lenis = getLenis()

        if (isNavOpen) {
            lenis.start()
        } else {
            lenis.stop()
        }
    }


    return (
        <header className={cn('header', $isHeaderLight && 'on-light', $isHeaderHide && 'on-hide', isNavOpen && 'active')} ref={header}>
            <div className="container grid">
                <div className="header-logo">
                    <a href="/" className="header-logo-link">{logo}</a>
                </div>
                <div className={cn('header-nav-wrapper', isNavOpen && 'active')}>
                    <div className="header-location">
                        <div className="txt txt-16 header-location-name">We The Brand Studio</div>
                        <div className="header-location-inner">
                            <div className="header-country" data-country="VietNam">
                                <div className="header-country-name">
                                    <div className="txt txt-16">Vietnam</div>
                                </div>
                                <div className="txt txt-16 header-country-time">
                                    <CurlyBrackets>
                                        <span className='time'>{vietnamTime}</span>
                                    </CurlyBrackets>
                                </div>
                            </div>
                            <div className="header-country" data-country="Singapore">
                                <div className="header-country-name">
                                    <div className="txt txt-16">Singapore</div>
                                </div>
                                <div className="txt txt-16 header-country-time">
                                    <CurlyBrackets>
                                        <span className='time'>{singaporeTime}</span>
                                    </CurlyBrackets>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-nav">
                        <div className={cn('header-nav-item home', currPath === '/' && 'active')}>
                            <a href='/' className='txt txt-16 header-nav-link'>
                                <span className="slash">(</span>
                                <span className={cn('header-nav-link-txt', currPath === '/' && 'txt-italic')}>Home</span>
                                <span className="slash">)</span>
                            </a>
                        </div>
                        {props.navigation.map((path) => (
                            <div className={cn('header-nav-item', currPath === path.url && 'active')} key={path.name}>
                                <a href={path.url} className='txt txt-16 header-nav-link'>
                                    <span className="slash">(</span>
                                    <span className={cn('header-nav-link-txt', currPath === path.url && 'txt-italic')}>{path.name}</span>
                                    <span className="slash">)</span>
                                </a>
                            </div>
                        ))}
                    </div>
                    <div className="header-contact">
                        <div className="header-contact-email-wrapper">
                            <a href={contact.url} className="txt txt-16 header-contact-email">{contact.name}</a>
                        </div>
                        <div className="header-contact-link-wrapper">
                            <a href={contact.url} className="txt txt-16 header-contact-link">Contact</a>
                        </div>
                        <div className="txt txt-16 header-contact-social">
                            {socialData.map((item, idx) => (
                                <React.Fragment key={item.name}>
                                    <div className="header-contact-social-item">
                                        <a href={item.url} className="header-social-link">{item.name}</a>
                                    </div>
                                    {idx != socialData.length - 1 && (
                                        <div className="slash txt-light">/</div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="header-nav-curtain">
                        <div className="header-nav-curtain-inner"></div>
                        <div className="header-nav-curtain-inner"></div>
                        <div className="header-nav-curtain-inner"></div>
                        <div className="header-nav-curtain-inner"></div>
                        <div className="header-nav-curtain-inner"></div>
                    </div>
                </div>
                <div className="header-menu-wrapper">
                    <button onClick={() => { toggleScroll(); toggleNav() }} className='header-menu-toggle'>
                        <div className={cn('ic header-menu-toggle-ic', isNavOpen && 'active')}>
                            <div className="header-menu-toggle-ic-anchor">
                                <div className='header-menu-toggle-ic-line-anchor open left'>
                                    <div className="header-menu-toggle-ic-line"></div>
                                </div>
                                <div className='header-menu-toggle-ic-line-anchor open right'>
                                    <div className="header-menu-toggle-ic-line"></div>
                                </div>
                                <div className='header-menu-toggle-ic-line-anchor close left'>
                                    <div className="header-menu-toggle-ic-line"></div>
                                </div>
                                <div className='header-menu-toggle-ic-line-anchor close right'>
                                    <div className="header-menu-toggle-ic-line"></div>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header;