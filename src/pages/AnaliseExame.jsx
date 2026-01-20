// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import PageWrapper from "../components/PageWrapper";
// import api from "../services/api";
// import { MdAnalytics, MdPictureAsPdf, MdAssignmentTurnedIn } from "react-icons/md";
// import { registrarLog } from "../services/auditService";

// export default function AnaliseExame() {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [exame, setExame] = useState(null);
//   const [analiseIA, setAnaliseIA] = useState("");
//   const [carregandoIA, setCarregandoIA] = useState(false);
//   const [decisao, setDecisao] = useState(""); // "aceito" ou "nao_aceito"
//   const [observacoes, setObservacoes] = useState("");

//   // Puxa o nome do usuário logado para a assinatura
//   const usuarioLogado = localStorage.getItem("usuarioNome") || "Profissional Responsável";

//   useEffect(() => {
//     api.get(`/exames/${id}`).then((res) => setExame(res));
//   }, [id]);

  


//   // Simulação da API de Análise que você enviou no HTML
//   const executarAnaliseIA = () => {
//     setCarregandoIA(true);
//     // Simulando delay da IA
//     setTimeout(() => {
//       const resultadosSimulados = [
//         "Amostra compatível com padrão de normalidade tecidual.",
//         "Detectada presença de infiltrado inflamatório moderado.",
//         "Sugestão de correlação clínica para descartar processo infeccioso.",
//       ];
//       const resultadoAleatorio = resultadosSimulados[Math.floor(Math.random() * resultadosSimulados.length)];
//       setAnaliseIA(resultadoAleatorio);
//       setCarregandoIA(false);
//     }, 2000);
//   };

//   const salvarLaudoFinal = async () => {
//     const laudoPronto = {
//       ...exame,
//       analisado: true,
//       resultadoIA: analiseIA,
//       decisaoProfissional: decisao,
//       observacoesMedico: observacoes,
//       assinadoPor: usuarioLogado,
//       dataFinalizacao: new Date().toISOString()
//     };

//     await api.put(`/exames/${id}`, laudoPronto);
//     await registrarLog(usuarioLogado, `Finalizou laudo do exame ${id}`, "LAUDO");
    
//     alert("Laudo salvo com sucesso!");
//     navigate("/laudos");
//   };

//   if (!exame) return <p>Carregando dados do exame...</p>;

//   return (
//     <PageWrapper title={`Análise de Exame - ${exame.pacienteNome}`}>
//       <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
        
//         {/* LADO ESQUERDO: VISUALIZADOR (Baseado no seu HTML) */}
//         <div className="bg-white p-6 rounded-2xl shadow border border-slate-200">
//           <h2 className="font-bold flex items-center gap-2 mb-4"><MdAnalytics /> Amostra / Arquivo</h2>
//           <div className="bg-slate-100 rounded-xl h-64 flex items-center justify-center border-2 border-dashed border-slate-300 overflow-hidden">
//              {/* Se for imagem, renderiza. Se não, mostra o nome do arquivo */}
//              {exame.arquivo?.match(/\.(jpg|jpeg|png|gif)$/i) ? (
//                <img src={`/caminho/para/arquivos/${exame.arquivo}`} alt="Exame" className="h-full object-contain" />
//              ) : (
//                <div className="text-center p-4">
//                  <MdPictureAsPdf size={48} className="mx-auto text-red-400" />
//                  <p className="text-sm mt-2 text-slate-600">{exame.arquivo || "Arquivo não anexado"}</p>
//                </div>
//              )}
//           </div>
//           <div className="mt-4 space-y-2 text-sm">
//             <p><strong>Paciente:</strong> {exame.pacienteNome}</p>
//             <p><strong>Tipo:</strong> {exame.tipo}</p>
//           </div>
          
//           <button 
//             onClick={executarAnaliseIA}
//             disabled={carregandoIA || analiseIA}
//             className="w-full mt-6 bg-secondary text-white py-3 rounded-xl hover:opacity-90 disabled:bg-slate-300"
//           >
//             {carregandoIA ? "IA Analisando..." : "Analisar por IA"}
//           </button>
//         </div>

//         {/* LADO DIREITO: RESULTADO E FORMULÁRIO FINAL */}
//         <div className="bg-white p-6 rounded-2xl shadow border border-slate-200 space-y-4">
//           <h2 className="font-bold flex items-center gap-2"><MdAssignmentTurnedIn /> Parecer Técnico</h2>
          
//           {analiseIA && (
//             <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
//               <h3 className="text-blue-800 font-semibold text-sm mb-1">Resultado da IA:</h3>
//               <p className="text-slate-700 italic">"{analiseIA}"</p>
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium mb-1">Decisão sobre a análise:</label>
//             <select 
//               value={decisao} 
//               onChange={(e) => setDecisao(e.target.value)}
//               className="w-full border p-3 rounded-xl bg-slate-50"
//             >
//               <option value="">Selecione...</option>
//               <option value="aceito">Aceito o resultado</option>
//               <option value="nao_aceito">Não aceito / Divergente</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Observações Adicionais:</label>
//             <textarea 
//               value={observacoes}
//               onChange={(e) => setObservacoes(e.target.value)}
//               className="w-full border p-3 rounded-xl h-24"
//               placeholder="Digite aqui suas considerações..."
//             />
//           </div>

//           <div className="pt-4 border-t border-dashed">
//             <p className="text-xs text-slate-500 uppercase font-bold">Assinatura Digital</p>
//             <p className="text-lg font-serif italic text-slate-800">{usuarioLogado}</p>
//           </div>

//           <button 
//             onClick={salvarLaudoFinal}
//             disabled={!decisao}
//             className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-slate-300"
//           >
//             <MdPictureAsPdf /> Gerar e Salvar Laudo PDF
//           </button>
//         </div>
//       </div>
//     </PageWrapper>
//   );
// }
// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import PageWrapper from "../components/PageWrapper";
// import { 
//   MdAutoAwesome, 
//   MdCheck, 
//   MdClose, 
//   MdPictureAsPdf, 
//   MdPerson, 
//   MdArrowBack 
// } from "react-icons/md";
// import { jsPDF } from "jspdf"; 
// import api from "../services/api";

// export default function AnaliseExame() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const exame = state?.exame;
  
//   const [analisando, setAnalisando] = useState(true);
//   const [resultadoIA, setResultadoIA] = useState("");
//   const [aceito, setAceito] = useState(null); 
//   const [observacoes, setObservacoes] = useState("");
//   const usuarioLogado = localStorage.getItem("usuarioNome") || "Médico Responsável";

//   useEffect(() => {
//     setTimeout(() => {
//       setResultadoIA("A análise preliminar via IA sugere padrões de normalidade nos tecidos observados, com leve desvio nos índices hematológicos. Recomenda-se correlação clínica.");
//       setAnalisando(false);
//     }, 2000);
//   }, []);

//   const finalizarLaudo = async () => {
//     try {
//       const doc = new jsPDF();
//       const larguraPagina = doc.internal.pageSize.getWidth();
//       const margem = 20;

//       // --- 1. CABEÇALHO ---
//       doc.setFontSize(14);
//       doc.setTextColor(40);
//       doc.text(`DiagHelper — ${exame.instituicao || ""}`, margem, 20);
      
//       doc.setFontSize(9);
//       doc.setTextColor(100);
//       doc.text("Endereço institucional", margem, 25);

//       doc.text(`Profissional: ${usuarioLogado}`, larguraPagina - 70, 15);
//       doc.text(`Registro: ${exame.registroId || "1234"}`, larguraPagina - 70, 20);
//       doc.text(`Instituição: ${exame.instituicao || "agamenon"}`, larguraPagina - 70, 25);
//       doc.text(`Data: ${new Date().toLocaleString()}`, larguraPagina - 70, 30);

//       doc.setDrawColor(220);
//       doc.line(margem, 35, larguraPagina - margem, 35);

//       // --- 2. DADOS DA AMOSTRA ---
//       doc.setFontSize(11);
//       doc.setTextColor(40, 40, 100);
//       doc.text("Dados da amostra", margem, 45);

//       doc.setFontSize(9);
//       doc.setTextColor(40);
//       doc.text(`Código da imagem: HP-001`, margem, 55);
//       doc.text(`Descrição: ${exame.tipo}`, larguraPagina - 80, 55);

//       doc.setFont("helvetica", "bold");
//       doc.text("Resultado automatizado (IA):", margem, 65);
//       doc.setFont("helvetica", "normal");
//       doc.text(resultadoIA, margem, 70, { maxWidth: 170 });

//       // --- 3. INCLUSÃO DAS IMAGENS ANEXADAS ---
//       let yPos = 85;
//       doc.setFont("helvetica", "bold");
//       doc.text("Imagem analisada", margem, yPos);
//       yPos += 5;

//       if (exame.arquivos && exame.arquivos.length > 0) {
//         const imgData = exame.arquivos[0]; 
//         doc.setDrawColor(240);
//         doc.setFillColor(248, 249, 255);
//         doc.roundedRect(margem, yPos, larguraPagina - (margem * 2), 100, 3, 3, "FD");
//         doc.addImage(imgData, "JPEG", margem + 10, yPos + 5, larguraPagina - (margem * 2) - 20, 90);
//         yPos += 110;
//       }

//       // --- 4. RESUMO INTERPRETATIVO ---
//       doc.setFontSize(11);
//       doc.setTextColor(40, 40, 100);
//       doc.text("Resumo interpretativo", margem, yPos);
      
//       doc.setFontSize(10);
//       doc.setTextColor(40);
//       doc.text(observacoes || "Análise clínica sem alterações significativas relatadas pelo médico.", margem, yPos + 10, { maxWidth: 170 });

//       const pdfBase64 = doc.output('datauristring');

//       await api.put(`/exames/${exame.id}`, {
//         ...exame,
//         laudoGerado: true,
//         pdfArquivo: pdfBase64,
//         resultadoIA: resultadoIA,
//         observacoesMedico: observacoes,
//         analisado: true
//       });

//       doc.save(`Laudo_${exame.pacienteNome}.pdf`);
//       alert("Laudo com imagem gerado com sucesso!");
//       navigate("/Laudo");

//     } catch (error) {
//       console.error("Erro ao gerar laudo com imagem:", error);
//       alert("Erro ao processar as imagens para o PDF.");
//     }
//   };

//   if (!exame) return <PageWrapper>Exame não encontrado.</PageWrapper>;

//   return (
//     <PageWrapper title="Análise Inteligente de Exame">
//       <div className="max-w-6xl mx-auto pb-10">
        
//         {/* BOTÃO VOLTAR */}
//         <div className="mb-6">
//           <button 
//             onClick={() => navigate("/Laudo")} // Ou o caminho correto da sua rota de listagem
//             className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-semibold bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
//           >
//             <MdArrowBack size={20} /> Voltar para a lista
//           </button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Lado Esquerdo: Visualização das Imagens */}
//           <div className="bg-slate-900 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[500px] shadow-xl overflow-hidden">
//             <h3 className="text-white mb-4 self-start font-bold flex items-center gap-2">
//               <MdPictureAsPdf /> Anexos do Paciente
//             </h3>
//             {exame.arquivos?.length > 0 ? (
//               <div className="w-full h-full overflow-y-auto space-y-4 pr-2 custom-scrollbar">
//                 {exame.arquivos.map((img, idx) => (
//                   <img key={idx} src={img} className="w-full rounded-lg border border-slate-700 shadow-md" alt="Exame" />
//                 ))}
//               </div>
//             ) : (
//               <p className="text-slate-500">Nenhuma imagem disponível para análise.</p>
//             )}
//           </div>

//           {/* Lado Direito: Painel da IA e Laudo */}
//           <div className="space-y-6">
//             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
//               <div className="flex items-center gap-2 text-purple-600 mb-4">
//                 <MdAutoAwesome size={24} className={analisando ? "animate-spin" : ""} />
//                 <h2 className="font-bold text-lg">Resultado da Simulação IA</h2>
//               </div>
              
//               {analisando ? (
//                 <p className="text-slate-500 italic">Processando padrões de imagem...</p>
//               ) : (
//                 <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 text-slate-700 leading-relaxed">
//                   {resultadoIA}
//                 </div>
//               )}

//               <div className="flex gap-4 mt-6">
//                 <button 
//                   onClick={() => setAceito(true)}
//                   className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${aceito === true ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50'}`}
//                 >
//                   <MdCheck /> Aceitar Análise
//                 </button>
//                 <button 
//                   onClick={() => setAceito(false)}
//                   className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${aceito === false ? 'bg-red-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-red-50'}`}
//                 >
//                   <MdClose /> Recusar
//                 </button>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
//               <label className="block font-bold text-slate-700 mb-2">Observações Adicionais</label>
//               <textarea 
//                 className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
//                 placeholder="Digite aqui suas conclusões clínicas..."
//                 value={observacoes}
//                 onChange={(e) => setObservacoes(e.target.value)}
//               />
              
//               <div className="mt-6 p-4 border-t border-slate-100 flex flex-col gap-4">
//                 <div className="flex items-center gap-2 text-slate-500 text-sm">
//                   <MdPerson /> <strong>Assinatura Digital:</strong> {usuarioLogado}
//                 </div>
                
//                 <button 
//                   onClick={finalizarLaudo}
//                   disabled={aceito === null}
//                   className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 shadow-lg transition-all"
//                 >
//                   <MdPictureAsPdf size={20} /> Finalizar e Gerar Laudo PDF
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </PageWrapper>
//   );
// }

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { 
  MdAutoAwesome, 
  MdCheck, 
  MdClose, 
  MdPictureAsPdf, 
  MdPerson, 
  MdArrowBack,
  MdPlayArrow 
} from "react-icons/md";
import { jsPDF } from "jspdf"; 
import api from "../services/api";

export default function AnaliseExame() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const exame = state?.exame;
  
  const [analisando, setAnalisando] = useState(false); // Começa como false
  const [analiseIniciada, setAnaliseIniciada] = useState(false); // Novo estado
  const [resultadoIA, setResultadoIA] = useState("");
  const [aceito, setAceito] = useState(null); 
  const [observacoes, setObservacoes] = useState("");
  const usuarioLogado = localStorage.getItem("usuarioNome") || "Médico Responsável";

  // FUNÇÃO PARA INICIAR A ANÁLISE MANUALMENTE
  const iniciarAnaliseIA = () => {
    // VALIDAÇÃO: Verifica se existem arquivos
    if (!exame.arquivos || exame.arquivos.length === 0) {
      alert("Erro: Não há imagens anexadas para realizar a análise. Por favor, volte e anexe as fotos do exame.");
      return;
    }

    setAnalisando(true);
    setAnaliseIniciada(true);

    // Simulação do processamento da IA
    setTimeout(() => {
      setResultadoIA("A análise preliminar via IA sugere padrões de normalidade nos tecidos observados, com leve desvio nos índices hematológicos. Recomenda-se correlação clínica.");
      setAnalisando(false);
    }, 2500);
  };

 const finalizarLaudo = async () => {
  try {
    const doc = new jsPDF();
    const larguraPagina = doc.internal.pageSize.getWidth();
    const alturaPagina = doc.internal.pageSize.getHeight();
    const margem = 20;

    // --- 1. CABEÇALHO ---
    doc.setFontSize(14);
    doc.setTextColor(40);
    doc.text(`DiagHelper — ${exame.instituicao || ""}`, margem, 20);

    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(`Profissional: ${usuarioLogado}`, larguraPagina - 70, 15);
    doc.text(`Registro: ${exame.registroId || "1234"}`, larguraPagina - 70, 20);
    doc.text(`Data: ${new Date().toLocaleString()}`, larguraPagina - 70, 25);

    doc.setDrawColor(220);
    doc.line(margem, 35, larguraPagina - margem, 35);

    // --- 2. DADOS DA AMOSTRA E IA ---
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 100);
    doc.text("Dados da amostra e Resultado IA", margem, 45);

    doc.setFontSize(9);
    doc.setTextColor(40);
    doc.text(`Descrição: ${exame.tipo}`, margem, 52);

    doc.setFont("helvetica", "bold");
    doc.text("Resultado automatizado (IA):", margem, 60);
    doc.setFont("helvetica", "normal");
    doc.text(resultadoIA, margem, 65, { maxWidth: 170 });

    // --- 3. INCLUSÃO DE TODAS AS IMAGENS ---
    let yPos = 85;
    doc.setFont("helvetica", "bold");
    doc.text("Imagens Analisadas:", margem, yPos);
    yPos += 5;

    if (exame.arquivos && exame.arquivos.length > 0) {
      exame.arquivos.forEach((imgData, index) => {
        // Altura reservada para cada imagem (moldura + imagem)
        const alturaEspacoImg = 100;

        // Verifica se a imagem cabe na página atual, se não, adiciona nova página
        if (yPos + alturaEspacoImg > alturaPagina - 40) {
          doc.addPage();
          yPos = 20; // Reseta o Y no topo da nova página
        }

        // Título da imagem (ex: Foto 1)
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Anexo ${index + 1}`, margem, yPos);
        yPos += 2;

        // Desenha a moldura e a imagem
        doc.setDrawColor(240);
        doc.setFillColor(248, 249, 255);
        doc.roundedRect(margem, yPos, larguraPagina - (margem * 2), 90, 3, 3, "FD");
        
        // Adicionando a imagem
        doc.addImage(imgData, "JPEG", margem + 5, yPos + 5, larguraPagina - (margem * 2) - 10, 80);
        
        yPos += 95; // Espaçamento para a próxima imagem ou texto
      });
    }

    // --- 4. RESUMO INTERPRETATIVO (OBSERVAÇÕES DO MÉDICO) ---
    // Verifica se precisa de nova página para as observações
    if (yPos > alturaPagina - 40) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(11);
    doc.setTextColor(40, 40, 100);
    doc.text("Resumo interpretativo médico", margem, yPos + 10);
    
    doc.setFontSize(10);
    doc.setTextColor(40);
    doc.setFont("helvetica", "normal");
    doc.text(observacoes || "Análise clínica sem alterações significativas relatadas pelo médico.", margem, yPos + 20, { maxWidth: 170 });

    // --- 5. FINALIZAÇÃO ---
    const pdfBase64 = doc.output('datauristring');

    await api.put(`/exames/${exame.id}`, {
      ...exame,
      laudoGerado: true,
      pdfArquivo: pdfBase64,
      resultadoIA: resultadoIA,
      observacoesMedico: observacoes,
      analisado: true
    });

    doc.save(`Laudo_${exame.pacienteNome}.pdf`);
    alert("Laudo completo com todas as imagens gerado!");
    navigate("/Laudo");

  } catch (error) {
    console.error("Erro ao gerar laudo:", error);
    alert("Erro ao processar o PDF.");
  }
};

  if (!exame) return <PageWrapper>Exame não encontrado.</PageWrapper>;

  return (
    <PageWrapper title="Análise Inteligente de Exame">
      <div className="max-w-6xl mx-auto pb-10">
        
        <div className="mb-6">
          <button 
            onClick={() => navigate("/Laudo")} 
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-semibold bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
          >
            <MdArrowBack size={20} /> Voltar para a lista
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lado Esquerdo: Visualização das Imagens */}
          <div className="bg-slate-900 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[500px] shadow-xl overflow-hidden">
            <h3 className="text-white mb-4 self-start font-bold flex items-center gap-2">
              <MdPictureAsPdf /> Anexos do Paciente
            </h3>
            {exame.arquivos?.length > 0 ? (
              <div className="w-full h-full overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {exame.arquivos.map((img, idx) => (
                  <img key={idx} src={img} className="w-full rounded-lg border border-slate-700 shadow-md" alt="Exame" />
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-slate-500 mb-2">Nenhuma imagem disponível.</p>
                <span className="text-xs text-red-400 font-bold uppercase tracking-widest">Análise Indisponível</span>
              </div>
            )}
          </div>

          {/* Lado Direito: Painel da IA */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-purple-600">
                  <MdAutoAwesome size={24} className={analisando ? "animate-spin" : ""} />
                  <h2 className="font-bold text-lg">Análise da IA</h2>
                </div>
                
                {/* BOTÃO PARA INICIAR ANÁLISE */}
                {!analiseIniciada && (
                  <button 
                    onClick={iniciarAnaliseIA}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-purple-700 transition-all shadow-md"
                  >
                    <MdPlayArrow size={20} /> Iniciar Análise
                  </button>
                )}
              </div>
              
              {!analiseIniciada ? (
                <div className="p-8 border-2 border-dashed border-slate-100 rounded-xl text-center">
                  <p className="text-slate-400 text-sm">Clique no botão acima para processar as imagens com Inteligência Artificial.</p>
                </div>
              ) : analisando ? (
                <div className="p-6 bg-slate-50 rounded-xl text-center">
                  <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-slate-500 italic">Identificando padrões e morfologia celular...</p>
                </div>
              ) : (
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 text-slate-700 leading-relaxed animate-in fade-in slide-in-from-top-2">
                  {resultadoIA}
                </div>
              )}

              {analiseIniciada && !analisando && (
                <div className="flex gap-4 mt-6">
                  <button 
                    onClick={() => setAceito(true)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${aceito === true ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50'}`}
                  >
                    <MdCheck /> Aceitar
                  </button>
                  <button 
                    onClick={() => setAceito(false)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${aceito === false ? 'bg-red-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-red-50'}`}
                  >
                    <MdClose /> Recusar
                  </button>
                </div>
              )}
            </div>

            {/* Observações e Finalização */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <label className="block font-bold text-slate-700 mb-2">Observações Adicionais</label>
              <textarea 
                className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                placeholder="Digite aqui suas conclusões clínicas..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              />
              
              <div className="mt-6 p-4 border-t border-slate-100 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <MdPerson /> <strong>Assinatura:</strong> {usuarioLogado}
                </div>
                
                <button 
                  onClick={finalizarLaudo}
                  disabled={aceito === null || analisando}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 shadow-lg transition-all"
                >
                  <MdPictureAsPdf size={20} /> Finalizar e Gerar Laudo PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}