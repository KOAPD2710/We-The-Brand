import './style.scss'
import { useStore } from '@nanostores/react';
import { useRef, useEffect } from 'react';

import { isHeaderOnBot } from '../Header/store';
import { scroll } from 'motion';

const Footer = ({ FooterData, ...props }) => {
    const ref = useRef();
    const $isHeaderOnBot = useStore(isHeaderOnBot);

    useEffect(() => {
        scroll(({ y }) => {

            // console.log(y.progress);
            if (y.progress > .8) {
                isHeaderOnBot.set(true)
            } else {
                isHeaderOnBot.set(false)
            }
        }, {
            target: ref.current,
            offset: ["start end", "end end"]
        })
    }, [])
    return (
        <footer className='footer' data-cursor-showcoor ref={ref}>
            <div className="container grid">
                <div className="footer-top">
                    <div className="h0 footer-top-display">We The (<span className='txt-italic txt-med'>Brand</span> )</div>
                    <div className="footer-top-list">
                        {FooterData.map((item) => (
                            <div className="footer-top-list-item" key={item.name}>
                                <div className="txt txt-16 footer-top-list-item-name">&#123;&nbsp;{item.name}&nbsp;&#125;</div>
                                <div className="footer-top-list-item-link-wrapper">
                                    {item.list.map((link) => (
                                        <div className="footer-top-list-item-link" key={link.name}>
                                            <a href={link.link} className='txt txt-16 hover-under'>{link.name}</a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="footer-bot">
                    <div className="txt txt-16 footer-bot-name">We The Brand Studio</div>
                    <div className="footer-bot-message">
                        <div className="txt txt-16">We strive to push boundaries and create experiences that enable big brands to cut through the noise.</div>
                    </div>
                    <div className="txt txt-16 footer-bot-date">© 2024</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
