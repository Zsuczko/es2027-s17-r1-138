import React, { useState } from "react";

interface TooltipProps {
  text: string;
  label?: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, label }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <>
          <div
            className="bg-gray-100 rounded-2xl"
            style={{
              position: "absolute",
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginBottom: "0.3em",
              padding: "0.3em 0.5em",
              whiteSpace: "nowrap",
              zIndex: 1000,
            }}
          >
            {text}
            {/* {label} */}
          </div>
        </>
      )}
    </div>
  );
};

export default Tooltip;
