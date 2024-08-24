import { useEffect, useRef } from 'react';
import cn from 'clsx';
import { scroll, animate } from 'motion';
import { useStore } from '@nanostores/react';
import { isHeaderOnTop, isHeaderOnBot } from './store';
import './style.scss';

const Header = ({ pathNav, currPath, ...props }) => {
    const header = useRef();
    const $isHeaderOnTop = useStore(isHeaderOnTop);
    const $isHeaderOnBot = useStore(isHeaderOnBot);

    const vietnamTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'Asia/Ho_Chi_Minh',
    }).format(new Date());

    const singaporeTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'Asia/Singapore',
    }).format(new Date());

    return (
        <header className={cn('header', $isHeaderOnTop && 'on-top', $isHeaderOnBot && 'on-bot')} ref={header}>
            <div className="container grid">
                <div className="header-logo">
                    <a href="./" className="header-logo-link">
                        <div className="txt txt-16">We The Brand</div>
                    </a>
                </div>
                <div className="header-location">
                    <div className="header-location-inner">
                        <div className="header-country" data-country="VietNam">
                            <div className="header-country-name">
                                <div className="txt txt-16">Vietnam</div>
                            </div>
                            <div className="txt txt-16 header-country-time">
                                &#123; <span className='time'>{vietnamTime}</span> &#125;
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
            </div>
        </header>
    )
}

export default Header;