import axios from "axios"

const state = {
    nnoSoTK: "",
    nnoLstNguoiNo: [],
    nnoSoTien: "",
    nnoNoiDung: "",
    nnoInfo: "",
    nnoNoiDungXoa: "",
    nnoID: "",
    funcUsername: "",
    funcLstAllUser: [],
    nnoUsernameInfo: ""
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
    getLstNguoiNoDoBanThanTao: ({ commit }) => {
        axios
            .post('http://localhost:3000/debt/load-debt', {
                taiKhoanHienTai: `${localStorage.getItem("username")}`
            })
            .then(res => {
                console.log(res.data);
                var arr = [];
                arr = res.data.map(function (val) {
                    return {
                        id: val.ID,
                        noidung: val.NOIDUNG,
                        tendoi: val.TEN_NGUOI_DOI,
                        stkdoi: val.SO_TAI_KHOAN_DOI,
                        tenbidoi: val.TEN_NGUOI_BI_DOI,
                        stkbidoi: val.SO_TAI_KHOAN_BI_DOI,
                        status: val.TRANG_THAI,
                        phanhoi: val.PhanHoi,
                        sotien: val.SOTIEN
                    };
                });
                commit("nnoLstNguoiNo", arr);
            })
            .catch(err => {
                console.log(err);
            })
    },
    getInfoNguoiNo: ({ commit }) => {
        axios
            .post('http://localhost:3000/transfer/load-info-receive-from-stk', {
                soTaiKhoan: state.nnoSoTK
            })
            .then(res => {
                console.log(res.data);
                commit("nnoInfo", "Tài khoản không tồn tại");
                if (res.data[0].Ten == undefined) {
                    commit("nnoInfo", "Tài khoản không tồn tại");
                } else {
                    state.nnoUsernameInfo = res.data[0].TenDangNhap;
                    commit("nnoInfo", res.data[0].Ten);
                }
            })
            .catch(err => {
                console.log(err);
            })
    },
    taoNguoiNo: ({ state }) => {
        var MaKhachHang = `${localStorage.getItem("currentUser")}`
        axios
            .get(`http://localhost:3000/customer/getAccounts/` + MaKhachHang)
            .then(res => {
                var listTT = res.data.filter(i => i.LoaiTaiKhoan == 0);
                console.log(listTT[0].SoTaiKhoan);
                axios
                    .post('http://localhost:3000/debt/add-debt', {
                        tenNguoiDoi: `${localStorage.getItem("username")}`,
                        soTaiKhoanDoi: listTT[0].SoTaiKhoan,
                        tenNguoiBiDoi: state.nnoUsernameInfo,
                        soTaiKhoanBiDoi: state.nnoSoTK,
                        soTien: state.nnoSoTien,
                        noiDung: state.nnoNoiDung
                    })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.success == "success") {
                            alert("Thêm thành công!");
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            });

    },
};
export default {
    state, getters, mutations, actions
}

