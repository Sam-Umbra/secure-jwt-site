import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const originValidation =
    document.referrer &&
    new URL(document.referrer).origin === window.location.origin;

  function returnToOrigin() {
    if (originValidation) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--secundary-color)", // branco
      }}
    >
      <div
        style={{
          color: "var(--primary-color)", // texto escuro
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          padding: "2rem 3rem",
          borderRadius: "12px",
          backgroundColor: "var(--secundary-color)",
          boxShadow: "0 0 20px rgb(0, 0, 0)"
        }}
      >
        <h1 style={{ fontSize: "3rem", margin: 0 }}>404 - Not Found</h1>
        <button
          onClick={returnToOrigin}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: "var(--primary-golden)",
            color: "var(--primary-black)",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "var(--terciary-golden)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "var(--primary-golden)";
          }}
        >
          {originValidation ? "Voltar à Página Anterior" : "Ir para a Home"}
        </button>
      </div>
    </div>
  );
}
