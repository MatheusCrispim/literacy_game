export function manipulateElementDisplay(selector, display){
    let elem =  document.querySelector(selector);
    elem.style.display = display;
}