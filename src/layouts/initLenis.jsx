
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'

const InitLenis = ({ children }) => {
    const lenis = useLenis(({ scroll }) => {
        // called every scroll
    })
    return (
        <ReactLenis>
            {children}
        </ReactLenis>
    )
}
export default InitLenis