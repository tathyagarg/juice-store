<script lang="ts">
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import { setCookie } from "typescript-cookie";

    let failed = false;

    onMount(async () => {
        if (browser) {
            const url = new URL(window.location.href);
            const searchParams = url.searchParams;
            const code = searchParams.get("code");
            
            const res = await fetch("/api/v1/slack", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code, redirect_uri: "https://localhost:5173/callback" }) // TODO: fix, ill keep the redir hard coded as slack requires https or it actually kills me (fixing later)
            });

            if (res.ok) {
                const { access_token, id_token } = await res.json();

                setCookie("access_token", access_token, { expires: 60 * 60 * 24 * 28 });
                setCookie("id_token", id_token, { expires: 60 * 60 * 24 * 28 });

                window.location.href = "/";
            } else {
                failed = true;
            }
        }
    })
</script>

<div class="flex h-screen w-full">
    <div class="m-auto">
        {#if failed}
            <h1 class="text-4xl">Failed to log in</h1>
        {:else}
            <h1 class="text-4xl">Logging in...</h1>
        {/if}
    </div>
</div>