const Users = require("../models/userModel");

//getbyEmail
const findUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (user.password === password) {
      return res.status(200).json(user);
    } else {
      return res.status(404).send(`password incorrect`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(`No user exsits`, error);
  }
};

//create
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await Users.create({
      name: name,
      email: email,
      password: password,
    });

    res.status(201).send(`user signed up successfully`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`make sure to use unique email id`);
  }
};

module.exports={
    findUser,
    createUser
}
