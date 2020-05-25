import axios from "axios"

const state = {
    lstNganHang: [],
    nnSoTK: "",
    nnTenGoiNho: "",
    nnSelectedNganHang: "",
    nnID: ""
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
    },
    nnID: state => {
        return state.nnID;
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
    },
    nnID: (state, payload) => {
        state.nnID = payload;
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
    nnID: ({ commit }, payload) => {
        commit("nnID", payload);
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
    },
    createNguoiNhan: ({ state }) => {
        axios
            .post('http://localhost:3000/transfer/set-up-user-receive', {
                tenDangNhap: localStorage.getItem("username"),
                soTK: state.nnSoTK,
                tenGoiNho: state.nnTenGoiNho,
                nganHang: state.nnSelectedNganHang,
                method: 1
            })
            .then(res => {
                alert("Success");
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    },
    editNguoiNhan: ({ state }) => {
        axios
            .post('http://localhost:3000/transfer/set-up-user-receive', {
                id: state.nnID,
                tenDangNhap: localStorage.getItem("username"),
                soTK: state.nnSoTK,
                tenGoiNho: state.nnTenGoiNho,
                nganHang: state.nnSelectedNganHang,
                method: 2
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    },
    deleteNguoiNhan: ({ state }) => {
        axios
            .post('http://localhost:3000/transfer/set-up-user-receive', {
                tenDangNhap: localStorage.getItem("username"),
                soTK: state.nnSoTK,
                tenGoiNho: state.nnTenGoiNho,
                nganHang: state.nnSelectedNganHang,
                method: 3
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    },
    loadNguoiNhan: ({ commit }) => {
        axios
            .post('http://localhost:3000/transfer/load-info-receive-from-stk', {
                soTaiKhoan: state.nnSoTK
            })
            .then(res => {
                console.log(res);
                commit("nnSoTK", res.data[0].SoTaiKhoan);
                commit("nnTenGoiNho", res.data[0].Ten);
            })
            .catch(err => {
                console.log(err);
            });
    },
};
export default {
    state, getters, mutations, actions
}