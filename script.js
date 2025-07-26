// Lista de palabras por nivel
const words = {
    'Fácil': [
        'Gato', 'Perro', 'Casa', 'Árbol', 'Sol', 'Luna', 'Estrella',
        'Avión', 'Barco', 'Coche', 'Bicicleta', 'Flor', 'Mariposa',
        'Pájaro', 'Pez', 'Elefante', 'León', 'Tigre', 'Mono', 'Serpiente',
        'Helado', 'Pizza', 'Hamburguesa', 'Tortuga', 'Delfín', 'Ballena',
        'Canguro', 'Koala', 'Panda', 'Jirafa', 'Cebra', 'Rinoceronte',
        'Hipopótamo', 'Cocodrilo', 'Tiburón', 'Pulpo', 'Medusa', 'Cangrejo',
        'Araña', 'Escorpión', 'Abeja', 'Hormiga', 'Grillo', 'Saltamontes',
        'Libélula', 'Mariquita', 'Caracol', 'Gusano', 'Oruga'
    ],
    'Medio': [
        'Paracaídas', 'Submarino', 'Cohete', 'Telescopio', 'Microscopio',
        'Robot', 'Computadora', 'Teléfono', 'Televisor', 'Refrigerador',
        'Lavadora', 'Aspiradora', 'Licuadora', 'Tostadora', 'Batidora',
        'Martillo', 'Destornillador', 'Taladro', 'Sierra', 'Llave',
        'Candado', 'Candela', 'Linterna', 'Paraguas', 'Sombrilla',
        'Maleta', 'Mochila', 'Cámara', 'Binocular', 'Brújula',
        'Globo', 'Cometa', 'Trompo', 'Yoyo', 'Dominó',
        'Ajedrez', 'Dados', 'Poker', 'Ruleta', 'Bingo'
    ],
    'Difícil': [
        'Aeropuerto', 'Estación de tren', 'Puerto', 'Autopista', 'Túnel',
        'Puente', 'Rascacielos', 'Catedral', 'Castillo', 'Palacio',
        'Museo', 'Biblioteca', 'Hospital', 'Escuela', 'Universidad',
        'Estadio', 'Teatro', 'Cine', 'Restaurante', 'Cafetería',
        'Supermercado', 'Farmacia', 'Banco', 'Oficina', 'Fábrica',
        'Granja', 'Zoológico', 'Acuario', 'Parque', 'Jardín',
        'Desierto', 'Selva', 'Océano', 'Montaña', 'Volcán',
        'Cascada', 'Lago', 'Río', 'Isla', 'Continente'
    ],
    'Muy Difícil': [
        'Eclipse solar', 'Aurora boreal', 'Tornado', 'Huracán', 'Terremoto',
        'Erupción volcánica', 'Tsunami', 'Inundación', 'Sequía', 'Incendio',
        'Arcoíris', 'Nube', 'Lluvia', 'Nieve', 'Granizo',
        'Viento', 'Tormenta', 'Relámpago', 'Trueno', 'Niebla',
        'Amanecer', 'Atardecer', 'Mediodía', 'Medianoche', 'Eclipse lunar',
        'Constelación', 'Galaxia', 'Planeta', 'Asteroide', 'Cometa',
        'Satélite', 'Cohete espacial', 'Estación espacial', 'Astronauta', 'Alienígena'
    ],
    'Frases': [
        'Jugar al fútbol', 'Bailar salsa', 'Cantar karaoke', 'Tocar guitarra', 'Pintar un cuadro',
        'Hacer ejercicio', 'Nadar en la piscina', 'Andar en bicicleta', 'Correr una maratón', 'Hacer yoga',
        'Cocinar una pizza', 'Hacer un pastel', 'Preparar un café', 'Servir una mesa', 'Limpiar la casa',
        'Regar las plantas', 'Cortar el césped', 'Podar un árbol', 'Sembrar flores', 'Cosechar frutas',
        'Viajar en avión', 'Navegar en barco', 'Conducir un auto', 'Montar a caballo', 'Caminar por la playa',
        'Ver una película', 'Leer un libro', 'Escribir una carta', 'Dibujar un retrato', 'Tomar una foto'
    ]
};

// Estado del juego
let gameState = {
    currentTeam: 1,
    currentPlayerIndex: 0,
    currentRound: 1,
    totalRounds: 30, // Se calculará dinámicamente
    scores: [0, 0],
    players: [[], []],
    teamNames: ['Los Piwis', 'Los Gordi Collie'],
    playerIndices: [0, 0],
    currentLevel: 'Fácil',
    levelRounds: {
        'Fácil': { start: 1, end: 0 }, // Se calculará dinámicamente
        'Medio': { start: 0, end: 0 },
        'Difícil': { start: 0, end: 0 },
        'Muy Difícil': { start: 0, end: 0 },
        'Frases': { start: 0, end: 0 }
    },
    totalPlayers: 6,
    assignmentMethod: 'manual',
    levels: ['Fácil', 'Medio', 'Difícil', 'Muy Difícil', 'Frases'],
    hasGhostPlayer: false,
    adjustedTotalPlayers: 0,
    ghostPlayer: null
};

// Variables para efectos de sonido
let tickSound, successSound, timeupSound, nextTurnSound, backgroundSound, victorySound;
let soundToggleBtn;
let isSoundEnabled = false;
let lastTickTime = 0;
const TICK_INTERVAL = 1000;

// Elementos del DOM
let playerConfigScreen = document.getElementById('player-config-screen');
let setupScreen = document.getElementById('setup-screen');
let randomAssignmentScreen = document.getElementById('random-assignment-screen');
let gameScreen = document.getElementById('game-screen');
let startGameBtn;
let getWordBtn = document.getElementById('get-word');
let correctBtn;
let skipBtn = document.getElementById('skip');
let currentWordDisplay = document.getElementById('current-word');
let currentTeamDisplay = document.getElementById('current-team');
let currentPlayerDisplay = document.getElementById('current-player');
let roundInfoDisplay = document.getElementById('round-info');
let team1ScoreDisplay = document.getElementById('team1-score');
let team2ScoreDisplay = document.getElementById('team2-score');
let team1ScoreNameDisplay = document.getElementById('team1-score-name');
let team2ScoreNameDisplay = document.getElementById('team2-score-name');

// Variables para el cronómetro
let timer;
let timeLeft = 60;
let wordModal = document.getElementById('word-modal');
let timeupModal = document.getElementById('timeup-modal');
let timerDisplay = document.getElementById('timer');
let modalWord = document.getElementById('modal-word');
let modalCorrectBtn = document.getElementById('modal-correct');
let nextTurnBtn = document.getElementById('next-turn');

// Funciones del juego
function calculateDynamicRounds() {
    const totalPlayers = gameState.totalPlayers;
    const levels = gameState.levels;
    const levelsCount = levels.length;
    
    console.log('=== CALCULANDO RONDAS DINÁMICAS ===');
    console.log('gameState.totalPlayers:', totalPlayers);
    console.log('levels:', levels);
    console.log('levelsCount:', levelsCount);
    
    // Manejar números impares: agregar un jugador fantasma
    let adjustedTotalPlayers = totalPlayers;
    let hasGhostPlayer = false;
    
    if (totalPlayers % 2 !== 0) {
        adjustedTotalPlayers = totalPlayers + 1;
        hasGhostPlayer = true;
        console.log(`Número impar de jugadores (${totalPlayers}). Se agregará un jugador fantasma.`);
    }
    
    // Cada jugador debe dibujar una vez por cada nivel
    // Total de rondas = jugadoresTotalesAjustados × 5 niveles
    const totalRounds = adjustedTotalPlayers * levelsCount;
    
    // Actualizar el estado del juego
    gameState.totalRounds = totalRounds;
    gameState.hasGhostPlayer = hasGhostPlayer;
    gameState.adjustedTotalPlayers = adjustedTotalPlayers;
    
    // Calcular los rangos de rondas para cada nivel
    let currentRound = 1;
    levels.forEach((level, index) => {
        const levelRounds = adjustedTotalPlayers; // Cada jugador (incluyendo fantasma) dibuja una vez por nivel
        gameState.levelRounds[level] = {
            start: currentRound,
            end: currentRound + levelRounds - 1
        };
        currentRound += levelRounds;
    });
    
    console.log('Rondas calculadas dinámicamente:');
    console.log('Total de jugadores originales:', totalPlayers);
    console.log('Jugadores ajustados (con fantasma):', adjustedTotalPlayers);
    console.log('Tiene jugador fantasma:', hasGhostPlayer);
    console.log('Rondas por nivel:', adjustedTotalPlayers);
    console.log('Total de rondas:', totalRounds);
    console.log('Rangos por nivel:', gameState.levelRounds);
    console.log('gameState después del cálculo:', {
        totalRounds: gameState.totalRounds,
        totalPlayers: gameState.totalPlayers,
        adjustedTotalPlayers: gameState.adjustedTotalPlayers,
        hasGhostPlayer: gameState.hasGhostPlayer
    });
    console.log('=== FIN CALCULANDO RONDAS ===');
}

function getCurrentLevel() {
    for (const [level, range] of Object.entries(gameState.levelRounds)) {
        if (gameState.currentRound >= range.start && gameState.currentRound <= range.end) {
            return level;
        }
    }
    return 'Fácil';
}

function getRandomWord() {
    const level = gameState.currentLevel;
    const levelWords = words[level];
    const randomIndex = Math.floor(Math.random() * levelWords.length);
    return levelWords[randomIndex];
}

// Funciones para el sistema escalable
function initializePlayerConfig() {
    const playerCountSelect = document.getElementById('player-count');
    const customCountSection = document.getElementById('custom-count');
    const continueConfigBtn = document.getElementById('continue-config');
    const backToConfigBtn = document.getElementById('back-to-config');

    // Mostrar/ocultar campo personalizado
    playerCountSelect.addEventListener('change', function() {
        console.log('Cambio en player-count select:', this.value);
        if (this.value === 'custom') {
            customCountSection.style.display = 'block';
        } else {
            customCountSection.style.display = 'none';
            gameState.totalPlayers = parseInt(this.value);
            console.log('gameState.totalPlayers actualizado a:', gameState.totalPlayers);
            updateRoundsInfo();
        }
    });

    // Manejar número personalizado
    document.getElementById('custom-player-count').addEventListener('input', function() {
        const newValue = parseInt(this.value) || 6;
        console.log('Cambio en custom-player-count:', this.value, '->', newValue);
        gameState.totalPlayers = newValue;
        console.log('gameState.totalPlayers actualizado a:', gameState.totalPlayers);
        updateRoundsInfo();
    });

    // Continuar a configuración de equipos
    continueConfigBtn.addEventListener('click', function() {
        const assignmentMethod = document.querySelector('input[name="assignment"]:checked').value;
        gameState.assignmentMethod = assignmentMethod;
        
        if (assignmentMethod === 'random') {
            // Ir a pantalla de asignación aleatoria
            playerConfigScreen.classList.remove('active');
            randomAssignmentScreen.classList.add('active');
            initializeRandomAssignment();
        } else {
            // Ir a pantalla de configuración manual
            playerConfigScreen.classList.remove('active');
            setupScreen.classList.add('active');
            updateTeamSetup();
        }
    });

    // Volver a configuración de jugadores
    backToConfigBtn.addEventListener('click', function() {
        setupScreen.classList.remove('active');
        playerConfigScreen.classList.add('active');
    });

    // Inicializar información de rondas
    updateRoundsInfo();
}

function updateRoundsInfo() {
    const totalPlayers = gameState.totalPlayers;
    const levelsCount = gameState.levels.length;
    
    // Calcular si necesita jugador fantasma
    const hasGhostPlayer = totalPlayers % 2 !== 0;
    const adjustedTotalPlayers = hasGhostPlayer ? totalPlayers + 1 : totalPlayers;
    const totalRounds = adjustedTotalPlayers * levelsCount;
    
    console.log('=== ACTUALIZANDO INFO DE RONDAS ===');
    console.log('totalPlayers:', totalPlayers);
    console.log('hasGhostPlayer:', hasGhostPlayer);
    console.log('adjustedTotalPlayers:', adjustedTotalPlayers);
    console.log('levelsCount:', levelsCount);
    console.log('totalRounds calculado:', totalRounds);
    
    const calculatedRoundsElement = document.getElementById('calculated-rounds');
    const roundsInfoElement = document.getElementById('rounds-info');
    const ghostPlayerInfoElement = document.getElementById('ghost-player-info');
    
    if (calculatedRoundsElement) {
        calculatedRoundsElement.textContent = totalRounds;
        console.log('Elemento calculated-rounds actualizado con:', totalRounds);
    }
    
    if (roundsInfoElement) {
        const distributionText = roundsInfoElement.querySelector('p:last-child');
        if (distributionText) {
            let ghostInfo = '';
            if (hasGhostPlayer) {
                ghostInfo = ` (${adjustedTotalPlayers} jugadores con 1 fantasma)`;
            }
            distributionText.innerHTML = `📊 <strong>Distribución:</strong> ${adjustedTotalPlayers} rondas por nivel (${levelsCount} niveles)${ghostInfo}`;
        }
    }
    
    // Mostrar/ocultar información del fantasma
    if (ghostPlayerInfoElement) {
        if (hasGhostPlayer) {
            ghostPlayerInfoElement.style.display = 'block';
            
            // Actualizar el ejemplo con el número correcto de jugadores
            const exampleText = ghostPlayerInfoElement.querySelector('.ghost-example p:nth-child(2)');
            if (exampleText) {
                exampleText.textContent = `Si tienes ${totalPlayers} jugadores, se crearán ${totalRounds} rondas totales`;
            }
            
            const roundsText = ghostPlayerInfoElement.querySelector('.ghost-example p:nth-child(3)');
            if (roundsText) {
                const roundsPerTeam = Math.ceil(totalRounds / 2);
                roundsText.innerHTML = `<strong>Distribución:</strong> ${roundsPerTeam} rondas por equipo (equilibrado)`;
            }
            
            const teamsText = ghostPlayerInfoElement.querySelector('.ghost-example p:nth-child(4)');
            if (teamsText) {
                teamsText.innerHTML = `<strong>Participación:</strong> Los jugadores del equipo más pequeño dibujarán más veces`;
            }
        } else {
            ghostPlayerInfoElement.style.display = 'none';
        }
    }
    
    console.log(`Información de rondas actualizada: ${totalRounds} rondas totales, ${adjustedTotalPlayers} por nivel`);
    if (hasGhostPlayer) {
        console.log(`Se agregará un jugador fantasma para equilibrar equipos`);
    }
    console.log('=== FIN ACTUALIZANDO INFO DE RONDAS ===');
}

function updateTeamSetup() {
    const playersPerTeam = Math.ceil(gameState.totalPlayers / 2);
    
    // Actualizar contenedores de jugadores
    updatePlayerContainer('team1-players', playersPerTeam, 'team1-player');
    updatePlayerContainer('team2-players', Math.floor(gameState.totalPlayers / 2), 'team2-player');
}

function updatePlayerContainer(containerId, playerCount, playerPrefix) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    for (let i = 1; i <= playerCount; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `${playerPrefix}${i}`;
        input.placeholder = `Jugador ${i}`;
        input.className = 'player-input';
        container.appendChild(input);
    }
}

function generateRandomTeams() {
    const allPlayers = [];
    
    // Generar nombres de jugadores
    for (let i = 1; i <= gameState.totalPlayers; i++) {
        allPlayers.push(`Jugador ${i}`);
    }
    
    // Mezclar aleatoriamente
    for (let i = allPlayers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allPlayers[i], allPlayers[j]] = [allPlayers[j], allPlayers[i]];
    }
    
    // Dividir en equipos
    const playersPerTeam = Math.ceil(gameState.totalPlayers / 2);
    gameState.players[0] = allPlayers.slice(0, playersPerTeam);
    gameState.players[1] = allPlayers.slice(playersPerTeam);
}

function collectPlayerNames() {
    const playersPerTeam = Math.ceil(gameState.totalPlayers / 2);
    
    // Recolectar nombres del equipo 1
    gameState.players[0] = [];
    for (let i = 1; i <= playersPerTeam; i++) {
        const playerName = document.getElementById(`team1-player${i}`).value || `Jugador ${i}`;
        gameState.players[0].push(playerName);
    }
    
    // Recolectar nombres del equipo 2
    gameState.players[1] = [];
    for (let i = 1; i <= Math.floor(gameState.totalPlayers / 2); i++) {
        const playerName = document.getElementById(`team2-player${i}`).value || `Jugador ${i}`;
        gameState.players[1].push(playerName);
    }
}

function collectRandomPlayerNames() {
    const players = [];
    for (let i = 1; i <= gameState.totalPlayers; i++) {
        const playerName = document.getElementById(`player-${i}`).value.trim();
        if (playerName) {
            players.push(playerName);
        }
    }
    return players;
}

function assignTeamsRandomly(players) {
    console.log('Asignando equipos aleatoriamente para:', players);
    
    // Mezclar jugadores aleatoriamente
    const shuffledPlayers = [...players];
    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }

    // Manejar números impares
    if (gameState.hasGhostPlayer) {
        // Dividir en equipos (uno tendrá un jugador más)
        const playersPerTeam = Math.ceil(shuffledPlayers.length / 2);
        const team1Size = playersPerTeam;
        const team2Size = shuffledPlayers.length - playersPerTeam;
        
        // Asignar equipos
        gameState.players[0] = shuffledPlayers.slice(0, team1Size);
        gameState.players[1] = shuffledPlayers.slice(team1Size);
        
        // Elegir aleatoriamente en qué equipo estará el fantasma
        const ghostTeamIndex = Math.random() < 0.5 ? 0 : 1;
        
        // Agregar el fantasma al equipo elegido
        gameState.players[ghostTeamIndex].push('👻 El Fantasma');
        
        // Marcar el jugador fantasma
        gameState.ghostPlayer = {
            name: '👻 El Fantasma',
            team: ghostTeamIndex,
            originalIndex: gameState.players[ghostTeamIndex].length - 1 // El último índice
        };
        
        console.log(`Jugador fantasma agregado al equipo ${ghostTeamIndex + 1}`);
    } else {
        // Número par de jugadores - distribución normal
        const playersPerTeam = Math.ceil(shuffledPlayers.length / 2);
        gameState.players[0] = shuffledPlayers.slice(0, playersPerTeam);
        gameState.players[1] = shuffledPlayers.slice(playersPerTeam);
        gameState.ghostPlayer = null;
    }
    
    console.log('Equipos asignados:');
    console.log('Equipo 1 (Los Piwis):', gameState.players[0]);
    console.log('Equipo 2 (Los Gordi Collie):', gameState.players[1]);
    if (gameState.ghostPlayer) {
        console.log('Jugador fantasma:', gameState.ghostPlayer);
    }

    // Mostrar resultados con animación
    displayTeamResults();
}

function displayTeamResults() {
    const teamsResult = document.getElementById('teams-result');
    const team1List = document.getElementById('team1-result-list');
    const team2List = document.getElementById('team2-result-list');

    // Limpiar listas
    team1List.innerHTML = '';
    team2List.innerHTML = '';

    // Mostrar equipo 1
    gameState.players[0].forEach((player, index) => {
        setTimeout(() => {
            const playerTag = document.createElement('div');
            playerTag.className = 'player-tag';
            
            // Marcar jugador fantasma si es el fantasma
            if (player === '👻 El Fantasma') {
                playerTag.textContent = player;
                playerTag.style.opacity = '0.7';
                playerTag.style.fontStyle = 'italic';
            } else {
                playerTag.textContent = player;
            }
            
            team1List.appendChild(playerTag);
        }, index * 200);
    });

    // Mostrar equipo 2
    gameState.players[1].forEach((player, index) => {
        setTimeout(() => {
            const playerTag = document.createElement('div');
            playerTag.className = 'player-tag';
            
            // Marcar jugador fantasma si es el fantasma
            if (player === '👻 El Fantasma') {
                playerTag.textContent = player;
                playerTag.style.opacity = '0.7';
                playerTag.style.fontStyle = 'italic';
            } else {
                playerTag.textContent = player;
            }
            
            team2List.appendChild(playerTag);
        }, index * 200);
    });

    // Mostrar el resultado con animación
    setTimeout(() => {
        teamsResult.style.display = 'block';
        teamsResult.style.opacity = '0';
        teamsResult.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            teamsResult.style.transition = 'all 0.5s ease';
            teamsResult.style.opacity = '1';
            teamsResult.style.transform = 'translateY(0)';
        }, 100);
    }, gameState.players[0].length * 200 + gameState.players[1].length * 200);
}

function startGame() {
    console.log('=== INICIANDO JUEGO ===');
    console.log('gameState antes de startGame:', {
        totalPlayers: gameState.totalPlayers,
        totalRounds: gameState.totalRounds,
        assignmentMethod: gameState.assignmentMethod
    });
    
    // Guardar nombres de equipos
    gameState.teamNames[0] = document.getElementById('team1-name')?.value || 'Los Piwis';
    gameState.teamNames[1] = document.getElementById('team2-name')?.value || 'Los Gordi Collie';
    
    // Si es asignación aleatoria, los jugadores ya están en gameState.players
    // Si es manual, recolectar nombres de jugadores
    if (gameState.assignmentMethod === 'manual') {
        collectPlayerNames();
        
        // Agregar fantasma si es necesario (para asignación manual)
        if (gameState.hasGhostPlayer) {
            // Elegir aleatoriamente en qué equipo estará el fantasma
            const ghostTeamIndex = Math.random() < 0.5 ? 0 : 1;
            
            // Agregar el fantasma al equipo elegido
            gameState.players[ghostTeamIndex].push('👻 El Fantasma');
            
            // Marcar el jugador fantasma
            gameState.ghostPlayer = {
                name: '👻 El Fantasma',
                team: ghostTeamIndex,
                originalIndex: gameState.players[ghostTeamIndex].length - 1 // El último índice
            };
            
            console.log(`Jugador fantasma agregado al equipo ${ghostTeamIndex + 1} (asignación manual)`);
        }
    }
    // Si es aleatorio, gameState.players ya tiene los nombres asignados

    // Calcular rondas dinámicamente
    calculateDynamicRounds();

    // Inicializar el primer turno
    gameState.currentTeam = 1;
    gameState.currentRound = 1;
    gameState.playerIndices = [0, 0];
    gameState.currentLevel = 'Fácil';
    gameState.scores = [0, 0];

    console.log('gameState después de startGame:', {
        totalPlayers: gameState.totalPlayers,
        totalRounds: gameState.totalRounds,
        currentRound: gameState.currentRound,
        players: gameState.players,
        hasGhostPlayer: gameState.hasGhostPlayer,
        ghostPlayer: gameState.ghostPlayer
    });

    // Actualizar la interfaz
    team1ScoreNameDisplay.textContent = gameState.teamNames[0];
    team2ScoreNameDisplay.textContent = gameState.teamNames[1];
    team1ScoreDisplay.textContent = '0';
    team2ScoreDisplay.textContent = '0';

    // Cambiar a la pantalla de juego
    setupScreen.classList.remove('active');
    randomAssignmentScreen.classList.remove('active');
    gameScreen.classList.add('active');

    updateTurnInfo();
    console.log('=== FIN INICIANDO JUEGO ===');
}

function updateTurnInfo() {
    const currentTeam = gameState.currentTeam - 1;
    const playerIndex = gameState.playerIndices[currentTeam];
    gameState.currentLevel = getCurrentLevel();
    
    // Verificar que el jugador existe
    const currentPlayer = gameState.players[currentTeam][playerIndex] || `Jugador ${playerIndex + 1}`;
    
    // Verificar si es el turno del fantasma
    const isGhostTurn = currentPlayer === '👻 El Fantasma';
    
    console.log('Actualizando turno:');
    console.log('Equipo actual:', gameState.teamNames[currentTeam]);
    console.log('Jugadores del equipo:', gameState.players[currentTeam]);
    console.log('Índice del jugador:', playerIndex);
    console.log('Jugador actual:', currentPlayer);
    console.log('Ronda actual:', gameState.currentRound, 'de', gameState.totalRounds);
    console.log('Nivel actual:', gameState.currentLevel);
    console.log('¿Es turno del fantasma?', isGhostTurn);
    
    currentTeamDisplay.textContent = `Turno de ${gameState.teamNames[currentTeam]}`;
    
    if (isGhostTurn) {
        currentPlayerDisplay.textContent = `👻 Fantasma: El equipo elige quién dibuja`;
        currentPlayerDisplay.style.color = '#fd79a8';
        currentPlayerDisplay.style.fontWeight = '700';
    } else {
        currentPlayerDisplay.textContent = `Dibuja: ${currentPlayer}`;
        currentPlayerDisplay.style.color = '#6c5ce7';
        currentPlayerDisplay.style.fontWeight = '700';
    }
    
    roundInfoDisplay.textContent = `Ronda ${gameState.currentRound} de ${gameState.totalRounds} - Nivel: ${gameState.currentLevel}`;
}

function handleCorrect() {
    // Validar que haya una palabra mostrada
    if (!currentWordDisplay.textContent) {
        alert('Primero debes obtener una palabra para poder sumar puntos');
        return;
    }

    // Sumar punto al equipo actual
    const teamIndex = gameState.currentTeam - 1;
    gameState.scores[teamIndex]++;
    document.getElementById(`team${gameState.currentTeam}-score`).textContent = gameState.scores[teamIndex];
    
    // Ocultar la palabra actual
    currentWordDisplay.textContent = '';
    
    // Cambiar al siguiente turno
    nextTurn();
}

function nextTurn() {
    // Avanzar al siguiente jugador del equipo actual
    const currentTeamIndex = gameState.currentTeam - 1;
    const teamPlayerCount = gameState.players[currentTeamIndex].length;
    gameState.playerIndices[currentTeamIndex] = (gameState.playerIndices[currentTeamIndex] + 1) % teamPlayerCount;
    
    // Cambiar al otro equipo para la siguiente ronda
    gameState.currentTeam = gameState.currentTeam === 1 ? 2 : 1;
    
    // Avanzar la ronda
    gameState.currentRound++;
    
    // Actualizar la interfaz
    updateTurnInfo();
    
    // Limpiar la palabra actual
    currentWordDisplay.textContent = '';
    
    // Verificar si el juego ha terminado
    if (gameState.currentRound > gameState.totalRounds) {
        endGame();
    }
}

function endGame() {
    console.log('=== FINALIZANDO JUEGO ===');
    console.log('Puntuación final:', gameState.scores);
    console.log('Nombres de equipos:', gameState.teamNames);
    console.log('Jugadores:', gameState.players);
    
    const team1Score = gameState.scores[0];
    const team2Score = gameState.scores[1];
    const team1Name = gameState.teamNames[0];
    const team2Name = gameState.teamNames[1];
    
    // Actualizar puntuaciones en el modal
    document.getElementById('final-team1-name').textContent = team1Name;
    document.getElementById('final-team2-name').textContent = team2Name;
    document.getElementById('final-team1-score').textContent = team1Score;
    document.getElementById('final-team2-score').textContent = team2Score;
    
    // Determinar ganador o empate
    if (team1Score > team2Score) {
        showVictoryModal(team1Name, gameState.players[0], 'victory');
    } else if (team2Score > team1Score) {
        showVictoryModal(team2Name, gameState.players[1], 'victory');
    } else {
        showVictoryModal(null, null, 'tie');
    }
}

function showVictoryModal(winningTeamName, winningTeamPlayers, type) {
    const victoryModal = document.getElementById('victory-modal');
    const winnerInfo = document.getElementById('winner-info');
    const tieInfo = document.getElementById('tie-info');
    const victoryTitle = document.getElementById('victory-title');
    const victorySubtitle = document.getElementById('victory-subtitle');
    
    if (type === 'victory') {
        // Mostrar información del equipo ganador
        victoryTitle.textContent = '🏆 ¡Victoria!';
        victorySubtitle.textContent = '¡Un equipo ha demostrado su superioridad!';
        
        document.getElementById('winning-team-name').textContent = winningTeamName;
        
        // Mostrar jugadores del equipo ganador
        const winningTeamPlayersContainer = document.getElementById('winning-team-players');
        winningTeamPlayersContainer.innerHTML = '';
        
        winningTeamPlayers.forEach((player, index) => {
            // No mostrar el fantasma en la lista de ganadores
            if (player !== '👻 El Fantasma') {
                setTimeout(() => {
                    const playerBadge = document.createElement('div');
                    playerBadge.className = 'player-badge';
                    playerBadge.textContent = player;
                    playerBadge.style.animationDelay = `${index * 0.2}s`;
                    winningTeamPlayersContainer.appendChild(playerBadge);
                }, index * 200);
            }
        });
        
        winnerInfo.style.display = 'block';
        tieInfo.style.display = 'none';
        
        // Crear confeti
        createConfetti();
        
    } else {
        // Mostrar mensaje de empate
        victoryTitle.textContent = '🤝 ¡Empate!';
        victorySubtitle.textContent = '¡Ambos equipos han demostrado un excelente nivel!';
        
        winnerInfo.style.display = 'none';
        tieInfo.style.display = 'block';
        
        // Crear confeti para empate también
        createConfetti();
    }
    
    // Mostrar modal
    victoryModal.style.display = 'block';
    
    // Event listeners para los botones
    document.getElementById('play-again-btn').onclick = function() {
        victoryModal.style.display = 'none';
        // Reiniciar el juego
        gameScreen.classList.remove('active');
        playerConfigScreen.classList.add('active');
        // Limpiar confeti
        clearConfetti();
    };
    
    document.getElementById('back-to-menu-btn').onclick = function() {
        victoryModal.style.display = 'none';
        // Volver al menú principal
        gameScreen.classList.remove('active');
        playerConfigScreen.classList.add('active');
        // Limpiar confeti
        clearConfetti();
    };
}

function createConfetti() {
    const victoryModal = document.getElementById('victory-modal');
    
    // Crear 50 piezas de confeti
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            victoryModal.appendChild(confetti);
            
            // Remover confeti después de la animación
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 100);
    }
}

function clearConfetti() {
    const victoryModal = document.getElementById('victory-modal');
    const confettiElements = victoryModal.querySelectorAll('.confetti');
    confettiElements.forEach(confetti => {
        confetti.remove();
    });
}

// Función para mostrar el modal con la palabra
function showWordModal(word) {
    modalWord.textContent = word;
    wordModal.style.display = 'block';
    startTimer();
}

// Función para iniciar el cronómetro
function startTimer() {
    timeLeft = 60;
    timerDisplay.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            showTimeUpMessage();
        }
    }, 1000);
}

// Función para mostrar mensaje de tiempo agotado
function showTimeUpMessage() {
    wordModal.style.display = 'none';
    timeupModal.style.display = 'block';
}

// Event listeners para los botones
document.getElementById('get-word').addEventListener('click', () => {
    // Verificar si es el turno del fantasma
    const currentTeam = gameState.currentTeam - 1;
    const playerIndex = gameState.playerIndices[currentTeam];
    const currentPlayer = gameState.players[currentTeam][playerIndex];
    const isGhostTurn = currentPlayer === '👻 El Fantasma';
    
    if (isGhostTurn) {
        // Es el turno del fantasma, mostrar modal de selección
        handleGhostTurn();
    } else {
        // Turno normal, obtener palabra directamente
        const word = getRandomWord();
        showWordModal(word);
    }
});

modalCorrectBtn.addEventListener('click', () => {
    clearInterval(timer);
    wordModal.style.display = 'none';
    // Sumar punto al equipo actual
    const teamIndex = gameState.currentTeam - 1;
    gameState.scores[teamIndex]++;
    document.getElementById(`team${gameState.currentTeam}-score`).textContent = gameState.scores[teamIndex];
    nextTurn();
});

nextTurnBtn.addEventListener('click', () => {
    timeupModal.style.display = 'none';
    nextTurn();
});

// Función para cerrar los modales al hacer clic fuera de ellos
window.addEventListener('click', (event) => {
    if (event.target === wordModal) {
        wordModal.style.display = 'none';
        clearInterval(timer);
    }
    if (event.target === timeupModal) {
        timeupModal.style.display = 'none';
    }
});

// Función para manejar el turno del fantasma
function handleGhostTurn() {
    const currentTeam = gameState.currentTeam - 1;
    const teamPlayers = gameState.players[currentTeam];
    
    // Crear modal para que el equipo elija quién dibuja
    const ghostModal = document.createElement('div');
    ghostModal.className = 'modal';
    ghostModal.style.display = 'block';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.innerHTML = `
        <h2>👻 Turno del Fantasma</h2>
        <p>El equipo <strong>${gameState.teamNames[currentTeam]}</strong> debe elegir quién dibuja:</p>
        <div class="ghost-player-selection">
            ${teamPlayers.map((player) => {
                // No mostrar el fantasma como opción
                if (player === '👻 El Fantasma') {
                    return '';
                }
                return `<button class="btn ghost-player-btn" data-player="${player}">${player}</button>`;
            }).join('')}
        </div>
    `;
    
    ghostModal.appendChild(modalContent);
    document.body.appendChild(ghostModal);
    
    // Event listeners para los botones de selección
    const ghostButtons = modalContent.querySelectorAll('.ghost-player-btn');
    ghostButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedPlayer = this.getAttribute('data-player');
            console.log(`Fantasma eligió a: ${selectedPlayer}`);
            
            // Cerrar modal
            document.body.removeChild(ghostModal);
            
            // Continuar con el juego con el jugador seleccionado
            continueWithSelectedPlayer(selectedPlayer);
        });
    });
}

function continueWithSelectedPlayer(selectedPlayer) {
    // Actualizar la interfaz para mostrar quién dibuja
    currentPlayerDisplay.textContent = `Dibuja: ${selectedPlayer} (elegido por el fantasma)`;
    currentPlayerDisplay.style.color = '#6c5ce7';
    
    // Obtener palabra y mostrar modal
    const word = getRandomWord();
    showWordModal(word);
}

// Inicializar elementos del DOM y event listeners
function initializeGame() {
    startGameBtn = document.getElementById('start-game');
    correctBtn = document.getElementById('correct');
    wordModal = document.getElementById('word-modal');
    timeupModal = document.getElementById('timeup-modal');

    // Inicializar configuración de jugadores
    initializePlayerConfig();

    if (startGameBtn) {
        startGameBtn.addEventListener('click', startGame);
    }
    if (correctBtn) {
        correctBtn.addEventListener('click', handleCorrect);
    }
}

// Función para inicializar la asignación aleatoria cuando se necesite
function initializeRandomAssignment() {
    const playersGrid = document.getElementById('players-grid');
    const assignTeamsBtn = document.getElementById('assign-teams-btn');
    const backToRandomConfigBtn = document.getElementById('back-to-random-config');
    const startRandomGameBtn = document.getElementById('start-random-game');

    if (!playersGrid || !assignTeamsBtn) {
        console.error('Elementos de asignación aleatoria no encontrados');
        return;
    }

    // Generar campos de entrada para jugadores
    playersGrid.innerHTML = '';
    for (let i = 1; i <= gameState.totalPlayers; i++) {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'player-input-group';
        inputGroup.innerHTML = `
            <input type="text" id="player-${i}" placeholder="Jugador ${i}" class="player-input">
        `;
        playersGrid.appendChild(inputGroup);
    }

    // Botón de asignar equipos
    assignTeamsBtn.addEventListener('click', function() {
        console.log('Botón de asignar equipos clickeado');
        const players = collectRandomPlayerNames();
        console.log('Jugadores recolectados:', players);
        
        if (players.length < 2) {
            alert('Necesitas al menos 2 jugadores para formar equipos');
            return;
        }
        
        // Animación de desordenamiento
        this.classList.add('shuffle-animation');
        this.disabled = true;
        this.textContent = '🎲 Mezclando equipos...';
        
        setTimeout(() => {
            assignTeamsRandomly(players);
            this.classList.remove('shuffle-animation');
            this.disabled = false;
            this.textContent = '🎲 Asignar Equipos Aleatoriamente';
        }, 2000);
    });

    // Botón volver
    if (backToRandomConfigBtn) {
        backToRandomConfigBtn.addEventListener('click', function() {
            randomAssignmentScreen.classList.remove('active');
            playerConfigScreen.classList.add('active');
        });
    }

    // Botón comenzar juego
    if (startRandomGameBtn) {
        startRandomGameBtn.addEventListener('click', function() {
            randomAssignmentScreen.classList.remove('active');
            gameScreen.classList.add('active');
            startGame();
        });
    }
}

// Inicializar el juego cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initializeGame); 