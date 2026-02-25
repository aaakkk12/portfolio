"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";

const ROTATING_WORDS = [
  "immersive portfolio journeys.",
  "animated interfaces with personality.",
  "blazing-fast Next.js experiences.",
  "pixel-perfect web solutions.",
  "interactive 3D experiences.",
] as const;

const ABOUT_HIGHLIGHTS = [
  "Motion-first interfaces",
  "Story-driven design",
  "Pixel-perfect execution",
  "Modern frontend architecture",
  "3D Web Experiences",
  "Performance Optimization",
] as const;

const ABOUT_PILLARS = [
  {
    title: "Design to Build",
    detail: "From rough concept to polished UI, I shape the full visual + frontend flow.",
    icon: "🎨",
  },
  {
    title: "Performance Focus",
    detail: "Animations stay smooth while keeping pages fast and production-ready.",
    icon: "⚡",
  },
  {
    title: "User Experience",
    detail: "Every section is crafted to feel clear, memorable, and easy to navigate.",
    icon: "✨",
  },
  {
    title: "Collaboration Ready",
    detail: "Comfortable working with founders, teams, and designers in fast cycles.",
    icon: "🤝",
  },
] as const;

const SKILL_GROUPS = [
  {
    title: "Frontend Engineering",
    summary: "Building maintainable interfaces with modern frameworks and component systems.",
    skills: [
      { name: "Next.js App Router", level: 95 },
      { name: "React + TypeScript", level: 94 },
      { name: "Reusable UI Architecture", level: 92 },
      { name: "State Management", level: 88 },
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Visual Craft",
    summary: "Design-led implementation with strong motion, spacing, and interaction detail.",
    skills: [
      { name: "Advanced CSS", level: 93 },
      { name: "Motion Design", level: 89 },
      { name: "Responsive Layout Systems", level: 95 },
      { name: "Micro-interactions", level: 87 },
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Delivery Mindset",
    summary: "Product thinking, quality checks, and clean deployment workflow for real projects.",
    skills: [
      { name: "Git + GitHub", level: 90 },
      { name: "Vercel Deployment", level: 92 },
      { name: "Performance Audits", level: 84 },
      { name: "Iteration Speed", level: 91 },
    ],
    gradient: "from-orange-500 to-red-500",
  },
] as const;

const PROJECTS = [
  {
    title: "E-Commerce Platform",
    description: "Modern shopping experience with real-time updates and smooth animations",
    tags: ["Next.js", "Stripe", "Framer Motion"],
    color: "from-blue-600 to-cyan-600",
  },
  {
    title: "SaaS Dashboard",
    description: "Analytics platform with interactive charts and real-time data visualization",
    tags: ["React", "D3.js", "WebSocket"],
    color: "from-purple-600 to-pink-600",
  },
  {
    title: "Portfolio System",
    description: "Customizable portfolio builder with drag-and-drop interface",
    tags: ["Next.js", "Three.js", "Tailwind"],
    color: "from-orange-600 to-red-600",
  },
] as const;

const CONTACT_CHANNELS = [
  {
    title: "Download Resume",
    detail: "Get my latest profile, projects, and technical background in one place.",
    action: "Open Resume",
    href: "/resume.pdf",
    icon: "📄",
  },
  {
    title: "Explore GitHub",
    detail: "Check real code, UI experiments, and ongoing frontend builds.",
    action: "Visit GitHub",
    href: "https://github.com/aaakkk12",
    icon: "💻",
  },
  {
    title: "Start a Project",
    detail: "Open to internships, freelance projects, and product collaborations.",
    action: "Let's Talk",
    href: "#home",
    icon: "🚀",
  },
] as const;

type IntroPhase = "show" | "hide" | "done";

const HeroThreeScene = dynamic(() => import("./components/HeroThreeScene"), {
  ssr: false,
  loading: () => <div className="hero-three-loading" aria-hidden="true" />,
});

export default function HomePage() {
  const [introPhase, setIntroPhase] = useState<IntroPhase>("show");
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [letterCount, setLetterCount] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const activeWord = ROTATING_WORDS[wordIndex];
  const maxTypedChars = useMemo<number>(
    () => Math.max(...ROTATING_WORDS.map((word) => word.length)),
    [],
  );
  const typedWord = useMemo<string>(
    () => activeWord.slice(0, letterCount),
    [activeWord, letterCount],
  );

  // Intro animation
  useEffect(() => {
    const hideTimer = window.setTimeout(() => setIntroPhase("hide"), 1200);
    const doneTimer = window.setTimeout(() => setIntroPhase("done"), 1950);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  // Typing effect
  useEffect(() => {
    let timeoutDelay = isDeleting ? 55 : 95;

    if (!isDeleting && letterCount === activeWord.length) {
      timeoutDelay = 1300;
    }

    if (isDeleting && letterCount === 0) {
      timeoutDelay = 250;
    }

    const timeoutId = window.setTimeout(() => {
      if (!isDeleting && letterCount === activeWord.length) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && letterCount === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        return;
      }

      setLetterCount((prev) => prev + (isDeleting ? -1 : 1));
    }, timeoutDelay);

    return () => window.clearTimeout(timeoutId);
  }, [activeWord.length, isDeleting, letterCount]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

  const refs = [aboutRef, skillsRef, projectsRef, contactRef];
  refs.forEach((ref) => {
    if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Intro Overlay */}
      {introPhase !== "done" && (
        <div
          className={`intro-overlay ${introPhase === "hide" ? "intro-overlay-hide" : ""}`}
          aria-hidden="true"
        >
          <div className="intro-panel">
            <p className="intro-kicker">AKSHIT.EXE</p>
            <p className="intro-title">Initializing Portfolio Interface</p>
            <div className="intro-loader">
              <span />
            </div>
          </div>
        </div>
      )}

      <main className="portfolio-main">
        {/* Hero Section - Fixed */}
        <section 
          className="hero-shell hero-shell-cinematic" 
          id="home"
        >
          <HeroThreeScene />
          <div className="hero-content-grid">
            <div className="hero-model-slot" />

            <div className="hero-copy hero-copy-panel">
              <h1 className="hero-title">
                Hi, I am <span className="hero-title-glow">Akshit</span>
                <br />
                <span className="hero-title-creative">Creative Developer</span>
              </h1>
              
              <p className="hero-intro">
                I design bold, interactive web experiences that blend motion, storytelling, and modern frontend
                performance.
              </p>
              
              <p className="typing-line" aria-live="polite">
                <span className="typing-prefix">I build</span>
                <span
                  className="typed-slot"
                  style={{
                    width: `${maxTypedChars}ch`,
                    maxWidth: "100%",
                  }}
                >
                  <span className="typed-word">{typedWord}</span>
                  <span className="typing-cursor" aria-hidden="true">
                    |
                  </span>
                </span>
              </p>
              
              <div className="hero-actions">
                <a className="hero-btn hero-btn-primary" href="#skills">
                  <span>Explore Skills</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 10H13M13 10L10 7M13 10L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a className="hero-btn hero-btn-ghost" href="#contact">
                  Contact Me
                </a>
              </div>
              
              <div className="hero-tags" aria-label="Top skills">
                <span className="hero-tag">React + Next.js</span>
                <span className="hero-tag">UI Animation</span>
                <span className="hero-tag">Creative Frontend</span>
                <span className="hero-tag">3D Web</span>
              </div>

              {/* Stats Counter */}
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-value">50+</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">3+</span>
                  <span className="stat-label">Years Exp</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">100%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-indicator">
            <div className="scroll-mouse">
              <div className="scroll-wheel"></div>
            </div>
            <p>Scroll to explore</p>
          </div>
        </section>

        {/* Content Sections - Overlay over hero */}
        <div className="section-stack">
          {/* About Section */}
          <section className="section-card section-animate" id="about" ref={aboutRef}>
            <div className="section-head">
              <p className="section-kicker">
                <span className="kicker-line"></span>
                About
              </p>
              <h2 className="section-title">
                Designing digital experiences that feel <span className="title-highlight">alive</span> and <span className="title-highlight">intentional</span>.
              </h2>
            </div>
            <div className="about-grid">
              <div>
                <p className="about-text">
                  I craft premium web interfaces where visual storytelling and engineering quality move together. From
                  landing pages to complete portfolio systems, my goal is to make every interaction feel smooth,
                  memorable, and conversion-friendly.
                </p>
                <div className="about-highlights">
                  {ABOUT_HIGHLIGHTS.map((highlight, idx) => (
                    <span 
                      className="about-highlight" 
                      key={highlight}
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              <div className="about-pillar-grid">
                {ABOUT_PILLARS.map((pillar, idx) => (
                  <article 
                    className="about-pillar" 
                    key={pillar.title}
                    style={{ animationDelay: `${idx * 0.15}s` }}
                  >
                    <span className="pillar-icon">{pillar.icon}</span>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="section-card section-animate" id="skills" ref={skillsRef}>
            <div className="section-head">
              <p className="section-kicker">
                <span className="kicker-line"></span>
                Skills
              </p>
              <h2 className="section-title">
                Tools and strengths I use to ship <span className="title-highlight">polished</span>, modern web products.
              </h2>
            </div>
            <div className="skills-grid">
              {SKILL_GROUPS.map((group, idx) => (
                <article 
                  className="skill-card" 
                  key={group.title}
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <div className={`skill-card-glow bg-gradient-to-br ${group.gradient}`}></div>
                  <h3>{group.title}</h3>
                  <p>{group.summary}</p>
                  <ul className="skill-list">
                    {group.skills.map((skill, skillIdx) => (
                      <li 
                        className="skill-item" 
                        key={skill.name}
                        style={{ animationDelay: `${(idx * 0.2) + (skillIdx * 0.1)}s` }}
                      >
                        <div className="skill-meta">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="skill-track">
                          <span style={{ width: `${skill.level}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* Projects Section - New */}
          <section className="section-card section-animate" id="projects" ref={projectsRef}>
            <div className="section-head">
              <p className="section-kicker">
                <span className="kicker-line"></span>
                Featured Work
              </p>
              <h2 className="section-title">
                Recent projects that showcase my <span className="title-highlight">creative vision</span>.
              </h2>
            </div>
            <div className="projects-grid">
              {PROJECTS.map((project, idx) => (
                <article 
                  className="project-card"
                  key={project.title}
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <div className={`project-bg bg-gradient-to-br ${project.color}`}></div>
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">{tag}</span>
                      ))}
                    </div>
                    <button className="project-link">
                      View Project
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="section-card section-card-contact section-animate" id="contact" ref={contactRef}>
            <div className="section-head">
              <p className="section-kicker">
                <span className="kicker-line"></span>
                Contact
              </p>
              <h2 className="section-title">
                Want a standout website with the same <span className="title-highlight">premium vibe</span>?
              </h2>
            </div>
            <div className="contact-layout">
              <div className="contact-copy">
                <p>
                  I am available for freelance work, internships, and creative collaborations. If you have an idea
                  that needs strong design and clean frontend execution, let's connect.
                </p>
                <div className="contact-badges">
                  <span>⚡ Fast response</span>
                  <span>🌍 Remote friendly</span>
                  <span>🎯 Build-focused</span>
                </div>
              </div>
              <div className="contact-links">
                {CONTACT_CHANNELS.map((channel, idx) => {
	                  const isExternal = channel.href.startsWith("http");

	                  return (
	                    <a
	                      className="contact-link"
	                      key={channel.title}
	                      href={channel.href}
	                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <span className="contact-icon">{channel.icon}</span>
                      <div>
                        <h3>{channel.title}</h3>
                        <p>{channel.detail}</p>
                      </div>
                      <span className="contact-arrow">
                        {channel.action}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M7 10H13M13 10L10 7M13 10L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="portfolio-footer">
            <div className="footer-content">
              <div className="footer-brand">
                <h3>Akshit</h3>
                <p>Creative Developer crafting digital experiences</p>
              </div>
              <div className="footer-links">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#skills">Skills</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
              </div>
              <div className="footer-social">
                <a href="https://github.com/aaakkk12" target="_blank" rel="noreferrer">GitHub</a>
                <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="#" target="_blank" rel="noreferrer">Twitter</a>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 Akshit. All rights reserved.</p>
              <p>Built with Next.js, Three.js & ❤️</p>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
