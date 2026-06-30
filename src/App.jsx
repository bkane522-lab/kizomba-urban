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
  { name: "Master Galactic", min: 800, emoji: "🦁" },
];

const PACKS = [
  {
    id: "decouverte",
    title: "Découverte",
    emoji: "🌙",
    level: "Facile",
    unlockXp: 0,
    sessionSize: 8,
    description: "Bases, styles, premiers repères et culture simple.",
    modules: ["Bases", "Styles", "Connexion", "Premiers pièges"],
  },
  {
    id: "sensation",
    title: "Sensation",
    emoji: "✨",
    level: "Moyen",
    unlockXp: 120,
    sessionSize: 9,
    description: "Douceur, flow, Tarraxinha, Tarraxo, contrôle et intensité.",
    modules: ["Douceur", "Flow", "Tarraxinha", "Tarraxo", "Contrôle"],
  },
  {
    id: "culture",
    title: "Culture",
    emoji: "🌍",
    level: "Moyen +",
    unlockXp: 160,
    sessionSize: 10,
    description: "Angola, Semba, Zouk, Cabo Love, Pop Palop et racines.",
    modules: ["Angola", "Semba", "Zouk", "PALOP", "Artistes"],
  },
  {
    id: "dj",
    title: "DJ Kizomba",
    emoji: "🎧",
    level: "Groove",
    unlockXp: 220,
    sessionSize: 10,
    description: "BPM, warm-up, transitions, énergie et lecture de piste.",
    modules: ["Warm-up", "Transitions", "Énergie", "Lecture de piste"],
  },
  {
    id: "expert",
    title: "Expert",
    emoji: "🧠",
    level: "Coriace",
    unlockXp: 260,
    sessionSize: 12,
    description: "Urban Kiz, Ghetto Zouk, débats, nuances et pièges culturels.",
    modules: ["Urban Kiz", "Ghetto Zouk", "Musique vs danse", "Nuances"],
  },
  {
    id: "mindset",
    title: "Mindset",
    emoji: "🧘",
    level: "Avancé",
    unlockXp: 320,
    sessionSize: 10,
    description: "Respect, consentement, humilité, transmission et connexion.",
    modules: ["Respect", "Consentement", "Humilité", "Transmission"],
  },
  {
    id: "evokeez",
    title: "Evokeez",
    emoji: "🦋",
    level: "Avancé +",
    unlockXp: 380,
    sessionSize: 10,
    description: "Musicalité, Créativité, Légèreté, Mindset et pédagogie.",
    modules: ["LCM", "Musicalité", "Créativité", "Légèreté", "Pédagogie"],
  },
  {
    id: "pionniers",
    title: "Pionniers",
    emoji: "👑",
    level: "Culture +",
    unlockXp: 450,
    sessionSize: 10,
    description: "Figures musicales, danseurs, bâtisseurs français et européens.",
    modules: ["Angola", "France", "Europe", "DJs", "Transmission"],
  },
  {
    id: "galactic",
    title: "Galactic Expert",
    emoji: "🦁",
    level: "Très coriace",
    unlockXp: 600,
    sessionSize: 12,
    description: "Questions mixtes, pièges, situations, DJs, pédagogie et culture profonde.",
    modules: ["Débats", "Scénarios", "Culture", "DJ", "Mindset"],
  },
];

const GENERIC_WRONGS = [
  "Une danse japonaise sans musique",
  "Une figure acrobatique obligatoire",
  "Une règle de compétition",
  "Un style sans racines culturelles",
  "Une danse uniquement solo",
  "Un mouvement sans connexion",
  "Une réponse toujours vraie dans tous les contextes",
  "Une technique à appliquer en force",
  "Une musique sans rapport avec les danseurs",
  "Un simple effet de mode sans histoire",
  "Une pratique sans respect du partenaire",
  "Une réponse qui ignore totalement la musique",
];

const WRONG_TRUTHS = [
  "C’est une vérité unique sans débat possible.",
  "C’est une pratique sans musique et sans culture.",
  "C’est uniquement une compétition de vitesse.",
  "C’est une figure obligatoire dans chaque danse.",
  "C’est un style où la connexion ne compte jamais.",
  "C’est une technique basée sur la force uniquement.",
  "C’est un élément qui ne dépend jamais du contexte.",
  "C’est un mot qui désigne toujours exactement la même chose partout.",
];

const FACTS = [
  {
    pack: "decouverte",
    module: "Bases",
    term: "Angola",
    clue: "Un pays fortement lié aux racines de la Kizomba",
    truth: "L’Angola est au cœur de l’histoire de la Kizomba et du Semba.",
    tags: ["Angola", "Semba", "racines"],
    falseClaim: "L’Angola n’a aucun lien avec la Kizomba.",
    trap: "Dire que l’Angola n’a aucun rôle dans cette culture.",
    card: "Angola",
  },
  {
    pack: "decouverte",
    module: "Bases",
    term: "Semba",
    clue: "Une danse et musique angolaise plus ancienne, festive et expressive",
    truth: "Le Semba est une racine importante pour comprendre l’énergie de la Kizomba.",
    tags: ["Angola", "fête", "racine"],
    falseClaim: "Le Semba est une danse japonaise sans lien avec la Kizomba.",
    trap: "Le réduire à une simple danse rapide sans culture.",
    card: "Semba",
  },
  {
    pack: "decouverte",
    module: "Connexion",
    term: "Connexion",
    clue: "Une écoute entre partenaires qui transforme les pas en dialogue",
    truth: "La connexion rend la danse plus claire, plus douce et plus partagée.",
    tags: ["écoute", "partenaire", "dialogue"],
    falseClaim: "La connexion ne sert à rien en danse de couple.",
    trap: "Croire que la performance compte toujours plus que l’écoute.",
    card: "Connexion",
  },
  {
    pack: "decouverte",
    module: "Styles",
    term: "Kizomba",
    clue: "Une danse de couple liée à la marche, l’ancrage et la musicalité",
    truth: "La Kizomba met souvent en avant l’écoute, la marche et la connexion.",
    tags: ["marche", "ancrage", "musicalité"],
    falseClaim: "La Kizomba est uniquement une danse solo.",
    trap: "La résumer à une série de figures sans connexion.",
    card: "Kizomba",
  },
  {
    pack: "decouverte",
    module: "Styles",
    term: "Urban Kiz",
    clue: "Un style moderne souvent plus linéaire, précis et musical",
    truth: "L’Urban Kiz est un style moderne avec ses codes, ses influences et ses débats.",
    tags: ["lignes", "pauses", "hits"],
    falseClaim: "L’Urban Kiz n’a jamais aucun lien avec la Kizomba.",
    trap: "Dire simplement : Urban Kiz = Kizomba moderne, sans nuance.",
    card: "Urban Kiz",
  },
  {
    pack: "decouverte",
    module: "Styles",
    term: "Ghetto Zouk",
    clue: "Un genre musical souvent utilisé dans les scènes Kizomba et Urban Kiz",
    truth: "Le Ghetto Zouk est une musique, pas une danse.",
    tags: ["musique", "R&B", "zouk"],
    falseClaim: "Le Ghetto Zouk est une danse traditionnelle angolaise.",
    trap: "Confondre le support musical avec la danse.",
    card: "Ghetto Zouk",
  },
  {
    pack: "decouverte",
    module: "Styles",
    term: "Tarraxinha",
    clue: "Une danse lente avec micro-mouvements, isolations et contrôle",
    truth: "La Tarraxinha met souvent l’accent sur les isolations et le contrôle du corps.",
    tags: ["micro-mouvements", "bassin", "contrôle"],
    falseClaim: "La Tarraxinha est surtout basée sur les grands sauts.",
    trap: "La voir uniquement comme une danse sensuelle sans technique.",
    card: "Tarraxinha",
  },
  {
    pack: "decouverte",
    module: "Bases",
    term: "Musicalité",
    clue: "La capacité à danser avec les voix, basses, silences et émotions",
    truth: "La musicalité donne du sens au mouvement.",
    tags: ["écoute", "silences", "émotion"],
    falseClaim: "La musicalité consiste à ignorer la musique.",
    trap: "Penser que la musicalité est réservée aux experts.",
    card: "Musicalité",
  },
  {
    pack: "decouverte",
    module: "Bases",
    term: "Guidage",
    clue: "Une information proposée par le leader sans contrainte ni force",
    truth: "Le guidage doit rester une proposition, pas une contrainte.",
    tags: ["invitation", "clarté", "respect"],
    falseClaim: "Guider veut dire forcer le partenaire.",
    trap: "Confondre guidage clair et domination physique.",
    card: "Guidage",
  },
  {
    pack: "decouverte",
    module: "Bases",
    term: "Danse sociale",
    clue: "Une danse où l’adaptation au partenaire compte autant que les figures",
    truth: "Une danse sociale réussie met le partenaire à l’aise.",
    tags: ["adaptation", "écoute", "partage"],
    falseClaim: "En social, on danse uniquement pour se montrer.",
    trap: "Oublier le confort du partenaire.",
    card: "Danse sociale",
  },
  {
    pack: "decouverte",
    module: "Premiers pièges",
    term: "Bonne réponse",
    clue: "Une réponse qui doit être comprise, pas devinée par position",
    truth: "Dans un bon quiz, la bonne réponse ne doit pas être toujours en A.",
    tags: ["mélange", "réflexion", "jeu"],
    falseClaim: "Dans un quiz sérieux, la bonne réponse doit toujours être A.",
    trap: "Laisser l’utilisateur deviner sans réfléchir.",
    card: "Quiz intelligent",
  },
  {
    pack: "decouverte",
    module: "Styles",
    term: "Danse de couple",
    clue: "Une danse construite avec un partenaire, une écoute et une adaptation",
    truth: "La Kizomba fait partie des danses sociales de couple.",
    tags: ["partenaire", "écoute", "connexion"],
    falseClaim: "La danse de couple ne demande jamais d’adaptation.",
    trap: "Danser comme si le partenaire n’existait pas.",
    card: "Danse de couple",
  },

  {
    pack: "sensation",
    module: "Douceur",
    term: "Douceur",
    clue: "Une qualité de danse basée sur l’écoute, le contrôle et le respect",
    truth: "La douceur n’est pas danser mou : c’est une énergie maîtrisée.",
    tags: ["écoute", "contrôle", "respect"],
    falseClaim: "La douceur veut dire ne plus guider et ne plus bouger.",
    trap: "Confondre douceur et absence d’énergie.",
    card: "Douceur",
  },
  {
    pack: "sensation",
    module: "Contrôle",
    term: "Contrôle du corps",
    clue: "La capacité à être précis sans devenir dur ou brusque",
    truth: "Le contrôle rend la danse plus lisible et plus confortable.",
    tags: ["précision", "fluidité", "maîtrise"],
    falseClaim: "Le contrôle du corps sert à forcer plus fort.",
    trap: "Chercher l’intensité sans maîtrise.",
    card: "Contrôle",
  },
  {
    pack: "sensation",
    module: "Flow",
    term: "Flow",
    clue: "Une continuité entre musique, ressenti, dynamique et intention",
    truth: "Le flow naît de la relation entre le corps, la musique et l’intention.",
    tags: ["musique", "ressenti", "dynamique"],
    falseClaim: "Le flow apparaît quand on ignore la musique.",
    trap: "Croire que le flow vient seulement des figures.",
    card: "Flow",
  },
  {
    pack: "sensation",
    module: "Intensité",
    term: "Intensité",
    clue: "Une profondeur, un contraste et une énergie maîtrisée",
    truth: "L’intensité ne veut pas dire forcer : elle demande du contrôle.",
    tags: ["contraste", "profondeur", "énergie"],
    falseClaim: "L’intensité signifie toujours faire mal ou forcer.",
    trap: "Confondre intensité et brutalité.",
    card: "Intensité",
  },
  {
    pack: "sensation",
    module: "Harmonie",
    term: "Harmonie",
    clue: "La sensation que deux danseurs respirent presque comme un seul duo",
    truth: "L’harmonie vient de l’écoute, de la respiration et de la connexion.",
    tags: ["duo", "écoute", "respiration"],
    falseClaim: "L’harmonie vient uniquement de figures compliquées.",
    trap: "Chercher l’effet visuel avant la connexion.",
    card: "Harmonie",
  },
  {
    pack: "sensation",
    module: "Tarraxo",
    term: "Tarraxo",
    clue: "Une évolution moderne souvent intense, sombre, basse et hypnotique",
    truth: "Le Tarraxo est souvent présenté comme plus moderne, intense et hypnotique.",
    tags: ["basses", "isolation", "intensité"],
    falseClaim: "Le Tarraxo est toujours une danse rapide et sautée.",
    trap: "Oublier que le terme peut être discuté selon les scènes.",
    card: "Tarraxo",
  },
  {
    pack: "sensation",
    module: "Tarraxinha",
    term: "Micro-mouvements",
    clue: "De petits mouvements précis souvent liés à la Tarraxinha",
    truth: "Les micro-mouvements demandent plus de contrôle qu’il n’y paraît.",
    tags: ["précision", "bassin", "contrôle"],
    falseClaim: "Les micro-mouvements sont forcément des grands déplacements.",
    trap: "Croire que petit mouvement veut dire absence de technique.",
    card: "Micro-mouvements",
  },
  {
    pack: "sensation",
    module: "Tarraxinha",
    term: "Isolation",
    clue: "La capacité à faire bouger une partie du corps avec précision",
    truth: "L’isolation est essentielle dans plusieurs univers comme la Tarraxinha et le Tarraxo.",
    tags: ["corps", "précision", "contrôle"],
    falseClaim: "L’isolation signifie bouger tout le corps sans contrôle.",
    trap: "Faire des isolations sans écouter la musique.",
    card: "Isolation",
  },
  {
    pack: "sensation",
    module: "Contrôle",
    term: "Respiration",
    clue: "Un élément qui aide à calmer, écouter et synchroniser le duo",
    truth: "La respiration peut améliorer la qualité de connexion.",
    tags: ["calme", "écoute", "synchronisation"],
    falseClaim: "La respiration n’a aucun effet sur la danse.",
    trap: "Se crisper au lieu de respirer.",
    card: "Respiration",
  },
  {
    pack: "sensation",
    module: "Flow",
    term: "Suspension",
    clue: "Un moment où la danse semble retenir le temps avec la musique",
    truth: "La suspension donne de la profondeur aux moments doux et musicaux.",
    tags: ["pause", "silence", "musicalité"],
    falseClaim: "La suspension signifie perdre complètement le rythme.",
    trap: "Confondre suspension et arrêt sans intention.",
    card: "Suspension",
  },
  {
    pack: "sensation",
    module: "Douceur",
    term: "Énergie maîtrisée",
    clue: "Une intensité contrôlée qui respecte le partenaire",
    truth: "Une énergie maîtrisée peut être forte sans être brutale.",
    tags: ["contrôle", "respect", "intensité"],
    falseClaim: "Une énergie maîtrisée consiste à imposer tous les mouvements.",
    trap: "Croire qu’être puissant veut dire être dur.",
    card: "Énergie maîtrisée",
  },
  {
    pack: "sensation",
    module: "Contrôle",
    term: "Fluidité",
    clue: "Une qualité qui rend les transitions plus naturelles",
    truth: "La fluidité aide la danse à respirer entre les mouvements.",
    tags: ["transition", "douceur", "continuité"],
    falseClaim: "La fluidité oblige à faire des mouvements brusques.",
    trap: "Faire des transitions sans liaison musicale.",
    card: "Fluidité",
  },

  {
    pack: "culture",
    module: "Racines",
    term: "Zouk antillais",
    clue: "Un univers musical caribéen qui a influencé la musique Kizomba",
    truth: "Le Zouk antillais a influencé la couleur musicale de la Kizomba.",
    tags: ["Antilles", "musique", "influence"],
    falseClaim: "Le Zouk antillais n’a jamais circulé vers les scènes afro-lusophones.",
    trap: "Dire que la Kizomba vient uniquement du Zouk.",
    card: "Zouk antillais",
  },
  {
    pack: "culture",
    module: "Racines",
    term: "Kassav’",
    clue: "Un groupe antillais souvent cité dans l’histoire de la circulation du Zouk",
    truth: "Kassav’ est une référence majeure du Zouk antillais.",
    tags: ["Zouk", "Antilles", "influence"],
    falseClaim: "Kassav’ est un groupe de techno allemande.",
    trap: "Oublier que leur influence concerne surtout la musique.",
    card: "Kassav’",
  },
  {
    pack: "culture",
    module: "Artistes",
    term: "Eduardo Paím",
    clue: "Une figure majeure de la Kizomba musicale",
    truth: "Eduardo Paím est souvent cité parmi les grands pionniers de la Kizomba musicale.",
    tags: ["pionnier", "musique", "Angola"],
    falseClaim: "Eduardo Paím est surtout connu comme danseur de tango.",
    trap: "Présenter toute une culture comme l’œuvre d’un seul homme.",
    card: "Eduardo Paím",
  },
  {
    pack: "culture",
    module: "PALOP",
    term: "Cabo Love",
    clue: "Un univers musical capverdien lié à la douceur et à l’émotion",
    truth: "Le Cabo Love est lié aux musiques capverdiennes et afro-lusophones.",
    tags: ["Cap-Vert", "émotion", "mélodie"],
    falseClaim: "Le Cabo Love est une règle de football.",
    trap: "Confondre Cabo Love et une danse codifiée.",
    card: "Cabo Love",
  },
  {
    pack: "culture",
    module: "PALOP",
    term: "Pop Palop",
    clue: "Des musiques populaires afro-lusophones modernes",
    truth: "Le Pop Palop regroupe des sonorités modernes issues des espaces PALOP.",
    tags: ["PALOP", "pop", "afro-lusophone"],
    falseClaim: "Le Pop Palop est une danse japonaise.",
    trap: "Ignorer le rôle des musiques populaires modernes dans les pistes.",
    card: "Pop Palop",
  },
  {
    pack: "culture",
    module: "Artistes",
    term: "Nelson Freitas",
    clue: "Un artiste important dans les univers Ghetto Zouk, Cabo Love et Pop Palop",
    truth: "Nelson Freitas fait partie des artistes importants des scènes afro-lusophones modernes.",
    tags: ["artiste", "Ghetto Zouk", "Cabo Love"],
    falseClaim: "Nelson Freitas est uniquement un compositeur classique allemand.",
    trap: "Oublier les artistes capverdiens et diasporiques.",
    card: "Nelson Freitas",
  },
  {
    pack: "culture",
    module: "Artistes",
    term: "Anselmo Ralph",
    clue: "Un artiste lié aux univers Kizomba, R&B et afro-lusophones modernes",
    truth: "Anselmo Ralph est souvent associé aux musiques romantiques afro-lusophones.",
    tags: ["artiste", "R&B", "Kizomba"],
    falseClaim: "Anselmo Ralph est une figure du flamenco traditionnel.",
    trap: "Ne pas distinguer artistes, danses et styles musicaux.",
    card: "Anselmo Ralph",
  },
  {
    pack: "culture",
    module: "Artistes",
    term: "C4 Pedro",
    clue: "Un artiste lié aux univers Kizomba, Pop Palop et sons modernes",
    truth: "C4 Pedro fait partie des artistes importants des musiques afro-lusophones modernes.",
    tags: ["artiste", "Pop Palop", "modernité"],
    falseClaim: "C4 Pedro est un pas de base de Tarraxinha.",
    trap: "Transformer un artiste en figure de danse.",
    card: "C4 Pedro",
  },
  {
    pack: "culture",
    module: "Semba",
    term: "Paulo Flores",
    clue: "Un artiste angolais important dans l’univers du Semba et de la culture",
    truth: "Paulo Flores est une grande figure de la musique angolaise.",
    tags: ["Semba", "Angola", "culture"],
    falseClaim: "Paulo Flores est une danse sans musique.",
    trap: "Oublier la dimension culturelle et sociale du Semba.",
    card: "Paulo Flores",
  },
  {
    pack: "culture",
    module: "Semba",
    term: "Bonga",
    clue: "Une figure historique de la musique angolaise",
    truth: "Bonga est une grande référence dans l’histoire musicale angolaise.",
    tags: ["Angola", "musique", "histoire"],
    falseClaim: "Bonga est un style de danse robotique japonais.",
    trap: "Ne pas relier les artistes aux racines culturelles.",
    card: "Bonga",
  },
  {
    pack: "culture",
    module: "Nuance",
    term: "Musique vs danse",
    clue: "Une distinction importante pour comprendre les débats culturels",
    truth: "Une musique peut influencer une danse sans résumer toute son histoire.",
    tags: ["nuance", "musique", "danse"],
    falseClaim: "Musique et danse ont toujours exactement la même histoire.",
    trap: "Confondre support musical et style dansé.",
    card: "Musique vs danse",
  },
  {
    pack: "culture",
    module: "Nuance",
    term: "Prudence culturelle",
    clue: "Une manière d’expliquer sans écraser les débats",
    truth: "Une bonne approche culturelle doit éviter les phrases trop catégoriques.",
    tags: ["nuance", "respect", "transmission"],
    falseClaim: "Une bonne app doit dire que tout est simple et sans débat.",
    trap: "Dire : tout le monde sait que… sans vérifier.",
    card: "Prudence culturelle",
  },

  {
    pack: "dj",
    module: "Warm-up",
    term: "Warm-up",
    clue: "Le début progressif d’une soirée pour installer l’ambiance",
    truth: "Le warm-up prépare la piste et installe la connexion.",
    tags: ["progression", "ambiance", "connexion"],
    falseClaim: "Le warm-up sert à mettre directement le son le plus violent.",
    trap: "Commencer trop fort et fatiguer la piste.",
    card: "Warm-up",
  },
  {
    pack: "dj",
    module: "Lecture de piste",
    term: "Lecture de piste",
    clue: "La capacité du DJ à observer l’énergie, la fatigue et le niveau des danseurs",
    truth: "Un DJ adapte son set à l’ambiance réelle de la salle.",
    tags: ["énergie", "fatigue", "niveau"],
    falseClaim: "Un DJ ne doit jamais regarder la piste.",
    trap: "Mixer pour soi sans lire la salle.",
    card: "Lecture de piste",
  },
  {
    pack: "dj",
    module: "Énergie",
    term: "Courbe émotionnelle",
    clue: "La progression d’un set qui raconte une histoire",
    truth: "Un bon DJ construit une courbe émotionnelle, pas une simple playlist.",
    tags: ["émotion", "progression", "set"],
    falseClaim: "Une courbe émotionnelle signifie jouer au hasard.",
    trap: "Faire une playlist plate sans respiration.",
    card: "Courbe émotionnelle",
  },
  {
    pack: "dj",
    module: "Transitions",
    term: "Transition",
    clue: "Le passage cohérent entre deux énergies ou deux styles",
    truth: "Une bonne transition aide la piste à rester connectée.",
    tags: ["cohérence", "énergie", "fluidité"],
    falseClaim: "Une transition doit toujours casser l’ambiance.",
    trap: "Changer de style sans préparer la piste.",
    card: "Transition",
  },
  {
    pack: "dj",
    module: "Énergie",
    term: "Respiration Semba",
    clue: "Le moment où le Semba peut redonner joie et énergie à une piste",
    truth: "Le Semba peut réveiller la piste et apporter une énergie festive.",
    tags: ["Semba", "joie", "énergie"],
    falseClaim: "Le Semba ne peut jamais être utile dans un set Kizomba.",
    trap: "Faire une soirée sans respiration festive.",
    card: "Respiration Semba",
  },
  {
    pack: "dj",
    module: "Timing",
    term: "Timing DJ",
    clue: "Le choix du bon moment pour intensifier ou adoucir la soirée",
    truth: "L’intensité doit arriver au bon moment pour être bien reçue.",
    tags: ["moment", "intensité", "lecture"],
    falseClaim: "Le timing ne change jamais l’effet d’un morceau.",
    trap: "Mettre du Tarraxo intense avant que la piste soit prête.",
    card: "Timing DJ",
  },
  {
    pack: "dj",
    module: "Transitions",
    term: "Set équilibré",
    clue: "Une soirée qui alterne douceur, énergie, respiration et intensité",
    truth: "Une bonne soirée respire, monte et redescend.",
    tags: ["équilibre", "respiration", "intensité"],
    falseClaim: "Un set équilibré joue exactement le même son toute la nuit.",
    trap: "Oublier les variations d’énergie.",
    card: "Set équilibré",
  },
  {
    pack: "dj",
    module: "Culture DJ",
    term: "Sélection musicale",
    clue: "Le choix de morceaux cohérents pour le public et le moment",
    truth: "Un DJ peut surprendre, éduquer la piste et créer un voyage musical.",
    tags: ["choix", "voyage", "public"],
    falseClaim: "Un DJ doit jouer uniquement les sons connus.",
    trap: "Confondre popularité et qualité de set.",
    card: "Sélection musicale",
  },
  {
    pack: "dj",
    module: "Énergie",
    term: "Mémoire de soirée",
    clue: "Ce qu’un grand DJ laisse dans le ressenti des danseurs",
    truth: "Les meilleurs DJs construisent des moments que les danseurs retiennent.",
    tags: ["souvenir", "émotion", "piste"],
    falseClaim: "Un grand DJ ne crée jamais de souvenir.",
    trap: "Chercher seulement le volume, pas l’émotion.",
    card: "Mémoire de soirée",
  },
  {
    pack: "dj",
    module: "Culture DJ",
    term: "DJ Kizomba",
    clue: "Un architecte de l’énergie et des émotions de la soirée",
    truth: "Le DJ Kizomba construit une expérience pour les danseurs.",
    tags: ["DJ", "énergie", "danseurs"],
    falseClaim: "Un DJ Kizomba met des sons au hasard.",
    trap: "Oublier que le DJ danse avec la piste à sa manière.",
    card: "DJ Kizomba",
  },

  {
    pack: "expert",
    module: "Urban Kiz",
    term: "Curtis Seldon",
    clue: "Une figure souvent citée autour de l’émergence de l’Urban Kiz en France",
    truth: "Curtis Seldon est souvent associé à l’émergence de l’Urban Kiz en France.",
    tags: ["Urban Kiz", "France", "pionnier"],
    falseClaim: "Curtis Seldon est surtout connu comme compositeur baroque.",
    trap: "Transformer un débat historique en vérité unique et fermée.",
    card: "Curtis Seldon",
  },
  {
    pack: "expert",
    module: "Urban Kiz",
    term: "Enah Lebon",
    clue: "Une figure importante dans la popularisation internationale de l’Urban Kiz",
    truth: "Enah Lebon a contribué à rendre l’Urban Kiz visible à l’international.",
    tags: ["Urban Kiz", "international", "attitude"],
    falseClaim: "Enah Lebon est une figure du flamenco uniquement.",
    trap: "Oublier le rôle de la diffusion internationale.",
    card: "Enah Lebon",
  },
  {
    pack: "expert",
    module: "Urban Kiz",
    term: "Moun",
    clue: "Une figure régulièrement citée dans l’évolution de la scène Urban Kiz française",
    truth: "Moun fait partie des noms associés à l’évolution de l’Urban Kiz.",
    tags: ["Urban Kiz", "France", "évolution"],
    falseClaim: "Moun est un style musical japonais.",
    trap: "Effacer les figures de terrain dans l’histoire.",
    card: "Moun",
  },
  {
    pack: "expert",
    module: "Nuances",
    term: "Nuance Urban Kiz",
    clue: "L’idée qu’Urban Kiz ne doit pas être résumé trop simplement",
    truth: "Dire Urban Kiz = Kizomba moderne est trop simplifié.",
    tags: ["nuance", "évolution", "débats"],
    falseClaim: "Urban Kiz se résume toujours en une seule phrase sans débat.",
    trap: "Utiliser une définition trop fermée.",
    card: "Nuance Urban Kiz",
  },
  {
    pack: "expert",
    module: "Ghetto Zouk",
    term: "Support musical",
    clue: "Une musique sur laquelle on peut danser sans que ce soit une danse en soi",
    truth: "Le Ghetto Zouk est un support musical important pour plusieurs scènes.",
    tags: ["musique", "support", "danse"],
    falseClaim: "Un support musical est forcément une danse traditionnelle.",
    trap: "Confondre Ghetto Zouk et Urban Kiz.",
    card: "Support musical",
  },
  {
    pack: "expert",
    module: "Tetris Style",
    term: "Tetris Style",
    clue: "Une image pédagogique autour du cadre, du guidage et de l’architecture",
    truth: "Le Tetris Style est une image de précision et d’architecture du mouvement.",
    tags: ["cadre", "guidage", "transferts"],
    falseClaim: "Le Tetris Style consiste à danser sans structure.",
    trap: "Croire que précision veut dire rigidité sans feeling.",
    card: "Tetris Style",
  },
  {
    pack: "expert",
    module: "Transmission",
    term: "Mestre Petchu",
    clue: "Une grande figure de transmission des danses angolaises",
    truth: "Mestre Petchu est une figure majeure de la transmission des danses angolaises.",
    tags: ["transmission", "Angola", "Semba"],
    falseClaim: "Mestre Petchu est un DJ de techno minimale.",
    trap: "Le présenter comme l’unique créateur de tout sans nuance.",
    card: "Mestre Petchu",
  },
  {
    pack: "expert",
    module: "Musique vs danse",
    term: "Distinction musique-danse",
    clue: "Une notion centrale pour éviter les confusions culturelles",
    truth: "Une musique peut influencer une danse sans résumer toute son histoire.",
    tags: ["nuance", "histoire", "influence"],
    falseClaim: "Musique et danse sont toujours exactement la même chose.",
    trap: "Confondre influence musicale et origine complète de la danse.",
    card: "Musique vs danse",
  },
  {
    pack: "expert",
    module: "Nuances",
    term: "Formulation prudente",
    clue: "Une manière de parler des sujets débattus sans fermer l’histoire",
    truth: "Dire souvent présenté comme est plus prudent que dire unique vérité.",
    tags: ["prudence", "respect", "nuance"],
    falseClaim: "Un bon contenu culturel doit mépriser toutes les nuances.",
    trap: "Écrire comme si une scène entière était d’accord sur tout.",
    card: "Formulation prudente",
  },
  {
    pack: "expert",
    module: "Urban Kiz",
    term: "Influences Urban Kiz",
    clue: "Kizomba, Ghetto Zouk, R&B, Hip-Hop et musiques électroniques",
    truth: "L’Urban Kiz est nourri par plusieurs influences modernes et culturelles.",
    tags: ["Kizomba", "Ghetto Zouk", "Hip-Hop"],
    falseClaim: "L’Urban Kiz n’a jamais aucune influence musicale.",
    trap: "Réduire un style hybride à une seule racine.",
    card: "Influences Urban Kiz",
  },

  {
    pack: "mindset",
    module: "Respect",
    term: "Consentement",
    clue: "Le respect du corps, du confort et des limites du partenaire",
    truth: "La proximité ne donne aucun droit.",
    tags: ["respect", "limites", "confort"],
    falseClaim: "Le consentement n’a aucune importance en danse proche.",
    trap: "Croire que la proximité autorise tout.",
    card: "Consentement",
  },
  {
    pack: "mindset",
    module: "Connexion",
    term: "Connexion avant performance",
    clue: "Créer une vraie danse à deux avant de chercher à impressionner",
    truth: "Le but est de partager une danse, pas seulement de briller.",
    tags: ["connexion", "partage", "humilité"],
    falseClaim: "La performance doit toujours écraser le partenaire.",
    trap: "Danser pour la caméra avant de danser avec l’autre.",
    card: "Connexion avant performance",
  },
  {
    pack: "mindset",
    module: "Humilité",
    term: "Humilité",
    clue: "L’état d’esprit qui permet de rester élève même en progressant",
    truth: "Les meilleurs danseurs restent élèves de la musique, du partenaire et des racines.",
    tags: ["apprentissage", "respect", "progression"],
    falseClaim: "Être avancé signifie qu’on n’a plus rien à apprendre.",
    trap: "Confondre niveau technique et supériorité.",
    card: "Humilité",
  },
  {
    pack: "mindset",
    module: "Transmission",
    term: "Transmission",
    clue: "Partager une méthode, une culture et une responsabilité",
    truth: "Enseigner, c’est clarifier et faire grandir les autres.",
    tags: ["pédagogie", "culture", "responsabilité"],
    falseClaim: "Transmettre signifie garder tout le savoir pour soi.",
    trap: "Transmettre des figures sans transmettre le contexte.",
    card: "Transmission",
  },
  {
    pack: "mindset",
    module: "Respect",
    term: "Proximité respectueuse",
    clue: "Une proximité où l’écoute et le confort restent prioritaires",
    truth: "Plus une danse est proche, plus le respect doit être clair.",
    tags: ["proximité", "écoute", "confort"],
    falseClaim: "Plus la danse est proche, moins le respect compte.",
    trap: "Oublier de s’adapter au confort de l’autre.",
    card: "Proximité respectueuse",
  },
  {
    pack: "mindset",
    module: "Connexion",
    term: "Écoute corporelle",
    clue: "Observer le ressenti du partenaire et adapter la danse",
    truth: "Le confort du partenaire passe avant la figure.",
    tags: ["écoute", "adaptation", "sécurité"],
    falseClaim: "Si le partenaire semble mal à l’aise, il faut forcer plus.",
    trap: "Continuer sans lire les signaux du partenaire.",
    card: "Écoute corporelle",
  },
  {
    pack: "mindset",
    module: "Musicalité",
    term: "Musicalité incarnée",
    clue: "Danser les basses, voix, silences, breaks et émotions",
    truth: "La musicalité donne du sens au mouvement.",
    tags: ["voix", "basses", "silences"],
    falseClaim: "Danser la musique veut dire ignorer les breaks.",
    trap: "Compter sans ressentir.",
    card: "Musicalité incarnée",
  },
  {
    pack: "mindset",
    module: "Culture",
    term: "Culture avant business",
    clue: "Garder l’âme, les racines et les valeurs avant le marketing",
    truth: "La danse peut devenir un métier, mais elle doit garder ses racines.",
    tags: ["culture", "racines", "valeurs"],
    falseClaim: "La culture doit toujours disparaître derrière le business.",
    trap: "Vendre une danse en oubliant d’où elle vient.",
    card: "Culture avant business",
  },
  {
    pack: "mindset",
    module: "Respect",
    term: "Maîtrise",
    clue: "Faire danser l’autre avec confiance, sécurité et clarté",
    truth: "La maîtrise se voit dans la sécurité, la clarté et la qualité de connexion.",
    tags: ["sécurité", "clarté", "confiance"],
    falseClaim: "La maîtrise consiste à humilier les débutants.",
    trap: "Confondre maîtrise et ego.",
    card: "Maîtrise",
  },
  {
    pack: "mindset",
    module: "Communauté",
    term: "Esprit de piste",
    clue: "Une attitude basée sur respect, écoute et humilité",
    truth: "Le mindset construit la qualité de la danse autant que la technique.",
    tags: ["respect", "écoute", "humilité"],
    falseClaim: "Un bon esprit de piste consiste à se moquer des débutants.",
    trap: "Oublier la communauté derrière la danse.",
    card: "Esprit de piste",
  },

  {
    pack: "evokeez",
    module: "LCM",
    term: "Evokeez",
    clue: "Un écosystème autour de la Kizomba, Urban Kiz, pédagogie et mindset",
    truth: "Evokeez met en avant une progression consciente, musicale et pédagogique.",
    tags: ["musicalité", "créativité", "légèreté"],
    falseClaim: "Evokeez est une application météo.",
    trap: "Réduire Evokeez à de simples figures sans philosophie.",
    card: "Evokeez",
  },
  {
    pack: "evokeez",
    module: "LCM",
    term: "Musicalité",
    clue: "Un pilier qui aide à entendre et interpréter la musique",
    truth: "La musicalité doit être travaillée dès les premières étapes.",
    tags: ["écoute", "interprétation", "musique"],
    falseClaim: "La musicalité est un bonus réservé aux experts.",
    trap: "Attendre trop longtemps avant d’apprendre à écouter.",
    card: "Musicalité Evokeez",
  },
  {
    pack: "evokeez",
    module: "LCM",
    term: "Créativité",
    clue: "La capacité à développer sa propre expression avec des bases solides",
    truth: "La créativité fonctionne mieux quand les bases sont solides.",
    tags: ["expression", "bases", "style"],
    falseClaim: "La créativité consiste à ignorer toutes les bases.",
    trap: "Improviser sans comprendre la structure.",
    card: "Créativité",
  },
  {
    pack: "evokeez",
    module: "LCM",
    term: "Légèreté",
    clue: "Danser sans forcer, avec contrôle, fluidité et précision",
    truth: "La légèreté demande précision, relâchement et maîtrise.",
    tags: ["fluidité", "contrôle", "relâchement"],
    falseClaim: "La légèreté signifie pousser plus fort.",
    trap: "Confondre légèreté et absence de cadre.",
    card: "Légèreté",
  },
  {
    pack: "evokeez",
    module: "Mindset",
    term: "Mindset Evokeez",
    clue: "Un travail d’état d’esprit, d’humilité et de progression consciente",
    truth: "Le mindset aide à progresser avec humilité, patience et conscience.",
    tags: ["humilité", "patience", "conscience"],
    falseClaim: "Le mindset consiste à mépriser les autres styles.",
    trap: "Progression technique sans conscience.",
    card: "Mindset Evokeez",
  },
  {
    pack: "evokeez",
    module: "Pédagogie",
    term: "Evokeez.pro",
    clue: "Une branche associée à la formation et à la transmission des professeurs",
    truth: "Evokeez.pro est pensé comme une branche orientée formation et transmission.",
    tags: ["formation", "professeurs", "transmission"],
    falseClaim: "Evokeez.pro est une compétition de voitures.",
    trap: "Oublier la responsabilité dans la formation de professeurs.",
    card: "Evokeez.pro",
  },
  {
    pack: "evokeez",
    module: "International",
    term: "Evokeez.world",
    clue: "Une dimension internationale de l’écosystème Evokeez",
    truth: "Evokeez.world représente une ouverture plus large et internationale.",
    tags: ["international", "culture", "diffusion"],
    falseClaim: "Evokeez.world désigne une danse sans musique.",
    trap: "Réduire une vision internationale à un simple logo.",
    card: "Evokeez.world",
  },
  {
    pack: "evokeez",
    module: "Figures",
    term: "Laurent Yìshù",
    clue: "Une figure associée à la musicalité, l’expression et la pédagogie",
    truth: "Laurent Yìshù est reconnu pour son approche musicale, expressive et pédagogique.",
    tags: ["musicalité", "expression", "pédagogie"],
    falseClaim: "Laurent Yìshù est connu pour danser sans musique.",
    trap: "Réduire sa pédagogie à des figures.",
    card: "Laurent Yìshù",
  },
  {
    pack: "evokeez",
    module: "Figures",
    term: "Sophie Madyson",
    clue: "Une figure associée à l’écosystème Evokeez avec Laurent Yìshù",
    truth: "Sophie Madyson participe à l’écosystème Evokeez avec Laurent Yìshù.",
    tags: ["Evokeez", "pédagogie", "transmission"],
    falseClaim: "Sophie Madyson est associée à une danse sans musique.",
    trap: "Oublier le rôle du duo dans l’écosystème.",
    card: "Sophie Madyson",
  },
  {
    pack: "evokeez",
    module: "Pédagogie",
    term: "Progression durable",
    clue: "Une progression avec bases, écoute, régularité et mindset",
    truth: "La progression vient de la régularité, des bases et de l’état d’esprit.",
    tags: ["bases", "régularité", "mindset"],
    falseClaim: "Une progression durable vient uniquement de vidéos virales.",
    trap: "Chercher le spectaculaire avant les bases.",
    card: "Progression durable",
  },

  {
    pack: "pionniers",
    module: "Angola",
    term: "Mestre Petchu",
    clue: "Une figure majeure de la transmission des danses angolaises",
    truth: "Mestre Petchu est une figure importante de transmission culturelle.",
    tags: ["Angola", "transmission", "danse"],
    falseClaim: "Mestre Petchu est une application de montage vidéo.",
    trap: "Oublier la transmission derrière la figure.",
    card: "Mestre Petchu",
  },
  {
    pack: "pionniers",
    module: "Angola",
    term: "José N’dongala",
    clue: "Une figure liée à l’enseignement et à la diffusion de la Kizomba",
    truth: "José N’dongala fait partie des pédagogues importants de la scène Kizomba.",
    tags: ["pédagogie", "Kizomba", "transmission"],
    falseClaim: "José N’dongala est un style de techno.",
    trap: "Ignorer les pédagogues dans l’histoire.",
    card: "José N’dongala",
  },
  {
    pack: "pionniers",
    module: "International",
    term: "Kwenda Lima",
    clue: "Une figure connue pour une approche émotionnelle et consciente de la danse",
    truth: "Kwenda Lima est associé à une approche profonde et humaine de la danse.",
    tags: ["émotion", "conscience", "connexion"],
    falseClaim: "Kwenda Lima est une figure de danse sans partenaire.",
    trap: "Ne voir la danse que comme technique.",
    card: "Kwenda Lima",
  },
  {
    pack: "pionniers",
    module: "France",
    term: "Tony Pirata",
    clue: "Une figure importante parmi les premiers enseignants de Kizomba en France",
    truth: "Tony Pirata fait partie des bâtisseurs de la scène Kizomba en France.",
    tags: ["France", "enseignement", "Kizomba"],
    falseClaim: "Tony Pirata est un peintre impressionniste.",
    trap: "Oublier les bâtisseurs de la première heure.",
    card: "Tony Pirata",
  },
  {
    pack: "pionniers",
    module: "France",
    term: "Félicien & Isabelle",
    clue: "Un couple marquant et durable de la scène parisienne",
    truth: "Félicien & Isabelle sont une référence durable de la scène parisienne.",
    tags: ["Paris", "couple", "pédagogie"],
    falseClaim: "Félicien & Isabelle sont un groupe de rock.",
    trap: "Oublier la continuité dans la transmission.",
    card: "Félicien & Isabelle",
  },
  {
    pack: "pionniers",
    module: "France",
    term: "Jojo / Jonathan Mahoto",
    clue: "Une figure visible, ludique et très présente sur les réseaux",
    truth: "Jojo a contribué à rendre la Kizomba / Urban Kiz visible auprès d’un large public.",
    tags: ["réseaux", "ludique", "visibilité"],
    falseClaim: "Jojo est connu uniquement pour la danse classique russe.",
    trap: "Oublier le rôle des réseaux dans la diffusion moderne.",
    card: "Jojo",
  },
  {
    pack: "pionniers",
    module: "France",
    term: "Val & Shara",
    clue: "Une approche associée au cadre, à la précision et au guidage",
    truth: "Val & Shara représentent une approche technique et structurée du guidage.",
    tags: ["cadre", "guidage", "précision"],
    falseClaim: "Val & Shara représentent une danse sans structure.",
    trap: "Réduire la technique à une absence de feeling.",
    card: "Val & Shara",
  },
  {
    pack: "pionniers",
    module: "Europe",
    term: "Albir Rojas",
    clue: "Une figure internationale associée à une approche fusion et technique",
    truth: "Albir Rojas est une figure internationale connue dans les congrès et scènes fusion.",
    tags: ["fusion", "technique", "international"],
    falseClaim: "Albir Rojas est une absence totale de connexion.",
    trap: "Oublier l’importance des scènes internationales.",
    card: "Albir Rojas",
  },
  {
    pack: "pionniers",
    module: "DJs",
    term: "DJ Elji",
    clue: "Une figure souvent associée au son Ghetto Zouk / Urban Kiz",
    truth: "DJ Elji est associé à l’évolution musicale des scènes Ghetto Zouk et Urban Kiz.",
    tags: ["DJ", "Ghetto Zouk", "Urban Kiz"],
    falseClaim: "DJ Elji est une figure du tango argentin traditionnel.",
    trap: "Oublier les DJs dans l’évolution de la danse.",
    card: "DJ Elji",
  },
  {
    pack: "pionniers",
    module: "DJs",
    term: "DJ Znobia",
    clue: "Une figure importante dans les univers Tarraxinha / Tarraxo et sons hypnotiques",
    truth: "DJ Znobia est une figure majeure des sons hypnotiques lusophones.",
    tags: ["DJ", "Tarraxinha", "Tarraxo"],
    falseClaim: "DJ Znobia est uniquement un joueur de tennis.",
    trap: "Oublier le rôle des producteurs dans les évolutions musicales.",
    card: "DJ Znobia",
  },

  {
    pack: "galactic",
    module: "Débats",
    term: "Esprit critique",
    clue: "La capacité à apprendre sans transformer les débats en guerre de styles",
    truth: "Une bonne app culturelle transmet avec nuance, précision et respect.",
    tags: ["nuance", "respect", "culture"],
    falseClaim: "Une app culturelle doit supprimer tous les débats.",
    trap: "Croire qu’un seul style mérite d’exister.",
    card: "Esprit critique",
  },
  {
    pack: "galactic",
    module: "Scénarios",
    term: "Partenaire mal à l’aise",
    clue: "Une situation où il faut adapter ou arrêter",
    truth: "Si un partenaire semble mal à l’aise, il faut adapter ou arrêter.",
    tags: ["respect", "écoute", "adaptation"],
    falseClaim: "Si un partenaire est mal à l’aise, il faut forcer davantage.",
    trap: "Faire passer la figure avant la sécurité.",
    card: "Écoute corporelle",
  },
  {
    pack: "galactic",
    module: "Culture",
    term: "Définition équilibrée",
    clue: "Une formulation qui respecte racines, influences et évolutions",
    truth: "Urban Kiz est un style moderne influencé par la Kizomba et les musiques urbaines.",
    tags: ["Urban Kiz", "influences", "nuance"],
    falseClaim: "Le Ghetto Zouk est une figure de bras.",
    trap: "Utiliser des définitions fausses ou agressives.",
    card: "Définition équilibrée",
  },
  {
    pack: "galactic",
    module: "DJ",
    term: "Respiration de piste",
    clue: "La capacité à varier les énergies pour garder les danseurs connectés",
    truth: "Une soirée réussie alterne douceur, énergie, intensité et respiration.",
    tags: ["DJ", "énergie", "soirée"],
    falseClaim: "Une soirée réussie garde exactement la même énergie toute la nuit.",
    trap: "Fatiguer la piste sans la faire respirer.",
    card: "Respiration de piste",
  },
  {
    pack: "galactic",
    module: "Expert",
    term: "Niveau Expert",
    clue: "Des questions avec nuance culturelle, comparaison et pièges musique-danse",
    truth: "Une bonne question Expert oblige à comprendre, pas seulement mémoriser.",
    tags: ["nuance", "comparaison", "piège"],
    falseClaim: "Une question Expert doit être évidente sans réflexion.",
    trap: "Faire croire qu’un niveau expert est juste une question plus longue.",
    card: "Niveau Expert",
  },
  {
    pack: "galactic",
    module: "App",
    term: "Carte culturelle",
    clue: "Une mini-leçon débloquée après une bonne réponse",
    truth: "Les cartes rendent l’app plus éducative et donnent envie de collectionner.",
    tags: ["collection", "culture", "progression"],
    falseClaim: "Une carte culturelle sert uniquement à cacher la réponse.",
    trap: "Faire un quiz sans apprentissage après la réponse.",
    card: "Carte culturelle",
  },
  {
    pack: "galactic",
    module: "Mission",
    term: "Mission Galactic",
    clue: "Former une culture vivante et ludique autour de la Kizomba / Urban Kiz",
    truth: "L’app doit donner envie d’apprendre, de danser, de respecter et de transmettre.",
    tags: ["apprendre", "respecter", "transmettre"],
    falseClaim: "Le but de l’app est de remplacer les professeurs.",
    trap: "Transformer l’app en simple jeu sans culture.",
    card: "Mission Galactic",
  },
  {
    pack: "galactic",
    module: "Transmission",
    term: "Transmission complète",
    clue: "Méthode, culture, responsabilité et respect",
    truth: "Transmettre, c’est donner du contenu, une méthode et une conscience.",
    tags: ["méthode", "culture", "responsabilité"],
    falseClaim: "Transmettre consiste à mépriser les élèves.",
    trap: "Enseigner des pas sans expliquer le sens.",
    card: "Transmission complète",
  },
  {
    pack: "galactic",
    module: "Culture",
    term: "Branches du même arbre",
    clue: "Une image pour parler des styles sans mépriser les évolutions",
    truth: "Plusieurs styles peuvent coexister avec des racines, des codes et des débats.",
    tags: ["styles", "racines", "évolution"],
    falseClaim: "Un seul style a le droit d’exister.",
    trap: "Transformer les différences en guerre de styles.",
    card: "Branches du même arbre",
  },
  {
    pack: "galactic",
    module: "Mindset",
    term: "Faire danser l’autre",
    clue: "Une vision de la maîtrise basée sur confiance, sécurité et clarté",
    truth: "La vraie maîtrise, c’est faire danser l’autre avec confiance.",
    tags: ["confiance", "sécurité", "clarté"],
    falseClaim: "La vraie maîtrise consiste à forcer les mouvements.",
    trap: "Confondre maîtrise et domination.",
    card: "Faire danser l’autre",
  },
];

function getDifficulty(pack) {
  if (pack === "decouverte") return "Facile";
  if (pack === "sensation") return "Moyen";
  if (pack === "culture") return "Moyen +";
  if (pack === "dj") return "Groove";
  if (pack === "expert") return "Expert";
  if (pack === "mindset") return "Avancé";
  if (pack === "evokeez") return "Avancé +";
  if (pack === "pionniers") return "Culture +";
  return "Galactic";
}

function uniqueWrongList(seed, custom = []) {
  const source = [...custom, ...GENERIC_WRONGS, ...WRONG_TRUTHS];
  const list = [];
  for (let i = 0; i < source.length; i += 1) {
    const value = source[(seed + i) % source.length];
    if (!list.includes(value)) list.push(value);
    if (list.length >= 8) break;
  }
  return list;
}

function placeCorrect(correct, wrongs, seed) {
  const cleanWrongs = [...new Set(wrongs.filter((item) => item && item !== correct))].slice(0, 3);
  while (cleanWrongs.length < 3) {
    cleanWrongs.push(GENERIC_WRONGS[(seed + cleanWrongs.length) % GENERIC_WRONGS.length]);
  }

  const correctPosition = seed % 4;
  const options = [];
  let wrongIndex = 0;

  for (let i = 0; i < 4; i += 1) {
    if (i === correctPosition) {
      options.push(correct);
    } else {
      options.push(cleanWrongs[wrongIndex]);
      wrongIndex += 1;
    }
  }

  return {
    options,
    correct: [correctPosition],
  };
}

function buildMultiOptions(corrects, wrong, seed) {
  const threeCorrects = [...new Set(corrects)].slice(0, 3);
  while (threeCorrects.length < 3) {
    threeCorrects.push(["écoute", "respect", "musicalité"][threeCorrects.length]);
  }

  const items = [
    { text: threeCorrects[0], ok: true },
    { text: threeCorrects[1], ok: true },
    { text: threeCorrects[2], ok: true },
    { text: wrong, ok: false },
  ];

  const rotation = seed % 4;
  const rotated = [...items.slice(rotation), ...items.slice(0, rotation)];

  return {
    options: rotated.map((item) => item.text),
    correct: rotated.map((item, index) => (item.ok ? index : null)).filter((item) => item !== null),
  };
}

function createQuestionsFromFact(fact, index) {
  const difficulty = getDifficulty(fact.pack);
  const wrongs = uniqueWrongList(index, [
    fact.falseClaim,
    fact.trap,
    "Une réponse trop simplifiée sans nuance",
    "Une idée qui oublie les racines culturelles",
  ]);

  const q1 = placeCorrect(fact.clue, wrongs, index);
  const q2 = placeCorrect(fact.truth, wrongs, index + 1);
  const q3 = buildMultiOptions(fact.tags, wrongs[2], index + 2);
  const q4StatementIsTrue = index % 2 === 0;
  const q4Statement = q4StatementIsTrue ? fact.truth : fact.falseClaim;
  const q4 = {
    options: ["Vrai", "Faux"],
    correct: [q4StatementIsTrue ? 0 : 1],
  };
  const q5 = placeCorrect(fact.trap, wrongs, index + 3);

  return [
    {
      id: `${fact.pack}-${index}-1`,
      pack: fact.pack,
      module: fact.module,
      difficulty,
      type: "single",
      question: `${fact.term} est surtout associé à...`,
      options: q1.options,
      correct: q1.correct,
      card: fact.card,
      explanation: fact.truth,
    },
    {
      id: `${fact.pack}-${index}-2`,
      pack: fact.pack,
      module: fact.module,
      difficulty,
      type: "single",
      question: `Quelle phrase est la plus juste concernant ${fact.term} ?`,
      options: q2.options,
      correct: q2.correct,
      card: fact.card,
      explanation: fact.truth,
    },
    {
      id: `${fact.pack}-${index}-3`,
      pack: fact.pack,
      module: fact.module,
      difficulty,
      type: "multi",
      question: `Quels éléments peuvent être liés à ${fact.term} ?`,
      options: q3.options,
      correct: q3.correct,
      card: fact.card,
      explanation: fact.truth,
    },
    {
      id: `${fact.pack}-${index}-4`,
      pack: fact.pack,
      module: fact.module,
      difficulty,
      type: "single",
      question: `Vrai ou faux : ${q4Statement}`,
      options: q4.options,
      correct: q4.correct,
      card: fact.card,
      explanation: fact.truth,
    },
    {
      id: `${fact.pack}-${index}-5`,
      pack: fact.pack,
      module: fact.module,
      difficulty,
      type: "single",
      question: `Quel piège faut-il éviter avec ${fact.term} ?`,
      options: q5.options,
      correct: q5.correct,
      card: fact.card,
      explanation: fact.truth,
    },
  ];
}

const QUESTION_BANK = FACTS.flatMap((fact, index) => createQuestionsFromFact(fact, index));

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
  const sortedSelected = [...selected].sort((a, b) => a - b);
  const sortedCorrect = [...correct].sort((a, b) => a - b);
  return sortedSelected.every((value, index) => value === sortedCorrect[index]);
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function prepareQuestionForPlay(question) {
  const optionsWithOriginalIndex = question.options.map((text, originalIndex) => ({
    text,
    originalIndex,
  }));

  const shuffledOptions = shuffleArray(optionsWithOriginalIndex);

  return {
    ...question,
    options: shuffledOptions.map((item) => item.text),
    correct: shuffledOptions
      .map((item, newIndex) => (question.correct.includes(item.originalIndex) ? newIndex : null))
      .filter((item) => item !== null),
  };
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
  const [answerLog, setAnswerLog] = useState([]);

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

    const rawQuestions = QUESTION_BANK.filter((question) => question.pack === packId);
    const questions = shuffleArray(rawQuestions)
      .slice(0, pack.sessionSize)
      .map(prepareQuestionForPlay);

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
    setAnswerLog([]);
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

    const selectedTexts = selectedAnswers.map((index) => currentQuestion.options[index]);
    const correctTexts = currentQuestion.correct.map((index) => currentQuestion.options[index]);

    setAnswerLog((previous) => [
      ...previous,
      {
        id: currentQuestion.id,
        question: currentQuestion.question,
        selectedTexts,
        correctTexts,
        correct: isCorrect,
        explanation: currentQuestion.explanation,
      },
    ]);

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
          totalQuestions={QUESTION_BANK.length}
          onStart={() => startPack("decouverte")}
          onOpenPacks={() => setPage("packs")}
        />
      )}

      {page === "packs" && <PacksScreen xp={xp} onStartPack={startPack} />}

      {page === "infos" && <InfosScreen onStartPack={startPack} totalQuestions={QUESTION_BANK.length} />}

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
          answerLog={answerLog}
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
          <span>
            {level.emoji} {level.name} · {xp} XP
          </span>
        </div>
      </div>

      <button className="sound-btn" onClick={onToggleSound}>
        {soundOn ? "🔊" : "🔇"}
      </button>
    </header>
  );
}

function HomeScreen({ xp, level, nextLevel, progressToNext, cards, totalQuestions, onStart, onOpenPacks }) {
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
            <span>
              {level.emoji} {level.name}
            </span>
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
        <span className="ad-pulse">✨ V1.2.2</span>
        <h2>{totalQuestions} questions dans l’app</h2>
        <p>
          Les réponses sont mélangées automatiquement. La bonne réponse ne tombe plus toujours en A.
        </p>
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
        <p>
          Chaque pack contient plusieurs parties. Les sessions sont courtes, mais la banque de questions est beaucoup plus grande.
        </p>
      </section>

      <div className="packs-grid">
        {PACKS.map((pack) => {
          const locked = xp < pack.unlockXp;
          const count = QUESTION_BANK.filter((question) => question.pack === pack.id).length;

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
                  {locked ? `🔒 Débloqué à ${pack.unlockXp} XP` : `✅ ${count} questions · ${pack.sessionSize} par partie`}
                </small>
                <p style={{ fontSize: 12, marginTop: 8 }}>{pack.modules.join(" · ")}</p>
              </div>
            </button>
          );
        })}
      </div>
    </main>
  );
}

function InfosScreen({ onStartPack, totalQuestions }) {
  return (
    <main className="screen infos-screen">
      <section className="section-head">
        <p className="eyebrow">Infos & événements</p>
        <h1>La culture reste vivante</h1>
        <p>Une zone pour afficher des focus, événements, annonces, culture du jour et contenus premium.</p>
      </section>

      <section className="info-ad-card big">
        <span className="ad-pulse">🔥 V1.2 Contenu</span>
        <h2>Plus de {totalQuestions} questions intégrées</h2>
        <p>
          Les packs ont maintenant plusieurs parties : culture, DJ, mindset, pionniers, Evokeez, débats et scénarios.
        </p>
        <button className="primary-btn" onClick={() => onStartPack("galactic")}>
          Tester Galactic Expert
        </button>
      </section>

      <section className="info-list">
        <article className="glass-card">
          <span>🌍 Culture du jour</span>
          <h3>Le Ghetto Zouk est une musique, pas une danse.</h3>
          <p>Cette nuance évite une confusion importante entre support musical et style dansé.</p>
        </article>

        <article className="glass-card">
          <span>🎧 Focus DJ</span>
          <h3>Un bon DJ construit une courbe émotionnelle.</h3>
          <p>Warm-up, douceur, énergie, respiration, intensité : un set raconte une histoire.</p>
        </article>

        <article className="glass-card">
          <span>🦋 Focus Evokeez</span>
          <h3>Musicalité · Créativité · Légèreté · Mindset</h3>
          <p>Une progression durable ne repose pas seulement sur les figures, mais sur la conscience et la pédagogie.</p>
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
          <span>
            {pack?.emoji} {pack?.title}
          </span>
          <span>
            {questionIndex + 1}/{totalQuestions}
          </span>
        </div>

        <div className="question-type">
          {question.type === "multi" ? "Plusieurs bonnes réponses" : "Une seule bonne réponse"}
        </div>

        <p className="eyebrow" style={{ marginTop: 0 }}>
          {question.module} · {question.difficulty}
        </p>

        <h1>{question.question}</h1>

        <div className="answers-grid">
          {question.options.map((option, index) => {
            const selected = selectedAnswers.includes(index);
            const correct = question.correct.includes(index);
            const showCorrect = submitted && correct;
            const showWrong = submitted && selected && !correct;

            return (
              <button
                key={`${question.id}-${option}`}
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

function ResultsScreen({ pack, score, total, gainedXp, newCards, answerLog, onReplay, onPacks, onCards }) {
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
          <strong>
            {score}/{total}
          </strong>
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
          <div>
            <strong>{answerLog.filter((item) => item.correct).length}</strong>
            <span>Réponses justes</span>
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

        <div className="new-cards" style={{ textAlign: "left" }}>
          <h2>Correction de la partie</h2>
          {answerLog.map((item, index) => (
            <div className="mini-unlock" key={`${item.id}-${index}`}>
              <strong>
                {item.correct ? "✅" : "❌"} Question {index + 1}
              </strong>
              <p style={{ margin: "8px 0 4px" }}>{item.question}</p>
              <p style={{ margin: "4px 0" }}>Ta réponse : {item.selectedTexts.join(" + ")}</p>
              <p style={{ margin: "4px 0" }}>Bonne réponse : {item.correctTexts.join(" + ")}</p>
              <p style={{ margin: "4px 0", opacity: 0.8 }}>{item.explanation}</p>
            </div>
          ))}
        </div>

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
        <p>Chaque bonne réponse peut débloquer une carte de culture, mindset, DJ ou histoire.</p>
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
              <span>
                {card.emoji} {card.pack}
              </span>
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
        <button key={item.id} className={page === item.id ? "active" : ""} onClick={() => setPage(item.id)}>
          <span>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}
