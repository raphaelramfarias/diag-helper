// // import jsPDF from "jspdf";
// // import "jspdf-autotable";

// // export const gerarLaudoPDF = (exame) => {
// //   const doc = new jsPDF();
// //   const pageWidth = doc.internal.pageSize.getWidth();
// //   const usuarioLogado = localStorage.getItem("usuarioNome") || "Profissional Responsável";
// //   const instituicao = localStorage.getItem("usuarioInstituicao") || "DiagHelper Clinic";

// //   // Cabeçalho
// //   doc.setFontSize(18);
// //   doc.text("DiagHelper — Laudo Médico", 14, 20);
// //   doc.setFontSize(10);
// //   doc.text(`Emissão: ${new Date().toLocaleDateString("pt-BR")}`, 14, 28);
// //   doc.line(14, 32, pageWidth - 14, 32);

// //   // Tabela de Dados
// //   doc.autoTable({
// //     startY: 40,
// //     head: [['Identificação', 'Detalhes']],
// //     body: [
// //       ['Paciente', exame.pacienteNome],
// //       ['Exame', exame.tipo],
// //       ['Data Original', new Date(exame.data).toLocaleDateString("pt-BR")],
// //       ['Resultado IA', exame.resultadoIA || "Não analisado"],
// //       ['Parecer', exame.decisaoProfissional === 'aceito' ? 'Confirmado' : 'Divergente'],
// //     ],
// //     theme: 'grid',
// //     headStyles: { fillColor: [41, 128, 185] }
// //   });

// //   // Observações
// //   const finalY = doc.lastAutoTable.finalY + 15;
// //   doc.setFont("helvetica", "bold");
// //   doc.text("Observações do Especialista:", 14, finalY);
// //   doc.setFont("helvetica", "normal");
// //   const obs = doc.splitTextToSize(exame.observacoesMedico || "Sem observações.", pageWidth - 28);
// //   doc.text(obs, 14, finalY + 7);

// //   // Assinatura
// //   const footerY = 270;
// //   doc.line(60, footerY, pageWidth - 60, footerY);
// //   doc.text(usuarioLogado, pageWidth / 2, footerY + 7, { align: "center" });
// //   doc.setFontSize(8);
// //   doc.text(instituicao, pageWidth / 2, footerY + 12, { align: "center" });

// //   doc.save(`Laudo_${exame.pacienteNome.replace(/\s+/g, '_')}.pdf`);
// // };

// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export const gerarLaudoPDF = (exame) => {
//   if (!exame) return;

//   const doc = new jsPDF();

//   // Garante que o nome exista
//   const nome = exame.pacienteNome || "Paciente não identificado";
  
//   // Tratamento de data flexível
//   let dataExibicao = "---";
//   if (exame.data) {
//     // Se a data já estiver formatada com - ou /
//     const partes = exame.data.includes("-") ? exame.data.split("-") : exame.data.split("/");
//     if (partes.length === 3) {
//       // Se o primeiro item tiver 4 dígitos, é ano-mes-dia, senão assume-se dia-mes-ano
//       dataExibicao = partes[0].length === 4 
//         ? `${partes[2]}/${partes[1]}/${partes[0]}` 
//         : `${partes[0]}/${partes[1]}/${partes[2]}`;
//     }
//   }

//   // Título
//   doc.setFontSize(18);
//   doc.setTextColor(40);
//   doc.text("LAUDO DE EXAME DIAGNÓSTICO", 14, 22);
  
//   // Linha decorativa
//   doc.setLineWidth(0.5);
//   doc.line(14, 25, 196, 25);

//   // Tabela de Dados
//   autoTable(doc, {
//     startY: 35,
//     theme: 'striped',
//     headStyles: { fillColor: [41, 128, 185] },
//     head: [['Informação', 'Detalhes']],
//     body: [
//       ['Paciente', nome.toUpperCase()],
//       ['Tipo de Exame', exame.tipo || "Não informado"],
//       ['Data de Realização', dataExibicao],
//       ['Resultado', exame.resultado || "Em análise"],
//       ['Observações', exame.observacoes || "Nenhuma observação técnica."],
//     ],
//   });

//   // Nome do arquivo limpo: Laudo_Nome_Paciente.pdf
//   const nomeArquivo = nome.split(' ')[0].replace(/[^a-z0-0]/gi, '_');
//   doc.save(`Laudo_${nomeArquivo}.pdf`);
// };

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const gerarLaudoPDF = (exame) => {
  // 1. Verificação de segurança
  if (!exame) {
    alert("Erro: Dados do exame não encontrados para gerar o PDF.");
    return;
  }

  const doc = new jsPDF();
  const nome = exame.pacienteNome || "Paciente não identificado";
  
  // Título e Estilização
  doc.setFontSize(18);
  doc.setTextColor(41, 128, 185);
  doc.text("LAUDO MÉDICO FINAL - DIAG HELPER", 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Data de Emissão: ${new Date().toLocaleDateString("pt-BR")}`, 14, 28);
  doc.line(14, 30, 196, 30);

  // Tabela de Dados do Paciente e Exame
  autoTable(doc, {
    startY: 35,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    head: [['Informação', 'Detalhes']],
    body: [
      ['Paciente', nome.toUpperCase()],
      ['Tipo de Exame', exame.tipo || "Não informado"],
      ['Data do Exame', exame.data || "---"],
      ['Status', "ANALISADO"],
    ],
  });

  // Seção de Análise Técnica
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("PARECER TÉCNICO E ANÁLISE", 14, finalY);

  autoTable(doc, {
    startY: finalY + 5,
    theme: 'striped',
    body: [
      ['Resultado da IA', exame.resultadoIA || "Não analisado pela IA"],
      ['Decisão Profissional', exame.decisaoProfissional === 'aceito' ? "ACEITO" : "DIVERGENTE"],
      ['Observações', exame.observacoesMedico || "Sem observações adicionais."]
    ],
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 40 },
      1: { cellWidth: 'auto' }
    }
  });

  // Assinatura
  const footerY = doc.lastAutoTable.finalY + 20;
  doc.setFont("courier", "italic");
  doc.text("__________________________________________", 14, footerY);
  // Usa o campo assinadoPor se existir, senão usa o localStorage
  const assinante = exame.assinadoPor || localStorage.getItem("usuarioNome") || "Profissional Responsável";
  doc.text(assinante, 14, footerY + 7);

  // 2. Download do arquivo com verificação de ID
  const nomeArquivo = nome.split(' ')[0].replace(/[^a-z0-9]/gi, '_');
  // Se o id não existir, usamos um timestamp para não quebrar o código
  const idSufixo = exame.id ? String(exame.id).substring(0, 5) : Date.now();
  
  doc.save(`Laudo_${nomeArquivo}_${idSufixo}.pdf`);
};