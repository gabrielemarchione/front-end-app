import React from "react";

const BackToTop = () => {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="back-to-top"
      aria-label="Torna su"
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};

export default BackToTop;
