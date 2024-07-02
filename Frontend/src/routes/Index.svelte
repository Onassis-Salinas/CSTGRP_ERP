<script lang="ts">
    import { setLocation } from "../utils/location";
    import Cookies from "js-cookie";
    setLocation();

    const username = Cookies.get("username");
    if (!username) window.location.href = "/login";
</script>

<div class="flex flex-col justify-center gap-4 items-center min-h-[80lvh]">
    <div class="flex items-center gap-4">
        <img src="/logo.svg" alt="" class="h-32" />
        <p class="text-6xl">Sistema de<br /> administracion</p>
    </div>

    <!-- <p class="text-2xl text-gray-500">Bienvenido {username}</p> -->
</div>
