import axios from "axios"
import router from '@/router'

const state = {
    user: "",
    pwd: "",
    msgLoginFailed: false,
    role: 0,
};
const getters = {
    user: state => {
        return state.user;
    },
    pwd: state => {
        return state.pwd;
    },
    msgLoginFailed: state => {
        return state.msgLoginFailed;
    },
    role: state => {
        return state.role;
    }
};
const mutations = {
    user: (state, payload) => {
        state.user = payload;
    },
    pwd: (state, payload) => {
        state.pwd = payload;
    },
    msgLoginFailed: (state, payload) => {
        state.msgLoginFailed = payload;
    },
    callApiLogin: (state) => {
        axios
            .post('http://localhost:3000/users/login', {
                user: state.user,
                pwd: state.pwd
            })
            .then(res => {
                state.msgLoginFailed = !res.data.auth;
                if (res.data.auth == true) {
                    console.log(res);
                    localStorage.setItem('currentUser', res.data.user.MaKhachHang);
                    localStorage.setItem('username', res.data.user.Ten);
                    localStorage.setItem('token', res.data.access_token);
                    localStorage.setItem('access-token', res.data.access_token);
                    localStorage.setItem('refresh-token', res.data.refresh_token);
                    localStorage.setItem('Role', res.data.user.Role);
                    console.log(localStorage);
                    state.role = res.data.user.Role;
                    router.push(`/customer/getAccounts/` + `${localStorage.getItem("currentUser")}`);
                    if(state.role == "user"){//sau nay la user
                        router.push(`/customer/dashboard`);
                    } else if (state.role == "nhanvien"){
                        router.push(`/employee/dashboard`);
                    } else if (state.role == "admin"){
                        router.push(`/admin/dashboard`);
                    } else {
                        return false;
                    }     
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
};
const actions = {
    user: ({ commit }, payload) => {
        commit("user", payload);
    },
    pwd: ({ commit }, payload) => {
        commit("pwd", payload);
    },
    msgLoginFailed: ({ commit }, payload) => {
        commit("msgLoginFailed", payload);
    },
    callApiLogin: ({ commit }) => {
        commit("callApiLogin");
    },
    callApiRefreshToken: () => {
        axios
            .post('http://localhost:3000/users/renew-token', {
                refreshToken: localStorage.getItem("refresh-token")
            })
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.access_token);
                localStorage.setItem('access-token', res.data.access_token);
            })
            .catch(err => {
                console.log(err);
            });
    }
};
export default {
    state, getters, mutations, actions
}