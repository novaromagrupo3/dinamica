const Blog = require("../models/blog");
const useBlogRepository = require("../repositories/BlogRepository");

const blogRepository = useBlogRepository();

function BlogController() {
  async function show(request, response) {
    try {
      const posts = await blogRepository.find(request.params.id);

      if (!posts) {
        return response.status(404).send({
          message: "Posts não encontrados",
        });
      }

      response.status(200).json(posts);
    } catch (error) {
      response.status(500).json({
        message: "Posts não encontrados",
      });
    }
  }

  function list(req, res) {
    Blog.findAll({ raw: true })
      .then((data) => {
        res.render("blog/list", {
          title: "Lista dos posts",
          posts: data,
        });
      })
      .catch((err) => console.log(err));
  }

  function create(req, res) {
    res.render("blog/create");
  }

  async function save(req, res) {
    const body = req.body;

    const post = {
      title: body.title,
      textPost: body.textPost,
      createdAt: Date.now(),
      postedAt: Date.now(),
    };

    try {
      await Blog.create(post);
      res.redirect("/blog");
    } catch (error) {
      console.log(error);
    }
  }

  async function remove(req, res) {
    await blogRepository.remove(req.params.id);
    res.redirect("/blog");
  }

  function edit(req, res) {
    const id = req.params.id;

    Blog.findOne({ where: { id: id }, raw: true })
      .then((data) => {
        res.render('blog/edit', { post: data });
      })
      .catch((err) => console.log(err));
  }

  function update(req, res) {
    console.log(req.body);
    const id = req.body.id;

    const post = {
      title: req.body.title,
      textPost: req.body.textPost,
    };

    Blog.update(post, { where: { id: id } })
      .then(() => res.redirect('/blog'))
      .catch((err) => console.log(err));
  }

  //   async function updateStatus(req, res) {
  //     const done = req.body.done === '0' ? true : false;

  //     await blogRepository.updateStatus(req.params.id, done);
  //     res.redirect('/blog');
  //   }

  return {
    create,
    save,
    list,
    remove,
    edit,
    update,
    show,
  };
}

module.exports = BlogController();
