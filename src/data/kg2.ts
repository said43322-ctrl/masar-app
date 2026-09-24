import { SUBJECTS } from "./catalog";
import type { GradeDef, SubjectDef, UnitTemplate, LessonTemplate, QuizQ } from "./catalog";

export function subjectsForGrade(grade?: GradeDef): SubjectDef[] {
  if (grade?.stage === "early") {
    return SUBJECTS.filter((s) => ["math", "arabic", "english"].includes(s.slug));
  }
  return SUBJECTS;
}

export const UNITS_BY_SUBJECT_KG2: Record<string, UnitTemplate[]> = {
  math: [
    { title: "الأعداد من 1 إلى 20", description: "نعدّ ونقارن الأرقام الأكبر" },
    { title: "الجمع والطرح البسيط", description: "نجمع ونطرح بالأصابع والصور في حدود 10" },
  ],
  arabic: [
    { title: "الحروف والحركات", description: "الفتحة والضمة والكسرة مع الحروف" },
    { title: "كلمات وجمل قصيرة", description: "نقرأ كلمات وجمل بسيطة" },
  ],
  english: [
    { title: "Letters & Words", description: "More letters and simple 3-letter words" },
    { title: "Numbers & Family", description: "Numbers 1 to 5 and family words" },
  ],
};

function L(title: string, objectives: string, content: string, examples: string, durationMins = 12): LessonTemplate {
  return { title, objectives, content, examples, durationMins, audioPriority: true };
}

export function lessonsForUnitKG2(subjectSlug: string, unitTitle: string): LessonTemplate[] {
  if (subjectSlug === "math") {
    if (unitTitle.includes("الأعداد")) {
      return [
        L(
          "أعدّ من 11 إلى 20",
          "أن يعدّ حتى 20 • أن يرتب الأرقام",
          "نكمل العدّ سوا! 🎵\n\n11، 12، 13، 14، 15، 16، 17، 18، 19، 20 — كرّرها ورايا بصوت عالي.\nكل 10 أصابع بنقول عشرة، وبعدها بنكمل: عشرة وواحد = 11.\nنشاط: عدّ 15 لعبة أو مكعب وانت بتقول الرقم بصوتك.",
          "11 كرة • 15 مكعب • 20 إصبع (إيد ورجل)"
        ),
        L(
          "أقارن: أكبر وأصغر",
          "أن يقارن بين رقمين • أن يستخدم أكبر وأصغر",
          "أي رقم أكبر؟ 🤔\n\nالرقم اللي بييجي بعد في العدّ يبقى أكبر: 8 أكبر من 5.\nالرقم اللي بييجي قبل يبقى أصغر: 3 أصغر من 7.\nنشاط: هات كومتين من المكعبات، عدّهم وقول أنهي كومة أكبر.",
          "8 أكبر من 5 • 3 أصغر من 7"
        ),
      ];
    }
    return [
      L(
        "أجمع بالأصابع",
        "أن يجمع أعداد صغيرة • أن يستخدم أصابعه",
        "الجمع يعني نضيف! ➕\n\nمعايا 2 تفاحة وجابولي 3 كمان. نعدّ الكل: 1، 2، 3، 4، 5.\n2 + 3 = 5.\nنشاط: افرد 4 أصابع وضيف إصبعين وعدّ الكل بصوتك.",
        "2 + 3 = 5 • 4 + 2 = 6 • 5 + 5 = 10"
      ),
      L(
        "أطرح: بيروح كام؟",
        "أن يفهم الطرح كأنه أخذ شيء • أن يطرح في حدود 10",
        "الطرح يعني ناخد حاجة بعيد! ➖\n\nمعايا 5 بلالين وطارت 2. فاضل 3.\n5 − 2 = 3.\nنشاط: هات 6 لعب، شيل 2 وعدّ الباقي بصوتك.",
        "5 − 2 = 3 • 6 − 1 = 5 • 10 − 5 = 5"
      ),
    ];
  }

  if (subjectSlug === "arabic") {
    if (unitTitle.includes("الحروف")) {
      return [
        L(
          "الفتحة: بَ تَ ثَ",
          "أن ينطق الحرف مع الفتحة • أن يميز شكلها",
          "الفتحة شرطة صغيرة فوق الحرف وبنقول معاها «أَ». 🎧\n\nبَ، تَ، ثَ، جَ، حَ.\nاسمع وكرر كل صوت 3 مرات بصوت عالي.",
          "بَ (بَطَّة) • تَ (تَمر) • جَ (جَمَل)"
        ),
        L(
          "الضمة والكسرة: بُ بِ",
          "أن يفرق بين الضمة والكسرة • أن ينطقهما",
          "الضمة فوق الحرف وبنقول معاها «أُ»، والكسرة تحت الحرف وبنقول معاها «إِ». 🎵\n\nبُ، تُ، جُ  /  بِ، تِ، جِ.\nكرر ورايا وحرّك إيدك: لفوق للضمة، ولتحت للكسرة.",
          "بُ • بِ • تُ • تِ"
        ),
      ];
    }
    return [
      L(
        "كلمات بسيطة: بابا وماما",
        "أن يقرأ كلمات قصيرة • أن يربطها بمعناها",
        "نقرأ سوا! 👨‍👩‍👧\n\nبَابَا، مَامَا، بَطَّة.\nاسمع الكلمة وقولها ورايا وبعدين قول أول حرف فيها.",
        "بابا (ب) • ماما (م) • بطة (ب)"
      ),
      L(
        "جملة قصيرة: أنا أحب ماما",
        "أن يردد جملة كاملة • أن يعرف الكلمة والجملة",
        "الجملة كلمتين أو تلاتة مع بعض. 💛\n\nأنا أحب ماما.\nاسمعها وكررها بصوت عالي، وبعدين قول جملة عن حاجة بتحبها.",
        "أنا أحب ماما • أنا أحب بابا"
      ),
    ];
  }

  if (subjectSlug === "english") {
    if (unitTitle.includes("Letters")) {
      return [
        L(
          "Letters G, H, I",
          "Recognize G, H, I • Say each sound",
          "Let's sing the sounds! 🎵\n\nG — like Goat 🐐\nH — like Hat 🎩\nI — like Ice 🧊\n\nListen and repeat each sound three times.",
          "G: Goat • H: Hat • I: Ice",
          10
        ),
        L(
          "Three-letter words",
          "Read simple words: cat, dog, sun",
          "Small words, big fun! 🐱🐶☀️\n\nc-a-t = cat\nd-o-g = dog\ns-u-n = sun\n\nSay each letter sound, then say the whole word.",
          "cat • dog • sun",
          10
        ),
      ];
    }
    return [
      L(
        "Numbers 1 to 5",
        "Say numbers 1-5 in English",
        "Let's count! 🖐️\n\nOne, two, three, four, five.\nCount your fingers out loud and show me the number with your hand.",
        "one • two • three • four • five",
        10
      ),
      L(
        "My family",
        "Say mom, dad, sister, brother",
        "Family words! 👨‍👩‍👧‍👦\n\nMom, Dad, Sister, Brother.\nPoint to each person in your family and say the English word.",
        "Mom • Dad • Sister • Brother",
        10
      ),
    ];
  }

  return [];
}

export function questionsForLessonKG2(subjectSlug: string, lessonIdx: number): QuizQ[] {
  const banks: Record<string, QuizQ[]> = {
    math: [
      { q: "2 + 3 = ؟", opts: ["4", "5", "6"], correct: 1, exp: "2 وتلاتة يبقوا 5." },
      { q: "أي رقم أكبر: 8 ولا 5؟", opts: ["8", "5"], correct: 0, exp: "8 بييجي بعد 5 في العدّ، يبقى أكبر." },
      { q: "الرقم اللي بعد 14 هو؟", opts: ["13", "15", "16"], correct: 1, exp: "بعد 14 بييجي 15." },
      { q: "معاك 5 بلالين وطارت 2، فاضل كام؟", opts: ["3", "4", "2"], correct: 0, exp: "5 − 2 = 3." },
      { q: "عدّ: 🍎🍎🍎🍎 كام تفاحة؟", opts: ["3", "4", "5"], correct: 1, exp: "عدّينا 4 تفاحات." },
    ],
    arabic: [
      { q: "أول حرف في كلمة «بطة» هو؟", opts: ["ب", "ت", "ط"], correct: 0, exp: "بطة تبدأ بحرف الباء." },
      { q: "الحركة اللي فوق الحرف في «بَ» اسمها؟", opts: ["فتحة", "ضمة", "كسرة"], correct: 0, exp: "الشرطة الصغيرة فوق الحرف اسمها فتحة." },
      { q: "الحركة اللي تحت الحرف في «بِ» اسمها؟", opts: ["فتحة", "ضمة", "كسرة"], correct: 2, exp: "الحركة تحت الحرف اسمها كسرة." },
      { q: "أي كلمة معناها الأم؟", opts: ["بابا", "ماما", "بطة"], correct: 1, exp: "ماما هي الأم." },
      { q: "أول حرف في كلمة «جمل» هو؟", opts: ["ج", "ح", "خ"], correct: 0, exp: "جمل تبدأ بحرف الجيم." },
    ],
    english: [
      { q: "Which letter does 'Hat' start with?", opts: ["H", "A", "T"], correct: 0, exp: "Hat starts with H." },
      { q: "How many? 🍎🍎🍎", opts: ["Two", "Three", "Four"], correct: 1, exp: "There are three apples." },
      { q: "What is a 'cat'?", opts: ["An animal", "A fruit", "A color"], correct: 0, exp: "A cat is an animal." },
      { q: "Who is 'Mom'?", opts: ["Mother", "Brother", "Teacher"], correct: 0, exp: "Mom means mother." },
      { q: "What color is the sun?", opts: ["Yellow", "Blue", "Green"], correct: 0, exp: "The sun is yellow." },
    ],
  };
  const bank = banks[subjectSlug] ?? banks.math;
  const r = [...bank.slice(lessonIdx % bank.length), ...bank.slice(0, lessonIdx % bank.length)];
  return r.slice(0, 5);
}
