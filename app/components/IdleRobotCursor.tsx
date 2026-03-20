"use client";

import { useEffect, useRef, useState } from "react";

const IDLE_DELAY_MS = 2000;

export default function IdleRobotCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isIdle, setIsIdle] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateCapability = () => {
      const enabled = mediaQuery.matches;
      setIsEnabled(enabled);
      setIsIdle(false);
      document.body.classList.remove("robot-cursor-idle");
    };

    const clearIdleTimeout = () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };

    const armIdleTimer = () => {
      clearIdleTimeout();

      if (!mediaQuery.matches || document.hidden) {
        return;
      }

      timeoutRef.current = window.setTimeout(() => {
        setIsIdle(true);
      }, IDLE_DELAY_MS);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!mediaQuery.matches || event.pointerType !== "mouse") {
        return;
      }

      setPosition({ x: event.clientX, y: event.clientY });
      setIsIdle(false);
      armIdleTimer();
    };

    const handleActivity = () => {
      if (!mediaQuery.matches) {
        return;
      }

      setIsIdle(false);
      armIdleTimer();
    };

    const handlePointerLeave = () => {
      clearIdleTimeout();
      setIsIdle(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearIdleTimeout();
        setIsIdle(false);
        return;
      }

      armIdleTimer();
    };

    updateCapability();
    mediaQuery.addEventListener("change", updateCapability);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handleActivity, { passive: true });
    window.addEventListener("wheel", handleActivity, { passive: true });
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("blur", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearIdleTimeout();
      mediaQuery.removeEventListener("change", updateCapability);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handleActivity);
      window.removeEventListener("wheel", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("blur", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.body.classList.remove("robot-cursor-idle");
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      document.body.classList.remove("robot-cursor-idle");
      return;
    }

    document.body.classList.toggle("robot-cursor-idle", isIdle);
  }, [isEnabled, isIdle]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      className={`idle-robot-cursor ${isIdle ? "is-visible" : ""}`}
      style={{
        left: position.x,
        top: position.y,
      }}
      aria-hidden="true"
    >
      <div className="idle-robot-dialog">
        <span className="idle-robot-dialog-line idle-robot-dialog-line-first">Hi recruiter</span>
        <span className="idle-robot-dialog-line idle-robot-dialog-line-second">I am Akshit</span>
      </div>

      <svg viewBox="0 0 72 72" className="idle-robot-svg">
        <g className="idle-robot-float">
          <rect x="18" y="22" width="30" height="24" rx="8" className="idle-robot-head" />
          <rect x="22" y="26" width="22" height="14" rx="5" className="idle-robot-face" />
          <circle cx="30" cy="33" r="2.4" className="idle-robot-eye" />
          <circle cx="38" cy="33" r="2.4" className="idle-robot-eye" />
          <rect x="31.5" y="15" width="3" height="8" rx="1.5" className="idle-robot-limb" />
          <circle cx="33" cy="14" r="3.2" className="idle-robot-accent" />
          <rect x="24" y="46" width="18" height="16" rx="7" className="idle-robot-body" />
          <rect x="15" y="47" width="8" height="4" rx="2" className="idle-robot-limb" />
          <g className="idle-robot-wave">
            <rect x="45" y="43" width="10" height="4" rx="2" className="idle-robot-limb" />
            <circle cx="56.5" cy="45" r="3.2" className="idle-robot-accent" />
          </g>
          <rect x="27" y="60" width="4" height="8" rx="2" className="idle-robot-limb" />
          <rect x="35" y="60" width="4" height="8" rx="2" className="idle-robot-limb" />
          <circle cx="29" cy="68" r="2.3" className="idle-robot-accent" />
          <circle cx="37" cy="68" r="2.3" className="idle-robot-accent" />
        </g>
      </svg>
    </div>
  );
}
