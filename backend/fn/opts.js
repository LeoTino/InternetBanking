var opts = {
    GENERAL: {
        PRODUCTS_PER_PAGE: 6
    },

    ACCESS_TOKEN: {
        SECRET_KEY: 'secret',
        LIFETIME: 60000 // in seconds
    },

    REFRESH_TOKEN: {
        SIZE: 80
    },
    KEY_BANK: {
        VALUE: 80
    },

    DB: {
        HOST: '127.0.0.1',
        PORT: '3306',
        USER: 'root',
        PWD: '',
        DB_NAME: 'ib-hn'
    }
}

module.exports = opts;