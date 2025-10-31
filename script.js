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
    },
    {
        question: "¿Cuándo se celebra el Día de Muertos en México?",
        options: [
            "31 de octubre",
            "1 y 2 de noviembre",
            "15 de septiembre"
        ],
        correct: 1
    },
    {
        question: "¿Qué significa el papel picado en las ofrendas?",
        options: [
            "Representa el viento y la fragilidad de la vida",
            "Es solo decoración sin significado",
            "Simboliza la riqueza de la familia"
        ],
        correct: 0
    },
    {
        question: "¿Cuál es el nombre de la famosa Catrina?",
        options: [
            "La Muerte Elegante",
            "La Calavera Garbancera",
            "La Dama de la Muerte"
        ],
        correct: 1
    },
    {
        question: "¿Qué se coloca en las ofrendas para que las almas encuentren el camino?",
        options: [
            "Velas y veladoras",
            "Espejos",
            "Campanas"
        ],
        correct: 0
    },
    {
        question: "¿Cuál es el origen prehispánico del Día de Muertos?",
        options: [
            "Tradición maya",
            "Tradición azteca y mexica",
            "Tradición olmeca"
        ],
        correct: 1
    },
    {
        question: "¿Qué bebida tradicional se ofrece a los difuntos?",
        options: [
            "Tequila",
            "Pulque",
            "La bebida favorita del difunto"
        ],
        correct: 2
    },
    {
        question: "¿Cuántos niveles puede tener una ofrenda tradicional?",
        options: [
            "Solo 1 nivel",
            "2, 3 o 7 niveles",
            "Siempre 5 niveles"
        ],
        correct: 1
    }
];

// LocalStorage utility functions for quiz data persistence
const STORAGE_KEY = 'dia-muertos-quiz-data';
const MAX_SCORES = 50; // Limit to prevent storage bloat

// Data migration and schema versioning
const CURRENT_SCHEMA_VERSION = 1;

// Data validation and error handling for localStorage operations
function isLocalStorageAvailable() {
    try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        console.warn('LocalStorage is not available:', e);
        return false;
    }
}

// Handle data migration for future schema updates
function migrateData(data) {
    // If no version, assume version 0 (original format)
    const currentVersion = data.schemaVersion || 0;
    
    if (currentVersion < CURRENT_SCHEMA_VERSION) {
        console.log(`Migrating data from version ${currentVersion} to ${CURRENT_SCHEMA_VERSION}`);
        
        // Migration logic for future versions
        switch (currentVersion) {
            case 0:
                // Version 0 to 1: Add schema version and ensure all required fields
                data.schemaVersion = 1;
                data.scores = data.scores || [];
                data.personalBest = data.personalBest || null;
                data.totalAttempts = data.totalAttempts || data.scores.length;
                break;
            // Future migrations would go here
        }
        
        // Save migrated data
        saveStoredData(data);
        console.log('Data migration completed successfully');
    }
    
    return data;
}

function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    // Remove HTML tags and limit length
    return input.replace(/<[^>]*>/g, '').trim().substring(0, 50);
}

function validateScoreData(data) {
    return data && 
           typeof data.name === 'string' && 
           typeof data.score === 'number' && 
           typeof data.date === 'string' && 
           typeof data.percentage === 'number' &&
           data.score >= 0 && 
           data.score <= quizData.length &&
           data.percentage >= 0 && 
           data.percentage <= 100;
}

// Get stored quiz data with error handling and migration
function getStoredData() {
    if (!isLocalStorageAvailable()) {
        return { 
            scores: [], 
            personalBest: null, 
            totalAttempts: 0, 
            schemaVersion: CURRENT_SCHEMA_VERSION 
        };
    }
    
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            return { 
                scores: [], 
                personalBest: null, 
                totalAttempts: 0, 
                schemaVersion: CURRENT_SCHEMA_VERSION 
            };
        }
        
        let data = JSON.parse(stored);
        
        // Validate data structure
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid data structure');
        }
        
        // Handle data migration
        data = migrateData(data);
        
        // Ensure arrays exist and validate scores
        const validScores = (data.scores || []).filter(validateScoreData);
        
        return {
            scores: validScores,
            personalBest: data.personalBest && validateScoreData(data.personalBest) ? data.personalBest : null,
            totalAttempts: typeof data.totalAttempts === 'number' ? data.totalAttempts : validScores.length,
            schemaVersion: data.schemaVersion || CURRENT_SCHEMA_VERSION
        };
    } catch (e) {
        console.warn('Error reading stored quiz data:', e);
        return { 
            scores: [], 
            personalBest: null, 
            totalAttempts: 0, 
            schemaVersion: CURRENT_SCHEMA_VERSION 
        };
    }
}

// Save quiz data with error handling and quota management
function saveStoredData(data) {
    if (!isLocalStorageAvailable()) {
        console.warn('Cannot save data: localStorage not available');
        return false;
    }
    
    try {
        // Limit scores to prevent storage bloat
        if (data.scores && data.scores.length > MAX_SCORES) {
            // Keep most recent scores
            data.scores = data.scores
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, MAX_SCORES);
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            console.warn('Storage quota exceeded. Clearing old data...');
            // Try to clear some old scores and retry
            if (data.scores && data.scores.length > 10) {
                data.scores = data.scores.slice(0, 10);
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                    return true;
                } catch (retryError) {
                    console.error('Failed to save even after clearing data:', retryError);
                }
            }
        } else {
            console.error('Error saving quiz data:', e);
        }
        return false;
    }
}

// Save user score with name and quiz results
function saveScore(name, score, percentage) {
    const sanitizedName = sanitizeInput(name);
    if (!sanitizedName) {
        console.warn('Invalid name provided');
        return false;
    }
    
    const scoreEntry = {
        name: sanitizedName,
        score: score,
        date: new Date().toISOString(),
        percentage: percentage
    };
    
    if (!validateScoreData(scoreEntry)) {
        console.warn('Invalid score data');
        return false;
    }
    
    const data = getStoredData();
    
    // Add new score
    data.scores.push(scoreEntry);
    data.totalAttempts = (data.totalAttempts || 0) + 1;
    
    // Update personal best if this is better
    if (!data.personalBest || scoreEntry.percentage > data.personalBest.percentage) {
        data.personalBest = { ...scoreEntry };
    }
    
    return saveStoredData(data);
}

// Get leaderboard with top scores (default top 5)
function getLeaderboard(limit = 5) {
    const data = getStoredData();
    
    if (!data.scores || data.scores.length === 0) {
        return [];
    }
    
    // Sort by percentage (descending), then by date (most recent first)
    return data.scores
        .sort((a, b) => {
            if (b.percentage !== a.percentage) {
                return b.percentage - a.percentage;
            }
            return new Date(b.date) - new Date(a.date);
        })
        .slice(0, limit);
}

// Get user's personal best score
function getPersonalBest(userName = null) {
    const data = getStoredData();
    
    if (userName) {
        // Find best score for specific user
        const userScores = data.scores.filter(score => 
            score.name.toLowerCase() === userName.toLowerCase()
        );
        
        if (userScores.length === 0) return null;
        
        return userScores.reduce((best, current) => 
            current.percentage > best.percentage ? current : best
        );
    }
    
    // Return overall personal best
    return data.personalBest;
}

// Get complete score history for a user
function getScoreHistory(userName) {
    if (!userName) return [];
    
    const data = getStoredData();
    const sanitizedUserName = sanitizeInput(userName);
    
    return data.scores
        .filter(score => score.name.toLowerCase() === sanitizedUserName.toLowerCase())
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Clear all stored data (for privacy/reset purposes)
function clearAllData() {
    if (!isLocalStorageAvailable()) {
        console.warn('Cannot clear data: localStorage not available');
        return false;
    }
    
    try {
        localStorage.removeItem(STORAGE_KEY);
        console.log('All quiz data cleared successfully');
        return true;
    } catch (e) {
        console.error('Error clearing quiz data:', e);
        return false;
    }
}

// Get total statistics
function getQuizStatistics() {
    const data = getStoredData();
    const leaderboard = getLeaderboard(5);
    
    return {
        totalAttempts: data.totalAttempts || 0,
        totalUniqueUsers: new Set(data.scores.map(score => score.name.toLowerCase())).size,
        averageScore: data.scores.length > 0 
            ? (data.scores.reduce((sum, score) => sum + score.percentage, 0) / data.scores.length).toFixed(1)
            : 0,
        topScore: leaderboard.length > 0 ? leaderboard[0] : null,
        personalBest: data.personalBest
    };
}

// Quiz state management
let currentQuestionIndex = 0;
let userAnswers = [];
let quizScore = 0;
let nameModalTimeout = null;
let quizCompleted = false;

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

// Modal DOM elements
const nameModal = document.getElementById('name-modal');
const nameForm = document.getElementById('name-form');
const userNameInput = document.getElementById('user-name');
const nameError = document.getElementById('name-error');
const saveScoreBtn = document.getElementById('save-score-btn');
const skipSaveBtn = document.getElementById('skip-save-btn');
const leaderboardModal = document.getElementById('leaderboard-modal');
const leaderboardList = document.getElementById('leaderboard-list');
const personalBestDisplay = document.getElementById('personal-best-display');
const totalAttemptsDisplay = document.getElementById('total-attempts-display');
const closeLeaderboardBtn = document.getElementById('close-leaderboard-btn');
const closeLeaderboardActionBtn = document.getElementById('close-leaderboard-action-btn');
const clearDataBtn = document.getElementById('clear-data-btn');
// Best score display elements
const bestScoreSection = document.getElementById('best-score-section');
const bestScoreName = document.getElementById('best-score-name');
const bestScorePoints = document.getElementById('best-score-points');
const bestScorePercentage = document.getElementById('best-score-percentage');

// Ranking table elements
const rankingTable = document.getElementById('ranking-table');
const rankingTableBody = document.getElementById('ranking-table-body');
const rankingEmpty = document.getElementById('ranking-empty');
const refreshRankingBtn = document.getElementById('refresh-ranking-btn');

// Score history elements
const toggleHistoryBtn = document.getElementById('toggle-history-btn');
const scoreHistoryContent = document.getElementById('score-history-content');
const historySearchInput = document.getElementById('history-search-input');
const scoreHistoryList = document.getElementById('score-history-list');

// Initialize quiz functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
    initializeAnimations();
    initializeModals();
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
    
    // Initialize best score display
    updateBestScoreDisplay();
    
    // Initialize ranking table
    updateRankingTable();
    
    // Refresh ranking button
    if (refreshRankingBtn) {
        refreshRankingBtn.addEventListener('click', updateRankingTable);
    }
}

// Start the quiz
function startQuiz() {
    // Clear any pending timeouts
    if (nameModalTimeout) {
        clearTimeout(nameModalTimeout);
        nameModalTimeout = null;
    }
    
    currentQuestionIndex = 0;
    userAnswers = [];
    quizScore = 0;
    quizCompleted = false;
    
    // Hide any open modals
    hideNameModal();
    hideLeaderboardModal();
    
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
    quizCompleted = true;
    
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
    
    // Clear any existing timeout
    if (nameModalTimeout) {
        clearTimeout(nameModalTimeout);
    }
    
    // Trigger name input modal after a short delay for better UX, only if quiz just completed
    nameModalTimeout = setTimeout(() => {
        if (quizCompleted) {
            showNameModal();
        }
    }, 1500);
}

// Restart the quiz
function restartQuiz() {
    // Clear any pending name modal timeout
    if (nameModalTimeout) {
        clearTimeout(nameModalTimeout);
        nameModalTimeout = null;
    }
    
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = [];
    quizScore = 0;
    quizCompleted = false;
    
    // Hide any open modals
    hideNameModal();
    hideLeaderboardModal();
    
    // Clear any existing feedback messages
    const existingFeedback = document.querySelector('.feedback-message');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Reset button states
    nextQuestionBtn.classList.remove('fade-in');
    
    // Update best score display in case it changed
    updateBestScoreDisplay();
    
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

// ===================================
// MODAL FUNCTIONALITY
// ===================================

// Initialize modal event listeners
function initializeModals() {
    // Name form submission
    if (nameForm) {
        nameForm.addEventListener('submit', handleNameFormSubmit);
    }
    
    // Skip save button
    if (skipSaveBtn) {
        skipSaveBtn.addEventListener('click', handleSkipSave);
    }
    
    // Leaderboard modal controls
    if (closeLeaderboardBtn) {
        closeLeaderboardBtn.addEventListener('click', hideLeaderboardModal);
    }
    
    if (closeLeaderboardActionBtn) {
        closeLeaderboardActionBtn.addEventListener('click', hideLeaderboardModal);
    }
    
    // Clear data button with confirmation
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', handleClearData);
    }
    
    // Close modals on overlay click
    if (nameModal) {
        nameModal.addEventListener('click', function(e) {
            if (e.target === nameModal) {
                hideNameModal();
            }
        });
    }
    
    if (leaderboardModal) {
        leaderboardModal.addEventListener('click', function(e) {
            if (e.target === leaderboardModal) {
                hideLeaderboardModal();
            }
        });
    }
    
    // Close modals on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (nameModal && nameModal.classList.contains('show')) {
                hideNameModal();
            }
            if (leaderboardModal && leaderboardModal.classList.contains('show')) {
                hideLeaderboardModal();
            }
        }
    });
    
    // Input validation
    if (userNameInput) {
        userNameInput.addEventListener('input', validateNameInput);
        userNameInput.addEventListener('blur', validateNameInput);
    }
    
    // Score history functionality
    if (toggleHistoryBtn) {
        toggleHistoryBtn.addEventListener('click', toggleScoreHistory);
    }
    
    if (historySearchInput) {
        historySearchInput.addEventListener('input', filterScoreHistory);
    }
}

// Show name input modal with smooth animations
function showNameModal() {
    if (!nameModal) return;
    
    // Reset form
    if (nameForm) {
        nameForm.reset();
    }
    hideNameError();
    
    // Show modal
    nameModal.style.display = 'flex';
    
    // Trigger animation
    setTimeout(() => {
        nameModal.classList.add('show');
    }, 10);
    
    // Focus on input
    setTimeout(() => {
        if (userNameInput) {
            userNameInput.focus();
        }
    }, 300);
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

// Hide name input modal
function hideNameModal() {
    if (!nameModal) return;
    
    nameModal.classList.remove('show');
    
    setTimeout(() => {
        nameModal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Validate name input with real-time feedback
function validateNameInput() {
    if (!userNameInput) return true;
    
    const name = userNameInput.value.trim();
    
    // Clear previous errors
    hideNameError();
    
    // Check if empty
    if (!name) {
        showNameError('Por favor, escribe tu nombre');
        return false;
    }
    
    // Check length
    if (name.length < 2) {
        showNameError('El nombre debe tener al menos 2 caracteres');
        return false;
    }
    
    if (name.length > 50) {
        showNameError('El nombre no puede tener más de 50 caracteres');
        return false;
    }
    
    // Check for valid characters (letters, numbers, spaces, basic punctuation)
    const validNameRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9\s\-_.]+$/;
    if (!validNameRegex.test(name)) {
        showNameError('El nombre contiene caracteres no válidos');
        return false;
    }
    
    return true;
}

// Show name validation error
function showNameError(message) {
    if (!nameError) return;
    
    nameError.textContent = message;
    nameError.style.display = 'block';
    
    // Add error styling to input
    if (userNameInput) {
        userNameInput.style.borderColor = '#f44336';
    }
}

// Hide name validation error
function hideNameError() {
    if (!nameError) return;
    
    nameError.style.display = 'none';
    
    // Remove error styling from input
    if (userNameInput) {
        userNameInput.style.borderColor = '';
    }
}

// Handle name form submission
function handleNameFormSubmit(e) {
    e.preventDefault();
    
    if (!validateNameInput()) {
        return;
    }
    
    const name = userNameInput.value.trim();
    const percentage = (quizScore / quizData.length) * 100;
    
    // Save score
    const saved = saveScore(name, quizScore, percentage);
    
    if (saved) {
        // Mark quiz as no longer needing name input
        quizCompleted = false;
        
        // Hide name modal
        hideNameModal();
        
        // Show success message
        showTemporaryMessage('¡Puntuación guardada exitosamente! 🎉', 'success');
        
        // Update displays and return to start after a delay
        setTimeout(() => {
            updateBestScoreDisplay();
            updateRankingTable();
            restartQuiz();
        }, 2000);
    } else {
        showNameError('Error al guardar la puntuación. Inténtalo de nuevo.');
    }
}

// Handle skip save action
function handleSkipSave() {
    // Mark quiz as no longer needing name input
    quizCompleted = false;
    
    hideNameModal();
    showTemporaryMessage('Puntuación no guardada', 'info');
    
    // Return to start after a delay
    setTimeout(() => {
        restartQuiz();
    }, 1500);
}

// Show temporary message
function showTemporaryMessage(message, type = 'info') {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `temp-message temp-message-${type}`;
    messageEl.textContent = message;
    
    // Style the message
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        font-weight: 600;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(messageEl);
    
    // Animate in
    setTimeout(() => {
        messageEl.style.opacity = '1';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        messageEl.style.opacity = '0';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}

// Show leaderboard modal
function showLeaderboardModal() {
    if (!leaderboardModal) return;
    
    // Update leaderboard content
    updateLeaderboardDisplay();
    
    // Show modal
    leaderboardModal.style.display = 'flex';
    
    // Trigger animation
    setTimeout(() => {
        leaderboardModal.classList.add('show');
    }, 10);
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

// Hide leaderboard modal
function hideLeaderboardModal() {
    if (!leaderboardModal) return;
    
    leaderboardModal.classList.remove('show');
    
    setTimeout(() => {
        leaderboardModal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Update leaderboard display with current data
function updateLeaderboardDisplay() {
    if (!leaderboardList) return;
    
    const leaderboard = getLeaderboard(5);
    const stats = getQuizStatistics();
    
    // Clear existing content
    leaderboardList.innerHTML = '';
    
    if (leaderboard.length === 0) {
        // Show empty state
        const emptyEl = document.createElement('div');
        emptyEl.className = 'leaderboard-empty';
        emptyEl.innerHTML = 'Aún no hay puntuaciones.<br>¡Sé el primero en completar el quiz!';
        leaderboardList.appendChild(emptyEl);
    } else {
        // Show leaderboard entries
        leaderboard.forEach((entry, index) => {
            const entryEl = createLeaderboardEntry(entry, index + 1);
            leaderboardList.appendChild(entryEl);
        });
    }
    
    // Update statistics
    if (personalBestDisplay) {
        personalBestDisplay.textContent = stats.personalBest 
            ? `${stats.personalBest.percentage}% (${stats.personalBest.score}/${quizData.length})`
            : 'Ninguna';
    }
    
    if (totalAttemptsDisplay) {
        totalAttemptsDisplay.textContent = stats.totalAttempts;
    }
}

// Create leaderboard entry element
function createLeaderboardEntry(entry, rank) {
    const entryEl = document.createElement('div');
    entryEl.className = `leaderboard-entry ${rank === 1 ? 'top-score' : ''}`;
    
    const date = new Date(entry.date);
    const formattedDate = date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    
    entryEl.innerHTML = `
        <div class="leaderboard-rank">${rank}</div>
        <div class="leaderboard-info">
            <div class="leaderboard-name">${escapeHtml(entry.name)}</div>
            <div class="leaderboard-date">${formattedDate}</div>
        </div>
        <div class="leaderboard-score">
            <div class="leaderboard-percentage">${entry.percentage}%</div>
            <div class="leaderboard-points">${entry.score}/${quizData.length}</div>
        </div>
    `;
    
    return entryEl;
}

// Handle clear data confirmation
function handleClearData() {
    const confirmed = confirm(
        '¿Estás seguro de que quieres borrar todos los datos del quiz?\n\n' +
        'Esta acción no se puede deshacer y eliminará:\n' +
        '• Todas las puntuaciones guardadas\n' +
        '• El marcador completo\n' +
        '• Tu mejor puntuación personal'
    );
    
    if (confirmed) {
        const cleared = clearAllData();
        
        if (cleared) {
            showTemporaryMessage('Todos los datos han sido borrados', 'success');
            updateLeaderboardDisplay();
            updateBestScoreDisplay();
            updateRankingTable();
        } else {
            showTemporaryMessage('Error al borrar los datos', 'error');
        }
    }
}

// Update best score display on quiz start screen
function updateBestScoreDisplay() {
    if (!bestScoreSection || !bestScoreName || !bestScorePoints || !bestScorePercentage) return;
    
    const leaderboard = getLeaderboard(1); // Get top score
    
    if (leaderboard.length > 0) {
        const topScore = leaderboard[0];
        // Show best score
        bestScoreName.textContent = topScore.name;
        bestScorePoints.textContent = `${topScore.score}/${quizData.length} puntos`;
        bestScorePercentage.textContent = `${topScore.percentage}%`;
        bestScoreSection.style.display = 'block';
    } else {
        // Hide if no scores yet
        bestScoreSection.style.display = 'none';
    }
}

// Get score message based on percentage
function getScoreMessage(percentage) {
    if (percentage === 100) {
        return '¡Perfecto!';
    } else if (percentage >= 66) {
        return '¡Muy bien!';
    } else if (percentage >= 33) {
        return 'Buen intento';
    } else {
        return 'Sigue practicando';
    }
}

// ===================================
// SCORE HISTORY FUNCTIONALITY
// ===================================

// Toggle score history display
function toggleScoreHistory() {
    if (!scoreHistoryContent || !toggleHistoryBtn) return;
    
    const isVisible = scoreHistoryContent.style.display !== 'none';
    
    if (isVisible) {
        // Hide history
        scoreHistoryContent.style.display = 'none';
        toggleHistoryBtn.textContent = 'Mostrar Historial';
    } else {
        // Show history
        scoreHistoryContent.style.display = 'block';
        toggleHistoryBtn.textContent = 'Ocultar Historial';
        updateScoreHistoryDisplay();
    }
}

// Update score history display
function updateScoreHistoryDisplay(searchTerm = '') {
    if (!scoreHistoryList) return;
    
    const data = getStoredData();
    let allScores = [...data.scores];
    
    // Filter by search term if provided
    if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase().trim();
        allScores = allScores.filter(score => 
            score.name.toLowerCase().includes(term)
        );
    }
    
    // Sort by date (most recent first)
    allScores.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Clear existing content
    scoreHistoryList.innerHTML = '';
    
    if (allScores.length === 0) {
        // Show empty state
        const emptyEl = document.createElement('div');
        emptyEl.className = 'history-empty';
        emptyEl.textContent = searchTerm.trim() 
            ? `No se encontraron resultados para "${searchTerm}"`
            : 'No hay historial de puntuaciones disponible.';
        scoreHistoryList.appendChild(emptyEl);
    } else {
        // Show history entries
        allScores.forEach((entry, index) => {
            const entryEl = createHistoryEntry(entry, index);
            scoreHistoryList.appendChild(entryEl);
        });
    }
}

// Create history entry element
function createHistoryEntry(entry, index) {
    const entryEl = document.createElement('div');
    entryEl.className = 'history-entry';
    
    const date = new Date(entry.date);
    const formattedDate = date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    entryEl.innerHTML = `
        <div class="history-info">
            <div class="history-name">${escapeHtml(entry.name)}</div>
            <div class="history-date">${formattedDate}</div>
        </div>
        <div class="history-score">
            <div class="history-percentage">${entry.percentage}%</div>
            <div class="history-points">${entry.score}/${quizData.length}</div>
        </div>
    `;
    
    return entryEl;
}

// Filter score history based on search input
function filterScoreHistory() {
    if (!historySearchInput) return;
    
    const searchTerm = historySearchInput.value;
    updateScoreHistoryDisplay(searchTerm);
}

// Get user-specific score history with statistics
function getUserScoreHistory(userName) {
    const userScores = getScoreHistory(userName);
    
    if (userScores.length === 0) {
        return {
            scores: [],
            totalAttempts: 0,
            averageScore: 0,
            bestScore: null,
            improvement: null
        };
    }
    
    const totalScore = userScores.reduce((sum, score) => sum + score.percentage, 0);
    const averageScore = (totalScore / userScores.length).toFixed(1);
    const bestScore = userScores.reduce((best, current) => 
        current.percentage > best.percentage ? current : best
    );
    
    // Calculate improvement (compare first and last scores)
    const firstScore = userScores[userScores.length - 1]; // Oldest (last in sorted array)
    const lastScore = userScores[0]; // Most recent (first in sorted array)
    const improvement = userScores.length > 1 
        ? lastScore.percentage - firstScore.percentage 
        : null;
    
    return {
        scores: userScores,
        totalAttempts: userScores.length,
        averageScore: parseFloat(averageScore),
        bestScore,
        improvement
    };
}

// Export user data (for backup purposes)
function exportUserData() {
    const data = getStoredData();
    const exportData = {
        exportDate: new Date().toISOString(),
        schemaVersion: data.schemaVersion,
        totalScores: data.scores.length,
        data: data
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    // Create download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `dia-muertos-quiz-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showTemporaryMessage('Datos exportados exitosamente', 'success');
}

// Import user data (for restore purposes)
function importUserData(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const importData = JSON.parse(e.target.result);
            
            // Validate import data structure
            if (!importData.data || !Array.isArray(importData.data.scores)) {
                throw new Error('Invalid backup file format');
            }
            
            // Confirm import
            const confirmed = confirm(
                `¿Importar datos de respaldo?\n\n` +
                `Fecha de exportación: ${new Date(importData.exportDate).toLocaleDateString('es-ES')}\n` +
                `Total de puntuaciones: ${importData.totalScores}\n\n` +
                `Esto reemplazará todos los datos actuales.`
            );
            
            if (confirmed) {
                // Validate and migrate imported data
                const migratedData = migrateData(importData.data);
                
                // Save imported data
                const saved = saveStoredData(migratedData);
                
                if (saved) {
                    showTemporaryMessage('Datos importados exitosamente', 'success');
                    updateLeaderboardDisplay();
                    updateBestScoreDisplay();
                    if (scoreHistoryContent && scoreHistoryContent.style.display !== 'none') {
                        updateScoreHistoryDisplay();
                    }
                } else {
                    throw new Error('Failed to save imported data');
                }
            }
        } catch (error) {
            console.error('Import error:', error);
            showTemporaryMessage('Error al importar los datos', 'error');
        }
    };
    
    reader.readAsText(file);
}

// ===================================
// RANKING TABLE FUNCTIONALITY
// ===================================

// Update ranking table display
function updateRankingTable() {
    if (!rankingTableBody || !rankingEmpty) return;
    
    const leaderboard = getLeaderboard(10); // Get top 10 scores
    
    // Clear existing content
    rankingTableBody.innerHTML = '';
    
    if (leaderboard.length === 0) {
        // Show empty state
        rankingTable.style.display = 'none';
        rankingEmpty.style.display = 'block';
    } else {
        // Show table with data
        rankingTable.style.display = 'table';
        rankingEmpty.style.display = 'none';
        
        // Populate table rows
        leaderboard.forEach((entry, index) => {
            const row = createRankingRow(entry, index + 1);
            rankingTableBody.appendChild(row);
        });
    }
}

// Create ranking table row
function createRankingRow(entry, position) {
    const row = document.createElement('tr');
    row.className = `rank-${position <= 3 ? position : 'other'}`;
    
    const date = new Date(entry.date);
    const formattedDate = date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });
    
    // Rank position with special styling for top 3
    const rankClass = position <= 3 ? `rank-${position}` : 'rank-other';
    const rankIcon = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : '';
    
    row.innerHTML = `
        <td class="rank-col">
            <div class="rank-position ${rankClass}">
                ${rankIcon || position}
            </div>
        </td>
        <td class="name-col">${escapeHtml(entry.name)}</td>
        <td class="score-col">${entry.score}/${quizData.length}</td>
        <td class="percentage-col">${entry.percentage}%</td>
        <td class="date-col">${formattedDate}</td>
    `;
    
    // Add entrance animation
    row.style.opacity = '0';
    row.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        row.style.transition = 'all 0.3s ease';
        row.style.opacity = '1';
        row.style.transform = 'translateY(0)';
    }, position * 100);
    
    return row;
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}