const db = require("../models");
const Post = db.posts;
console.log(Post)

// Create and Save a new Post
exports.create = (req, res) => {
    // Validate request
    if (!req.body.titulo || !req.body.titulo) {
        res.status(400).send({
            message: "Titulo y contenidos son obligatorios"
        });
        return;
    }

    if (req.body.imagen) {

        let imgType = (req.body.imagen).split('.')[(req.body.imagen).split('.').length - 1]
        if (imgType !== 'png' && imgType !== 'jpg') {
            res.status(400).send({
                message: "Si pones imagen, debe ser jpg o png"
            });
            return;
        }
    }

    // Create a Post
    const post = {
        titulo: req.body.titulo,
        contenido: req.body.contenido,
        categoria: req.body.categoria,
        imagen: req.body.imagen,
    };

    // Save Post in the database
    Post.create(post)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {

    Post.findAll({

        // Add order conditions here....
        order: [
            ['createdAt', 'DESC'],

        ],
        attributes: ['id', 'titulo', 'imagen', 'categoria', 'createdAt']
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts."
            });
        });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Post.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: 'Id Not Found',
                });
            } else {

                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Post with id=" + id
            });
        });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Post.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Post with id=" + id
            });
        });
};


// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Post.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Post with id=" + id
            });
        });
};
