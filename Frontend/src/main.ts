import "./app.pcss";
import App from "./App.svelte";
import { showError } from "./utils/showToast";

const app = new App({
    target: document.getElementById("app")!,
});

window.addEventListener("unhandledrejection", (e) => {
    if (e.reason.name === "AxiosError") showError(e.reason);
});

export default app;
