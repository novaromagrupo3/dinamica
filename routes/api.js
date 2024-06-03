const express = require("express");
const router = express.Router();

const TasksController = require("../app/controllers/api/TasksController");
const UsersController = require("../app/controllers/api/UsersController");
const BlogController = require("../app/controllers/BlogController");

// Rotas das Tarefas
router.get('/tasks', TasksController.list)
router.get('/tasks/:id', TasksController.show)
router.post('/tasks', TasksController.save)
router.delete('/tasks/:id', TasksController.remove)
router.put('/tasks/:id', TasksController.update)
router.put('/tasks/:id/update-status', TasksController.updateStatus)


router.get('/users', UsersController.list)
router.post('/users/login', UsersController.login)
router.get('/users/:id', TasksController.show)
router.post('/users', UsersController.save)
router.delete('/users/:id', UsersController.remove)
// router.put('/users/:id', UsersController.update)

router.get('/blog', BlogController.list)
router.get('/blog/:id', BlogController.show)
router.post('/blog', BlogController.save)
router.delete('/blog/:id', BlogController.remove)
router.put('/blog/:id', TasksController.update)

router.get('*', function notFound(request, response) {
  return response.status(404).json({ message: 'Página não encontrada' });
});

module.exports = router;