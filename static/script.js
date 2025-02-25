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
            resultElement.style.color = '#333';
        } else {
            resultElement.textContent = 'Error';
            resultElement.style.color = 'red';
        }
    } catch (error) {
        resultElement.textContent = 'Error';
        resultElement.style.color = 'red';
        console.error('Error:', error);
    }
}
