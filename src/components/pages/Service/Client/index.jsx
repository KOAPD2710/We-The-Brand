import './style.scss'
import React, { useEffect } from 'react';
import CurlyBrackets from '@/components/common/CurlyBrackets';


const ServiceClient = ({ ClientImg, ClientData, ...props }) => {
    return (
        <section className="service-client" data-cursor-showcoor>
            <div className="container grid">
                <div className="service-client-head">
                    <div className="service-client-head-wrapper">
                        <div className="h1 txt-up service-client-title">
                            Who
                            <div className="txt txt-16 service-client-label">
                                <CurlyBrackets>Our clients</CurlyBrackets>
                            </div>
                        </div>
                        <div className="h1 txt-up service-client-title">
                            (<span className='txt-italic txt-med'>Collaborated</span>)
                        </div>
                        <div className="h1 txt-up service-client-title">With Us</div>
                    </div>
                </div>
                <div className="service-client-cta">
                    <div className="txt txt-16 service-client-date">© 2024</div>
                    <div className="service-client-img-wrapper">
                        <div className="service-client-img">
                            {ClientImg}
                        </div>
                    </div>
                    <div className="service-client-link-wrapper">
                        <a href='./' className="txt txt-16 txt-med hover-line service-client-link">Let's work together!</a>
                    </div>
                </div>
                <div className="service-client-list">
                    {ClientData.map((list, listIdx) => (
                        <div className="h2 service-client-row" key={listIdx}>
                            {list.map((client, clientIdx) => (
                                <React.Fragment key={client}>
                                    <div className="service-client-item">{client}</div>
                                    {clientIdx !== list.length - 1 && (
                                        <div className="txt-light slash">&nbsp;/&nbsp;</div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServiceClient;
