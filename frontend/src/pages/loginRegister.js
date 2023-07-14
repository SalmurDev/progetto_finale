import { useState } from "react";
import api from "./services/apis";

export default function LoginRegister() {
  const [selected, setSelected] = useState(true);

  function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [redName, setRedName] = useState(false);
    const [redMail, setRedMail] = useState(false);
    const [redPass, setRedPass] = useState(false);
    const [redPass2, setRedPass2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPass, setShowPass] = useState("password");
    const [showPass2, setShowPass2] = useState("password");
    async function postLogin(email, password) {
      if (name === "") {
        setRedName(true);
      } else setRedName(false);
      if (email === "") {
        setRedMail(true);
      } else setRedMail(false);
      if (password === "") {
        setRedPass(true);
      } else setRedPass(false);
      if (confirmPassword === "") {
        setRedPass2(true);
      } else setRedPass2(false);
      if (password !== confirmPassword) {
        alert("passwords do not match");
        setRedPass(true);
        setRedPass2(true);
        return;
      }
      if (name && email && password) {
        setIsLoading(true);
        try {
          const body = {
            name: name,
            email: email,
            password: password,
          };
          console.log(body);
          const result = await api.post("/users/register", body);

          if (result.status === 200) {
            alert("successfully registered!");
            console.log(result.data);
          } else alert("something went wrong, please try again");
        } catch (error) {
          alert("register error");
        }
        setIsLoading(false);
      }
    }

    function Loader() {
      return (
        <div className="">
          <div className="loader"></div>
        </div>
      );
    }

    function show(){
      let type = showPass
      if(type === "password"){
        setShowPass("text")
      }else setShowPass("password")
    }
    function show2(){
      let type = showPass2
      if(type === "password"){
        setShowPass2("text")
      }else setShowPass2("password")
    }

    return (
      <>
        <div className="input">
          <label>Name</label>
          <input
            type="text"
            placeholder="insert name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={redName ? "redInput" : ""}
          ></input>
        </div>
        <div className="input">
          <label>Email</label>
          <input
            type="text"
            placeholder="insert email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={redMail ? "redInput" : ""}
          ></input>
        </div>
        <div className="registerPass">
          <label>Password</label>
          <input
            type={showPass}
            placeholder="insert password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={redPass ? "redInput" : ""}
          ></input>
          <div className="flex">
            <input
              type="checkbox"
              onClick={show}
            ></input>
            <div className="m-1 text-xs">Show Password</div>
          </div>
        </div>
        <div className="registerPass">
          <label>Confirm password</label>
          <input
            type={showPass2}
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={redPass2 ? "redInput" : ""}
          ></input>
          <div className="flex">
            <input
              type="checkbox"
              onClick={show2}
            ></input>
            <div className="m-1 text-xs">Show Password</div>
          </div>
        </div>
        <button className="m-5" onClick={() => postLogin(email, password)}>
          REGISTER
        </button>
        {isLoading && <Loader></Loader>}
      </>
    );
  }

  function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [redName, setRedName] = useState(false);
    const [redPass, setRedPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    async function postLogin(email, password) {
      if (email === "") {
        setRedName(true);
      } else setRedName(false);
      if (password === "") {
        setRedPass(true);
      } else setRedPass(false);
      if (email && password) {
        setIsLoading(true);
        try {
          const result = await api.post("/users/login", {
            name: name,
            password: password,
          });
          setIsLoading(false);
          if (result.status === 200) {
            alert(`welcome ${name}`);
            window.location.replace("http://localhost:3000");
          } else alert("incorrect credentials, please try again");
        } catch (error) {
          alert("login error");
        }
        setIsLoading(false);
      }
    }

    function Loader() {
      return (
        <div className="">
          <div className="loader"></div>
        </div>
      );
    }

    return (
      <>
        <div className="input">
          <label>Name</label>
          <input
            type="text"
            placeholder="insert name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setRedName(false);
            }}
            className={redName ? "redInput" : ""}
          ></input>
        </div>
        <div className="input">
          <label>Password</label>
          <input
            type="password"
            placeholder="insert password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setRedPass(false);
            }}
            className={redPass ? "redInput" : ""}
          ></input>
        </div>
        <button className="m-5" onClick={() => postLogin(name, password)}>
          LOG IN
        </button>
        {isLoading && <Loader></Loader>}
      </>
    );
  }

  return (
    <div className="loginPage">
      <div className="form">
        <div className="flex">
          <section
            className={selected ? "selector" : "selector grey"}
            onClick={() => {
              !selected && setSelected(true);
            }}
          >
            <p>Log in</p>
          </section>
          <section
            className={!selected ? "selector" : "selector grey"}
            onClick={() => {
              selected && setSelected(false);
            }}
          >
            <p>Register</p>
          </section>
        </div>
        {selected ? <Login /> : <Register />}
      </div>
    </div>
  );
}
