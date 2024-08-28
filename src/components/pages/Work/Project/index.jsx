import './sytle.scss';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import ProjectSlider from './ProjectSlider';

// const Plane = ({ img, positionX, idx, ...props }) => {
//     const ref = useRef()
//     const { viewport, size } = useThree();
//     const aspect = img.width / img.height;
//     const heightPercent = .6;
//     const sizePlane = [aspect * viewport.height * heightPercent, viewport.height * heightPercent]
//     const pos = (positionX) * heightPercent / 226.85

//     useFrame(({ clock }) => {
//         ref.current.position.x -= .01

//         return
//     }, [])

//     return (
//         <mesh position={[pos, 0, 0]} ref={ref}>
//             <planeGeometry args={[...sizePlane, 32, 32]} />
//             <shaderMaterial
//                 wireframe={true}
//             />
//         </mesh>
//     )
// }


const WorkProject = ({ allProject, ...props }) => {
    return (
        <section className='work-project'>
            {/* <div className="work-project-canvas-wrapper">
                <Canvas className='work-project-canvas' dpr={[1, 3]} camera={[0, 0, 0]}>
                    {allProject.map((proj, idx) => {
                        return (
                            <Plane
                                key={proj.name + idx}
                                positionX={posPlane[idx] - posPlane[0] - proj.thumb.width / 2}
                                img={proj.thumb}
                                idx={idx}
                            />
                        )
                    })}
                    <CanvasHelper />
                </Canvas>
            </div> */}
            <div className="work-project-thumb-wrapper">
                <ProjectSlider allProject={allProject} />
            </div>
        </section>
    )
}


export default WorkProject;