import http from '../index';

export default {
    products(id) {
        return http.get(`/market/${id}/products`)
    },
    categories() {
        return http.get('/items/categories');
    },
    categoryAttributes(id) {
        return http.get(`/items/category/${id}`)
    }
}