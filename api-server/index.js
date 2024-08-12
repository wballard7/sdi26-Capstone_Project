const express = require('express')
const port = 5080


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('app is working')
})

app.listen(port, () => {
    console.log('App listening on port:', port)
})