export type StageKey = "early" | "primary" | "prep";

export interface GradeDef {
  slug: string;
  name: string;
  stage: StageKey;
  stageLabel: string;
  sortOrder: number;
  description: string;
  colorFrom: string;
  colorTo: string;
}

export const STAGES: { key: StageKey; label: string; hint: string }[] = [
  { key: "early", label: "مرحلة الطفولة المبكرة", hint: "تأسيس ممتع باللعب والألوان" },
  { key: "primary", label: "المرحلة الابتدائية", hint: "بناء الأساس في كل المواد" },
  { key: "prep", label: "المرحلة الإعدادية", hint: "تعمّق واستعداد للتفوق" },
];

export const GRADES: GradeDef[] = [
  { slug: "kg1", name: "KG1", stage: "early", stageLabel: "مرحلة الطفولة المبكرة", sortOrder: 1, description: "أول خطوات التعلم بالمرح والاكتشاف", colorFrom: "#F59E0B", colorTo: "#EF4444" },
  { slug: "kg2", name: "KG2", stage: "early", stageLabel: "مرحلة الطفولة المبكرة", sortOrder: 2, description: "تجهيز للقراءة والكتابة والأرقام", colorFrom: "#EC4899", colorTo: "#8B5CF6" },
  { slug: "g1", name: "الصف الأول", stage: "primary", stageLabel: "المرحلة الابتدائية", sortOrder: 3, description: "الحروف والأرقام ومهارات الأساس", colorFrom: "#3B82F6", colorTo: "#1E40AF" },
  { slug: "g2", name: "الصف الثاني", stage: "primary", stageLabel: "المرحلة الابتدائية", sortOrder: 4, description: "القراءة والجمع والطرح بثقة", colorFrom: "#10B981", colorTo: "#047857" },
  { slug: "g3", name: "الصف الثالث", stage: "primary", stageLabel: "المرحلة الابتدائية", sortOrder: 5, description: "الضرب والقواعد والاستكشاف", colorFrom: "#F59E0B", colorTo: "#B45309" },
  { slug: "g4", name: "الصف الرابع", stage: "primary", stageLabel: "المرحلة الابتدائية", sortOrder: 6, description: "الكسور والنحو والعلوم", colorFrom: "#8B5CF6", colorTo: "#5B21B6" },
  { slug: "g5", name: "الصف الخامس", stage: "primary", stageLabel: "المرحلة الابتدائية", sortOrder: 7, description: "توسع في الرياضيات واللغة", colorFrom: "#06B6D4", colorTo: "#0E7490" },
  { slug: "g6", name: "الصف السادس", stage: "primary", stageLabel: "المرحلة الابتدائية", sortOrder: 8, description: "الاستعداد للمرحلة الإعدادية", colorFrom: "#EF4444", colorTo: "#991B1B" },
  { slug: "p1", name: "الأول الإعدادي", stage: "prep", stageLabel: "المرحلة الإعدادية", sortOrder: 9, description: "الجبر والعلوم بأسلوب أعمق", colorFrom: "#6366F1", colorTo: "#312E81" },
  { slug: "p2", name: "الثاني الإعدادي", stage: "prep", stageLabel: "المرحلة الإعدادية", sortOrder: 10, description: "الهندسة والنصوص والتحليل", colorFrom: "#0D9488", colorTo: "#134E4A" },
  { slug: "p3", name: "الثالث الإعدادي", stage: "prep", stageLabel: "المرحلة الإعدادية", sortOrder: 11, description: "القمة: مراجعة شاملة وتفوق", colorFrom: "#1E3A8A", colorTo: "#0F172A" },
];

export interface SubjectDef {
  slug: string;
  name: string;
  nameEn: string;
  icon: string;
  colorFrom: string;
  colorTo: string;
  description: string;
}

export const SUBJECTS: SubjectDef[] = [
  { slug: "math", name: "الرياضيات", nameEn: "Mathematics", icon: "calculator", colorFrom: "#3B82F6", colorTo: "#1E40AF", description: "أرقام وعمليات وهندسة وتفكير منطقي" },
  { slug: "arabic", name: "اللغة العربية", nameEn: "Arabic", icon: "book", colorFrom: "#22C55E", colorTo: "#15803D", description: "قراءة ونحو وإملاء وبلاغة" },
  { slug: "english", name: "English", nameEn: "English Language", icon: "language", colorFrom: "#FB923C", colorTo: "#C2410C", description: "Vocabulary, Grammar & Stories" },
  { slug: "science", name: "العلوم", nameEn: "Science", icon: "flask", colorFrom: "#A855F7", colorTo: "#6B21A8", description: "كائنات حية ومادة وطاقة وحركة" },
  { slug: "social", name: "الدراسات الاجتماعية", nameEn: "Social Studies", icon: "globe", colorFrom: "#2DD4BF", colorTo: "#0F766E", description: "جغرافيا وتاريخ ومواطنة" },
];

export interface UnitTemplate {
  title: string;
  description: string;
}

export const UNITS_BY_SUBJECT: Record<string, UnitTemplate[]> = {
  math: [
    { title: "الجبر والحساب", description: "العمليات الأربع والأنماط العددية والكسور" },
    { title: "الهندسة والقياس", description: "الأشكال والزوايا والمساحة والمحيط" },
    { title: "الإحصاء والاحتمالات", description: "البيانات والرسوم والاحتمال البسيط" },
  ],
  arabic: [
    { title: "القراءة والنصوص", description: "فهم المقروء والمفردات والتذوق الأدبي" },
    { title: "النحو والصرف", description: "الجملة الاسمية والفعلية وعلامات الإعراب" },
    { title: "الإملاء والخط", description: "الهمزات والتاء المربوطة وقواعد الكتابة" },
  ],
  english: [
    { title: "Vocabulary", description: "Daily words, family, school and nature" },
    { title: "Grammar", description: "Present simple, plurals and pronouns" },
    { title: "Reading Stories", description: "Short stories and comprehension" },
  ],
  science: [
    { title: "الكائنات الحية", description: "النبات والحيوان وجسم الإنسان" },
    { title: "المادة والطاقة", description: "حالات المادة والحرارة والضوء" },
    { title: "القوى والحركة", description: "الدفع والسحب والسرعة والاحتكاك" },
  ],
  social: [
    { title: "الجغرافيا والبيئة", description: "الخريطة والمناخ والبيئات" },
    { title: "التاريخ والحضارة", description: "الحضارات القديمة والشخصيات" },
    { title: "المواطنة والوطن", description: "الحقوق والواجبات والانتماء" },
  ],


export interface LessonTemplate {
  title: string;
  objectives: string;
  content: string;
  examples: string;
  durationMins: number;
  audioPriority?: boolean;

  export function lessonsForUnit(subjectSlug: string, unitTitle: string, gradeName: string): LessonTemplate[] {
  const G = gradeName;
  switch (subjectSlug) {
    case "math":
      if (unitTitle.includes("الجبر")) {
        return [
          {
            title: `المفاهيم الأساسية في الحساب (${G})`,
            objectives: "أن يجمع ويطرح بثقة • أن يميز القيمة المكانية • أن يحل مسائل لفظية بسيطة",
            content: `في هذا الدرس نتدرّب على العمليات الأساسية خطوة بخطوة.\n\n1) القيمة المكانية: الآحاد والعشرات والمئات. مثال: العدد 345 فيه 5 آحاد و4 عشرات و3 مئات.\n2) الجمع بالحمل: 47 + 28 = ؟ نجمع الآحاد 7+8=15 نكتب 5 ونحمل 1، ثم العشرات 4+2+1=7 فيكون الناتج 75.\n3) الطرح بالاستلاف: 62 - 27 = ؟ نستلف من العشرات فيصبح 12-7=5 ثم 5-2=3 والناتج 35.\n4) استراتيجية الحل: افهم المسألة، حدّد المطلوب، اختر العملية، تحقق من إجابتك بالتقدير.\n\nنصيحة التفوق: قدّر الناتج أولاً (50+30=80) ثم احسب بدقة لتكتشف أي خطأ بسرعة.`,
            examples: "47 + 28 = 75 • 62 − 27 = 35 • مسألة: مع سارة 35 قلماً واشترت 17، المجموع 52 قلماً.",
            durationMins: 15,
          },
          {
            title: `تطبيقات وتمارين الحساب (${G})`,
            objectives: "حل مسائل كلامية • استخدام الجداول • تنمية سرعة الحساب الذهني",
            content: `الآن نطبّق ما تعلمناه في مواقف حقيقية.\n\n• التسوق: إذا كان سعر القصة 12 درهماً والدفتر 9 دراهم، فالمجموع 21 درهماً.\n• الأنماط: 3، 6، 9، 12... القاعدة +3 والحد التالي 15.\n• الكسور المصورة: نصف الدائرة + ربعها = ثلاثة أرباع.\n• الحساب الذهني: 99 + 25 = (100 + 25) − 1 = 124.\n\nتدريب: اكتب مسألة من حياتك اليومية وحلّها بطريقتين مختلفتين ثم قارن النتائج.`,
            examples: "12 + 9 = 21 • النمط 3،6،9،12،15 • 99+25=124 ذهنياً",
            durationMins: 20,
          },
        ];
      }
      if (unitTitle.includes("الهندسة")) {
        return [
          {
            title: `الأشكال والزوايا (${G})`,
            objectives: "تمييز المربع والمستطيل والمثلث والدائرة • قياس الزاوية • التفرقة بين المحيط والمساحة",
            content: `الهندسة حولنا في كل مكان!\n\n• المربع: 4 أضلاع متساوية و4 زوايا قائمة. محيطه = طول الضلع × 4.\n• المستطيل: كل ضلعين متقابلين متساويان. مساحته = الطول × العرض.\n• المثلث: 3 أضلاع و3 زوايا مجموعها 180 درجة.\n• الدائرة: مركز ونصف قطر وقطر = ضعف نصف القطر.\n\nمثال: مستطيل طوله 6 وعرضه 4، محيطه = (6+4)×2 = 20، ومساحته = 6×4 = 24.`,
            examples: "محيط مربع ضلعه 5 = 20 • مساحة مستطيل 6×4 = 24 • مجموع زوايا المثلث 180°",
            durationMins: 18,
          },
          {
            title: `القياس والمساحة عملياً (${G})`,
            objectives: "استخدام المسطرة • التحويل بين الوحدات • حساب المساحة والمحيط",
            content: `نقيس ونحسب مثل المهندسين.\n\n• الطول: 1 متر = 100 سم. قس طول كتابك وسجّله.\n• المساحة بالشبكة: عدّ المربعات الكاملة وأنصاف المربعات.\n• الحجم البسيط: مكعب طول حرفه 3 حجمه 27 وحدة مكعبة.\n• نشاط: ارسم غرفتك على ورق مربعات بمقياس مبسط واحسب مساحتها التقريبية.`,
            examples: "1م = 100سم • 1كم = 1000م • ارسم واحسب",
            durationMins: 20,
          },
        ];
      }
      return [
        {
          title: `قراءة البيانات والرسوم (${G})`,
          objectives: "قراءة الجداول والأعمدة • استخراج المعلومة • تمثيل البيانات",
          content: `البيانات تحكي قصصاً!\n\n• جدول الحضور: قارن بين الأيام وأوجد الأكثر والأقل.\n• الأعمدة البيانية: طول العمود يمثل العدد.\n• المتوسط: اجمع الأعداد واقسم على عددها. مثال: 4،6،8 متوسطها (4+6+8)÷3 = 6.\n• نشاط: اسأل 10 من زملائك عن فاكهتهم المفضلة ومثّل النتائج بأعمدة ملوّنة.`,
          examples: "متوسط 4،6،8 = 6 • الأطول = الأكثر",
          durationMins: 15,
        },
        {
          title: `الاحتمال واللعب بالحظ (${G})`,
          objectives: "فهم المؤكد والممكن والمستحيل • تجربة العملة والحجر",
          content: `هل ستمطر غداً؟ هذا احتمال!\n\n• مؤكد: الشمس تشرق صباحاً.\n• ممكن: ظهور صورة عند رمي العملة.\n• مستحيل: أن يطير القلم وحده.\n• تجربة: ارمِ العملة 20 مرة وسجّل النتائج، ستقترب الصورة والكتابة من التساوي.\n• حجر النرد: احتمال ظهور 6 هو وجه واحد من 6 أوجه.`,
          examples: "مؤكد / ممكن / مستحيل • تجربة 20 رمية",
          durationMins: 15,
        },
      ];
    case "arabic":
      if (unitTitle.includes("القراءة")) {
        return [
          {
            title: `فهم المقروء والمفردات (${G})`,
            objectives: "قراءة جهرية سليمة • استخراج الفكرة العامة • توظيف مفردات جديدة",
            content: `نقرأ قصة «النحلة النشيطة»:\n\n«في صباح مشمس خرجت النحلة لجمع الرحيق من الأزهار، تنقلت بين الحقول وهي تطنّ بسعادة، وعادت إلى الخلية محمّلة بالخير لتشارك صديقاتها.»\n\n• الفكرة العامة: العمل والتعاون.\n• مفردات: الرحيق (عصارة الزهر الحلوة)، الخلية (بيت النحل)، تطنّ (صوت النحل).\n• استراتيجية: اقرأ مرتين، ضع خطاً تحت الكلمات الصعبة، لخّص القصة في جملتين من إنشائك.`,
            examples: "الفكرة: التعاون • الرحيق: عصارة الزهر • لخّص في جملتين",
            durationMins: 20,
          },
          {
            title: `التذوق الأدبي والتعبير (${G})`,
            objectives: "تحديد الشخصيات والمكان • إبداء الرأي • كتابة فقرة قصيرة",
            content: `نتعمق في النص ونعبّر بأسلوبنا.\n\n• عناصر القصة: الشخصيات (النحلة)، المكان (الحقل)، الزمان (الصباح)، الأحداث، النهاية.\n• عبّر: هل أعجبك تصرف النحلة؟ ولماذا؟\n• اكتب فقرة من 4 أسطر عن «يوم في الحديقة» مستخدماً كلمات: مشمس، أزهار، فراشات، سعادة.\n• علامات الترقيم: النقطة (.) والفاصلة (،) وعلامة الاستفهام (؟) والتعجب (!).`,
            examples: "عناصر القصة الخمسة • اكتب 4 أسطر • استخدم علامات الترقيم",
            durationMins: 20,
          },
        ];
      }
      if (unitTitle.includes("النحو")) {
        return [
          {
            title: `الجملة الاسمية والفعلية (${G})`,
            objectives: "التفريق بين نوعي الجملة • تحديد المبتدأ والخبر والفعل والفاعل",
            content: `لغتنا جميلة ومنظمة!\n\n• الجملة الاسمية تبدأ باسم: «العلمُ نورٌ». العلم: مبتدأ مرفوع، نور: خبر مرفوع.\n• الجملة الفعلية تبدأ بفعل: «يكتبُ الطالبُ الدرسَ». يكتب: فعل مضارع، الطالب: فاعل مرفوع، الدرس: مفعول به منصوب.\n• تدريب: حوّل «الحديقةُ جميلةٌ» إلى فعلية: «تجمّلت الحديقةُ بالأزهار».\n• لعبة: استخرج من درسك 3 جمل اسمية و3 فعلية وحدّد أركانها.`,
            examples: "العلمُ نورٌ (اسمية) • يكتب الطالبُ الدرسَ (فعلية)",
            durationMins: 18,
          },
          {
            title: `علامات الإعراب والضمائر (${G})`,
            objectives: "ضبط أواخر الكلمات • استخدام الضمائر • المثنى والجمع",
            content: `نضبط لغتنا كالمحترفين.\n\n• المفرد: قلمٌ، المثنى: قلمانِ، الجمع: أقلامٌ.\n• الضمائر: أنا، نحن، أنتَ، أنتِ، هو، هي، هم.\n• مثال: «هما يلعبان في الحديقة» — هما للمثنى.\n• الإملاء النحوي: الفاعل دائماً مرفوع، والمفعول به منصوب.\n• نشاط: اكتب 5 جمل بضمائر مختلفة واضبطها بالشكل.`,
            examples: "قلم/قلمان/أقلام • أنا نحن هو هي • الفاعل مرفوع",
            durationMins: 18,
          },
        ];
      }
      return [
        {
          title: `الهمزات والتاء (${G})`,
          objectives: "كتابة الهمزة correctly • التفريق بين التاء المربوطة والمفتوحة والهاء",
          content: `نكتب بلا أخطاء!\n\n• التاء المربوطة (ة) تنطق هاء عند الوقف: مدرسة، حديقة. تقبل التنوين.\n• التاء المفتوحة (ت): بنت، بيت، كتبتُ.\n• الهاء (ه): وجه، مياه — بدون نقطتين ولا تقبل التنوين.\n• الهمزة المتوسطة: انظر لحركتها وحركة ما قبلها، الأقوى يكسب (الكسرة أقوى ثم الضمة ثم الفتحة).\n• اختبار سريع: «مدرسة / بنت / وجه» — حدّد نوع التاء والهاء.`,
          examples: "مدرسة (ة) • بنت (ت) • وجه (ه)",
          durationMins: 15,
        },
        {
          title: `الخط العربي الجميل (${G})`,
          objectives: "تحسين خط النسخ • الالتزام بالسطر • كتابة فقرة بخط واضح",
          content: `خطّك عنوانك!\n\n• حروف تنزل عن السطر: ج ح خ ع غ م (في آخر الكلمة) ...\n• حروف تصعد: ا ل ك ط ظ.\n• النقاط بوضوح: ضع نقط الشين والثاء بدقة.\n• تدريب يومي 10 دقائق: انسخ فقرة من كتابك بخط النسخ وقارن تقدّمك أسبوعياً.\n• مسابقة الخط: اكتب بيتاً تحفظه وزيّنه بالألوان وشاركه مع معلمك.`,
          examples: "10 دقائق يومياً • حروف فوق وتحت السطر",
          durationMins: 15,

          },
      ];
    case "english":
      if (unitTitle.includes("Vocab")) {
        return [
          {
            title: `Daily Words & Family (${G})`,
            objectives: "Learn 12 new words • Use a/an • Talk about family",
            content: `Let's learn words with pictures and actions!\n\n• Family: father, mother, brother, sister, grandfather, grandmother.\n• School: book, pen, bag, desk, teacher, classroom.\n• Use a/an: a book, an apple (an before a,e,i,o,u).\n• Chant: «This is my father, he is kind. This is my mother, sweet and fine!»\n• Game: point to the picture and say the word in 3 seconds.`,
            examples: "a book / an apple • father, mother, brother, sister",
            durationMins: 15,
          },
          {
            title: `Nature & Colors in English (${G})`,
            objectives: "Colors, animals and weather • Make short sentences",
            content: `Describe the world around you!\n\n• Colors: red, blue, green, yellow, pink, brown.\n• Animals: cat, dog, bird, fish, lion, elephant.\n• Weather: sunny, rainy, cloudy, windy.\n• Sentence: «The bird is blue. It can fly.» / «Today is sunny.»\n• Activity: draw your pet and write 3 sentences about it.`,
            examples: "The cat is brown • Today is sunny",
            durationMins: 15,
          },
        ];
      }
      if (unitTitle.includes("Grammar")) {
        return [
          {
            title: `Present Simple & Plurals (${G})`,
            objectives: "Use I/you/we/they + verb • Add -s with he/she • Make plurals",
            content: `Grammar is fun!\n\n• I play football. She plays tennis. (add -s with he/she/it)\n• Negative: I do not (don't) like milk. She does not (doesn't) like tea.\n• Plurals: book→books, box→boxes, baby→babies.\n• Pronouns: I, you, he, she, it, we, they.\n• Quiz yourself: «He ___ (go/goes) to school.» Answer: goes.`,
            examples: "I play / She plays • book→books • He goes",
            durationMins: 18,
          },
          {
            title: `Questions & Prepositions (${G})`,
            objectives: "Ask with What/Where/How • Use in/on/under correctly",
            content: `Ask and answer!\n\n• What is this? It is a pen.\n• Where is the bag? It is on the desk.\n• in (inside): fish in the bowl. on (surface): book on the table. under: cat under the chair.\n• How old are you? I am eight years old.\n• Role play with a friend: one asks, one answers, then switch.`,
            examples: "Where? on/under/in • What is this? It is...",
            durationMins: 15,
          },
        ];
      }
      return [
        {
          title: `Short Story: The Lost Kite (${G})`,
          objectives: "Read a story • Answer who/where • Retell in own words",
          content: `Read and enjoy!\n\n«Sam has a red kite. One windy day, the kite flies high... and away! Sam runs after it. A kind girl holds the string. “Thank you!” says Sam. They fly the kite together and become friends.»\n\n• Who? Sam and a girl. What? A red kite. Where? In the park.\n• New words: windy (كثير الرياح), string (خيط), kind (لطيف).\n• Retell the story in 3 sentences.`,
          examples: "Who/What/Where • windy, string, kind",
          durationMins: 20,
        },
        {
          title: `Comprehension & Writing (${G})`,
          objectives: "Answer true/false • Order events • Write 4 sentences",
          content: `Show what you understood!\n\n• True or False: The kite is blue. (False — it is red)\n• Order: 1) Sam flies the kite 2) The kite flies away 3) The girl helps 4) They become friends.\n• Write: «My favorite toy is... It is... I play with...» (4 sentences)\n• Tip: start with capital letter and end with a full stop.`,
          examples: "True/False • Order 1-4 • Write 4 sentences",
          durationMins: 20,
        },
      ];
    case "science":
      if (unitTitle.includes("الكائنات")) {
        return [
          {
            title: `النبات والحيوان (${G})`,
            objectives: "أجزاء النبات ووظائفها • احتياجات الكائن الحي • تصنيف الحيوانات",
            content: `الحياة من حولنا مدهشة!\n\n• أجزاء النبات: الجذر (يمتص الماء)، الساق (يحمل وينقل)، الورقة (تصنع الغذاء بالبناء الضوئي)، الزهرة (تكوّن الثمار).\n• احتياجات الكائن: ماء وهواء وغذاء ومسكن مناسب.\n• الحيوانات: ثدييات تلد وترضع (قطة)، طيور تبيض وتطير (عصفور)، أسماك تعيش في الماء وتتنفس بالخياشيم.\n• تجربة: ازرع حبتي فول، اسقِ واحدة واحجب الماء عن الأخرى، لاحظ الفرق بعد أسبوع.`,
            examples: "الجذر يمتص الماء • الورقة تصنع الغذاء • جرّب زراعة الفول",
            durationMins: 20,
          },
          {
            title: `جسم الإنسان والحواس (${G})`,
            objectives: "أعضاء الجسم • الحواس الخمس • العادات الصحية",
            content: `جسمك آلة رائعة!\n\n• الحواس: البصر (العين)، السمع (الأذن)، الشم (الأنف)، التذوق (اللسان)، اللمس (الجلد).\n• الأعضاء: القلب يضخ الدم، الرئتان للتنفس، المعدة لهضم الطعام، العظام للدعم والحماية.\n• عادات صحية: اغسل يديك، نم 8 ساعات، اشرب الماء، قلّل الحلويات، مارس الرياضة.\n• نشاط: ارسم جسم الإنسان وحدّد 5 أعضاء ووظيفة كل منها.`,
            examples: "القلب يضخ الدم • 5 حواس • نم جيداً واشرب الماء",
            durationMins: 18,
          },
        ];
      }
      if (unitTitle.includes("المادة")) {
        return [
          {
            title: `حالات المادة وتحولاتها (${G})`,
            objectives: "صلب وسائل وغاز • الانصهار والتجمد والتبخر • تجارب آمنة",
            content: `كل شيء حولك مادة!\n\n• الصلب: شكل ثابت (كتاب). السائل: يأخذ شكل الإناء (ماء). الغاز: ينتشر (هواء).\n• بالتسخين: الثلج (صلب) ← ماء (سائل) ← بخار (غاز).\n• بالتبريد يحدث العكس: التكاثف والتجمد.\n• تجربة: ضع مكعب ثلج في طبق وراقبه كل 5 دقائق وسجّل ملاحظاتك بالرسم والكلمات.`,
            examples: "ثلج ← ماء ← بخار • الصلب ثابت والسائل ينساب",
            durationMins: 18,
          },
          {
            title: `الطاقة والحرارة والضوء (${G})`,
            objectives: "مصادر الطاقة • انتقال الحرارة • الظل والانعكاس",
            content: `الطاقة تحرّك العالم!\n\n• مصادر: الشمس (حرارة وضوء)، الكهرباء، الغذاء (طاقة للجسم).\n• الحرارة تنتقل من الساخن إلى البارد. جرّب: ملعقة معدنية في كوب شاي دافئ.\n• الضوء يسير بخط مستقيم ويكوّن الظل. المرآة تعكس الضوء.\n• ترشيد: أطفئ المصباح عند الخروج، واستخدم ضوء الشمس نهاراً.`,
            examples: "الشمس مصدر رئيسي • الظل خلف الجسم المعتم",
            durationMins: 15,
          },
        ];
      }
      return [
        {
          title: `القوى: الدفع والسحب (${G})`,
          objectives: "تعريف القوة • أثرها على الحركة • الاحتكاك",
          content: `ادفع واسحب ولاحظ!\n\n• القوة دفع أو سحب تغيّر الحركة: تسرّع أو تبطئ أو توقف أو تغيّر الاتجاه.\n• الاحتكاك قوة تعاكس الحركة: على الرمل كبير، وعلى الجليد صغير.\n• المغناطيس يجذب الحديد دون لمس — جرّب بأشياء من البيت وصنّفها: ينجذب / لا ينجذب.\n• السلامة: ادفع الأبواب بهدوء ولا تدفع زملاءك في الطابور.`,
          examples: "الدفع يحرّك • الاحتكاك يعاكس • المغناطيس يجذب الحديد",
          durationMins: 15,
        },
        {
          title: `الحركة والسرعة (${G})`,
          objectives: "وصف الحركة • مقارنة السرعات • قياس المسافة والزمن",
          content: `من الأسرع؟\n\n• الحركة تغيّر المكان مع الزمن.\n• السرعة = المسافة ÷ الزمن. من يقطع مسافة أكبر في زمن أقل فهو الأسرع.\n• سباق السيارات الورقية: قس المسافة بالمتر والزمن بالثواني وسجّل في جدول.\n• حركة الحيوانات: الفهد سريع، السلحفاة بطيئة — لكلٍّ تكيفه الخاص.`,
          examples: "السرعة = المسافة ÷ الزمن • قس وسجّل",
          durationMins: 15,
        },
      ];
    case "social":
    default:
      if (unitTitle.includes("الجغرافيا")) {
        return [
          {
            title: `الخريطة والاتجاهات (${G})`,
            objectives: "عناصر الخريطة • الاتجاهات الأربعة • قراءة الرموز",
            content: `كن مستكشفاً صغيراً!\n\n• عناصر الخريطة: العنوان، المفتاح (الرموز)، الاتجاه (الشمال)، المقياس.\n• الاتجاهات: شمال، جنوب، شرق، غرب. تشرق الشمس من الشرق.\n• الرموز: خط أزرق = نهر، أخضر = سهول، بني = جبال.\n• نشاط: ارسم خريطة لغرفتك وضع مفتاحاً وحدّد الشمال.`,
            examples: "الشمس تشرق شرقاً • الأزرق نهر • ارسم خريطتك",
            durationMins: 15,
          },
          {
            title: `البيئات والمناخ (${G})`,
            objectives: "البيئة الصحراوية والساحلية والزراعية • التكيف • حماية البيئة",
            content: `بيئات بلادنا متنوعة وجميلة!\n\n• الصحراوية: حارة قليلة المطر، نباتات تتحمل العطش كالنخيل، وحيوانات كالجمل.\n• الساحلية: قرب البحر، صيد وأنشطة بحرية.\n• الزراعية: تربة خصبة وماء، محاصيل وخضروات.\n• دورنا: لا ترمِ النفايات، ازرع شجرة، وفّر الماء والكهرباء.`,
            examples: "الجمل يتكيف مع الصحراء • ازرع شجرة",
            durationMins: 15,
          },
        ];
      }
      if (unitTitle.includes("التاريخ")) {
        return [
          {
            title: `الحضارات القديمة (${G})`,
            objectives: "التعرف على حضارات • إنجازاتها • الاعتزاز بالتراث",
            content: `سافر عبر الزمن!\n\n• الحضارة المصرية: الأهرامات والكتابة الهيروغليفية ونهر النيل.\n• بلاد الرافدين: الكتابة المسمارية والعجلة.\n• الآثار تحكي: الفخار والعملات والمباني القديمة.\n• نشاط: زر (ولو افتراضياً عبر الصور) متحفاً واكتب 3 معلومات أعجبتك.`,
            examples: "الأهرامات • الكتابة المسمارية • زر متحفاً",
            durationMins: 18,
          },
          {
            title: `شخصيات صنعت التاريخ (${G})`,
            objectives: "قدوات تاريخية • القيم المستفادة • البحث البسيط",
            content: `تعلّم من العظماء!\n\n• القائد والمعلم والعالم والطبيب — لكلٍّ دور في نهضة أمته.\n• القيم: الصدق والشجاعة والعلم والعمل.\n• مشروع: اختر شخصية، اجمع 5 معلومات عنها، واعرضها أمام صفك بلوحة مصورة.`,
            examples: "ابحث واعرض • 5 معلومات عن شخصيتك المفضلة",
            durationMins: 15,
          },
        ];
      }
      return [
        {
          title: `حقوقي وواجباتي (${G})`,
          objectives: "الحقوق الأساسية • الواجبات • احترام الآخرين",
          content: `مواطن صغير بأخلاق كبيرة!\n\n• حقوقك: التعليم والرعاية الصحية واللعب والأمان.\n• واجباتك: احترام المعلم والوالدين، الحفاظ على المدرسة، الالتزام بالنظام.\n• في الصف: استأذن قبل الكلام، شارك أدواتك، وساعد زميلك.\n• نشاط: اكتب «ميثاق صفّنا» مع زملائك وعلّقوه على الحائط.`,
          examples: "حق التعليم • واجب الاحترام • ميثاق الصف",
          durationMins: 15,
        },
        {
          title: `الانتماء للوطن (${G})`,
          objectives: "حب الوطن • الرموز الوطنية • المشاركة المجتمعية",
          content: `وطني أغلى ما أملك!\n\n• الرموز: العلم والنشيد والشعار — احترمها وقف بانتباه للنشيد.\n• المناسبات الوطنية: نحتفل بإنجازات الوطن ونتذكر تضحيات الأجداد.\n• مشاركتك: نظّف حديقتك، شارك في يوم تطوعي، وارفع اسم مدرستك بتفوقك.`,
          examples: "احترم العلم والنشيد • تطوّع وتفوّق",
          durationMins: 15,
        },
      ];

      export interface QuizQ {
  q: string;
  opts: string[];
  correct: number;
  exp: string;
}

export function questionsForLesson(subjectSlug: string, lessonIdx: number): QuizQ[] {
  const banks: Record<string, QuizQ[]> = {
    math: [
      { q: "ما ناتج 47 + 28 ؟", opts: ["65", "75", "71", "69"], correct: 1, exp: "7+8=15 نكتب 5 ونحمل 1، ثم 4+2+1=7 فيكون 75." },
      { q: "ما ناتج 62 − 27 ؟", opts: ["45", "25", "35", "39"], correct: 2, exp: "نستلف من العشرات: 12−7=5 ثم 5−2=3 فيكون 35." },
      { q: "ما محيط مربع طول ضلعه 5 سم؟", opts: ["10 سم", "15 سم", "20 سم", "25 سم"], correct: 2, exp: "المحيط = الضلع × 4 = 5×4 = 20 سم." },
      { q: "ما مساحة مستطيل طوله 6 وعرضه 4؟", opts: ["10", "20", "24", "14"], correct: 2, exp: "المساحة = الطول × العرض = 6×4 = 24." },
      { q: "ما متوسط الأعداد 4، 6، 8 ؟", opts: ["5", "6", "7", "9"], correct: 1, exp: "(4+6+8) ÷ 3 = 18 ÷ 3 = 6." },
      { q: "الحد التالي في النمط 3، 6، 9، 12 ... هو؟", opts: ["13", "14", "15", "18"], correct: 2, exp: "القاعدة +3، إذن 12+3=15." },
    ],
    arabic: [
      { q: "«العلمُ نورٌ» جملة ...", opts: ["فعلية", "اسمية", "استفهامية", "تعجبية"], correct: 1, exp: "بدأت باسم (العلم) فهي جملة اسمية." },
      { q: "الفاعل في «يكتبُ الطالبُ الدرسَ» هو ...", opts: ["يكتب", "الطالب", "الدرس", "الـ"], correct: 1, exp: "من قام بالكتابة؟ الطالب، وهو مرفوع." },
      { q: "الكلمة الصحيحة إملائياً:", opts: ["مدرست", "مدرسة", "مدرسه", "مدرصه"], correct: 1, exp: "مدرسة بالتاء المربوطة لأنها تقبل التنوين: مدرسةٌ." },
      { q: "مثنى كلمة «قلم» هو ...", opts: ["أقلام", "قلمان", "قلمون", "قليم"], correct: 1, exp: "المثنى بإضافة ان: قلمان." },
      { q: "من عناصر القصة:", opts: ["الشخصيات والمكان", "الجدول الدوري", "الكسور", "الخريطة"], correct: 0, exp: "القصة لها شخصيات ومكان وزمان وأحداث." },
      { q: "علامة الترقيم المناسبة للسؤال:", opts: ["(.)", "(،)", "(؟)", "(!)"], correct: 2, exp: "الجملة الاستفهامية تنتهي بعلامة (؟)." },
    ],
    english: [
      { q: "Choose the correct article: ___ apple", opts: ["a", "an", "the apple a", "no article"], correct: 1, exp: "We use 'an' before vowel sounds: an apple." },
      { q: "She ___ tennis every day.", opts: ["play", "plays", "playing", "played everyday"], correct: 1, exp: "With he/she/it we add -s: She plays." },
      { q: "Plural of 'box' is ...", opts: ["boxs", "boxes", "boxies", "boxen"], correct: 1, exp: "Words ending in x add -es: boxes." },
      { q: "___ is the bag? It is on the desk.", opts: ["What", "Who", "Where", "How old"], correct: 2, exp: "We ask about place with Where." },
      { q: "The opposite of 'sunny' is ...", opts: ["happy", "rainy", "red", "big"], correct: 1, exp: "Sunny (مشمس) opposite is rainy (ممطر)." },
      { q: "Choose the correct sentence:", opts: ["The bird is blue. It can fly.", "bird the blue is fly can it", "Is blue bird the fly", "Bird blue it fly can"], correct: 0, exp: "Start with capital, words in order, end with a full stop." },
    ],
    science: [
      { q: "الجزء الذي يمتص الماء في النبات هو ...", opts: ["الورقة", "الزهرة", "الجذر", "الساق"], correct: 2, exp: "الجذر يمتص الماء والأملاح من التربة." },
      { q: "العضو الذي يضخ الدم في جسم الإنسان:", opts: ["المعدة", "القلب", "الرئة", "العظام"], correct: 1, exp: "القلب عضلة تضخ الدم لكل الجسم." },
      { q: "تحوّل الثلج إلى ماء يسمى ...", opts: ["تجمد", "انصهار", "تبخر", "تكاثف"], correct: 1, exp: "الصلب إلى سائل بالتسخين = انصهار." },
      { q: "مصدر الطاقة الرئيسي للأرض:", opts: ["البطارية", "الشمس", "المصباح", "الرياح فقط"], correct: 1, exp: "الشمس تمنحنا الضوء والحرارة." },
      { q: "القوة التي تعاكس الحركة:", opts: ["الجاذبية فقط", "الاحتكاك", "المغناطيس", "الضوء"], correct: 1, exp: "الاحتكاك يعاكس اتجاه الحركة." },
      { q: "المغناطيس يجذب ...", opts: ["الخشب", "البلاستيك", "الحديد", "الورق"], correct: 2, exp: "المغناطيس يجذب المواد المصنوعة من الحديد." },
    ],
    social: [
      { q: "تشرق الشمس من جهة ...", opts: ["الغرب", "الشرق", "الشمال", "الجنوب"], correct: 1, exp: "الشمس تشرق من الشرق وتغرب في الغرب." },
      { q: "اللون الأزرق في الخريطة يرمز إلى ...", opts: ["الجبال", "الأنهار والبحار", "الصحراء", "المدن"], correct: 1, exp: "الأزرق للمسطحات المائية." },
      { q: "من إنجازات الحضارة المصرية:", opts: ["الأهرامات", "السيارات", "الهواتف", "الطائرات"], correct: 0, exp: "الأهرامات من عجائب الحضارة المصرية القديمة." },
      { q: "من حقوق الطفل:", opts: ["اللعب فقط", "التعليم والرعاية", "العمل الشاق", "ترك المدرسة"], correct: 1, exp: "لكل طفل حق التعليم والرعاية والأمان." },
      { q: "من واجبات التلميذ:", opts: ["احترام المعلم والنظام", "رمي النفايات", "إزعاج الزملاء", "إهمال الواجب"], correct: 0, exp: "الاحترام والالتزام أساس النجاح." },
      { q: "الحيوان الذي يتكيف مع الصحراء:", opts: ["البطريق", "الجمل", "الدب القطبي", "السمك"], correct: 1, exp: "الجمل يتحمل العطش والحرارة (سفينة الصحراء)." },
    ],
  };
  const bank = banks[subjectSlug] ?? banks.math;
  const rotated = [...bank.slice(lessonIdx % bank.length), ...bank.slice(0, lessonIdx % bank.length)];
  return rotated.slice(0, 5);
}

// ============================================================
// محتوى KG1 مخصص وحقيقي (مش نفس قالب باقي الصفوف مع تغيير الاسم)
// كل الدروس هنا مبنية على عمر 4-5 سنوات: جمل قصيرة، تكرار، وأولوية
// للتسميع الصوتي (audioPriority) بدل الاعتماد على القراءة.
// ============================================================

export const UNITS_BY_SUBJECT_KG1: Record<string, UnitTemplate[]> = {
  math: [
    { title: "الأعداد من 1 إلى 10", description: "نتعرّف على شكل كل رقم ونتعلم نعدّ الأشياء من حولنا" },
    { title: "الأشكال والألوان", description: "الدائرة والمربع والمثلث، والألوان الأساسية" },
  ],
  arabic: [
    { title: "الحروف الهجائية", description: "نتعرّف على شكل وصوت كل حرف من أ إلى ي" },
    { title: "الكلمة وصورتها", description: "نربط الكلمة البسيطة بالصورة المناسبة لها" },
  ],
  english: [
    { title: "Alphabet & Sounds", description: "Letters A to Z and the sound each one makes" },
    { title: "Colors & Shapes", description: "Naming colors and simple shapes in English" },
  ],
  science: [
    { title: "حواسّي الخمس", description: "أتعرّف على جسمي وأستخدم حواسي الخمس" },
    { title: "حيوانات ونباتات حولي", description: "أتعرّف على حيوانات ونباتات مألوفة وبيوتها" },
  ],
  social: [
    { title: "أسرتي وبيتي", description: "أفراد أسرتي وأدوار كل فرد فيها" },
    { title: "أصدقائي في الروضة", description: "المشاركة والتعاون واللعب الجماعي" },

  
  ],
};
  }
}
}

export function lessonsForUnitKG1(subjectSlug: string, unitTitle: string): LessonTemplate[] {
  switch (subjectSlug) {
    case "math":
      if (unitTitle.includes("الأعداد")) {
        return [
          {
            title: "أتعرّف على الأرقام 1، 2، 3",
            objectives: "أن يميز شكل الأرقام 1-3 • أن يعدّ أشياء حقيقية بصوته • أن يربط الرقم بعدد الأشياء",
            content: `يلا نعد مع بعض بصوت عالي! 🎵\n\n1 = إصبع واحد، زي شمعة على تورتة.\n2 = عين وعين، زي أذن وأذن.\n3 = زي المثلث، له 3 أضلاع.\n\nنشاط بالصوت: اسمع الأرقام واعدها بصوتك: واحد... اتنين... تلاتة.\nالعب معايا: هات 3 مكعبات وعدّهم بإصبعك وانت بتقول الرقم بصوت عالي.`,
            examples: "1 تفاحة • 2 عين • 3 قطط صغيرة",
            durationMins: 10,
            audioPriority: true,
          },
          {
            title: "أعدّ من 4 إلى 10",
            objectives: "أن يكمل العدّ من 4 لـ10 • أن يرتب الأرقام بالترتيب • تسميع صوتي للأرقام",
            content: `دلوقتي هنكمل العدّ سوا! 🎶\n\n4، 5، 6، 7، 8، 9، 10 — كرّرها ورايا بصوت عالي مرتين.\n\nلعبة الأصابع: افرد كل أصابع إيديك التنين وعدّهم واحد واحد لحد 10.\nنشاط: صفّ 10 لعب أو مكعبات، وعدّهم وانت بتسمّع الرقم بصوتك.`,
            examples: "4 كراسي • 7 أيام في الأسبوع • 10 أصابع",
            durationMins: 12,
            audioPriority: true,
          },
        ];
      }
      return [
        {
          title: "الدائرة والمربع والمثلث",
          objectives: "أن يميز بين 3 أشكال أساسية • أن يذكر أمثلة من حياته لكل شكل",
          content: `الأشكال حوالينا في كل حتة! 🔵🔶🔺\n\nالدائرة: زي العجلة والقمر، مفيش لها زوايا.\nالمربع: زي الشباك، له 4 أضلاع متساوية.\nالمثلث: زي شكل الهرم، له 3 أضلاع.\n\nاستمع للوصف وقول اسم الشكل بصوتك: "شكل مالوش زوايا، مستدير زي الكورة" — هو إيه؟`,
          examples: "الدائرة: كورة • المربع: شباك • المثلث: هرم",
          durationMins: 10,
          audioPriority: true,
        },
        {
          title: "الألوان الأساسية",
          objectives: "أن يسمي الألوان: أحمر، أزرق، أصفر، أخضر • أن يربط اللون بأشياء من حوله",
          content: `تعالوا نتفرج على الألوان الجميلة! 🌈\n\nالأحمر زي التفاحة والفراولة.\nالأزرق زي السماء والبحر.\nالأصفر زي الشمس والموز.\nالأخضر زي العشب والورق.\n\nنشاط صوتي: قول لون كل حاجة تشوفها حواليك دلوقتي بصوت عالي.`,
          examples: "أحمر: تفاحة • أزرق: سماء • أصفر: موز • أخضر: عشب",
          durationMins: 10,
          audioPriority: true,
        },
      ];
    case "arabic":
      if (unitTitle.includes("الحروف")) {
        return [
          {
            title: "حرف الألف والباء والتاء (أ ب ت)",
            objectives: "أن ينطق الحروف الثلاثة بوضوح • أن يميز شكل كل حرف",
            content: `يلا نسمع صوت كل حرف ونقوله ورا بعض! 🔤\n\nأ: زي أول اسم "أحمد".\nب: زي أول اسم "بابا".\nت: زي أول كلمة "تفاحة".\n\nاستمع كويس وكرر الصوت بعد كل حرف بصوت عالي وواضح.`,
            examples: "أ: أرنب • ب: بطة • ت: تفاحة",
            durationMins: 12,
            audioPriority: true,
          },
          {
            title: "حرف الثاء والجيم والحاء (ث ج ح)",
            objectives: "أن ينطق الحروف بمخارجها الصحيحة • تمييز صوت كل حرف",
            content: `نكمل رحلتنا مع الحروف! 🎧\n\nث: زي "ثعلب".\nج: زي "جمل".\nح: زي "حصان".\n\nاستمع للحرف وصوته وكرره 3 مرات بصوت عالي، وحاول تلاقي كلمة تانية تبدأ بنفس الحرف.`,
            examples: "ث: ثعلب • ج: جمل • ح: حصان",
            durationMins: 12,
            audioPriority: true,
          },
        ];
      }
      return [
        {
          title: "أربط الكلمة بالصورة: القطة والكلب",
          objectives: "أن يربط الكلمة المنطوقة بصورتها • إثراء المفردات",
          content: `استمع للكلمة وشوف الصورة اللي تناسبها! 🐱🐶\n\n"قطة" — حيوان صغير بيقول "مياو".\n"كلب" — حيوان بيحرس البيت وبينبح "هاو هاو".\n\nنشاط: اسمع الكلمة واختار الصورة الصح، وبعدين قول الكلمة بصوتك.`,
          examples: "قطة 🐱 • كلب 🐶",
          durationMins: 10,
          audioPriority: true,
        },
        {
          title: "أربط الكلمة بالصورة: الشمس والقمر",
          objectives: "أن يربط كلمات الطبيعة بصورها • تنمية الحصيلة اللغوية",
          content: `يلا نتعرف على السما! ☀️🌙\n\n"شمس" — بتضوي في النهار وبتدفينا.\n"قمر" — بيظهر بالليل مع النجوم.\n\nنشاط صوتي: قول "شمس" وارفع إيدك لفوق، قول "قمر" واعمل دايرة بإيدك.`,
          examples: "شمس ☀️ • قمر 🌙",
          durationMins: 10,
          audioPriority: true,
        },
      ];
    case "english":
      if (unitTitle.includes("Alphabet")) {
        return [
          {
            title: "Letters A, B, C",
            objectives: "Recognize the letters A, B, C • Say the sound of each letter",
            content: `Let's sing the sounds together! 🎵\n\nA — like "Apple" 🍎\nB — like "Ball" ⚽\nC — like "Cat" 🐱\n\nListen and repeat each sound out loud three times. Then say a word that starts with the same letter.`,
            examples: "A: Apple • B: Ball • C: Cat",
            durationMins: 10,
            audioPriority: true,
          },
          {
            title: "Letters D, E, F",
            objectives: "Recognize D, E, F • Practice listening and repeating sounds",
            content: `Time for more letters! 🎧\n\nD — like "Dog" 🐶\nE — like "Egg" 🥚\nF — like "Fish" 🐟\n\nListen to the sound of each letter and repeat it loudly. Can you find something at home that starts with the same sound?`,
            examples: "D: Dog • E: Egg • F: Fish",
            durationMins: 10,
            audioPriority: true,
          },
        ];
      }


  return [
        {
          title: "Colors: Red, Blue, Yellow",
          objectives: "Name basic colors • Match a color to a real object",
          content: `Let's learn colors! 🌈\n\nRed — like an apple 🍎\nBlue — like the sky 🟦\nYellow — like the sun ☀️\n\nListen to the color name and point to something around you with the same color, and say it out loud.`,
          examples: "Red: apple • Blue: sky • Yellow: sun",
          durationMins: 10,
          audioPriority: true,
        },
        {
          title: "Shapes: Circle, Square, Triangle",
          objectives: "Name basic shapes • Recognize shapes in daily objects",
          content: `Shapes are everywhere! 🔵🔶🔺\n\nCircle — like a wheel, no corners.\nSquare — like a window, 4 equal sides.\nTriangle — like a pyramid, 3 sides.\n\nListen and repeat each shape name loudly, then find something at home with that shape.`,
          examples: "Circle: wheel • Square: window • Triangle: pyramid",
          durationMins: 10,
          audioPriority: true,
        },
      ];
    case "science":
      if (unitTitle.includes("حواسّي")) {
        return [
          {
            title: "أعرف حواسي: العين والأذن",
            objectives: "أن يذكر وظيفة العين والأذن • ربط الحاسة بالحركة الجسدية",
            content: `جسمي فيه حواس رائعة! 👀👂\n\nالعين بشوف بيها الألوان والأشكال.\nالأذن بسمع بيها الأصوات زي صوت الطيور والموسيقى.\n\nنشاط صوتي: قفل عينك واسمع صوت حاجة حواليك، وقول لي إيه اللي سمعته.`,
            examples: "العين: تشوف • الأذن: تسمع",
            durationMins: 10,
            audioPriority: true,
          },
          {
            title: "أعرف حواسي: الأنف واللسان والجلد",
            objectives: "أن يذكر وظيفة الأنف واللسان والجلد • تمييز المذاق والملمس",
            content: `نكمل رحلة الحواس! 👃👅✋\n\nالأنف بشم بيه الروايح زي ريحة الورد.\nاللسان بيتذوق بيه: حلو، مالح، حامض.\nالجلد بحس بيه: سخن، بارد، ناعم، خشن.\n\nنشاط: قول لي حاجة حلوة أكلتها، وحاجة ناعمة لمستها.`,
            examples: "الأنف: يشم • اللسان: يتذوق • الجلد: يحس",
            durationMins: 10,
            audioPriority: true,
          },
        ];
      }
      return [
        {
          title: "حيوانات بيتي: القطة والعصفور",
          objectives: "أن يميز أصوات وحركات حيوانين مألوفين",
          content: `تعالوا نتعرف على حيوانات لطيفة! 🐱🐦\n\nالقطة: بتمشي على 4 أرجل وبتقول "مياو".\nالعصفور: بيطير بجناحين وبيغني "تويت تويت".\n\nنشاط صوتي: قلّد صوت القطة، وبعدين قلّد صوت العصفور.`,
          examples: "قطة: مياو 🐱 • عصفور: تويت 🐦",
          durationMins: 10,
          audioPriority: true,
        },
        {
          title: "نباتات حولي: الشجرة والزهرة",
          objectives: "أن يذكر أجزاء بسيطة للنبات: جذر، ساق، ورقة، زهرة",
          content: `النباتات جميلة وبتنمو زينا! 🌳🌸\n\nالشجرة: ليها جذع كبير وأوراق خضرا.\nالزهرة: ليها بتلات ملونة وريحة حلوة.\nالنبات محتاج: ماء وشمس وتراب عشان يكبر.\n\nنشاط: ارسم شجرة أو زهرة وسمّي أجزاءها بصوتك.`,
          examples: "شجرة 🌳 • زهرة 🌸 • ماء + شمس = نمو",
          durationMins: 10,
          audioPriority: true,
        },
      ];
    case "social":
      if (unitTitle.includes("أسرتي")) {
        return [
          {
            title: "أفراد أسرتي",
            objectives: "أن يسمي أفراد أسرته • أن يذكر دور كل فرد",
            content: `أسرتي هي أغلى ناس في حياتي! 👨‍👩‍👧‍👦\n\nبابا وماما بيهتموا بيا ويحبوني.\nإخواتي بلعب معاهم.\nجدي وجدتي بيحكولي حكايات جميلة.\n\nنشاط صوتي: قول أسماء أفراد أسرتك بصوت عالي واحد واحد.`,
            examples: "بابا • ماما • أخ/أخت • جدو وتيتة",
            durationMins: 10,
            audioPriority: true,
          },
          {
            title: "بيتي وغرفي",
            objectives: "أن يسمي غرف البيت الأساسية ووظيفة كل غرفة",
            content: `بيتي فيه أماكن كتير حلوة! 🏠\n\nالمطبخ: هنا بتعمل ماما الأكل.\nغرفة النوم: هنا بنام ونرتاح.\nالحمام: هنا بنستحم ونغسل إيدينا.\nالصالة: هنا بنقعد مع أسرتي ونتفرج.\n\nنشاط: امشي في بيتك وسمّي كل غرفة بصوت عالي.`,
            examples: "مطبخ • غرفة نوم • حمام • صالة",
            durationMins: 10,
            audioPriority: true,
          },
        ];
      }
      return [
        {
          title: "أصدقائي في الروضة",
          objectives: "أن يفهم معنى المشاركة والتعاون مع الأصدقاء",
          content: `أصدقائي في الروضة بيلعبوا معايا! 🧒🧒\n\nبنشارك اللعب مع بعض.\nبنقول "من فضلك" و"شكراً" لبعض.\nبنساعد صاحبنا لو وقع أو محتاج حاجة.\n\nنشاط صوتي: قول اسم صاحبك المفضل واحكي إيه بتحبوا تلعبوا مع بعض.`,
          examples: "مشاركة • تعاون • من فضلك / شكراً",
          durationMins: 10,
          audioPriority: true,
        },
        {
          title: "قواعد اللعب الجماعي",
          objectives: "أن يذكر قاعدتين بسيطتين للعب الجماعي الآمن",
          content: `عشان اللعب يبقى حلو للكل! 🤝\n\nناخد دورنا في اللعبة ومنتخانقش.\nنسمع لصاحبنا لما يتكلم.\nمنكسرش لعب أصحابنا.\n\nنشاط: احكي موقف لعبت فيه مع صاحبك وكنتوا بتتشاركوا فيه.`,
          examples: "خد دورك • اسمع لصاحبك • العب بأمان",
          durationMins: 10,
          audioPriority: true,
        },
      ];
    default:
      return [];
  }
}


export function questionsForLessonKG1(subjectSlug: string, lessonIdx: number): QuizQ[] {
  const banks: Record<string, QuizQ[]> = {
    math: [
      { q: "كام تفاحة في الصورة؟ (تفاحة واحدة)", opts: ["1", "2", "3"], correct: 0, exp: "شفنا تفاحة واحدة بس، يبقى الرقم 1." },
      { q: "الشكل اللي مالوش زوايا هو؟", opts: ["المربع", "الدائرة", "المثلث"], correct: 1, exp: "الدائرة مستديرة ومالهاش زوايا." },
      { q: "صح ولا غلط: الرقم 10 جاي بعد 9 مباشرة؟", opts: ["صح", "غلط"], correct: 0, exp: "بعد 9 بييجي 10 في العدّ." },
      { q: "لون التفاحة عادة إيه؟", opts: ["أزرق", "أحمر", "أسود"], correct: 1, exp: "التفاحة غالباً لونها أحمر." },
    ],
    arabic: [
      { q: "الحرف اللي بيبدأ بيه اسم «أحمد» هو؟", opts: ["أ", "ب", "ت"], correct: 0, exp: "أحمد يبدأ بحرف الألف (أ)." },
      { q: "الحيوان اللي بيقول «مياو» هو؟", opts: ["كلب", "قطة", "حصان"], correct: 1, exp: "القطة هي اللي بتقول مياو." },
      { q: "صح ولا غلط: الشمس بتظهر بالليل؟", opts: ["صح", "غلط"], correct: 1, exp: "الشمس بتظهر بالنهار، والقمر بالليل." },
      { q: "أول حرف في كلمة «تفاحة» هو؟", opts: ["ت", "ب", "ج"], correct: 0, exp: "تفاحة تبدأ بحرف التاء (ت)." },
    ],
    english: [
      { q: "Which letter does 'Apple' start with?", opts: ["A", "B", "C"], correct: 0, exp: "Apple starts with the letter A." },
      { q: "What color is the sky?", opts: ["Red", "Blue", "Yellow"], correct: 1, exp: "The sky is blue." },
      { q: "True or False: A ball is a square.", opts: ["True", "False"], correct: 1, exp: "A ball is a circle shape, not a square." },
      { q: "Which animal says 'Woof'?", opts: ["Cat", "Fish", "Dog"], correct: 2, exp: "The dog says 'Woof'." },
    ],
    science: [
      { q: "بنشوف بيها الألوان؟", opts: ["الأذن", "العين", "الأنف"], correct: 1, exp: "العين هي اللي بنشوف بيها." },
      { q: "الحيوان اللي بيطير هو؟", opts: ["القطة", "العصفور", "السمكة"], correct: 1, exp: "العصفور له جناحين وبيطير." },
      { q: "صح ولا غلط: النبات محتاج ماء وشمس عشان يكبر؟", opts: ["صح", "غلط"], correct: 0, exp: "النبات محتاج ماء وشمس وتراب عشان ينمو." },
      { q: "بنسمع بيها الأصوات؟", opts: ["الأذن", "اللسان", "الجلد"], correct: 0, exp: "الأذن هي اللي بنسمع بيها." },
    ],
    social: [
      { q: "مين بيحكيلنا حكايات جميلة في البيت؟", opts: ["الجيران", "جدو وتيتة", "البائع"], correct: 1, exp: "جدو وتيتة غالباً بيحكوا حكايات للأحفاد." },
      { q: "لو صاحبك وقع، إيه الصح إنك تعمله؟", opts: ["تضحك عليه", "تساعده", "متعملش حاجة"], correct: 1, exp: "المفروض نساعد صاحبنا لما يحتاج." },
      { q: "صح ولا غلط: من الصح إننا ناخد دورنا في اللعب؟", opts: ["صح", "غلط"], correct: 0, exp: "أخذ الدور من قواعد اللعب الجماعي الجميل." },
      { q: "فين بتنام في البيت؟", opts: ["المطبخ", "غرفة النوم", "الحمام"], correct: 1, exp: "غرفة النوم هي المكان اللي بننام فيه." },
    ],
  };
  const bank = banks[subjectSlug] ?? banks.math;
  const rotated = [...bank.slice(lessonIdx % bank.length), ...bank.slice(0, lessonIdx % bank.length)];
  return rotated.slice(0, 4);
}

export function gradeBySlug(slug: string): GradeDef | undefined {
  return GRADES.find((g) => g.slug === slug);
}

export function subjectBySlug(slug: string): SubjectDef | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}

