import { clear, dateElement, CHECK, UNCHECK, LINE_THROUGH, list, today, options, } from "./constants.js";
import { addItem, clearLocalStorage, targetItem } from "./utils.js";
// Variables
export let LIST = [];
let id = 0;
// traer item del localstorage
let data = localStorage.getItem("TODO");
// checkear que data no este vacío
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // le asigna al id a el último de la lista
    loadList(LIST); // carga la lista en la pantalla
}
else {
    // si la lista esta vacía
    LIST = [];
    id = 0;
}
// carga los items a la interfaz de usuario
function loadList(array) {
    array.forEach((item) => {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
// Muesta la fecha de hoy
dateElement.innerHTML = today.toLocaleDateString("es-AR", options);
// add to do
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
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}
// remove to do
export function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
// EVENT LISTENERS
// limpia el local storage
clear === null || clear === void 0 ? void 0 : clear.addEventListener("click", clearLocalStorage);
// agrega un item a la lista usando la tecla 'enter'
document.addEventListener("keyup", (event) => addItem(event, id));
// target a los items creados automaticamente
list === null || list === void 0 ? void 0 : list.addEventListener("click", (event) => targetItem(event));
