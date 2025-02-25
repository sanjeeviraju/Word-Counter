// Add event listener for real-time counting
document.getElementById('text-input').addEventListener('input', debounce(countWords, 300));

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

async function countWords() {
    const textInput = document.getElementById('text-input').value;
    const resultElement = document.getElementById('word-count');
    
    try {
        const response = await fetch('/count', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput })
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            resultElement.textContent = data.count;
            resultElement.style.color = 'var(--text-color)';
        } else {
            resultElement.textContent = 'Error';
            resultElement.style.color = '#ff4444';
        }
    } catch (error) {
        resultElement.textContent = 'Error';
        resultElement.style.color = '#ff4444';
        console.error('Error:', error);
    }
}
