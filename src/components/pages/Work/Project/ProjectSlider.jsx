import { getLenis } from '@/components/core/lenis';
import { lerp, parseRem, sawtooth } from '@/js/utils';
import { useKeenSlider } from 'keen-slider/react';
import { useState, useEffect } from 'react';

const isInview = (el, gap) => {
    let viewport = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    const { width, left, right } = el.getBoundingClientRect()

    return (left <= viewport.width + gap && right >= -gap) ? true : false
}

const ProjectSlider = ({ allProject, ...props }) => {
    let currScroll = 0;


    useEffect(() => {
        const lenis = getLenis(true);

        lenis.on('scroll', (e) => {
            currScroll = lerp(currScroll, currScroll + e.direction * 3 * Math.abs(e.velocity), .05);
        });

        return () => {
            lenis.off('scroll');
        };
    }, [])

    useEffect(() => {
        const target = {
            allThumbs: Array.from(document.querySelectorAll('.work-project-thumb-item')),
            wrapper: document.querySelector('.work-project-thumb')
        }
        let wrapperWidth = target.wrapper.clientWidth
        document.querySelector('.work-project').style.height = `${wrapperWidth * 4}px`
        let raf;
        let initPos = Array.from(target.allThumbs, (el) => 0);

        function translatethumb() {
            target.allThumbs.forEach((el, idx) => {
                const { right } = el.getBoundingClientRect()
                if (right < 0) {
                    let multiply = Math.floor(currScroll / wrapperWidth) + (idx === (target.allThumbs.length - 1) ? 0 : 1)
                    initPos[idx] = wrapperWidth * multiply
                }
                if (right > wrapperWidth) {
                    let multiply = Math.floor(currScroll / wrapperWidth)
                    initPos[idx] = wrapperWidth * multiply

                }

                el.style.transform = `translateX(${-currScroll + initPos[idx]}px)`
            });
            raf = window.requestAnimationFrame(translatethumb);
        }

        raf = window.requestAnimationFrame(translatethumb);

        return () => {
            window.cancelAnimationFrame(raf);
        };
    }, []);


    return (
        <div className="work-project-thumb">
            {allProject.map((proj, idx) => (
                <div className="work-project-thumb-item" key={proj.name + idx}>
                    <div className="work-project-thumb-item-img">
                        <img src={proj.thumb.src} alt="" className='img img-fill' />
                        <span>{idx}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProjectSlider;