const express = require("express");
const sequelize = require('./database');
const User = require('./User');

sequelize.sync({  }).then(() => console.log('db is ready'));

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({
  type: "*/*" // optional, only if you want to be sure that everything is parsed as JSON. Wouldn't recommend
}));

app.post('/users', async (req, res) => {
  await User.create(req.body);
  res.send("success");
})

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.send(users);
})

app.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({where: {id: id}});
  res.send(user);
})

app.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({where: {id: id}});
  user.username = req.body.username;
  await user.save();
  res.send('updated');
})

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  await User.destroy({where: {id: id}});
  res.send('removed');
})

app.listen(3002, () => {
  console.log("app is running");
});
