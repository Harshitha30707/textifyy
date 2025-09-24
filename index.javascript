document.addEventListener('DOMContentLoaded', () => {
    const inputTextarea = document.getElementById('inputText');
    const outputTextarea = document.getElementById('outputText');
    const clearTextBtn = document.getElementById('clearTextBtn');
    const convertButtons = document.querySelectorAll('.convert-btn');
    const copyTextBtn = document.getElementById('copyTextBtn');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // --- Theme Toggle ---
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', darkModeToggle.checked);
        localStorage.setItem('darkMode', darkModeToggle.checked);
    });

    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        darkModeToggle.checked = true;
        document.body.classList.add('dark-mode');
    }

    // --- Clear Text Button ---
    clearTextBtn.addEventListener('click', () => {
        inputTextarea.value = '';
        outputTextarea.value = ''; // Also clear output
        inputTextarea.focus(); // Keep focus on input
    });

    // --- Conversion Logic ---
    convertButtons.forEach(button => {
        button.addEventListener('click', () => {
            const originalText = inputTextarea.value;
            let convertedText = '';
            const caseType = button.dataset.case;

            if (!originalText) {
                outputTextarea.value = "Please enter some text to convert.";
                return;
            }

            switch (caseType) {
                case 'uppercase':
                    convertedText = originalText.toUpperCase();
                    break;
                case 'lowercase':
                    convertedText = originalText.toLowerCase();
                    break;
                case 'titlecase':
                    convertedText = toTitleCase(originalText);
                    break;
                case 'sentencecase':
                    convertedText = toSentenceCase(originalText);
                    break;
                case 'kebabcase':
                    convertedText = toKebabCase(originalText);
                    break;
                case 'snakecase':
                    convertedText = toSnakeCase(originalText);
                    break;
                case 'pascalcase':
                    convertedText = toPascalCase(originalText);
                    break;
                case 'camelcase':
                    convertedText = toCamelCase(originalText);
                    break;
                case 'inversecase':
                    convertedText = toInverseCase(originalText);
                    break;
                case 'wordcount':
                    convertedText = `Word Count: ${countWords(originalText)}`;
                    break;
                case 'charcount':
                    convertedText = `Character Count: ${countCharacters(originalText)}`;
                    break;
                default:
                    convertedText = "Error: Unknown conversion type.";
            }
            outputTextarea.value = convertedText;
        });
    });

    // --- Copy to Clipboard ---
    copyTextBtn.addEventListener('click', async () => {
        if (outputTextarea.value) {
            try {
                await navigator.clipboard.writeText(outputTextarea.value);
                alert('Text copied to clipboard!'); // Or a more subtle toast notification
            } catch (err) {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy text. Please try manually.');
            }
        } else {
            alert('No text to copy!');
        }
    });

    // --- Helper Functions for Case Conversion ---

    function toTitleCase(str) {
        return str.toLowerCase().split(' ').map(word => {
            if (word.length === 0) return '';
            // Exclude small words from capitalization, except if it's the first word
            const smallWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'];
            if (smallWords.includes(word) && str.indexOf(word) !== 0) {
                return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }

    function toSentenceCase(str) {
        return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, function(c) {
            return c.toUpperCase();
        });
    }

    function toKebabCase(str) {
        return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
                   .toLowerCase()
                   .replace(/[^a-z0-9-]+/g, '-') // Remove non-alphanumeric except hyphen
                   .replace(/^-+|-+$/g, ''); // Trim hyphens from start/end
    }

    function toSnakeCase(str) {
        return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1_$2')
                   .toLowerCase()
                   .replace(/[^a-z0-9_]+/g, '_') // Remove non-alphanumeric except underscore
                   .replace(/^_+|_+$/g, ''); // Trim underscores from start/end
    }

    function toPascalCase(str) {
        return str.replace(/[^a-zA-Z0-9]/g, ' ') // Replace non-alphanumeric with spaces
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join('');
    }

    function toCamelCase(str) {
        let pascal = toPascalCase(str);
        return pascal.charAt(0).toLowerCase() + pascal.slice(1);
    }

    function toInverseCase(str) {
        return str.split('').map(char => {
            if (char === char.toUpperCase()) {
                return char.toLowerCase();
            } else {
                return char.toUpperCase();
            }
        }).join('');
    }

    function countWords(str) {
        const matches = str.match(/\b\w+\b/g);
        return matches ? matches.length : 0;
    }

    function countCharacters(str) {
        return str.length;
    }
});
