import { useMemo, useState } from "react";

import {
  GRADES,
  SUBJECTS,
  UNITS_BY_SUBJECT,
  UNITS_BY_SUBJECT_KG1,
  lessonsForUnit,
  lessonsForUnitKG1,
  questionsForLesson,
  questionsForLessonKG1,
  gradeBySlug,
  subjectBySlug,
  type QuizQ,
} from "./data/catalog";

type Screen = "splash" | "grade" | "subjects" | "units" | "lesson" | "quiz" | "result";

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [gradeSlug, setGradeSlug] = useState<string>("");
  const [subjectSlug, setSubjectSlug] = useState<string>("");
  const [unitTitle, setUnitTitle] = useState<string>("");
  const [lessonIdx, setLessonIdx] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizIdx, setQuizIdx] = useState(0);

  const isKg1 = gradeSlug === "kg1";
  const grade = gradeBySlug(gradeSlug);
  const subject = subjectBySlug(subjectSlug);

  const units = useMemo(() => {
    if (!subjectSlug) return [];
    return isKg1 ? UNITS_BY_SUBJECT_KG1[subjectSlug] ?? [] : UNITS_BY_SUBJECT[subjectSlug] ?? [];
  }, [subjectSlug, isKg1]);

  const unitIdx = units.findIndex((u) => u.title === unitTitle);

  const lessons = useMemo(() => {
    if (!subjectSlug || !unitTitle) return [];
    return isKg1
      ? lessonsForUnitKG1(subjectSlug, unitTitle)
      : lessonsForUnit(subjectSlug, unitTitle, grade?.name ?? "");
  }, [subjectSlug, unitTitle, isKg1, grade]);

  const lesson = lessons[lessonIdx];

  const questions: QuizQ[] = useMemo(() => {
    if (!subjectSlug) return [];
    const idx = lessonIdx + (unitIdx >= 0 ? unitIdx : 0);
    return isKg1 ? questionsForLessonKG1(subjectSlug, idx) : questionsForLesson(subjectSlug, idx);
  }, [subjectSlug, lessonIdx, unitIdx, isKg1]);

  const score = quizAnswers.reduce((acc, ans, i) => acc + (ans === questions[i]?.correct ? 1 : 0), 0);

  function goHome() {
    setScreen("grade");
  }

  return (
    <div style={styles.app}>
      {screen === "splash" && (
        <div style={styles.splashWrap}>
          <div style={styles.splashGlowBlue} />
          <div style={styles.splashGlowAmber} />
          <div style={styles.center}>
            <span style={styles.logoBadge}>🎓</span>
            <h1 style={styles.title}>تَعَلَّم</h1>
            <span style={styles.tagline}>اِفْهَم • تَقَدَّم • تَمَيَّز</span>
            <p style={styles.subtitle}>طريقك للنجاح يبدأ من هنا</p>
            <button style={styles.primaryBtn} onClick={goHome}>
              ابدأ رحلتك الآن
              <span style={styles.btnArrowCircle}>›</span>
            </button>
          </div>
        </div>
      )}

      {screen === "grade" && (
        <div style={styles.screen}>
          <div style={styles.welcomeBox}>
            <span style={styles.welcomeEmoji}>👋</span>
            <h2 style={styles.welcomeTitle}>أهلًا بك يا بطل!</h2>
            <p style={styles.welcomeSub}>اختر مرحلتك وصفّك الدراسي لنجهّز لك المحتوى المناسب.</p>
          </div>
          <div style={styles.grid}>
            {GRADES.map((g) => (
              <button
                key={g.slug}
                style={{ ...styles.card, background: `linear-gradient(135deg, ${g.colorFrom}, ${g.colorTo})` }}
                onClick={() => {
                  setGradeSlug(g.slug);
                  setScreen("subjects");
                }}
              >
                <div style={styles.cardTitle}>{g.name}</div>
                <div style={styles.cardDesc}>{g.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {screen === "subjects" && grade && (
        <div style={styles.screen}>
          <BackBar onBack={() => setScreen("grade")} title={grade.name} />
          <h2 style={styles.heading}>ماذا تريد أن تتعلّم اليوم؟</h2>
          <p style={styles.headingSub}>اختر مادة، ولنبدأ درسًا جديدًا معًا.</p>
          <div style={styles.grid}>
            {SUBJECTS.map((s) => (
              <button
                key={s.slug}
                style={styles.subjectCard}
                onClick={() => {
                  setSubjectSlug(s.slug);
                  setScreen("units");
                }}
              >
                <span style={styles.subjectIconBadge}>{ICONS[s.icon] ?? "📘"}</span>
                <div style={styles.cardTitle}>{s.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {screen === "units" && subject && (
        <div style={styles.screen}>
          <BackBar onBack={() => setScreen("subjects")} title={subject.name} />
          <h2 style={styles.heading}>الوحدات</h2>
          {units.map((u, i) => (
            <button
              key={u.title}
              style={styles.unitRow}
              onClick={() => {
                setUnitTitle(u.title);
                setLessonIdx(0);
                setScreen("lesson");
              }}
            >
              <span style={styles.unitNumber}>{i + 1}</span>
              <span style={styles.unitTextWrap}>
                <span style={styles.cardTitle}>{u.title}</span>
                <span style={styles.cardDesc}>{u.description}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {screen === "lesson" && lesson && (
        <div style={styles.screen}>
          <BackBar onBack={() => setScreen("units")} title={unitTitle} />
          <h2 style={styles.heading}>{lesson.title}</h2>
          {lesson.audioPriority && (
            <div style={styles.audioBadge}>🔊 درس بأولوية الاستماع — استمع وكرّر بصوتك</div>
          )}
          <div style={styles.lessonCard}>
            <p style={styles.label}>الأهداف</p>
            <p style={styles.body}>{lesson.objectives}</p>
            <p style={styles.label}>الشرح</p>
            <p style={{ ...styles.body, whiteSpace: "pre-line" }}>{lesson.content}</p>
            <p style={styles.label}>أمثلة</p>
            <p style={styles.body}>{lesson.examples}</p>
          </div>
          <button
            style={styles.primaryBtn}
            onClick={() => {
              setQuizAnswers([]);
              setQuizIdx(0);
              setScreen("quiz");
            }}
          >
            جرّب بنفسك
            <span style={styles.btnArrowCircle}>›</span>
          </button>
        </div>
      )}

      {screen === "quiz" && questions.length > 0 && (
        <div style={styles.screen}>
          <BackBar onBack={() => setScreen("lesson")} title="اختبار" />
          <div style={styles.quizProgressTrack}>
            <div
              style={{
                ...styles.quizProgressFill,
                width: `${((quizIdx + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
          <p style={styles.label}>السؤال {quizIdx + 1} من {questions.length}</p>
          <h2 style={styles.heading}>{questions[quizIdx].q}</h2>
          {questions[quizIdx].opts.map((opt, oi) => (
            <button
              key={oi}
              style={styles.optionRow}
              onClick={() => {
                const next = [...quizAnswers];
                next[quizIdx] = oi;
                setQuizAnswers(next);
                if (quizIdx + 1 < questions.length) {
                  setQuizIdx(quizIdx + 1);
                } else {
                  setScreen("result");
                }
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {screen === "result" && (
        <div style={styles.center}>
          <span style={styles.trophyBadge}>🏆</span>
          <h1 style={styles.title}>أحسنت يا بطل!</h1>
          <p style={styles.resultScore}>{`${score} / ${questions.length}`}</p>
          <button style={styles.primaryBtn} onClick={() => setScreen("units")}>
            الدرس التالي
            <span style={styles.btnArrowCircle}>›</span>
          </button>
          <button style={styles.secondaryBtn} onClick={goHome}>الرئيسية</button>
        </div>
      )}
    </div>
  );
}

function BackBar({ onBack, title }: { onBack: () => void; title: string }) {
  return (
    <div style={styles.backBar}>
      <button style={styles.backBtn} onClick={onBack}>‹ رجوع</button>
      <span style={styles.backTitle}>{title}</span>
    </div>
  );
}

const ICONS: Record<string, string> = {
  calculator: "🧮",
  book: "📗",
  language: "🔤",
  flask: "🧪",
  globe: "🌍",
};

const COLORS = {
  primary: "#2455D6",
  primaryDark: "#102354",
  primaryMid: "#2E63E6",
  accent: "#F6B91B",
  accentHover: "#ffc62e",
  bg: "#F7F9FE",
  cardBg: "#FFFFFF",
  border: "#E3EAFB",
  textDark: "#102354",
  textMuted: "#64748B",
};

const FONT = "'Cairo', 'Tahoma', Arial, sans-serif";

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: "100vh",
    background: COLORS.bg,
    color: COLORS.textDark,
    direction: "rtl",
    fontFamily: FONT,
  },
  splashWrap: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
  },
  splashGlowBlue: {
    position: "absolute",
    top: -60,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: "50%",
    background: "rgba(37,79,161,.12)",
    filter: "blur(40px)",
  },
  splashGlowAmber: {
    position: "absolute",
    bottom: -40,
    left: -60,
    width: 220,
    height: 220,
    borderRadius: "50%",
    background: "rgba(246,185,27,.18)",
    filter: "blur(40px)",
  },
  center: {
    position: "relative",
    zIndex: 1,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    textAlign: "center",
    gap: 6,
  },
  logoBadge: {
    display: "grid",
    placeItems: "center",
    width: 72,
    height: 72,
    borderRadius: 20,
    background: COLORS.primary,
    color: "white",
    fontSize: 34,
    boxShadow: "0 10px 24px rgba(36,85,214,.35)",
    marginBottom: 6,
  },
  title: { fontSize: 30, fontWeight: 900, margin: "6px 0 0", color: COLORS.textDark },
  tagline: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    color: COLORS.textMuted,
    marginBottom: 10,
  },
  subtitle: { color: COLORS.textMuted, marginBottom: 20, fontSize: 15 },
  screen: { padding: 20, paddingBottom: 60, maxWidth: 560, margin: "0 auto" },
  welcomeBox: { textAlign: "center", marginBottom: 22, marginTop: 8 },
  welcomeEmoji: { fontSize: 34, display: "block", marginBottom: 6 },
  welcomeTitle: { fontSize: 22, fontWeight: 900, color: COLORS.textDark, margin: "4px 0" },
  welcomeSub: { color: COLORS.textMuted, fontSize: 14, fontWeight: 600 },
  heading: { fontSize: 20, fontWeight: 900, margin: "12px 0 2px", color: COLORS.textDark },
  headingSub: { color: COLORS.textMuted, fontSize: 13, fontWeight: 600, marginBottom: 14 },
  label: { color: COLORS.primaryMid, fontWeight: 800, marginTop: 16, marginBottom: 4, fontSize: 13 },
  body: { lineHeight: 1.9, color: "#334155", fontSize: 15 },
  grid: { display: "flex", flexDirection: "column", gap: 14, marginTop: 8 },
  card: {
    border: "none",
    borderRadius: 20,
    padding: 20,
    color: "white",
    textAlign: "right",
    cursor: "pointer",
    fontFamily: FONT,
    boxShadow: "0 12px 24px rgba(16,35,84,.18)",
  },
  subjectCard: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    border: `1px solid ${COLORS.border}`,
    background: COLORS.cardBg,
    borderRadius: 18,
    padding: 16,
    color: COLORS.textDark,
    textAlign: "right",
    cursor: "pointer",
    fontFamily: FONT,
    boxShadow: "0 4px 14px rgba(16,35,84,.06)",
  },
  subjectIconBadge: {
    display: "grid",
    placeItems: "center",
    width: 48,
    height: 48,
    borderRadius: 14,
    background: "#EFF6FF",
    fontSize: 22,
    flexShrink: 0,
  },
  unitRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    width: "100%",
    border: `1px solid ${COLORS.border}`,
    background: COLORS.cardBg,
    borderRadius: 18,
    padding: 16,
    color: COLORS.textDark,
    textAlign: "right",
    marginBottom: 12,
    cursor: "pointer",
    fontFamily: FONT,
    boxShadow: "0 4px 14px rgba(16,35,84,.06)",
  },
  unitNumber: {
    display: "grid",
    placeItems: "center",
    minWidth: 32,
    height: 32,
    borderRadius: 10,
    background: COLORS.primary,
    color: "white",
    fontWeight: 800,
    fontSize: 14,
    flexShrink: 0,
  },
  unitTextWrap: { display: "flex", flexDirection: "column", gap: 2 },
  lessonCard: {
    background: COLORS.cardBg,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 18,
    padding: 16,
    marginTop: 10,
    boxShadow: "0 4px 14px rgba(16,35,84,.06)",
  },
  optionRow: {
    display: "block",
    width: "100%",
    border: `1px solid ${COLORS.border}`,
    background: COLORS.cardBg,
    borderRadius: 14,
    padding: 14,
    color: COLORS.textDark,
    textAlign: "right",
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: FONT,
  },
  cardTitle: { fontWeight: 800, fontSize: 16 },
  cardDesc: { fontSize: 13, opacity: 0.85, marginTop: 4 },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    background: COLORS.accent,
    color: COLORS.primaryDark,
    border: "none",
    borderRadius: 16,
    padding: "14px 26px",
    fontSize: 16,
    fontWeight: 900,
    cursor: "pointer",
    marginTop: 16,
    fontFamily: FONT,
    boxShadow: "0 12px 24px rgba(246,185,27,.30)",
  },
  btnArrowCircle: {
    display: "grid",
    placeItems: "center",
    width: 26,
    height: 26,
    borderRadius: "50%",
    background: "rgba(255,255,255,.6)",
    fontSize: 15,
  },
  secondaryBtn: {
    background: "transparent",
    color: COLORS.textMuted,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 14,
    padding: "10px 24px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 10,
    fontFamily: FONT,
  },
  audioBadge: {
    background: "#EFF6FF",
    color: COLORS.primary,
    padding: "10px 14px",
    borderRadius: 12,
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 8,
    marginTop: 6,
  },
  quizProgressTrack: {
    height: 6,
    width: "100%",
    background: "#E2E8F0",
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 6,
  },
  quizProgressFill: {
    height: "100%",
    background: COLORS.primary,
    borderRadius: 999,
    transition: "width .3s ease",
  },
  trophyBadge: {
    display: "grid",
    placeItems: "center",
    width: 84,
    height: 84,
    borderRadius: "50%",
    background: "#FEF3C6",
    fontSize: 40,
    marginBottom: 8,
  },
  resultScore: { color: COLORS.textMuted, marginBottom: 8, fontSize: 20, fontWeight: 900 },
  backBar: { display: "flex", alignItems: "center", gap: 12, marginBottom: 8 },
  backBtn: {
    background: "none",
    border: "none",
    color: COLORS.primaryMid,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: FONT,
  },
  backTitle: { color: COLORS.textMuted, fontSize: 14, fontWeight: 700 },
};
