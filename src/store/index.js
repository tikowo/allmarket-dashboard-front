import { createStore} from "vuex";

const store = createStore({
    state() {
        return {
            user: {
                name: "Tiko",
                email: "tiko@gmail.com"
            },
            markets: [
                {
                    id: 1,
                    name: "Flowers.coffee",
                    logo: "https://flowers.coffee/wp-content/uploads/2021/09/logo.png",
                    theme: {
                        "--mainColor": "#2135A6"
                    }
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
            currentMarket: 1,
        }
    },
    getters: {
        currentMarket(state) {
            return state.markets.find(market => market.id === state.currentMarket)
        },
        markets(state) {
            return state.markets;
        },
        user(state) {
            return state.user;
        },
        cssVariables(state, getters) {
            return getters.currentMarket.theme;
        }
    },
    actions: {
        selectMarket({ commit }, payload) {
            commit('setCurrentMarket', payload)
        }
    },
    mutations: {
        setCurrentMarket(state, payload) {
            state.currentMarket = payload;
        }
    }
})

export default store;