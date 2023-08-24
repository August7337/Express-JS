const express = require('express');
const http = require('http');

const app =express();

app.listen(3000, () => {
    console.log('server started at port 3000');
})