import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {

  const [experts, setExperts] = useState([]);

  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");

  const [search, setSearch] = useState("");

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API = "http://localhost:5000/api";

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    const res = await axios.get(`${API}/experts`);
    setExperts(res.data);
  };

  const addExpert = async () => {

    if (!name || !skill || !location) {
      alert("Fill all fields");
      return;
    }

    await axios.post(`${API}/experts`, {
      name,
      skill,
      location
    });

    fetchExperts();

    setName("");
    setSkill("");
    setLocation("");
  };

  const deleteExpert = async (id) => {
    await axios.delete(`${API}/experts/${id}`);
    fetchExperts();
  };

  const signup = async () => {

    if (!email.includes("@")) {
      alert("Invalid Email");
      return;
    }

    if (password.length < 6) {
      alert("Password minimum 6 characters");
      return;
    }

    await axios.post(`${API}/auth/signup`, {
      name,
      email,
      password
    });

    alert("Signup Successful");
    setShowSignup(false);
  };

  const login = async () => {

    if (!email.includes("@")) {
      alert("Invalid Email");
      return;
    }

    const res = await axios.post(`${API}/auth/login`, {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);

    alert("Login Successful");

    setShowLogin(false);
  };

  const filteredExperts = experts.filter((e) =>
    e.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">

      <header>

        <h1>HirePoint</h1>

        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#footer">Contact</a>
        </nav>

        <div>
          <button
            className="loginBtn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>

          <button
            className="signupBtn"
            onClick={() => setShowSignup(true)}
          >
            Signup
          </button>
        </div>

      </header>

      <section className="hero" id="home">

        <h2>Find Skilled Experts Near You</h2>

        <p>
          HirePoint connects clients with talented
          professionals quickly and securely.
        </p>

      </section>

      <section className="about" id="about">

        <h2>About HirePoint</h2>

        <p>
          HirePoint is a smart freelance hiring platform
          for finding developers, editors, designers and more.
        </p>

      </section>

      <section className="features" id="features">

        <h2>Features</h2>

        <div className="cards">

          <div className="card">
            <h3>Smart Search</h3>
          </div>

          <div className="card">
            <h3>Secure Hiring</h3>
          </div>

          <div className="card">
            <h3>Live Chat</h3>
          </div>

          <div className="card">
            <h3>Project Tracking</h3>
          </div>

        </div>

      </section>

      <section className="expertSection">

        <h2>Add Expert</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={addExpert}>
          Add Expert
        </button>

      </section>

      <section className="searchSection">

        <h2>Search Experts by Location</h2>

        <input
          placeholder="Search Location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </section>

      <section className="expertList">

        {
          filteredExperts.length === 0
          ? <p>No Experts Found</p>
          : filteredExperts.map((e) => (

            <div className="expertCard" key={e._id}>

              <h3>{e.name}</h3>

              <p>{e.skill}</p>

              <p>{e.location}</p>

              <button onClick={() => deleteExpert(e._id)}>
                Delete
              </button>

            </div>
          ))
        }

      </section>

      {
        showLogin && (
          <div className="modal">

            <div className="form">

              <h2>Login</h2>

              <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button onClick={login}>
                Login
              </button>

            </div>

          </div>
        )
      }

      {
        showSignup && (
          <div className="modal">

            <div className="form">

              <h2>Signup</h2>

              <input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />

              <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button onClick={signup}>
                Signup
              </button>

            </div>

          </div>
        )
      }

      <footer id="footer">

        <h2>HirePoint</h2>

        <p>Your Professional Hiring Platform</p>

      </footer>

    </div>
  );
}

export default App;