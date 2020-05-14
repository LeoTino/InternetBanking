import axios from "axios"

const state = {
    nnoSoTK: "",
    nnoLstNguoiNo: [],
    nnoSoTien: "",
    nnoNoiDung: "",
    nnoInfo: "",
    nnoNoiDungXoa: "",
    nnoID: ""
};
const getters = {
    nnoSoTK: state => {
        return state.nnoSoTK;
    },
    nnoLstNguoiNo: state => {
        return state.nnoLstNguoiNo;
    },
    nnoSoTien: state => {
        return state.nnoSoTien;
    },
    nnoNoiDung: state => {
        return state.nnoNoiDung;
    },
    nnoInfo: state => {
        return state.nnoInfo;
    },
    nnoNoiDungXoa: state => {
        return state.nnoNoiDungXoa;
    },
    nnoID: state => {
        return state.nnoID;
    }
};
const mutations = {
    nnoSoTK: (state, payload) => {
        state.nnoSoTK = payload;
    },
    nnoLstNguoiNo: (state, payload) => {
        state.nnoLstNguoiNo = payload;
    },
    nnoSoTien: (state, payload) => {
        state.nnoSoTien = payload;
    },
    nnoNoiDung: (state, payload) => {
        state.nnoNoiDung = payload;
    },
    nnoInfo: (state, payload) => {
        state.nnoInfo = payload;
    },
    nnoNoiDungXoa: state => {
        return state.nnoNoiDungXoa;
    },
    nnoID: state => {
        return state.nnoID;
    }
};
const actions = {
    nnoSoTK: ({ commit }, payload) => {
        commit("nnoSoTK", payload);
    },
    nnoLstNguoiNo: ({ commit }, payload) => {
        commit("nnoLstNguoiNo", payload);
    },
    nnoSoTien: ({ commit }, payload) => {
        commit("nnoSoTien", payload);
    },
    nnoNoiDung: ({ commit }, payload) => {
        commit("nnoNoiDung", payload);
    },
    nnoInfo: ({ commit }, payload) => {
        commit("nnoInfo", payload);
    },
    nnoNoiDungXoa: ({ commit }, payload) => {
        commit("nnoNoiDungXoa", payload);
    },
    nnoID: ({ commit }, payload) => {
        commit("nnoID", payload);
    },
    getLstNguoiNo: ({ commit }) => {
        axios
            .post('http://localhost:3000/debt/load-debt', {
                taiKhoanHienTai: `${localStorage.getItem("username")}`
            })
            .then(res => {
                console.log(res.data);
                var arr = [];
                arr = res.data.map(function (val, ) {
                    return {
                        "id": val.ID,
                        "text": val.TAIKHOANNO, //+ " - " + val.NOIDUNG,
                        "value": val.TAIKHOANNO,
                        "noidung": val.NOIDUNG,
                        "name": val.TAIKHOANNO
                    }
                });
                commit("nnoLstNguoiNo", arr);
            })
            .catch(err => {
                console.log(err);
            })
    },
    getInfoNguoiNo: ({ commit }) => {
        axios
            .post('http://localhost:3000/transfer/load-info-receive', {
                soTaiKhoan: state.nnoSoTK
            })
            .then(res => {
                console.log(res.data);
                commit("nnoInfo", res.data.Ten);
            })
            .catch(err => {
                console.log(err);
            })
    },
    deleteNhacNo: () => {
        console.log(state.nnoID, state.nnoNoiDungXoa);
        axios
            .post('http://localhost:3000/debt/delete-debt', {
                idNhacNo: state.nnoID,
                noiDungXoa: state.nnoNoiDungXoa
            })
            .then(res => {
                console.log(res.data);
                if(res.data != null){
                    return true;
                }
                return false;
            })
            .catch(err => {
                console.log(err);
            })
    }
};
export default {
    state, getters, mutations, actions
}