import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, perfisPermitidos }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Não está logado → volta pro login
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  // Perfil não autorizado → volta pro dashboard
  if (
    perfisPermitidos &&
    !perfisPermitidos.includes(usuario.perfil)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  // Acesso liberado
  return children;
}
