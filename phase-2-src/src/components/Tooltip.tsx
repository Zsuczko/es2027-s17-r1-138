import { useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  label?: React.ReactNode;
}

export default function Tooltip({ text, children, label }: TooltipProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useLayoutEffect(() => {
    if (visible && ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, [visible]);

  return (
    <>
      <span
        ref={ref}
        className="inline-block"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </span>

      {visible &&
        rect &&
        createPortal(
          <div
            className="flex flex-col"
            style={{
              position: "fixed",
              top: rect.top - 6,
              left: rect.left + rect.width / 2,
              transform: "translate(-50%, -100%)",
              background: "#f3f4f6",
              borderRadius: "1em",
              padding: "0.6em 1em",
              fontSize: "0.8em",
              whiteSpace: "nowrap",
              zIndex: 999999,
              pointerEvents: "none",
            }}
          >
            {text}
            {label}
          </div>,
          document.body,
        )}
    </>
  );
}
