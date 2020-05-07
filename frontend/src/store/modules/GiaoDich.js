import axios from "axios"

const state = {
    srcAccount: "",
    lstSrc: [],
    receiveAccount: "",
    lstReceive: [],
    soTienChuyen: "",
    messageTransfer: "",
    nguoitraphi: "",
    isSendOTP: false,
    otpCode: "",
    infoName: "Tài khoản không tồn tại",
    isMatchOTP: "none"
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
    },
    isSendOTP: state => {
        return state.isSendOTP;
    },
    otpCode: state => {
        return state.otpCode;
    },
    infoName: state => {
        return state.infoName;
    },
    isMatchOTP: state => {
        return state.isMatchOTP;
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
    isSendOTP: (state, payload) => {
        state.isSendOTP = payload;
    },
    otpCode: (state, payload) => {
        state.otpCode = payload;
    },
    infoName: (state, payload) => {
        state.infoName = payload;
    },
    isMatchOTP: (state, payload) => {
        state.isMatchOTP = payload;
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
            })
            .catch(err => {
                console.log(err);
            });
    },
    callApiGetOTP: (state) => {
        axios
            .post('http://localhost:3000/otp/send', {
                tenDangNhap: `${localStorage.getItem("username")}`
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        state.isSendOTP = true;
    }
};
const actions = {
    srcAccount: ({ commit }, payload) => {
        commit("srcAccount", payload);
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
    otpCode: ({ commit }, payload) => {
        commit("otpCode", payload);
    },
    isMatchOTP: ({ commit }, payload) => {
        commit("isMatchOTP", payload);
    },
    callApiChuyenTien: ({ commit }) => {
        commit("callApiChuyenTien");
    },
    callApiGetOTP: ({ commit }) => {
        commit("callApiGetOTP");
    },
    compareOTP: ({ commit }) => {
        axios
            .post('http://localhost:3000/otp/compare', {
                tenDangNhap: `${localStorage.getItem("username")}`,
                otpcode: state.otpCode
            })
            .then(res => {
                console.log(res.data.result);
                commit("isMatchOTP", res.data.result);
                state.isMatchOTP = res.data.result;
            })
            .catch(err => {
                console.log(err);
            });
    },
    genLstSrc: ({ commit }) => {
        axios
            .get('http://localhost:3000/customer/getAccounts/' + `${localStorage.getItem("username")}`)
            .then(res => {
                var arr = [];
                arr = res.data.map(function (val, ) {
                    return {
                        "id": val.SoTaiKhoan,
                        "text": val.SoTaiKhoan + " - " + format(val.SoTien),
                        "value": val.SoTaiKhoan,
                        "money": val.SoTien
                    }
                });
                commit("lstSrc", arr);
            })
            .catch(err => {
                console.log(err);
            })
    },
    genLstReceive: ({ commit }) => {
        axios
            .post('http://localhost:3000/transfer/load-list-info-receive', {
                tenDangNhap: `${localStorage.getItem("username")}`
            })
            .then(res => {
                var arr = [];
                arr = res.data.map(function (val, ) {
                    return {
                        "id": val.SO_TAI_KHOAN_NGUOI_NHAN,
                        "text": val.SO_TAI_KHOAN_NGUOI_NHAN + " - " + val.TEN_GOI_NHO,
                        "value": val.SO_TAI_KHOAN_NGUOI_NHAN,
                        "name": val.TEN_GOI_NHO
                    }
                });
                commit("lstReceive", arr);
            })
            .catch(err => {
                console.log(err);
            })
    },
    getInfoUserReceive: ({ commit }) => {
        axios
            .post('http://localhost:3000/transfer/load-info-receive', {
                soTaiKhoan: state.receiveAccount
            })
            .then(res => {
                console.log(res.data);
                commit("infoName", res.data.Ten);
            })
            .catch(err => {
                console.log(err);
            })
    }
};
function format(val) {
    return val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ` VND`;
}
export default {
    state, getters, mutations, actions
}