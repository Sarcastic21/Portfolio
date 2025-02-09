import React, { useState, useEffect } from "react";
import "../styles/sections.css";
import { Link } from "react-router-dom";  // Import Link from React Router

function AdminPage() {
  // State for handling form input and login state
  const [form, setForm] = useState({ name: "", description: "", link: "", image: "" });
  const [contacts, setContacts] = useState([]); // State to hold contacts data
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [username, setUsername] = useState(""); // Username input state
  const [password, setPassword] = useState(""); // Password input state
  const [loginError, setLoginError] = useState(""); // Track login error message
// Access environment variables
const API_URL = process.env.REACT_APP_API_URL;
const ADMIN_USERNAME = process.env.REACT_APP_USERNAME;
const ADMIN_PASSWORD = process.env.REACT_APP_PASSWORD;

const handleSubmit = (e) => {
  e.preventDefault();
  fetch(`${API_URL}/api/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  })
    .then((res) => res.json())
    .then(() => alert("Project Added!"));
};

// Fetch contacts when the component is mounted
useEffect(() => {
  if (isLoggedIn) {
    fetch(`${API_URL}/api/contacts`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched contacts:", data); // Log data
        setContacts(data); // Store the contact data
      })
      .catch((err) => console.error("Error fetching contacts:", err));
  }
}, [isLoggedIn, API_URL]); // Include API_URL in the dependency array

// Handle login
const handleLogin = (e) => {
  e.preventDefault();
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    setIsLoggedIn(true);
    setLoginError(""); // Clear any previous error
  } else {
    setLoginError("Invalid username or password");
  }
};


  // Render login form or the Admin Page based on login status
  return (
    <>
        <div className="body">

    <nav className="navbar">
      <Link to="/">
        <button className="nav-btn">Home</button>
      </Link>
      <Link to="/">
        <button className="nav-btn">About</button>
      </Link>
      <Link to="/">
        <button className="nav-btn">Skills</button>
      </Link>
      <Link to="/">
        <button className="nav-btn">Contact</button>
      </Link>
    </nav>
    <div className="admin">
      {!isLoggedIn ? (
        // Login Form
        <div className="login">
          <h2 className="tittle">Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {loginError && <p className="error">{loginError}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        // Admin Page Content
        <div>
          <h2 className="tittle">Admin Page</h2>

          {/* Project Form Section */}
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Project Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            ></textarea>
            <input
              type="url"
              placeholder="Link"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              required
            />
            <input
              type="url"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              required
            />
            <button type="submit">Add Project</button>
          </form>

          {/* Contacts Section */}
          <h3 className="tittle">All Contacts</h3>
          <ul className="ul">
            {contacts.map((contact, index) => (
              <li key={index}>
                <p className="p">Name: {contact.name}</p>
                <p className="p">Email: {contact.email}</p>
                <p className="p">Mobile: {contact.mobile}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
    </>
  );
}

export default AdminPage;
