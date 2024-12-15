import './style.scss'
import { useEffect, useRef, useState } from 'react';
import CurlyBrackets from '@/components/common/CurlyBrackets';
import { chunkArray } from '@/js/utils';
import { Fragment } from 'react';

const HomeClient = ({ ClientImg, ClientData, ...props }) => {
    const [rowItems, setRowItems] = useState(3);
    const container = useRef()

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
                                <CurlyBrackets>{props.primary.label[0].text}</CurlyBrackets>
                            </div>
                        </div>
                        <div className="h1 txt-up home-client-title">
                            (<span className='txt-italic txt-med'>Collaborated</span>)
                        </div>
                        <div className="h1 txt-up home-client-title">With Us</div>
                    </div>
                </div>
                <div className="home-client-cta">
                    <div className="txt txt-16 home-client-date">© {new Date().getFullYear()}</div>
                    <div className="home-client-img-wrapper">
                        <div className="home-client-img">
                            <img src={props.primary.image.url} alt="" width={props.primary.image.dimensions.width} height={props.primary.image.dimensions.height} className='img img-fill' />
                        </div>
                    </div>
                    <div className="home-client-link-wrapper">
                        <a href='./' className="txt txt-16 txt-med hover-line home-client-link">{props.primary.cta}</a>
                    </div>
                </div>
                <div className="home-client-list">
                    {chunkArray(props.items, rowItems).map((list, listIdx) => (
                        <div className="h2 home-client-row" key={listIdx}>
                            {list.map((item, itemIdx) => (
                                <Fragment key={itemIdx}>
                                    <div className="home-client-item">{item.client}</div>
                                    {itemIdx !== list.length - 1 && (
                                        <div className="txt-light slash">&nbsp;/&nbsp;</div>
                                    )}
                                </Fragment>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="home-client-link-sm-wrapper">
                    <a href='./' className="txt txt-16 txt-med hover-line home-client-link">{props.primary.cta}</a>
                </div>
            </div>
        </section>
    )
}

export default HomeClient;
