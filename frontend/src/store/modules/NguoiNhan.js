import axios from "axios"

const state = {
    lstNganHang: [],
    nnSoTK: "",
    nnTenGoiNho: "",
    nnSelectedNganHang: ""
};
const getters = {
    lstNganHang: state => {
        return state.lstNganHang;
    },
    nnSoTK: state => {
        return state.nnSoTK;
    },
    nnTenGoiNho: state => {
        return state.nnTenGoiNho;
    },
    nnSelectedNganHang: state => {
        return state.nnSelectedNganHang;
    }
};
const mutations = {
    lstNganHang: (state, payload) => {
        state.lstNganHang = payload;
    },
    nnSoTK: (state, payload) => {
        state.nnSoTK = payload;
    },
    nnTenGoiNho: (state, payload) => {
        state.nnTenGoiNho = payload;
    },
    nnSelectedNganHang: (state, payload) => {
        state.nnSelectedNganHang = payload;
    }
};
const actions = {
    lstNganHang: ({ commit }, payload) => {
        commit("lstNganHang", payload);
    },
    nnSoTK: ({ commit }, payload) => {
        commit("nnSoTK", payload);
    },
    nnTenGoiNho: ({ commit }, payload) => {
        commit("nnTenGoiNho", payload);
    },
    nnSelectedNganHang: ({ commit }, payload) => {
        commit("nnSelectedNganHang", payload);
    },
    getLstNganHang: ({ commit }) => {
        axios
            .get('http://localhost:3000/api/ib-hn/get-list-info-bank')
            .then(res => {
                var arr = [];
                arr = res.data.map(function (val, ) {
                    return {
                        "id": val.MA_NGAN_HANG,
                        "text": val.MA_NGAN_HANG + " - " + val.TEN_NGAN_HANG,
                        "value": val.MA_NGAN_HANG,
                    }
                });
                commit("lstNganHang", arr);
            })
            .catch(err => {
                console.log(err);
            })
    }
};
export default {
    state, getters, mutations, actions
}