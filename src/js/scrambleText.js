const getRandomChar = (type) => {
    const allChars = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
    const numChars = '0123456789';
    const textChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    let chars;
    switch (type) {
        case 'all':
            chars = allChars;
            break;
        case 'number':
            chars = numChars;
            break;
        case 'text':
            chars = textChars;
            break
        default:
            chars = allChars;
            break
    }
    return chars[Math.floor(Math.random() * chars.length)]
}

const scrambleText = (target, nextText, options = {}) => {
    let { type } = options;
    let finalText;
    let nextTextArray;
    let staggerTime = 70;

    const textArray = target.textContent.split('')
    textArray.push('')


    if (nextText) {
        nextTextArray = nextText.split('')
        nextTextArray.push('')
        let missChar = nextTextArray.length - textArray.length;

        if (textArray.length < nextTextArray.length) {
            nextTextArray.forEach((char, idx) => {
                setTimeout(() => {
                    let randomArray = Array.from({ length: nextTextArray.length - missChar - idx - 1 + (idx <= missChar ? idx : missChar) }, () => getRandomChar(type))
                    finalText = [...nextTextArray.slice(0, idx), ...randomArray].join('')
                    target.innerHTML = finalText
                }, staggerTime * idx);
            })
        } else {
            textArray.forEach((char, idx) => {
                setTimeout(() => {
                    let randomArray = Array.from({ length: textArray.length - missChar - idx - 1 + (idx <= missChar ? idx : missChar) }, () => getRandomChar(type))
                    finalText = [...nextTextArray.slice(0, idx), ...randomArray]
                    target.innerHTML = finalText.join('')
                }, staggerTime * idx);
            })
        }
    } else {
        textArray.forEach((char, idx) => {
            setTimeout(() => {
                let randomArray = Array.from({ length: textArray.length - idx - 2 }, () => getRandomChar(type))
                finalText = [...textArray.slice(0, idx), ...randomArray].join('')
                target.innerHTML = finalText
            }, staggerTime * idx);
        })
    }
}

export { getRandomChar, scrambleText }