import './style.scss'
import { useEffect, useRef, useState } from 'react';
import CurlyBrackets from '@/components/common/CurlyBrackets';
import { chunkArray } from '@/js/utils';
import { Fragment } from 'react';
import { useGSAP } from '@gsap/react';



const HomeClient = ({ ClientImg, ClientData, ...props }) => {
    const [rowItems, setRowItems] = useState(3);
    const [titleTxt, setTitleTxt] = useState('Collaborated');

    const container = useRef()

    // useGSAP(() => {
    //     const tlStack = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: container.current,
    //             start: 'bottom bottom',
    //             end: 'bottom top',
    //             scrub: .2,
    //             markers: true
    //         }
    //     })

    //     tlStack.to(container.current, {
    //         yPercent: 25,
    //         ease: 'none'
    //     })
    // }, {
    //     scope: container,
    //     revertOnUpdate: true
    // })


    useEffect(() => {
        if (window.innerWidth < 768) {
            setRowItems(2)
            setTitleTxt('Partnered')
        }
    }, [])


    return (
        <section className="home-client" ref={container} data-cursor-showcoor>
            <div className="container grid">
                <div className="home-client-head">
                    <div className="home-client-head-wrapper">
                        <div className="h1 txt-up home-client-title label-wrapper">
                            <div className="txt txt-title">Who</div>
                            <div className="txt txt-16 home-client-label">
                                <CurlyBrackets>Our clients</CurlyBrackets>
                            </div>
                        </div>
                        <div className="h1 txt-up home-client-title">
                            (<span className='txt-italic txt-med'>{titleTxt}</span>)
                        </div>
                        <div className="h1 txt-up home-client-title">With Us</div>
                    </div>
                </div>
                <div className="home-client-cta">
                    <div className="txt txt-16 home-client-date">© 2024</div>
                    <div className="home-client-img-wrapper">
                        <div className="home-client-img">
                            {ClientImg}
                        </div>
                    </div>
                    <div className="home-client-link-wrapper">
                        <a href='./' className="txt txt-16 txt-med hover-line home-client-link">Let's work together!</a>
                    </div>
                </div>
                <div className="home-client-list">
                    {chunkArray(ClientData, rowItems).map((list, listIdx) => (
                        <div className="h2 home-client-row" key={listIdx}>
                            {list.map((client, clientIdx) => (
                                <Fragment key={client}>
                                    <div className="home-client-item">{client}</div>
                                    {clientIdx !== list.length - 1 && (
                                        <div className="txt-light slash">&nbsp;/&nbsp;</div>
                                    )}
                                </Fragment>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="home-client-link-sm-wrapper">
                    <a href='./' className="txt txt-16 txt-med hover-line home-client-link">Let's work together!</a>
                </div>
            </div>
        </section>
    )
}

export default HomeClient;
