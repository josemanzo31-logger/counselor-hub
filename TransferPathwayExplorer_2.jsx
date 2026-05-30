import { useState } from "react";

const pathways = {
  CSU: {
    label: "California State University",
    short: "CSU",
    color: "#1B4F8A",
    accent: "#FFD700",
    emoji: "🏛️",
    tagline: "Career-focused degrees across 23 campuses statewide",
    stats: [{ label: "Campuses", value: "23" }, { label: "Academic Programs", value: "1,800+" }, { label: "Avg. Cost/Year", value: "~$26K" }],
    gpa: "2.0 minimum (competitive varies by campus/major)",
    units: "60 transferable semester units",
    deadline: "October 1 – December 1 (Fall admission)",
    application: "calstate.edu/apply",
    ge: "CalGETC",
    assist: "Yes — use ASSIST.org for articulation",
    tips: [
      "Prioritize major preparation courses and CalGETC",
      "Apply to multiple campuses — acceptance varies widely",
      "Some impacted programs (Nursing, Business, Engineering) require higher GPA",
      "Associate Degree for Transfer (ADT) exists to provide guaranteed admission into 1 of the 23 CSU campuses",
      "Get support from the Transfer Center with any questions you may have!",
    ],
    campuses: ["CSU East Bay", "CSU San Francisco (SFSU)", "CSU San José (SJSU)", "Cal Poly SLO", "CSU Fresno", "CSU Sacramento", "Cal State LA", "CSU Long Beach", "CSU Fullerton", "San Diego State"],
    bestFor: "Students seeking professional/career-track degrees in business, education, nursing, engineering, social work, and the arts.",
  },
  UC: {
    label: "University of California",
    short: "UC",
    color: "#003B5C",
    accent: "#FDB515",
    emoji: "🔬",
    tagline: "World-class research universities — 9 undergraduate campuses",
    stats: [{ label: "Campuses", value: "9" }, { label: "Academic Programs", value: "800+" }, { label: "Avg. Cost/Year", value: "~$38K" }],
    gpa: "2.4 minimum (highly competitive — many campuses 3.5+)",
    units: "60 transferable semester units",
    deadline: "October 1 – December 1 (Fall admission)",
    application: "universityofcalifornia.edu/apply",
    ge: "CalGETC",
    assist: "Yes — ASSIST.org is essential for UC articulation",
    tips: [
      "Prioritize Major Preparation courses and 7 course pattern for General Education",
      "Create a UC TAP account and plan for TAG (Transfer Admission Guarantee) available at UC Davis, Irvine, Merced, Riverside, Santa Barbara, Santa Cruz",
      "Apply to UC by December 1st in last year of Community College",
      "Review Personal Insight Questions (PIQs) — Start them early",
      "Get support from the Transfer Center with any questions you may have!",
    ],
    campuses: ["UC Berkeley", "UC Los Angeles (UCLA)", "UC San Diego", "UC Davis", "UC Santa Barbara", "UC Irvine", "UC Santa Cruz", "UC Riverside", "UC Merced"],
    bestFor: "Students pursuing research, STEM, pre-med, pre-law, and competitive graduate school preparation.",
  },
  Private: {
    label: "Private / Independent Colleges",
    short: "Private",
    color: "#5B2D8E",
    accent: "#E8C84A",
    emoji: "🎓",
    tagline: "Smaller class sizes, generous aid, and unique academic cultures",
    stats: [{ label: "CA Colleges", value: "150+" }, { label: "Academic Programs", value: "Varies" }, { label: "Avg. Cost/Year", value: "~$60K*" }],
    gpa: "Varies widely — some are highly selective, others very accessible",
    units: "60 transferable units (varies by school)",
    deadline: "Varies — many have rolling admissions or November–February deadlines",
    application: "CommonApp.org or school-specific portals",
    ge: "Varies by institution — confirm with each college",
    assist: "Partial — use ASSIST.org where available; contact admissions for others",
    tips: [
      "Don't overlook private colleges — many offer substantial financial aid that lowers net cost",
      "Common App works for 1,000+ colleges including many California privates",
      "USC, Loyola Marymount, Santa Clara, and University of San Francisco are popular transfer destinations",
      "Small class sizes and faculty mentorship are major advantages",
      "Some private colleges offer guaranteed admission agreements with Cañada — ask your counselor",
    ],
    campuses: ["USC", "Loyola Marymount (LMU)", "Santa Clara University", "Univ. of San Francisco", "Dominican University", "Notre Dame de Namur", "Mills College (now Northeastern)", "Stanford (limited transfers)"],
    bestFor: "Students seeking personalized attention, specific programs not offered at public universities, or who qualify for significant need-based or merit aid.",
  },
  CCC: {
    label: "Stay & Complete at Cañada / CCC",
    short: "Degree/Certificate",
    color: "#1A6B3C",
    accent: "#90EE90",
    emoji: "🏫",
    tagline: "Earn additional certificates or an Associate's degree before or instead of transferring",
    stats: [{ label: "CA Colleges", value: "116" }, { label: "Programs & Certs", value: "200+" }, { label: "Avg. Cost/Year", value: "~$3K" }],
    gpa: "Varies by program — open access",
    units: "Varies — AA/AS typically 60 units, certificates 18–30 units",
    deadline: "Rolling — register each semester",
    application: "canadacollege.edu",
    ge: "AA/AS General Education Requirements or CalGETC",
    assist: "N/A — you are already here!",
    tips: [
      "Completing an AA-T or AS-T (Associate Degree for Transfer) guarantees admission to a CSU — your best transfer guarantee",
      "Earn a certificate in a high-demand field while completing transfer prep",
      "Financial aid (FAFSA/Dream Act) is available each year you attend",
      "See a counselor each semester — don't fly solo on your educational plan",
      "Take advantage of EOPS, TRIO, Puente, or Umoja for added support",
    ],
    campuses: ["Cañada College", "College of San Mateo", "Skyline College", "Any of 116 CA Community Colleges"],
    bestFor: "Students who want to strengthen their GPA, earn a certificate, complete an AA-T for guaranteed CSU admission, or take more time before transferring.",
  },
};

const keyDates = [
  { month: "Aug–Sep", event: "Start creating your CSU and UC application accounts", type: "prep" },
  { month: "Oct 1", event: "UC and CSU applications open for submission for Fall admissions", type: "csu" },
  { month: "Oct–Nov", event: "Meet with a counselor to finalize your SEP", type: "prep" },
  { month: "Dec 1", event: "CSU & UC Application DEADLINE", type: "deadline" },
  { month: "Jan–Feb", event: "Private college deadlines (varies)", type: "private" },
  { month: "Mar–Apr", event: "Admission decisions released", type: "decision" },
  { month: "May 1", event: "National Decision Day — commit to your college!", type: "decision" },
];

const quizQuestions = [
  {
    q: "What is your primary educational goal right now?",
    subtitle: "This is the most important question — be honest with yourself.",
    options: [
      { text: "🎖️ Earn a Certificate and enter the workforce quickly (under 2 years)", scores: { CSU: 0, UC: 0, Private: 0, CCC: 4 }, tag: "certificate" },
      { text: "📜 Complete an Associate's Degree (AA/AS) at Cañada or another CCC", scores: { CSU: 1, UC: 0, Private: 0, CCC: 4 }, tag: "associates" },
      { text: "🎓 Transfer and earn a Bachelor's Degree (4-year university)", scores: { CSU: 3, UC: 3, Private: 3, CCC: 1 }, tag: "bachelors" },
      { text: "🔬 Earn a Bachelor's and eventually a Master's or Doctoral Degree", scores: { CSU: 2, UC: 4, Private: 2, CCC: 0 }, tag: "graduate" },
    ],
  },
  {
    q: "Which area of study best matches your interests?",
    subtitle: "Don't stress if you're unsure — pick what feels closest to you.",
    options: [
      { text: "🔬 Science, Technology, Engineering & Health (STEM / Allied Health / Pre-Med)", scores: { CSU: 3, UC: 4, Private: 1, CCC: 2 }, tag: "stem" },
      { text: "🎨 Art, Design, Media & Performance (Fine Arts, Film, Music, Theater, Graphic Design)", scores: { CSU: 2, UC: 1, Private: 3, CCC: 2 }, tag: "arts" },
      { text: "💼 Business, Finance, Entrepreneurship & Marketing", scores: { CSU: 3, UC: 2, Private: 2, CCC: 1 }, tag: "business" },
      { text: "🧠 Human Behavior, Education, Social Sciences & Public Service (Psychology, Sociology, Teaching, Social Work)", scores: { CSU: 3, UC: 2, Private: 2, CCC: 1 }, tag: "humanics" },
    ],
  },
  {
    q: "What is your timeline for finishing your education?",
    subtitle: "Be realistic — life circumstances matter.",
    options: [
      { text: "⚡ As fast as possible — I need to start working in my field within 1–2 years", scores: { CSU: 0, UC: 0, Private: 0, CCC: 4 }, tag: "fast" },
      { text: "📅 I can take 2–3 more years if it means I'm fully prepared to transfer", scores: { CSU: 3, UC: 3, Private: 2, CCC: 2 }, tag: "medium" },
      { text: "🔄 I need flexibility — I'm balancing school with work and/or family responsibilities", scores: { CSU: 1, UC: 0, Private: 1, CCC: 4 }, tag: "flexible" },
      { text: "🏁 I'm committed for the long haul — I'll take as long as needed to reach my ultimate goal", scores: { CSU: 2, UC: 3, Private: 3, CCC: 1 }, tag: "longterm" },
    ],
  },
  {
    q: "What matters most to you when choosing where to go next?",
    subtitle: "There's no wrong answer — this is about your values.",
    options: [
      { text: "💰 Affordability and minimizing student debt", scores: { CSU: 2, UC: 1, Private: 1, CCC: 4 }, tag: "cost" },
      { text: "💼 Strong job placement and career connections in my industry", scores: { CSU: 3, UC: 1, Private: 2, CCC: 2 }, tag: "career" },
      { text: "🏆 Attending a well-known university with academic prestige", scores: { CSU: 1, UC: 4, Private: 2, CCC: 0 }, tag: "prestige" },
      { text: "🤝 A supportive environment with small classes and accessible faculty", scores: { CSU: 1, UC: 0, Private: 3, CCC: 3 }, tag: "support" },
    ],
  },
  {
    q: "Where do you imagine yourself after completing your education?",
    subtitle: "Think about your life, not just your career.",
    options: [
      { text: "🌉 Working in the Bay Area close to home and family", scores: { CSU: 2, UC: 2, Private: 2, CCC: 3 }, tag: "bayarea" },
      { text: "🌎 Open to living and working anywhere — I'll go where the opportunity is", scores: { CSU: 2, UC: 3, Private: 3, CCC: 1 }, tag: "anywhere" },
      { text: "🚀 Starting my own business, freelancing, or creating something new", scores: { CSU: 2, UC: 1, Private: 3, CCC: 2 }, tag: "entrepreneur" },
      { text: "📚 In graduate or professional school (law, medicine, teaching credential, etc.)", scores: { CSU: 2, UC: 4, Private: 2, CCC: 0 }, tag: "gradschool" },
    ],
  },
];

const tabs = ["🗺️ Explore Pathways", "⚡ Find My Match", "📅 Key Dates", "🔗 Resources"];

export default function TransferPathwayExplorer() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPathway, setSelectedPathway] = useState(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScores, setQuizScores] = useState({ CSU: 0, UC: 0, Private: 0, CCC: 0 });
  const [quizDone, setQuizDone] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);

  const [quizTags, setQuizTags] = useState([]);

  const handleQuizAnswer = (option) => {
    const newScores = { ...quizScores };
    Object.entries(option.scores).forEach(([k, v]) => { newScores[k] += v; });
    setQuizScores(newScores);
    setQuizAnswers([...quizAnswers, option.text]);
    setQuizTags([...quizTags, option.tag]);
    if (quizStep + 1 >= quizQuestions.length) {
      setQuizDone(true);
    } else {
      setQuizStep(quizStep + 1);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizScores({ CSU: 0, UC: 0, Private: 0, CCC: 0 });
    setQuizDone(false);
    setQuizAnswers([]);
    setQuizTags([]);
  };

  const topMatch = quizDone
    ? Object.entries(quizScores).sort((a, b) => b[1] - a[1])[0][0]
    : null;

  const sortedMatches = quizDone
    ? Object.entries(quizScores).sort((a, b) => b[1] - a[1])
    : [];

  const maxScore = sortedMatches[0]?.[1] || 1;

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f2337 0%, #1a3a5c 50%, #0f2337 100%)",
      color: "#f0f0f0",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #1B4F8A, #003B5C)",
        padding: "28px 32px 20px",
        borderBottom: "3px solid #FFD700",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#FFD700", marginBottom: 6, fontFamily: "sans-serif", textTransform: "uppercase" }}>
            CRER 401 · Cañada College · Summer 2026
          </div>
          <h1 style={{ margin: 0, fontSize: 30, fontWeight: "bold", color: "#fff", letterSpacing: -0.5 }}>
            Transfer Pathway Explorer
          </h1>
          <p style={{ margin: "6px 0 0", fontSize: 14, color: "#b8d4f0", fontFamily: "sans-serif" }}>
            Compare your options, find your match, and plan your transfer journey
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        background: "rgba(0,0,0,0.3)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 0 }}>
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => { setActiveTab(i); setSelectedPathway(null); }}
              style={{
                background: activeTab === i ? "rgba(255,215,0,0.15)" : "transparent",
                color: activeTab === i ? "#FFD700" : "#aaa",
                border: "none",
                borderBottom: activeTab === i ? "3px solid #FFD700" : "3px solid transparent",
                padding: "14px 20px",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "sans-serif",
                fontWeight: activeTab === i ? "bold" : "normal",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px" }}>

        {/* TAB 0: Explore Pathways */}
        {activeTab === 0 && !selectedPathway && (
          <div>
            <p style={{ fontFamily: "sans-serif", fontSize: 14, color: "#b8d4f0", marginTop: 0, marginBottom: 24 }}>
              Select a transfer pathway below to explore requirements, tips, and campus options.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {Object.entries(pathways).map(([key, p]) => (
                <button key={key} onClick={() => setSelectedPathway(key)}
                  style={{
                    background: `linear-gradient(135deg, ${p.color}cc, ${p.color}88)`,
                    border: `2px solid ${p.accent}44`,
                    borderRadius: 12,
                    padding: "24px 20px",
                    cursor: "pointer",
                    textAlign: "left",
                    color: "#fff",
                    transition: "all 0.2s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = p.accent; e.currentTarget.style.boxShadow = `0 8px 30px ${p.color}66`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = `${p.accent}44`; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>{p.emoji}</div>
                  <div style={{ fontFamily: "sans-serif", fontSize: 11, letterSpacing: 2, color: p.accent, marginBottom: 4, textTransform: "uppercase" }}>{p.short}</div>
                  <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>{p.label}</div>
                  <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#cce0ff", lineHeight: 1.5 }}>{p.tagline}</div>
                  <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                    {p.stats.map((s, i) => (
                      <div key={i} style={{ background: "rgba(0,0,0,0.25)", borderRadius: 6, padding: "6px 10px", textAlign: "center" }}>
                        <div style={{ fontSize: 16, fontWeight: "bold", color: p.accent }}>{s.value}</div>
                        <div style={{ fontFamily: "sans-serif", fontSize: 10, color: "#aaa" }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pathway Detail View */}
        {activeTab === 0 && selectedPathway && (() => {
          const p = pathways[selectedPathway];
          return (
            <div>
              <button onClick={() => setSelectedPathway(null)}
                style={{ background: "transparent", border: "1px solid #555", color: "#aaa", padding: "6px 14px", borderRadius: 6, cursor: "pointer", marginBottom: 20, fontFamily: "sans-serif", fontSize: 13 }}>
                ← Back to all pathways
              </button>

              <div style={{ background: `linear-gradient(135deg, ${p.color}bb, ${p.color}77)`, borderRadius: 14, padding: "24px 28px", marginBottom: 20, border: `2px solid ${p.accent}55` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                  <span style={{ fontSize: 44 }}>{p.emoji}</span>
                  <div>
                    <div style={{ fontFamily: "sans-serif", fontSize: 11, letterSpacing: 2, color: p.accent, textTransform: "uppercase" }}>{p.short}</div>
                    <h2 style={{ margin: "2px 0 4px", fontSize: 24 }}>{p.label}</h2>
                    <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#b8d4f0" }}>{p.tagline}</div>
                  </div>
                </div>
                <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#d0e8ff", background: "rgba(0,0,0,0.2)", padding: "12px 16px", borderRadius: 8, borderLeft: `4px solid ${p.accent}` }}>
                  <strong style={{ color: p.accent }}>Best for:</strong> {p.bestFor}
                </div>
              </div>

              {/* Requirements Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                {[
                  ["📋 Minimum GPA", p.gpa],
                  ["📦 Units Required", p.units],
                  ["📅 Application Deadline", p.deadline],
                  ["🌐 Apply At", p.application],
                  ["📚 GE Requirements", p.ge],
                  ["🔗 ASSIST.org", p.assist],
                ].map(([label, val], i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#888", marginBottom: 4 }}>{label}</div>
                    <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#e0f0ff" }}>{val}</div>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "18px 20px", marginBottom: 20, border: "1px solid rgba(255,215,0,0.2)" }}>
                <h3 style={{ margin: "0 0 14px", fontFamily: "sans-serif", fontSize: 14, color: p.accent, letterSpacing: 1, textTransform: "uppercase" }}>💡 Key Tips for {p.short}</h3>
                {p.tips.map((tip, i) => {
                  const urlMatch = tip.match(/(https?:\/\/[^\s]+)/);
                  const parts = urlMatch ? tip.split(urlMatch[0]) : null;
                  return (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                      <span style={{ color: p.accent, fontWeight: "bold", minWidth: 18, fontFamily: "sans-serif" }}>{i + 1}.</span>
                      <span style={{ fontFamily: "sans-serif", fontSize: 13, color: "#cce0ff", lineHeight: 1.6 }}>
                        {urlMatch ? (
                          <>{parts[0]}<a href={urlMatch[0]} target="_blank" rel="noopener noreferrer" style={{ color: p.accent, textDecoration: "underline" }}>{urlMatch[0]}</a>{parts[1]}</>
                        ) : tip}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Campuses */}
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "18px 20px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <h3 style={{ margin: "0 0 14px", fontFamily: "sans-serif", fontSize: 14, color: "#aaa", letterSpacing: 1, textTransform: "uppercase" }}>🏫 Example {p.short} Campuses</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {p.campuses.map((c, i) => (
                    <span key={i} style={{ background: `${p.color}66`, border: `1px solid ${p.accent}44`, borderRadius: 20, padding: "5px 12px", fontFamily: "sans-serif", fontSize: 12, color: "#ddeeff" }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* TAB 1: Quiz */}
        {activeTab === 1 && (
          <div>
            {!quizDone ? (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 22, fontFamily: "sans-serif" }}>Find Your Best Transfer Match</h2>
                    <p style={{ margin: "6px 0 0", fontFamily: "sans-serif", fontSize: 13, color: "#aaa" }}>Answer 4 quick questions to get a personalized recommendation</p>
                  </div>
                  <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#FFD700", background: "rgba(255,215,0,0.1)", padding: "6px 14px", borderRadius: 20, border: "1px solid #FFD70044" }}>
                    {quizStep + 1} / {quizQuestions.length}
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 4, height: 6, marginBottom: 28 }}>
                  <div style={{ background: "linear-gradient(90deg, #FFD700, #FFA500)", height: 6, borderRadius: 4, width: `${((quizStep) / quizQuestions.length) * 100}%`, transition: "width 0.4s" }} />
                </div>

                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "28px 28px 24px", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: 18, lineHeight: 1.5, color: "#fff" }}>{quizQuestions[quizStep].q}</h3>
                  {quizQuestions[quizStep].subtitle && (
                    <p style={{ margin: "0 0 20px", fontFamily: "sans-serif", fontSize: 12, color: "#7a9abf", fontStyle: "italic" }}>{quizQuestions[quizStep].subtitle}</p>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {quizQuestions[quizStep].options.map((opt, i) => (
                      <button key={i} onClick={() => handleQuizAnswer(opt)}
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          borderRadius: 10,
                          padding: "14px 18px",
                          cursor: "pointer",
                          textAlign: "left",
                          color: "#e0f0ff",
                          fontFamily: "sans-serif",
                          fontSize: 14,
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,215,0,0.12)"; e.currentTarget.style.borderColor = "#FFD70088"; e.currentTarget.style.transform = "translateX(4px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                        <span style={{ color: "#FFD700", marginRight: 10, fontWeight: "bold" }}>{["A", "B", "C", "D"][i]}.</span>
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 style={{ margin: "0 0 6px", fontFamily: "sans-serif", fontSize: 22 }}>Your Transfer Match Results</h2>
                <p style={{ margin: "0 0 24px", fontFamily: "sans-serif", fontSize: 13, color: "#aaa" }}>Based on your answers, here's how each pathway fits you:</p>

                {sortedMatches.map(([key, score], i) => {
                  const p = pathways[key];
                  const pct = Math.round((score / maxScore) * 100);
                  return (
                    <div key={key} style={{
                      background: i === 0 ? `linear-gradient(135deg, ${p.color}cc, ${p.color}77)` : "rgba(255,255,255,0.05)",
                      border: i === 0 ? `2px solid ${p.accent}` : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 12,
                      padding: "18px 20px",
                      marginBottom: 14,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 24 }}>{p.emoji}</span>
                          <div>
                            {i === 0 && <div style={{ fontFamily: "sans-serif", fontSize: 10, color: p.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 }}>⭐ Top Match</div>}
                            <div style={{ fontFamily: "sans-serif", fontSize: 15, fontWeight: "bold" }}>{p.label}</div>
                          </div>
                        </div>
                        <div style={{ fontFamily: "sans-serif", fontSize: 20, fontWeight: "bold", color: i === 0 ? p.accent : "#888" }}>{pct}%</div>
                      </div>
                      <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 4, height: 8, marginBottom: 10 }}>
                        <div style={{ background: i === 0 ? `linear-gradient(90deg, ${p.accent}, ${p.accent}99)` : "#555", height: 8, borderRadius: 4, width: `${pct}%`, transition: "width 0.6s" }} />
                      </div>
                      <div style={{ fontFamily: "sans-serif", fontSize: 12, color: i === 0 ? "#cce0ff" : "#888" }}>{p.tagline}</div>
                    </div>
                  );
                })}

                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                  <button onClick={resetQuiz}
                    style={{ background: "rgba(255,215,0,0.15)", border: "1px solid #FFD70066", color: "#FFD700", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontFamily: "sans-serif", fontSize: 13 }}>
                    🔄 Retake Quiz
                  </button>
                  <button onClick={() => { setActiveTab(0); setSelectedPathway(topMatch); }}
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#e0f0ff", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontFamily: "sans-serif", fontSize: 13 }}>
                    📖 Explore My Top Match →
                  </button>
                </div>

                {/* Counselor Note */}
                {(() => {
                  const goalTag = quizTags[0];
                  const timeTag = quizTags[2];
                  const noteMap = {
                    certificate: { icon: "🎖️", title: "Your goal is a Certificate — you're on the right path at Cañada!", body: "Cañada College offers certificates in many high-demand fields that can be completed in 1–2 semesters. Talk to a counselor about which certificate aligns with your career goal and whether it stacks toward an Associate's Degree." },
                    associates: { icon: "📜", title: "An Associate's Degree is a powerful foundation.", body: "If you complete an AA-T or AS-T (Associate Degree for Transfer), you can guarantee admission to a CSU and receive priority consideration with junior standing. Ask a counselor about which ADT pathway fits your major." },
                    bachelors: { icon: "🎓", title: "You're a transfer student — let's build your roadmap.", body: "Start your Student Educational Plan (SEP) now. Complete CalGETC and your major prep courses at Cañada to be a competitive transfer applicant. Apply to CSU in October and UC by November 30." },
                    graduate: { icon: "🔬", title: "Grad school is an ambitious and achievable goal!", body: "Research universities (UC) and select private colleges offer the strongest preparation and faculty mentorship for graduate school. Focus on maintaining a high GPA, building research or work experience, and forming strong faculty relationships." },
                  };
                  const timeNotes = {
                    fast: "⚡ Given your tight timeline, focus on completing a certificate or ADT at Cañada first — it's the fastest, most affordable route.",
                    flexible: "🔄 Your flexibility is an asset. Part-time enrollment at Cañada while working is a completely valid and common path. A counselor can help you pace your plan realistically.",
                    longterm: "🏁 Playing the long game? Great. Invest in your GPA, complete CalGETC, build experiences, and you'll be a strong applicant anywhere.",
                  };
                  const note = noteMap[goalTag];
                  const timeNote = timeNotes[timeTag];
                  if (!note) return null;
                  return (
                    <div style={{ marginTop: 24, background: "rgba(255,215,0,0.07)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: 14, padding: "20px 22px" }}>
                      <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#FFD700", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>💬 Counselor's Note</div>
                      <div style={{ fontFamily: "sans-serif", fontSize: 15, fontWeight: "bold", color: "#fff", marginBottom: 8 }}>{note.icon} {note.title}</div>
                      <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#cce0ff", lineHeight: 1.7, marginBottom: timeNote ? 12 : 0 }}>{note.body}</div>
                      {timeNote && <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#a8d4ff", lineHeight: 1.6, borderTop: "1px solid rgba(255,215,0,0.15)", paddingTop: 10 }}>{timeNote}</div>}
                      <div style={{ marginTop: 14, fontFamily: "sans-serif", fontSize: 12, color: "#7a9abf", fontStyle: "italic" }}>
                        Remember: this quiz is a starting point, not a final answer. Schedule a free appointment with a Cañada College counselor to build your personalized SEP.
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Key Dates */}
        {activeTab === 2 && (
          <div>
            <h2 style={{ margin: "0 0 6px", fontFamily: "sans-serif", fontSize: 22 }}>Transfer Application Timeline</h2>
            <p style={{ margin: "0 0 24px", fontFamily: "sans-serif", fontSize: 13, color: "#aaa" }}>Key dates and deadlines to keep on your radar for Fall 2027 transfer</p>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 72, top: 0, bottom: 0, width: 2, background: "rgba(255,215,0,0.2)" }} />
              {keyDates.map((d, i) => {
                const colors_map = { csu: "#1B4F8A", uc: "#003B5C", private: "#5B2D8E", prep: "#1A6B3C", deadline: "#8B0000", decision: "#6B4C00" };
                const c = colors_map[d.type] || "#333";
                return (
                  <div key={i} style={{ display: "flex", gap: 20, marginBottom: 18, alignItems: "flex-start" }}>
                    <div style={{ minWidth: 70, fontFamily: "sans-serif", fontSize: 11, color: "#FFD700", fontWeight: "bold", textAlign: "right", paddingTop: 6 }}>{d.month}</div>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FFD700", border: "3px solid #0f2337", marginTop: 5, zIndex: 1, flexShrink: 0 }} />
                    <div style={{ background: `${c}88`, border: `1px solid ${c}`, borderRadius: 10, padding: "10px 16px", flex: 1 }}>
                      <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#e0f0ff" }}>{d.event}</div>
                      {d.type === "deadline" && <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#ff8888", marginTop: 4 }}>⚠️ Do not miss this date!</div>}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: 12, padding: "16px 20px", marginTop: 10 }}>
              <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#FFD700", marginBottom: 6, fontWeight: "bold" }}>💡 Pro Tip from your instructor</div>
              <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#cce0ff", lineHeight: 1.6 }}>
                Meet with a Cañada College counselor by October to finalize your Student Educational Plan (SEP) before application season opens. Early planning = more options!
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Resources */}
        {activeTab === 3 && (
          <div>
            <h2 style={{ margin: "0 0 6px", fontFamily: "sans-serif", fontSize: 22 }}>Essential Transfer Resources</h2>
            <p style={{ margin: "0 0 24px", fontFamily: "sans-serif", fontSize: 13, color: "#aaa" }}>Bookmark these — they will be your best friends during the transfer process</p>
            {[
              { cat: "📋 Application Portals", items: [
                { name: "Cal State Apply", url: "https://www.calstate.edu/apply", display: "calstate.edu/apply", desc: "Apply to all 23 CSU campuses in one application" },
                { name: "UC Application", url: "https://apply.universityofcalifornia.edu", display: "apply.universityofcalifornia.edu", desc: "Apply to all 9 UC campuses in one application" },
                { name: "Common App", url: "https://www.commonapp.org", display: "commonapp.org", desc: "Apply to 1,000+ private and public colleges" },
              ]},
              { cat: "🔗 Articulation & Planning", items: [
                { name: "ASSIST.org", url: "https://www.assist.org", display: "assist.org", desc: "See exactly which Cañada courses transfer to which UC/CSU courses" },
                { name: "UC Transfer Pathways", url: "https://admission.universityofcalifornia.edu/transfer/", display: "admission.universityofcalifornia.edu/transfer", desc: "Major-specific prep requirements for each UC campus" },
                { name: "TAG Information", url: "https://admission.universityofcalifornia.edu/transfer/transfer-admission-guarantee.html", display: "UC Transfer Admission Guarantee", desc: "Transfer Admission Guarantee — your guaranteed UC spot" },
              ]},
              { cat: "🏫 Cañada College Resources", items: [
                { name: "Transfer Center", url: "https://canadacollege.edu/transfercenter/", display: "canadacollege.edu/transfercenter", desc: "Schedule appointments, get transfer advising, visit college fairs" },
                { name: "Counseling Services", url: "https://canadacollege.edu/counselingcenter/", display: "canadacollege.edu/counselingcenter", desc: "Build your SEP with a professional counselor — free!" },
                { name: "Financial Aid Office", url: "https://canadacollege.edu/financialaid/", display: "canadacollege.edu/financialaid", desc: "FAFSA/Dream Act, scholarships, fee waivers" },
              ]},
              { cat: "💰 Financial Aid", items: [
                { name: "FAFSA", url: "https://studentaid.gov/h/apply-for-aid/fafsa", display: "studentaid.gov", desc: "Federal student aid — opens October 1 each year" },
                { name: "California Dream Act", url: "https://dream.csac.ca.gov", display: "dream.csac.ca.gov", desc: "Financial aid for AB 540-eligible undocumented students" },
                { name: "Cal Grant", url: "https://www.csac.ca.gov/cal-grant", display: "csac.ca.gov/cal-grant", desc: "California state grant — up to full tuition at UC/CSU" },
              ]},
            ].map((section, si) => (
              <div key={si} style={{ marginBottom: 24 }}>
                <h3 style={{ fontFamily: "sans-serif", fontSize: 13, color: "#FFD700", letterSpacing: 2, textTransform: "uppercase", margin: "0 0 12px" }}>{section.cat}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {section.items.map((item, ii) => (
                    <a key={ii} href={item.url} target="_blank" rel="noopener noreferrer"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none", transition: "all 0.2s", cursor: "pointer" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(74,144,217,0.12)"; e.currentTarget.style.borderColor = "rgba(74,144,217,0.4)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
                      <div>
                        <div style={{ fontFamily: "sans-serif", fontSize: 14, fontWeight: "bold", color: "#e0f0ff", marginBottom: 3 }}>{item.name}</div>
                        <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#888" }}>{item.desc}</div>
                      </div>
                      <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#4a90d9", background: "rgba(74,144,217,0.1)", padding: "5px 12px", borderRadius: 20, border: "1px solid rgba(74,144,217,0.3)", whiteSpace: "nowrap", marginLeft: 12 }}>
                        🔗 {item.display}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "16px", fontFamily: "sans-serif", fontSize: 11, color: "#555", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        CRER 401 · Cañada College · Summer 2026 · Instructor: Jose L. Manzo
      </div>
    </div>
  );
}
