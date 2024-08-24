import { OrthographicCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const Orthographic = ({ ...props }) => {
    const { size } = useThree();

    return (
        <OrthographicCamera
            makeDefault
            zoom={1}
            near={1}
            far={5000}
            position={[0, 0, 500]}
            top={size.width / 2}
            bottom={-size.width / 2}
            left={-size.height / 2}
            right={size.height / 2}
        />
    )
}

export default Orthographic;