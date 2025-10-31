// Navigation functionality for smooth scrolling and active section highlighting
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');
    
    // Mobile navigation toggle functionality
    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            const isActive = navList.classList.contains('active');
            
            if (isActive) {
                closeNavigation();
            } else {
                openNavigation();
            }
        });
        
        // Close navigation when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
                closeNavigation();
            }
        });
        
        // Close navigation on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeNavigation();
            }
        });
        
        // Close navigation when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                closeNavigation();
            }
        });
    }
    
    function openNavigation() {
        navList.classList.add('active');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    function closeNavigation() {
        navList.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navigation height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile navigation after clicking a link
                closeNavigation();
            }
        });
    });
    
    // Active section highlighting on scroll
    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + 100; // Offset for better UX
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section's nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }
    
    // Listen for scroll events to update active navigation
    window.addEventListener('scroll', updateActiveNavigation);
    
    // Initialize active navigation on page load
    updateActiveNavigation();
});

// Quiz functionality
const quizData = [
    {
        question: "¿Qué es una ofrenda?",
        options: [
            "Un altar donde se colocan alimentos, fotos y recuerdos de los difuntos",
            "Una comida típica del Día de Muertos", 
            "Un tipo de flor"
        ],
        correct: 0
    },
    {
        question: "¿Cuál es la flor tradicional del Día de Muertos?",
        options: ["Rosa", "Cempasúchil", "Lirio"],
        correct: 1
    },
    {
        question: "¿Qué representan las calaveras de azúcar?",
        options: [
            "Son solo dulces sin significado",
            "Representan a los difuntos de manera festiva",
            "Son un tipo de ofrenda líquida"
        ],
        correct: 1
    }
];

// Quiz state management
let currentQuestionIndex = 0;
let userAnswers = [];
let quizScore = 0;

// Quiz DOM elements
const quizStartScreen = document.getElementById('quiz-start');
const quizQuestionsScreen = document.getElementById('quiz-questions');
const quizResultsScreen = document.getElementById('quiz-results');
const startQuizBtn = document.getElementById('start-quiz-btn');
const questionText = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options');
const questionCounter = document.getElementById('question-counter');
const progressFill = document.getElementById('progress-fill');
const nextQuestionBtn = document.getElementById('next-question-btn');
const finalScore = document.getElementById('final-score');
const scoreMessage = document.getElementById('score-message');
const restartQuizBtn = document.getElementById('restart-quiz-btn');
// Removed share results button

// Initialize quiz functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
    initializeAnimations();
});

// Initialize entrance animations with Intersection Observer
function initializeAnimations() {
    // Create intersection observer for entrance animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Add staggered animation to child elements
                const children = entry.target.querySelectorAll('.section-image, .section-text');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);
    
    // Observe all content sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add hover effects to interactive elements
    addHoverEffects();
}

// Add enhanced hover effects
function addHoverEffects() {
    // Enhanced image hover effects
    const images = document.querySelectorAll('.section-img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.filter = 'brightness(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'brightness(1)';
        });
    });
    
    // Enhanced button hover effects with ripple
    const buttons = document.querySelectorAll('.quiz-btn, .answer-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

// Create ripple effect on button click
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Initialize quiz event listeners and setup
function initializeQuiz() {
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', startQuiz);
    }
    
    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', nextQuestion);
    }
    
    if (restartQuizBtn) {
        restartQuizBtn.addEventListener('click', restartQuiz);
    }
    
    // Share functionality removed
}

// Start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    quizScore = 0;
    
    showScreen('questions');
    displayQuestion();
}

// Display current question
function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Clear any existing feedback messages
    const existingFeedback = document.querySelector('.feedback-message');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Update question text with animation
    questionText.style.opacity = '0';
    setTimeout(() => {
        questionText.textContent = currentQuestion.question;
        questionText.style.opacity = '1';
    }, 150);
    
    // Update progress
    updateProgress();
    
    // Clear previous answer options
    answerOptions.innerHTML = '';
    
    // Create answer buttons with staggered animation
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = option;
        button.setAttribute('data-answer', index);
        button.addEventListener('click', () => selectAnswer(index, button));
        
        // Add staggered entrance animation
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        answerOptions.appendChild(button);
        
        setTimeout(() => {
            button.style.transition = 'all 0.3s ease';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
    
    // Hide and reset next button
    nextQuestionBtn.style.display = 'none';
    nextQuestionBtn.classList.remove('fade-in');
}

// Handle answer selection
function selectAnswer(selectedIndex, selectedButton) {
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correct;
    
    // Store user answer
    userAnswers[currentQuestionIndex] = selectedIndex;
    
    // Update score if correct
    if (isCorrect) {
        quizScore++;
    }
    
    // Add immediate visual feedback to selected button
    selectedButton.classList.add('selected');
    
    // Disable all answer buttons and show feedback with animation delay
    const allAnswerButtons = answerOptions.querySelectorAll('.answer-btn');
    allAnswerButtons.forEach((button, index) => {
        button.disabled = true;
        
        // Add feedback classes with slight delay for better UX
        setTimeout(() => {
            if (index === currentQuestion.correct) {
                button.classList.add('correct');
                if (isCorrect) {
                    // Add celebration effect for correct answer
                    button.classList.add('celebrate');
                    showFeedbackMessage('¡Correcto! 🎉', 'success');
                }
            } else if (index === selectedIndex && !isCorrect) {
                button.classList.add('incorrect');
                showFeedbackMessage('Respuesta incorrecta 😔', 'error');
            }
        }, 200);
    });
    
    // Show next button or finish quiz with delay
    setTimeout(() => {
        if (currentQuestionIndex < quizData.length - 1) {
            nextQuestionBtn.textContent = 'Siguiente Pregunta';
            nextQuestionBtn.style.display = 'block';
            nextQuestionBtn.classList.add('fade-in');
        } else {
            nextQuestionBtn.textContent = 'Ver Resultados';
            nextQuestionBtn.style.display = 'block';
            nextQuestionBtn.classList.add('fade-in');
        }
    }, 800);
}

// Show feedback message
function showFeedbackMessage(message, type) {
    // Remove existing feedback message if any
    const existingFeedback = document.querySelector('.feedback-message');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create feedback message element
    const feedbackElement = document.createElement('div');
    feedbackElement.className = `feedback-message feedback-${type}`;
    feedbackElement.textContent = message;
    
    // Insert feedback message after question text
    questionText.parentNode.insertBefore(feedbackElement, answerOptions);
    
    // Animate in
    setTimeout(() => {
        feedbackElement.classList.add('show');
    }, 50);
    
    // Remove after delay
    setTimeout(() => {
        feedbackElement.classList.remove('show');
        setTimeout(() => {
            if (feedbackElement.parentNode) {
                feedbackElement.remove();
            }
        }, 300);
    }, 2000);
}

// Move to next question or show results
function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showResults();
    }
}

// Update progress bar and counter
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressFill.style.width = `${progress}%`;
    questionCounter.textContent = `Pregunta ${currentQuestionIndex + 1} de ${quizData.length}`;
}

// Show quiz results
function showResults() {
    showScreen('results');
    
    // Display final score
    finalScore.textContent = quizScore;
    
    // Generate score message
    const percentage = (quizScore / quizData.length) * 100;
    let message = '';
    
    if (percentage === 100) {
        message = '¡Excelente! Conoces muy bien las tradiciones del Día de Muertos. 🎉';
    } else if (percentage >= 66) {
        message = '¡Muy bien! Tienes un buen conocimiento de nuestras tradiciones. 👏';
    } else if (percentage >= 33) {
        message = 'Buen intento. Te invitamos a leer más sobre nuestras tradiciones. 📚';
    } else {
        message = 'No te preocupes, siempre hay tiempo para aprender sobre nuestras raíces. 🌺';
    }
    
    scoreMessage.textContent = message;
}

// Restart the quiz
function restartQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = [];
    quizScore = 0;
    
    // Clear any existing feedback messages
    const existingFeedback = document.querySelector('.feedback-message');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Reset button states
    nextQuestionBtn.classList.remove('fade-in');
    
    // Show start screen with animation
    showScreen('start');
    
    // Add confirmation feedback
    setTimeout(() => {
        const startButton = document.getElementById('start-quiz-btn');
        if (startButton) {
            startButton.classList.add('pulse');
            setTimeout(() => {
                startButton.classList.remove('pulse');
            }, 1000);
        }
    }, 300);
}

// Share functionality removed - users can manually share if needed

// Utility function to show different quiz screens
function showScreen(screenName) {
    // Hide all screens
    quizStartScreen.style.display = 'none';
    quizQuestionsScreen.style.display = 'none';
    quizResultsScreen.style.display = 'none';
    
    // Show requested screen
    switch (screenName) {
        case 'start':
            quizStartScreen.style.display = 'block';
            break;
        case 'questions':
            quizQuestionsScreen.style.display = 'block';
            break;
        case 'results':
            quizResultsScreen.style.display = 'block';
            break;
    }
}