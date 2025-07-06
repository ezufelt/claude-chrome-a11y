# Claude AI Accessibility Helper

A simple Chrome extension that adds screen reader-friendly headings to Claude AI conversations.

## Features

- Adds invisible "You said" headings before user messages
- Adds invisible "Claude said" headings before Claude's responses
- Headings are only visible to screen readers
- Automatically detects new messages in real-time

## Installation

1. Clone the repository: git@github.com:ezufelt/claude-chrome-a11y
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the folder you cloned from GItHub
6. The extension will now be active on claude.ai

## How it works

The extension:
- Detects user messages by finding elements with `data-testid="user-message"`
- Detects Claude messages by finding elements with class `font-claude-message`
- Inserts `<h2>` elements before each message
- Uses CSS to hide these headings visually while keeping them accessible to screen readers
