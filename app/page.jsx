"use client";

import { useEffect, useMemo, useState } from "react";

const ROTATING_WORDS = [
  "high-impact web experiences.",
  "clean and modern portfolio interfaces.",
  "fast, scalable Next.js websites.",
];

export default function HomePage() {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const activeWord = ROTATING_WORDS[wordIndex];
  const typedWord = useMemo(
    () => activeWord.slice(0, letterCount),
    [activeWord, letterCount],
  );

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

  return (
    <main className="hero-shell">
      <section className="hero-card">
        <p className="hero-kicker">Portfolio 2.0 | Next.js</p>
        <h1 className="hero-title">Hi, I am Akshi</h1>
        <p className="typing-line" aria-live="polite">
          <span className="typing-prefix">I build </span>
          <span className="typed-word">{typedWord}</span>
          <span className="typing-cursor" aria-hidden="true">
            |
          </span>
        </p>
        <p className="hero-subtitle">
          Freshly migrated to Next.js with a clean structure and a bold gradient-first design.
        </p>
      </section>
    </main>
  );
}
