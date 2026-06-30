import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Service {
  title: string;
  body: string;
  img: string;
}

interface Project {
  title: string;
  tag: string;
  body: string;
  link: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES: Service[] = [
  {
    title: "Brand Storytelling",
    body: "Every founder has a story worth telling. We craft the narrative that turns viewers into believers — and believers into buyers.",
    img: "/illus-storytelling.png",
  },
  {
    title: "Content Systems",
    body: "Posting without a system is just noise. We build the content engine that keeps you visible, consistent, and converting.",
    img: "/illus-content.png",
  },
  {
    title: "Content Strategy",
    body: "We map your MOF and BOF content so every piece has a purpose — from building trust to booking calls.",
    img: "/illus-strategy.png",
  },
  {
    title: "Full Production",
    body: "Shot on the Sony FX3. Edited with intention. Every frame is a decision — because your audience can feel the difference.",
    img: "/illus-production.png",
  },
];

const PROJECTS: Project[] = [
  {
    title: "Elijah Fleming",
    tag: "Brand Film",
    body: "We got under the skin of Elijah's brand — who he is, what he stands for, and why it matters. The result: a cinematic film that doesn't just show a fitness journey, it makes you want to start your own.",
    link: "https://www.instagram.com/reel/DZ8FfKpMlCA/?igsh=MWgzZ293aTU5ZzVqMg==",
  },
  {
    title: "Michael Jordan",
    tag: "YouTube Series",
    body: "A series built to do two things: prove what Michael knows and show who he is. Part education, part access — the kind of content that turns viewers into believers.",
    link: "https://youtu.be/CvyY6eS4Sdo?si=elzFkZS1rjQaV2zL",
  },
  {
    title: "Michael Jordan",
    tag: "SF Growth",
    body: "We repurposed Michael's long-form YouTube content into weeks of short-form — more reach, zero extra effort. The result: a consistent presence that builds trust, credibility, and likeness at scale.",
    link: "https://www.instagram.com/reel/DRu95ezDix6/?igsh=YWl4c3B4bDYzdWh2",
  },
];

// ─── Pill Nav ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = ["Home", "About Us", "Services", "Projects"];

function PillNav({ active }: { active: string }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase().replace(" ", "-"));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: "6px",
        borderRadius: "999px",
        background: "rgba(10,14,30,0.7)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = active === item;
        return (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            style={{
              padding: "8px 20px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: isActive ? 600 : 400,
              color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
              background: isActive
                ? "rgba(255,255,255,0.12)"
                : "transparent",
              transition: "all 0.2s ease",
              letterSpacing: "0.01em",
            }}
          >
            {item}
          </button>
        );
      })}
    </nav>
  );
}

// ─── Swipe Cards ──────────────────────────────────────────────────────────────
function SwipeCards<T>({
  items,
  renderCard,
}: {
  items: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(items.length - 1, i + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    else if (diff < -50) prev();
    isDragging.current = false;
  };
  const onMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };
  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const diff = startX.current - e.clientX;
    if (diff > 50) next();
    else if (diff < -50) prev();
    isDragging.current = false;
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", userSelect: "none" }}>
      {/* Cards container */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        style={{
          display: "flex",
          transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
          transform: `translateX(calc(-${index * 100}% - ${index * 16}px))`,
          gap: "16px",
          cursor: "grab",
        }}
      >
        {items.map((item, i) => renderCard(item, i))}
      </div>

      {/* Dot indicators */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "flex-start",
          marginTop: "28px",
          paddingLeft: "4px",
        }}
      >
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: i === index ? "28px" : "8px",
              height: "8px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background: i === index ? "#6b9fff" : "rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────────────────────────
function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "20px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        minHeight: "200px",
        height: "100%",
      }}
    >
      {/* Text — left side */}
      <div
        style={{
          flex: 1,
          padding: "28px 16px 28px 28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <h3
          style={{
            fontSize: "clamp(17px, 2vw, 22px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "12px",
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            fontSize: "clamp(12px, 1.2vw, 14px)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)",
            margin: 0,
          }}
        >
          {service.body}
        </p>
      </div>

      {/* Illustration — right side */}
      <div
        style={{
          width: "160px",
          flexShrink: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden",
          padding: "0",
          position: "relative",
        }}
      >
        <img
          src={service.img}
          alt={service.title}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            mixBlendMode: "lighten",
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}

// ─── Projects Section (Nitid-style auto-rotating) ────────────────────────────
function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-rotate every 4 seconds
  const goTo = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((active + 1) % PROJECTS.length);
    }, 4000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, animating]);

  const project = PROJECTS[active];

  // Shared animated content (title, body, CTA, divider, category label)
  const projectContent = (
    <div
      style={{
        opacity: animating ? 0 : 1,
        transform: animating ? "translateY(10px)" : "translateY(0)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <h3
        style={{
          fontSize: isMobile ? "26px" : "clamp(20px, 3vw, 36px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: "#9ACBF5",
          marginBottom: "14px",
          lineHeight: 1.15,
        }}
      >
        {project.title}
      </h3>

      <p
        style={{
          fontSize: isMobile ? "14px" : "clamp(13px, 1.4vw, 15px)",
          lineHeight: 1.65,
          color: "rgba(211,234,255,0.75)",
          marginBottom: "24px",
          maxWidth: isMobile ? "100%" : "380px",
        }}
      >
        {project.body}
      </p>

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontSize: isMobile ? "22px" : "clamp(16px, 2vw, 26px)",
          fontWeight: 600,
          color: "#fff",
          textDecoration: "none",
          letterSpacing: "-0.02em",
          marginBottom: "20px",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        See full project
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </a>

      <div
        style={{
          height: "1.5px",
          width: isMobile ? "55%" : "60%",
          background: "linear-gradient(to right, rgba(255,255,255,0.4), transparent)",
          marginBottom: "20px",
        }}
      />

      <div
        style={{
          fontSize: isMobile
            ? project.tag.length > 10
              ? "clamp(36px, 9vw, 52px)"
              : "clamp(52px, 14vw, 72px)"
            : project.tag.length > 10
              ? "clamp(40px, 5vw, 72px)"
              : "clamp(60px, 8vw, 120px)",
          fontWeight: 700,
          letterSpacing: "-0.05em",
          lineHeight: 1,
          color: "#9ACBF5",
          whiteSpace: "nowrap",
          // intentionally overflows the column on desktop, clipped at section level
          overflow: "visible",
        }}
      >
        {project.tag}
      </div>
    </div>
  );

  // Dot nav
  const dotNav = (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "32px" }}>
      {PROJECTS.map((_, i) => (
        <button
          key={i}
          onClick={() => { if (timerRef.current) clearTimeout(timerRef.current); goTo(i); }}
          style={{
            width: i === active ? "24px" : "6px",
            height: "6px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            background: i === active ? "#9ACBF5" : "rgba(255,255,255,0.2)",
            transition: "all 0.4s ease",
            padding: 0,
          }}
        />
      ))}
    </div>
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 1,
        padding: isMobile ? "80px 24px 80px" : "120px 24px 100px",
        overflow: isMobile ? "hidden" : "visible",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "30%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse at center, rgba(107,159,255,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: isMobile ? "100%" : "1100px",
          margin: "0 auto",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {isMobile ? (
          /* ── MOBILE: stacked layout ── */
          <>
            {/* "Projects" heading centred */}
            <div style={{ textAlign: "center", marginBottom: "48px", position: "relative" }}>
              {/* glow behind heading */}
              <div style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "300px",
                height: "150px",
                background: "radial-gradient(ellipse at center, rgba(154,203,245,0.25) 0%, transparent 70%)",
                filter: "blur(30px)",
                pointerEvents: "none",
              }} />
              <h2
                style={{
                  fontSize: "clamp(72px, 18vw, 100px)",
                  fontWeight: 700,
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  color: "#6b9fff",
                  textShadow: "0 0 20px rgba(107,159,255,0.5), 0 0 50px rgba(107,159,255,0.3)",
                  position: "relative",
                }}
              >
                Projects
              </h2>
            </div>

            {/* Project content */}
            <div style={{ paddingBottom: "8px" }}>
              {projectContent}
              {dotNav}
            </div>
          </>
        ) : (
          /* ── DESKTOP: two-column layout ── */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "43% 1px 57%",
              minHeight: "480px",
              alignItems: "center",
            }}
          >
            {/* LEFT — "Projects" heading */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 40px 40px 0",
                position: "relative",
              }}
            >
              <div style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "500px",
                height: "300px",
                background: "radial-gradient(ellipse at center, rgba(154,203,245,0.18) 0%, transparent 70%)",
                filter: "blur(40px)",
                pointerEvents: "none",
              }} />
              <h2
                style={{
                  fontSize: "clamp(64px, 9vw, 120px)",
                  fontWeight: 700,
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  color: "#6b9fff",
                  textShadow: "0 0 0px #6b9fff, 0 0 20px rgba(107,159,255,0.5), 0 0 50px rgba(107,159,255,0.3)",
                  position: "relative",
                }}
              >
                Projects
              </h2>
            </div>

            {/* Vertical divider */}
            <div
              style={{
                width: "1px",
                alignSelf: "stretch",
                background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)",
              }}
            />

            {/* RIGHT — rotating content */}
            <div
              style={{
                padding: "40px 0 40px 48px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minHeight: "380px",
              }}
            >
              {projectContent}
              {dotNav}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Marketing() {
  const [activeNav, setActiveNav] = useState("Home");
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  // Track active section for pill nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const label = NAV_ITEMS.find(
              (n) => n.toLowerCase().replace(" ", "-") === id
            );
            if (label) setActiveNav(label);
          }
        });
      },
      { threshold: 0.4 }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.toLowerCase().replace(" ", "-"));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const sectionStyle = (bg = "transparent"): React.CSSProperties => ({
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "120px 24px 80px",
    maxWidth: "720px",
    margin: "0 auto",
    background: bg,
  });

  const revealStyle: React.CSSProperties = {
    opacity: 0,
    transform: "translateY(32px)",
    transition: "opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
  };

  return (
    <div
      style={{
        background: "#07091a",
        minHeight: "100vh",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: "#fff",
        overflowX: "hidden",
      }}
    >
      {/* Ambient background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,90,255,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(30,60,180,0.10) 0%, transparent 60%)
          `,
        }}
      />

      <PillNav active={activeNav} />

      {/* ── HOME ─────────────────────────────────────────────────────────── */}
      <section id="home" style={{ ...sectionStyle(), position: "relative", zIndex: 1 }}>
        {/* 3D logo object placeholder — abstract ring */}
        <div
          className="reveal"
          style={{
            ...revealStyle,
            width: "96px",
            height: "96px",
            borderRadius: "50%",
            border: "2px solid rgba(107,159,255,0.5)",
            boxShadow: "0 0 40px rgba(107,159,255,0.3), inset 0 0 20px rgba(107,159,255,0.1)",
            marginBottom: "40px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "1.5px solid rgba(107,159,255,0.3)",
              boxShadow: "0 0 20px rgba(107,159,255,0.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "110px",
              height: "30px",
              borderRadius: "50%",
              border: "1.5px solid rgba(107,159,255,0.2)",
              transform: "rotateX(70deg)",
            }}
          />
        </div>

        <h1
          className="reveal"
          style={{
            ...revealStyle,
            fontSize: "clamp(42px, 8vw, 72px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "24px",
            color: "#fff",
            transitionDelay: "0.1s",
          }}
        >
          Masters of<br />Storytelling
        </h1>

        <p
          className="reveal"
          style={{
            ...revealStyle,
            fontSize: "17px",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.55)",
            maxWidth: "480px",
            marginBottom: "40px",
            transitionDelay: "0.2s",
          }}
        >
          Every founder has a story. Every brand has a vision.<br />
          We bring both to life and put them in front of the right audience.
        </p>

        <div
          className="reveal"
          style={{
            ...revealStyle,
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            transitionDelay: "0.3s",
          }}
        >
          <a
            href="mailto:hello@earnedreach.org"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 28px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.2s ease",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
            }}
          >
            Get Started
          </a>
          <a
            href="mailto:hello@earnedreach.org?subject=Join the team"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 28px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "15px",
              fontWeight: 400,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            Join our team.
          </a>
        </div>
      </section>

      {/* ── ABOUT US ─────────────────────────────────────────────────────── */}
      <section id="about-us" style={{ ...sectionStyle(), zIndex: 1 }}>
        <h2
          className="reveal"
          style={{
            ...revealStyle,
            fontSize: "clamp(32px, 6vw, 56px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#6b9fff",
            marginBottom: "40px",
          }}
        >
          Where attention meets<br />intention. Your story,<br />seen by the right eyes.
        </h2>

        {/* Founders card */}
        <div
          className="reveal"
          style={{
            ...revealStyle,
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "20px",
            padding: "36px",
            transitionDelay: "0.15s",
          }}
        >
          <h3
            style={{
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              color: "#fff",
            }}
          >
            The Founders
          </h3>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)",
              marginBottom: "20px",
            }}
          >
            EarnedReach was founded by two filmmakers who got tired of watching great founders stay invisible. Combining expertise in editing, cinematography, and content strategy, they built a studio that treats every brand like a story worth telling.
          </p>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            They realised that the founders who win online aren't the loudest — they're the ones with the clearest story. So they built a system to find it, film it, and put it in front of the right people.
          </p>

          {/* Team photo placeholder */}
          <div
            style={{
              marginTop: "32px",
              borderRadius: "14px",
              overflow: "hidden",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              height: "220px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.2)",
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Team Photo Coming Soon
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────── */}
      <section
        id="services"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "100px 24px 100px",
        }}
      >
        {/* Heading */}
        <h2
          className="reveal"
          style={{
            ...revealStyle,
            fontSize: "clamp(28px, 4.5vw, 56px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#9ACBF5",
            marginBottom: "48px",
            lineHeight: 1.1,
            textAlign: "center",
            maxWidth: "900px",
            margin: "0 auto 48px",
          }}
        >
          Work directly with the founders of EarnedReach
        </h2>

        {/* Desktop: bento grid | Mobile: horizontal swipe */}
        <div
          className="reveal"
          style={{
            ...revealStyle,
            transitionDelay: "0.1s",
          }}
        >
          {/* Desktop grid */}
          <div
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
            }}
            className="services-desktop-grid"
          >
            {SERVICES.map((service, i) => (
              <ServiceCard key={i} service={service} />
            ))}
          </div>

          {/* Mobile swipe strip */}
          <div
            className="services-mobile-strip"
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "14px",
              paddingBottom: "12px",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {SERVICES.map((service, i) => (
              <div
                key={i}
                style={{
                  flex: "0 0 82vw",
                  maxWidth: "340px",
                  scrollSnapAlign: "start",
                }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <ProjectsSection />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          className="reveal"
          style={{
            ...revealStyle,
            fontSize: "clamp(24px, 5vw, 42px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "32px",
            lineHeight: 1.3,
          }}
        >
          Ready to{" "}
          <span style={{ color: "#fff", fontWeight: 700 }}>elevate</span>{" "}
          your vision?
        </p>
        <a
          className="reveal"
          href="mailto:hello@earnedreach.org"
          style={{
            ...revealStyle,
            display: "inline-flex",
            alignItems: "center",
            padding: "16px 36px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: 500,
            textDecoration: "none",
            transition: "all 0.2s ease",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 24px rgba(0,0,0,0.3)",
            transitionDelay: "0.1s",
          }}
        >
          Get Started
        </a>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        style={{
          padding: "48px 24px 40px",
          maxWidth: "720px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.07)",
            marginBottom: "40px",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px",
            marginBottom: "40px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "16px",
              }}
            >
              Explore
            </p>
            {["Home", "About Us", "Services", "Projects"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  const el = document.getElementById(item.toLowerCase().replace(" ", "-"));
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  display: "block",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "15px",
                  padding: "4px 0",
                  textAlign: "left",
                  transition: "color 0.2s",
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "16px",
              }}
            >
              Connect
            </p>
            {[
              { label: "Get Started ↗", href: "mailto:hello@earnedreach.org" },
              { label: "Instagram ↗", href: "https://instagram.com/earnedreach" },
              { label: "Join our team ↗", href: "mailto:hello@earnedreach.org?subject=Join the team" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "15px",
                  padding: "4px 0",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.25)" }}>
            © 2026 EarnedReach. All rights reserved.
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.2)",
              fontStyle: "italic",
            }}
          >
            Your story, seen by the right eyes.
          </p>
        </div>
      </footer>
    </div>
  );
}
