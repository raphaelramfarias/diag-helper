import { logsService } from "../services/dataServices";

export function salvaLogs(acao, tipo = "GERAL") {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  logsService
    .create(usuario?.nome || "Desconhecido", acao, tipo)
    .then(() => console.log("Log salvo:", { acao, tipo }))
    .catch((err) => console.error("Erro ao salvar log:", err));
}
