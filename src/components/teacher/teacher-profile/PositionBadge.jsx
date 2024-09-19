// PositionBadge.jsx
import React from "react";

function PositionBadge({ position }) {
  // Function to determine badge style based on position
  const getBadgeStyle = (position) => {
    switch (position.toLowerCase()) {
      case "hod":
        return { backgroundColor: "gold", color: "black" };
      case "teacher":
        return { backgroundColor: "#3498db", color: "white" };
      case "librarian":
        return { backgroundColor: "#2ecc71", color: "white" };
      case "accountant":
        return { backgroundColor: "#f1c40f", color: "black" };
      case "receptionist":
        return { backgroundColor: "#e74c3c", color: "white" };
      case "principal":
        return { backgroundColor: "#9b59b6", color: "white" };
      case "vice principal":
        return { backgroundColor: "#34495e", color: "white" };
      case "head teacher":
        return { backgroundColor: "#d35400", color: "white" };
      case "secretary":
        return { backgroundColor: "#7f8c8d", color: "white" };
      case "pti":
        return { backgroundColor: "#27ae60", color: "white" };
      default:
        return {}; // Default badge style
    }
  };

  // Get badge style based on position
  const badgeStyle = getBadgeStyle(position);

  // Render the badge with the determined style
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "14px",
        fontWeight: "bold",
        ...badgeStyle,
      }}
    >
      {position}
    </span>
  );
}

export default PositionBadge;
