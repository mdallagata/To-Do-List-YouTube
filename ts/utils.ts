import { addToDo, completeToDo, LIST, removeToDo } from "./app.js";
import { input } from "./constants.js";

export function clearLocalStorage() {
  localStorage.clear();
  location.reload();
}

export function addItem(event: KeyboardEvent, id: number) {
  if (event.keyCode == 13) {
    const toDo = input.value;

    // si el input no esta vacío
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      // agrega un item del localstorage (este código debe ser agregado donde LIST sea actualizado)
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
}

export function targetItem(event: MouseEvent) {
  const element = event.target as any; // devuelve el elemento clickeado dentro de la lista
  const elementJob = element.attributes.job.value; // complete o delete

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  // agrega un item del localstorage (este código debe ser agregado donde LIST sea actualizado)
  localStorage.setItem("TODO", JSON.stringify(LIST));
}
