import './style.scss';
import React, { useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { scroll, animate } from 'motion';
import { useStore } from '@nanostores/react';
import { isHeaderLight, isHeaderHide } from './store';
import CurlyBrackets from '@/components/common/CurlyBrackets';
import { getLenis } from '@/components/core/lenis';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import { debounce, typeSplit } from '@/js/utils';
import { Fragment } from 'react';

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
    const headerRef = useRef();
    const toggleRef = useRef();
    const $isHeaderLight = useStore(isHeaderLight);
    const $isHeaderHide = useStore(isHeaderHide);
    let lenis;


    const [isNavOpen, setIsNavOpen] = useState(false);

    const [vietnamTime, setVietnamTime] = useState(getCurrTime('Asia/Ho_Chi_Minh'));
    const [singaporeTime, setSingaporeTime] = useState(getCurrTime('Asia/Singapore'));


    useEffect(() => { isHeaderHide.set(false) }, [])
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

    useGSAP((context, contextSafe) => {
        if (!lenis) {
            lenis = getLenis()
        }

        gsap.set('.header-nav-curtain-inner', {
            scaleX: 0,
            transformOrigin: 'left'
        })

        let navOpenAnim = contextSafe(() => {
            gsap.to('.header-nav-curtain-inner', {
                scaleX: toggleRef.current.classList.contains('active') ? 0 : 1,
                stagger: .03,
                duration: .3,
                transformOrigin: toggleRef.current.classList.contains('active') ? 'right' : 'left',
                ease: 'circ.in',
                overwrite: true,
            })
        })

        toggleRef.current.addEventListener('click', navOpenAnim);
        document.querySelectorAll('.header-nav-link').forEach((el) => {
            el.addEventListener('click', (e) => {
                navOpenAnim()
                setIsNavOpen(false)
                lenis.start()
            });
        });

    }, {
        scope: headerRef,
    })

    useEffect(() => {
        if (!lenis) {
            lenis = getLenis()
        }
        toggleRef.current.addEventListener('click', function () {
            let isActive = headerRef.current.classList.contains('active')
            if (isActive) {
                setIsNavOpen(false)
                lenis.start()
            } else {
                lenis.stop()
                setIsNavOpen(true)
            }
        })
    }, [])


    function scrollToSc(path) {
        if (!lenis) {
            lenis = getLenis()
        }
        lenis.scrollTo(path)
    }


    return (
        <header className={cn('header', $isHeaderLight && 'on-light', $isHeaderHide && 'on-hide', isNavOpen && 'active')} ref={headerRef}>
            <div className="container grid">
                <div className="header-logo">
                    <a href="" className="header-logo-link">{logo}</a>
                </div>
                <div className={cn('header-nav-wrapper', isNavOpen && 'active')}>
                    <div className="header-location">
                        <div className="txt txt-16 header-location-name">We The Brand</div>
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
                        {props.navigation.map((path) => (
                            <div className={cn('header-nav-item', currPath === path.url && 'active')} key={path.name}>
                                <a href={path.url} className='txt txt-16 header-nav-link' onClick={() => scrollToSc(path.url)}>
                                    <span className="slash">(</span>
                                    <span className={cn('header-nav-link-txt', currPath === path.url && 'txt-italic')}>{path.name}</span>
                                    <span className="slash">)</span>
                                </a>
                            </div>
                        ))}
                    </div>
                    <div className="header-contact">
                        <div className="header-contact-email-wrapper">
                            <a href={`mailto:${props.email.url}`} target='_blank' className="txt txt-16 header-contact-email">{props.email.url}</a>
                        </div>
                        <div className="header-contact-link-wrapper">
                            <a href={`mailto:${props.email.url}`} className="txt txt-16 header-contact-link">Contact</a>
                        </div>
                        <div className="txt txt-16 header-contact-social">
                            {props.group_social.map((item, idx) => (
                                <Fragment key={item.platform[0].text}>
                                    <div className="header-contact-social-item">
                                        <a href={item.link.url} target='_blank' className="header-social-link">{item.platform[0].text}</a>
                                    </div>
                                    {idx != props.group_social.length - 1 && (
                                        <div className="slash txt-light">/</div>
                                    )}
                                </Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="header-nav-curtain">
                        {Array.from({ length: 8 }).map((_, idx) => (
                            <div className="header-nav-curtain-inner" key={idx} />
                        ))}
                    </div>
                </div>
                <div className="header-menu-wrapper">
                    <button className={cn('header-menu-toggle', isNavOpen && 'active')} ref={toggleRef}>
                        <div className={cn('ic header-menu-toggle-ic', isNavOpen && 'active')}>
                            <div className="header-menu-toggle-ic-anchor">
                                <div className='header-menu-toggle-ic-line-anchor open left'>
                                    <div className="header-menu-toggle-ic-line" />
                                </div>
                                <div className='header-menu-toggle-ic-line-anchor open right'>
                                    <div className="header-menu-toggle-ic-line" />
                                </div>
                                <div className='header-menu-toggle-ic-line-anchor close left'>
                                    <div className="header-menu-toggle-ic-line" />
                                </div>
                                <div className='header-menu-toggle-ic-line-anchor close right'>
                                    <div className="header-menu-toggle-ic-line" />
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