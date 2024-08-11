import './style.scss'

const ServiceCollaborate = ({ ...props }) => {
    return (
        <section className='service-colla'>
            <div className="container grid">
                <div className="service-colla-label">&#123; How we collaborate &#125;</div>
                <div className="txt txt-16 service-colla-desc">
                    Mixing multicultural talents with top-notch service vibes!
                </div>
                <div className="h2 service-colla-content">
                    Alright, let's kick things off by getting to know each other better. We're all about diving (<span className='txt-italic'>deep into</span>) your brand, goals, and what you're aiming for. Then, we cook up a plan to tackle the awesome stuff ahead.
                </div>
            </div>
        </section>
    )
}


export default ServiceCollaborate;