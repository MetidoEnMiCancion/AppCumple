import { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";

export function AgregarInvitadoPage() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [mesaId, setMesaId] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mesas, setMesas] = useState([]);
  const [invitados, setInvitados] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      const { data: mesasData } = await supabase.from('Mesas').select('id, "Nombre"');
      const { data: invitadosData } = await supabase
        .from("Invitados")
        .select("id, Nombre, Apellido, Mesa_id, Mesas (Nombre)");
      setMesas(mesasData || []);
      setInvitados(invitadosData || []);
    };

    cargarDatos();
  }, []);

  const limpiarFormulario = () => {
    setNombre("");
    setApellido("");
    setMesaId("");
    setEditandoId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !mesaId) {
      setMensaje("Por favor completá todos los campos.");
      return;
    }

    if (editandoId) {
      const { error } = await supabase
        .from("Invitados")
        .update({ Nombre: nombre, Apellido: apellido, Mesa_id: mesaId })
        .eq("id", editandoId);

      if (!error) {
        setMensaje("Invitado actualizado ✅");
        limpiarFormulario();
        actualizarLista();
      }
    } else {
      const { error } = await supabase
        .from("Invitados")
        .insert({ Nombre: nombre, Apellido: apellido, Mesa_id: mesaId });

      if (!error) {
        setMensaje("Invitado agregado con éxito 🎉");
        limpiarFormulario();
        actualizarLista();
      }
    }
  };

  const actualizarLista = async () => {
    const { data } = await supabase
      .from("Invitados")
      .select("id, Nombre, Apellido, Mesa_id, Mesas (Nombre)");
    setInvitados(data || []);
  };

  const handleEditar = (invitado) => {
    setNombre(invitado.Nombre);
    setApellido(invitado.Apellido);
    setMesaId(invitado.Mesa_id);
    setEditandoId(invitado.id);
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Estás seguro que querés eliminar este invitado?")) {
      await supabase.from("Invitados").delete().eq("id", id);
      actualizarLista();
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Agregar o Editar Invitado</h1>

      {mensaje && (
        <p className="mb-4 text-center text-sm text-purple-600">{mensaje}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />

        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />

        <select
          value={mesaId}
          onChange={(e) => setMesaId(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="">Seleccionar mesa</option>
          {mesas.map((mesa) => (
            <option key={mesa.id} value={mesa.id}>
              {mesa.Nombre}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
        >
          {editandoId ? "Actualizar Invitado" : "Agregar Invitado"}
        </button>
      </form>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">Lista de Invitados</h2>
      <ul className="space-y-2">
        {invitados.map((inv) => (
          <li key={inv.id} className="flex justify-between items-center border p-2 rounded">
            <div>
              {inv.Nombre} {inv.Apellido} - {inv.Mesas?.Nombre || "Sin asignar"}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEditar(inv)}
                className="text-blue-600 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => handleEliminar(inv.id)}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default AgregarInvitadoPage;