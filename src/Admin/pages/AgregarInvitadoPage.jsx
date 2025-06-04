// admin/pages/AgregarInvitadoPage.jsx
import { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";

export default function AgregarInvitadoPage() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [mesaId, setMesaId] = useState("");
  const [mesas, setMesas] = useState([]);
  const [mensaje, setMensaje] = useState("");

 useEffect(() => {
  const cargarMesas = async () => {
    const { data, error } = await supabase.from('Mesas').select('id, "Nombre"');
    if (error) {
      console.error('Error cargando mesas:', error.message);
    } else {
      setMesas(data);
      console.log('Mesas cargadas:', data);
    }
  };

  cargarMesas();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !mesaId) {
      setMensaje("Por favor completá todos los campos.");
      return;
    }

    const { error } = await supabase.from("Invitados").insert({
      Nombre: nombre,
      Apellido: apellido,
      Mesa_id: mesaId,
    });

    if (error) {
      console.error("Error al agregar invitado:", error.message);
      setMensaje("Ocurrió un error al agregar el invitado.");
    } else {
      setMensaje("Invitado agregado con éxito 🎉");
      setNombre("");
      setApellido("");
      setMesaId("");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Agregar Invitado</h1>

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
          Agregar Invitado
        </button>
      </form>
    </div>
  );
}
