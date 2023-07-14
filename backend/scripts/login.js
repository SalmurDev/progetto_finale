import axios from "axios";

async function login() {
  let res = await axios.post("http://localhost:8000/users/login", {
    name: "Salmur",
    password: "salmurrrr"
  });
  console.log(res.status, res.data)
}
login()