const express = require('express');

const app = express();

app.use("/Hello", (req, res) => {
    res.send('hello Chepu ra mama! ');
});
app.use("/test", (req, res) => {
    res.send('in front there is crocodile festival');
});

app.listen(7272, () => {
    console.log('Server is running on port 7272');
})