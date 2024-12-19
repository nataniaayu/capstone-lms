import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import UploadLayout from "../layout/layout-upload";

const UploadMaterial = () => {
    const [materials, setMaterials] = useState([]);
    const [materialsId, setMaterialsId] = useState("");
    const [namaKelas, setNamaKelas] = useState('');
    const [deskripsiKelas, setDeskripsiKelas] = useState('');
    const [estimasiSelesai, setEstimasiSelesai] = useState('');
    const [jumlahLatihan, setJumlahLatihan] = useState('');
    const [rating, setRating] = useState('');
    const [kategori, setKategori] = useState('');
    const [gambar, setGambar] = useState('');
    const [totalLevels, setTotalLevels] = useState('');
    const token = localStorage.getItem("token");
  
    const handleUploadMaterial = async (e) => {
      e.preventDefault();
    
      const materialData = {
        nama_kelas: namaKelas || '',
        deskripsi_kelas: deskripsiKelas || '',
        estimasi_selesai: estimasiSelesai || 0,
        jumlah_latihan: jumlahLatihan || 0,
        rating: rating || 0,
        kategori: kategori || '',
        gambar: gambar || '',
      };
    
      console.log("Payload to send:", materialData);
    
      try {
        const response = await axios.post(
          "http://localhost:8000/admin/materials", 
          materialData, 
          {
            headers: {
              'Content-Type': 'application/json',
              token: token, 
            },
          }
        );
    
        console.log('Material uploaded:', response.data);
    
        if (response.data.message) {
          toast.success(response.data.message);
        } else {
          toast.success('Material uploaded successfully!');
        }
  
        setNamaKelas('');
        setDeskripsiKelas('');
        setEstimasiSelesai(0);
        setJumlahLatihan(0);
        setRating(0);
        setKategori('');
        setGambar('');
      } catch (error) {
        console.error('Error uploading material:', error.response ? error.response.data : error.message);
    
        toast.error(`Failed to upload material: ${error.response ? error.response.data : error.message}`);
      }
    };
    
    useEffect(() => {
      const fetchMaterials = async () => {
        try {
          const token = localStorage.getItem("token");
    
          const response = await axios.get('http://localhost:8000/admin/materials', {
            headers: {
              "token": token,
            },
          });
    
          setMaterials(response.data); 
        } catch (error) {
          console.error('Error fetching materials:', error);
        }
      };
    
      fetchMaterials();
    }, []);
    
    const handleMaterialSelect = (e) => {
      setMaterialsId(e.target.value); 
    };
  
  return (
    <UploadLayout>
    <div className="pt-10 px-8">
        <div className="mt-12 max-w-4xl mx-auto bg-white p-10 shadow-lg rounded-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Upload Material</h2>
          <form onSubmit={handleUploadMaterial} className="space-y-8">

            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Informasi Umum</h3>

              <div className="mb-4">
                <label htmlFor="namaKelas" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Kelas
                </label>
                <input
                  id="namaKelas"
                  type="text"
                  placeholder="Masukkan nama kelas"
                  value={namaKelas}
                  onChange={(e) => setNamaKelas(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="deskripsiKelas" className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Kelas
                </label>
                <textarea
                  id="deskripsiKelas"
                  placeholder="Masukkan deskripsi kelas"
                  value={deskripsiKelas}
                  onChange={(e) => setDeskripsiKelas(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Detail Kelas</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="estimasiSelesai" className="block text-sm font-medium text-gray-700 mb-2">
                    Estimasi Selesai (jam)
                  </label>
                  <input
                    id="estimasiSelesai"
                    type="number"
                    placeholder="Masukkan estimasi selesai dalam jam"
                    value={estimasiSelesai}
                    onChange={(e) => setEstimasiSelesai(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="jumlahLatihan" className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah Latihan
                  </label>
                  <input
                    id="jumlahLatihan"
                    type="number"
                    placeholder="Masukkan jumlah latihan"
                    value={jumlahLatihan}
                    onChange={(e) => setJumlahLatihan(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                    Rating (0-5)
                  </label>
                  <input
                    id="rating"
                    type="number"
                    placeholder="Masukkan rating (opsional)"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="totalLevels" className="block text-sm font-medium text-gray-700 mb-2">
                    Total Levels
                  </label>
                  <input
                    id="totalLevels"
                    type="number"
                    placeholder="Masukkan total levels"
                    value={totalLevels}
                    onChange={(e) => setTotalLevels(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Tambahan</h3>
              <div>
                <div className="mb-4">
                  <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori
                  </label>
                  <select
                    id="kategori"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)} 
                    className="w-full border-2 border-gray-300 rounded-lg p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    {materials.map((material) => (
                      <option key={material.id} value={material.kategori}>
                        {material.kategori}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-sm mt-2">Selected Kategori: {kategori}</p>
              </div>
              <div>
                <label htmlFor="gambar" className="block text-sm font-medium text-gray-700 mb-2">
                  URL Gambar
                </label>
                <input
                  id="gambar"
                  type="url"
                  placeholder="Masukkan URL gambar"
                  value={gambar}
                  onChange={(e) => setGambar(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
                  
                />
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="mt-12 px-8 py-3 bg-white text-customYellow2 text-lg rounded-md border-2 border-customYellow1 hover:bg-customYellow1 hover:text-white transition duration-300 mx-auto block"
              >
                Submit Material
              </button>
            </div>
          </form>
        </div>
        </div>
    </UploadLayout>
  );
};

export default UploadMaterial;
