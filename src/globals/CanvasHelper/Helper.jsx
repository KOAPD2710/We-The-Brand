import { OrbitControls } from '@react-three/drei';

const CanvasHelper = ({ ...pros }) => {

    return (
        <>
            <OrbitControls />
            <gridHelper />
        </>
    )
}


export default CanvasHelper;