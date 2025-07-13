// Claude AI Accessibility Helper - Content Script

// Function to create an accessible heading
function createAccessibleHeading(text) {
  const heading = document.createElement('h2');
  heading.textContent = text;
  heading.className = 'claude-a11y-heading';
  heading.setAttribute('aria-label', text);
  return heading;
}

// Function to add heading to a message element
function addHeadingToMessage(messageElement, isUser) {
  // Check if we've already added a heading
  if (messageElement.previousElementSibling?.classList.contains('claude-a11y-heading')) {
    return;
  }

  const headingText = isUser ? 'You said' : 'Claude said';
  const heading = createAccessibleHeading(headingText);
  
  // Insert heading before the message
  messageElement.parentNode.insertBefore(heading, messageElement);
}

// Function to process all messages on the page
function processMessages() {
  // Find user messages
  const userMessages = document.querySelectorAll('[data-testid="user-message"]');
  userMessages.forEach(msg => {
    // Find the parent container that holds the entire message
    const messageContainer = msg.closest('.group');
    if (messageContainer) {
      addHeadingToMessage(messageContainer, true);
    }
  });

  // Find Claude messages
  const claudeMessages = document.querySelectorAll('.font-claude-message');
  claudeMessages.forEach(msg => {
    // Find the parent container that holds the entire message
    const messageContainer = msg.closest('.group');
    if (messageContainer) {
      addHeadingToMessage(messageContainer, false);
    }
  });
}

// Initial processing
processMessages();

// Set up MutationObserver to watch for new messages
const observer = new MutationObserver((mutations) => {
  // Use a debounce to avoid processing too frequently
  clearTimeout(observer.timeout);
  observer.timeout = setTimeout(() => {
    processMessages();
  }, 100);
});

// Start observing the document for changes
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Also process on navigation changes (for single-page app behavior)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(processMessages, 500);
  }
}).observe(document, { subtree: true, childList: true });

// Add global event handler for Shift+ESC to focus chat box
document.addEventListener('keydown', (event) => {
  if (event.shiftKey && event.key === 'Escape') {
    // Find the chat input box using multiple selectors for robustness
    const chatInput = document.querySelector('.ProseMirror[role="textbox"]') || 
                     document.querySelector('.ProseMirror[contenteditable="true"]') ||
                     document.querySelector('[contenteditable="true"][role="textbox"]');
    
    if (chatInput && document.activeElement !== chatInput) {
      event.preventDefault();
      chatInput.focus();
      
      // Move cursor to the end of the content
      const selection = window.getSelection();
      const range = document.createRange();
      
      // Select all content and collapse to end
      range.selectNodeContents(chatInput);
      range.collapse(false);
      
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
});