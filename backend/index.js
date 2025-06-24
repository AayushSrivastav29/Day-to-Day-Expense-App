const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./utils/db-connection');
const path = require('path');

//
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));


//importing models
const Users = require('./models/userModel');


//importing routes
const userRoute = require('./routes/userRoute');



app.use('/api/user', userRoute);


app.use('/api' , (req,res)=>{
    if (req.path==='/' || req.url==='/api') {
        res.send(`<h1>This is backend page</h1>`)
    }
})






db.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("server is running at 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });


