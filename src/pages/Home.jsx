import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrash, FaUser, FaHeart, FaVenus, FaMars, } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";
import { useNavigate } from 'react-router-dom'
import 'flowbite';

export default function Home() {
  const [members, setMembers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // Busca os membros da família ao carregar a tela
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await api.get("/api/members");
        setMembers(response.data);
      } catch (error) {
        console.error("Erro ao buscar membros:", error);
        toast.error("Erro ao carregar membros.");
      }
    };

    fetchMembers();
  }, []);

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('token');
    // Redireciona para a página de login
    navigate('/login');}

    // Inicialize o Flowbite
    import('flowbite').then(({ init }) => init());

    // Adiciona um novo membro
    const onSubmit = async (data) => {
      try {
        const response = await api.post("/api/members", data);
        setMembers([...members, response.data]);
        reset();
        toast.success("Membro adicionado com sucesso!");
      } catch (error) {
        console.error("Erro ao adicionar membro:", error);
        toast.error("Erro ao adicionar membro.");
      }
    };

    // Abre o modal de edição
    const openEditModal = (member) => {
      setMemberToEdit(member);
      setValue("name", member.name);
      setValue("birthDate", member.birthDate);
      setValue("relationship", member.relationship);
      setValue("relationshipType", member.relationshipType);
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
        setMembers(
          members.map((member) =>
            member._id === memberToEdit._id ? response.data : member
          )
        );
        closeEditModal();
        toast.success("Membro editado com sucesso!");
      } catch (error) {
        console.error("Erro ao editar membro:", error);
        toast.error("Erro ao editar membro.");
      }
    };

    // Exclui um membro
    const handleDeleteMember = async (id) => {
      try {
        await api.delete(`/api/members/${id}`);
        setMembers(members.filter((member) => member._id !== id));
        toast.success("Membro excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir membro:", error);
        toast.error("Erro ao excluir membro.");
      }
    };

    return (
      <div className="p-4">
        <nav className="bg-white dark:bg-green-950 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="/home"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src="/tree.svg" className="h-8" alt="AG Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Árvore Genealógica
              </span>
            </a>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

              <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors ">Sair</button>

              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Árvore
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Cadastro
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Sobre
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Extra
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Formulário para adicionar membros */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-20 mb-6 bg-green-100 p-4 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-bold mb-4">Adicionar Membro</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Nome</label>
            <input
              {...register("name", { required: "O nome é obrigatório" })}
              placeholder="Nome"
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Data de Nascimento
            </label>
            <input
              type="date"
              {...register("birthDate")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Relação
            </label>
            <select
              {...register("relationship")}
              className="w-full p-2 border rounded"
            >
              <option value="pai">Pai</option>
              <option value="mãe">Mãe</option>
              <option value="irmã">Irmã</option>
              <option value="irmão">Irmão</option>
              <option value="avó">Avó</option>
              <option value="avô">Avô</option>
              <option value="tio">Tio</option>
              <option value="tia">Tia</option>
              <option value="primo">Primo</option>
              <option value="prima">Prima</option>
              <option value="sobrinho">Sobrinho</option>
              <option value="neto">Neto</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Tipo de Relação
            </label>
            <select
              {...register("relationshipType")}
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
            <p className="text-gray-700">
              Nenhum membro cadastrado. Adicione um novo membro!
            </p>
          </div>
        ) : (
          <div>
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
                    <label className="block text-gray-700 font-semibold mb-2">
                      Nome
                    </label>
                    <input
                      {...register("name", { required: "O nome é obrigatório" })}
                      className="w-full p-2 border rounded"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      {...register("birthDate")}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Relação
                    </label>
                    <input
                      {...register("relationship", {
                        required: "A relação é obrigatória",
                      })}
                      className="w-full p-2 border rounded"
                    />
                    {errors.relationship && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.relationship.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Tipo de Relação
                    </label>
                    <select
                      {...register("relationshipType")}
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
