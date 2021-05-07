import { addToDo, completeToDo, LIST, removeToDo } from "./app.js";
import { input } from "./constants.js";

export function clearLocalStorage() {
  localStorage.clear();
  location.reload();
}

export function addItem(event: KeyboardEvent, id: number) {
  if (event.keyCode == 13) {
    const toDo = input.value;

    // if the input isn't empty
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      // add item form localstorage ( this code mut be added where the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
}

export function targetItem(event: MouseEvent) {
  const element = event.target as any; // return the clicked element inside list
  const elementJob = element.attributes.job.value; // complete or delete

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  // add item form localstorage ( this code mut be added where the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
}
