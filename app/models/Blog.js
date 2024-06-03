const { DataTypes } = require('sequelize')
const { sequelize } = require('../core/sequelize');

const Blog = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  textPost: {
    type: DataTypes.TEXT,
  },
  postedAt: {
    type: DataTypes.DATE,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
})

module.exports = Blog
