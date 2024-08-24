import './sytle.scss';
import { useEffect, useRef, useState } from 'react';

import { useFrame, useThree } from '@react-three/fiber';
import { getLenis } from '@/components/core/lenis';
import { lerp } from '@/js/utils';
import ProjectSlider from './ProjectSlider';

const Plane = ({ img, positionX, idx, ...props }) => {
    const ref = useRef()
    const { viewport, size } = useThree();
    const aspect = img.width / img.height;
    const heightPercent = .6;
    const sizePlane = [aspect * viewport.height * heightPercent, viewport.height * heightPercent]
    const pos = (positionX) * heightPercent / 226.85

    useFrame(({ clock }) => {
        ref.current.position.x -= .01

        return
    }, [])

    return (
        <mesh position={[pos, 0, 0]} ref={ref}>
            <planeGeometry args={[...sizePlane, 32, 32]} />
            <shaderMaterial
                wireframe={true}
            />
        </mesh>
    )
}


const WorkProject = ({ allProject, ...props }) => {
    let currScroll = 0;
    const gap = 200;

    const posPlane = allProject.reduce((arr, curr, idx) => {
        const currWidth = curr.thumb.width;
        const prevPos = (arr[idx - 1] + gap) || 0;
        return arr.concat(prevPos + currWidth);
    }, []);


    useEffect(() => {
        const lenis = getLenis(true);

        lenis.on('scroll', (e) => {
            currScroll += e.direction;
        });

        const target = {
            allThumbs: document.querySelectorAll('.work-project-thumb-item')
        };

        let raf;
        let time = 0;
        function translatethumb() {
            time += 1;

            target.allThumbs.forEach((el) => {
                let curPos = {
                    x: new DOMMatrixReadOnly(getComputedStyle(el).transform).m41,
                    y: new DOMMatrixReadOnly(getComputedStyle(el).transform).m42
                }

                el.style.transform = `translateX(${lerp(curPos.x, time)}px)`;
            });

            raf = window.requestAnimationFrame(translatethumb);
        }
        // raf = window.requestAnimationFrame(translatethumb);

        return () => {
            lenis.off('scroll');
            window.cancelAnimationFrame(raf);
        };
    }, []);

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