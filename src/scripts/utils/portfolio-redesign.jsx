import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#050810",
  surface: "#0d1117",
  card: "#111827",
  border: "#1f2937",
  green: "#00ff88",
  cyan: "#38bdf8",
  purple: "#a78bfa",
  text: "#e2e8f0",
  muted: "#64748b",
  accent: "#f59e0b",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@400;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: ${COLORS.bg};
    color: ${COLORS.text};
    font-family: 'Syne', sans-serif;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.green}; border-radius: 2px; }

  .mono { font-family: 'JetBrains Mono', monospace; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes pulse-glow {
    0%,100% { box-shadow: 0 0 8px ${COLORS.green}44; }
    50% { box-shadow: 0 0 24px ${COLORS.green}88, 0 0 48px ${COLORS.green}22; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes countUp {
    from { opacity: 0; transform: scale(0.5); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }

  .fade-up { animation: fadeUp 0.7s ease forwards; }

  .glow-green { text-shadow: 0 0 20px ${COLORS.green}88; }
  .glow-cyan { text-shadow: 0 0 20px ${COLORS.cyan}88; }

  .badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 12px; border-radius: 4px; font-size: 11px;
    font-family: 'JetBrains Mono', monospace; font-weight: 500;
    letter-spacing: 0.05em; transition: all 0.2s;
  }
  .badge:hover { transform: translateY(-2px); }

  .section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.2em;
    color: ${COLORS.green}; text-transform: uppercase;
    margin-bottom: 8px; display: flex; align-items: center; gap: 8px;
  }
  .section-label::before { content:''; width:24px; height:1px; background:${COLORS.green}; }

  .card-hover {
    transition: all 0.3s ease;
    border: 1px solid ${COLORS.border};
  }
  .card-hover:hover {
    border-color: ${COLORS.green}44;
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0,255,136,0.08);
  }

  .skill-pill {
    padding: 6px 14px; border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; font-weight: 500;
    border: 1px solid; transition: all 0.2s;
    cursor: default;
  }
  .skill-pill:hover { transform: scale(1.05); }

  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(5,8,16,0.85); backdrop-filter: blur(20px);
    border-bottom: 1px solid ${COLORS.border};
    padding: 16px 48px; display: flex; align-items: center; justify-content: space-between;
  }

  nav a {
    font-family: 'JetBrains Mono', monospace; font-size: 12px;
    color: ${COLORS.muted}; text-decoration: none; letter-spacing: 0.1em;
    transition: color 0.2s; text-transform: uppercase;
  }
  nav a:hover { color: ${COLORS.green}; }

  .terminal-window {
    background: #0d1117; border: 1px solid #21262d;
    border-radius: 12px; overflow: hidden;
    box-shadow: 0 0 60px rgba(0,255,136,0.06), 0 40px 80px rgba(0,0,0,0.6);
  }
  .terminal-bar {
    background: #161b22; padding: 12px 16px;
    display: flex; align-items: center; gap: 8px;
  }
  .dot { width: 12px; height: 12px; border-radius: 50%; }

  .status-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: ${COLORS.green};
    animation: pulse-glow 2s infinite;
    display: inline-block;
  }

  .progress-bar-bg {
    background: ${COLORS.border}; border-radius: 2px; height: 3px; overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%; border-radius: 2px;
    transition: width 1.5s cubic-bezier(0.4,0,0.2,1);
  }

  section { min-height: 100vh; padding: 120px 0; }

  .container { max-width: 1100px; margin: 0 auto; padding: 0 48px; }

  @media (max-width: 768px) {
    .container { padding: 0 24px; }
    nav { padding: 16px 24px; }
    nav .nav-links { display: none; }
  }
`;

// ─── Typing animation ─────────────────────────────────────────────
function TypeWriter({ texts, speed = 80 }) {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        } else {
          setDeleting(false);
          setTextIdx(i => (i + 1) % texts.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed]);

  return (
    <span style={{ color: COLORS.green, fontFamily: "'JetBrains Mono', monospace" }}>
      {displayed}<span style={{ animation: "blink 1s infinite" }}>▋</span>
    </span>
  );
}

// ─── Counter animation ─────────────────────────────────────────────
function AnimatedNumber({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          start = Math.min(start + step, target);
          setVal(Math.round(start));
          if (start >= target) clearInterval(timer);
        }, 30);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Grid background ───────────────────────────────────────────────
function GridBg() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
      backgroundImage: `
        linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
    }} />
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <>
      <style>{styles}</style>
      <GridBg />

      {/* NAV */}
      <nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="status-dot" />
          <span className="mono" style={{ fontSize: 13, color: COLORS.green, fontWeight: 700 }}>
            SA<span style={{ color: COLORS.muted }}>.dev</span>
          </span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 32 }}>
          {navItems.map(n => (
            <a key={n.id} href={`#${n.id}`}
              onClick={e => { e.preventDefault(); scrollTo(n.id); }}
              style={{ color: active === n.id ? COLORS.green : COLORS.muted }}
            >{n.label}</a>
          ))}
        </div>
        <a href="mailto:alatorre.sebastian@uabc.edu.mx"
          style={{
            background: "transparent", border: `1px solid ${COLORS.green}`,
            color: COLORS.green, padding: "8px 20px", borderRadius: 4,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            letterSpacing: "0.1em", cursor: "pointer", textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = COLORS.green; e.currentTarget.style.color = COLORS.bg; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.green; }}
        >
          HIRE_ME
        </a>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section id="home" style={{ display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        {/* Radial glow */}
        <div style={{
          position: "absolute", top: "20%", right: "5%",
          width: 500, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.green}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* LEFT */}
          <div style={{ animation: "fadeUp 0.8s ease forwards" }}>
            <div className="section-label" style={{ marginBottom: 24 }}>
              Available for hire
            </div>

            <h1 style={{
              fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1,
              marginBottom: 16, letterSpacing: "-0.02em",
            }}>
              Sebastian<br />
              <span style={{
                background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.cyan})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Alatorre</span>
            </h1>

            <div style={{ marginBottom: 32, height: 28, fontSize: 18, fontWeight: 600 }}>
              <TypeWriter texts={[
                "SDET · QA Automation",
                "Playwright · Cypress · K6",
                "CI/CD Pipeline Design",
                "Test Strategy Architect",
              ]} />
            </div>

            <p style={{
              color: COLORS.muted, lineHeight: 1.8, fontSize: 15, marginBottom: 40,
              maxWidth: 460,
            }}>
              Software Development Engineer in Test with a CS degree and a genuine passion
              for software quality. I turn testing from a bottleneck into a competitive advantage.
            </p>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 40, marginBottom: 48 }}>
              {[
                { val: 3, suffix: "+", label: "Years Experience" },
                { val: 300, suffix: "+", label: "Test Cases Automated" },
                { val: 4, suffix: "x", label: "Regression Speed" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{
                    fontSize: 32, fontWeight: 800, lineHeight: 1,
                    color: COLORS.green, fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    <AnimatedNumber target={s.val} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 16 }}>
              <button
                onClick={() => scrollTo("projects")}
                style={{
                  padding: "14px 32px", background: COLORS.green, color: COLORS.bg,
                  border: "none", borderRadius: 4, fontFamily: "'Syne', sans-serif",
                  fontWeight: 700, fontSize: 14, cursor: "pointer",
                  transition: "all 0.2s", letterSpacing: "0.05em",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${COLORS.green}44`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              >View Projects →</button>

              <button
                onClick={() => scrollTo("contact")}
                style={{
                  padding: "14px 32px", background: "transparent", color: COLORS.text,
                  border: `1px solid ${COLORS.border}`, borderRadius: 4,
                  fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14,
                  cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.muted; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; }}
              >Get in Touch</button>
            </div>
          </div>

          {/* RIGHT — Terminal */}
          <div style={{ animation: "fadeUp 0.8s 0.2s ease both" }}>
            <div className="terminal-window">
              <div className="terminal-bar">
                <div className="dot" style={{ background: "#ff5f57" }} />
                <div className="dot" style={{ background: "#febc2e" }} />
                <div className="dot" style={{ background: "#28c840" }} />
                <span className="mono" style={{ marginLeft: 12, fontSize: 12, color: COLORS.muted }}>
                  hire-sebastian-alatorre.spec.ts
                </span>
                <span style={{ marginLeft: "auto", fontSize: 10, color: "#28c840" }}>● PASS</span>
              </div>
              <div style={{ padding: "24px 28px" }}>
                {[
                  { t: 0.0, color: COLORS.muted, text: "import { test, expect } from '@playwright/test';" },
                  { t: 0.1, color: COLORS.muted, text: "" },
                  { t: 0.2, color: COLORS.cyan, text: "test('Hire Sebastian?', async ({ page }) => {" },
                  { t: 0.3, color: COLORS.muted, text: "  // ✓ Passionate about quality" },
                  { t: 0.4, color: "#a78bfa", text: "  await page.goto('/profile');" },
                  { t: 0.5, color: COLORS.muted, text: "  // ✓ Strong automation toolkit" },
                  { t: 0.6, color: "#a78bfa", text: "  await page.click('#hire-me');" },
                  { t: 0.7, color: COLORS.muted, text: "  // ✓ Team player & communicator" },
                  { t: 0.8, color: "#a78bfa", text: "  const result = await page.evaluate(" },
                  { t: 0.85, color: "#a78bfa", text: "    () => candidate.value" },
                  { t: 0.9, color: "#a78bfa", text: "  );" },
                  { t: 1.0, color: COLORS.green, text: "  expect(result).toBe('exceptional');" },
                  { t: 1.1, color: COLORS.cyan, text: "});" },
                  { t: 1.2, color: "", text: "" },
                  { t: 1.3, color: COLORS.green, text: "  ✓ Candidate validated (8.2s)" },
                ].map((line, i) => (
                  <div key={i} className="mono" style={{
                    fontSize: 12, lineHeight: "22px", color: line.color || COLORS.muted,
                    opacity: 0, animation: `fadeUp 0.4s ${line.t + 0.5}s ease forwards`,
                    whiteSpace: "pre",
                  }}>
                    {line.text || "\u00a0"}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────── */}
      <section id="experience" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="container">
          <div className="section-label">Work History</div>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 60, letterSpacing: "-0.02em" }}>
            Experience
          </h2>

          <div style={{ position: "relative", paddingLeft: 32 }}>
            {/* timeline line */}
            <div style={{
              position: "absolute", left: 0, top: 8, bottom: 8,
              width: 1, background: `linear-gradient(to bottom, ${COLORS.green}, ${COLORS.green}00)`,
            }} />

            {/* Job card */}
            <div style={{
              position: "absolute", left: -5, top: 8,
              width: 11, height: 11, borderRadius: "50%",
              background: COLORS.green,
              boxShadow: `0 0 12px ${COLORS.green}`,
            }} />

            <div className="card-hover" style={{
              background: COLORS.card, borderRadius: 12, padding: 36,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>QA Tester</h3>
                  <div style={{ color: COLORS.cyan, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
                    Software Development Department · UABC
                  </div>
                </div>
                <div className="badge" style={{ background: `${COLORS.green}15`, color: COLORS.green, border: `1px solid ${COLORS.green}30` }}>
                  <span className="status-dot" style={{ width: 6, height: 6 }} />
                  02/2023 — Present
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { icon: "⚡", text: "Develop & execute test scripts using Selenium, Cypress, and Playwright (POM pattern)" },
                  { icon: "🔗", text: "Collaborate with developers to align testing with project requirements" },
                  { icon: "📊", text: "Perform functional and performance testing with K6" },
                  { icon: "🚀", text: "Design CI/CD pipelines to automate and accelerate testing cycles" },
                  { icon: "🐛", text: "Document findings, report bugs, and ensure product quality standards" },
                  { icon: "🎯", text: "Design effective tests based on project requirements and risk analysis" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 12, alignItems: "flex-start",
                    padding: 16, borderRadius: 8, background: `${COLORS.bg}80`,
                    border: `1px solid ${COLORS.border}`,
                  }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.6 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────── */}
      <section id="skills" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="container">
          <div className="section-label">Tech Arsenal</div>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 60, letterSpacing: "-0.02em" }}>
            Technical Skills
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {/* Testing Frameworks */}
            <SkillBlock
              title="Testing Frameworks"
              icon="🧪"
              items={[
                { name: "Playwright", color: COLORS.green, level: 90 },
                { name: "Cypress", color: COLORS.cyan, level: 85 },
                { name: "Selenium", color: COLORS.accent, level: 80 },
                { name: "K6", color: COLORS.purple, level: 75 },
              ]}
            />

            {/* Programming Languages */}
            <SkillBlock
              title="Languages"
              icon="💻"
              items={[
                { name: "TypeScript", color: COLORS.cyan, level: 82 },
                { name: "JavaScript", color: COLORS.accent, level: 85 },
                { name: "Java", color: "#f97316", level: 72 },
                { name: "Python", color: COLORS.green, level: 68 },
              ]}
            />

            {/* Tools */}
            <div className="card-hover" style={{ background: COLORS.card, borderRadius: 12, padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 20 }}>🛠</span>
                <span style={{ fontWeight: 700, fontSize: 16 }}>Tools & Practices</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { n: "API Testing", c: COLORS.green },
                  { n: "Git", c: COLORS.cyan },
                  { n: "Jira", c: COLORS.purple },
                  { n: "CI/CD Pipelines", c: COLORS.accent },
                  { n: "SQL Queries", c: "#f97316" },
                  { n: "MantisBT", c: COLORS.green },
                  { n: "POM Pattern", c: COLORS.cyan },
                ].map(t => (
                  <span key={t.n} className="skill-pill"
                    style={{ color: t.c, borderColor: `${t.c}40`, background: `${t.c}10` }}>
                    {t.n}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="card-hover" style={{ background: COLORS.card, borderRadius: 12, padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 20 }}>🤝</span>
                <span style={{ fontWeight: 700, fontSize: 16 }}>Soft Skills</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  "Agile Methodology", "Attention to Detail", "Communication",
                  "Team Collaboration", "Adaptability", "Continuous Learning",
                  "UX Focus", "Detailed Reporting",
                ].map(s => (
                  <span key={s} className="skill-pill"
                    style={{ color: COLORS.muted, borderColor: COLORS.border, background: `${COLORS.muted}10` }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────── */}
      <section id="projects" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="container">
          <div className="section-label">Work Showcase</div>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 60, letterSpacing: "-0.02em" }}>
            Projects
          </h2>

          <div className="card-hover" style={{
            background: COLORS.card, borderRadius: 16, overflow: "hidden",
            border: `1px solid ${COLORS.border}`,
          }}>
            {/* top accent */}
            <div style={{ height: 3, background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.cyan}, ${COLORS.purple})` }} />
            <div style={{ padding: 40 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24, marginBottom: 24 }}>
                <div>
                  <div className="section-label" style={{ marginBottom: 8 }}>Featured Project</div>
                  <h3 style={{ fontSize: 26, fontWeight: 800 }}>Full Automation Testing Framework</h3>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 36 }}>🎭</span>
                </div>
              </div>

              <p style={{ color: COLORS.muted, lineHeight: 1.8, fontSize: 15, marginBottom: 28, maxWidth: 600 }}>
                End-to-end, API and performance testing framework. Includes E2E with Playwright &
                Cypress, UI with Selenium, load testing with K6, and full CI/CD pipeline integration
                with automated reporting and Slack notifications.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                {[
                  { n: "Playwright", c: COLORS.green },
                  { n: "Cypress", c: COLORS.cyan },
                  { n: "Selenium", c: COLORS.accent },
                  { n: "K6", c: COLORS.purple },
                  { n: "CI/CD", c: "#f97316" },
                  { n: "TypeScript", c: COLORS.cyan },
                ].map(t => (
                  <span key={t.n} className="badge"
                    style={{ color: t.c, background: `${t.c}15`, border: `1px solid ${t.c}30` }}>
                    {t.n}
                  </span>
                ))}
              </div>

              {/* Mini stats */}
              <div style={{ display: "flex", gap: 32, marginBottom: 36, paddingTop: 24, borderTop: `1px solid ${COLORS.border}` }}>
                {[
                  { label: "Test Types", val: "E2E · API · Load" },
                  { label: "Frameworks", val: "4 integrated" },
                  { label: "Pipeline", val: "Fully automated" },
                ].map(s => (
                  <div key={s.label}>
                    <div className="mono" style={{ fontSize: 12, color: COLORS.muted, marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.green }}>{s.val}</div>
                  </div>
                ))}
              </div>

              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "12px 28px", borderRadius: 6,
                  background: "transparent", border: `1px solid ${COLORS.green}`,
                  color: COLORS.green, textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500,
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = COLORS.green; e.currentTarget.style.color = COLORS.bg; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.green; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                View on GitHub →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ────────────────────────────────────────────── */}
      <section id="education" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="container">
          <div className="section-label">Academic Background</div>
          <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 60, letterSpacing: "-0.02em" }}>
            Education & Languages
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {/* Education */}
            <div className="card-hover" style={{ background: COLORS.card, borderRadius: 12, padding: 32 }}>
              <div style={{ marginBottom: 20 }}>
                <span className="badge" style={{ background: `${COLORS.cyan}15`, color: COLORS.cyan, border: `1px solid ${COLORS.cyan}30`, marginBottom: 16, display: "inline-flex" }}>
                  🎓 2024
                </span>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>B.Sc. in Computer Science</h3>
                <div style={{ color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
                  Universidad Autónoma de Baja California
                </div>
              </div>
              <div style={{
                padding: "16px", borderRadius: 8,
                background: `${COLORS.bg}80`, border: `1px solid ${COLORS.border}`,
                fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: COLORS.muted,
              }}>
                <div style={{ color: COLORS.green, marginBottom: 8 }}>// Relevant coursework</div>
                <div>Software Engineering · Data Structures</div>
                <div>Algorithms · Database Systems</div>
                <div>Software Quality Assurance</div>
              </div>
            </div>

            {/* Languages */}
            <div className="card-hover" style={{ background: COLORS.card, borderRadius: 12, padding: 32 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Languages</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { lang: "Spanish", level: "Native", pct: 100, color: COLORS.green },
                  { lang: "English", level: "C1 CEFR · Intermediate-Advanced", pct: 82, color: COLORS.cyan },
                ].map(l => (
                  <div key={l.lang}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontWeight: 600 }}>{l.lang}</span>
                      <span className="badge" style={{ background: `${l.color}15`, color: l.color, border: `1px solid ${l.color}30`, fontSize: 11 }}>
                        {l.level}
                      </span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill"
                        style={{ width: `${l.pct}%`, background: `linear-gradient(90deg, ${l.color}, ${l.color}88)` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Let's connect</div>
            <h2 style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.02em" }}>
              Get in <span style={{ color: COLORS.green }}>Touch</span>
            </h2>
            <p style={{ color: COLORS.muted, marginTop: 16, fontSize: 16 }}>
              Open to new opportunities and collaborations
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 32 }}>
            {[
              { icon: "📍", label: "Location", val: "Ensenada, Baja California, México" },
              { icon: "📱", label: "Phone", val: "+52-646-1979390" },
              { icon: "✉️", label: "Email", val: "alatorre.sebastian@uabc.edu.mx" },
            ].map(c => (
              <div key={c.label} className="card-hover" style={{
                background: COLORS.card, borderRadius: 12, padding: 24, textAlign: "center",
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
                <div className="mono" style={{ fontSize: 11, color: COLORS.muted, letterSpacing: "0.15em", marginBottom: 8 }}>
                  {c.label.toUpperCase()}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{c.val}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            {[
              { label: "GitHub", icon: "⌥", href: "https://github.com" },
              { label: "LinkedIn", icon: "in", href: "https://linkedin.com" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "14px 40px", borderRadius: 8,
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  color: COLORS.text, textDecoration: "none",
                  fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 15,
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.green; e.currentTarget.style.color = COLORS.green; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.text; }}
              >
                <span className="mono" style={{ fontSize: 16 }}>{s.icon}</span>
                {s.label}
              </a>
            ))}
          </div>

          <div style={{
            textAlign: "center", marginTop: 80,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: COLORS.border,
          }}>
            © 2025 Sebastian Alatorre · Built with passion for quality
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Skill block with progress bars ───────────────────────────────
function SkillBlock({ title, icon, items }) {
  return (
    <div className="card-hover" style={{ background: COLORS.card, borderRadius: 12, padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={{ fontWeight: 700, fontSize: 16 }}>{title}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {items.map(item => (
          <div key={item.name}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span className="mono" style={{ fontSize: 13, color: item.color }}>{item.name}</span>
              <span className="mono" style={{ fontSize: 11, color: COLORS.muted }}>{item.level}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill"
                style={{ width: `${item.level}%`, background: `linear-gradient(90deg, ${item.color}, ${item.color}66)` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
