import http from '../index';

export default {
    login(data) {
        return http.post('/auth/login', {
            ...data
        })
    },
    me() {
        return http.get('/auth/me');
    }
}