import { useState } from "react";
import Navbar from "../components/Navbar";

export default function CadastroPacientes() {
  const [pacientes, setPacientes] = useState([
    {
      nome: "João da Silva",
      dataNascimento: "1985-06-15",
      telefone: "(11) 91234-5678",
      cpf: "123.456.789-00",
      idade: "38",
    },
    {
      nome: "Maria Oliveira",
      dataNascimento: "1990-09-22",
      telefone: "(21) 99876-5432",
      cpf: "987.654.321-00",
      idade: "33",
    },
    {
      nome: "Carlos Pereira",
      dataNascimento: "1978-12-05",
      telefone: "(31) 93456-7890",
      cpf: "456.789.123-00",
      idade: "45",
    },
    {
      nome: "Ana Souza",
      dataNascimento: "2000-03-18",
      telefone: "(41) 98765-4321",
      cpf: "321.654.987-00",
      idade: "23",
    }
  ]);

  const [editIndex, setEditIndex] = useState(null);

  const [formPacientes, setFormPacientes] = useState({
    nome: "",
    dataNascimento: "",
    telefone: "",
    cpf: "",
    idade: "",
  });

  const handleChange = (e) => {
    setFormPacientes({
      ...formPacientes,
      [e.target.name]: e.target.value,
    });
  };

  function iniciarEdicao(index) {
    setEditIndex(index);
    setFormPacientes(pacientes[index]);
  }

  function salvarEdicao(e) {
    e.preventDefault();

    const listaAtualizada = [...pacientes];
    listaAtualizada[editIndex] = formPacientes;

    setPacientes(listaAtualizada);
    setEditIndex(null);

    setFormPacientes({
      nome: "",
      dataNascimento: "",
      telefone: "",
      cpf: "",
      idade: "",
    });
  }

  function excluirPaciente(index) {
    setPacientes(pacientes.filter((_, i) => i !== index));
  }

  const cadastrarPaciente = (e) => {
    e.preventDefault();

    if (!formPacientes.nome || !formPacientes.dataNascimento || !formPacientes.telefone) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    setPacientes([...pacientes, formPacientes]);

    setFormPacientes({
      nome: "",
      dataNascimento: "",
      telefone: "",
      cpf: "",
      idade: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Navbar />

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Cadastro de Pacientes</h1>

        {/* Formulário simples sem card */}
        <form
          onSubmit={editIndex !== null ? salvarEdicao : cadastrarPaciente}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-lg border"
        >
          <div>
            <label className="font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="nome"
              value={formPacientes.nome}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Data de Nascimento</label>
            <input
              type="date"
              name="dataNascimento"
              value={formPacientes.dataNascimento}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Telefone</label>
            <input
              type="text"
              name="telefone"
              value={formPacientes.telefone}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg"
              placeholder="(xx) xxxxx-xxxx"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">CPF</label>
            <input
              type="text"
              name="cpf"
              value={formPacientes.cpf}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg"
              placeholder="xxx.xxx.xxx-xx"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Idade</label>
            <input
              type="number"
              name="idade"
              value={formPacientes.idade}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg"
              placeholder="Idade"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition h-fit"
          >
            {editIndex !== null ? "Salvar edição" : "Cadastrar"}
          </button>
        </form>

        {/* Lista */}
        <h2 className="text-xl font-bold mt-8 mb-4 text-gray-800">
          Pacientes cadastrados
        </h2>

        <div className="space-y-2">
          {pacientes.map((p, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-6 gap-4 bg-white p-4 rounded-lg border items-center"
            >
              <p><span className="font-bold">Nome:</span> {p.nome}</p>
              <p><span className="font-bold">Nascimento:</span> {p.dataNascimento}</p>
              <p><span className="font-bold">Telefone:</span> {p.telefone}</p>
              <p><span className="font-bold">CPF:</span> {p.cpf}</p>
              <p><span className="font-bold">Idade:</span> {p.idade}</p>

              <div className="flex gap-3 mt-2 md:mt-0">
                <button
                  onClick={() => iniciarEdicao(index)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Editar
                </button>

                <button
                  onClick={() => excluirPaciente(index)}
                  className="text-red-600 font-semibold hover:underline"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
