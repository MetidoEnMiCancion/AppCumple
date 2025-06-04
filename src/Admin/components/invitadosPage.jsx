// admin/pages/InvitadosPage.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase';
import InvitadosList from './invitadosList';

export default function InvitadosPage() {
  const [invitados, setInvitados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvitados = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('Invitados')
        .select('id, Nombre, Apellido, Mesa_id, Mesas (id, Nombre)');

      if (error) {
        console.error('Error cargando invitados:', error.message);
      } else {
        setInvitados(data);
      }

      setLoading(false);
    };

    fetchInvitados();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Invitados</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <InvitadosList invitados={invitados} />
      )}
    </div>
  );
}
