const express = require("express");

const app = express();
const PORT = 3000;

let users = [];

app.use(express.json());

// Serve your HTML/CSS/JS
app.use(express.static(__dirname));

app.post("/register", (req, res) => {
    console.log("Received:", req.body);

    users.push(req.body);

    res.json({
        message: "Registration successful"
    });
});

app.post("/login", (req, res) => {

    const { username, password } = req.body;

    const user = users.find(
        u =>
            u.username === username &&
            u.password === password
    );

    if (user) {
        res.json({ message: "Success" });
    } else {
        res.status(401).json({
            message: "Invalid login"
        });
    }
});

app.get("/users", (req, res) => {

    console.log("Sending users:", users);

    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});