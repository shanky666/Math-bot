// JavaScript
const chatOutput = document.getElementById('chat-output');
const userMessageInput = document.getElementById('user-message');

const history = []; // store user messages

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');

  // Style based on sender
  if (sender === 'You') {
    messageElement.classList.add('user-message');
  }

  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatOutput.appendChild(messageElement);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

function sendMessage() {
  const userMessage = userMessageInput.value.trim();

  if (userMessage === '') {
    appendMessage('Bot', 'Please enter a math expression.');
    return;
  }

  appendMessage('You', userMessage);
  history.push(userMessage);
  userMessageInput.value = '';

  try {
    let result = math.evaluate(userMessage);

    // Round float values
    if (typeof result === 'number' && result % 1 !== 0) {
      result = result.toFixed(2);
    }

    appendMessage('Bot', result);
  } catch (error) {
    let errorMessage = 'Bot: Unable to evaluate the expression.';

    if (error instanceof SyntaxError) {
      errorMessage = 'Bot: Invalid expression. Please check your input.';
    } else if (error instanceof TypeError) {
      errorMessage = 'Bot: Invalid math operation. Please check your input.';
    } else if (error && error.message) {
      errorMessage = `Bot: ${error.message}`;
    }

    appendMessage('Bot', errorMessage);
  }
}

// Enable Enter key to send
userMessageInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});
