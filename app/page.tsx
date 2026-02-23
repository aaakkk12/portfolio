"use client";

import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";

const ROTATING_WORDS = [
  "immersive portfolio journeys.",
  "animated interfaces with personality.",
  "blazing-fast Next.js experiences.",
] as const;

const ROBOT_MESSAGES = [
  "Systems online. Ready to craft something iconic.",
  "Hover mode engaged. Motion tuned for style.",
  "Need a premium landing page? I am in.",
  "Creative energy detected. Let's build together.",
] as const;

const ABOUT_HIGHLIGHTS = [
  "Motion-first interfaces",
  "Story-driven design",
  "Pixel-perfect execution",
  "Modern frontend architecture",
] as const;

const ABOUT_PILLARS = [
  {
    title: "Design to Build",
    detail: "From rough concept to polished UI, I shape the full visual + frontend flow.",
  },
  {
    title: "Performance Focus",
    detail: "Animations stay smooth while keeping pages fast and production-ready.",
  },
  {
    title: "User Experience",
    detail: "Every section is crafted to feel clear, memorable, and easy to navigate.",
  },
  {
    title: "Collaboration Ready",
    detail: "Comfortable working with founders, teams, and designers in fast cycles.",
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
  },
] as const;

const CONTACT_CHANNELS = [
  {
    title: "Download Resume",
    detail: "Get my latest profile, projects, and technical background in one place.",
    action: "Open Resume",
    href: "/resume.pdf",
  },
  {
    title: "Explore GitHub",
    detail: "Check real code, UI experiments, and ongoing frontend builds.",
    action: "Visit GitHub",
    href: "https://github.com/aaakkk12",
  },
  {
    title: "Start a Project",
    detail: "Open to internships, freelance projects, and product collaborations.",
    action: "Let's Talk",
    href: "#home",
  },
] as const;

type IntroPhase = "show" | "hide" | "done";

type EyeOffset = {
  x: number;
  y: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function HomePage() {
  const [introPhase, setIntroPhase] = useState<IntroPhase>("show");
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [letterCount, setLetterCount] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [eyeOffset, setEyeOffset] = useState<EyeOffset>({ x: 0, y: 0 });
  const [isRobotHovered, setIsRobotHovered] = useState<boolean>(false);
  const [showRobotMessage, setShowRobotMessage] = useState<boolean>(false);
  const [botMessageIndex, setBotMessageIndex] = useState<number>(-1);

  const activeWord = ROTATING_WORDS[wordIndex];
  const maxTypedChars = useMemo<number>(
    () => Math.max(...ROTATING_WORDS.map((word) => word.length)),
    [],
  );
  const typedWord = useMemo<string>(
    () => activeWord.slice(0, letterCount),
    [activeWord, letterCount],
  );
  const robotMessage = ROBOT_MESSAGES[botMessageIndex < 0 ? 0 : botMessageIndex];

  useEffect(() => {
    const hideTimer = window.setTimeout(() => setIntroPhase("hide"), 1200);
    const doneTimer = window.setTimeout(() => setIntroPhase("done"), 1950);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

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

  useEffect(() => {
    if (!showRobotMessage) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setShowRobotMessage(false);
    }, 2600);

    return () => window.clearTimeout(timer);
  }, [showRobotMessage]);

  const handleRobotMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;

    setEyeOffset({
      x: clamp((relativeX - 0.5) * 10, -5, 5),
      y: clamp((relativeY - 0.5) * 8, -4, 4),
    });
  };

  const handleRobotLeave = () => {
    setIsRobotHovered(false);
    setEyeOffset({ x: 0, y: 0 });
  };

  const handleRobotClick = () => {
    setBotMessageIndex((prev) => (prev + 1) % ROBOT_MESSAGES.length);
    setShowRobotMessage(true);
  };

  const handleRobotKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    handleRobotClick();
  };

  return (
    <>
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
        <section className="hero-shell" id="home">
          <section className="hero-card">
            <div className="hero-grid">
              <div className="hero-copy">
                <h1 className="hero-title">
                  Hi, I am <span className="hero-title-glow">Akshit</span>
                  <br />
                  Creative Developer
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
                    Explore Skills
                  </a>
                  <a className="hero-btn hero-btn-ghost" href="#contact">
                    Contact Me
                  </a>
                </div>
                <div className="hero-tags" aria-label="Top skills">
                  <span className="hero-tag">React + Next.js</span>
                  <span className="hero-tag">UI Animation</span>
                  <span className="hero-tag">Creative Frontend</span>
                </div>
              </div>

              <div
                className={`robot-wrap ${isRobotHovered ? "robot-wrap-hover" : ""}`}
                role="button"
                tabIndex={0}
                aria-label="Interactive assistant robot"
                onMouseEnter={() => setIsRobotHovered(true)}
                onMouseMove={handleRobotMove}
                onMouseLeave={handleRobotLeave}
                onClick={handleRobotClick}
                onKeyDown={handleRobotKeyDown}
              >
                <div className={`robot-bubble ${showRobotMessage ? "robot-bubble-show" : ""}`}>
                  {robotMessage}
                </div>
                <div className="robot-halo" />
                <div className="robot-ring robot-ring-a" />
                <div className="robot-ring robot-ring-b" />
                <div className="robot-frame">
                  <div className="robot-antenna">
                    <span className="robot-antenna-light" />
                  </div>
                  <div className="robot-head">
                    <span className="robot-eye">
                      <span
                        className="robot-pupil"
                        style={{
                          transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                        }}
                      />
                    </span>
                    <span className="robot-eye">
                      <span
                        className="robot-pupil"
                        style={{
                          transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                        }}
                      />
                    </span>
                    <span className="robot-mouth" />
                  </div>
                  <div className="robot-torso">
                    <span className="robot-core" />
                  </div>
                  <div className="robot-arm robot-arm-left" />
                  <div className="robot-arm robot-arm-right" />
                  <div className="robot-leg robot-leg-left" />
                  <div className="robot-leg robot-leg-right" />
                </div>
                <div className="robot-shadow" />
              </div>
            </div>
          </section>
        </section>

        <div className="section-stack">
          <section className="section-card" id="about">
            <div className="section-head">
              <p className="section-kicker">About</p>
              <h2 className="section-title">Designing digital experiences that feel alive and intentional.</h2>
            </div>
            <div className="about-grid">
              <div>
                <p className="about-text">
                  I craft premium web interfaces where visual storytelling and engineering quality move together. From
                  landing pages to complete portfolio systems, my goal is to make every interaction feel smooth,
                  memorable, and conversion-friendly.
                </p>
                <div className="about-highlights">
                  {ABOUT_HIGHLIGHTS.map((highlight) => (
                    <span className="about-highlight" key={highlight}>
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              <div className="about-pillar-grid">
                {ABOUT_PILLARS.map((pillar) => (
                  <article className="about-pillar" key={pillar.title}>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section-card" id="skills">
            <div className="section-head">
              <p className="section-kicker">Skills</p>
              <h2 className="section-title">Tools and strengths I use to ship polished, modern web products.</h2>
            </div>
            <div className="skills-grid">
              {SKILL_GROUPS.map((group) => (
                <article className="skill-card" key={group.title}>
                  <h3>{group.title}</h3>
                  <p>{group.summary}</p>
                  <ul className="skill-list">
                    {group.skills.map((skill) => (
                      <li className="skill-item" key={skill.name}>
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

          <section className="section-card section-card-contact" id="contact">
            <div className="section-head">
              <p className="section-kicker">Contact</p>
              <h2 className="section-title">Want a standout website with the same premium vibe?</h2>
            </div>
            <div className="contact-layout">
              <div className="contact-copy">
                <p>
                  I am available for freelance work, internships, and creative collaborations. If you have an idea
                  that needs strong design and clean frontend execution, let's connect.
                </p>
                <div className="contact-badges">
                  <span>Fast response</span>
                  <span>Remote friendly</span>
                  <span>Build-focused</span>
                </div>
              </div>
              <div className="contact-links">
                {CONTACT_CHANNELS.map((channel) => {
                  const isExternal = channel.href.startsWith("http");

                  return (
                    <a
                      className="contact-link"
                      key={channel.title}
                      href={channel.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                    >
                      <div>
                        <h3>{channel.title}</h3>
                        <p>{channel.detail}</p>
                      </div>
                      <span>{channel.action}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
