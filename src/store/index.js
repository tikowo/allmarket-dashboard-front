import { createStore } from "vuex";
import productService from "../http/services/productService";
const store = createStore({
    state() {
        return {
            initialLoad: 0,
            user: null,
            _markets: [
                {
                    id: 1,
                    name: "Flowers.coffee",
                    logo: "https://flowers.coffee/wp-content/uploads/2021/09/logo.png",
                    theme: {
                        "--mainColor": "#2135A6"
                    },
                    products: [
                        {
                            id: 1,
                            name: "Something",
                            category: "electronics",
                            image: "https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-13/Pink/Apple-iPhone-13-Pink-frontimage.png"
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Auto.am",
                    logo: "https://auto.am/assets/ico/fi/favicon-32x32.png",
                    theme: {
                        "--mainColor": "#ff5252"
                    }
                }
            ],
            markets: null,
            currentMarket: 1,
            products: [],
            categories: []
        }
    },
    getters: {
        currentMarket(state, getters) {
            return getters.markets.find(market => market.id === state.currentMarket)
        },
        products(state, getters) {
          return getters.currentMarket.products;
        },
        markets(state) {
            return state.markets ?? [];
        },
        user(state) {
            return state.user;
        },
        cssVariables(state, getters) {
            return getters.currentMarket?.theme;
        },
        _products(state) {
            return state.products.map(product => {
                return product.item.formattedAttributes
            })
        },
        categories(state) {
            return state.categories;
        }
    },
    actions: {
        selectMarket({ commit, dispatch }, payload) {
            commit('setCurrentMarket', payload);
            dispatch('fetchProducts');
        },
        init({ commit, dispatch }, payload) {
            commit('setUser', payload);
            commit('setMarkets', payload.markets)
            dispatch('fetchProducts');
            dispatch('fetchCategories');
        },
        async fetchProducts({ state, commit }) {
            const { data } = await productService.products(state.currentMarket);
            commit('setProducts', data);
        },
        async fetchCategories({ commit }) {
            const { data } = await productService.categories();
            console.log(data);
            commit('setCategories', data);
        }
    },
    mutations: {
        setCurrentMarket(state, payload) {
            state.currentMarket = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setInitialLoad(state, payload) {
            state.initialLoad = payload;
        },
        setMarkets(state, payload) {
            state.markets = payload;
        },
        setProducts(state, payload) {
            state.products = payload;
        },
        setCategories(state, payload) {
            state.categories = payload;
        }
    }
})

export default store;