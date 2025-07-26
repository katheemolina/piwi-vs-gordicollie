# 🎨 Piwi vs Gordi Collie

Un emocionante juego de dibujo y adivinanza donde dos equipos compiten para adivinar palabras dibujadas por sus compañeros. ¡La creatividad y la velocidad son clave para la victoria!

## 🚀 Características

### ✨ Funcionalidades Principales
- **Juego escalable**: Soporta de 4 a 20 jugadores
- **Asignación flexible**: Manual o aleatoria de equipos
- **Sistema de niveles**: 5 niveles de dificultad (Fácil, Medio, Difícil, Muy Difícil, Frases)
- **Rondas dinámicas**: Se calculan automáticamente según el número de jugadores
- **Equilibrio automático**: Sistema que equilibra equipos para números impares de jugadores
- **Interfaz moderna**: Diseño atractivo con animaciones y efectos visuales
- **Modal de victoria**: Celebración especial con confeti al final del juego

### 🎯 Sistema de Juego
- **Dos equipos**: "Los Piwis" vs "Los Gordi Collie"
- **Turnos rotativos**: Cada jugador dibuja una vez por nivel
- **60 segundos**: Tiempo límite para adivinar cada palabra
- **Puntuación**: 1 punto por acierto
- **Victoria**: El equipo con más puntos al final gana

### 🎨 Diseño Visual
- **Fondo animado**: Gradientes con efectos de destellos
- **Glassmorphism**: Efectos de cristal y transparencia
- **Tipografía Roboto**: Fuente moderna y legible
- **Responsive**: Adaptado para móviles y desktop
- **Animaciones**: Transiciones suaves y efectos visuales

## 📋 Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Conexión a internet (para cargar Google Fonts)

## 🛠️ Instalación

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/katheemolina/piwi-vs-gordicollie.git
   cd piwi-vs-gordicollie
   ```

2. **Abre el proyecto**:
   - Abre `bienvenida.html` en tu navegador para comenzar
   - O abre `index.html` para ir directamente al juego

3. **¡Listo para jugar!** 🎮

## 🎮 Cómo Jugar

### 1. Configuración Inicial
- **Selecciona el número de jugadores** (4-20)
- **Elige el método de asignación**:
  - **Manual**: Asigna jugadores a cada equipo manualmente
  - **Aleatorio**: El sistema genera equipos automáticamente

### 2. Asignación de Equipos
- **Manual**: Completa los nombres de los jugadores para cada equipo
- **Aleatorio**: Ingresa todos los nombres y el sistema los distribuye

### 3. Desarrollo del Juego
- **Por turnos**: Un jugador dibuja mientras su equipo adivina
- **60 segundos**: Tiempo límite por palabra
- **Puntuación**: Cada acierto suma 1 punto
- **Niveles**: Todos los jugadores pasan por los 5 niveles

### 4. Finalización
- **Modal de victoria**: Celebración especial con confeti
- **Estadísticas**: Puntuaciones finales y equipo ganador
- **Opciones**: Jugar de nuevo o volver al menú

## 📁 Estructura del Proyecto

```
piwi-vs-gordicollie/
├── bienvenida.html          # Página de bienvenida
├── index.html              # Página principal del juego
├── script.js               # Lógica del juego
├── styles.css              # Estilos globales
├── img/                    # Imágenes del proyecto
│   ├── Logo.png           # Logo principal
│   └── Texto.png          # Imagen de título
├── sounds/                 # Efectos de sonido
│   ├── background.mp3     # Música de fondo
│   ├── next-turn.mp3      # Siguiente turno
│   ├── success.mp3        # Acierto
│   ├── tick.mp3           # Tic del reloj
│   ├── timeup.mp3         # Tiempo agotado
│   └── victory.mp3        # Victoria
└── README.md              # Documentación
```

## 🎯 Características Técnicas

### 🔧 Tecnologías Utilizadas
- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con animaciones
- **JavaScript ES6+**: Lógica del juego
- **Google Fonts**: Tipografía Roboto

### 🎨 Características de Diseño
- **Responsive Design**: Adaptable a diferentes pantallas
- **CSS Grid & Flexbox**: Layouts modernos
- **CSS Animations**: Efectos visuales suaves
- **Backdrop Filter**: Efectos de glassmorphism
- **CSS Variables**: Sistema de colores consistente

### ⚡ Funcionalidades JavaScript
- **Estado del juego**: Gestión completa del estado
- **Algoritmo Fisher-Yates**: Mezcla aleatoria de equipos
- **Sistema de turnos**: Rotación automática
- **Cálculo dinámico**: Rondas basadas en jugadores
- **Modales interactivos**: Interfaz de usuario avanzada

## 🎮 Sistema de Niveles

| Nivel | Dificultad | Ejemplos |
|-------|------------|----------|
| **Fácil** | Animales, objetos básicos | Gato, Casa, Sol |
| **Medio** | Objetos complejos | Paracaídas, Submarino |
| **Difícil** | Lugares y edificios | Aeropuerto, Catedral |
| **Muy Difícil** | Fenómenos naturales | Eclipse solar, Aurora boreal |
| **Frases** | Acciones y actividades | Jugar al fútbol, Cocinar |

## 🔄 Sistema de Rondas

### Cálculo Automático
- **Fórmula**: `Total Rondas = Jugadores × 5 Niveles`
- **Ejemplos**:
  - 4 jugadores = 20 rondas
  - 6 jugadores = 30 rondas
  - 8 jugadores = 40 rondas

### Equilibrio para Números Impares
- **Sistema automático**: Equilibra equipos automáticamente
- **Rondas equitativas**: Ambos equipos tienen las mismas oportunidades
- **Participación activa**: Todos los jugadores participan

## 🎨 Personalización

### Colores del Tema
```css
--primary-color: #6c5ce7
--secondary-color: #a29bfe
--accent-color: #ffd700
--background-gradient: linear-gradient(135deg, #e0f7fa, #b2ebf2, #9fdfe7)
```

### Fuentes
- **Principal**: Roboto (Google Fonts)
- **Pesos**: 100, 300, 400, 700, 900

## 🚀 Despliegue

### Servidor Local
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve .

# Con PHP
php -S localhost:8000
```

## 👥 Autores

- **Desarrollador Principal**: Kathee Molina
- **Diseño**: Kathee Molina
- **Concepto**: Piwi vs Gordi Collie

## 🙏 Agradecimientos

- **Google Fonts** por la tipografía Roboto
- **Comunidad de desarrolladores** por las inspiraciones
- **Familia y amigos** por las pruebas y feedback

## 📞 Contacto

- **GitHub**: [@katheemolina](https://github.com/katheemolina)
- **Proyecto**: [Piwi vs Gordi Collie](https://github.com/katheemolina/piwi-vs-gordicollie)

---

<div align="center">

**¡Disfruta jugando Piwi vs Gordi Collie! 🎨🎮**

*¡La creatividad y la diversión nunca terminan!*

</div>
