const dom = (el, toEl = true) => {
    let allEl = document.querySelectorAll(el)
    if (allEl.length === 1) {
        return toEl ? allEl[0] : allEl
    } else {
        return allEl
    }
}

const addEvent = (el, event, callback) => {
    el.addEventListener(event, callback)
}
const addEventAll = (arr, event, callback) => {
    arr.forEach(el => {
        el.addEventListener(event, callback)
    })
}
const getIndex = (el) => {
    if (typeof el !== 'string') {
        return [...el.parentNode.children].indexOf(el)
    } else {
        return [...dom(el).parentNode.children].indexOf(dom(el))
    }
}
const offset = (el) => {
    let box = el.getBoundingClientRect();
    let docElem = document.documentElement;
    return {
        top: box.top + window.scrollY - docElem.clientTop,
        left: box.left + window.scrollX - docElem.clientLeft
    };
}
const parseRem = (input) => {
    return input / 10 * parseFloat(window.getComputedStyle(dom('html')).getPropertyValue("font-size"));
}
const parseToRem = (input) => {
    return input * parseFloat(window.getComputedStyle(dom('html')).getPropertyValue("font-size")) / 100;
}
const lerp = (x, y, a = 0.1) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));
const sawtooth = (x, fract) => x % fract

function generateHtmlFromJson(jsonData) {
    let htmlString = "";

    function processElement(element) {
        switch (element.type) {
            case "h2":
                htmlString += `<h2 data-scrollTo=${encodeURI(element.content)} >${element.content}</h2>`;
                break;
            case "paragraph":
                htmlString += `<p>${element.content}</p>`;
                break;
            case "ul":
                htmlString += "<ul>";
                element.content.forEach((li) => {
                    htmlString += `<li>${li.content}</li>`;
                });
                htmlString += "</ul>";
                break;
            default:
                break;
        }
    }

    jsonData.forEach((el) => processElement(el));

    return htmlString;
}

function getTranslate(x, y, z) {
    return `translate3d(${x}px, ${y}px, ${z}px)`;
}
const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
};

const typeSplit = { lineClass: 'split-line', wordClass: 'split-word', charClass: 'split-char', tagName: 'span' };
export {
    dom, addEvent, typeSplit, addEventAll, getIndex, offset, parseRem, parseToRem, sawtooth, generateHtmlFromJson, lerp, chunkArray, clamp, invlerp, range, getTranslate
}