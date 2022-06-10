<script lang="ts">
	import '../app.css';
	import SuperTokens from 'supertokens-website';
import { onMount } from 'svelte';
import { fetchUserData, user } from '../stores/user';


	if (typeof window !== "undefined") {
		SuperTokens.init({apiDomain: 'http://localhost:3000', apiBasePath: '/auth', enableDebugLogs: true});
	}

	onMount(async() => {
		if (typeof window !== "undefined") {
			SuperTokens.init({apiDomain: 'http://localhost:3000', apiBasePath: '/auth', enableDebugLogs: true});

			if (typeof window !== "undefined") {
				console.log("DOES SESSION EXIST", await SuperTokens.doesSessionExist())

				if(await SuperTokens.doesSessionExist()) {
				// TODO: get information about the user
				await fetchUserData();
			}else {
				await SuperTokens.signOut();
				// TODO: set user store to be empty.
				user.set({});
			}
			}
		}
	})



</script>


<main>
	<slot />
</main>


