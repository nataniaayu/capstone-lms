import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUpload, FaFileAlt, FaPlus } from 'react-icons/fa';
import AdminLayout from '../layout/layout-admin';

const MaterialsList = () => {
  const [materials, setMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [materialsPerPage] = useState(5);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/admin/materials', {
          headers: { token: token },
        });
        setMaterials(response.data);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };

    fetchMaterials();
  }, []);

  const handleUploadVideo = (materialId) => navigate(`/upload-video/${materialId}`);
  const handleUploadQuiz = (materialId) => navigate(`/upload-quiz/${materialId}`);
  const handleAddNewCourse = () => navigate('/upload-materials');

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  const totalPages = Math.ceil(materials.length / materialsPerPage);
  const startIndex = (currentPage - 1) * materialsPerPage;
  const endIndex = startIndex + materialsPerPage;
  const currentMaterials = materials.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const truncateText = (text, maxLength) => (text.length > maxLength ? text.substring(0, maxLength) + '...' : text);

  return (
    <AdminLayout>
      <div className="relative bg-gradient-to-r from-customYellow1 to-customYellow2 rounded-bl-3xl shadow-lg px-10 py-16 w-full mt-0 mr-0 ml-6">
        <div className="flex flex-col items-start space-y-4">
          <h1 className="text-white text-5xl font-bold mb-12">Ayo upload course untuk siswa</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-black">Course</h2>
            <button
              onClick={handleAddNewCourse}
              className="bg-yellow-500 text-white px-5 py-2 rounded-lg flex items-center hover:bg-yellow-600 transition duration-200 shadow-md"
            >
              <FaPlus className="mr-2" /> Add New
            </button>
          </div>

          {/* Wrap the table in a scrollable container */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white uppercase">
                <tr>
                  <th className="py-4 px-6 text-left">Gambar</th>
                  <th className="py-4 px-6 text-left">Nama Kelas</th>
                  <th className="py-4 px-6 text-left">Deskripsi</th>
                  <th className="py-4 px-6 text-center">Estimasi Selesai</th>
                  <th className="py-4 px-6 text-center">Latihan</th>
                  <th className="py-4 px-6 text-center">Rating</th>
                  <th className="py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {currentMaterials.map((material, index) => (
                  <tr key={material.id} className="hover:bg-yellow-50 transition duration-150">
                    <td className="py-4 px-6 text-center">
                      <img
                        src={material.gambar}
                        alt={material.nama_kelas}
                        className="w-16 h-16 object-cover rounded-lg mx-auto shadow-md"
                      />
                    </td>
                    <td className="py-4 px-6 font-medium">{material.nama_kelas}</td>
                    <td className="py-4 px-6">
                      {expandedId === material.id ? (
                        <>
                          {material.deskripsi_kelas}
                          <span
                            className="text-yellow-600 cursor-pointer ml-2 hover:underline"
                            onClick={() => toggleExpand(material.id)}
                          >
                            Tutup
                          </span>
                        </>
                      ) : (
                        <>
                          {truncateText(material.deskripsi_kelas, 80)}
                          {material.deskripsi_kelas.length > 80 && (
                            <span
                              className="text-yellow-600 cursor-pointer ml-2 hover:underline"
                              onClick={() => toggleExpand(material.id)}
                            >
                              Lihat Detail
                            </span>
                          )}
                        </>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">{material.estimasi_selesai}</td>
                    <td className="py-4 px-6 text-center">{material.jumlah_latihan}</td>
                    <td className="py-4 px-6 text-center font-bold text-yellow-600">{material.rating} ⭐</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleUploadVideo(material.id)}
                          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                          <FaUpload />
                        </button>
                        <button
                          onClick={() => handleUploadQuiz(material.id)}
                          className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition duration-200"
                        >
                          <FaFileAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center mt-6 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded bg-yellow-400 text-white font-medium hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-shadow shadow-md"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded font-medium shadow-md transition-all ${
                  currentPage === i + 1
                    ? "bg-yellow-500 text-white"
                    : "bg-yellow-300 hover:bg-yellow-400 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded bg-yellow-400 text-white font-medium hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-shadow shadow-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default MaterialsList;
