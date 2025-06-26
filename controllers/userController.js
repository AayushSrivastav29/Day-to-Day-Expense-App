const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

//getbyEmail
const findUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: {
        email: email,
      },
    });
    bcrypt.compare(password, user.password, function (err, result) {
      // result == true
      if (err) {
        return res.status(401).send(`password incorrect`); 
        
      }
      if (result) {
        return res.status(200).send("User logged in"); 
      }
    });

  } catch (error) {
    console.log(error);
    res.status(404).send(`No user exsits`, error);
  }
};

//create
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      // Store hash in your password DB.
      console.log("err in pasword hashing", err);
      await Users.create({
        name: name,
        email: email,
        password: hash,
      });
      res.status(201).send(`user signed up successfully`);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(`make sure to use unique email id`);
  }
};

module.exports = {
  findUser,
  createUser,
};
