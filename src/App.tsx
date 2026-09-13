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

// نفس هوية "تعلّم" — دورة ألوان ثابتة بدل الألوان العشوائية القديمة
const GRADE_GRADIENTS: [string, string][] = [
  ["#2455D6", "#122452"],
  ["#F6B91B", "#FCBB00"],
  ["#2DD4BF", "#2455D6"],
  ["#122452", "#2455D6"],
  ["#FCBB00", "#F6B91B"],
  ["#2455D6", "#2DD4BF"],
];

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
        <div style={styles.center}>
          <div style={{ fontSize: 64 }}>🎓</div>
          <h1 style={styles.title}>تعلّم</h1>
          <p style={styles.subtitle}>طريقك للنجاح يبدأ من هنا</p>
          <button style={styles.primaryBtn} onClick={goHome}>ابدأ الآن ›</button>
        </div>
      )}

      {screen === "grade" && (
        <div style={styles.screen}>
          <h2 style={styles.heading}>اختر مرحلتك الدراسية</h2>
          <div style={styles.grid}>
            {GRADES.map((g, i) => {
              const [from, to] = GRADE_GRADIENTS[i % GRADE_GRADIENTS.length];
              return (
                <button
                  key={g.slug}
                  style={{ ...styles.card, background: `linear-gradient(135deg, ${from}, ${to})` }}
                  onClick={() => {
                    setGradeSlug(g.slug);
                    setScreen("subjects");
                  }}
                >
                  <div style={styles.cardTitle}>{g.name}</div>
                  <div style={styles.cardDesc}>{g.description}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {screen === "subjects" && grade && (
        <div style={styles.screen}>
          <BackBar onBack={() => setScreen("grade")} title={grade.name} />
          <h2 style={styles.heading}>المواد الدراسية</h2>
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
                <div style={{ fontSize: 28 }}>{ICONS[s.icon] ?? "📘"}</div>
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
              <div style={styles.cardTitle}>{`الوحدة ${i + 1}: ${u.title}`}</div>
              <div style={styles.cardDesc}>{u.description}</div>
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
          <p style={styles.label}>الأهداف</p>
          <p style={styles.body}>{lesson.objectives}</p>
          <p style={styles.label}>الشرح</p>
          <p style={{ ...styles.body, whiteSpace: "pre-line" }}>{lesson.content}</p>
          <p style={styles.label}>أمثلة</p>
          <p style={styles.body}>{lesson.examples}</p>
          <button
            style={styles.primaryBtn}
            onClick={() => {
              setQuizAnswers([]);
              setQuizIdx(0);
              setScreen("quiz");
            }}
          >
            جرّب بنفسك ›
          </button>
        </div>
      )}

      {screen === "quiz" && questions.length > 0 && (
        <div style={styles.screen}>
          <BackBar onBack={() => setScreen("lesson")} title="اختبار" />
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
          <div style={{ fontSize: 64 }}>🏆</div>
          <h1 style={styles.title}>أحسنت!</h1>
          <p style={styles.subtitle}>{`${score} / ${questions.length}`}</p>
          <button style={styles.primaryBtn} onClick={() => setScreen("units")}>الدرس التالي</button>
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

// ألوان وأشكال مبنية على هوية "تعلّم" (كحلي + أزرق + ذهبي، زوايا مدورة، ظلال ناعمة)
const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: "100vh",
    background: "#F7FAFF",
    color: "#122452",
    direction: "rtl",
    fontFamily: '"Cairo Variable", "Cairo", Tahoma, Arial, sans-serif',
  },
  center: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    textAlign: "center",
    gap: 8,
  },
  screen: { padding: 20, paddingBottom: 60 },
  title: { fontSize: 28, margin: "8px 0", color: "#102354", fontWeight: 800 },
  subtitle: { color: "#64748b", marginBottom: 16 },
  heading: { fontSize: 20, margin: "12px 0", color: "#102354", fontWeight: 800 },
  label: { color: "#2455D6", fontWeight: 700, marginTop: 16, marginBottom: 4 },
  body: { lineHeight: 1.8, color: "#122452" },
  grid: { display: "flex", flexDirection: "column", gap: 12 },
  card: {
    border: "none",
    borderRadius: 28,
    padding: 20,
    color: "white",
    textAlign: "right",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(18,36,82,0.15)",
  },
  subjectCard: {
    border: "none",
    background: "#ffffff",
    borderRadius: 24,
    padding: 18,
    color: "#122452",
    textAlign: "right",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(18,36,82,0.07)",
  },
  unitRow: {
    display: "block",
    width: "100%",
    border: "none",
    background: "#ffffff",
    borderRadius: 22,
    padding: 18,
    color: "#122452",
    textAlign: "right",
    marginBottom: 12,
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(18,36,82,0.07)",
  },
  optionRow: {
    display: "block",
    width: "100%",
    border: "1px solid #E2E8F0",
    background: "#ffffff",
    borderRadius: 18,
    padding: 14,
    color: "#122452",
    textAlign: "right",
    marginBottom: 10,
    fontSize: 16,
    cursor: "pointer",
  },
  cardTitle: { fontWeight: 800, fontSize: 16 },
  cardDesc: { fontSize: 13, opacity: 0.85, marginTop: 4 },
  primaryBtn: {
    background: "#2455D6",
    color: "white",
    border: "none",
    borderRadius: 999,
    padding: "14px 28px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 12,
  },
  secondaryBtn: {
    background: "transparent",
    color: "#64748b",
    border: "1px solid #CBD5E1",
    borderRadius: 999,
    padding: "10px 24px",
    fontSize: 14,
    cursor: "pointer",
    marginTop: 8,
  },
  audioBadge: {
    background: "#EFF6FF",
    color: "#2455D6",
    padding: "8px 12px",
    borderRadius: 14,
    fontSize: 13,
    marginBottom: 8,
    fontWeight: 600,
  },
  backBar: { display: "flex", alignItems: "center", gap: 12, marginBottom: 8 },
  backBtn: { background: "none", border: "none", color: "#2455D6", fontSize: 15, cursor: "pointer", fontWeight: 700 },
  backTitle: { color: "#64748b", fontSize: 14 },
};
