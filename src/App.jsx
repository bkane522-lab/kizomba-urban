import { useEffect, useMemo, useRef, useState } from "react";
import logoKizombaUrban from "../kizomba-urban-logo.png";

const AUDIO_URL = "https://kizomba-urban.vercel.app/kizomba-loop-v3.mp3?v=3";
const EXPERT_UNLOCK_XP = 260;

const PACKS = [
  {
    id: "decouverte",
    name: "Découverte",
    emoji: "🌙",
    color: "#f5c842",
    subtitle: "Les bases essentielles",
    difficulty: "Facile",
    description: "Kizomba, Urban Kiz et Semba pour commencer fort.",
    categories: ["kizomba", "urban-kiz", "semba"]
  },
  {
    id: "sensation",
    name: "Sensation",
    emoji: "🔥",
    color: "#ff3d81",
    subtitle: "Connexion & feeling",
    difficulty: "Moyen",
    description: "Tarraxo, Tarraxinha, douceur et contrôle du corps.",
    categories: ["tarraxo", "tarraxinha", "douceur"]
  },
  {
    id: "culture",
    name: "Culture",
    emoji: "🌍",
    color: "#4ecdc4",
    subtitle: "Histoire & racines",
    difficulty: "Moyen",
    description: "Origines, Angola, musicalité, respect et transmission.",
    categories: ["culture", "kizomba", "semba"]
  },
  {
    id: "fusion",
    name: "Fusion",
    emoji: "⚡",
    color: "#9c3dff",
    subtitle: "Styles modernes",
    difficulty: "Avancé",
    description: "Kizomba Fusion, Urban Kiz moderne et évolutions.",
    categories: ["fusion", "urban-kiz"]
  },
  {
    id: "expert",
    name: "Expert",
    emoji: "🧠",
    color: "#ffe27a",
    subtitle: "Ghetto Zouk & racines avancées",
    difficulty: "Expert",
    unlockXp: EXPERT_UNLOCK_XP,
    description: "Ghetto Zouk, Urban Kiz, Cabo Love, Pop Palop, R&B et histoire musicale.",
    categories: ["expert"]
  }
];

const LEVELS = [
  { name: "Rookie", emoji: "🌱", min: 0 },
  { name: "Danseur", emoji: "💃", min: 120 },
  { name: "Groove OG", emoji: "🔥", min: 260 },
  { name: "Galactic", emoji: "🌌", min: 450 }
];

const QUESTIONS = [
  {
    id: 1,
    category: "kizomba",
    question: "Quel pays est souvent présenté comme le berceau de la Kizomba ?",
    options: ["Angola", "Cuba", "Brésil", "Jamaïque"],
    answer: 0,
    fact: "La Kizomba est fortement associée à l’Angola, avec des influences du Semba et du Zouk.",
    card: {
      icon: "🇦🇴",
      title: "Angola",
      type: "Carte Pays",
      text: "Une racine essentielle pour comprendre l’identité culturelle de la Kizomba."
    }
  },
  {
    id: 2,
    category: "kizomba",
    question: "Quelle danse est considérée comme une racine importante de la Kizomba ?",
    options: ["Semba", "Tango", "Rock", "Flamenco"],
    answer: 0,
    fact: "Le Semba fait partie des racines importantes de la Kizomba.",
    card: {
      icon: "🥁",
      title: "Semba",
      type: "Carte Racine",
      text: "Le Semba aide à comprendre le mouvement, la marche et l’énergie de la Kizomba."
    }
  },
  {
    id: 3,
    category: "kizomba",
    question: "Dans la Kizomba, quel élément est essentiel entre les partenaires ?",
    options: ["La connexion", "La vitesse", "Les sauts", "La compétition"],
    answer: 0,
    fact: "La connexion permet de guider, ressentir et danser avec fluidité.",
    card: {
      icon: "🤝",
      title: "Connexion",
      type: "Carte Technique",
      text: "La connexion transforme les pas en dialogue entre les deux danseurs."
    }
  },
  {
    id: 4,
    category: "urban-kiz",
    question: "Urban Kiz est plutôt associé à quelle évolution ?",
    options: [
      "Une évolution moderne et urbaine",
      "Une danse traditionnelle cubaine",
      "Une danse de salon ancienne",
      "Une danse sans musicalité"
    ],
    answer: 0,
    fact: "Urban Kiz est lié à une évolution moderne, avec plus de lignes, d’arrêts et de précision.",
    card: {
      icon: "⚡",
      title: "Urban Kiz",
      type: "Carte Style",
      text: "Un style moderne qui met en avant les lignes, les pauses et la précision."
    }
  },
  {
    id: 5,
    category: "urban-kiz",
    question: "Quel mot correspond le mieux à l’Urban Kiz ?",
    options: ["Précision", "Hasard", "Saut", "Course"],
    answer: 0,
    fact: "L’Urban Kiz demande souvent une grande précision dans le guidage.",
    card: {
      icon: "🎯",
      title: "Précision",
      type: "Carte Musicalité",
      text: "La précision donne de la clarté aux mouvements."
    }
  },
  {
    id: 6,
    category: "semba",
    question: "Le Semba est généralement plus…",
    options: ["Festif et énergique", "Lent et figé", "Silencieux", "Sans rythme"],
    answer: 0,
    fact: "Le Semba est souvent plus vif, joyeux et festif que la Kizomba.",
    card: {
      icon: "🥁",
      title: "Énergie Semba",
      type: "Carte Style",
      text: "Le Semba apporte une énergie vivante à l’univers Kizomba."
    }
  },
  {
    id: 7,
    category: "tarraxo",
    question: "Le Tarraxo met souvent en avant…",
    options: [
      "Le contrôle du corps",
      "Les grands sauts",
      "La vitesse maximale",
      "Les figures acrobatiques"
    ],
    answer: 0,
    fact: "Le Tarraxo met l’accent sur le contrôle, l’intensité et les isolations.",
    card: {
      icon: "🔥",
      title: "Contrôle",
      type: "Carte Technique",
      text: "Le contrôle du corps permet d’être intense sans être désordonné."
    }
  },
  {
    id: 8,
    category: "tarraxinha",
    question: "La Tarraxinha est souvent associée à…",
    options: [
      "Des isolations et une danse plus lente",
      "Des sauts rapides",
      "Des figures de breakdance",
      "Une danse sans connexion"
    ],
    answer: 0,
    fact: "La Tarraxinha met souvent en valeur les isolations et les micro-mouvements.",
    card: {
      icon: "💫",
      title: "Isolation",
      type: "Carte Technique",
      text: "Les micro-mouvements demandent écoute, contrôle et précision."
    }
  },
  {
    id: 9,
    category: "douceur",
    question: "Dans une danse douce, la priorité est souvent…",
    options: ["L’écoute", "La force", "La vitesse", "La démonstration"],
    answer: 0,
    fact: "La douceur demande une vraie écoute du partenaire et de la musique.",
    card: {
      icon: "🫶",
      title: "Douceur",
      type: "Carte Feeling",
      text: "La douceur rend la danse plus propre, plus musicale et plus agréable."
    }
  },
  {
    id: 10,
    category: "culture",
    question: "Pourquoi connaître les racines d’une danse est important ?",
    options: [
      "Pour respecter son histoire",
      "Pour danser plus vite",
      "Pour copier sans comprendre",
      "Pour éviter la musicalité"
    ],
    answer: 0,
    fact: "Connaître les racines aide à respecter les cultures qui ont porté la danse.",
    card: {
      icon: "🌍",
      title: "Respect culturel",
      type: "Carte Culture",
      text: "Une danse devient plus forte quand on comprend ce qu’elle raconte."
    }
  },
  {
    id: 11,
    category: "fusion",
    question: "Kizomba Fusion désigne plutôt…",
    options: [
      "Un mélange d’influences modernes",
      "Une danse sans identité",
      "Une danse uniquement sportive",
      "Un style sans musique"
    ],
    answer: 0,
    fact: "La fusion peut mélanger des influences modernes, mais les bases restent importantes.",
    card: {
      icon: "⚡",
      title: "Kizomba Fusion",
      type: "Carte Évolution",
      text: "La fusion fonctionne mieux quand les bases sont solides."
    }
  },
  {
    id: 12,
    category: "culture",
    question: "Un bon danseur musical cherche surtout à…",
    options: [
      "Interpréter la musique",
      "Faire le maximum de figures",
      "Aller le plus vite possible",
      "Ignorer les pauses"
    ],
    answer: 0,
    fact: "La musicalité permet de danser avec la musique au lieu d’enchaîner des mouvements.",
    card: {
      icon: "🎧",
      title: "Musicalité",
      type: "Carte Culture",
      text: "La musicalité donne du sens aux mouvements."
    }
  },
  {
    id: 101,
    category: "expert",
    question: "D’après le schéma, ce qu’on appelait parfois “Kizomba” en France autour de 2010 correspondait plutôt à quel mélange ?",
    options: [
      "Kizomba + Tarraxinha + Passada",
      "Semba + Tango + Kompa",
      "Bachata + Salsa + Merengue",
      "Kuduro + Afrohouse uniquement"
    ],
    answer: 0,
    fact: "Le “Ghetto Zouk” est présenté comme ce qu’on a parfois appelé Kizomba en France autour de 2010 : Kizomba + Tarraxinha + Passada.",
    card: {
      icon: "🧠",
      title: "Ghetto Zouk",
      type: "Carte Expert",
      text: "Distinguer la danse, la musique et les appellations selon les périodes."
    }
  },
  {
    id: 102,
    category: "expert",
    question: "Selon les notes, l’Urban Kiz danse descend surtout de quel cocktail ?",
    options: [
      "Kizomba + Tarraxinha + Passada",
      "Semba + Salsa + Zouk Love",
      "Kompa + Tango + Bachata",
      "Afrohouse + Coupé-Décalé + Kuduro"
    ],
    answer: 0,
    fact: "Le schéma indique que l’Urban Kiz danse descend du cocktail Kizomba + Tarraxinha + Passada.",
    card: {
      icon: "⚡",
      title: "Cocktail Urban Kiz",
      type: "Carte Expert",
      text: "L’Urban Kiz est mieux compris quand on connaît les ingrédients qui ont nourri sa construction."
    }
  },
  {
    id: 103,
    category: "expert",
    question: "Dans le schéma, quelle danse est indiquée comme descendant du Semba ?",
    options: ["Kizomba", "Passada", "Urban Kiz", "Bachata"],
    answer: 0,
    fact: "Le schéma montre la Kizomba comme une danse descendant du Semba.",
    card: {
      icon: "🥁",
      title: "Semba → Kizomba",
      type: "Carte Racine Expert",
      text: "Comprendre ce lien évite de mélanger toutes les danses sous une seule étiquette."
    }
  },
  {
    id: 104,
    category: "expert",
    question: "Dans les captures, la Passada est reliée à quel univers ?",
    options: [
      "Cap-Vert, Cabo Love et Pop Palop",
      "Jamaïque et Dancehall",
      "Argentine et Tango",
      "Espagne et Flamenco"
    ],
    answer: 0,
    fact: "La Passada est reliée au Cap-Vert, à Cabo Love et au Pop Palop.",
    card: {
      icon: "🇨🇻",
      title: "Passada",
      type: "Carte Expert",
      text: "La Passada aide à comprendre une partie des influences européennes."
    }
  },
  {
    id: 105,
    category: "expert",
    question: "Dans l’histoire musicale du Ghetto Zouk, Kassav est associé à quelle branche ?",
    options: [
      "Zouk antillais des années 80",
      "R&B américain des années 2000",
      "Kompa haïtien uniquement",
      "Tarraxo moderne"
    ],
    answer: 0,
    fact: "Le schéma relie Kassav au Zouk antillais des années 80.",
    card: {
      icon: "🎶",
      title: "Kassav",
      type: "Carte Musique Expert",
      text: "Kassav apparaît comme une référence importante du socle musical."
    }
  },
  {
    id: 106,
    category: "expert",
    question: "Le Cabo Love est associé à quel espace culturel dans le schéma ?",
    options: ["Cap-Vert", "Angola uniquement", "Cuba", "Brésil"],
    answer: 0,
    fact: "Dans tes captures, le Cabo Love est associé au Cap-Vert.",
    card: {
      icon: "🌊",
      title: "Cabo Love",
      type: "Carte Musique Expert",
      text: "Le Cabo Love est une influence importante."
    }
  },
  {
    id: 107,
    category: "expert",
    question: "Dans le schéma, le Cabo Love est aussi présenté comme…",
    options: ["Afro-Zouk / Cola-Zouk", "Semba ancien", "Urban Kiz danse", "Tarraxo instrumental"],
    answer: 0,
    fact: "Le schéma indique que Cabo Love est aussi appelé Afro-Zouk / Cola-Zouk.",
    card: {
      icon: "💙",
      title: "Afro-Zouk",
      type: "Carte Expert",
      text: "Une notion utile pour relier musiques capverdiennes, caribéennes et pratiques de danse."
    }
  },
  {
    id: 108,
    category: "expert",
    question: "Le Pop Palop / Ghetto Zouk est fortement influencé par…",
    options: ["Le R&B", "Le Rock", "La Techno minimale", "La Valse"],
    answer: 0,
    fact: "Le Pop Palop / Ghetto Zouk est indiqué comme fortement influencé par le R&B.",
    card: {
      icon: "🎤",
      title: "R&B Influence",
      type: "Carte Musique Expert",
      text: "Le R&B aide à comprendre la couleur moderne et urbaine de ces musiques."
    }
  },
  {
    id: 109,
    category: "expert",
    question: "Quels artistes sont cités autour du Pop Palop / Ghetto Zouk ?",
    options: [
      "Nelson Freitas, Anselmo Ralph, C4 Pedro",
      "Michael Jackson, Prince, Usher",
      "Kendrick Lamar, Drake, Future",
      "Cesária Évora, Stromae, Angèle"
    ],
    answer: 0,
    fact: "Tes captures citent Nelson Freitas, Anselmo Ralph et C4 Pedro.",
    card: {
      icon: "⭐",
      title: "Artistes clés",
      type: "Carte Expert",
      text: "Ces noms relient les notions à des références musicales concrètes."
    }
  },
  {
    id: 110,
    category: "expert",
    question: "La musique Urban Kiz est reliée à quel exemple dans le schéma ?",
    options: [
      "Dança Kizomba — Stony & Elji",
      "Thriller — Michael Jackson",
      "No Woman No Cry — Bob Marley",
      "Despacito — Luis Fonsi"
    ],
    answer: 0,
    fact: "La musique Urban Kiz est reliée à l’exemple Dança Kizomba — Stony & Elji.",
    card: {
      icon: "🎧",
      title: "Dança Kizomba",
      type: "Carte Musique Expert",
      text: "Un exemple utilisé pour situer l’univers musical Urban Kiz."
    }
  },
  {
    id: 111,
    category: "expert",
    question: "Dans les captures, “Intensité” est associée à…",
    options: ["Profondeur et contraste", "Vitesse et compétition", "Sauts et acrobaties", "Silence et immobilité"],
    answer: 0,
    fact: "Intensité = profondeur et contraste.",
    card: {
      icon: "💎",
      title: "Intensité",
      type: "Carte Feeling Expert",
      text: "L’intensité peut venir du contraste et de la profondeur."
    }
  },
  {
    id: 112,
    category: "expert",
    question: "Dans les captures, “Harmonie” est associée à…",
    options: [
      "Un duo qui ne fait qu’un",
      "Deux danseurs qui se défient",
      "Une danse sans connexion",
      "Une suite de figures rapides"
    ],
    answer: 0,
    fact: "Harmonie = un duo qui ne fait qu’un.",
    card: {
      icon: "🫶",
      title: "Harmonie",
      type: "Carte Feeling Expert",
      text: "L’harmonie est liée à l’unité du duo et à la qualité de connexion."
    }
  },
  {
    id: 113,
    category: "expert",
    question: "La phrase “la danse suit la musique, mais elle a ses propres racines” signifie que…",
    options: [
      "La danse et la musique sont liées, mais leur histoire peut être différente",
      "La danse n’a aucune histoire",
      "La musique est toujours plus importante que la danse",
      "Toutes les danses viennent du même endroit"
    ],
    answer: 0,
    fact: "Il faut distinguer les racines de la musique et celles de la danse.",
    card: {
      icon: "📚",
      title: "Musique vs Danse",
      type: "Carte Expert",
      text: "Une notion importante pour éviter les confusions entre styles musicaux et styles de danse."
    }
  },
  {
    id: 114,
    category: "expert",
    question: "Dans le tableau manuscrit, on voit l’idée que le flow naît surtout de la relation entre…",
    options: [
      "Musique, danseur, ressenti et dynamique",
      "Vitesse, force et compétition",
      "Hasard, bruit et rupture",
      "Figures, performance et acrobaties uniquement"
    ],
    answer: 0,
    fact: "Le tableau manuscrit met en avant une relation : musique, danseur, flow, ressenti, dynamique.",
    card: {
      icon: "🌀",
      title: "Flow",
      type: "Carte Expert",
      text: "Le flow se construit dans la relation entre musique, corps, ressenti et intention."
    }
  }
];

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function safeRead(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function getLevel(score) {
  return [...LEVELS].reverse().find((level) => score >= level.min) || LEVELS[0];
}

function getNextLevel(score) {
  return LEVELS.find((level) => level.min > score) || null;
}

function isPackLocked(pack, totalScore) {
  return Boolean(pack.unlockXp && totalScore < pack.unlockXp);
}

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [screen, setScreen] = useState("home");
  const [activePack, setActivePack] = useState(PACKS[0]);
  const [notice, setNotice] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [locked, setLocked] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [totalScore, setTotalScore] = useState(() => safeRead("ku_total_score", 0));
  const [cards, setCards] = useState(() => safeRead("ku_cards", []));
  const [results, setResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(100);
  const [streak, setStreak] = useState(0);
  const [soundOn, setSoundOn] = useState(false);

  const timerRef = useRef(null);
  const audioRef = useRef(null);
  const noticeTimerRef = useRef(null);
  const currentQuestion = questions[questionIndex];

  const level = getLevel(totalScore);
  const nextLevel = getNextLevel(totalScore);

  const progress = useMemo(() => {
    if (!nextLevel) return 100;
    const base = level.min;
    const range = nextLevel.min - base;
    return Math.max(0, Math.min(100, ((totalScore - base) / range) * 100));
  }, [level, nextLevel, totalScore]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    document.documentElement.style.overflowAnchor = "none";
    document.body.style.overflowAnchor = "none";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const readyTimer = setTimeout(() => {
      setAppReady(true);
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    }, 180);

    return () => clearTimeout(readyTimer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [screen]);

  useEffect(() => {
    localStorage.setItem("ku_total_score", JSON.stringify(totalScore));
  }, [totalScore]);

  useEffect(() => {
    localStorage.setItem("ku_cards", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1;
    audio.muted = false;
  }, [appReady]);

  useEffect(() => {
    if (screen !== "quiz" || locked || !currentQuestion) return;

    setTimeLeft(100);
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          clearInterval(timerRef.current);
          answerQuestion(null);
          return 0;
        }

        return value - 2;
      });
    }, 180);

    return () => clearInterval(timerRef.current);
  }, [screen, questionIndex, locked, currentQuestion]);

  function notify(message) {
    setNotice(message);
    clearTimeout(noticeTimerRef.current);

    noticeTimerRef.current = setTimeout(() => {
      setNotice("");
    }, 3600);
  }

  function choosePack(pack) {
    if (isPackLocked(pack, totalScore)) {
      const missing = pack.unlockXp - totalScore;
      notify(`🔒 Pack Expert verrouillé : encore ${missing} XP à gagner.`);
      return;
    }

    setActivePack(pack);
    notify(`${pack.emoji} Pack ${pack.name} sélectionné.`);
  }

  function openExpert() {
    const expertPack = PACKS.find((pack) => pack.id === "expert");

    if (!expertPack) return;

    if (isPackLocked(expertPack, totalScore)) {
      const missing = expertPack.unlockXp - totalScore;
      notify(`🔒 Pack Expert verrouillé : encore ${missing} XP à gagner.`);
      return;
    }

    setActivePack(expertPack);
    setScreen("packs");
    notify("🧠 Pack Expert débloqué.");
  }

  function startQuiz(pack = activePack) {
    if (isPackLocked(pack, totalScore)) {
      const missing = pack.unlockXp - totalScore;
      notify(`🔒 Pack Expert verrouillé : encore ${missing} XP à gagner.`);
      return;
    }

    const pool = QUESTIONS.filter((question) => pack.categories.includes(question.category));
    const quizQuestions = shuffle(pool.length ? pool : QUESTIONS).slice(0, 8);

    setActivePack(pack);
    setQuestions(quizQuestions);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setLocked(false);
    setSessionScore(0);
    setResults([]);
    setTimeLeft(100);
    setStreak(0);
    setScreen("quiz");
  }

  function answerQuestion(index) {
    if (locked || !currentQuestion) return;

    clearInterval(timerRef.current);

    const correct = index === currentQuestion.answer;
    const speedBonus = correct ? Math.round(timeLeft / 10) : 0;
    const streakBonus = correct && streak >= 2 ? 5 : 0;
    const expertBonus = correct && activePack.id === "expert" ? 10 : 0;
    const points = correct ? 10 + speedBonus + streakBonus + expertBonus : 0;

    setSelectedAnswer(index);
    setLocked(true);
    setSessionScore((value) => value + points);
    setStreak((value) => (correct ? value + 1 : 0));

    setResults((prev) => [
      ...prev,
      {
        id: currentQuestion.id,
        question: currentQuestion.question,
        correct,
        points,
        card: correct ? currentQuestion.card : null
      }
    ]);

    if (correct && currentQuestion.card) {
      setCards((prev) => {
        const exists = prev.some((card) => card.title === currentQuestion.card.title);
        return exists ? prev : [...prev, currentQuestion.card];
      });
    }
  }

  function nextQuestion() {
    if (questionIndex + 1 >= questions.length) {
      setTotalScore((value) => value + sessionScore);
      setScreen("results");
      return;
    }

    setQuestionIndex((value) => value + 1);
    setSelectedAnswer(null);
    setLocked(false);
    setTimeLeft(100);
  }

  function resetProgress() {
    setTotalScore(0);
    setCards([]);
    localStorage.removeItem("ku_total_score");
    localStorage.removeItem("ku_cards");
    setActivePack(PACKS[0]);
    notify("Progression réinitialisée.");
  }

  async function toggleSound() {
    const audio = audioRef.current;

    if (!audio) {
      notify("Audio introuvable.");
      return;
    }

    try {
      audio.volume = 1;
      audio.muted = false;

      if (soundOn) {
        audio.pause();
        setSoundOn(false);
        notify("Son coupé.");
        return;
      }

      await audio.play();
      setSoundOn(true);
      notify("Ambiance sonore activée.");
    } catch (error) {
      console.error("Erreur audio :", error);
      setSoundOn(false);
      notify("Le son n’a pas pu démarrer. Clique encore une fois.");
    }
  }

  if (!appReady) {
    return (
      <div className="app-shell">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <div className="stars" />

        <div
          className="app"
          style={{
            display: "grid",
            placeItems: "center",
            minHeight: "100vh",
            padding: "24px"
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "240px",
              textAlign: "center",
              padding: "18px",
              borderRadius: "24px",
              background: "rgba(18, 12, 31, 0.9)",
              border: "1px solid rgba(245, 200, 66, 0.2)",
              boxShadow: "0 20px 70px rgba(0,0,0,0.45)"
            }}
          >
            <img
              src={logoKizombaUrban}
              alt="Quiz Kizomba Urban"
              width="150"
              height="150"
              style={{
                width: "110px",
                height: "110px",
                objectFit: "cover",
                borderRadius: "20px",
                display: "block",
                margin: "0 auto 12px"
              }}
            />

            <strong
              style={{
                display: "block",
                color: "#ffe27a",
                fontSize: "16px",
                fontWeight: 900
              }}
            >
              Kizomba Urban
            </strong>

            <small
              style={{
                display: "block",
                marginTop: "5px",
                color: "#a79bbc"
              }}
            >
              Chargement…
            </small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`app-shell ${soundOn ? "sound-on" : ""}`}>
      <audio
        ref={audioRef}
        src={AUDIO_URL}
        loop
        preload="none"
        playsInline
        onPlay={() => setSoundOn(true)}
        onPause={() => setSoundOn(false)}
      />

      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="stars" />

      <div className="app">
        <Header
          level={level}
          nextLevel={nextLevel}
          progress={progress}
          totalScore={totalScore}
          soundOn={soundOn}
          toggleSound={toggleSound}
        />

        <Notice message={notice} />

        {screen === "home" && (
          <HomeScreen
            activePack={activePack}
            totalScore={totalScore}
            choosePack={choosePack}
            startQuiz={startQuiz}
            cards={cards}
            soundOn={soundOn}
            goPacks={() => setScreen("packs")}
            goCards={() => setScreen("cards")}
            openExpert={openExpert}
          />
        )}

        {screen === "packs" && (
          <PacksScreen
            activePack={activePack}
            totalScore={totalScore}
            choosePack={choosePack}
            startQuiz={startQuiz}
          />
        )}

        {screen === "quiz" && currentQuestion && (
          <QuizScreen
            question={currentQuestion}
            questionIndex={questionIndex}
            totalQuestions={questions.length}
            selectedAnswer={selectedAnswer}
            locked={locked}
            answerQuestion={answerQuestion}
            nextQuestion={nextQuestion}
            timeLeft={timeLeft}
            sessionScore={sessionScore}
            streak={streak}
            activePack={activePack}
          />
        )}

        {screen === "results" && (
          <ResultsScreen
            sessionScore={sessionScore}
            results={results}
            totalQuestions={questions.length}
            startQuiz={() => startQuiz(activePack)}
            goHome={() => setScreen("home")}
          />
        )}

        {screen === "cards" && <CardsScreen cards={cards} resetProgress={resetProgress} />}

        <BottomNav screen={screen} setScreen={setScreen} />
      </div>
    </div>
  );
}

function Notice({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "sticky",
        top: "74px",
        zIndex: 90,
        margin: "8px 14px 0",
        padding: "11px 13px",
        borderRadius: "16px",
        color: "#171003",
        background: "linear-gradient(135deg, #fff0a3, #f5c842)",
        fontWeight: 900,
        fontSize: "12px",
        boxShadow: "0 12px 32px rgba(245, 200, 66, 0.25)"
      }}
    >
      {message}
    </div>
  );
}

function Header({ level, nextLevel, progress, totalScore, soundOn, toggleSound }) {
  return (
    <header className="top-header">
      <div>
        <span className="mini-chip">QUIZ</span>
        <strong>Kizomba Urban</strong>
        <small>by KizFlow Studio</small>
      </div>

      <button className="sound-btn" onClick={toggleSound}>
        {soundOn ? "🔊" : "🔇"}
      </button>

      <div className="score-pill">
        <span>{level.emoji}</span>
        <div>
          <b>{totalScore} XP</b>
          <small>{level.name}</small>
        </div>
      </div>

      <div className="progress-line">
        <div style={{ width: `${progress}%` }} />
      </div>

      {nextLevel && (
        <p className="next-level">
          Prochain niveau : <b>{nextLevel.name}</b>
        </p>
      )}
    </header>
  );
}

function HomeScreen({
  activePack,
  totalScore,
  choosePack,
  startQuiz,
  cards,
  soundOn,
  goPacks,
  goCards,
  openExpert
}) {
  return (
    <main className="screen home-screen">
      <section className="hero-premium">
        <div className="logo-stage">
          <img
            src={logoKizombaUrban}
            alt="Quiz Kizomba Urban"
            width="512"
            height="512"
            loading="eager"
            decoding="sync"
          />
          <div className="logo-glow" />
        </div>

        <div className="visualizer" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <p className="dance-tags">
          Kizomba <b>•</b> Urban Kiz <b>•</b> Semba <b>•</b> Tarraxo <b>•</b> Tarraxinha
        </p>

        <h1>Teste ta culture Kizomba & Urban Kiz.</h1>

        <p className="hero-text">
          Quiz rapide, niveaux, cartes culturelles et pack Expert à 260 XP.
        </p>

        <button className="primary-btn" onClick={() => startQuiz(activePack)}>
          ▶ Commencer le quiz
        </button>

        <button className="ghost-btn" onClick={goPacks}>
          Pack actif : {activePack.emoji} {activePack.name}
        </button>

        <p className="sound-note">
          {soundOn ? "Ambiance sonore activée" : "Clique sur 🔇 en haut pour activer le son"}
        </p>
      </section>

      <section className="quick-stats">
        <MiniCard icon="🏆" title="Quiz" text="Défis rapides" onClick={() => startQuiz(activePack)} />
        <MiniCard
          icon="🧠"
          title="Expert"
          text={totalScore >= EXPERT_UNLOCK_XP ? "Débloqué" : "260 XP"}
          onClick={openExpert}
        />
        <MiniCard
          icon="⭐"
          title="Cartes"
          text={`${cards.length} carte${cards.length > 1 ? "s" : ""}`}
          onClick={goCards}
        />
      </section>

      <section className="pack-preview">
        <div className="section-title">
          <strong>Choisis ton expérience</strong>
          <small>Expert à 260 XP</small>
        </div>

        <div className="pack-row">
          {PACKS.map((pack) => {
            const locked = isPackLocked(pack, totalScore);
            const missing = pack.unlockXp ? pack.unlockXp - totalScore : 0;

            return (
              <button
                key={pack.id}
                className={`pack-mini ${activePack.id === pack.id ? "active" : ""}`}
                onClick={() => choosePack(pack)}
                style={{
                  "--pack-color": pack.color,
                  opacity: locked ? 0.48 : 1,
                  filter: locked ? "grayscale(0.25)" : "none"
                }}
              >
                <span>{locked ? "🔒" : pack.emoji}</span>
                <b>{pack.name}</b>
                {locked && <small>{missing} XP</small>}
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function PacksScreen({ activePack, totalScore, choosePack, startQuiz }) {
  return (
    <main
      className="screen packs-screen"
      style={{
        paddingBottom: "250px",
        minHeight: "calc(100vh - 70px)"
      }}
    >
      <div className="page-title">
        <span>PACKS</span>
        <h1>Choisis ton univers</h1>
        <p>Le pack Expert se débloque à 260 XP avec les questions les plus difficiles.</p>
      </div>

      <div className="packs-grid">
        {PACKS.map((pack) => {
          const locked = isPackLocked(pack, totalScore);
          const missing = pack.unlockXp ? pack.unlockXp - totalScore : 0;

          return (
            <button
              key={pack.id}
              className={`pack-card ${activePack.id === pack.id ? "active" : ""}`}
              onClick={() => choosePack(pack)}
              style={{
                "--pack-color": pack.color,
                opacity: locked ? 0.55 : 1
              }}
            >
              <div className="pack-icon">{locked ? "🔒" : pack.emoji}</div>

              <div>
                <small>{locked ? `Débloqué dans ${missing} XP` : pack.difficulty}</small>
                <h2>{pack.name}</h2>
                <p>{pack.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div
        style={{
          position: "fixed",
          left: "50%",
          bottom: "92px",
          transform: "translateX(-50%)",
          zIndex: 100,
          width: "100%",
          maxWidth: "430px",
          padding: "10px 14px 14px",
          background:
            "linear-gradient(180deg, rgba(5,3,10,0), rgba(5,3,10,0.9) 35%, rgba(5,3,10,0.98) 100%)"
        }}
      >
        <button className="primary-btn" onClick={() => startQuiz(activePack)}>
          ▶ Commencer le quiz
        </button>
      </div>
    </main>
  );
}

function QuizScreen({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  locked,
  answerQuestion,
  nextQuestion,
  timeLeft,
  sessionScore,
  streak,
  activePack
}) {
  return (
    <main className="screen quiz-screen">
      <div className="quiz-meta">
        <span style={{ color: activePack.color }}>
          {activePack.emoji} {activePack.name}
        </span>

        <b>
          {questionIndex + 1} / {totalQuestions}
        </b>
      </div>

      <div className="timer">
        <div style={{ width: `${timeLeft}%` }} />
      </div>

      <div className="session-score">
        <span>
          Score : <b>{sessionScore}</b>
        </span>

        {streak >= 2 && !locked && <span>🔥 Série x{streak}</span>}
      </div>

      <section className="question-card">
        <small>{activePack.id === "expert" ? "Question Expert" : "Question culture"}</small>
        <h2>{question.question}</h2>
      </section>

      <section className="answers">
        {question.options.map((option, index) => {
          let className = "answer-btn";

          if (locked) {
            if (index === question.answer) className += " correct";
            else if (index === selectedAnswer) className += " wrong";
            else className += " disabled";
          }

          return (
            <button
              key={option}
              className={className}
              disabled={locked}
              onClick={() => answerQuestion(index)}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {option}
            </button>
          );
        })}
      </section>

      {locked && (
        <section className="fact-card">
          <small>{selectedAnswer === question.answer ? "Bonne réponse" : "À retenir"}</small>

          <p>{question.fact}</p>

          {selectedAnswer === question.answer && question.card && (
            <div className="unlocked-card">
              <div>{question.card.icon}</div>

              <div>
                <small>Carte débloquée</small>
                <strong>{question.card.title}</strong>
                <p>{question.card.text}</p>
              </div>
            </div>
          )}

          <button className="primary-btn" onClick={nextQuestion}>
            {questionIndex + 1 >= totalQuestions ? "Voir le résultat" : "Question suivante"}
          </button>
        </section>
      )}
    </main>
  );
}

function ResultsScreen({ sessionScore, results, totalQuestions, startQuiz, goHome }) {
  const correct = results.filter((item) => item.correct).length;
  const percent = totalQuestions ? Math.round((correct / totalQuestions) * 100) : 0;
  const wonCards = results.filter((item) => item.card).length;

  return (
    <main className="screen results-screen">
      <div className="trophy">🏆</div>

      <h1>Session terminée</h1>

      <div className="big-score">+{sessionScore} XP</div>

      <p className="result-text">
        {correct} bonne{correct > 1 ? "s" : ""} réponse{correct > 1 ? "s" : ""} sur{" "}
        {totalQuestions}
      </p>

      <div className="stats">
        <div>
          <strong>{percent}%</strong>
          <small>Réussite</small>
        </div>

        <div>
          <strong>{wonCards}</strong>
          <small>Cartes gagnées</small>
        </div>
      </div>

      <section className="result-list">
        {results.map((item, index) => (
          <div key={`${item.id}-${index}`} className="result-item">
            <span>{item.correct ? "✅" : "❌"}</span>
            <p>{item.question}</p>
            <b>+{item.points}</b>
          </div>
        ))}
      </section>

      <button className="primary-btn" onClick={startQuiz}>
        Rejouer
      </button>

      <button className="secondary-btn" onClick={goHome}>
        Retour accueil
      </button>
    </main>
  );
}

function CardsScreen({ cards, resetProgress }) {
  return (
    <main className="screen cards-screen">
      <div className="page-title">
        <span>CARTES</span>
        <h1>Cartes culturelles</h1>
        <p>Chaque bonne réponse peut débloquer une carte de culture danse.</p>
      </div>

      {cards.length === 0 ? (
        <div className="empty-state">
          <span>✨</span>
          <h2>Aucune carte pour l’instant</h2>
          <p>Commence un quiz pour débloquer tes premières cartes.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {cards.map((card, index) => (
            <article key={`${card.title}-${index}`} className="culture-card">
              <div>{card.icon}</div>
              <small>{card.type}</small>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      )}

      {cards.length > 0 && (
        <button className="danger-btn" onClick={resetProgress}>
          Réinitialiser la progression
        </button>
      )}
    </main>
  );
}

function MiniCard({ icon, title, text, onClick }) {
  return (
    <button className="mini-card" type="button" onClick={onClick}>
      <div>{icon}</div>
      <strong>{title}</strong>
      <small>{text}</small>
    </button>
  );
}

function BottomNav({ screen, setScreen }) {
  return (
    <nav className="bottom-nav">
      <button className={screen === "home" ? "active" : ""} onClick={() => setScreen("home")}>
        <span>⌂</span>
        Accueil
      </button>

      <button className={screen === "packs" ? "active" : ""} onClick={() => setScreen("packs")}>
        <span>◆</span>
        Packs
      </button>

      <button className={screen === "cards" ? "active" : ""} onClick={() => setScreen("cards")}>
        <span>◇</span>
        Cartes
      </button>
    </nav>
  );
}
