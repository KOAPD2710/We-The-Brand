import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { useTexture } from '@react-three/drei';
// import { Fluid, useConfig } from '../TestFluid';
// import { Fluid } from '@whatisjery/react-fluid-distortion';

import img from '@/assets/Ser-cat.jpg';

const Image = () => {
    const texture = useTexture(img.src);
    return (
        <mesh position-z={-4}>
            <planeGeometry args={[7, 10, 20, 20]} />
            <meshBasicMaterial map={texture} color="#c4b4d2" />
        </mesh>
    );
};

const FluidCanvas = () => {
    // const config = useConfig();
    return (
        <Canvas
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                width: '100vw',
                zIndex: '99999',
            }}
        >
            <Image />
            <EffectComposer>
                {/* <Fluid {...config}></Fluid> */}
            </EffectComposer>
        </Canvas>
    );
};

export default FluidCanvas;