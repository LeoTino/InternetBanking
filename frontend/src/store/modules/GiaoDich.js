import axios from "axios"

const state = {
    srcAccount: "",
    lstSrc: [
        {
            id: "02810002324343",
            text: "Tran Van A - 02810002324343",
            value: "02810002324343"
        },
        {
            id: "02810002324343",
            text: "Tran Van A1 - 02810002324343",
            value: "02810002324343"
        },
        {
            id: "02810002324343",
            text: "Tran Van A2 - 02810002324343",
            value: "02810002324343"
        }
    ],
    receiveAccount: "",
    lstReceive: [
        { id: "-1", text: "Nonne", value: "-1" },
        { id: "0281434", text: "Tran Van B - 0281434", value: "0281434" },
        { id: "0281434", text: "Tran Van B1 - 0281434", value: "0281434" },
        { id: "0281434", text: "Tran Van B2 - 0281434", value: "0281434" }
    ],
    soTienChuyen: "",
    messageTransfer: "",
    nguoitraphi: ""
};
const getters = {
    srcAccount: state => {
        return state.srcAccount;
    },
    lstSrc: state => {
        return state.lstSrc;
    },
    receiveAccount: state => {
        return state.receiveAccount;
    },
    lstReceive: state => {
        return state.lstReceive;
    },
    soTienChuyen: state => {
        return state.soTienChuyen;
    },
    messageTransfer: state => {
        return state.messageTransfer;
    },
    nguoitraphi: state => {
        return state.nguoitraphi;
    }
};
const mutations = {
    srcAccount: (state, payload) => {
        state.srcAccount = payload;
    },
    lstSrc: (state, payload) => {
        state.lstSrc = payload;
    },
    receiveAccount: (state, payload) => {
        state.receiveAccount = payload;
    },
    lstReceive: (state, payload) => {
        state.lstReceive = payload;
    },
    soTienChuyen: (state, payload) => {
        state.soTienChuyen = payload;
    },
    messageTransfer: (state, payload) => {
        state.messageTransfer = payload;
    },
    nguoitraphi: (state, payload) => {
        state.nguoitraphi = payload;
    },
    callApiChuyenTien: (state) => {
        axios
            .post('http://localhost:3000/transfer/internal', {
                taiKhoanNguon: state.srcAccount,
                tentaiKhoanNguon: "Tran Van A",
                soTaikhoanNhan: state.receiveAccount,
                tenTaikhoanNhan: "Tran Van B",
                soTienChuyen: state.soTienChuyen,
                noiDungChuyen: state.messageTransfer,
                phi: state.nguoitraphi
            })
            .then(res => {
                console.log(res);
                alert("called");
            })
            .catch(err => {
                console.log(err);
            });
    }
};
const actions = {
    srcAccount: ({ commit }, payload) => {
        commit("srcAccount", payload);
    },
    lstSrc: ({ commit }, payload) => {
        commit("lstSrc", payload);
    },
    receiveAccount: ({ commit }, payload) => {
        commit("receiveAccount", payload);
    },
    lstReceive: ({ commit }, payload) => {
        commit("lstReceive", payload);
    },
    soTienChuyen: ({ commit }, payload) => {
        commit("soTienChuyen", payload);
    },
    messageTransfer: ({ commit }, payload) => {
        commit("messageTransfer", payload);
    },
    nguoitraphi: ({ commit }, payload) => {
        commit("nguoitraphi", payload);
    },
    callApiChuyenTien: ({ commit }) => {
        commit("callApiChuyenTien");
    }
};
export default {
    state, getters, mutations, actions
}