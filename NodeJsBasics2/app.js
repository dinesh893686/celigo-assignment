const express = require('express');
const http = require('http')
const appRouter = require('./router/app')
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3001;

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


app.get('/', (req, res) => {
    res.send('Hello, welcome to my Express app!');
});

app.get('/products', (req, res) => {
    fs.readdir('./products', (err, files) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(files);
        }
    });
});

app.get('/products/:productFileName', (req, res) => {
    const productFile = req.params.productFileName;
    fs.readFile(`./products/${productFile}.json`, (err, content) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(content);
        }
    });
});




app.put('/products/:productFileName', (req, res) => {
    const productFile = req.params.productFileName;
    fs.writeFile(`./products/${productFile}.json`,JSON.stringify(req.body), (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(`${productFile}.json updated`);
        }
    });
});

app.post('/products/:productFileName', (req, res) => {
    const productFile = req.params.productFileName;;
    fs.exists(`./products/${productFile}.json`, (exists) => {
        if (!exists) {
            fs.writeFile(`./products/${productFile}.json`, JSON.stringify(req.body), (err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send(`${productFile}.json created`);
                }
            });
        } else {
            res.send(`${productFile}.json already exists`);
        }
    });
});

// app.use("/products", appRouter);

app.use((req, res) => {
    res.status(404).send('404: Not Found');
});

