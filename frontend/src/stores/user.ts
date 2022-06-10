import { goto } from '$app/navigation';
import { map } from 'nanostores';
import { http } from '../util/http';

interface userProfileStructure {
	id?: number;
	uid?: string;
	username?: string;
	email?: string;
	permissions?: number;
	verified?: boolean;
}

export const user = map<userProfileStructure>({});

export async function fetchUserData() {
	http.get('/user/@me').then((res) => {
		if (!res.data.setup) {
			goto('/setup');
		}
		user.set(res.data);
	});
}
