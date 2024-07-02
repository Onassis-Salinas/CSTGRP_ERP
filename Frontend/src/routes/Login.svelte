<script lang="ts">
    import { Input, Label, Button, Card } from "flowbite-svelte";
    import api from "../utils/server";
    import { showSuccess } from "../utils/showToast";
    import { navigate } from "svelte-routing";
    import { setLocation } from "../utils/location";
    setLocation();
    let credentials = {
        username: "",
        password: "",
    };

    async function logout() {
        await api.get("/users/logout");
    }
    logout();

    async function login() {
        await api.post("/users/login", credentials);
        showSuccess("sesion iniciada");
        navigate("/");
    }
</script>

<section class="w-full flex flex-col justify-center items-center min-h-screen">
    <Card class="mx-auto max-w-md w-[95%]">
        <h2 class="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ingresar</h2>
        <form on:submit|preventDefault={login}>
            <div class="grid gap-6 mb-6">
                <div class="mb-6">
                    <Label for="email" class="mb-2">Nombre de usuario</Label>
                    <Input bind:value={credentials.username} type="text" id="username" placeholder="usuario" />
                </div>
                <div class="mb-6">
                    <Label for="password" class="mb-2">Contraseña</Label>
                    <Input bind:value={credentials.password} type="password" id="password" placeholder="•••••••••" />
                </div>

                <Button type="submit">Acceder</Button>
            </div>
        </form>
    </Card>
</section>
