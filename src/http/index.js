import axios from 'axios';
import cookie from '../utils/cookie';

const instance =  axios.create({
    baseURL: "http://localhost:9999",
    headers: {
        "content-type": "application/json"
    }
});

instance.interceptors.request.use(
    (config) => {
        return {
            ...config,
            headers: {
                'x-access-token': cookie.get('am-token')
            },
        };
    },
    (error) => Promise.reject(error),
);
export default instance;