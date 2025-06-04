// admin/components/InvitadosList.jsx
import React from 'react';

export default function InvitadosList({ invitados }) {
  if (!invitados || invitados.length === 0) {
    return <p className="text-center text-gray-500">No hay invitados cargados aún.</p>;
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-purple-200">
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Apellido</th>
            <th className="py-2 px-4 border-b">Mesa</th>
          </tr>
        </thead>
        <tbody>
          {invitados.map((invitado) => (
            <tr key={invitado.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{invitado.Nombre}</td>
              <td className="py-2 px-4 border-b">{invitado.Apellido}</td>
              <td className="py-2 px-4 border-b">{invitado.Mesas?.Nombre || 'Sin asignar'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
