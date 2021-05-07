import { clear, dateElement, CHECK, UNCHECK, LINE_THROUGH, list, today, options, } from "./constants.js";
import { addItem, clearLocalStorage, targetItem } from "./utils.js";
// Variables
export let LIST = [];
let id = 0;
// get item form localstorage
let data = localStorage.getItem("TODO");
// check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}
else {
    // if date isn't empty
    LIST = [];
    id = 0;
}
// load items to the user's interface
function loadList(array) {
    array.forEach((item) => {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
// Show todays date
dateElement.innerHTML = today.toLocaleDateString("en-US", options);
// add to do function
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
// complete to do
export function completeToDo(element) {
    var _a, _b;
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    (_b = (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.querySelector(".text")) === null || _b === void 0 ? void 0 : _b.classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}
// remove to do
export function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
// EVENT LISTENERS
// clear the local storage
clear === null || clear === void 0 ? void 0 : clear.addEventListener("click", clearLocalStorage);
// add an item to the list using the enter key
document.addEventListener("keyup", (event) => addItem(event, id));
// target the items created dynamically
list === null || list === void 0 ? void 0 : list.addEventListener("click", (event) => targetItem(event));
