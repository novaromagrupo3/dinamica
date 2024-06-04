const User = require('../models/User');
const bcrypt = require('bcrypt');

function UserController() {

  function list(req, res) {
    User.findAll({ raw: true })
      .then((data) => {
        res.render('users/list', { 
          title: "Lista de Tarefas",
          users: data, 
        });
      })
      .catch((err) => console.log(err));
  }

  function create(req, res) {
    res.render('users/create');
  }

  async function save(req, res) {
    const body = req.body;
    
    if ((body.password != body.password_confirmation) || (body.password.length < 1 && body.password_confirmation.length < 1)) {
      res.render('users/create', {
        error: {
          message: 'Os campos senha e confirmar senha são diferentes.'
        }
      });
    } else {
      const hashed_password = await bcrypt.hash(req.body.password, 10);

      const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashed_password,
        active: req.body.active === '1' ? true : false,  // Adicionando o campo active
      }

      try {
        await User.create(user);
        res.redirect('/users');
      } catch (error) {
        console.log(error);      
      }
    }
  }

  function remove(req, res) {
    const id = req.params.id;

    User.destroy({ where: { id: id } })
      .then(() => res.redirect('/users'))
      .catch((err) => console.log(err));
  }

  function edit(req, res) {
    const id = req.params.id;

    User.findOne({ where: { id: id }, raw: true })
      .then((data) => {
        res.render('users/edit', { user: data });
      })
      .catch((err) => console.log(err));
  }

  function update(req, res) {
    console.log(req.body);
    const id = req.body.id;

    const user = {
      name: req.body.name,
      email: req.body.email,
      active: req.body.active === '1' ? true : false  // Processando o campo active
    };

    User.update(user, { where: { id: id } })
      .then(() => res.redirect('/users'))
      .catch((err) => console.log(err));
  }

  function updateStatus(req, res) {
    const id = req.params.id;

    User.findOne({ where: { id: id } })
        .then((user) => {
            if (user) {
                // Toggle the active status
                user.active = !user.active;
                return user.save();
            } else {
                res.status(404).send('User not found');
            }
        })
        .then(() => {
            res.redirect('/users');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
  }

  return {
    create,
    save,
    list,
    remove,
    edit,
    update,
    updateStatus,
  };

}

module.exports = UserController();
