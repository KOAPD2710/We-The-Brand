import './style.scss'
import { useEffect, useRef } from 'react';
import { parseRem, lerp } from '@/js/utils';
import { Mouse } from '@/components/core/mouse';

const GlobalCursor = ({ PlusArrow, ...props }) => {
    // const cursorCoor = useRef();
    const cursorInner = useRef();

    let pointer = {
        x: 0,
        y: 0
    }

    function getCursor(e) {
        if (
            // cursorCoor.current.classList.contains('on-load') &&
            cursorInner.current?.classList.contains('on-load')) {
            // cursorCoor.current.classList.remove('on-load')
            cursorInner.current?.classList.remove('on-load')
        }
    }


    useEffect(() => {
        if (
            // !cursorCoor.current.classList.contains('on-load') && 
            !cursorInner.current.classList.contains('on-load')) return;
        pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        window.addEventListener('pointermove', (e) => getCursor(e));
        let myReq;
        let targetHover;
        let allFxClass = ['on-expand', 'on-hover'];
        let speed = .1;


        function moveCursor() {
            pointer = Mouse()
            // let curPosCoor = {
            //     x: new DOMMatrixReadOnly(getComputedStyle(cursorCoor.current).transform).m41,
            //     y: new DOMMatrixReadOnly(getComputedStyle(cursorCoor.current).transform).m42
            // }
            let curPosInner = {
                x: new DOMMatrixReadOnly(getComputedStyle(cursorInner.current).transform).m41,
                y: new DOMMatrixReadOnly(getComputedStyle(cursorInner.current).transform).m42
            }

            // cursorCoor.current.style.transform = `translate(${lerp(curPosCoor.x, targetPos.x, speed)}px, ${lerp(curPosCoor.y, targetPos.y, speed)}px)`;
            cursorInner.current.style.transform = `translate(${lerp(curPosInner.x, pointer.x, speed)}px, ${lerp(curPosInner.y, pointer.y, speed)}px)`;


            if (document.querySelectorAll('[data-cursor]:hover').length == 1) {
                // cursorCoor.current.classList.remove(...allFxClass)
                cursorInner.current.classList.remove(...allFxClass)

                targetHover = document.querySelector('[data-cursor]:hover')

                switch (targetHover.getAttribute('data-cursor')) {
                    case 'expand':
                        // cursorCoor.current.classList.add('on-expand')
                        cursorInner.current.classList.add('on-expand')
                        break;
                    default:
                        break;
                }

            } else {
                if (targetHover != undefined) {
                    targetHover = undefined
                    // cursorCoor.current.classList.remove(...allFxClass)
                    cursorInner.current.classList.remove(...allFxClass)
                }
            }

            // if (document.querySelectorAll('[data-cursor-showcoor]:hover').length == 1) {
            //     if (!cursorCoor.current.classList.contains('on-show')) {
            //         cursorCoor.current.classList.add('on-show')
            //     }
            // } else {
            //     if (cursorCoor.current.classList.contains('on-show')) {
            //         cursorCoor.current.classList.remove('on-show')
            //     }
            // }

            myReq = requestAnimationFrame(moveCursor)
        }

        if (window.innerWidth > 991) {
            myReq = requestAnimationFrame(moveCursor)
        }

        return () => {
            window.removeEventListener('pointermove', getCursor)
            cancelAnimationFrame(myReq)
        }
    }, [])
    return (
        <div className="cursor">
            {/* <div className="cursor-coor on-load" ref={cursorCoor}>
                <div className="cursor-line line-hor line-left"></div>
                <div className="cursor-line line-hor line-right"></div>
                <div className="cursor-line line-ver line-top"></div>
                <div className="cursor-line line-ver line-bot"></div>
            </div> */}
            <div className="cursor-inner on-load" ref={cursorInner}>
                <div className="cursor-inner-main">
                    <div className="cursor-inner-main-dot"></div>
                    <div className="cursor-inner-main-outer">
                        <div className="cursor-inner-main-outer-dot"></div>
                        <div className="cursor-inner-main-outer-dot"></div>
                        <div className="cursor-inner-main-outer-dot"></div>
                        <div className="cursor-inner-main-outer-dot"></div>
                    </div>
                </div>
                <div className="cursor-inner-circle">
                    <div className="cursor-plus">
                        <div className="ic">
                            {PlusArrow}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobalCursor