<script lang="ts">
import { goto } from '$app/navigation';
import SuperTokens from "supertokens-website";
import { onMount } from 'svelte';

	import { page } from '$app/stores';
	import { http } from '../../../../util/http';

	
	onMount(() => {
		if (typeof window !== "undefined") {

		console.log("kfhulwehfiluqwheilufhqilefhiqluefhkuqehfiqefhgiulqehgfuiqe")
		SuperTokens.addAxiosInterceptors(http);
		const code = $page.url.searchParams.get('code');

		(async () => {
			await http.post('/auth/signinup', {
				redirectURI: 'http://localhost:8080/auth/callback/social/google',
				thirdPartyId: 'google',
				code: `${code}`
			});
		})().catch((err) => {
			// console.error(err);
		});
	}
	})
</script>
