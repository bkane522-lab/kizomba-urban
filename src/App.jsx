import { useEffect, useMemo, useRef, useState } from "react";
import logoKizombaUrban from "../kizomba-urban-logo.png";

const PACKS = [
  {
    id: "decouverte",
    name: "Découverte",
    emoji: "🌙",
    color: "#f5c842",
    subtitle: "Les bases essentielles",
    description: "Kizomba, Urban Kiz et Semba pour commencer fort.",
    categories: ["kizomba", "urban-kiz", "semba"]
  },
  {
    id: "sensation",
    name: "Sensation",
    emoji: "🔥",
    color: "#ff3d81",
    subtitle: "Connexion & feeling",
    description: "Tarraxo, Tarraxinha, douceur et contrôle du corps.",
    categories: ["tarraxo", "tarraxinha", "douceur"]
  },
  {
    id: "culture",
    name: "Culture",
    emoji: "🌍",
    color: "#4ecdc4",
    subtitle: "Histoire & racines",
    description: "Origines, Angola, musicalité, respect et transmission.",
    categories: ["culture", "kizomba", "semba"]
  },
  {
    id: "fusion",
    name: "Fusion",
    emoji: "⚡",
    color: "#9c3dff",
    subtitle: "Styles modernes",
    description: "Kizomba Fusion, Urban Kiz moderne et évolutions.",
    categories: ["fusion", "urban-kiz"]
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
    fact: "La Kizomba est fortement associée à l’Angola, notamment à Luanda, avec des influences du Semba et du Zouk.",
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
    fact: "Le Semba fait partie des racines importantes de la Kizomba, avec une énergie plus festive et plus vive.",
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
    fact: "La connexion est centrale : elle permet de guider, ressentir et danser avec fluidité.",
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
    fact: "Urban Kiz est souvent lié à une évolution moderne, avec plus de lignes, d’arrêts, de précision et de musicalité urbaine.",
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
    fact: "L’Urban Kiz demande souvent une grande précision dans le guidage, les directions et les changements d’énergie.",
    card: {
      icon: "🎯",
      title: "Précision",
      type: "Carte Musicalité",
      text: "La précision donne de la clarté aux mouvements et au guidage."
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
    fact: "Le Tarraxo met souvent l’accent sur le contrôle, l’intensité, les isolations et le rapport au rythme.",
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
    fact: "La Tarraxinha met souvent en valeur les isolations, les micro-mouvements et une connexion très fine.",
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
    fact: "La fusion peut mélanger des influences modernes, mais les bases restent importantes pour garder de la clarté.",
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
    fact: "La musicalité permet de danser avec la musique au lieu de simplement enchaîner des mouvements.",
    card: {
      icon: "🎧",
      title: "Musicalité",
      type: "Carte Culture",
      text: "La musicalité donne du sens aux mouvements."
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

export default function App() {
  const [screen, setScreen] = useState("home");
  const [activePack, setActivePack] = useState(PACKS[0]);
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
    localStorage.setItem("ku_total_score", JSON.stringify(totalScore));
  }, [totalScore]);

  useEffect(() => {
    localStorage.setItem("ku_cards", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.22;

    if (soundOn) {
      audioRef.current.play().catch(() => {
        setSoundOn(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [soundOn]);

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

  function startQuiz(pack = activePack) {
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
    const points = correct ? 10 + speedBonus + streakBonus : 0;

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
  }

  return (
    <div className={`app-shell ${soundOn ? "sound-on" : ""}`}>
      <audio ref={audioRef} src="/kizomba-loop.mp3" loop preload="none" />

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
          setSoundOn={setSoundOn}
        />

        {screen === "home" && (
          <HomeScreen
            activePack={activePack}
            setActivePack={setActivePack}
            startQuiz={startQuiz}
            cards={cards}
            soundOn={soundOn}
          />
        )}

        {screen === "packs" && (
          <PacksScreen
            activePack={activePack}
            setActivePack={setActivePack}
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

function Header({ level, nextLevel, progress, totalScore, soundOn, setSoundOn }) {
  return (
    <header className="top-header">
      <div>
        <span className="mini-chip">QUIZ</span>
        <strong>Kizomba Urban</strong>
        <small>by KizFlow Studio</small>
      </div>

      <button className="sound-btn" onClick={() => setSoundOn((value) => !value)}>
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

function HomeScreen({ activePack, setActivePack, startQuiz, cards, soundOn }) {
  return (
    <main className="screen home-screen">
      <section className="hero-premium">
        <div className="logo-stage">
          <img src={logoKizombaUrban} alt="Quiz Kizomba Urban" />
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

        <h1>Deviens incollable sur la culture Kizomba & Urban Kiz.</h1>

        <p className="hero-text">
          Quiz, cartes culturelles, niveaux et défis pour apprendre en jouant.
        </p>

        <button className="primary-btn" onClick={() => startQuiz(activePack)}>
          ▶ Commencer le quiz
        </button>

        <button className="ghost-btn" onClick={() => setScreenNotUsed()}>
          Pack actif : {activePack.emoji} {activePack.name}
        </button>

        <p className="sound-note">
          {soundOn ? "Ambiance sonore activée" : "Active le son pour plus d’immersion"}
        </p>
      </section>

      <section className="quick-stats">
        <MiniCard icon="🏆" title="Quiz" text="Défis rapides" />
        <MiniCard icon="🔥" title="Culture" text="Cartes à débloquer" />
        <MiniCard
          icon="⭐"
          title="Progression"
          text={`${cards.length} carte${cards.length > 1 ? "s" : ""}`}
        />
      </section>

      <section className="pack-preview">
        <div className="section-title">
          <strong>Choisis ton expérience</strong>
          <small>4 packs</small>
        </div>

        <div className="pack-row">
          {PACKS.map((pack) => (
            <button
              key={pack.id}
              className={`pack-mini ${activePack.id === pack.id ? "active" : ""}`}
              onClick={() => setActivePack(pack)}
              style={{ "--pack-color": pack.color }}
            >
              <span>{pack.emoji}</span>
              <b>{pack.name}</b>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

function setScreenNotUsed() {
  return null;
}

function PacksScreen({ activePack, setActivePack, startQuiz }) {
  return (
    <main className="screen packs-screen">
      <div className="page-title">
        <span>PACKS</span>
        <h1>Choisis ton univers</h1>
        <p>Moins de catégories affichées, plus de clarté et une meilleure expérience.</p>
      </div>

      <div className="packs-grid">
        {PACKS.map((pack) => (
          <button
            key={pack.id}
            className={`pack-card ${activePack.id === pack.id ? "active" : ""}`}
            onClick={() => setActivePack(pack)}
            style={{ "--pack-color": pack.color }}
          >
            <div className="pack-icon">{pack.emoji}</div>

            <div>
              <small>{pack.subtitle}</small>
              <h2>{pack.name}</h2>
              <p>{pack.description}</p>
            </div>
          </button>
        ))}
      </div>

      <button className="primary-btn" onClick={() => startQuiz(activePack)}>
        Lancer {activePack.name}
      </button>
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
        <small>Question culture</small>
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

function MiniCard({ icon, title, text }) {
  return (
    <article className="mini-card">
      <div>{icon}</div>
      <strong>{title}</strong>
      <small>{text}</small>
    </article>
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
