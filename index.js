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
        name: "Camiseta cinza",
        price: 100,
        shopName: "Renner",
        shopCategory: "Casual",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor tortor odio, vitae tristique elit fermentum eget. Duis non nunc tincidunt, ullamcorper risus vel, viverra ipsum. Donec facilisis orci at elit bibendum, id cursus nisi condimentum.",
        rating: 4.5,
        avaliableSizes: ["XS", "S", "M", "L", "XL"],
        image: ["https://m.media-amazon.com/images/I/51rHZbuE08L._AC_SX569_.jpg", "https://m.media-amazon.com/images/I/51APuefJQiL._AC_SX569_.jpg", "https://m.media-amazon.com/images/I/71llUKLOdLL._AC_SX569_.jpg"]
    },
    {
        id: 2,
        name: "Calça baggy",
        price: 200,
        shopName: "Skate Street Wear",
        shopCategory: "Street Wear",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor tortor odio, vitae tristique elit fermentum eget. Duis non nunc tincidunt, ullamcorper risus vel, viverra ipsum. Donec facilisis orci at elit bibendum, id cursus nisi condimentum.",
        rating: 4.0,
        avaliableSizes: ["M", "L", "XL"],
        image: ["https://m.media-amazon.com/images/I/51uyWavwZPL._AC_SX679_.jpg", "https://m.media-amazon.com/images/I/71gS+N97umL._AC_SX679_.jpg", "https://m.media-amazon.com/images/I/71fueWl2C4L._AC_SX679_.jpg"]
    },
    {
        id: 3,
        name: "Kit 2 Moletom Careca",
        price: 300,
        shopName: "Lacoste",
        shopCategory: "Luxo",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor tortor odio, vitae tristique elit fermentum eget. Duis non nunc tincidunt, ullamcorper risus vel, viverra ipsum. Donec facilisis orci at elit bibendum, id cursus nisi condimentum.",
        rating: 5.0,
        avaliableSizes: ["XS", "S", "M", "L", "XL"],
        image: ["https://m.media-amazon.com/images/I/31ogfSymCaL._AC_.jpg", "https://m.media-amazon.com/images/I/51M+YFvszpL._AC_SX679_.jpg", "https://m.media-amazon.com/images/I/51yxxwJ18vL._AC_SX679_.jpg"]
    },
    {
        id: 4,
        name: "Boné de Aba Reta",
        price: 400,
        shopName: "Ophicina",
        shopCategory: "Chapéus e Bonés",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor tortor odio, vitae tristique elit fermentum eget. Duis non nunc tincidunt, ullamcorper risus vel, viverra ipsum. Donec facilisis orci at elit bibendum, id cursus nisi condimentum.",
        rating: 4.0,
        avaliableSizes: ["M", "L", "XL"],
        image: ["https://m.media-amazon.com/images/I/51DTajFKJ2L._AC_SX679_.jpg", "https://m.media-amazon.com/images/I/61x-gkEfNCL._AC_SX679_.jpg", "https://m.media-amazon.com/images/I/61sdZsl3gYL._AC_SX679_.jpg"]
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