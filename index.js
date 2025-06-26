const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./utils/db-connection");
const path = require("path");

//
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "view")));

//importing models
require("./models");

//importing routes
const userRoute = require("./routes/userRoute");
const expenseRoute = require("./routes/expenseRoute");

app.use("/api/user", userRoute);
app.use("/api/expense", expenseRoute);

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "view", "index.html"));
// });

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "login.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "signup.html"));
});
// app.get("/api", (req, res) => {
//   res.send(`<h1>This is backend page</h1>`);
// });

// app.get("*", (req, res) => {
//   console.log(req.path);
//   res.send(req.path);
//
// });

// Serve HTML files for GET requests
// app.get('*', (req, res) => {
//   const requestedUrl = req.url;
//   if (requestedUrl.startsWith('/views/')) {
//     res.sendFile(path.join(__dirname, requestedUrl, ".html")); //todo: View HTML
//   } else {
//     res.sendFile(path.join(__dirname, 'public', requestedUrl)); //todo: CSS, JS, IMG, VID
//   }
// });

db.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("server is running at 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
