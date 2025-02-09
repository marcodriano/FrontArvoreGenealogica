import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEdit, FaTrash, FaUser, FaHeart, FaVenus, FaMars } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [members, setMembers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const navigate = useNavigate();


  // Busca os membros da família ao carregar a tela
  useEffect(() => {

      const fetchMembers = async () => {
      try {
        const response = await api.get('/api/members');
        setMembers(response.data);
      } catch (error) {
        console.error('Erro ao buscar membros:', error);
        toast.error('Erro ao carregar membros.');
      }
    };

    fetchMembers();
  }, []);

  // Adiciona um novo membro
  const onSubmit = async (data) => {
    try {
      const response = await api.post('/api/members', data);
      setMembers([...members, response.data]);
      reset();
      toast.success('Membro adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar membro:', error);
      toast.error('Erro ao adicionar membro.');
    }
  };

  // Abre o modal de edição
  const openEditModal = (member) => {
    setMemberToEdit(member);
    setValue('name', member.name);
    setValue('birthDate', member.birthDate);
    setValue('relationship', member.relationship);
    setValue('relationshipType', member.relationshipType);
    setIsEditModalOpen(true);
  };

  // Fecha o modal de edição
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setMemberToEdit(null);
    reset();
  };

  // Edita um membro existente
  const handleEditMember = async (data) => {
    try {
      const response = await api.put(`/api/members/${memberToEdit._id}`, data);
      setMembers(members.map((member) => (member._id === memberToEdit._id ? response.data : member)));
      closeEditModal();
      toast.success('Membro editado com sucesso!');
    } catch (error) {
      console.error('Erro ao editar membro:', error);
      toast.error('Erro ao editar membro.');
    }
  };

  // Exclui um membro
  const handleDeleteMember = async (id) => {
    try {
      await api.delete(`/api/members/${id}`);
      setMembers(members.filter((member) => member._id !== id));
      toast.success('Membro excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir membro:', error);
      toast.error('Erro ao excluir membro.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Árvore Genealógica</h1>

      {/* Formulário para adicionar membros */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Adicionar Membro</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Nome</label>
          <input
            {...register('name', { required: 'O nome é obrigatório' })}
            placeholder="Nome"
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Data de Nascimento</label>
          <input
            type="date"
            {...register('birthDate')}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Relação</label>
          <input
            {...register('relationship', { required: 'A relação é obrigatória' })}
            placeholder="Relação (ex: pai, mãe, filho)"
            className="w-full p-2 border rounded"
          />
          {errors.relationship && <p className="text-red-500 text-sm mt-1">{errors.relationship.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Tipo de Relação</label>
          <select
            {...register('relationshipType')}
            className="w-full p-2 border rounded"
          >
            <option value="biológica">Biológica</option>
            <option value="adotiva">Adotiva</option>
            <option value="meio-irmã">Meio-irmã</option>
            <option value="meio-irmão">Meio-irmão</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Adicionar Membro
        </button>
      </form>

      {/* Lista de membros */}
      {members.length === 0 ? (
        <div className="flex flex-col items-center mt-8">
          <p className="text-gray-700">Nenhum membro cadastrado. Adicione um novo membro!</p>
        </div>
      ) : (
        <div>
          {members.map((member) => (
            <div key={member._id} className="mb-4 p-4 bg-white rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                {member.relationshipType === 'biológica' && <FaUser className="text-blue-500 mr-2" />}
                {member.relationshipType === 'adotiva' && <FaHeart className="text-red-500 mr-2" />}
                {member.relationshipType === 'meio-irmã' && <FaVenus className="text-purple-500 mr-2" />}
                {member.relationshipType === 'meio-irmão' && <FaMars className="text-green-500 mr-2" />}
                <p className="font-bold text-lg">{member.name}</p>
              </div>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Relação:</span> {member.relationship} ({member.relationshipType})
              </p>
              {member.birthDate && (
                <p className="text-gray-700">
                  <span className="font-semibold">Nascimento:</span> {new Date(member.birthDate).toLocaleDateString()}
                </p>
              )}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => openEditModal(member)}
                  className="bg-yellow-500 text-white p-2 rounded mr-2 hover:bg-yellow-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteMember(member._id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de edição */}
      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
              <h2 className="text-xl font-bold mb-4">Editar Membro</h2>
              <form onSubmit={handleSubmit(handleEditMember)}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Nome</label>
                  <input
                    {...register('name', { required: 'O nome é obrigatório' })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Data de Nascimento</label>
                  <input
                    type="date"
                    {...register('birthDate')}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Relação</label>
                  <input
                    {...register('relationship', { required: 'A relação é obrigatória' })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.relationship && <p className="text-red-500 text-sm mt-1">{errors.relationship.message}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Tipo de Relação</label>
                  <select
                    {...register('relationshipType')}
                    className="w-full p-2 border rounded"
                  >
                    <option value="biológica">Biológica</option>
                    <option value="adotiva">Adotiva</option>
                    <option value="meio-irmã">Meio-irmã</option>
                    <option value="meio-irmão">Meio-irmão</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="bg-gray-500 text-white p-2 rounded mr-2 hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}