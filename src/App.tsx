import { useMemo, useState } from "react";
import {
  GRADES,
  STAGES,
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
import {
  UNITS_BY_SUBJECT_KG2,
  lessonsForUnitKG2,
  questionsForLessonKG2,
} from "./data/kg2";

function subjectsForGrade(grade?: ReturnType<typeof gradeBySlug>) {
  if (grade?.stage === "early") {
    return SUBJECTS.filter((s) => ["math", "arabic", "english"].includes(s.slug));
  }
  return SUBJECTS;
}

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
  const isKg2 = gradeSlug === "kg2";
  const grade = gradeBySlug(gradeSlug);
  const subject = subjectBySlug(subjectSlug);
  const subjectsForThisGrade = useMemo(() => subjectsForGrade(grade), [grade]);

  const units = useMemo(() => {
    if (!subjectSlug) return [];
    if (isKg1) return UNITS_BY_SUBJECT_KG1[subjectSlug] ?? [];
    if (isKg2) return UNITS_BY_SUBJECT_KG2[subjectSlug] ?? [];
    return UNITS_BY_SUBJECT[subjectSlug] ?? [];
  }, [subjectSlug, isKg1, isKg2]);

  const unitIdx = units.findIndex((u) => u.title === unitTitle);

  const lessons = useMemo(() => {
    if (!subjectSlug || !unitTitle) return [];
    if (isKg1) return lessonsForUnitKG1(subjectSlug, unitTitle);
    if (isKg2) return lessonsForUnitKG2(subjectSlug, unitTitle);
    return lessonsForUnit(subjectSlug, unitTitle, grade?.name ?? "");
  }, [subjectSlug, unitTitle, isKg1, isKg2, grade]);

  const lesson = lessons[lessonIdx];

  const questions: QuizQ[] = useMemo(() => {
    if (!subjectSlug) return [];
    const idx = lessonIdx + (unitIdx >= 0 ? unitIdx : 0);
    if (isKg1) return questionsForLessonKG1(subjectSlug, idx);
    if (isKg2) return questionsForLessonKG2(subjectSlug, idx);
    return questionsForLesson(subjectSlug, idx);
  }, [subjectSlug, lessonIdx, unitIdx, isKg1, isKg2]);

  const score = quizAnswers.reduce((acc, ans, i) => acc + (ans === questions[i]?.correct ? 1 : 0), 0);

  function goHome() {
    setScreen("grade");
  }

  return (
    <div style={styles.app}>
      {screen === "splash" && (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            textAlign: "center",
            gap: 10,
            background: "linear-gradient(160deg, #2e63e6, #102354)",
            color: "#fff",
          }}
        >
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 999,
              background: "#2455d6",
              border: "3px solid rgba(255,255,255,.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            🎓
          </div>
          <h1 style={{ fontSize: 30, margin: 0 }}>تَعَلَّم</h1>
          <p style={{ opacity: 0.85, margin: 0 }}>اِفْهَم • تَقَدَّم • تَمَيَّز</p>
          <button
            style={{
              background: "#fff",
              color: "#2455d6",
              border: "none",
              borderRadius: 999,
              padding: "10px 24px",
              fontWeight: 700,
              cursor: "pointer",
              marginTop: 8,
            }}
            onClick={goHome}
          >
            دخول الطالب
          </button>
          <h2 style={{ fontSize: 26, lineHeight: 1.6, margin: "24px 0 0" }}>
            كلُّ درسٍ يقرّبك <br />
            <span style={{ borderBottom: "4px solid #f6b91b", paddingBottom: 2 }}>من حُلمك</span>
          </h2>
          <button
            style={{
              background: "#f6b91b",
              color: "#102354",
              border: "none",
              borderRadius: 999,
              padding: "14px 28px",
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer",
              marginTop: 16,
            }}
            onClick={goHome}
          >
            ابدأ رحلتك الآن ›
          </button>
        </div>
      )}

      {screen === "grade" && (
        <div style={styles.screen}>
          <TopBar />
          <p style={styles.kicker}>✨ لنبدأ من هنا</p>
          <div style={{ fontSize: 56, textAlign: "center" }}>👋</div>
          <h1 style={styles.heroTitle}>أهلًا بك يا بطل!</h1>
          <p style={styles.heroSubtitle}>اختر مرحلتك وصفّك الدراسي لنجهّز لك المحتوى المناسب.</p>

          <div style={styles.achieveCard}>
            <div style={styles.achieveIcon}>🏅</div>
            <div>
              <div style={styles.achieveLabel}>إنجازاتك</div>
              <div style={styles.achieveText}>ابدأ أول اختبار وتابع تقدّمك هنا</div>
            </div>
          </div>

          {STAGES.map((st) => {
            const stageGrades = GRADES.filter((g) => g.stage === st.key).sort((a, b) => a.sortOrder - b.sortOrder);
            return (
              <div key={st.key} style={styles.stageCard}>
                <div style={styles.stageHeaderRow}>
                  <div>
                    <div style={styles.stageTitle}>{st.label}</div>
                    <div style={styles.stageHint}>{st.hint}</div>
                  </div>
                  <div style={styles.stageIcon}>{STAGE_ICONS[st.key]}</div>
                </div>
                <div style={styles.stageGrid}>
                  {stageGrades.map((g) => (
                    <div key={g.slug} style={{ position: "relative" }}>
                      {g.slug === "g1" && <div style={styles.popularBadge}>شائع</div>}
                      <button
                        style={styles.gradeBtn}
                        onClick={() => {
                          setGradeSlug(g.slug);
                          setScreen("subjects");
                        }}
                      >
                        {g.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {screen === "subjects" && grade && (
        <div style={styles.screen}>
          <BackBar onBack={() => setScreen("grade")} title={grade.name} />
          <h2 style={styles.heading}>ماذا تريد أن تتعلّم اليوم؟</h2>
          <p style={styles.sectionSubtitle}>اختر مادة، ولنبدأ درسًا جديدًا معًا.</p>
          <div style={styles.grid}>
            {subjectsForThisGrade.map((s) => (
              <button
                key={s.slug}
                style={styles.subjectCard}
                onClick={() => {
                  setSubjectSlug(s.slug);
                  setScreen("units");
                }}
              >
                <div style={styles.subjectText}>{s.name}</div>
                <div style={styles.subjectIconBox}>{ICONS[s.icon] ?? "📘"}</div>
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

function TopBar() {
  return (
    <div style={styles.topBar}>
      <div style={styles.avatarChip}>ط</div>
      <div style={styles.bellWrap}>
        <span>🔔</span>
        <span style={styles.bellDot} />
      </div>
      <div style={styles.topBarTitle}>اختيار المرحلة الدراسية</div>
      <div style={styles.hamburger}>☰</div>
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

const STAGE_ICONS: Record<string, string> = {
  early: "✨",
  primary: "📖",
  prep: "🎓",
};

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
    background: "#f7faff",
    color: "#122452",
    direction: "rtl",
    fontFamily: `"Cairo", "Cairo Variable", Tahoma, Arial, sans-serif`,
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
  topBar: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  avatarChip: {
    width: 40, height: 40, borderRadius: 999, background: "#eff6ff", color: "#122452",
    display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16,
  },
  bellWrap: { position: "relative", fontSize: 20 },
  bellDot: { position: "absolute", top: -2, left: -2, width: 8, height: 8, borderRadius: 999, background: "#ef4444" },
  topBarTitle: { fontWeight: 800, fontSize: 17, color: "#102354" },
  hamburger: { fontSize: 20, color: "#102354" },
  kicker: { color: "#f6b91b", fontWeight: 700, textAlign: "center", marginBottom: 4 },
  heroTitle: { fontSize: 26, fontWeight: 800, textAlign: "center", color: "#102354", margin: "8px 0" },
  heroSubtitle: { fontSize: 14, color: "#64748b", textAlign: "center", marginBottom: 20 },
  achieveCard: {
    display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: 14,
    background: "#eff6ff", borderRadius: 20, padding: 18, marginBottom: 20,
  },
  achieveIcon: {
    width: 48, height: 48, borderRadius: 16, background: "#2455d6",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
  },
  achieveLabel: { color: "#2455d6", fontWeight: 700, fontSize: 13, marginBottom: 2 },
  achieveText: { color: "#122452", fontSize: 14, fontWeight: 600 },
  stageCard: {
    background: "#ffffff", borderRadius: 28, boxShadow: "0 10px 30px rgba(18, 36, 82, .07)",
    padding: 20, marginBottom: 18,
  },
  stageHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 },
  stageTitle: { fontWeight: 800, fontSize: 18, color: "#102354" },
  stageHint: { fontSize: 13, color: "#64748b", marginTop: 2 },
  stageIcon: {
    width: 44, height: 44, borderRadius: 14, background: "#fff7e0",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
  },
  stageGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  gradeBtn: {
    width: "100%", border: "1px solid #eff6ff", background: "#f7faff",
    borderRadius: 15, padding: "16px 10px", fontWeight: 700, fontSize: 15, color: "#122452", cursor: "pointer",
  },
  popularBadge: {
    position: "absolute", top: -10, right: 10, background: "#22c55e", color: "#fff",
    fontSize: 11, fontWeight: 700, borderRadius: 999, padding: "2px 10px", zIndex: 1,
  },
  heading: { fontSize: 20, margin: "12px 0", fontWeight: 800, color: "#102354" },
  sectionSubtitle: { fontSize: 14, color: "#64748b", marginBottom: 16 },
  label: { color: "#2455d6", fontWeight: 700, marginTop: 16, marginBottom: 4 },
  body: { lineHeight: 1.8, color: "#334155" },
  grid: { display: "flex", flexDirection: "column", gap: 12 },
  subjectCard: {
    display: "flex", flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between",
    border: "none", background: "#ffffff", boxShadow: "0 10px 30px rgba(18, 36, 82, .07)",
    borderRadius: 20, padding: 18, cursor: "pointer",
  },
  subjectText: { fontWeight: 700, fontSize: 16, color: "#102354" },
  subjectIconBox: {
    width: 48, height: 48, borderRadius: 14, background: "#eff6ff",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
  },
  unitRow: {
    display: "block", width: "100%", textAlign: "right", border: "none", background: "#ffffff",
    boxShadow: "0 10px 30px rgba(18, 36, 82, .07)", borderRadius: 18, padding: 16, marginBottom: 10, cursor: "pointer",
  },
  optionRow: {
    display: "block", width: "100%", textAlign: "right", border: "1px solid #eff6ff", background: "#ffffff",
    borderRadius: 14, padding: 14, marginBottom: 10, fontSize: 16, cursor: "pointer", color: "#122452",
  },
  cardTitle: { fontWeight: 700, fontSize: 16, color: "#102354" },
  cardDesc: { fontSize: 13, color: "#64748b", marginTop: 4 },
  title: { fontSize: 28, margin: "8px 0", color: "#102354" },
  subtitle: { color: "#64748b", marginBottom: 16 },
  primaryBtn: {
    background: "#2455d6", color: "#fff", border: "none", borderRadius: 999,
    padding: "14px 28px", fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 12,
  },
  secondaryBtn: {
    background: "transparent", color: "#64748b", border: "1px solid #eff6ff",
    borderRadius: 999, padding: "10px 24px", fontSize: 14, cursor: "pointer", marginTop: 8,
  },
  audioBadge: { background: "#eff6ff", color: "#2455d6", padding: "8px 12px", borderRadius: 10, fontSize: 13, marginBottom: 8, fontWeight: 600 },
  backBar: { display: "flex", alignItems: "center", gap: 12, marginBottom: 8 },
  backBtn: { background: "none", border: "none", color: "#2455d6", fontSize: 15, cursor: "pointer", fontWeight: 700 },
  backTitle: { color: "#64748b", fontSize: 14 },
};
