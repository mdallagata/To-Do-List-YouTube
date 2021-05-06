import { TimeOptions } from "./interfaces.js";

export const clear = document.querySelector(".clear");
export const dateElement = document.getElementById("date");
export const list = document.getElementById("list");
export const input = document.getElementById("input") as HTMLInputElement;

export const CHECK = "fa-check-circle";
export const UNCHECK = "fa-circle-thin";
export const LINE_THROUGH = "lineThrough";

export const options: TimeOptions = {
  weekday: "long",
  month: "short",
  day: "numeric",
};
export const today = new Date();
