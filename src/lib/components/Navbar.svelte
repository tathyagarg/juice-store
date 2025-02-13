<script lang="ts">
    import { getCookie } from "typescript-cookie";
    import { PUBLIC_SLACK_CLIENT_ID } from "$env/static/public";
    import { browser } from "$app/environment";
    import { jwtDecode } from "jwt-decode";

    let loc = "";
    let user;

    if (browser) {
        loc = window.location.href;

        const jwt = getCookie("id_token");

        if (jwt) {
            user = jwtDecode(jwt);
        }
    }
</script>

<div class="flex w-full h-fit bg-ctp-mantle border-b">
    <img src="https://assets.hackclub.com/flag-orpheus-left.png" alt="Hack Club Flag" class="h-16" />

    <div class="ml-auto mr-4 my-auto">
        {#if !user}
            <a class="flex bg-ctp-crust p-2 px-4 rounded-md" 
                href={`https://hackclub.slack.com/oauth/v2/authorize?scope=&user_scope=openid%2Cprofile%2Cemail&redirect_uri=${loc + "callback"}&client_id=${PUBLIC_SLACK_CLIENT_ID}`}
            target="_blank">
                <img src="/slack.svg" class="my-auto" alt="Slack" height="24" width="24">
                <span class="my-auto ml-2">Log In</span>
            </a>
        {:else}
            <div class="flex">
                <span class="my-auto text-2xl mr-2">{user.name}</span>
                <img src={user.picture} alt="pfp" class="h-12 w-12 rounded-full" />
            </div>
        {/if}
    </div>
</div>