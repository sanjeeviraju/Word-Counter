from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def count_words(text):
    """
    Count words in the given text with enhanced error handling and processing.
    
    Args:
        text (str): Input text to process
        
    Returns:
        int: Number of words in the text
    """
    # Handle empty or whitespace-only input
    if not text or text.isspace():
        return 0
        
    # Remove extra whitespace and split into words
    words = text.strip().split()
    
    # Filter out empty strings and pure punctuation
    words = [word for word in words if any(c.isalnum() for c in word)]
    
    return len(words)

@app.route('/')
def home():
    """Render the main page of the application."""
    return render_template('index.html')

@app.route('/count', methods=['POST'])
def count():
    """
    Handle word counting requests from the frontend.
    Returns JSON response with word count.
    """
    try:
        text = request.json.get('text', '')
        word_count = count_words(text)
        return jsonify({
            'count': word_count,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 400

if __name__ == '__main__':
    app.run(debug=True)
