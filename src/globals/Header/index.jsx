import { useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { scroll, animate } from 'motion';
import { useStore } from '@nanostores/react';
import { isHeaderOnTop, isHeaderOnBot } from './store';
import './style.scss';
import CurlyBrackets from '@/components/common/CurlyBrackets';

const Header = ({ logo, pathNav, currPath, ...props }) => {
    const header = useRef();
    const $isHeaderOnTop = useStore(isHeaderOnTop);
    const $isHeaderOnBot = useStore(isHeaderOnBot);

    const [vietnamTime, setVietnamTime] = useState('9:30 AM');
    const [singaporeTime, setSingaporeTime] = useState('10:30 AM');

    useEffect(() => {
        const interval = setInterval(() => {
            setVietnamTime(
                new Intl.DateTimeFormat('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                    timeZone: 'Asia/Ho_Chi_Minh',
                }).format(new Date())
            );
            setSingaporeTime(
                new Intl.DateTimeFormat('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                    timeZone: 'Asia/Singapore',
                }).format(new Date())
            );
        }, 1000);
        return () => clearInterval(interval);
    }, [vietnamTime, singaporeTime]);

    return (
        <header className={cn('header', $isHeaderOnTop && 'on-top', $isHeaderOnBot && 'on-bot')} ref={header}>
            <div className="container grid">
                <div className="header-logo">
                    <a href="./" className="header-logo-link">{logo}</a>
                </div>
                <div className="header-menu-wrapper">
                    <div className="header-location">
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
                                    &#123; <span className='time'>{singaporeTime}</span> &#125;
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-nav">
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
                        <a href="./" className="txt txt-16 header-contact-link">Contact</a>
                    </div>
                    <a href="#" className='header-menu-toggle'>
                        <div className='header-menu-toggle-ic'>
                            <svg width="100%" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="6.5" y1="0.768066" x2="6.5" y2="20.7681" stroke="currentColor" />
                                <line x1="14.5" y1="0.768066" x2="14.5" y2="20.7681" stroke="currentColor" />
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header;