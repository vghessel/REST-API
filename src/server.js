const express = require("express");
const usersRoutes = require("./routes");

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("route: /api/v1/users")
});

app.use("/api/v1/users", usersRoutes);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});