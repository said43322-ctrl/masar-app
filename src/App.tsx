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

          <div style={styles.heroTopBar}>
            <button style={styles.studentLoginBtn} onClick={goHome}>دخول الطالب</button>
            <div style={styles.heroBrandRow}>
              <div style={styles.heroBrandText}>
                <span style={styles.heroBrandTitle}>تَعَلَّم</span>
                <span style={styles.tagline}>اِفْهَم • تَقَدَّم • تَمَيَّز</span>
              </div>
              <span style={styles.heroLogoBadge}>🎓</span>
            </div>
          </div>

          <div style={styles.heroBody}>
            <span style={styles.pillChip}>✨ تعلّم بذكاء، وتقدّم بثقة</span>

            <h1 style={styles.heroHeading}>
              كلُّ درسٍ يقرّبك
              <br />
              <span style={styles.heroHeadingAccent}>من حُلمك</span>
            </h1>

            <p style={styles.heroParagraph}>
              رحلة تعليمية ممتعة، دروس مبسّطة واختبارات تفاعلية تساعدك على فهم موادك وتحقيق أفضل النتائج.
            </p>

            <button style={styles.primaryBtn} onClick={goHome}>
              <span style={styles.btnArrowCircle}>←</span>
              ابدأ رحلتك الآن
            </button>

            <div style={styles.socialProofRow}>
              <div style={styles.avatarStack}>
                <span style={{ ...styles.avatarCircle, background: "#FFD7A8" }}>ع</span>
                <span style={{ ...styles.avatarCircle, background: "#A8F0D1" }}>س</span>
                <span style={{ ...styles.avatarCircle, background: "#D6C9FA" }}>م</span>
              </div>
              <span style={styles.socialProofText}>أكثر من +10 آلاف طالب يتعلّم معنا</span>
            </div>

            <div style={styles.checksRow}>
              <span style={styles.checkItem}>✅ محتوى مطابق للمنهج</span>
              <span style={styles.checkItem}>✅ يعمل على كل الأجهزة</span>
            </div>

            <div style={styles.progressPeekCard}>
              <span style={styles.progressPeekLabel}>🏆 تقدّمك اليوم</span>
              <div style={styles.quizProgressTrack}>
                <div style={{ ...styles.quizProgressFill, width: "35%" }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === "grade" && (
        <div style={styles.screen}>
          <div style={styles.topBar}>
            <span style={styles.topBarIconBtn}>☰</span>
            <span style={styles.topBarTitle}>اختيار المرحلة الدراسية</span>
            <span style={styles.topBarRightCluster}>
              <span style={styles.topBarBell}>
                🔔
                <span style={styles.topBarBellDot} />
              </span>
              <span style={styles.topAvatar}>ط</span>
            </span>
          </div>

          <span style={styles.sectionTag}>✨ لنبدأ من هنا</span>
          <div style={styles.welcomeBox}>
            <span style={styles.welcomeEmoji}>👋</span>
            <h2 style={styles.welcomeTitle}>أهلًا بك يا بطل!</h2>
            <p style={styles.welcomeSub}>اختر مرحلتك وصفّك الدراسي لنجهّز لك المحتوى المناسب.</p>
          </div>

          <div style={styles.achievementCard}>
            <span style={styles.achievementIcon}>🏅</span>
            <span style={styles.unitTextWrap}>
              <span style={styles.achievementLabel}>إنجازاتك</span>
              <span style={styles.achievementText}>ابدأ أول اختبار وتابع تقدّمك هنا</span>
            </span>
          </div>

          {STAGES.map((stage) => {
            const stageGrades = GRADES.filter((g) => g.stage === stage.key);
            return (
              <div key={stage.key} style={styles.stageGroupCard}>
                <div style={styles.stageHeaderRow}>
                  <span style={styles.stageIconBadge}>{STAGE_ICONS[stage.key]}</span>
                  <span style={styles.unitTextWrap}>
                    <span style={styles.stageTitle}>{stage.label}</span>
                    <span style={styles.stageHint}>{stage.hint}</span>
                  </span>
                </div>
                <div style={styles.stageGradeGrid}>
                  {stageGrades.map((g) => (
                    <button
                      key={g.slug}
                      style={styles.gradeChip}
                      onClick={() => {
                        setGradeSlug(g.slug);
                        setScreen("subjects");
                      }}
                    >
                      <span style={styles.gradeChipDot} />
                      {g.slug === "g1" && <span style={styles.popularBadge}>شائع</span>}
                      <span style={styles.gradeChipName}>{g.name}</span>
                    </button>
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

const STAGE_ICONS: Record<string, string> = {
  early: "✨",
  primary: "📖",
  prep: "🧭",
};

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
  heroTopBar: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "20px 20px 0",
  },
  studentLoginBtn: {
    background: COLORS.cardBg,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 999,
    padding: "10px 18px",
    fontSize: 13,
    fontWeight: 800,
    color: COLORS.textDark,
    cursor: "pointer",
    fontFamily: FONT,
    boxShadow: "0 4px 10px rgba(16,35,84,.06)",
  },
  heroBrandRow: { display: "flex", alignItems: "center", gap: 10 },
  heroBrandText: { display: "flex", flexDirection: "column", alignItems: "flex-end" },
  heroBrandTitle: { fontSize: 20, fontWeight: 900, color: COLORS.textDark },
  heroLogoBadge: {
    display: "grid",
    placeItems: "center",
    width: 44,
    height: 44,
    borderRadius: 14,
    background: COLORS.primary,
    color: "white",
    fontSize: 20,
    boxShadow: "0 8px 18px rgba(36,85,214,.30)",
  },
  heroBody: {
    position: "relative",
    zIndex: 1,
    padding: "28px 24px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 14,
  },
  pillChip: {
    display: "inline-block",
    background: COLORS.cardBg,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 999,
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 800,
    color: COLORS.primary,
    boxShadow: "0 4px 10px rgba(16,35,84,.06)",
  },
  heroHeading: { fontSize: 32, fontWeight: 900, lineHeight: 1.35, color: COLORS.textDark, margin: "6px 0" },
  heroHeadingAccent: {
    color: COLORS.primary,
    borderBottom: `6px solid ${COLORS.accent}`,
    paddingBottom: 2,
  },
  heroParagraph: { color: COLORS.textMuted, fontSize: 15, lineHeight: 1.9, maxWidth: 340 },
  socialProofRow: { display: "flex", alignItems: "center", gap: 10, marginTop: 6 },
  avatarStack: { display: "flex" },
  avatarCircle: {
    display: "grid",
    placeItems: "center",
    width: 30,
    height: 30,
    borderRadius: "50%",
    fontWeight: 900,
    fontSize: 13,
    color: COLORS.textDark,
    border: "2px solid white",
    marginInlineStart: -8,
  },
  socialProofText: { fontSize: 13, fontWeight: 700, color: COLORS.textMuted },
  checksRow: { display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" },
  checkItem: { fontSize: 13, fontWeight: 700, color: COLORS.textDark },
  progressPeekCard: {
    marginTop: 18,
    width: "100%",
    maxWidth: 340,
    background: COLORS.cardBg,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 18,
    padding: 16,
    boxShadow: "0 10px 24px rgba(16,35,84,.10)",
  },
  progressPeekLabel: { fontSize: 13, fontWeight: 800, color: COLORS.textDark, marginBottom: 8, display: "block" },
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
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  topBarIconBtn: { fontSize: 20, color: COLORS.textDark },
  topBarTitle: { fontSize: 15, fontWeight: 800, color: COLORS.textDark },
  topBarRightCluster: { display: "flex", alignItems: "center", gap: 10 },
  topBarBell: { position: "relative", fontSize: 18 },
  topBarBellDot: {
    position: "absolute",
    top: -2,
    left: -2,
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#EF4444",
    border: "2px solid white",
  },
  topAvatar: {
    display: "grid",
    placeItems: "center",
    width: 34,
    height: 34,
    borderRadius: 10,
    background: "#E0E7FF",
    color: COLORS.primaryDark,
    fontWeight: 900,
    fontSize: 14,
  },
  sectionTag: {
    display: "block",
    color: "#F59E0B",
    fontWeight: 800,
    fontSize: 13,
    textAlign: "center",
    marginBottom: 4,
  },
  achievementCard: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    background: "#EFF6FF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },
  achievementIcon: {
    display: "grid",
    placeItems: "center",
    width: 46,
    height: 46,
    borderRadius: 14,
    background: COLORS.primary,
    fontSize: 20,
  },
  achievementLabel: { color: COLORS.primary, fontWeight: 800, fontSize: 13 },
  achievementText: { color: COLORS.textDark, fontWeight: 700, fontSize: 14, marginTop: 2 },
  stageGroupCard: {
    background: COLORS.cardBg,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    boxShadow: "0 4px 14px rgba(16,35,84,.06)",
  },
  stageHeaderRow: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 },
  stageIconBadge: {
    display: "grid",
    placeItems: "center",
    width: 44,
    height: 44,
    borderRadius: 14,
    background: "#FEF3C6",
    fontSize: 20,
    flexShrink: 0,
  },
  stageTitle: { fontSize: 17, fontWeight: 900, color: COLORS.textDark },
  stageHint: { fontSize: 12, color: COLORS.textMuted, fontWeight: 600, marginTop: 2 },
  stageGradeGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  gradeChip: {
    position: "relative",
    border: `1px solid ${COLORS.border}`,
    background: COLORS.bg,
    borderRadius: 14,
    padding: "16px 10px",
    textAlign: "center",
    cursor: "pointer",
    fontFamily: FONT,
  },
  gradeChipDot: {
    position: "absolute",
    top: 8,
    right: 10,
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: COLORS.border,
  },
  gradeChipName: { fontWeight: 800, fontSize: 15, color: COLORS.textDark },
  popularBadge: {
    position: "absolute",
    top: -10,
    left: "50%",
    transform: "translateX(50%)",
    background: "#10B981",
    color: "white",
    fontSize: 10,
    fontWeight: 800,
    padding: "3px 10px",
    borderRadius: 999,
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
