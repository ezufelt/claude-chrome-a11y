# Claude AI Accessibility Helper

A simple Chrome extension that adds screen reader-friendly headings to Claude AI conversations.

## Features

- Adds invisible "You said" headings before user messages
- Adds invisible "Claude said" headings before Claude's responses
- Headings are only visible to screen readers
- Automatically detects new messages in real-time

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked"
4. Select the `claude-ai-a11y` folder
5. The extension will now be active on claude.ai

## How it works

The extension:
- Detects user messages by finding elements with `data-testid="user-message"`
- Detects Claude messages by finding elements with class `font-claude-message`
- Inserts `<h2>` elements before each message
- Uses CSS to hide these headings visually while keeping them accessible to screen readers

## Testing

To verify the extension is working:
1. Visit claude.ai
2. Use a screen reader (like NVDA, JAWS, or VoiceOver)
3. Navigate through the conversation
4. You should hear "You said" before your messages and "Claude said" before Claude's responses