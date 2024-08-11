import { useEffect } from 'react';
import './style.scss'
import { chunkArray } from '@/js/utils';


const ServiceClient = ({ ClientImg, ClientData, ...props }) => {

    // useEffect(() => {
    //     let date = new Date;
    //     // console.log(date);
    // }, [])
    return (
        <section className="service-client">
            <div className="container grid">
                <div className="service-client-head">
                    <div className="service-client-head-wrapper">
                        <div className="h1 txt-up service-client-title">
                            Who
                            <div className="txt txt-16 service-client-label">&#123; Our clients &#125;</div>
                        </div>
                        <div className="h1 txt-up service-client-title">
                            (<span className='txt-italic txt-med'>Collaborated</span>)
                        </div>
                        <div className="h1 txt-up service-client-title">With Us</div>
                    </div>
                </div>
                <div className="service-client-cta">
                    <div className="txt txt-16 service-client-date">@2024</div>
                    <div className="service-client-img-wrapper">
                        <div className="service-client-img">
                            {ClientImg}
                        </div>
                    </div>
                    <div className="service-client-link-wrapper">
                        <a href='./' className="txt txt-16 hover-line service-client-link">Let's work together!</a>
                    </div>
                </div>
                <div className="service-client-list">
                    {ClientData.map((list, listIdx) => (
                        <div className="h2 service-client-row" key={listIdx}>
                            {list.map((client, clientIdx) => (
                                <>
                                    <div className="service-client-item" key={'client' + listIdx + clientIdx}>
                                        {client}
                                    </div>
                                    {clientIdx !== list.length - 1 && (
                                        <div className="txt-light slash" key={'slash' + listIdx + clientIdx}>&nbsp;/&nbsp;</div>
                                    )}
                                </>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServiceClient;
