import express from "express";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import * as users from "./userRoutes.mjs";
import * as cards from "./cardRoutes.mjs";
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
const port = 8000;
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 600000,
    },
  })
);
function sessionChecked(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(403).send({
      message: "not authorized",
    });
  }
}
function adminChecked(req, res, next) {
  if (req.session.user.role === "ADMIN") {
    next();
  } else {
    res.status(403).send({
      message: "not an admin",
    });
  }
}

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to my final project</h1>`);
});

app.get("/users", sessionChecked, adminChecked, users.getAll);

app.post("/users/register", users.register);

app.post("/users/login", users.login);

app.put("/users/:id", sessionChecked, adminChecked, users.update)

app.delete("/users/:id", sessionChecked, adminChecked, users.del);

app.get("/cards", sessionChecked, cards.getAll);

app.post("/cards/create", sessionChecked, cards.create);

app.put("/cards/:id", sessionChecked, adminChecked, cards.update);

app.delete("/cards/:id", sessionChecked, adminChecked, cards.del);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
