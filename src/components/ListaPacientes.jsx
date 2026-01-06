import CardPacientes from "./CardPacientes";

const ListaPacientes = ({
  pacientes,
  onEdit,
  onDelete,
  onAddExame,
  onSelect,
  selectedPacienteId,
  showActions = true,
  showExames = true,
  showSelectButton = false,
}) => {
  return (
    <div className="space-y-3">
      {pacientes.map((p) => (
        <CardPacientes
          key={p.id}
          paciente={p}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddExame={onAddExame}
          onSelect={onSelect}
          selected={selectedPacienteId === p.id}
          showActions={showActions}
          showExames={showExames}
          showSelectButton={showSelectButton}
        />
      ))}
    </div>
  );
};

export default ListaPacientes;
