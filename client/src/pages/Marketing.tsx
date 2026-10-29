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
    title: "Content Production",
    body: "Filming days for short-form and business content, the edit, captions, and posting on every platform. Talking points before each shoot, so you never stare at the camera wondering what to say.",
    img: "/illus-production.png",
  },
  {
    title: "Packaging",
    body: "A hook, title and cover for every piece, chosen from what's already beating the usual views in your niche. Not guesswork.",
    img: "/illus-storytelling.png",
  },
  {
    title: "One Video, Every Channel",
    body: "Every video becomes clips, LinkedIn posts in your voice, a newsletter and more. All from the same filming day.",
    img: "/illus-content.png",
  },
  {
    title: "Reach Into Enquiries",
    body: "Your bio, link page and booking link set up properly, pinned posts that sell, and keyword DMs. So attention has somewhere to go.",
    img: "/illus-strategy.png",
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
              whiteSpace: "nowrap" as const,
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
        background: "linear-gradient(135deg, rgba(59,90,255,0.10) 0%, rgba(10,14,40,0.85) 60%)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(107,159,255,0.18)",
        borderRadius: "20px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        minHeight: "200px",
        height: "100%",
        boxShadow: "0 0 0 1px rgba(107,159,255,0.06), 0 8px 40px rgba(59,90,255,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
        position: "relative",
      }}
    >
      {/* Inner blue corner glow */}
      <div style={{
        position: "absolute",
        top: 0, left: 0,
        width: "180px", height: "180px",
        background: "radial-gradient(ellipse at top left, rgba(107,159,255,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Text — left side */}
      <div
        style={{
          flex: 1,
          padding: "28px 16px 28px 28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          position: "relative",
          zIndex: 1,
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
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Glow behind illustration */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(107,159,255,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <img
          src={service.img}
          alt={service.title}
          style={{
            width: "85%",
            height: "160px",
            objectFit: "contain",
            objectPosition: "center",
            display: "block",
            maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)",
            mixBlendMode: "lighten",
            filter: "brightness(1.1) contrast(1.05)",
            position: "relative",
            zIndex: 1,
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

  // Rotating hero subtitle
  const SUBTITLES = [
    "We film, edit, package and post your content, then show you what it brought in.",
    "You turn up to film. We handle the rest, and you never approve an edit.",
    "Most founders post and hope. We study every piece, and the next one is better for it.",
    "No ad spend. Ever. Every view is earned. Your story, seen by the right eyes.",
  ];
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleVisible(false);
      setTimeout(() => {
        setSubtitleIndex((i) => (i + 1) % SUBTITLES.length);
        setSubtitleVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
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

  // Scroll reveal — staggered fade+slide
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0) scale(1)";
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
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
    transform: "translateY(40px) scale(0.98)",
    transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)",
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
      <section
        id="home"
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Hero radial bloom */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(59,100,255,0.22) 0%, rgba(30,60,200,0.10) 40%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Logo */}
        <div
          className="reveal"
          style={{
            ...revealStyle,
            marginBottom: "32px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <img
            src="/er-logo.png"
            alt="EarnedReach"
            style={{
              width: "72px",
              height: "72px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Main headline */}
        <h1
          className="reveal"
          style={{
            ...revealStyle,
            fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            marginBottom: "28px",
            color: "#fff",
            transitionDelay: "0.1s",
            position: "relative",
            zIndex: 1,
            textShadow: "0 0 80px rgba(107,159,255,0.35)",
          }}
        >
          Reach, earned.<br />
          <span style={{ color: "#9ACBF5" }}>Never bought.</span>
        </h1>

        {/* Subheading */}
        <p
          className="reveal"
          style={{
            ...revealStyle,
            fontSize: "clamp(16px, 2vw, 19px)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)",
            maxWidth: "520px",
            marginBottom: "48px",
            transitionDelay: "0.2s",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
              display: "block",
              opacity: subtitleVisible ? 1 : 0,
              transform: subtitleVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {SUBTITLES[subtitleIndex]}
          </span>
        </p>

        {/* CTAs */}
        <div
          className="reveal"
          style={{
            ...revealStyle,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
            transitionDelay: "0.3s",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Get Started */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href="https://tally.so/r/PdgPKP"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "16px 36px",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #3b6fff 0%, #2250e0 100%)",
                color: "#fff",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s ease",
                boxShadow: "0 0 32px rgba(59,111,255,0.45), 0 4px 16px rgba(0,0,0,0.3)",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 48px rgba(59,111,255,0.65), 0 4px 16px rgba(0,0,0,0.3)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(59,111,255,0.45), 0 4px 16px rgba(0,0,0,0.3)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Get Started
            </a>
          </div>
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
            The Founder
          </h3>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
            }}
          >
            EarnedReach is run by David, a filmmaker. The cinematic eye came from the film-studio days. AI now handles the slow parts of the edit, so your content turns around fast. David still checks and signs off every piece, so you never approve an edit.
          </p>
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
          What a client gets
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

          {/* Mobile swipe strip — tall vertical cards */}
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
                  maxWidth: "360px",
                  scrollSnapAlign: "start",
                  background: "linear-gradient(160deg, rgba(59,90,255,0.10) 0%, rgba(10,14,40,0.90) 60%)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(107,159,255,0.18)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "420px",
                  boxShadow: "0 0 0 1px rgba(107,159,255,0.06), 0 8px 40px rgba(59,90,255,0.14), inset 0 1px 0 rgba(255,255,255,0.06)",
                  position: "relative",
                }}
              >
                {/* Text — top */}
                <div style={{ padding: "28px 24px 16px" }}>
                  <h3
                    style={{
                      fontSize: "26px",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      color: "#9ACBF5",
                      marginBottom: "14px",
                      lineHeight: 1.15,
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.55)",
                      margin: 0,
                    }}
                  >
                    {service.body}
                  </p>
                </div>

                {/* Illustration — bottom, fills remaining space */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    overflow: "hidden",
                    minHeight: "180px",
                    position: "relative",
                  }}
                >
                  {/* Glow behind illustration */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse 80% 60% at 50% 70%, rgba(107,159,255,0.22) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }} />
                  <img
                    src={service.img}
                    alt={service.title}
                    style={{
                      width: "75%",
                      maxHeight: "220px",
                      objectFit: "contain",
                      objectPosition: "bottom center",
                      maskImage: "radial-gradient(ellipse 80% 80% at 50% 55%, black 35%, transparent 100%)",
                      WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 55%, black 35%, transparent 100%)",
                      mixBlendMode: "lighten",
                      filter: "brightness(1.15) contrast(1.05)",
                      position: "relative",
                      zIndex: 1,
                    }}
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="reveal" style={{ ...revealStyle, textAlign: "center", marginTop: "40px", fontSize: "16px", color: "rgba(255,255,255,0.6)" }}>
          Plus a monthly breakdown of what worked and why. <span style={{ color: "#9ACBF5" }}>No ad spend. Ever.</span> Every view is earned.
        </p>
      </section>

            {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <ProjectsSection />

      {/* ── CLIENT WORK (public view counts) ────────────────────────────── */}
      <section id="work" style={{ position: "relative", zIndex: 1, padding: "100px 24px 0", maxWidth: "1000px", margin: "0 auto" }}>
        <h2 className="reveal" style={{ ...revealStyle, fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff", marginBottom: "16px" }}>
          Made with Quam Balogun
        </h2>
        <p className="reveal" style={{ ...revealStyle, fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", marginBottom: "40px", maxWidth: "620px" }}>
          Three long-form videos for Quam's YouTube channel in October. We chose the topics, edited them and packaged them. Over 400,000 views between them, none of it paid for.
        </p>
        <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "20px" }}>
          {[
            ["yW1cTG3wzCQ", "you're broke because you're too smart", "387K"],
            ["j6bBG2VwGbk", "you're ruining your life (and you know it)", "17K"],
            ["aXqGzPi9wNA", "you're working hard on the wrong thing", "8.8K"],
          ].map(([id, title, views], i) => (
            <a key={id} className="reveal" href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" style={{ ...revealStyle, transitionDelay: `${i * 0.1}s`, display: "block", textDecoration: "none", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
              <img src={`/work/${id}.jpg`} alt={title} loading="lazy" style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block" }} />
              <div style={{ padding: "16px 18px 18px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff" }}>{views} <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.5)", letterSpacing: 0 }}>views</span></div>
                <p style={{ fontSize: "14px", lineHeight: 1.5, color: "rgba(255,255,255,0.7)", margin: "6px 0 0" }}>{title}</p>
                <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ACBF5", marginTop: "12px" }}>Topic · Edit · Packaging</div>
              </div>
            </a>
          ))}
        </div>

        <h3 className="reveal" style={{ ...revealStyle, fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", margin: "64px 0 12px" }}>
          Same topic. Packaged differently.
        </h3>
        <p className="reveal" style={{ ...revealStyle, fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", marginBottom: "28px", maxWidth: "620px" }}>
          Quam made a video on self-sabotage before working with us. We chose the topic again, edited it and repackaged it: a title that speaks to the viewer, and one word on the thumbnail you can read in a feed.
        </p>
        <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "20px" }}>
          {[
            ["cOL7PcCTLeY", "Before", "stop self sabotaging", "1.6K"],
            ["j6bBG2VwGbk", "With EarnedReach", "you're ruining your life (and you know it)", "17K"],
          ].map(([id, label, title, views], i) => (
            <a key={id} className="reveal" href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" style={{ ...revealStyle, transitionDelay: `${i * 0.1}s`, display: "block", textDecoration: "none", background: "rgba(255,255,255,0.04)", border: `1px solid ${i ? "rgba(107,159,255,0.35)" : "rgba(255,255,255,0.07)"}`, borderRadius: "16px", overflow: "hidden" }}>
              <img src={`/work/${id}.jpg`} alt={title} loading="lazy" style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block" }} />
              <div style={{ padding: "16px 18px 18px" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: i ? "#9ACBF5" : "rgba(255,255,255,0.45)", marginBottom: "8px" }}>{label}</div>
                <div style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff" }}>{views} <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.5)", letterSpacing: 0 }}>views</span></div>
                <p style={{ fontSize: "14px", lineHeight: 1.5, color: "rgba(255,255,255,0.7)", margin: "6px 0 0" }}>{title}</p>
              </div>
            </a>
          ))}
        </div>
        <p className="reveal" style={{ ...revealStyle, fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", marginTop: "28px", maxWidth: "620px" }}>
          Across the channel, his typical long-form video went from about 1,600 views before working with us to 17,000 with us.
        </p>
        <p className="reveal" style={{ ...revealStyle, fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>
          Public YouTube view counts on 29 October 2026: his five long-form videos from May to September against our three from October. A small sample, and his older videos have had longer to collect views.
        </p>
      </section>

      {/* ── SAMPLE PACKAGE + FREE AUDIT ─────────────────────────────────── */}
      <section id="sample" style={{ position: "relative", zIndex: 1, padding: "100px 24px", maxWidth: "720px", margin: "0 auto" }}>
        <h2 className="reveal" style={{ ...revealStyle, fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff", marginBottom: "16px" }}>
          What we hand over before a video goes out
        </h2>
        <p className="reveal" style={{ ...revealStyle, fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", marginBottom: "40px" }}>
          A sample package for one of our client Quam's videos. It went out without packaging and did half his usual views. This is what we'd hand over before posting it.
        </p>
        <div className="reveal sample-grid" style={{ ...revealStyle, display: "grid", gridTemplateColumns: "minmax(0, 200px) 1fr", gap: "28px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "28px", transitionDelay: "0.1s" }}>
          <img src="/sample-cover.jpg" alt="Sample cover: 100K VS 200K" style={{ width: "100%", borderRadius: "12px", display: "block" }} />
          <div style={{ display: "grid", gap: "18px", alignContent: "start" }}>
            {[
              ["Title", "I play dumb on purpose. It makes me more money"],
              ["Hook (first 3 seconds)", "Open on his own line from 0:39: \"The difference between a 100k and a 200k month could be down to the fact that you didn't listen.\" The original opened on a slow wind-up."],
              ["Why", "His biggest video makes the same argument, that being the smart one costs you, and did 73× his usual views. His winners open with a blunt claim, not scene-setting."],
              ["Flag", "No cuts in two minutes, and one point repeated for 30 seconds. Tightening that would help more than any title."],
            ].map(([label, text]) => (
              <div key={label}>
                <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ACBF5", marginBottom: "6px" }}>{label}</div>
                <p style={{ fontSize: "15px", lineHeight: 1.6, color: "rgba(255,255,255,0.75)", margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="reveal" style={{ ...revealStyle, fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>
          A sample of our method, not a result.
        </p>

        <div className="reveal" style={{ ...revealStyle, marginTop: "64px", textAlign: "center", border: "1px solid rgba(107,159,255,0.25)", background: "rgba(107,159,255,0.06)", borderRadius: "20px", padding: "40px 28px" }}>
          <h3 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", marginBottom: "14px" }}>
            Get a free audit
          </h3>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: "520px", margin: "0 auto 28px" }}>
            Send us your channel and we'll show you what's working and what to change. No call needed.
          </p>
          <a href="mailto:hello@earnedreach.org?subject=Free%20audit&body=My%20channel%3A%20" style={{ display: "inline-flex", padding: "14px 30px", borderRadius: "999px", background: "linear-gradient(135deg, #3b6fff 0%, #2250e0 100%)", color: "#fff", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>
            Request my audit ↗
          </a>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "100px 24px",
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        {/* Eyebrow */}
        <div
          className="reveal"
          style={{
            ...revealStyle,
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 14px",
            borderRadius: "999px",
            border: "1px solid rgba(107,159,255,0.3)",
            background: "rgba(107,159,255,0.08)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#9ACBF5",
            marginBottom: "28px",
          }}
        >
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#9ACBF5", display: "inline-block" }} />
          The Process
        </div>

        <h2
          className="reveal"
          style={{
            ...revealStyle,
            fontSize: "clamp(32px, 6vw, 52px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#fff",
            marginBottom: "64px",
            transitionDelay: "0.1s",
          }}
        >
          How it works
        </h2>

        {/* Steps */}
        {[
          {
            num: "01",
            title: "One onboarding call",
            body: "We learn your business, your audience and what you're trying to say, and map the topics. It's the only meeting you need to prepare for.",
          },
          {
            num: "02",
            title: "You film, we do the rest",
            body: "Turn up on filming days. Editing, packaging, posting and repurposing all happen without you. No edits to approve.",
          },
          {
            num: "03",
            title: "The breakdown lands every month",
            body: "What went out, what worked and why, who it reached, the doors it opened, and what changes next month. The content gets sharper every month.",
          },
        ].map((step, i) => (
          <div
            key={step.num}
            className="reveal"
            style={{
              ...revealStyle,
              display: "grid",
              gridTemplateColumns: "56px 1fr",
              gap: "24px",
              marginBottom: i < 2 ? "48px" : "0",
              transitionDelay: `${0.15 + i * 0.12}s`,
            }}
          >
            {/* Number + line */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "1px solid rgba(107,159,255,0.35)",
                  background: "rgba(107,159,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#9ACBF5",
                  letterSpacing: "0.04em",
                  flexShrink: 0,
                }}
              >
                {step.num}
              </div>
              {i < 2 && (
                <div
                  style={{
                    width: "1px",
                    flex: 1,
                    minHeight: "40px",
                    background: "linear-gradient(to bottom, rgba(107,159,255,0.25), transparent)",
                    marginTop: "8px",
                  }}
                />
              )}
            </div>
            {/* Text */}
            <div style={{ paddingTop: "10px" }}>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#fff",
                  marginBottom: "10px",
                  letterSpacing: "-0.02em",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* ── WHO IT'S FOR / FOUNDING CLIENTS / FAQ ───────────────────────── */}
      <section id="who-its-for" style={{ position: "relative", zIndex: 1, padding: "100px 24px", maxWidth: "720px", margin: "0 auto" }}>
        <h2 className="reveal" style={{ ...revealStyle, fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff", marginBottom: "40px" }}>
          Two kinds of founder
        </h2>
        {[
          ["You need to be seen and trusted.", "Leads already come in, but when a prospect looks you up, they find nothing, or something that doesn't match you. And some content isn't meant to sell: it gets you the invite, the collab, the intro.", "When a prospect looks you up, on Instagram, YouTube, LinkedIn or Google, would what they find help close them?"],
          ["You need content that brings in clients.", "Views aren't the goal; enquiries are. Each client is worth a lot to you, so one new client a month from your content makes a real difference. And when they reach out, you're ready to take the call.", "If your content brought in one extra client a month, would that change your year?"],
        ].map(([title, body, test], i) => (
          <div key={title} className="reveal" style={{ ...revealStyle, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "28px", marginBottom: "16px", transitionDelay: `${0.1 + i * 0.1}s` }}>
            <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#9ACBF5", marginBottom: "10px", letterSpacing: "-0.02em" }}>{title}</h3>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", marginBottom: "12px" }}>{body}</p>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#fff", fontStyle: "italic", margin: 0 }}>Ask yourself: {test}</p>
          </div>
        ))}
        <p className="reveal" style={{ ...revealStyle, fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.45)", marginTop: "8px" }}>
          Not a fit: brands that run on paid ads, founders who want to approve every edit, and anyone after guaranteed follower numbers.
        </p>

        <div className="reveal" style={{ ...revealStyle, marginTop: "80px", background: "linear-gradient(135deg, rgba(59,90,255,0.14) 0%, rgba(10,14,40,0.85) 70%)", border: "1px solid rgba(107,159,255,0.25)", borderRadius: "20px", padding: "36px" }}>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", marginBottom: "14px" }}>
            2 founding client spots left
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", marginBottom: "24px" }}>
            We're taking on three founding clients, and one spot is taken. In return, you agree to a case study and a short testimonial video once the results are in. Minimum three months, because that's how long a real trend takes to show.
          </p>
          <a href="https://tally.so/r/PdgPKP" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", padding: "14px 30px", borderRadius: "999px", background: "linear-gradient(135deg, #3b6fff 0%, #2250e0 100%)", color: "#fff", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>
            Apply for a spot ↗
          </a>
        </div>

        <h2 className="reveal" style={{ ...revealStyle, fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", margin: "80px 0 32px" }}>
          Questions
        </h2>
        {[
          ["Do I approve every edit?", "No. You stay out of the process. David reviews every piece before it goes out."],
          ["Do you run ads?", "Never. Reach earned, not bought."],
          ["What do I actually have to do?", "One onboarding call, then turn up on filming days."],
          ["How much does it cost?", "It depends on what you need. We'll talk it through on the call."],
          ["Can you guarantee followers or views?", "No, and be wary of anyone who does. We show you exactly what each piece did, every month."],
        ].map(([q, a]) => (
          <details key={q} className="reveal" style={{ ...revealStyle, borderTop: "1px solid rgba(255,255,255,0.08)", padding: "20px 0" }}>
            <summary style={{ fontSize: "17px", fontWeight: 600, color: "#fff", cursor: "pointer" }}>{q}</summary>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", margin: "12px 0 0" }}>{a}</p>
          </details>
        ))}
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "80px 24px 100px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Glow behind CTA */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(59,100,255,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <p
          className="reveal"
          style={{
            ...revealStyle,
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#fff",
            marginBottom: "12px",
            lineHeight: 1.15,
            position: "relative",
          }}
        >
          Ready to be seen by{" "}
          <span style={{ color: "#9ACBF5" }}>the right people?</span>
        </p>
        <p
          className="reveal"
          style={{
            ...revealStyle,
            fontSize: "16px",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "40px",
            transitionDelay: "0.1s",
            position: "relative",
          }}
        >
          Book a call and we'll work out whether EarnedReach fits.
        </p>
        <a
          className="reveal"
          href="https://tally.so/r/PdgPKP"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...revealStyle,
            display: "inline-flex",
            alignItems: "center",
            padding: "18px 44px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #3b6fff 0%, #2250e0 100%)",
            color: "#fff",
            fontSize: "17px",
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.2s ease",
            boxShadow: "0 0 40px rgba(59,111,255,0.5), 0 4px 20px rgba(0,0,0,0.3)",
            transitionDelay: "0.2s",
            position: "relative",
            letterSpacing: "-0.01em",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(59,111,255,0.7), 0 4px 20px rgba(0,0,0,0.3)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(59,111,255,0.5), 0 4px 20px rgba(0,0,0,0.3)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          Book a call ↗
        </a>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "60px 24px 40px",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          {/* Top row: brand + tagline */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "32px",
              marginBottom: "48px",
            }}
          >
            {/* Brand */}
            <div>
              <img
                src="/er-logo.png"
                alt="EarnedReach"
                style={{
                  width: "48px",
                  height: "48px",
                  objectFit: "contain",
                  marginBottom: "8px",
                  display: "block",
                }}
              />
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.4)",
                  maxWidth: "240px",
                  lineHeight: 1.6,
                }}
              >
                Your story, seen by the right eyes.
              </p>
            </div>

            {/* Links grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "40px",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
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
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "14px",
                      padding: "5px 0",
                      textAlign: "left",
                      transition: "color 0.2s",
                      letterSpacing: "-0.01em",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: "16px",
                  }}
                >
                  Connect
                </p>
                {[
                  { label: "Get Started ↗", href: "https://tally.so/r/PdgPKP", external: true },
                  { label: "Instagram ↗", href: "https://www.instagram.com/EarnedReach", external: true },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    style={{
                      display: "block",
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "14px",
                      padding: "5px 0",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      letterSpacing: "-0.01em",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.01em" }}>
              © 2026 EarnedReach. All rights reserved.
            </p>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.02em" }}>
              hello@earnedreach.org
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
