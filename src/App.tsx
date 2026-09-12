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

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#f8fafc",
    direction: "rtl",
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
  title: { fontSize: 28, margin: "8px 0" },
  subtitle: { color: "#94a3b8", marginBottom: 16 },
  heading: { fontSize: 20, margin: "12px 0" },
  label: { color: "#93c5fd", fontWeight: 600, marginTop: 16, marginBottom: 4 },
  body: { lineHeight: 1.8, color: "#e2e8f0" },
  grid: { display: "flex", flexDirection: "column", gap: 12 },
  card: {
    border: "none",
    borderRadius: 16,
    padding: 18,
    color: "white",
    textAlign: "right",
    cursor: "pointer",
  },
  subjectCard: {
    border: "1px solid #334155",
    background: "#1e293b",
    borderRadius: 16,
    padding: 16,
    color: "white",
    textAlign: "right",
    cursor: "pointer",
  },
  unitRow: {
    display: "block",
    width: "100%",
    border: "1px solid #334155",
    background: "#1e293b",
    borderRadius: 14,
    padding: 16,
    color: "white",
    textAlign: "right",
    marginBottom: 10,
    cursor: "pointer",
  },
  optionRow: {
    display: "block",
    width: "100%",
    border: "1px solid #334155",
    background: "#1e293b",
    borderRadius: 12,
    padding: 14,
    color: "white",
    textAlign: "right",
    marginBottom: 10,
    fontSize: 16,
    cursor: "pointer",
  },
  cardTitle: { fontWeight: 700, fontSize: 16 },
  cardDesc: { fontSize: 13, opacity: 0.85, marginTop: 4 },
  primaryBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 14,
    padding: "14px 28px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 12,
  },
  secondaryBtn: {
    background: "transparent",
    color: "#94a3b8",
    border: "1px solid #334155",
    borderRadius: 14,
    padding: "10px 24px",
    fontSize: 14,
    cursor: "pointer",
    marginTop: 8,
  },
  audioBadge: {
    background: "#1e3a8a",
    color: "#bfdbfe",
    padding: "8px 12px",
    borderRadius: 10,
    fontSize: 13,
    marginBottom: 8,
  },
  backBar: { display: "flex", alignItems: "center", gap: 12, marginBottom: 8 },
  backBtn: { background: "none", border: "none", color: "#93c5fd", fontSize: 15, cursor: "pointer" },
  backTitle: { color: "#94a3b8", fontSize: 14 },
};
