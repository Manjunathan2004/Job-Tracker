import { useState } from "react";
import {
  ArrowDown, ArrowUpRight, BriefcaseBusiness, Code2, Database, GraduationCap,
  Mail, MapPin, Menu, Phone, Send, Sparkles, X, Github, Linkedin, ExternalLink,
  BarChart3, ShoppingCart, Bot, CheckCircle2
} from "lucide-react";
import "./App.css";

const skills = [
  { title: "Programming", items: ["Java", "Python", "JavaScript"] },
  { title: "Frontend", items: ["HTML5", "CSS3", "React.js", "Bootstrap"] },
  { title: "Backend", items: ["Spring Boot", "REST APIs", "Node.js", "Express.js"] },
  { title: "Database & Tools", items: ["MySQL", "SQL", "Git", "GitHub", "Linux"] },
  { title: "Professional", items: ["Problem Solving", "Teamwork", "Leadership", "Time Management"] }
];

const projects = [
  {
    number: "01", icon: BarChart3, type: "DATA ANALYTICS", title: "Car Sales Analysis",
    description: "Explored car sales data to discover sales trends, customer preferences, and business performance.",
    points: ["Cleaned and preprocessed data for analysis", "Performed exploratory data analysis (EDA)", "Built charts and visual reports to support data-driven decisions"],
    stack: ["Python", "Pandas", "Data Visualization"]
  },
  {
    number: "02", icon: ShoppingCart, type: "FULL STACK DEVELOPMENT", title: "Online Shopping Website",
    description: "A responsive shopping application concept with core e-commerce flows and database connectivity.",
    points: ["User registration and login authentication", "Product catalogue, shopping cart, and order management", "Connected application data to a MySQL database"],
    stack: ["Java", "Spring Boot", "MySQL", "HTML", "CSS"]
  },
  {
    number: "03", icon: Bot, type: "ROBOTIC PROCESS AUTOMATION", title: "RPA Voice Bot",
    description: "A voice assistant concept designed to welcome visitors and speak website or department information.",
    points: ["Automated spoken welcome messages", "Used text-to-speech to announce information", "Designed the flow to avoid repeated announcements"],
    stack: ["Automation Anywhere", "VBScript", "Text-to-Speech"]
  }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  const navigate = () => setMenuOpen(false);
  const updateForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submitContact(e) {
    e.preventDefault();
    setSending(true);
    setStatus({ type: "", text: "" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not send message.");
      setStatus({ type: "success", text: "Thanks! Your message was received by the portfolio server." });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", text: error.message || "Server unavailable. Please try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#home" onClick={navigate}><span className="brand-mark">M</span><span>Manjunathan<span className="brand-dot">.</span></span></a>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          {[["About", "#about"], ["Skills", "#skills"], ["Projects", "#projects"], ["Education", "#education"], ["Contact", "#contact"]].map(([label, href]) =>
            <a key={label} href={href} onClick={navigate}>{label}</a>
          )}
          <a className="nav-cta" href="#contact" onClick={navigate}>Let's talk <ArrowUpRight size={16} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> AVAILABLE FOR OPPORTUNITIES</div>
            <h1>Hi, I'm <span>Manjunathan S.</span><br />I build for the web.</h1>
            <p className="hero-role">Java Full Stack Web Developer</p>
            <p className="hero-description">A motivated Computer Science professional who enjoys turning ideas into clean, responsive web experiences — from frontend interfaces to backend APIs and databases.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <ArrowUpRight size={17} /></a>
              <a className="button button-outline" href="#contact">Get in touch <Mail size={17} /></a>
            </div>
            <div className="hero-socials">
              <a href="https://github.com/" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ExternalLink size={12} /></a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ExternalLink size={12} /></a>
            </div>
          </div>
          <div className="hero-art" aria-label="Developer profile illustration">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="code-card">
              <div className="code-card-top"><span></span><span></span><span></span><small>developer.java</small></div>
              <div className="code-lines">
                <p><span className="code-purple">public class</span> <span className="code-blue">Developer</span> {"{"}</p>
                <p className="indent"><span className="code-purple">String</span> name = <span className="code-green">"Manjunathan"</span>;</p>
                <p className="indent"><span className="code-purple">String</span> role = <span className="code-green">"Full Stack"</span>;</p>
                <p className="indent"><span className="code-purple">boolean</span> learning = <span className="code-orange">true</span>;</p>
                <p>{"}"}</p>
              </div>
              <div className="code-card-footer"><Code2 size={15} /> Building useful things, one line at a time</div>
            </div>
            <div className="floating-chip chip-java"><span className="chip-icon">☕</span> Java</div>
            <div className="floating-chip chip-react"><Code2 size={18} /> React</div>
            <div className="floating-chip chip-db"><Database size={17} /> MySQL</div>
            <div className="hero-glow" />
          </div>
          <a className="scroll-cue" href="#about"><ArrowDown size={15} /> SCROLL TO EXPLORE</a>
        </section>

        <section className="section-wrap about-section" id="about">
          <div className="section-heading"><span className="section-index">01 / ABOUT</span><h2>A little about me<span>.</span></h2></div>
          <div className="about-grid">
            <div className="about-lead"><Sparkles className="sparkle" size={25} /><h3>Curious by nature.<br />Developer by choice.</h3></div>
            <div className="about-body"><p>I'm a B.Tech Information Technology student at Mohammed Sathak A.J. College of Engineering, interested in building reliable and user-friendly applications. I enjoy learning new technologies, solving problems, and connecting the pieces between a great user interface and a dependable backend.</p><p>My learning spans Java, Spring Boot, SQL, React, and data analysis. I'm looking for opportunities where I can contribute, learn from a team, and keep growing as a developer.</p><div className="quick-facts"><div><strong>08</strong><span>CGPA (as listed)</span></div><div><strong>03+</strong><span>Project concepts</span></div><div><strong>Full stack</strong><span>Career focus</span></div></div></div>
          </div>
        </section>

        <section className="skills-section" id="skills"><div className="section-wrap">
          <div className="section-heading"><span className="section-index">02 / SKILLS</span><h2>Tools in my toolkit<span>.</span></h2><p>Technologies and strengths I'm developing through projects and practice.</p></div>
          <div className="skills-grid">{skills.map((group, i) => <article className="skill-card" key={group.title}><div className="skill-card-head"><span className="skill-number">0{i + 1}</span><h3>{group.title}</h3></div><div className="skill-tags">{group.items.map(item => <span key={item}>{item}</span>)}</div></article>)}</div>
        </div></section>

        <section className="section-wrap projects-section" id="projects">
          <div className="section-heading heading-row"><div><span className="section-index">03 / SELECTED WORK</span><h2>Projects & practice<span>.</span></h2></div><p>Hands-on work that reflects my interest in web development, automation, and analytics.</p></div>
          <div className="projects-grid">{projects.map(project => { const Icon = project.icon; return <article className="project-card" key={project.number}>
            <div className="project-top"><span>{project.number}</span><div className="project-icon"><Icon size={23} /></div><span className="project-type">{project.type}</span></div>
            <h3>{project.title}</h3><p className="project-description">{project.description}</p>
            <ul>{project.points.map(point => <li key={point}>{point}</li>)}</ul>
            <div className="project-stack">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
          </article>})}</div>
        </section>

        <section className="education-section" id="education"><div className="section-wrap">
          <div className="section-heading"><span className="section-index">04 / EDUCATION & EXPERIENCE</span><h2>Learning never stops<span>.</span></h2></div>
          <div className="timeline">
            <article className="timeline-item"><div className="timeline-icon"><GraduationCap size={21} /></div><div className="timeline-content"><div className="timeline-meta"><span>2023 — 2027</span><span className="timeline-badge">UNDERGRADUATE</span></div><h3>B.Tech — Information Technology</h3><p>Mohammed Sathak A.J. College of Engineering</p><p className="timeline-detail">CGPA: 8.0 (as shown in resume)</p></div></article>
            <article className="timeline-item"><div className="timeline-icon"><GraduationCap size={21} /></div><div className="timeline-content"><div className="timeline-meta"><span>Completed 2023</span><span className="timeline-badge">HIGHER SECONDARY</span></div><h3>12th Standard</h3><p>Government Boys Higher Secondary School</p><p className="timeline-detail">Percentage: 79%</p></div></article>
            <article className="timeline-item"><div className="timeline-icon"><BriefcaseBusiness size={21} /></div><div className="timeline-content"><div className="timeline-meta"><span>INTERNSHIPS</span><span className="timeline-badge">PRACTICAL LEARNING</span></div><h3>Java Backend & Data Analytics</h3><p>TNSI Foundations — Java Backend</p><p>DSI Technology — Data Analytics</p></div></article>
          </div>
        </div></section>

        <section className="contact-section" id="contact"><div className="section-wrap contact-grid">
          <div className="contact-copy"><span className="section-index">05 / CONTACT</span><h2>Have a project<br />in mind<span>?</span></h2><p>I'm open to entry-level opportunities, internships, and collaborations. Send a message and let's connect.</p>
            <div className="contact-detail"><span><Mail size={18} /></span><div><small>EMAIL</small><a href="mailto:manjunathanmohan143@gmail.com">manjunathanmohan143@gmail.com</a></div></div>
            <div className="contact-detail"><span><Phone size={18} /></span><div><small>PHONE</small><a href="tel:6369082936">6369082936</a></div></div>
            <div className="contact-detail"><span><MapPin size={18} /></span><div><small>LOCATION</small><p>Siruseri, Chennai, India</p></div></div>
          </div>
          <form className="contact-form" onSubmit={submitContact}>
            <h3>Send me a message</h3><p className="form-subtitle">I'll be glad to hear from you.</p>
            <label htmlFor="name">Your name</label><input id="name" name="name" value={form.name} onChange={updateForm} placeholder="Enter your name" required minLength="2" />
            <label htmlFor="email">Email address</label><input id="email" name="email" type="email" value={form.email} onChange={updateForm} placeholder="you@example.com" required />
            <label htmlFor="message">Message</label><textarea id="message" name="message" value={form.message} onChange={updateForm} placeholder="Tell me a little about your idea..." rows="4" required minLength="5" />
            <button className="button button-primary submit-button" type="submit" disabled={sending}>{sending ? "Sending..." : "Send message"} <Send size={16} /></button>
            {status.text && <p className={`form-status ${status.type}`} role="status">{status.type === "success" && <CheckCircle2 size={16} />}{status.text}</p>}
          </form>
        </div></section>
      </main>
      <footer className="footer"><a className="brand footer-brand" href="#home"><span className="brand-mark">M</span><span>Manjunathan<span className="brand-dot">.</span></span></a><p>Designed & built with care.</p><span>© {new Date().getFullYear()} Manjunathan S</span></footer>
    </>
  );
}

export default App;
