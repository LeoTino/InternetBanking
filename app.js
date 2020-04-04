var express = require('express'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	cors = require('cors'),
	path = require('path');

var categoryCtrl = require('./apiControllers/categoryController'),
	productCtrl = require('./apiControllers/productController'),
	userCtrl = require('./apiControllers/userController'),
	orderCtrl = require('./apiControllers/orderController');
	customerCtrl = require('./apiControllers/customerController');

var verifyAccessToken = require('./repos/authRepo').verifyAccessToken;

var app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

var staticDir = express.static(
    path.resolve(__dirname, 'public')
);
app.use(staticDir);

// app.get('/', (req, res) => {
// 	var ret = {
// 		msg: 'hello from nodejs api'
// 	};
// 	res.json(ret);
// });

app.use('/categories', categoryCtrl);
app.use('/users', userCtrl);
app.use('/products', productCtrl);
app.use('/orders', verifyAccessToken, orderCtrl);
app.use('/customer',  customerCtrl);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`API running on port ${port}`);
});;