# 🎃 Tradiciones del Día de Muertos

Una aplicación web interactiva que celebra y enseña sobre las tradiciones mexicanas del Día de Muertos a través de contenido educativo y un quiz interactivo.

![Día de Muertos](https://img.shields.io/badge/Tradición-Día%20de%20Muertos-orange?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Funcionalidades](#-funcionalidades)
- [Responsive Design](#-responsive-design)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## 🎯 Descripción

**Tradiciones del Día de Muertos** es una aplicación web educativa que preserva y comparte las ricas tradiciones mexicanas del Día de Muertos. La aplicación combina contenido informativo sobre elementos tradicionales como ofrendas, cempasúchil y calaveras de azúcar, con un quiz interactivo que permite a los usuarios probar sus conocimientos.

### 🌟 Objetivo

Educar y preservar las tradiciones culturales mexicanas del Día de Muertos de manera interactiva y accesible para todas las edades.

## ✨ Características

### 📚 Contenido Educativo
- **Ofrenda**: Información detallada sobre los altares tradicionales
- **Cempasúchil**: Historia y significado de la flor de muerto
- **Calaveras**: Explicación de las calaveras de azúcar y su simbolismo

### 🎮 Quiz Interactivo
- **10 preguntas** sobre tradiciones del Día de Muertos
- **Sistema de puntuación** con porcentajes
- **Persistencia de datos** usando localStorage
- **Tabla de clasificación** con los mejores puntajes
- **Animaciones** y efectos visuales

### 🏆 Sistema de Ranking
- **Top 10** mejores puntuaciones
- **Iconos especiales** para las primeras 3 posiciones (🥇🥈🥉)
- **Información detallada** de cada jugador
- **Actualización automática** de rankings

### 🎨 Diseño Temático
- **Colores tradicionales**: Naranja, dorado, morado
- **Tipografía elegante**: Playfair Display y Open Sans
- **Animaciones suaves** y transiciones
- **Elementos decorativos** temáticos

## 🛠 Tecnologías

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos avanzados con variables CSS, gradientes y animaciones
- **JavaScript ES6+**: Funcionalidad interactiva y manejo de datos
- **LocalStorage**: Persistencia de datos del usuario
- **Google Fonts**: Tipografía web optimizada
- **Responsive Design**: Compatible con todos los dispositivos

## 🚀 Instalación

### Prerrequisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, para desarrollo)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/AwsJsConf2025ChallengeJoryer.git
   cd AwsJsConf2025ChallengeJoryer
   ```

2. **Abrir en navegador**
   - Opción 1: Abrir `index.html` directamente en el navegador
   - Opción 2: Usar un servidor local
     ```bash
     # Con Python 3
     python -m http.server 8000
     
     # Con Node.js (si tienes http-server instalado)
     npx http-server
     
     # Con PHP
     php -S localhost:8000
     ```

3. **Acceder a la aplicación**
   - Navegador directo: `file:///ruta/al/proyecto/index.html`
   - Servidor local: `http://localhost:8000`

## 📖 Uso

### Navegación
1. **Inicio**: Página principal con introducción
2. **Ofrenda**: Información sobre altares tradicionales
3. **Cempasúchil**: Detalles sobre la flor tradicional
4. **Calaveras**: Explicación de las calaveras de azúcar
5. **Quiz**: Prueba interactiva de conocimientos
6. **Ranking**: Tabla de mejores puntuaciones

### Realizar el Quiz
1. Hacer clic en "Comenzar Quiz"
2. Responder las 10 preguntas sobre tradiciones
3. Ver los resultados al finalizar
4. Ingresar nombre para guardar puntuación
5. Consultar el ranking actualizado

### Funciones Adicionales
- **Navegación móvil**: Menú hamburguesa en dispositivos pequeños
- **Animaciones**: Efectos visuales al interactuar
- **Persistencia**: Los datos se guardan automáticamente
- **Responsive**: Se adapta a cualquier tamaño de pantalla

## 📁 Estructura del Proyecto

```
AwsJsConf2025ChallengeJoryer/
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── script.js               # Lógica JavaScript
├── README.md               # Documentación
├── LICENSE.md              # Licencia del proyecto
├── .gitignore              # Archivos ignorados por Git
└── images/                 # Recursos gráficos
    ├── altar.jpg           # Imagen de ofrenda
    ├── cempa.jpg           # Imagen de cempasúchil
    └── calaveritas.jpg     # Imagen de calaveras
```

## 🔧 Funcionalidades

### Sistema de Quiz
- **Preguntas aleatorias**: 10 preguntas sobre tradiciones
- **Validación de respuestas**: Feedback inmediato
- **Barra de progreso**: Indicador visual del avance
- **Puntuación**: Sistema de porcentajes

### Persistencia de Datos
```javascript
// Funciones principales de localStorage
- saveScore(name, score, percentage)
- getLeaderboard(limit)
- getPersonalBest(userName)
- clearAllData()
```

### Gestión de Estado
- **Control de flujo**: Estados del quiz (inicio, preguntas, resultados)
- **Validación**: Sanitización de datos de entrada
- **Error handling**: Manejo robusto de errores

### Animaciones CSS
- **Transiciones suaves**: 0.3s ease para interacciones
- **Efectos hover**: Transformaciones y sombras
- **Animaciones de entrada**: fadeIn, slideIn
- **Efectos especiales**: Glow, pulse, shimmer

## 📱 Responsive Design

### Breakpoints
- **Mobile Small**: 320px - 479px
- **Mobile**: 480px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+
- **Ultra-wide**: 1920px+

### Adaptaciones Móviles
- **Navegación**: Menú hamburguesa
- **Tipografía**: Tamaños escalables
- **Espaciado**: Márgenes optimizados
- **Interacciones**: Botones touch-friendly (min 48px)
- **Tablas**: Scroll horizontal en móviles

## 🎨 Paleta de Colores

```css
/* Colores Principales */
--color-primary-orange: #FF6B35    /* Naranja vibrante */
--color-primary-purple: #6A0572    /* Morado tradicional */
--color-primary-gold: #FFD700      /* Dorado festivo */
--color-primary-black: #1A1A1A     /* Negro profundo */

/* Colores Secundarios */
--color-secondary-orange-light: #FF8A65
--color-secondary-orange-dark: #E65100
--color-secondary-purple-light: #8E24AA
--color-secondary-purple-dark: #4A148C
```

## 🧪 Testing

### Pruebas Manuales
- ✅ Navegación entre secciones
- ✅ Funcionalidad del quiz completo
- ✅ Guardado y recuperación de datos
- ✅ Responsive design en diferentes dispositivos
- ✅ Accesibilidad básica (navegación por teclado)

### Compatibilidad de Navegadores
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Para contribuir:

1. **Fork** el proyecto
2. **Crear** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abrir** un Pull Request

### Tipos de Contribuciones
- 🐛 Reportar bugs
- ✨ Sugerir nuevas características
- 📝 Mejorar documentación
- 🎨 Mejorar diseño/UX
- 🌐 Agregar traducciones
- ❓ Agregar más preguntas al quiz

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👨‍💻 Autor

**Jorge Yerena** - *Desarrollo Full Stack*
- GitHub: [@joryer](https://github.com/joryer)
- Proyecto: [AwsJsConf2025ChallengeJoryer](https://github.com/joryer/AwsJsConf2025ChallengeJoryer)

## 🙏 Agradecimientos

- **Tradiciones Mexicanas**: Por la rica herencia cultural del Día de Muertos
- **Google Fonts**: Por las tipografías Playfair Display y Open Sans
- **Comunidad Open Source**: Por las herramientas y recursos utilizados
- **AWS JS Conf 2025**: Por la inspiración del challenge

---

### 🎃 ¡Celebremos nuestras tradiciones! 🎃

*"El Día de Muertos no es una celebración de la muerte, sino una celebración de la vida y el amor que perdura más allá de la muerte."*
