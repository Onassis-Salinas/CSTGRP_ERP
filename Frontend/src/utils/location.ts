import { writable } from "svelte/store";

export const location = writable("");

export const setLocation = () => {
    location.set(window.location.pathname);
};
