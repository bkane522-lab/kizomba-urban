import { useEffect, useMemo, useRef, useState } from "react";

const CATEGORIES = [
  {
    id: "kizomba",
    label: "Kizomba",
    emoji: "🌙",
    color: "#F5C842",
    description: "Origines, culture, musicalité et connexion."
  },
  {
    id: "urban-kiz",
    label: "Urban Kiz",
    emoji: "⚡",
    color: "#9C3DFF",
    description: "Style moderne, lignes, pauses et précision."
  },
  {
    id: "semba",
    label: "Semba",
    emoji: "🥁",
    color: "#FF6B4A",
    description: "Racines angolaises, énergie et rythme."
  },
  {
    id: "tarraxo",
    label: "Tarraxo",
    emoji: "🔥",
    color: "#FF3D81",
    description: "Contrôle, intensité et musicalité."
  },
  {
    id: "tarraxinha",
    label: "Tarraxinha",
    emoji: "💫",
    color: "#4ECDC4",
    description: "Isolation, lenteur et connexion fine."
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
    category: "urban-kiz",
    question: "Dans l’Urban Kiz, les pauses servent souvent à quoi ?",
    options: ["Marquer la musique", "Arrêter la danse", "Changer de partenaire", "Ignorer le rythme"],
    answer: 0,
    fact: "Les pauses permettent d’interpréter la musique et de créer des moments forts dans la danse.",
    card: {
      icon: "⏸️",
      title: "Pause musicale",
      type: "Carte Musicalité",
      text: "Bien placée, une pause rend la danse plus expressive."
    }
  },
  {
    id: 7,
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
    id: 8,
    category: "semba",
    question: "Pourquoi le Semba est important pour les danseurs de Kizomba ?",
    options: [
      "Il aide à comprendre les racines",
      "Il remplace toutes les danses",
      "Il n’a aucun lien",
      "Il sert seulement aux compétitions"
    ],
    answer: 0,
    fact: "Comprendre le Semba aide à mieux respecter les racines culturelles et rythmiques de la Kizomba.",
    card: {
      icon: "🌍",
      title: "Racines",
      type: "Carte Culture",
      text: "Connaître les racines donne plus de profondeur à la danse."
    }
  },
  {
    id: 9,
    category: "tarraxo",
    question: "Le Tarraxo met souvent en avant…",
    options: ["Le contrôle du corps", "Les grands sauts", "La vitesse maximale", "Les figures acrobatiques"],
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
    id: 10,
    category: "tarraxo",
    question: "Dans le Tarraxo, l’intensité doit rester…",
    options: ["Contrôlée", "Brutale", "Confuse", "Sans écoute"],
    answer: 0,
    fact: "L’intensité est importante, mais elle doit rester contrôlée, musicale et respectueuse.",
    card: {
      icon: "⚡",
      title: "Intensité",
      type: "Carte Danse",
      text: "L’intensité devient belle quand elle reste maîtrisée."
    }
  },
  {
    id: 11,
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
    id: 12,
    category: "tarraxinha",
    question: "Quelle qualité est importante en Tarraxinha ?",
    options: ["La précision", "La précipitation", "Le bruit", "Le désordre"],
    answer: 0,
    fact: "La précision est essentielle pour que les mouvements restent propres, doux et lisibles.",
    card: {
      icon: "✨",
      title: "Précision douce",
      type: "Carte Musicalité",
      text: "La lenteur révèle les détails et demande une vraie maîtrise."
    }
  }
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function safeRead(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
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
  const [selectedCategories, setSelectedCategories] = useState(["kizomba", "urban-kiz"]);
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

  const timerRef = useRef(null);
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
    if (screen !== "quiz" || locked || !currentQuestion) return;

    setTimeLeft(100);
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(null);
          return 0;
        }
        return value - 2;
      });
    }, 180);

    return () => clearInterval(timerRef.current);
  }, [screen, questionIndex, locked, currentQuestion]);

  function toggleCategory(id) {
    setSelectedCategories((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  }

  function startQuiz() {
    const activeCategories =
      selectedCategories.length > 0
        ? selectedCategories
        : CATEGORIES.map((category) => category.id);

    const pool = QUESTIONS.filter((question) => activeCategories.includes(question.category));
    const quizQuestions = shuffle(pool).slice(0, 8);

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

  function handleAnswer(index) {
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
        if (exists) return prev;
        return [...prev, currentQuestion.card];
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
    <div className="app-shell">
      <div className="phone">
        <Header level={level} nextLevel={nextLevel} progress={progress} totalScore={totalScore} />

        {screen === "home" && (
          <Home
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            startQuiz={startQuiz}
            cards={cards}
          />
        )}

        {screen === "quiz" && currentQuestion && (
          <Quiz
            question={currentQuestion}
            questionIndex={questionIndex}
            totalQuestions={questions.length}
            selectedAnswer={selectedAnswer}
            locked={locked}
            handleAnswer={handleAnswer}
            nextQuestion={nextQuestion}
            timeLeft={timeLeft}
            sessionScore={sessionScore}
            streak={streak}
          />
        )}

        {screen === "results" && (
          <Results
            sessionScore={sessionScore}
            results={results}
            totalQuestions={questions.length}
            startQuiz={startQuiz}
            goHome={() => setScreen("home")}
          />
        )}

        {screen === "cards" && <Cards cards={cards} resetProgress={resetProgress} />}

        <BottomNav screen={screen} setScreen={setScreen} />
      </div>
    </div>
  );
}

function Header({ level, nextLevel, progress, totalScore }) {
  return (
    <header className="top-header">
      <div className="mini-brand">
        <span>QUIZ</span>
        <strong>Kizomba Urban</strong>
        <small>by KizFlow Studio</small>
      </div>

      <div className="score-pill">
        <span>{level.emoji}</span>
        <div>
          <strong>{totalScore} XP</strong>
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

function Home({ selectedCategories, toggleCategory, startQuiz, cards }) {
  return (
    <main className="screen">
      <section className="hero">
        <div className="logo-card">
          <div className="crown">◆</div>
          <div className="quiz-badge">QUIZ</div>

          <div className="couple-shadow">
            <span />
            <span />
          </div>

          <h1>
            <span>Kizomba</span>
            <em>Urban</em>
          </h1>

          <div className="question-badge">?</div>
        </div>

        <p className="dance-line">
          Kizomba <b>•</b> Urban Kiz <b>•</b> Semba <b>•</b> Tarraxo <b>•</b> Tarraxinha
        </p>

        <h2>Teste ta culture</h2>
        <h3>Kizomba & Urban Kiz</h3>

        <button className="primary-btn" onClick={startQuiz}>
          ▶ Commencer le quiz
        </button>
      </section>

      <section className="features">
        <InfoCard icon="🏆" title="Quiz" text="Défis & niveaux" />
        <InfoCard icon="🔥" title="Culture" text="Apprends & évolue" />
        <InfoCard icon="⭐" title="Progression" text="Atteins le sommet" />
      </section>

      <section className="panel">
        <div className="section-title">
          <strong>Choisis tes catégories</strong>
          <small>{selectedCategories.length || "Tout"} sélectionné</small>
        </div>

        <div className="category-grid">
          {CATEGORIES.map((category) => {
            const active = selectedCategories.includes(category.id);

            return (
              <button
                key={category.id}
                className={`category-card ${active ? "active" : ""}`}
                onClick={() => toggleCategory(category.id)}
                style={{ "--cat-color": category.color }}
              >
                <span>{category.emoji}</span>
                <div>
                  <strong>{category.label}</strong>
                  <small>{category.description}</small>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="panel cards-preview">
        <span>Cartes culturelles</span>
        <strong>{cards.length} débloquée{cards.length > 1 ? "s" : ""}</strong>
        <p>Réponds correctement pour débloquer des cartes Pays, Style, Musicalité et Culture.</p>
      </section>
    </main>
  );
}

function Quiz({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  locked,
  handleAnswer,
  nextQuestion,
  timeLeft,
  sessionScore,
  streak
}) {
  const category = CATEGORIES.find((item) => item.id === question.category);

  return (
    <main className="screen">
      <div className="quiz-meta">
        <span style={{ color: category?.color }}>
          {category?.emoji} {category?.label}
        </span>
        <b>{questionIndex + 1} / {totalQuestions}</b>
      </div>

      <div className="timer">
        <div style={{ width: `${timeLeft}%` }} />
      </div>

      <div className="session-score">
        <span>
          Score partie : <b>{sessionScore}</b>
        </span>
        {streak >= 2 && !locked && <span>🔥 Série x{streak}</span>}
      </div>

      <section className="question-card">
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
              onClick={() => handleAnswer(index)}
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

function Results({ sessionScore, results, totalQuestions, startQuiz, goHome }) {
  const correct = results.filter((item) => item.correct).length;
  const percent = totalQuestions ? Math.round((correct / totalQuestions) * 100) : 0;
  const wonCards = results.filter((item) => item.card).length;

  return (
    <main className="screen results">
      <div className="trophy">🏆</div>
      <h2>Session terminée</h2>
      <div className="big-score">+{sessionScore} XP</div>
      <p>
        {correct} bonne{correct > 1 ? "s" : ""} réponse{correct > 1 ? "s" : ""} sur {totalQuestions}
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

      <div className="result-list">
        {results.map((item, index) => (
          <div key={`${item.id}-${index}`} className="result-item">
            <span>{item.correct ? "✅" : "❌"}</span>
            <p>{item.question}</p>
            <b>+{item.points}</b>
          </div>
        ))}
      </div>

      <button className="primary-btn" onClick={startQuiz}>
        Rejouer
      </button>

      <button className="secondary-btn" onClick={goHome}>
        Retour accueil
      </button>
    </main>
  );
}

function Cards({ cards, resetProgress }) {
  return (
    <main className="screen">
      <section className="panel">
        <div className="section-title">
          <strong>Cartes culturelles</strong>
          <small>{cards.length} débloquée{cards.length > 1 ? "s" : ""}</small>
        </div>

        {cards.length === 0 ? (
          <div className="empty">
            <span>✨</span>
            <h2>Aucune carte pour l’instant</h2>
            <p>Joue au quiz pour débloquer tes premières cartes culturelles.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {cards.map((card, index) => (
              <article key={`${card.title}-${index}`} className="culture-card">
                <div>{card.icon}</div>
                <small>{card.type}</small>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      {cards.length > 0 && (
        <button className="danger-btn" onClick={resetProgress}>
          Réinitialiser la progression
        </button>
      )}
    </main>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <article className="info-card">
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

      <button className={screen === "quiz" ? "active" : ""} onClick={() => setScreen("home")}>
        <span>▶</span>
        Jouer
      </button>

      <button className={screen === "cards" ? "active" : ""} onClick={() => setScreen("cards")}>
        <span>◇</span>
        Cartes
      </button>
    </nav>
  );
}
