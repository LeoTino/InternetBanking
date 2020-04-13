import Vue from 'vue'
import Vuex from 'vuex'
import GiaoDich from './modules/GiaoDich'
import Authentication from './modules/Authentication'
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
         
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        GiaoDich,
        Authentication
    }
});