---

# Drag-and-Drop React Native Code Generator

This project allows users to create a React Native UI layout using a drag-and-drop interface. Users can drag elements (e.g., buttons, text boxes) onto a canvas, reposition them, modify their properties, and export the generated layout as React Native code or an image.

## Features

- **Drag-and-Drop**: Drag UI elements (e.g., Button, Text Box) into the canvas.
- **Repositioning**: Move items freely within the canvas.
- **Properties Panel**: Customize each item's color, size, and position.
- **Export Features**:
  - **React Native Code**: Generate the React Native JSX code for the layout.
  - **Image Export**: Export the canvas as a `.png` image.
- **Delete Items**: Remove items from the canvas.
- **Keyboard Shortcuts**:
  - `Arrow Keys`: Move the selected item.
  - `Delete`: Remove the selected item.

## Technologies Used

- **React**: For building the UI.
- **React DnD**: For drag-and-drop functionality.
- **UUID**: For generating unique IDs for items.
- **HTML-to-Image**: For exporting the canvas as an image.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/oneananda/react-native-code-generator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd react-native-code-generator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### How to Use

1. Drag elements (e.g., **Button**, **Text Box**) from the toolbar into the canvas.
2. Click an item to select it. The **Properties Panel** on the right will display customization options.
3. Adjust the item's **color**, **background color**, **width**, and **height** using the properties panel.
4. Reposition items by dragging them within the canvas.
5. Export your layout:
   - **React Native Code**: Copy the generated code from the bottom panel.
   - **Canvas Image**: Click the **Export Canvas** button to download the layout as a `.png` image.

### Keyboard Shortcuts

| Key         | Action                      |
|-------------|-----------------------------|
| `Arrow Keys`| Move the selected item.     |
| `Delete`    | Delete the selected item.   |

## Project Structure

```
src/
├── components/
│   ├── DraggableElement.js    # Draggable toolbar items (e.g., Button, Text Box)
│   ├── DropZone.js            # Canvas where items are dropped and repositioned
├── App.js                     # Main application logic
├── index.js                   # React entry point
```

## Dependencies

- **react**: `^18.2.0`
- **react-dnd**: `^16.0.1`
- **react-dnd-html5-backend**: `^16.0.1`
- **uuid**: `^9.0.0`
- **html-to-image**: `^1.10.6`

## Future Enhancements

- **Undo/Redo**: Add functionality to revert or redo changes.
- **Resizable Elements**: Enable users to resize elements directly on the canvas.
- **Snap to Grid**: Enhance alignment by snapping items to a grid layout.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or feedback, feel free to reach out!

---
