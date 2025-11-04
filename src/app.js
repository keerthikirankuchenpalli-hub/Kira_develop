const express = require('express');

const app = express();

app.use("/Hello", (req, res) => {
    res.send('hello Chepu ra mama! ');
});
app.use("/test", (req, res) => {
    res.send('in front there is crocodile festival');
});

app.use("/final", (req, res) => {
    res.send('it is second test route');
});

app.use("/", (req, res) => {
    res.send('finally done with express js');
});




app.listen(7272, () => {
    console.log('Server is running on port 7272');
})