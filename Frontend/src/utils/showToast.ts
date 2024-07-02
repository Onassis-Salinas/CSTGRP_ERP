import Toast from "../components/basic/Toast.svelte";

export const showSuccess = (message: string) => {
    showToast(message, true);
};

export const showError = (err: any, text?: string) => {
    let message = err.response.data.message || text;
    if (err.response.status === 403) message = "No cuentas con los permisos necesarios";

    showToast(message, false);
};

function showToast(message: string, type: boolean) {
    const toaster = document.querySelector("#toaster");

    if (!toaster) return;

    const toast = new Toast({
        target: toaster,
        props: {
            text: message,
            type,
        },
    });

    setTimeout(() => {
        toast.$destroy();
    }, 5000);
}
