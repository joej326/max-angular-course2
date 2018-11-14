const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

const port = 3002;


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});