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
    title: "The Founder Series",
    tag: "Brand Film",
    body: "A six-part documentary series following a SaaS founder from zero to their first £100k month. Raw, cinematic, and built to convert.",
    link: "#",
  },
  {
    title: "MOF Content Sprint",
    tag: "Content System",
    body: "We rebuilt a coaching brand's entire content funnel in 30 days. The result: 3x saves, 2x DMs, and a fully booked calendar.",
    link: "#",
  },
  {
    title: "The Origin Story",
    tag: "Brand Film",
    body: "A single 90-second film that told a founder's story better than two years of posting ever had. Still running as a paid ad today.",
    link: "#",
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

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="services" style={{ ...sectionStyle(), zIndex: 1 }}>
        <h2
          className="reveal"
          style={{
            ...revealStyle,
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#6b9fff",
            marginBottom: "40px",
            lineHeight: 1.15,
          }}
        >
          Work directly with<br />the founders of EarnedReach
        </h2>

        <div className="reveal" style={{ ...revealStyle, transitionDelay: "0.1s" }}>
          <SwipeCards
            items={SERVICES}
            renderCard={(service, i) => (
              <div
                key={i}
                style={{
                  minWidth: "100%",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "20px",
                  padding: "32px",
                  flexShrink: 0,
                  boxSizing: "border-box",
                }}
              >
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    marginBottom: "12px",
                    color: "#fff",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.55)",
                    marginBottom: "32px",
                  }}
                >
                  {service.body}
                </p>
                <div
                  style={{
                    borderRadius: "14px",
                    overflow: "hidden",
                    height: "260px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.2)",
                  }}
                >
                  <img
                    src={service.img}
                    alt={service.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    draggable={false}
                  />
                </div>
              </div>
            )}
          />
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" style={{ ...sectionStyle(), zIndex: 1 }}>
        <h2
          className="reveal"
          style={{
            ...revealStyle,
            fontSize: "clamp(40px, 8vw, 80px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#6b9fff",
            marginBottom: "48px",
            lineHeight: 1.0,
          }}
        >
          Projects
        </h2>

        <div className="reveal" style={{ ...revealStyle, transitionDelay: "0.1s" }}>
          <SwipeCards
            items={PROJECTS}
            renderCard={(project, i) => (
              <div
                key={i}
                style={{
                  minWidth: "100%",
                  flexShrink: 0,
                  boxSizing: "border-box",
                  paddingBottom: "8px",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: "8px",
                  }}
                >
                  {project.tag}
                </p>
                <h3
                  style={{
                    fontSize: "clamp(28px, 6vw, 48px)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: "#fff",
                    marginBottom: "16px",
                    lineHeight: 1.1,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.55)",
                    marginBottom: "20px",
                    maxWidth: "520px",
                  }}
                >
                  {project.body}
                </p>
                <a
                  href={project.link}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "15px",
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 500,
                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                    paddingBottom: "2px",
                  }}
                >
                  See full project <span style={{ fontSize: "18px" }}>↗</span>
                </a>
                <div
                  style={{
                    marginTop: "24px",
                    height: "1px",
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
              </div>
            )}
          />
        </div>
      </section>

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
