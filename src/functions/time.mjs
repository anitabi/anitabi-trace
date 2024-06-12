import { padLeft } from "./string.mjs";

export const second2ms = (t = 0) => `${Math.floor(t/60)}:${padLeft(Math.floor(t%60),2,'0')}`