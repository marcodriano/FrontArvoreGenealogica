import "./index.css"; // ou './tailwind.css', dependendo de como nomeou o arquivo
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  FaEdit,
  FaTrash,
  FaUser,
  FaHeart,
  FaVenus,
  FaMars,
} from "react-icons/fa";

export default function Home() {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: "",
    birthDate: "",
    relationship: "",
    relationshipType: "biológica",
  });

  const handleEditMember = async (id, updatedData) => {
    try {
      const response = await api.put(`/members/${id}`, updatedData);
      setMembers(
        members.map((member) => (member._id === id ? response.data : member))
      );
    } catch (error) {
      console.error("Erro ao editar membro:", error);
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await api.delete(`/members/${id}`);
      setMembers(members.filter((member) => member._id !== id));
    } catch (error) {
      console.error("Erro ao excluir membro:", error);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/members", newMember);
      setMembers([...members, response.data]);
      setNewMember({
        name: "",
        birthDate: "",
        relationship: "",
        relationshipType: "biológica",
      }); // Limpa o formulário
    } catch (error) {
      console.error("Erro ao adicionar membro:", error);
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await api.get("/members");
        setMembers(response.data);
      } catch (error) {
        console.error("Erro ao buscar membros:", error);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Árvore Genealógica</h1>
        <Link to="/login" className="text-blue-500 hover:underline">
          Ir para Login
        </Link>
        <ul className="mt-4">
          {members.map((member) => (
            <li key={member._id} className="mb-2 p-2 bg-gray-100 rounded">
              {member.name} - {member.relationship}
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={handleAddMember}
        className="mb-6 bg-white p-4 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-bold mb-4">Adicionar Membro</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Nome</label>
          <input
            type="text"
            placeholder="Nome"
            value={newMember.name}
            onChange={(e) =>
              setNewMember({ ...newMember, name: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Data de Nascimento
          </label>
          <input
            type="date"
            placeholder="Data de Nascimento"
            value={newMember.birthDate}
            onChange={(e) =>
              setNewMember({ ...newMember, birthDate: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Relação
          </label>
          <input
            type="text"
            placeholder="Relação (ex: pai, mãe, filho)"
            value={newMember.relationship}
            onChange={(e) =>
              setNewMember({ ...newMember, relationship: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Tipo de Relação
          </label>
          <select
            value={newMember.relationshipType}
            onChange={(e) =>
              setNewMember({ ...newMember, relationshipType: e.target.value })
            }
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

      {members.map((member) => (
        <div
          key={member._id}
          className="mb-4 p-4 bg-white rounded-lg shadow-md"
        >
          <div className="flex items-center mb-2">
            {member.relationshipType === "biológica" && (
              <FaUser className="text-blue-500 mr-2" />
            )}
            {member.relationshipType === "adotiva" && (
              <FaHeart className="text-red-500 mr-2" />
            )}
            {member.relationshipType === "meio-irmã" && (
              <FaVenus className="text-purple-500 mr-2" />
            )}
            {member.relationshipType === "meio-irmão" && (
              <FaMars className="text-green-500 mr-2" />
            )}
            <p className="font-bold text-lg">{member.name}</p>
          </div>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Relação:</span>{" "}
            {member.relationship} ({member.relationshipType})
          </p>
          {member.birthDate && (
            <p className="text-gray-700">
              <span className="font-semibold">Nascimento:</span>{" "}
              {new Date(member.birthDate).toLocaleDateString()}
            </p>
          )}
          <div className="flex justify-end mt-4">
            <button
              onClick={() =>
                handleEditMember(member._id, { ...member, name: "Novo Nome" })
              }
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
  );
}

/* return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Árvore Genealógica</h1>
      <p>Bem-vindo à tela da árvore genealógica!</p>
      <Link to="/login" className="text-blue-500 hover:underline">Ir para Login</Link>
    </div>
  );
}*/
