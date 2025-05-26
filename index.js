const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { delay } = require('./utils');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// available users
const users = [
    {
        username: "user1@gmail.com",
        password: "123"
    },
    {
        username: "user2@gmail.com",
        password: "1234"
    }
];


// available products
const products = [
    {
        id: 1,
        name: "Product 1",
        price: 100,
        shopName: "Shop 1",
        shopCategory: "Category 1",
        description: "Description of Product 1",
        rating: 4.5,
        avaliableSizes: ["S", "M", "L"],
        image: "https://m.media-amazon.com/images/I/41Tbr4iFggL._AC_.jpg"
    },
    {
        id: 2,
        name: "Product 2",
        price: 200,
        shopName: "Shop 2",
        shopCategory: "Category 2",
        description: "Description of Product 2",
        rating: 4.0,
        avaliableSizes: ["M", "L", "XL"],
        image: "https://m.media-amazon.com/images/I/41Tbr4iFggL._AC_.jpg"
    },
    {
        id: 3,
        name: "Product 3",
        price: 300,
        shopName: "Shop 3",
        shopCategory: "Category 3",
        description: "Description of Product 3",
        rating: 4.0,
        avaliableSizes: ["M", "L", "XL"],
        image: "https://m.media-amazon.com/images/I/41Tbr4iFggL._AC_.jpg"
    },
    {
        id: 4,
        name: "Product 4",
        price: 400,
        shopName: "Shop 4",
        shopCategory: "Category 4",
        description: "Description of Product 4",
        rating: 4.0,
        avaliableSizes: ["M", "L", "XL"],
        image: "https://m.media-amazon.com/images/I/41Tbr4iFggL._AC_.jpg"
    }
];

// routes
app.get('/status', async (req, res) => {
    console.log('GET status');

    const shownUsers = users.map(u => ({
        ...u,
        password: "*******"
    }));

    res.json({ availableUsers: shownUsers });
});

app.get('/products', async (req, res) => {
    console.log('GET products');
    await delay(1500);
    res.json(products);
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("POST login: " + JSON.stringify(req.body));

    await delay(1500);

    if (!username || !password) {
        res.status(400);
        return res.json({ message: 'Username and password are required.' });
    }

    const user = users.find(u => u.username === username);
    if (user === undefined) {
        res.status(404);
        return res.json({ message: 'unexisting username' });
    }

    if (user.password !== password) {
        res.status(401);
        return res.json({ message: 'wrong password' });
    }

    res.status(200);
    res.json({ message: 'success' });
});

app.listen(port, () => {
    console.log('started server...');
});