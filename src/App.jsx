import React, { useMemo, useRef, useState } from "react";

const AUDIO_URL = "https://kizomba-urban.vercel.app/kizomba-loop-v3.mp3?v=3";

const STORAGE_KEYS = {
  xp: "kizombaUrban_xp_v2",
  cards: "kizombaUrban_cards_v2",
};

const LEVELS = [
  { name: "Rookie", min: 0, emoji: "🌱" },
  { name: "Danseur", min: 120, emoji: "🕺" },
  { name: "Groove OG", min: 260, emoji: "🔥" },
  { name: "Galactic", min: 450, emoji: "🚀" },
];

const PACKS = [
  {
    id: "decouverte",
    title: "Découverte",
    emoji: "🌙",
    level: "Facile",
    unlockXp: 0,
    description: "Kizomba, Semba, connexion, bases et premiers repères.",
  },
  {
    id: "sensation",
    title: "Sensation",
    emoji: "✨",
    level: "Moyen",
    unlockXp: 120,
    description: "Douceur, flow, Tarraxinha, intensité et contrôle.",
  },
  {
    id: "culture",
    title: "Culture",
    emoji: "🌍",
    level: "Moyen +",
    unlockXp: 160,
    description: "Angola, Semba, Zouk, Cabo Love, Pop Palop et racines.",
  },
  {
    id: "dj",
    title: "DJ Kizomba",
    emoji: "🎧",
    level: "Groove",
    unlockXp: 220,
    description: "BPM, warm-up, transitions, énergie et lecture de piste.",
  },
  {
    id: "expert",
    title: "Expert",
    emoji: "🧠",
    level: "Coriace",
    unlockXp: 260,
    description: "Urban Kiz, Ghetto Zouk, pionniers, débats et nuances.",
  },
  {
    id: "mindset",
    title: "Mindset",
    emoji: "🧘",
    level: "Avancé",
    unlockXp: 320,
    description: "Respect, consentement, humilité, transmission et connexion.",
  },
  {
    id: "evokeez",
    title: "Evokeez",
    emoji: "🦋",
    level: "Avancé +",
    unlockXp: 380,
    description: "Musicalité, Créativité, Légèreté, Mindset et pédagogie.",
  },
];

const QUESTION_BANK = [
  {
    id: "q1",
    pack: "decouverte",
    type: "single",
    question: "Quel pays est fortement lié aux racines de la Kizomba ?",
    options: ["Angola", "Japon", "Allemagne", "Mexique"],
    correct: [0],
    card: "Angola",
    explanation:
      "La Kizomba est fortement liée à l’Angola, au Semba et aux cultures afro-lusophones.",
  },
  {
    id: "q2",
    pack: "decouverte",
    type: "single",
    question: "Le Semba est généralement présenté comme…",
    options: [
      "Une racine importante de la Kizomba",
      "Une danse japonaise",
      "Une danse sans musique",
      "Une danse uniquement solo",
    ],
    correct: [0],
    card: "Semba",
    explanation:
      "Le Semba est une musique et une danse angolaise plus ancienne, festive et expressive.",
  },
  {
    id: "q3",
    pack: "decouverte",
    type: "single",
    question: "La Kizomba met surtout en avant…",
    options: ["La connexion", "Les sauts acrobatiques", "La vitesse maximale", "La compétition"],
    correct: [0],
    card: "Connexion",
    explanation:
      "La Kizomba privilégie l’écoute, l’ancrage et la connexion entre les partenaires.",
  },
  {
    id: "q4",
    pack: "decouverte",
    type: "single",
    question: "Le Ghetto Zouk est principalement…",
    options: ["Une musique", "Un pas de Semba", "Une figure de Tarraxinha", "Une danse cubaine"],
    correct: [0],
    card: "Ghetto Zouk",
    explanation:
      "Le Ghetto Zouk est un univers musical, souvent utilisé dans les scènes Kizomba et Urban Kiz.",
  },
  {
    id: "q5",
    pack: "decouverte",
    type: "single",
    question: "L’Urban Kiz est souvent associé à…",
    options: [
      "Un style moderne, linéaire et précis",
      "Une danse sans connexion",
      "Une danse uniquement traditionnelle",
      "Une danse sans musique",
    ],
    correct: [0],
    card: "Urban Kiz",
    explanation:
      "L’Urban Kiz joue souvent avec les lignes, les pauses, les hits et les changements de direction.",
  },
  {
    id: "q6",
    pack: "decouverte",
    type: "single",
    question: "La Tarraxinha met souvent en avant…",
    options: ["Les micro-mouvements et les isolations", "Les grands sauts", "La course", "Les acrobaties"],
    correct: [0],
    card: "Tarraxinha",
    explanation:
      "La Tarraxinha est liée aux isolations, au bassin, à la lenteur et au contrôle.",
  },

  {
    id: "q7",
    pack: "sensation",
    type: "multi",
    question: "Quels éléments sont importants dans la douceur ?",
    options: ["L’écoute", "Le contrôle", "Le respect du partenaire", "La brutalité"],
    correct: [0, 1, 2],
    card: "Douceur avancée",
    explanation:
      "La douceur demande présence, contrôle, respect et précision. Ce n’est pas danser mou.",
  },
  {
    id: "q8",
    pack: "sensation",
    type: "multi",
    question: "Quels éléments sont liés à la Tarraxinha ?",
    options: ["Micro-mouvements", "Isolations", "Bassin", "Course rapide"],
    correct: [0, 1, 2],
    card: "Isolation",
    explanation:
      "La Tarraxinha se concentre souvent sur les isolations et les micro-mouvements.",
  },
  {
    id: "q9",
    pack: "sensation",
    type: "single",
    question: "Quelle différence est la plus juste ?",
    options: [
      "Tarraxinha = plus lente et intime / Tarraxo = plus moderne et intense",
      "Tarraxinha = danse rapide / Tarraxo = danse sans musique",
      "Tarraxinha = solo / Tarraxo = danse de groupe",
      "Aucune différence possible",
    ],
    correct: [0],
    card: "Tarraxo vs Tarraxinha",
    explanation:
      "Les termes varient selon les scènes, mais cette distinction est souvent utilisée.",
  },
  {
    id: "q10",
    pack: "sensation",
    type: "single",
    question: "La douceur veut dire…",
    options: ["Danser mou", "Danser avec écoute et précision", "Ne plus guider", "Ne plus bouger"],
    correct: [1],
    card: "Douceur consciente",
    explanation:
      "La douceur n’est pas une absence d’énergie. C’est une énergie maîtrisée.",
  },

  {
    id: "q11",
    pack: "culture",
    type: "single",
    question: "Eduardo Paím est souvent présenté comme…",
    options: [
      "Une figure majeure de la Kizomba musicale",
      "Un danseur de tango",
      "Un DJ de techno minimale",
      "Un personnage fictif",
    ],
    correct: [0],
    card: "Eduardo Paím",
    explanation:
      "Eduardo Paím est souvent cité parmi les grands pionniers de la Kizomba musicale.",
  },
  {
    id: "q12",
    pack: "culture",
    type: "multi",
    question: "Quels univers ont nourri les musiques liées à la Kizomba ?",
    options: ["Semba", "Zouk", "Cabo Love", "Silence total"],
    correct: [0, 1, 2],
    card: "Racines musicales",
    explanation:
      "La Kizomba et ses univers voisins sont nourris par plusieurs influences afro-lusophones et afro-caribéennes.",
  },
  {
    id: "q13",
    pack: "culture",
    type: "single",
    question: "Le mot Kizomba est souvent associé à l’idée de…",
    options: ["Fête", "Guerre", "Course", "Silence"],
    correct: [0],
    card: "Fête",
    explanation:
      "Kizomba est souvent relié à l’idée de rassemblement, de fête et de partage.",
  },
  {
    id: "q14",
    pack: "culture",
    type: "single",
    question: "Dire que la Kizomba vient uniquement du Zouk est…",
    options: ["Trop simplifié", "Toujours exact", "La seule vérité", "Sans débat"],
    correct: [0],
    card: "Nuance culturelle",
    explanation:
      "Le Zouk a influencé la musique, mais la Kizomba reste liée à l’Angola, au Semba et à d’autres dynamiques.",
  },
  {
    id: "q15",
    pack: "culture",
    type: "multi",
    question: "Quels artistes sont liés aux univers Kizomba / Ghetto Zouk / Pop Palop ?",
    options: ["Nelson Freitas", "Anselmo Ralph", "C4 Pedro", "Beethoven uniquement"],
    correct: [0, 1, 2],
    card: "Artistes afro-lusophones",
    explanation:
      "Ces artistes font partie des noms importants dans les univers musicaux liés aux pistes Kizomba.",
  },

  {
    id: "q16",
    pack: "dj",
    type: "single",
    question: "Le rôle principal d’un DJ Kizomba est de…",
    options: [
      "Construire une courbe émotionnelle",
      "Jouer au hasard",
      "Mettre seulement les sons qu’il aime",
      "Couper la piste",
    ],
    correct: [0],
    card: "Courbe émotionnelle",
    explanation:
      "Un bon DJ lit la piste et construit une énergie progressive.",
  },
  {
    id: "q17",
    pack: "dj",
    type: "multi",
    question: "Quels éléments un DJ doit observer sur la piste ?",
    options: ["L’énergie", "La fatigue", "Le niveau des danseurs", "La couleur des chaussures uniquement"],
    correct: [0, 1, 2],
    card: "Lecture de piste",
    explanation:
      "Un DJ adapte son set à l’ambiance réelle de la salle.",
  },
  {
    id: "q18",
    pack: "dj",
    type: "single",
    question: "Le warm-up sert surtout à…",
    options: [
      "Installer progressivement l’ambiance",
      "Faire fuir les danseurs",
      "Mettre directement le son le plus violent",
      "Arrêter la soirée",
    ],
    correct: [0],
    card: "Warm-up",
    explanation:
      "Le warm-up prépare la piste et installe la connexion.",
  },
  {
    id: "q19",
    pack: "dj",
    type: "single",
    question: "Pourquoi le Semba peut être utile dans un set ?",
    options: [
      "Pour redonner de l’énergie et de la joie",
      "Pour casser la piste",
      "Pour empêcher les gens de danser",
      "Pour supprimer la musicalité",
    ],
    correct: [0],
    card: "Respiration Semba",
    explanation:
      "Le Semba peut réveiller la piste et apporter une énergie festive.",
  },

  {
    id: "q20",
    pack: "expert",
    type: "single",
    question: "Le Ghetto Zouk est principalement…",
    options: ["Un genre musical", "Une danse traditionnelle angolaise", "Une figure de Semba", "Un pas de base"],
    correct: [0],
    card: "Expert Ghetto Zouk",
    explanation:
      "Le Ghetto Zouk est un support musical très important dans les scènes Kizomba / Urban Kiz.",
  },
  {
    id: "q21",
    pack: "expert",
    type: "single",
    question: "Quelle différence est la plus juste entre Kizomba et Urban Kiz ?",
    options: [
      "Kizomba plus ancrée et connectée / Urban Kiz plus linéaire et ouvert",
      "Kizomba sans musique / Urban Kiz avec musique",
      "Kizomba solo / Urban Kiz groupe",
      "Aucun lien culturel possible",
    ],
    correct: [0],
    card: "Kizomba vs Urban Kiz",
    explanation:
      "C’est une formulation prudente et utile, sans mépriser les styles.",
  },
  {
    id: "q22",
    pack: "expert",
    type: "multi",
    question: "Quels éléments peuvent influencer l’Urban Kiz ?",
    options: ["Kizomba", "Ghetto Zouk", "R&B / Hip-Hop", "Musiques électroniques"],
    correct: [0, 1, 2, 3],
    card: "Influences Urban Kiz",
    explanation:
      "L’Urban Kiz est un style moderne nourri par plusieurs influences.",
  },
  {
    id: "q23",
    pack: "expert",
    type: "single",
    question: "Dans l’histoire française, quels noms sont souvent cités autour de l’Urban Kiz ?",
    options: [
      "Curtis Seldon, Enah Lebon, Moun",
      "Mozart, Chopin, Bach",
      "Pelé, Maradona, Zidane",
      "Picasso, Van Gogh, Monet",
    ],
    correct: [0],
    card: "Pionniers Urban Kiz",
    explanation:
      "Ces noms reviennent souvent dans l’histoire de l’Urban Kiz en France.",
  },
  {
    id: "q24",
    pack: "expert",
    type: "multi",
    question: "Quels éléments sont liés au Tetris Style comme approche pédagogique ?",
    options: ["Cadre", "Guidage précis", "Transferts de poids", "Flou permanent"],
    correct: [0, 1, 2],
    card: "Tetris Style",
    explanation:
      "Le Tetris Style est une image de précision et d’architecture du mouvement.",
  },

  {
    id: "q25",
    pack: "mindset",
    type: "single",
    question: "La connexion avant la performance signifie…",
    options: [
      "Créer une vraie danse à deux avant de chercher à impressionner",
      "Faire le maximum de figures",
      "Danser pour les caméras uniquement",
      "Ignorer le partenaire",
    ],
    correct: [0],
    card: "Connexion avant performance",
    explanation:
      "Le but est de partager une danse, pas seulement de briller.",
  },
  {
    id: "q26",
    pack: "mindset",
    type: "single",
    question: "Le consentement en danse signifie…",
    options: [
      "Respecter le corps, le confort et les limites du partenaire",
      "Forcer la danse",
      "Coller quelqu’un sans écouter",
      "Obliger quelqu’un à accepter",
    ],
    correct: [0],
    card: "Respect",
    explanation:
      "La proximité ne donne aucun droit. Le confort du partenaire est essentiel.",
  },
  {
    id: "q27",
    pack: "mindset",
    type: "multi",
    question: "Quels comportements montrent un bon mindset ?",
    options: ["Écouter son partenaire", "Respecter les limites", "Rester humble", "Se moquer des débutants"],
    correct: [0, 1, 2],
    card: "Mindset danseur",
    explanation:
      "Le niveau technique ne vaut rien sans respect et humilité.",
  },
  {
    id: "q28",
    pack: "mindset",
    type: "single",
    question: "La vraie maîtrise, c’est…",
    options: [
      "Faire danser l’autre avec confiance",
      "Humilier les débutants",
      "Montrer qu’on connaît tout",
      "Forcer les mouvements",
    ],
    correct: [0],
    card: "Maîtrise",
    explanation:
      "La maîtrise se voit dans la sécurité, la clarté et la qualité de connexion.",
  },

  {
    id: "q29",
    pack: "evokeez",
    type: "single",
    question: "Dans l’approche Evokeez, la progression repose notamment sur…",
    options: [
      "Musicalité, Créativité, Légèreté et Mindset",
      "Vitesse, force et compétition",
      "Hasard et improvisation totale",
      "Figures sans écoute",
    ],
    correct: [0],
    card: "Evokeez",
    explanation:
      "Cette approche met en avant une progression consciente, musicale et pédagogique.",
  },
  {
    id: "q30",
    pack: "evokeez",
    type: "multi",
    question: "Quels piliers peuvent aider un danseur à progresser durablement ?",
    options: ["Musicalité", "Créativité", "Légèreté", "Brutalité"],
    correct: [0, 1, 2],
    card: "LCM",
    explanation:
      "Musicalité, Créativité et Légèreté peuvent structurer une progression plus consciente.",
  },
  {
    id: "q31",
    pack: "evokeez",
    type: "single",
    question: "La légèreté en danse signifie…",
    options: [
      "Danser sans forcer, avec contrôle et fluidité",
      "Ne pas écouter la musique",
      "Pousser plus fort",
      "Faire des mouvements brusques",
    ],
    correct: [0],
    card: "Légèreté",
    explanation:
      "La légèreté demande précision, relâchement et maîtrise.",
  },
  {
    id: "q32",
    pack: "evokeez",
    type: "single",
    question: "Former des professeurs demande surtout…",
    options: [
      "Une méthode, une culture, une pédagogie et un mindset",
      "Seulement des vidéos virales",
      "Uniquement des figures complexes",
      "Aucun respect des racines",
    ],
    correct: [0],
    card: "Formation professeur",
    explanation:
      "Former un professeur, c’est transmettre une responsabilité, pas seulement des pas.",
  },
];

function getStoredNumber(key, fallback = 0) {
  const value = Number(localStorage.getItem(key));
  return Number.isFinite(value) ? value : fallback;
}

function getStoredCards() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.cards);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getLevel(xp) {
  return [...LEVELS].reverse().find((level) => xp >= level.min) || LEVELS[0];
}

function sameAnswers(selected, correct) {
  if (selected.length !== correct.length) return false;
  return [...selected].sort().every((value, index) => value === [...correct].sort()[index]);
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function App() {
  const audioRef = useRef(null);

  const [page, setPage] = useState("home");
  const [xp, setXp] = useState(() => getStoredNumber(STORAGE_KEYS.xp, 0));
  const [cards, setCards] = useState(() => getStoredCards());
  const [notice, setNotice] = useState("");
  const [soundOn, setSoundOn] = useState(false);

  const [currentPack, setCurrentPack] = useState(null);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [gainedXp, setGainedXp] = useState(0);
  const [newCards, setNewCards] = useState([]);

  const level = useMemo(() => getLevel(xp), [xp]);

  const nextLevel = useMemo(() => {
    return LEVELS.find((item) => item.min > xp) || null;
  }, [xp]);

  const progressToNext = useMemo(() => {
    if (!nextLevel) return 100;
    const currentMin = level.min;
    const nextMin = nextLevel.min;
    return Math.min(100, Math.round(((xp - currentMin) / (nextMin - currentMin)) * 100));
  }, [xp, level, nextLevel]);

  const currentQuestion = sessionQuestions[questionIndex];

  function saveXp(nextXp) {
    setXp(nextXp);
    localStorage.setItem(STORAGE_KEYS.xp, String(nextXp));
  }

  function saveCards(nextCards) {
    setCards(nextCards);
    localStorage.setItem(STORAGE_KEYS.cards, JSON.stringify(nextCards));
  }

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  }

  function toggleSound() {
    const audio = audioRef.current;
    if (!audio) return;

    if (soundOn) {
      audio.pause();
      setSoundOn(false);
      return;
    }

    audio.volume = 0.22;
    audio
      .play()
      .then(() => {
        setSoundOn(true);
      })
      .catch(() => {
        showNotice("Touchez encore le bouton son : Android bloque parfois l’audio au premier essai.");
      });
  }

  function startPack(packId) {
    const pack = PACKS.find((item) => item.id === packId);
    if (!pack) return;

    if (xp < pack.unlockXp) {
      showNotice(`🔒 Pack verrouillé : encore ${pack.unlockXp - xp} XP à gagner.`);
      setPage("packs");
      return;
    }

    const questions = shuffleArray(QUESTION_BANK.filter((question) => question.pack === packId));

    if (questions.length === 0) {
      showNotice("Ce pack arrive bientôt.");
      return;
    }

    setCurrentPack(pack);
    setSessionQuestions(questions);
    setQuestionIndex(0);
    setSelectedAnswers([]);
    setSubmitted(false);
    setLastCorrect(false);
    setScore(0);
    setGainedXp(0);
    setNewCards([]);
    setPage("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleAnswer(index) {
    if (submitted || !currentQuestion) return;

    if (currentQuestion.type === "multi") {
      setSelectedAnswers((previous) => {
        if (previous.includes(index)) {
          return previous.filter((item) => item !== index);
        }
        return [...previous, index];
      });
      return;
    }

    setSelectedAnswers([index]);
  }

  function submitAnswer() {
    if (!currentQuestion || submitted) return;

    if (selectedAnswers.length === 0) {
      showNotice("Choisis au moins une réponse.");
      return;
    }

    const isCorrect = sameAnswers(selectedAnswers, currentQuestion.correct);
    const xpReward = isCorrect ? (currentQuestion.type === "multi" ? 15 : 10) : 2;
    const nextXp = xp + xpReward;

    saveXp(nextXp);
    setGainedXp((previous) => previous + xpReward);
    setLastCorrect(isCorrect);
    setSubmitted(true);

    if (isCorrect) {
      setScore((previous) => previous + 1);

      const alreadyUnlocked = cards.some((card) => card.title === currentQuestion.card);
      if (!alreadyUnlocked) {
        const card = {
          title: currentQuestion.card,
          pack: currentPack?.title || "Culture",
          emoji: currentPack?.emoji || "✨",
          text: currentQuestion.explanation,
        };
        const nextCards = [...cards, card];
        saveCards(nextCards);
        setNewCards((previous) => [...previous, card]);
      }
    }
  }

  function nextQuestion() {
    if (questionIndex >= sessionQuestions.length - 1) {
      setPage("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setQuestionIndex((previous) => previous + 1);
    setSelectedAnswers([]);
    setSubmitted(false);
    setLastCorrect(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetProgress() {
    const confirmReset = window.confirm("Réinitialiser les XP et les cartes ?");
    if (!confirmReset) return;

    localStorage.removeItem(STORAGE_KEYS.xp);
    localStorage.removeItem(STORAGE_KEYS.cards);
    setXp(0);
    setCards([]);
    showNotice("Progression réinitialisée.");
  }

  return (
    <div className="app-shell">
      <audio ref={audioRef} src={AUDIO_URL} loop preload="auto" />

      <Header level={level} xp={xp} soundOn={soundOn} onToggleSound={toggleSound} />

      {notice && <div className="notice-banner">{notice}</div>}

      {page === "home" && (
        <HomeScreen
          xp={xp}
          level={level}
          nextLevel={nextLevel}
          progressToNext={progressToNext}
          cards={cards}
          onStart={() => startPack("decouverte")}
          onOpenPacks={() => setPage("packs")}
        />
      )}

      {page === "packs" && <PacksScreen xp={xp} onStartPack={startPack} />}

      {page === "infos" && <InfosScreen onStartPack={startPack} />}

      {page === "cards" && <CardsScreen cards={cards} onReset={resetProgress} />}

      {page === "quiz" && currentQuestion && (
        <QuizScreen
          pack={currentPack}
          question={currentQuestion}
          questionIndex={questionIndex}
          totalQuestions={sessionQuestions.length}
          selectedAnswers={selectedAnswers}
          submitted={submitted}
          lastCorrect={lastCorrect}
          onSelect={toggleAnswer}
          onSubmit={submitAnswer}
          onNext={nextQuestion}
        />
      )}

      {page === "results" && (
        <ResultsScreen
          pack={currentPack}
          score={score}
          total={sessionQuestions.length}
          gainedXp={gainedXp}
          newCards={newCards}
          onReplay={() => currentPack && startPack(currentPack.id)}
          onPacks={() => setPage("packs")}
          onCards={() => setPage("cards")}
        />
      )}

      <BottomNav page={page} setPage={setPage} />
    </div>
  );
}

function Header({ level, xp, soundOn, onToggleSound }) {
  return (
    <header className="topbar">
      <div className="brand-mini">
        <img src="/icon-192.png" alt="Kizomba Urban Quiz" />
        <div>
          <strong>Kizomba Urban Quiz</strong>
          <span>{level.emoji} {level.name} · {xp} XP</span>
        </div>
      </div>

      <button className="sound-btn" onClick={onToggleSound}>
        {soundOn ? "🔊" : "🔇"}
      </button>
    </header>
  );
}

function HomeScreen({ xp, level, nextLevel, progressToNext, cards, onStart, onOpenPacks }) {
  return (
    <main className="screen home-screen">
      <section className="hero-premium">
        <div className="logo-stage">
          <img src="/icon-512.png" alt="Kizomba Urban Quiz" />
        </div>

        <p className="eyebrow">Quiz · Culture · Mindset</p>
        <h1>Kizomba Urban Quiz</h1>

        <p className="hero-text">
          Teste ta culture Kizomba, Urban Kiz, Semba, Tarraxo, Ghetto Zouk et découvre les racines.
        </p>

        <div className="quick-stats">
          <div>
            <strong>{xp}</strong>
            <span>XP</span>
          </div>
          <div>
            <strong>{level.name}</strong>
            <span>Niveau</span>
          </div>
          <div>
            <strong>{cards.length}</strong>
            <span>Cartes</span>
          </div>
        </div>

        <div className="progress-card">
          <div className="progress-top">
            <span>{level.emoji} {level.name}</span>
            <span>{nextLevel ? `${nextLevel.name} à ${nextLevel.min} XP` : "Niveau max"}</span>
          </div>
          <div className="progress-bar">
            <div style={{ width: `${progressToNext}%` }} />
          </div>
        </div>

        <button className="primary-btn" onClick={onStart}>
          Commencer le quiz
        </button>

        <button className="secondary-btn" onClick={onOpenPacks}>
          Voir les packs
        </button>
      </section>

      <section className="info-ad-card">
        <span className="ad-pulse">✨ Culture du jour</span>
        <h2>Le Ghetto Zouk est une musique, pas une danse.</h2>
        <p>
          Cette nuance est importante pour comprendre la différence entre le support musical et le style dansé.
        </p>
      </section>

      <section className="pack-preview">
        <h2>Packs disponibles</h2>
        <div className="pack-row">
          {PACKS.slice(0, 5).map((pack) => (
            <div className="mini-pack" key={pack.id}>
              <span>{pack.emoji}</span>
              <strong>{pack.title}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function PacksScreen({ xp, onStartPack }) {
  return (
    <main className="screen packs-screen">
      <section className="section-head">
        <p className="eyebrow">Progression</p>
        <h1>Choisis ton pack</h1>
        <p>Plus tu gagnes d’XP, plus les packs deviennent profonds et coriaces.</p>
      </section>

      <div className="packs-grid">
        {PACKS.map((pack) => {
          const locked = xp < pack.unlockXp;

          return (
            <button
              key={pack.id}
              className={`pack-card ${locked ? "locked" : ""}`}
              onClick={() => onStartPack(pack.id)}
            >
              <div className="pack-icon">{pack.emoji}</div>
              <div className="pack-content">
                <div className="pack-title-line">
                  <h2>{pack.title}</h2>
                  <span>{pack.level}</span>
                </div>
                <p>{pack.description}</p>
                <small>
                  {locked ? `🔒 Débloqué à ${pack.unlockXp} XP` : "✅ Disponible"}
                </small>
              </div>
            </button>
          );
        })}
      </div>
    </main>
  );
}

function InfosScreen({ onStartPack }) {
  return (
    <main className="screen infos-screen">
      <section className="section-head">
        <p className="eyebrow">Infos & événements</p>
        <h1>La culture reste vivante</h1>
        <p>Une zone pour afficher des focus, événements, annonces, culture du jour et contenus premium.</p>
      </section>

      <section className="info-ad-card big">
        <span className="ad-pulse">🔥 Focus du moment</span>
        <h2>Musicalité · Créativité · Légèreté · Mindset</h2>
        <p>
          Une progression solide ne repose pas seulement sur les figures. Elle repose sur l’écoute, la méthode,
          la conscience du corps et le respect du partenaire.
        </p>
        <button className="primary-btn" onClick={() => onStartPack("evokeez")}>
          Tester le pack Evokeez
        </button>
      </section>

      <section className="info-list">
        <article className="glass-card">
          <span>🌍 Culture du jour</span>
          <h3>Le Semba est une racine importante.</h3>
          <p>Comprendre le Semba aide à comprendre l’âme, l’énergie et l’ancrage de la Kizomba.</p>
        </article>

        <article className="glass-card">
          <span>🎧 Focus DJ</span>
          <h3>Un bon DJ construit une courbe émotionnelle.</h3>
          <p>Warm-up, douceur, énergie, respiration, intensité : un set raconte une histoire.</p>
        </article>

        <article className="glass-card">
          <span>🧘 Mindset</span>
          <h3>La proximité ne donne aucun droit.</h3>
          <p>Respect, consentement et écoute sont aussi importants que la technique.</p>
        </article>
      </section>
    </main>
  );
}

function QuizScreen({
  pack,
  question,
  questionIndex,
  totalQuestions,
  selectedAnswers,
  submitted,
  lastCorrect,
  onSelect,
  onSubmit,
  onNext,
}) {
  return (
    <main className="screen quiz-screen">
      <section className="quiz-card">
        <div className="quiz-top">
          <span>{pack?.emoji} {pack?.title}</span>
          <span>{questionIndex + 1}/{totalQuestions}</span>
        </div>

        <div className="question-type">
          {question.type === "multi" ? "Plusieurs bonnes réponses" : "Une seule bonne réponse"}
        </div>

        <h1>{question.question}</h1>

        <div className="answers-grid">
          {question.options.map((option, index) => {
            const selected = selectedAnswers.includes(index);
            const correct = question.correct.includes(index);
            const showCorrect = submitted && correct;
            const showWrong = submitted && selected && !correct;

            return (
              <button
                key={option}
                className={`answer-btn ${selected ? "selected" : ""} ${showCorrect ? "correct" : ""} ${
                  showWrong ? "wrong" : ""
                }`}
                onClick={() => onSelect(index)}
              >
                <span className="answer-letter">
                  {question.type === "multi" ? (selected ? "☑" : "☐") : String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {!submitted ? (
          <button className="primary-btn" onClick={onSubmit}>
            Valider
          </button>
        ) : (
          <div className={`feedback-card ${lastCorrect ? "good" : "bad"}`}>
            <h2>{lastCorrect ? "✅ Bonne réponse" : "❌ Pas encore"}</h2>
            <p>{question.explanation}</p>
            <button className="primary-btn" onClick={onNext}>
              {questionIndex >= totalQuestions - 1 ? "Voir le résultat" : "Question suivante"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

function ResultsScreen({ pack, score, total, gainedXp, newCards, onReplay, onPacks, onCards }) {
  const percent = total ? Math.round((score / total) * 100) : 0;

  return (
    <main className="screen results-screen">
      <section className="result-card">
        <div className="result-emoji">{percent >= 70 ? "🔥" : percent >= 40 ? "✨" : "🌱"}</div>
        <h1>Résultat</h1>
        <p>
          Pack {pack?.emoji} {pack?.title}
        </p>

        <div className="result-score">
          <strong>{score}/{total}</strong>
          <span>{percent}% de réussite</span>
        </div>

        <div className="quick-stats">
          <div>
            <strong>+{gainedXp}</strong>
            <span>XP</span>
          </div>
          <div>
            <strong>{newCards.length}</strong>
            <span>Nouvelles cartes</span>
          </div>
        </div>

        {newCards.length > 0 && (
          <div className="new-cards">
            <h2>Cartes débloquées</h2>
            {newCards.map((card) => (
              <div className="mini-unlock" key={card.title}>
                {card.emoji} {card.title}
              </div>
            ))}
          </div>
        )}

        <button className="primary-btn" onClick={onReplay}>
          Rejouer ce pack
        </button>
        <button className="secondary-btn" onClick={onPacks}>
          Choisir un autre pack
        </button>
        <button className="secondary-btn" onClick={onCards}>
          Voir mes cartes
        </button>
      </section>
    </main>
  );
}

function CardsScreen({ cards, onReset }) {
  return (
    <main className="screen cards-screen">
      <section className="section-head">
        <p className="eyebrow">Collection</p>
        <h1>Cartes culturelles</h1>
        <p>Chaque bonne réponse peut débloquer une carte de culture, mindset ou histoire.</p>
      </section>

      {cards.length === 0 ? (
        <section className="empty-card">
          <h2>Pas encore de carte</h2>
          <p>Commence un quiz pour débloquer tes premières cartes.</p>
        </section>
      ) : (
        <section className="cards-grid">
          {cards.map((card) => (
            <article className="culture-card" key={card.title}>
              <span>{card.emoji} {card.pack}</span>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </article>
          ))}
        </section>
      )}

      <button className="danger-btn" onClick={onReset}>
        Réinitialiser la progression
      </button>
    </main>
  );
}

function BottomNav({ page, setPage }) {
  const items = [
    { id: "home", label: "Accueil", icon: "🏠" },
    { id: "packs", label: "Packs", icon: "🎮" },
    { id: "infos", label: "Infos", icon: "📢" },
    { id: "cards", label: "Cartes", icon: "🃏" },
  ];

  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <button
          key={item.id}
          className={page === item.id ? "active" : ""}
          onClick={() => setPage(item.id)}
        >
          <span>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}
