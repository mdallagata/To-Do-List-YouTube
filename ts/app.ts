import {
  clear,
  dateElement,
  CHECK,
  UNCHECK,
  LINE_THROUGH,
  list,
  today,
  options,
} from "./constants.js";
import { ElementInterface, ListI } from "./interfaces.js";
import { addItem, clearLocalStorage, targetItem } from "./utils.js";

export let LIST: ListI[] = [];
let id: number = 0;

let data = localStorage.getItem("TODO");

if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
  LIST = [];
  id = 0;
}

function loadList(array: ListI[]) {
  array.forEach((item) => {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

dateElement!.innerHTML = today.toLocaleDateString("en-US", options);

export function addToDo(
  toDo: string,
  id: number,
  done: boolean,
  trash: boolean
) {
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
  list?.insertAdjacentHTML(position, item);
}

export function completeToDo(element: ElementInterface) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode?.querySelector(".text")?.classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

export function removeToDo(element: ElementInterface) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

clear?.addEventListener("click", clearLocalStorage);
document.addEventListener("keyup", (event) => addItem(event, id));
list?.addEventListener("click", (event) => targetItem(event));
