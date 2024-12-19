import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify'; 
import UploadLayout from '../layout/layout-upload';

const UploadVideo = () => {
  const [materials, setMaterials] = useState([]);
  const [materialsId, setMaterialsId] = useState('');
  const [judulVideo, setJudulVideo] = useState('');
  const [link, setLink] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8000/admin/materials', {
          headers: { "token": token },
        });
        setMaterials(response.data); 
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };
    fetchMaterials();
  }, []);
  
  const handleMaterialSelect = (e) => setMaterialsId(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!materialsId || !judulVideo || !link) {
      toast.error('Please fill out all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('judul_video', judulVideo);
    formData.append('jalur_file', link);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8000/admin/materials/${materialsId}/video`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data', "token": token },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success('Video uploaded successfully!');
      }
    } catch (error) {
      toast.error('Error uploading the video.');
    }
  };

  return (
    <UploadLayout>
        <div className="px-8"> 
            <div className="mt-12 max-w-4xl mx-auto bg-white p-10 shadow-lg rounded-xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Upload Video</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Informasi Video</h3>

                <div className="mb-4">
                    <label htmlFor="materialSelect" className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Course
                    </label>
                    <select
                    id="materialSelect"
                    value={materialsId}
                    onChange={handleMaterialSelect}
                    className="w-full border-2 border-gray-300 rounded-lg p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
                    >
                    <option value="">Pilih Course</option>
                    {materials.map((material) => (
                        <option key={material.id} value={material.id}>
                        {material.nama_kelas}
                        </option>
                    ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="videoTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Video
                    </label>
                    <input
                    type="text"
                    id="videoTitle"
                    value={judulVideo}
                    onChange={(e) => setJudulVideo(e.target.value)}
                    placeholder="Masukkan Judul Video"
                    className="w-full border-2 border-gray-300 rounded-lg p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div>
                    <label htmlFor="videoLink" className="block text-sm font-medium text-gray-700 mb-2">
                    Link Video
                    </label>
                    <input
                    type="text"
                    id="videoLink"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Masukkan Tautan Video"
                    className="w-full border-2 border-gray-300 rounded-lg p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
                    />
                </div>
                </div>

                <div className="text-center mt-6">
                <button
                    type="submit"
                    className="mt-12 px-8 py-3 bg-white text-customYellow2 text-lg rounded-md border-2 border-customYellow1 hover:bg-customYellow1 hover:text-white transition duration-300 mx-auto block"
                >
                    Upload Video
                </button>
                </div>
            </form>
            </div>
        </div>
    </UploadLayout>
  );
};

export default UploadVideo;
