


const Video = ({ src, className }) => {
    return (
        <video className={className} muted autoPlay loop playsInline controls={false}>
            <source src={src} type="video/mp4" />
        </video>
    )
}

export default Video;