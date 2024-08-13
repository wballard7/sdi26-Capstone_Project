const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('On my way to be a Supra Coder');
});

const userRoutes = require('./routes/users');
const inventoryRoute = require('./routes/inventory');

// app.use('/users', usersRoute);
// app.use('/inventory', inventoryRoute);

app.get('/users', userRoutes.getAllUsers);
app.get('/users/:username', userRoutes.getUser);
app.post('/users', userRoutes.createUser);
app.post('/users/login', userRoutes.loginUser);

app.get('/inventory', inventoryRoute.getAllInventory);
app.get('/inventory/:id', inventoryRoute.getInventory);
app.get('/myinventory/:id', inventoryRoute.getAllInventoryByUser_Id);
app.post('/inventory', inventoryRoute.createInventory);
app.put('/inventory/:id', inventoryRoute.updateInventoryItem);
app.delete('/inventory/:id', inventoryRoute.deleteItem);

module.exports = app;
