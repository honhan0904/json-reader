# JSON Editor

A lightweight, web-based JSON editing tool built with React and Tailwind CSS, featuring a tree view interface, modal-based editing with full-screen blur, and a responsive design for managing JSON data efficiently.

## Features

- **Tree View Interface**: Visualize JSON as a collapsible tree with folder (`📁`) and item (`📄`) icons.
- **Modal-Based Editing**: Edit nodes via responsive modals (max-width: 36rem, min-width: 24rem) that appear above a full-screen blur effect (`filter: blur(4px)`).
- **Full-Screen Blur**: Background blurs during editing or adding nodes, with `pointer-events: none` to focus on the modal.
- **Add/Delete Nodes**: Bright cyan `➕` button for adding nodes/folders and `🗑️` for deleting nodes.
- **Responsive Design**: Adapts to mobile screens (sidebar stacks, modals adjust to 95% width at max-width: 640px).
- **File Upload/Export**: Upload JSON files and export modified JSON with one click.
- **Dark Theme**: Dark gray background (`#1f2937`), indigo sidebar gradient (`#1e3a8a` to `#1e40af`), and alternating node colors (`#2d3748`, `#374151`).
- **Error Handling**: Displays errors for invalid JSON and includes a fallback UI for rendering failures.
- **Maintainable Code**: Detailed comments and debugging logs for easy maintenance.

## Demo

Open `index.html` in a browser with internet access to try the editor. Upload a sample JSON file like:

```json
[
    {
        "title": "Folder",
        "icon": "📁",
        "isFolder": true,
        "children": [
            {
                "title": "Item",
                "icon": "📄",
                "href": "https://example.com",
                "description": "Test item"
            }
        ]
    }
]
```

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/json-editor.git
   ```
2. **Serve the Project**: Open `index.html` directly in a browser or use a local server:
   ```bash
   npx serve
   ```
3. **Dependencies**: No installation required; uses CDNs for:
   - React (`18.2.0`)
   - ReactDOM (`18.2.0`)
   - Babel (`7.20.6`)
   - Tailwind CSS
   - Poppins font

## Usage

1. **Upload JSON**: Use the sidebar’s file input to load a JSON file (must be a valid array).
2. **Edit Nodes**: Click `✏️` to open the edit modal, update fields, and click "Update" or "Cancel".
3. **Add Nodes**: Click the cyan `➕` to add a child node or folder via a modal.
4. **Delete Nodes**: Click `🗑️` to remove a node.
5. **Export JSON**: Click "Export JSON" to download the modified file.
6. **Test Responsiveness**: Resize the browser or use mobile view to check sidebar and modal behavior.

## Screenshots

- **Main Interface**: Sidebar and tree view with blue borders (`#3b82f6`) and alternating node colors.
- **Edit Modal**: Modal above blurred background with input fields.
- **Mobile View**: Stacked sidebar and responsive modals.

## Contributing

1. Fork the repository.
2. Create a branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## Issues

Report issues at `https://github.com/your-username/json-editor/issues`. Include:
- Browser and version.
- Console errors (F12, Console tab).
- Steps to reproduce (e.g., blank screen, modal issues).

Common fixes:
- **Blank Screen**: Check internet for CDNs, clear cache (Ctrl+Shift+R), verify JSON is a valid array.
- **Modal Issues**: Ensure modals render in `#modal-root` (check DOM), confirm `z-index: 1000`.

## License

MIT License. See `LICENSE` for details.

## Acknowledgments

- Inspired by `josdejong/jsoneditor` for tree-based JSON editing.
- Built with React, Tailwind CSS, and Babel for a modern UI.