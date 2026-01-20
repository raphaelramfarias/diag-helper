// import { useEffect, useState } from "react";
// import BarraPesquisa from "../components/BarraPesquisa";
// import ListaLaudos from "../components/ListaLaudos";
// import ListaPacientes from "../components/ListaPacientes";
// import PageWrapper from "../components/PageWrapper";

// import ModalConcluido from "../modals/ModalConcluido";
// import ModalFalha from "../modals/ModalFalha";
// import ModalProcessando from "../modals/ModalProcessando";

// // --- IMPORTAÇÃO DO SERVIÇO DE AUDITORIA ---
// import { MdCheckCircle, MdClose, MdCloudUpload, MdDescription, MdPersonSearch } from "react-icons/md";
// import { useAuth } from "../context/AuthContext";
// import api from "../services/api";
// import { registrarLog } from "../services/auditService";

// export default function GerarLaudo() {
//   const { usuario } = useAuth();
//   const [pacientes, setPacientes] = useState([]);
//   const [pesquisa, setPesquisa] = useState("");
//   const [pesquisaDebounced, setPesquisaDebounced] = useState("");
//   const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
//   const [medicos, setMedicos] = useState([]);
//   const [medicoSelecionado, setMedicoSelecionado] = useState(null);
//   const [modalAberto, setModalAberto] = useState(null);
//   const [imagens, setImagens] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [observacoes, setObservacoes] = useState("");
//   const [dataLaudo, setDataLaudo] = useState("");
//   const [laudos, setLaudos] = useState([]);

//   // Recupera o nome do usuário que está logado para o log
//   const usuarioLogado = usuario?.nome || "Usuário Sistema";

//   useEffect(() => {
//     api
//       .get("/pacientes")
//       .then((data) => setPacientes(Array.isArray(data) ? data : []))
//       .catch(console.error);
//   }, []);

//   useEffect(() => {
//     api
//       .get("/usuarios")
//       .then((data) => {
//         const medicosAtivos = data.filter(
//           (u) => u.status === "Ativo" && (u.perfil === "medico" || u.cargo.includes("Médico"))
//         );
//         setMedicos(medicosAtivos);
//       })
//       .catch(console.error);
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => setPesquisaDebounced(pesquisa), 500);
//     return () => clearTimeout(timer);
//   }, [pesquisa]);

//   const pacientesFiltrados = pacientes.filter(
//     (p) => p.nome.toLowerCase().includes(pesquisaDebounced.toLowerCase()) || p.cpf.includes(pesquisaDebounced)
//   );

//   function handleImagem(e) {
//     const files = Array.from(e.target.files);
//     setImagens(prev => [...prev, ...files]);
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     setPreviews(prev => [...prev, ...newPreviews]);
//   }

//   function removerImagem(idx) {
//     setImagens((prev) => prev.filter((_, i) => i !== idx));
//     setPreviews((prev) => prev.filter((_, i) => i !== idx));
//   }

//   // --- FUNÇÃO ATUALIZADA COM LOG DE AUDITORIA ---
//   async function handleGerarLaudo() {
//     if (!medicoSelecionado || !pacienteSelecionado || !dataLaudo || imagens.length === 0) {
//       setModalAberto("falha");
//       return;
//     }

//     setModalAberto("processando");

//     try {
//       const novoLaudo = {
//         id: Date.now(),
//         medico: medicoSelecionado,
//         paciente: pacienteSelecionado,
//         data: dataLaudo,
//         observacoes,
//         imagens: previews,
//       };

//       // REGISTRO DE LOG
//       // Registra quem fez, o que fez e o detalhe (nome do paciente)
//       await registrarLog(
//         usuarioLogado,
//         `Gerou laudo médico para o paciente: ${pacienteSelecionado.nome}`,
//         "LAUDO"
//       );

//       // Simula o tempo de processamento para feedback visual
//       setTimeout(() => {
//         setLaudos((prev) => [novoLaudo, ...prev]);
//         setModalAberto("concluido");

//         // Limpa o formulário após o sucesso
//         setPacienteSelecionado(null);
//         setMedicoSelecionado(null);
//         setDataLaudo("");
//         setObservacoes("");
//         setImagens([]);
//         setPreviews([]);
//         setPesquisa("");
//       }, 1500);

//     } catch (error) {
//       console.error("Erro ao processar laudo ou log:", error);
//       setModalAberto("falha");
//     }
//   }

//   return (
//     <PageWrapper title="Gerar Novo Laudo">
//       <div className="max-w-6xl mx-auto space-y-8 pb-20">

//         {/* ETAPA 1: SELEÇÃO DE PACIENTE */}
//         <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//           <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
//             <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
//               <MdPersonSearch className="text-blue-600" size={22} />
//               1. Selecionar Paciente
//             </h2>
//             {pacienteSelecionado && (
//               <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 animate-bounce">
//                 <MdCheckCircle /> Selecionado
//               </span>
//             )}
//           </div>

//           <div className="p-6">
//             <div className="max-w-md mb-6">
//               <BarraPesquisa pesquisa={pesquisa} setPesquisa={setPesquisa} placeholder="Buscar por nome ou CPF..." />
//             </div>

//             <div className="rounded-xl border border-slate-100 overflow-hidden">
//               <ListaPacientes
//                 pacientes={pacientesFiltrados}
//                 onSelect={setPacienteSelecionado}
//                 selectedPacienteId={pacienteSelecionado?.id}
//                 showActions={false}
//                 showExames={false}
//                 showSelectButton
//               />
//             </div>
//           </div>
//         </section>

//         {/* ETAPA 2: FORMULÁRIO DO LAUDO */}
//         <section className={`bg-white rounded-2xl shadow-sm border border-slate-200 transition-all duration-500 ${!pacienteSelecionado ? 'opacity-40 grayscale pointer-events-none' : 'opacity-100'}`}>
//           <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
//             <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
//               <MdDescription className="text-blue-600" size={22} />
//               2. Detalhes do Laudo
//             </h2>
//           </div>

//           <div className="p-6 md:p-8 space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="flex flex-col gap-1">
//                 <label className="text-xs font-bold text-slate-500 uppercase ml-1">Médico Responsável</label>
//                 <select
//                   className="border border-slate-300 rounded-xl p-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                   value={medicoSelecionado?.id ?? ""}
//                   onChange={(e) => setMedicoSelecionado(medicos.find(m => String(m.id) === e.target.value))}
//                 >
//                   <option value="">Selecione o médico</option>
//                   {medicos.map((m) => <option key={m.id} value={String(m.id)}>{m.nome}</option>)}
//                 </select>
//               </div>

//               <div className="flex flex-col gap-1">
//                 <label className="text-xs font-bold text-slate-500 uppercase ml-1">Paciente</label>
//                 <input
//                   type="text"
//                   value={pacienteSelecionado?.nome || "Aguardando seleção..."}
//                   disabled
//                   className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-500 font-medium"
//                 />
//               </div>

//               <div className="flex flex-col gap-1">
//                 <label className="text-xs font-bold text-slate-500 uppercase ml-1">Data do Exame</label>
//                 <input
//                   type="date"
//                   value={dataLaudo}
//                   onChange={(e) => setDataLaudo(e.target.value)}
//                   className="border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>
//             </div>

//             <div className="space-y-3">
//               <label className="text-xs font-bold text-slate-500 uppercase ml-1">Imagens do Exame</label>
//               <div className="flex items-center justify-center w-full">
//                 <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <MdCloudUpload size={32} className="text-slate-400 mb-2" />
//                     <p className="text-sm text-slate-500 font-medium">Clique para fazer upload de imagens</p>
//                   </div>
//                   <input type="file" multiple accept="image/*" onChange={handleImagem} className="hidden" />
//                 </label>
//               </div>

//               {previews.length > 0 && (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-2">
//                   {previews.map((src, i) => (
//                     <div key={i} className="group relative aspect-square border border-slate-200 rounded-xl overflow-hidden bg-slate-100">
//                       <img src={src} alt="Preview" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
//                       <button
//                         onClick={() => removerImagem(i)}
//                         className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-colors"
//                       >
//                         <MdClose size={14} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="flex flex-col gap-1">
//               <label className="text-xs font-bold text-slate-500 uppercase ml-1">Observações Clínicas</label>
//               <textarea
//                 rows={4}
//                 className="w-full border border-slate-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300"
//                 placeholder="Descreva os achados do exame..."
//                 value={observacoes}
//                 onChange={(e) => setObservacoes(e.target.value)}
//               />
//             </div>

//             <button
//               onClick={handleGerarLaudo}
//               className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
//             >
//               <MdDescription size={24} />
//               Finalizar e Gerar Laudo
//             </button>
//           </div>
//         </section>

//         {laudos.length > 0 && (
//           <div className="animate-in slide-in-from-bottom duration-500">
//             <ListaLaudos laudos={laudos} />
//           </div>
//         )}

//         <ModalConcluido open={modalAberto === "concluido"} onClose={() => setModalAberto(null)} />
//         <ModalFalha open={modalAberto === "falha"} onClose={() => setModalAberto(null)} />
//         <ModalProcessando open={modalAberto === "processando"} />
//       </div>
//     </PageWrapper>
//   );
// }


// import { useState, useMemo, useEffect } from "react";
// import { 
//   useReactTable, 
//   getCoreRowModel, 
//   getFilteredRowModel, 
//   flexRender 
// } from "@tanstack/react-table";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import PageWrapper from "../components/PageWrapper";
// import BarraPesquisa from "../components/BarraPesquisa";
// import { MdDownload, MdHourglassEmpty, MdCheckCircle } from "react-icons/md";

// export default function Laudos() {
//   const [exames, setExames] = useState([]);
//   const [pesquisa, setPesquisa] = useState("");
//   const navigate = useNavigate();

//   // 1. Busca os exames ao carregar
//   useEffect(() => {
//     api.get("/exames").then((data) => setExames(data || []));
//   }, []);

//   // 2. Definição das Colunas da Tabela
//   const columns = useMemo(() => [
//     {
//       accessorKey: "pacienteNome",
//       header: "Paciente",
//     },
//     {
//       accessorKey: "tipo",
//       header: "Exame",
//     },
//     {
//       accessorKey: "data",
//       header: "Data de Criação",
//       cell: (info) => new Date(info.getValue()).toLocaleDateString("pt-BR"),
//     },
//     {
//       accessorKey: "status", // Supõe-se que a API traga 'analisado' ou 'pendente'
//       header: "Status",
//       cell: (info) => {
//         const analisado = info.row.original.analisado;
//         return analisado ? (
//           <div className="flex items-center gap-2 text-green-600">
//             <MdCheckCircle /> Analisado
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation(); // Impede o double-click da linha
//                 handleDownload(info.row.original.id);
//               }}
//               className="ml-2 p-1 bg-slate-100 rounded hover:bg-slate-200"
//               title="Download Laudo"
//             >
//               <MdDownload size={18} />
//             </button>
//           </div>
//         ) : (
//           <div className="flex items-center gap-2 text-amber-500">
//             <MdHourglassEmpty /> Pendente
//           </div>
//         );
//       },
//     },
//   ], []);

//   // 3. Configuração do React Table
//   const table = useReactTable({
//     data: exames,
//     columns,
//     state: { globalFilter: pesquisa },
//     onGlobalFilterChange: setPesquisa,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//   });

//   const handleDownload = (id) => {
//     console.log("Baixando laudo do exame:", id);
//     // Lógica para baixar o PDF existente
//   };

//   return (
//     <PageWrapper title="Central de Laudos">
//       <div className="max-w-7xl mx-auto space-y-4">
//         <BarraPesquisa 
//           pesquisa={pesquisa} 
//           setPesquisa={setPesquisa} 
//           placeholder="Pesquisar por nome, CPF ou exame..." 
//         />

//         <div className="bg-white rounded-2xl shadow overflow-hidden border border-slate-200">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50 border-b border-slate-200">
//               {table.getHeaderGroups().map(headerGroup => (
//                 <tr key={headerGroup.id}>
//                   {headerGroup.headers.map(header => (
//                     <th key={header.id} className="p-4 font-semibold text-slate-700">
//                       {flexRender(header.column.columnDef.header, header.getContext())}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody>
//               {table.getRowModel().rows.map(row => (
//                 <tr 
//                   key={row.id} 
//                   onDoubleClick={() => navigate(`/laudos/analise/${row.original.id}`)}
//                   className="border-b border-slate-100 hover:bg-blue-50 cursor-pointer transition-colors"
//                 >
//                   {row.getVisibleCells().map(cell => (
//                     <td key={cell.id} className="p-4">
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <p className="text-sm text-slate-500 italic">* Dê um duplo clique na linha para abrir a análise.</p>
//       </div>
//     </PageWrapper>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import BarraPesquisa from "../components/BarraPesquisa";
import { MdPictureAsPdf, MdHourglassEmpty, MdCheckCircle } from "react-icons/md";
import api from "../services/api";

export default function Laudo() {
  const [exames, setExames] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [ordenacao, setOrdenacao] = useState({ campo: "data", direcao: "desc" });
  const navigate = useNavigate();

  const carregarDados = async () => {
    try {
      const res = await api.get("/exames");
      setExames(res || []);
    } catch (error) {
      console.error("Erro ao carregar exames:", error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // FUNÇÃO PARA DOWNLOAD DO PDF ANEXADO EM BASE64
  const baixarPDFAnexado = (exame) => {
    if (exame.pdfArquivo) {
      const link = document.createElement("a");
      link.href = exame.pdfArquivo;
      link.download = `Laudo_${exame.pacienteNome}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Arquivo de laudo não encontrado para este exame.");
    }
  };

  const examesProcessados = exames
    .filter((e) => {
      const termo = pesquisa.toLowerCase();
      return (
        e.pacienteNome?.toLowerCase().includes(termo) ||
        e.tipo?.toLowerCase().includes(termo) ||
        e.pacienteCpf?.includes(termo) 
      );
    })
    .sort((a, b) => {
      let valorA = a[ordenacao.campo] || "";
      let valorB = b[ordenacao.campo] || "";
      if (ordenacao.campo === "data") {
        valorA = new Date(a.data);
        valorB = new Date(b.data);
      }
      if (valorA < valorB) return ordenacao.direcao === "asc" ? -1 : 1;
      if (valorA > valorB) return ordenacao.direcao === "asc" ? 1 : -1;
      return 0;
    });

  const alterarOrdenacao = (campo) => {
    setOrdenacao((prev) => ({
      campo,
      direcao: prev.campo === campo && prev.direcao === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <PageWrapper title="Central de Laudos">
      <div className="max-w-7xl mx-auto space-y-6 pb-10">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
          <BarraPesquisa pesquisa={pesquisa} setPesquisa={setPesquisa} placeholder="Filtrar exames..." />
          <div className="text-sm text-slate-500 font-medium">{examesProcessados.length} exames encontrados</div>
        </div>

        <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => alterarOrdenacao("pacienteNome")}>Paciente</th>
                <th className="p-4 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => alterarOrdenacao("tipo")}>Exame</th>
                <th className="p-4 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => alterarOrdenacao("data")}>Data</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {examesProcessados.map((e) => (
                <tr 
                  key={e.id} 
                  onDoubleClick={() => navigate(`/laudos/analise/${e.id}`, { state: { exame: e } })}
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                  title="Clique duplo para analisar"
                >
                  <td className="p-4 font-semibold text-slate-700">{e.pacienteNome}</td>
                  <td className="p-4 text-slate-600">
                    <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {e.tipo}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{e.data}</td>
                  <td className="p-4 text-center">
                    {e.laudoGerado ? (
                      <div className="flex items-center justify-center gap-1 text-emerald-600 font-bold text-xs uppercase">
                        <MdCheckCircle size={18} /> Concluído
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-xs uppercase">
                        <MdHourglassEmpty size={18} /> Pendente
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {e.laudoGerado ? (
                      <button 
                        onClick={(opt) => { 
                          opt.stopPropagation(); 
                          baixarPDFAnexado(e); 
                        }}
                        className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 mx-auto hover:bg-emerald-200 transition-all shadow-sm"
                      >
                        <MdPictureAsPdf size={16} /> DOWNLOAD
                      </button>
                    ) : (
                      <span className="text-slate-300 text-xs italic">Aguardando análise</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {examesProcessados.length === 0 && (
            <div className="p-20 text-center text-slate-400">
              Nenhum exame encontrado.
            </div>
          )}
        </section>
      </div>
    </PageWrapper>
  );
}