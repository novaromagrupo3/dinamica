const Blog = require('../models/blog');

function useBlogRepository() {

  async function list() {
    const posts = await Blog.findAll({ raw: true });
    return posts;
  }

  async function find(id) {
    const post = await Blog.findByPk(id);
    return post;
  }

  async function save(dados) {
    const post = {
      title: dados.title,
      textPost: dados.textPost,
      postedAt: Date.now(),
      createdAt: Date.now()
    }
    const post_created = await Blog.create(post);
    return post_created;
  }

  async function update(id, dados) {

    const post = {
        title: dados.title,
        textPost: dados.textPost,
    }

    const post_updated = await Blog.update(post, { where: { id: id } });
    return post_updated;
  }

  async function remove(id) {
    await Blog.destroy({ where: { id: id } });
  }

//   function updateStatus(id, status) {
//     const task = {
//       done: status,
//     }

//  	  const task_updated = Task.update(task, { where: { id: id } });
//     return task_updated;
//   }

  return {
    list,
    find,
    save,
    remove,
    update,
  }

}

module.exports = useBlogRepository;
