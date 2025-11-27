import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Koliko često gledate pornografiju?",
    options: [
      { text: "Više puta dnevno", score: 3 },
      { text: "Jednom dnevno", score: 2 },
      { text: "Nekoliko puta nedeljno", score: 1 },
      { text: "Retko", score: 0 }
    ]
  },
  {
    id: 2,
    question: "Koji je vaš glavni 'okidač' (trigger)?",
    options: [
      { text: "Stres i anksioznost", type: "stress", score: 1 },
      { text: "Dosada i usamljenost", type: "boredom", score: 1 },
      { text: "Umor ili nesanica", type: "fatigue", score: 1 },
      { text: "Nasumična potreba", type: "habit", score: 2 }
    ]
  },
  {
    id: 3,
    question: "U koje doba dana ste najranjiviji?",
    options: [
      { text: "Ujutru odmah nakon buđenja", type: "morning" },
      { text: "Tokom dana (pauze)", type: "day" },
      { text: "Kasno uveče / pre spavanja", type: "night" },
      { text: "Vikendom", type: "weekend" }
    ]
  },
  {
    id: 4,
    question: "Kako se osećate odmah nakon gledanja?",
    options: [
      { text: "Krivica i sramota", score: 3 },
      { text: "Prazno i bezvoljno", score: 2 },
      { text: "Opušteno, ali kratkotrajno", score: 1 },
      { text: "Nemam posebne emocije", score: 0 }
    ]
  },
  {
    id: 5,
    question: "Da li to utiče na vaš stvarni seksualni život ili veze?",
    options: [
      { text: "Da, značajno (ED, gubitak interesa)", score: 3 },
      { text: "Ponekad primećujem probleme", score: 2 },
      { text: "Nisam siguran/na", score: 1 },
      { text: "Ne utiče", score: 0 }
    ]
  },
  {
    id: 6,
    question: "Koliko dugo pokušavate da prestanete?",
    options: [
      { text: "Ovo mi je prvi put", type: "newbie", score: 0 },
      { text: "Pokušavao sam nekoliko puta", type: "experienced", score: 1 },
      { text: "Godinama se borim", type: "veteran", score: 2 },
      { text: "Nisam ozbiljno pokušavao do sad", type: "casual", score: 0 }
    ]
  },
  {
    id: 7,
    question: "Da li koristite pornografiju da izbegnete teške emocije?",
    options: [
      { text: "Da, gotovo uvek", score: 3 },
      { text: "Često", score: 2 },
      { text: "Ponekad", score: 1 },
      { text: "Ne, to je samo navika", score: 0 }
    ]
  },
  {
    id: 8,
    question: "Koliko ste motivisani da prestanete (1-10)?",
    options: [
      { text: "10 - Spreman sam na sve", score: 0 },
      { text: "7-9 - Želim promenu", score: 1 },
      { text: "4-6 - Nisam siguran mogu li", score: 2 },
      { text: "1-3 - Samo razgledam", score: 3 }
    ]
  },
  {
    id: 9,
    question: "Da li imate podršku (prijatelji, partner, terapeut)?",
    options: [
      { text: "Nemam nikoga, sam/a sam", type: "solo" },
      { text: "Imam nekoga ali ne znaju za ovo", type: "secret" },
      { text: "Imam punu podršku", type: "supported" },
      { text: "Tražim online zajednicu", type: "seeking" }
    ]
  },
  {
    id: 10,
    question: "Šta vam je glavni cilj?",
    options: [
      { text: "Potpuna apstinencija zauvek", type: "quit" },
      { text: "Smanjenje učestalosti", type: "reduce" },
      { text: "Vraćanje samopouzdanja", type: "confidence" },
      { text: "Bolji fokus i energija", type: "energy" }
    ]
  }
];

