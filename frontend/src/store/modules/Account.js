import axios from "axios"

const state = {
    ten: "",
    diaChi: "",
    tenDangNhap: "",
    matKhau: "",
    email: "",
    phone: ""
};
const getters = {
    ten: state => {
        return state.ten;
    },
    diaChi: state => {
        return state.diaChi;
    },
    tenDangNhap: state => {
        return state.tenDangNhap;
    },
    matKhau: state => {
        return state.matKhau;
    },
    email: state => {
        return state.email;
    },
    phone: state => {
        return state.phone;
    }
};
const mutations = {
    ten: (state, payload) => {
        state.ten = payload;
    },
    diaChi: (state, payload) => {
        state.diaChi = payload;
    },
    tenDangNhap: (state, payload) => {
        state.tenDangNhap = payload;
    },
    matKhau: (state, payload) => {
        state.matKhau = payload;
    },
    email: (state, payload) => {
        state.email = payload;
    },
    phone: (state, payload) => {
        state.phone = payload;
    },
    createAccount: (state) => {
        axios
            .post('http://localhost:3000/employment/createAccount', {
                ten: state.ten,
                diaChi: state.diaChi,
                tenDangNhap: state.tenDangNhap,
                matKhau: state.matKhau,
                email: state.email,
                phone: state.phone,
                role: "user"
            })
            .then(res => {
                console.log(res);
                if (res.data.status == "success") {
                    // tạo tài khoản thanh toán
                    axios
                        .post('localhost:3000/employment/add-debit-account', {
                            infoCustomer: state.tenDangNhap,
                            soTien: 0,
                            loaiTaiKhoan: 1
                        })
                        .then(res => {
                            console.log("tạo tài khoản thanh toán 0đ" + res);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    alert("Create account success!");
                } else {
                    alert("Create account failed! Please check again or contact administrator!");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
};
const actions = {
    ten: ({ commit }, payload) => {
        commit("ten", payload);
    },
    diaChi: ({ commit }, payload) => {
        commit("diaChi", payload);
    },
    tenDangNhap: ({ commit }, payload) => {
        commit("tenDangNhap", payload);
    },
    matKhau: ({ commit }, payload) => {
        commit("matKhau", payload);
    },
    email: ({ commit }, payload) => {
        commit("email", payload);
    },
    phone: ({ commit }, payload) => {
        commit("phone", payload);
    },
    createAccount: ({ commit }) => {
        commit("createAccount");
    }
};
export default {
    state, getters, mutations, actions
}