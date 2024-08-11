
import { useEffect, useRef } from 'react';
import cn from 'clsx';
import { scroll, animate } from 'motion';
import './style.scss';


const Header = ({ pathNav, currPath, ...props }) => {
    const header = useRef();

    useEffect(() => {
        scroll((info) => {
            if (info.y.progress < 1) {
                header.current.classList.add('on-top')
            } else {
                header.current.classList.remove('on-top')
            }
        }, {
            target: document.querySelector('.service-hero'),
            offset: ["start end", "end start"]
        })
    }, [])
    return (
        <header className="header on-top" ref={header}>
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
                                &#123; <span>9:15 AM</span> &#125;
                            </div>
                        </div>
                        <div className="header-country" data-country="Singapore">
                            <div className="header-country-name">
                                <div className="txt txt-16">Singapore</div>
                            </div>
                            <div className="txt txt-16 header-country-time">
                                &#123; <span>9:15 AM</span> &#125;
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-nav">
                    {props.navigation.map((path) => (
                        <div className={cn('header-nav-item', currPath === path.url && 'active')} key={path.name}>
                            <a href={path.url} className='txt txt-16 header-nav-link'>{path.name}</a>
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