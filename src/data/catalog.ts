// ============================================================
// مواد كل مرحلة: KG بدون علوم ودراسات اجتماعية
// ============================================================
export function subjectsForGrade(grade?: GradeDef): SubjectDef[] {
  if (!grade) return SUBJECTS;
  if (grade.stage === "early") {
    return SUBJECTS.filter((s) => ["math", "arabic", "english"].includes(s.slug));
  }
  return SUBJECTS;
}

// ============================================================
// محتوى KG2 مخصص (نفس فلسفة KG1: جمل قصيرة وتكرار وتسميع صوتي)
// ============================================================
export const UNITS_BY_SUBJECT_KG2: Record<string, UnitTemplate[]> = {
  math: [
    { title: "الأعداد من 11 إلى 20", description: "نكمل العدّ ونتعرف على شكل الأرقام من 11 لـ20" },
    { title: "الجمع البسيط بالصور", description: "نجمع عددين صغيرين باستخدام أصابعنا والصور" },
  ],
  arabic: [
    { title: "من الحرف للكلمة", description: "نركّب حروف بسيطة عشان نكوّن كلمة قصيرة" },
    { title: "قصة قصيرة بالصور", description: "نسمع قصة صغيرة ونجاوب سؤال بسيط عنها" },
  ],
  english: [
    { title: "Numbers 1-10", description: "Counting and recognizing numbers in English" },
    { title: "My First Words", description: "Simple words and a short two-word sentence" },
  ],
};

export function lessonsForUnitKG2(subjectSlug: string, unitTitle: string): LessonTemplate[] {
  switch (subjectSlug) {
    case "math":
      if (unitTitle.includes("11")) {
        return [
          {
            title: "أعدّ من 11 لـ 20",
            objectives: "أن يكمل العدّ من 11 لـ20 • أن يميز شكل الأرقام المكوّنة من خانتين",
            content: `يلا نكبّر شوية في العدّ! 🎉\n\n11، 12، 13... لغاية 20 — كرّرها ورايا بصوت عالي.\n\nكل رقم من 11 لـ19 فيه "10 + رقم"، يعني 15 = 10 + 5.\n\nنشاط: صفّ 15 حاجة (مكعبات أو لعب) وعدّها بصوتك واحدة واحدة.`,
            examples: "11 قلم • 15 = 10 + 5 • 20 إصبع (إيدين صاحبك)",
            durationMins: 12,
            audioPriority: true,
          },
        ];
      }
      return [
        {
          title: "أجمع اتنين بالصور",
          objectives: "أن يجمع عددين صغيرين بمساعدة أصابعه أو صور • أن يفهم معنى «زيادة»",
          content: `الجمع يعني بنزوّد! ➕\n\n2 تفاحة + 1 تفاحة = 3 تفاحات. نعدّهم مع بعض من الأول.\n\nاستخدم أصابعك: ارفع إصبعين، وبعدين إصبع، وعدّهم كلهم.\n\nنشاط صوتي: قول المسألة بصوتك وعدّ بإصابعك وانت بتحل.`,
          examples: "2 + 1 = 3 • 3 + 2 = 5",
          durationMins: 12,
          audioPriority: true,
        },
      ];
    case "arabic":
      if (unitTitle.includes("الحرف")) {
        return [
          {
            title: "من الحرف للكلمة: بيت وباب",
            objectives: "أن يركّب حروفاً بسيطة لتكوين كلمة • أن ينطق الكلمة كاملة بوضوح",
            content: `دلوقتي هنركّب حروف عشان تبقى كلمة! 🧩\n\nب + ي + ت = بيت.\nب + ا + ب = باب.\n\nاستمع لكل حرف لوحده، وبعدين لكل الحروف مع بعض، وحاول تقول الكلمة كاملة بصوتك.`,
            examples: "ب+ي+ت = بيت • ب+ا+ب = باب",
            durationMins: 12,
            audioPriority: true,
          },
        ];
      }
      return [
        {
          title: "حكاية الأرنب الصغير",
          objectives: "أن يستمع لقصة قصيرة • أن يجاوب سؤال بسيط عنها",
          content: `يلا نسمع حكاية! 🐰\n\n«كان فيه أرنب صغير بيحب الجزر، كل يوم كان بيروح الحديقة وياكل جزرة، وبعدين يرجع بيته سعيد.»\n\nسؤال: الأرنب كان بيحب ياكل إيه؟ جاوب بصوتك.`,
          examples: "أرنب 🐰 • جزر 🥕",
          durationMins: 10,
          audioPriority: true,
        },
      ];
    case "english":
      if (unitTitle.includes("Numbers")) {
        return [
          {
            title: "Numbers 1 to 10",
            objectives: "Count from 1 to 10 in English • Recognize the number word and quantity",
            content: `Let's count in English! 🔢\n\nOne, two, three, four, five, six, seven, eight, nine, ten.\n\nSay each number loudly and hold up your fingers as you count.`,
            examples: "1: one • 5: five • 10: ten",
            durationMins: 12,
            audioPriority: true,
          },
        ];
      }
      return [
        {
          title: "My First Words: Mom, Dad, Cat",
          objectives: "Say simple words clearly • Build a 2-word sentence",
          content: `Let's learn our first words! 👨‍👩‍👧\n\nMom, Dad, Cat, Dog.\n\nTry a short sentence: "Hi Mom!" or "My cat".\n\nSay each word three times out loud.`,
          examples: "Mom • Dad • My cat",
          durationMins: 10,
          audioPriority: true,
        },
      ];
    default:
      return [];
  }
}

export function questionsForLessonKG2(subjectSlug: string, lessonIdx: number): QuizQ[] {
  const banks: Record<string, QuizQ[]> = {
    math: [
      { q: "بعد الرقم 14 بييجي؟", opts: ["13", "15", "20"], correct: 1, exp: "بعد 14 بييجي 15 في العدّ." },
      { q: "2 + 1 = ؟", opts: ["2", "3", "4"], correct: 1, exp: "لما نجمع 2 و1 مع بعض بيبقوا 3." },
    ],
    arabic: [
      { q: "ب + ي + ت = ؟", opts: ["باب", "بيت", "بنت"], correct: 1, exp: "لما نركّب الحروف دي بنكوّن كلمة «بيت»." },
      { q: "الأرنب في الحكاية كان بيحب ياكل إيه؟", opts: ["جزر", "لحمة", "سمك"], correct: 0, exp: "الأرنب كان بيحب ياكل الجزر." },
    ],
    english: [
      { q: "What comes after 'four'?", opts: ["three", "five", "ten"], correct: 1, exp: "After four comes five." },
      { q: "Which word means «قطة»؟", opts: ["Dog", "Cat", "Mom"], correct: 1, exp: "Cat means «قطة»." },
    ],
  };
  const bank = banks[subjectSlug] ?? banks.math;
  const rotated = [...bank.slice(lessonIdx % bank.length), ...bank.slice(0, lessonIdx % bank.length)];
  return rotated.slice(0, 4);
}
