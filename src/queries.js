const getUsers = "SELECT * FROM Users";
const getUserById = "SELECT * FROM Users WHERE id = $1";
const checkUsernameExists = "SELECT s FROM Users s WHERE s.username = $1";
const addUser = "INSERT INTO Users (username, identifier, firstname, lastname) VALUES ($1, $2, $3, $4)";
const removeUser = "DELETE FROM Users WHERE id = $1";
const updateUser = "UPDATE Users SET username = $1 WHERE id = $2";

module.exports = {
    getUsers,
    getUserById,
    checkUsernameExists,
    addUser,
    removeUser,
    updateUser,
};