let isInitMouse = false;
function initMouse() {
    isInitMouse = true;
    document.querySelector('html').style.setProperty('--cursor-top', '0px');
    document.querySelector('html').style.setProperty('--cursor-left', '0px');

    function getCursor(e) {
        document.querySelector('html').style.setProperty('--cursor-top', e.clientY + 'px');
        document.querySelector('html').style.setProperty('--cursor-left', e.clientX + 'px');
    }
    window.addEventListener('pointermove', (e) => getCursor(e));
}
function Mouse() {
    if (!isInitMouse) {
        initMouse();
    }
    return {
        x: parseFloat(document.querySelector('html').style.getPropertyValue('--cursor-left')),
        y: parseFloat(document.querySelector('html').style.getPropertyValue('--cursor-top'))
    }
}

export { initMouse, Mouse };