import SplitType from 'split-type';
import { typeSplit, parseToRem } from '@/js/utils';
import { scroll } from 'motion';
import { useEffect } from "react";
import cn from "clsx";

const AnimMaskLine = ({ className, textClass, ...props }) => {
    useEffect(() => {
        const target = {
            content: document.querySelector(`.${className}-content-wrapper`),
        }

        let cloner = target.content.querySelector(`.${className}-content`).cloneNode(true)
        cloner.classList.add('is-bg')
        target.content.prepend(cloner)

        const SplitTxt = {
            content: new SplitType(`.${className}-content:not(.is-bg)`, { types: 'lines', ...typeSplit })
        }

        SplitTxt.content.lines.forEach((el) => {
            el.style.setProperty('--size', '100%');

            scroll(({ y }) => {
                el.style.setProperty('--size', `${100 - (y.progress * 100)}%`);
            }, {
                target: el,
                offset: ['start 60%', 'end 60%']
            })
        });
    }, [])

    return (
        <div className={cn(textClass, 'content-bg', `${className}-content-wrapper`)}>
            <div className={cn(`${className}-content`)}>
                {props.children}
            </div>
        </div>
    )
}


export default AnimMaskLine;