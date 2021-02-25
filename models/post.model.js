module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        ID: Sequelize.INTEGER,
        titulo: Sequelize.STRING,
        contenido: Sequelize.TEXT,
        imagen: Sequelize.STRING,
        categoria: Sequelize.STRING
    });

    return Post;
};