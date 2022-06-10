import axios from 'axios';
import SuperTokens from "supertokens-website";

const baseURL = 'http://localhost:3000';

const _http = axios.create({ baseURL, withCredentials: true });
SuperTokens.addAxiosInterceptors(_http);

export const http = _http;
