import Vue from 'vue'
import Vuex from 'vuex'
import GiaoDich from './modules/GiaoDich'
import Authentication from './modules/Authentication'
import Account from './modules/Account'
import NguoiNhan from './modules/NguoiNhan'
import NguoiNo from './modules/NguoiNo'
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
        Authentication,
        Account,
        NguoiNhan,
        NguoiNo
    }
});