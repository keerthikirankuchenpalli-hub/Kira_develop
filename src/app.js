const express = require('express');

const app = express();


// // This will only handle get call to /user
// app.get("/user", (req, res) => {
//     res.send({ FirstName : "Keerthi kiran" , LastName : "kuchenpalli"});
// });

// // This will save data to database
// app.post("/user", (req, res) => {
//     res.send("Data sucessfully saved to the database")
// });

// // this will update the data
// app.patch("/user" , (req, res) => {
//     res.send("Data sucessfully updated in the database")
// })
// // this will delete the data
// app.delete("/user" , (req, res) => {
//     res.send("Data sucessfully deleted from the database")
// });

// // This will match all the HTTP method API calls to /test
// app.use("/test", (req, res) => {
//     res.send('in front there is crocodile festival');
// });

app.use(
    "/user",
    (req, res, next) => {
        console.log("response from route handler") ;
        // res.send("route handler respond!!") ;
    next();
    },

     (req, res, next) => {
        console.log("response from route handler 2") ;
        // res.send("route handler respond!! 2") ;
    next();

    },

     (req, res, next) => {
        console.log("response from route handler 3") ;
        // res.send("route handler respond!! 3") ;
    next();

    },

     (req, res, next) => {
        console.log("response from route handler 4") ;
        // res.send("route handler respond!! 4") ;
    next();

    },

     (req, res, next) => {
        console.log("response from route handler 5") ;
        res.send("route handler respond!! 5") ;

    }
)


app.listen(7272, () => {
    console.log('Server is running on port 7272');
})