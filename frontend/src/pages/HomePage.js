import React, { useState,useEffect } from "react";
import "../styles/Home.css";
import { FaBars } from "react-icons/fa";  // Importing the Hamburger Icon
import img1 from "./Certificate1.png"
import img2 from "./Certificate2.png"

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [sectionContent, setSectionContent] = useState("about");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (img) => {
    setSelectedImage(img); // Set the clicked image as the selected image
  };

  const closeModal = () => {
    setSelectedImage(null); // Close the modal by setting the selected image to null
  };
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // Handle contact form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      const result = await response.json();
      setMessage(result.message);
      setContactForm({ name: "", email: "", mobile: "" });
    } catch (error) {
      setMessage("Failed to submit contact information.");
    }
  };
  // Show About Content
  function showAbout() {
    setSectionContent("about");
  }

  // Show Education Content
  function showEducation() {
    setSectionContent("education");
  }

  // Scroll to section
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false); // Close the mobile menu after clicking
  };


  return (
    <>
      <nav className="navbar">
        {/* Hamburger Icon */}
        <div className="hamburger-icon" onClick={handleMenuToggle}>
          <FaBars />
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <button className="nav-btn" onClick={() => scrollToSection("home")}>
            Home
          </button>
          <button className="nav-btn" onClick={() => scrollToSection("about")}>
            About
          </button>
          <button className="nav-btn" onClick={() => scrollToSection("skills")}>
            Skills
          </button>
          <button className="nav-btn" onClick={() => scrollToSection("contact")}>
            Contact
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="mobile-menu">
            <button
              className="mobile-nav-btn"
              onClick={() => scrollToSection("home")}
            >
              Home
            </button>
            <button
              className="mobile-nav-btn"
              onClick={() => scrollToSection("about")}
            >
              About
            </button>
            <button
              className="mobile-nav-btn"
              onClick={() => scrollToSection("skills")}
            >
              Skills
            </button>
            <button
              className="mobile-nav-btn"
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-image">
          <img
            src="https://img.freepik.com/premium-photo/anime-boy-captivating-character-illustration_974154-1535.jpg?w=2000"
            alt="Profile"
            className="profile-image"
          />
        </div>
        <div className="hero-text">
  <h1 className="hero-title">
    Hi, I am <span>Ayush</span> Maurya
  </h1>
  <p className="hero-subtitle">Web Developer and UI/UX Designer</p>
  
  {/* Social Links */}
  <div className="social-links">
    <a href="https://www.linkedin.com/in/ayush-maurya-219611342" target="_blank" rel="noopener noreferrer">
      <img src="https://imgs.search.brave.com/iGQSJlGewUe5iDIy6aga0Dgqn-JL0RFJpUkb2RyRw5w/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bG9nb2pveS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjQw/NjA3MTExODA2L2xp/bmtlZGluLWxvZ28t/bW9ub2dyYW0tNjAw/eDQ1MC5qcGc" alt="LinkedIn" className="social-icon" />
    </a>
    <a href="https://leetcode.com/u/Ayushmaurya21" target="_blank" rel="noopener noreferrer">
      <img src="https://imgs.search.brave.com/kJptFW-S1iOjZGFk_giKuuiVvzCCqE-xXGbppkdfqis/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5wbmdhYWEuY29t/LzExOC80ODY4MTE4/LW1pZGRsZS5wbmc" alt="LeetCode" className="social-icon" />
    </a>
    <a href="https://github.com/Sarcastic21" target="_blank" rel="noopener noreferrer">
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" className="social-icon" />
    </a>
  </div>
</div>

      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="c1">
          <div className="about-header">
            <h2 className="section-title-about ">About Me</h2>
            <div className="buttons">
              <button className="about-btn" onClick={showAbout}>
                About
              </button>
              <button className="education-btn" onClick={showEducation}>
                Education
              </button>
            </div>
          </div>
          <div
            id="about-content"
            className="content"
            style={{ display: sectionContent === "about" ? "block" : "none" }}
          >
            <p className="about-text">
I’m Ayush Maurya, a passionate Web Developer and UI/UX Designer dedicated to creating visually appealing and user-friendly digital experiences. I specialize in modern technologies like React, Node.js, and MongoDB, building responsive and interactive web applications. My expertise lies in bridging the gap between design and development, ensuring seamless user engagement. I thrive on solving challenges, staying updated with tech trends, and delivering impactful solutions. Let’s collaborate to craft something exceptional!            </p>
          </div>
          <div
            id="education-content"
            className="content"
            style={{ display: sectionContent === "education" ? "block" : "none" }}
          >
            <p className="education-text">
              B.Tech Computer science engineering (3rd year)
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <h2 className="section-title">Skills</h2>
        <div className="skills-container">
          {[
            { name: "HTML", img: "https://cdn.dribbble.com/users/2982/screenshots/105527/shot_1296040109.png" },
            { name: "CSS", img: "https://th.bing.com/th/id/OIP.RklvgkuEAcRqupax_MC1qQAAAA?w=300&h=271&rs=1&pid=ImgDetMain" },
            { name: "JavaScript", img: "https://th.bing.com/th/id/OIP.m-Z2Pc9DMt0fnsCADX6DagAAAA?w=280&h=300&rs=1&pid=ImgDetMain" },
            { name: "React.js", img: "https://ih1.redbubble.net/image.2351387142.5830/st,small,507x507-pad,600x600,f8f8f8.jpg" },
            { name: "Node.js", img: "https://thehexaa.com/wp-content/uploads/2022/11/node-1-2.png" },
            { name: "Express.js", img: "https://th.bing.com/th/id/OIP.kWjlVmtJwamnqej56UsYpQAAAA?w=171&h=203&rs=1&pid=ImgDetMain" },
            { name: "MongoDB", img: "https://th.bing.com/th/id/OIP.xtD_sNuNBncu_e88bWBh9gAAAA?rs=1&pid=ImgDetMain" },
            { name: "Figma", img: "https://th.bing.com/th/id/OIP.7MQzWpx6o8_rMI3o4ugHTwAAAA?w=200&h=300&rs=1&pid=ImgDetMain" },
          ].map((skill, index) => (
            <div key={index} className="skill-card">
              <img src={skill.img} alt={skill.name} className="skill-image" />
              <p className="skill-name">{skill.name}</p>
            </div>
          ))}
        </div>
      </section>



      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="c2">
          <h2 className="section-title-project">Projects</h2>
          <div className="projects-container">
            {projects.map((project) => (
              <div key={project._id} className="project-card">
                <img
                  src={project.image}
                  alt={project.name}
                  className="project-image"
                />
                <h3 className="project-title">{project.name}</h3>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Project
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="skills">
      <h2 className="section-title-certificates">My Certificates</h2>
      <div className="skills-container">
        {[
          { name: "Mern", img: img1 },
          { name: "Computer Network", img: img2 },
        ].map((skill, index) => (
          <div key={index} className="skill-card">
            <img
              src={skill.img}
              alt={skill.name}
              className="skill-image"
              onClick={() => handleImageClick(skill.img)} // Set the image to open in fullscreen
            />
            <p className="skill-name">{skill.name}</p>
          </div>
        ))}
      </div>

      {/* Modal for Fullscreen Image */}
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img src={selectedImage} alt="Fullscreen Certificate" className="fullscreen-image" />
          </div>
        </div>
      )}
    </section> 

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2 className="section-title-contact">Contact</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={contactForm.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="form-input"
            required
          />
          <input
            type="email"
            name="email"
            value={contactForm.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form-input"
            required
          />
          <input
            type="tel"
            name="mobile"
            value={contactForm.mobile}
            onChange={handleInputChange}
            placeholder="Mobile No"
            className="form-input"
            required
          />
          <button type="submit" className="form-submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
      </section>
    </>
  );
}

export default HomePage;
