const pool = require("./db");
const queries = require("./queries");

// GET
const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

// POST
const addUser = (req, res) => {
    const { username, identifier, firstname, lastname } = req.body;
    // check if username already exists
    pool.query(queries.checkUsernameExists, [username], (error, results) => {
        if(results.rows.length) {
            res.send("Username already exists.");
        }else {
        // add user to db
        pool.query(queries.addUser, [username, identifier, firstname, lastname], (error, results) => {
            if (error) throw error;
            res.status(201).send("User Created Successfully!");
        })};
    });
};

// PUT
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { username } = req.body;
    // check if the id exists
    pool.query(queries.getUserById, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if (noUserFound) {
            res.send("User does not exist, could not update.");
        }
        // update user
        pool.query(queries.updateUser, [username, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("User Updated Successfully!");
        });
    });

};

// DELETE
const removeUser = (req, res) => {
    const id = parseInt(req.params.id);
    // check if the id exists
    pool.query(queries.getUserById, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if (noUserFound) {
            res.send("User does not exist, could not remove.");
        }
        // delete user
        pool.query(queries.removeUser, [id], (error, results) => {
            if (error) throw error;
            res.status("200").send("User Deleted Succesfully.");
        });
    });
};


module.exports = {
    getUsers,
    getUserById,
    addUser,
    removeUser,
    updateUser,
};