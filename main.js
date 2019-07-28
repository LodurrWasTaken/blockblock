let element;
let blockedElements = [];

retrieveBlockedElements();

document.addEventListener('mouseover', e => {
    if (element) element.classList.remove('onHover');
    element = e.target;
    if (!e.altKey) return;
    element.classList.add('onHover');
});
document.addEventListener('click', e => {
    if (!e.altKey) return;
    e.preventDefault();
    element.classList.remove('onHover');
    if (!element.className) return;
    blockedElements.push(element.className);
    sendToBackground(Array.from(new Set(blockedElements)));
    removeElement(element);
});

function sendToBackground(data) {
    chrome.runtime.sendMessage({ type: 'set', data });
}
function retrieveBlockedElements() {
    chrome.runtime.sendMessage({ type: 'get' }, function (response) {
        blockedElements = response || [];
        blockedElements.forEach(className => {
            if (document.getElementsByClassName(className)[0]) {
                removeElement(document.getElementsByClassName(className)[0])
            }
        });
    });
}
function removeElement(element) {
    element.parentNode.removeChild(element);
}