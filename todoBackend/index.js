const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(require("./routes/todo.route"));


mongoose
  .connect(
    "mongodb+srv://intocode:Ma16pagava@cluster0.l1vle.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Успешно соединились с сервером MongoDB"))
  .catch(() => console.log("Ошибка при соединении с сервером MongoDB"));

const port = 4000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
