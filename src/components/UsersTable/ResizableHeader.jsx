import { useRef } from "react";

export default function ResizableHeader({ width, onResize, children }) {
  const startX = useRef(0);
  const startWidth = useRef(0);

  function handleMouse(e) {
    startX.current = e.clientX;
    startWidth.current = width;

    function handleMouseMove(e) {
      const delta = e.clientX - startX.current;
      const newWidth = Math.max(50, startWidth.current + delta);
      onResize(newWidth);
    }

    function handleMouseUp() {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  return (
    <th style={{ width, position: "relative" }}>
      {children}

      <div
        onMouseDown={handleMouse}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 6,
          cursor: "col-resize",
          userSelect: "none",
        }}
      />
    </th>
  );
}
