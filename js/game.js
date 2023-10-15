(function (w) {
  const rules = {
    usePointCards: true,
    pointCardInNCards: 7,
    lang: 'es'
  }
  const players = [];
  const current = {
    player: 0,
    word: undefined,
    wordHasPoint: false,
    dice: undefined
  }
  var playersDiv = w.document.getElementById("players");
  var diceDiv = w.document.getElementById("dice");
  function addPlayer(p = {}) {
    var player = w.pictionaryBoard.addPlayer(p);
    players.push(player);
    var div = w.document.createElement("div");
    const selected = player.id === current.player;
    div.innerHTML = `
    <input type="radio" id="sel_${player.id}" name="player" value="${player.id}" ${selected ? 'checked': ''} />
    <label for="player${player.id}">
      <i class="fas fa-${player.icon}" style="color: ${player.color}"></i>
      <input id="name_${player.id}" value="${player.name}" />
    </label>
`;  
    playersDiv.appendChild(div);
    w.document.getElementById(`sel_${player.id}`).onchange = (e) => {
      current.player = player.id;
      save();
    }
    const input = w.document.getElementById(`name_${player.id}`);
    input.checked = 'checked'
    input.oninput = (e)=>{
      player.name = e.target.value;
      save();
    }
    save();
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function throwDice(playerId) {
    current.dice = getRandomInt(5) + 1;
    var newCell = w.pictionaryBoard.movePlayer(playerId, current.dice);
    getWord(newCell.name);
    showTurn();
  }

  function showTurn() {
    showCard(false);
    if (current.dice) {
      diceDiv.innerHTML = `<div>You rolled a ${current.dice}!</div>`;
    } else {
      diceDiv.innerHTML = '';
    }
    const word = w.document.getElementById("word");
    const cardInfo = w.document.getElementById("cardInfo");
    const card = w.document.getElementById("card");

    if (current.word) {
      let point = '';
      let pointInfo = '';
      if (current.wordHasPoint){
        point = '&#10687 '
        pointInfo = '<div style="margin-top:5px;font-size:60%">This card has &#10687, all players can guess. If an oponent wins, you lose the turn.</div>'
      }
      const cell = w.pictionaryBoard.cellOfPlayer(current.player);
      card.style.visibility = 'visible';
      card.style.borderColor = cell.color;
      cardInfo.innerHTML = `
      <div>
      <b>${EXPLAIN[cell.name].name}</b>:
      <i>${EXPLAIN[cell.name].description}</i>
      ${pointInfo}
      </div>`;
  
      word.innerHTML = `
      <div>(${rules.lang}) ${point}${current.word[rules.lang]}</div>`;
    } else {
      card.style.visibility = 'hidden';
    }

  }

  /* optional playerId, otherwise check the selected player */
  function movePlayer(playerId) {
    if (playerId === undefined) {
      var input;
      w.document.getElementsByName("player").forEach((e) => {
        if (e.checked) input = e;
      });
      if (!input) return;

      playerId = input.value;
    }

    throwDice(playerId);
    save();
  }

  var EXPLAIN = {
    A: { name: "Action", description: "An action, a verb." },
    P: { name: "Person/Place", description: "A Person or a place" },
    O: { name: "Object", description: "An Object, a noun" },
    D: { name: "Dificulty", description: "Something hard to explain :)" },
    TJ: { name: "All play", description: "All teams play! Any word!" },
  };
  var WORDS = {
    Object: [
      { de: "Tisch", en: "table", es: "mesa" },
      { de: "Stuhl", en: "chair", es: "silla" },
      { de: "Buch", en: "book", es: "libro" },
      { de: "Auto", en: "car", es: "coche" },
      { de: "Haus", en: "house", es: "casa" },
      { de: "Computer", en: "computer", es: "computadora" },
      { de: "Telefon", en: "phone", es: "teléfono" },
      { de: "Fenster", en: "window", es: "ventana" },
      { de: "Blume", en: "flower", es: "flor" },
      { de: "Schuhe", en: "shoes", es: "zapatos" },
      { de: "Tasse", en: "cup", es: "taza" },
      { de: "Gitarre", en: "guitar", es: "guitarra" },
      { de: "Uhr", en: "clock", es: "reloj" },
      { de: "Kamera", en: "camera", es: "cámara" },
      { de: "Sofa", en: "sofa", es: "sofá" },
      { de: "Tür", en: "door", es: "puerta" },
      { de: "Lampe", en: "lamp", es: "lámpara" },
      { de: "Brille", en: "glasses", es: "gafas" },
      { de: "Kühlschrank", en: "refrigerator", es: "nevera" },
      { de: "Schlüssel", en: "key", es: "llave" },
    ],
    Action: [
      { de: "Laufen", en: "run", es: "correr" },
      { de: "Schwimmen", en: "swim", es: "nadar" },
      { de: "Essen", en: "eat", es: "comer" },
      { de: "Trinken", en: "drink", es: "beber" },
      { de: "Schlafen", en: "sleep", es: "dormir" },
      { de: "Lesen", en: "read", es: "leer" },
      { de: "Schreiben", en: "write", es: "escribir" },
      { de: "Spielen", en: "play", es: "jugar" },
      { de: "Lachen", en: "laugh", es: "reír" },
      { de: "Sprechen", en: "speak", es: "hablar" },
      { de: "Arbeiten", en: "work", es: "trabajar" },
      { de: "Reisen", en: "travel", es: "viajar" },
      { de: "Hören", en: "listen", es: "escuchar" },
      { de: "Tanzen", en: "dance", es: "bailar" },
      { de: "Fahren", en: "drive", es: "conducir" },
      { de: "Kochen", en: "cook", es: "cocinar" },
      { de: "Sehen", en: "see", es: "ver" },
      { de: "Üben", en: "practice", es: "practicar" },
      { de: "Entspannen", en: "relax", es: "relajarse" },
      { de: "Helfen", en: "help", es: "ayudar" },
    ],
    Concept: [
      { de: "Liebe", en: "love", es: "amor" },
      { de: "Freiheit", en: "freedom", es: "libertad" },
      { de: "Glück", en: "happiness", es: "felicidad" },
      { de: "Frieden", en: "peace", es: "paz" },
      { de: "Zeit", en: "time", es: "tiempo" },
      { de: "Wissen", en: "knowledge", es: "conocimiento" },
      { de: "Freundschaft", en: "friendship", es: "amistad" },
      { de: "Gesundheit", en: "health", es: "salud" },
      { de: "Zukunft", en: "future", es: "futuro" },
      { de: "Schönheit", en: "beauty", es: "belleza" },
      { de: "Vertrauen", en: "trust", es: "confianza" },
      { de: "Mut", en: "courage", es: "coraje" },
      { de: "Glaube", en: "faith", es: "fe" },
      { de: "Hoffnung", en: "hope", es: "esperanza" },
      { de: "Erfolg", en: "success", es: "éxito" },
      { de: "Wahrheit", en: "truth", es: "verdad" },
      { de: "Kreativität", en: "creativity", es: "creatividad" },
      { de: "Erfahrung", en: "experience", es: "experiencia" },
      { de: "Freude", en: "joy", es: "alegría" },
      { de: "Ehrlichkeit", en: "honesty", es: "honestidad" },
    ],
    Professions: [
      { de: "Arzt", en: "doctor", es: "médico" },
      { de: "Lehrer", en: "teacher", es: "profesor" },
      { de: "Koch", en: "chef", es: "chef" },
      { de: "Ingenieur", en: "engineer", es: "ingeniero" },
      { de: "Schneider", en: "tailor", es: "sastre" },
      { de: "Polizist", en: "police officer", es: "policía" },
      { de: "Künstler", en: "artist", es: "artista" },
      { de: "Schreiner", en: "carpenter", es: "carpintero" },
      { de: "Verkäufer", en: "salesperson", es: "vendedor" },
      { de: "Krankenschwester", en: "nurse", es: "enfermera" },
      { de: "Anwalt", en: "lawyer", es: "abogado" },
      { de: "Architekt", en: "architect", es: "arquitecto" },
      { de: "Bauer", en: "farmer", es: "granjero" },
      { de: "Mechaniker", en: "mechanic", es: "mecánico" },
      { de: "Journalist", en: "journalist", es: "periodista" },
      { de: "Friseur", en: "hairdresser", es: "peluquero" },
      { de: "Bäcker", en: "baker", es: "panadero" },
      { de: "Maler", en: "painter", es: "pintor" },
      { de: "Elektriker", en: "electrician", es: "electricista" },
      { de: "Dentist", en: "dentist", es: "dentista" },
    ],
    Places: [
      { de: "Park", en: "park", es: "parque" },
      { de: "Strand", en: "beach", es: "playa" },
      { de: "Restaurant", en: "restaurant", es: "restaurante" },
      { de: "Schule", en: "school", es: "escuela" },
      { de: "Krankenhaus", en: "hospital", es: "hospital" },
      { de: "Museum", en: "museum", es: "museo" },
      { de: "Bibliothek", en: "library", es: "biblioteca" },
      { de: "Stadt", en: "city", es: "ciudad" },
      { de: "Strasse", en: "street", es: "calle" },
      { de: "Supermarkt", en: "supermarket", es: "supermercado" },
      { de: "Bahnhof", en: "train station", es: "estación de tren" },
      { de: "Flughafen", en: "airport", es: "aeropuerto" },
      { de: "Strandpromenade", en: "boardwalk", es: "paseo marítimo" },
      { de: "Theater", en: "theater", es: "teatro" },
      { de: "Kino", en: "cinema", es: "cine" },
      { de: "Zoo", en: "zoo", es: "zoológico" },
      { de: "Kaffeehaus", en: "cafe", es: "cafetería" },
      { de: "Sportplatz", en: "sports field", es: "campo deportivo" },
      { de: "Berg", en: "mountain", es: "montaña" },
      { de: "See", en: "lake", es: "lago" },
    ],
  };

  function getWord(category) {
    var wordsOfCat;
    current.wordHasPoint = false;

    if (category == "O") {
      wordsOfCat = WORDS.Object;
    } else if (category == "A") {
      wordsOfCat = WORDS.Action;
    } else if (category == "D") {
      wordsOfCat = WORDS.Concept;
    } else if (category == "P") {
      wordsOfCat = getRandomInt(2) > 0 ? WORDS.Professions : WORDS.Places;
    }
    if (!wordsOfCat) {
      // only TJ here
      //console.log("using random cat for " + category);
      var allCat = Object.keys(WORDS);
      wordsOfCat = WORDS[allCat[getRandomInt(allCat.length)]];
      current.wordHasPoint = false;
    } else {
      // 1 in N have point
      current.wordHasPoint = getRandomInt(rules.pointCardInNCards) == 0;
    }
    current.word = wordsOfCat[getRandomInt(wordsOfCat.length)];
  }

  function showCard(show = true) {
    var word = w.document.getElementById("word");
    word.className = show ? "" : "blur";
  }

  function init() {
    w.pictionaryBoard.render();
    load();

  }

  function save() {
    const playersState = players.map(p=>({id:p.id, color: p.color, icon:p.icon, atCell:p.atCell, name: p.name}));
    w.localStorage.setItem('game', JSON.stringify({
      playersState, 
      playerTurn: current.player,
      lastWord: current.word,
      lastDice:current.dice}));
  }

  function load() {
    const state = w.localStorage.getItem('game');
    if (state) {
      const {playersState, playerTurn, lastWord, lastDice} = JSON.parse(state);
      reset();
      current.player = playerTurn;
      current.word = lastWord;
      current.dice = lastDice;
      playersState.forEach(p=>{
        addPlayer(p)
      });
      showTurn()

    }
    
  }

  function reset() {
    playersDiv.innerHTML = '';
    current.word = current.dice = undefined;
    current.player = 0;

    w.pictionaryBoard.reset();
    players.length = 0;
    showTurn();
  }

  w.game = {
    init,
    addPlayer,
    movePlayer,
    showCard,
    reset
  };
})(window);
