import { clear, dateElement, CHECK, UNCHECK, LINE_THROUGH, list, today, options, } from "./constants.js";
import { addItem, clearLocalStorage, targetItem } from "./utils.js";
export let LIST = [];
let id = 0;
let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
    LIST = [];
    id = 0;
}
function loadList(array) {
    array.forEach((item) => {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
dateElement.innerHTML = today.toLocaleDateString("en-US", options);
export function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `<li class="item">
   <i class="fa ${DONE} circle" job="complete" id="${id}"></i>
    <p ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o delete" job="delete" id="${id}"></i>
    </li>`;
    const position = "beforeend";
    list === null || list === void 0 ? void 0 : list.insertAdjacentHTML(position, item);
}
export function completeToDo(element) {
    var _a, _b;
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    (_b = (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.querySelector(".text")) === null || _b === void 0 ? void 0 : _b.classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}
export function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
clear === null || clear === void 0 ? void 0 : clear.addEventListener("click", clearLocalStorage);
document.addEventListener("keyup", (event) => addItem(event, id));
list === null || list === void 0 ? void 0 : list.addEventListener("click", (event) => targetItem(event));
