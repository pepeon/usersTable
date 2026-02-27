import { useRef } from "react";

export default function ColumnResizer({ onResize }) {
  const startX = useRef(0);
  const startWidth = useRef(0);

  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    startWidth.current = e.target.parentElement.offsetWidth;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const delta = e.clientX - startX.current;
    const newWidth = startWidth.current + delta;

    if (newWidth > 50) {
      onResize(newWidth);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      style={{
        width: "5px",
        cursor: "col-resize",
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
      }}
      onMouseDown={handleMouseDown}
    />
  );
}
