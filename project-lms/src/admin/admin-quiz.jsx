import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from "axios";
import UploadLayout from '../layout/layout-upload';

const UploadQuiz = () => {
  const [selectedCourse, setSelectedCourse] = useState("Pilih Course");
  const [selectedQuizNumber, setSelectedQuizNumber] = useState(null);
  const [isQuizNumberDropdownOpen, setIsQuizNumberDropdownOpen] = useState(false);
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [materials, setMaterials] = useState([]);
  const [materialsId, setMaterialsId] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
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

  const addNewNumber = () => {
    const nextNumber = numbers.length + 1;
    if (!numbers.includes(nextNumber)) {
      setNumbers((prevNumbers) => [...prevNumbers, nextNumber]);
      setSelectedQuizNumber(`No. ${nextNumber}`);
    }
  };

  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizOptions, setQuizOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);

  const handleAnswerChange = (index, e) => {
    const updateOptions = [...quizOptions];
    updateOptions[index][e.target.name] = e.target.value;
    setQuizOptions(updateOptions);

    console.log("Updated quizOptions:", updateOptions);
  };

  const handleSelectedQuizCourse = (e) => {
    setMaterialsId(e.target.value);
  };

  const toggleQuizNumberDropdown = () => {
    setIsQuizNumberDropdownOpen(!isQuizNumberDropdownOpen);
  };

  const handleQuizNumberSelect = (number) => {
    setSelectedQuizNumber(number);
    setIsQuizNumberDropdownOpen(false);
  };

  const handleQuizSubmit = async () => {
    console.log("Form data:", {
      quizQuestion,
      quizOptions,
      materialsId,
    });

    if (!quizQuestion || quizOptions.length < 2 || !materialsId) {
      console.log("Missing required fields:", { quizQuestion, quizOptions, materialsId });
      alert("Silakan isi semua kolom.");
      return;
    }

    const quizData = {
      pertanyaan: quizQuestion,
      options: quizOptions.map((option) => ({
        text: option.text,
        is_correct: option.isCorrect,
      })),
    };

    console.log("Quiz data to be sent:", quizData);

    try {
      const response = await axios.post(
        `http://localhost:8000/admin/materials/${materialsId}/quiz`,
        quizData,
        {
          headers: {
            "Content-Type": "application/json",
            "token": token,
          },
        }
      );

      console.log("Response from backend:", response);

      if (response.status === 201) {
        const { message } = response.data;
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
        });

        setQuizQuestion("");
        setQuizOptions([
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ]);
        setMaterialsId(null);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Terjadi kesalahan saat mengirim quiz.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <UploadLayout>
      <div className="pt-8 px-6">
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-xl space-y-8">
          <form onSubmit={handleQuizSubmit}>
            <h2 className="text-2xl font-bold text-center mb-6">UPLOAD QUIZ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-bold mb-4 text-customYellow2">Pertanyaan</h3>
                <textarea
                  id="quizQuestion"
                  placeholder="Masukkan pertanyaan"
                  value={quizQuestion}
                  onChange={(e) => setQuizQuestion(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-4 text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                ></textarea>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-customYellow2">Jawaban</h3>
                <div className="space-y-3">
                  {quizOptions.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="isCorrect"
                        value={option.isCorrect}
                        required
                      />
                      <input
                        type="text"
                        name="text"
                        value={option.text}
                        onChange={(e) => handleAnswerChange(index, e)}
                        placeholder="Masukkan jawaban"
                        className="flex-1 border border-gray-300 rounded-lg p-2 text-sm"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="relative">
                <label htmlFor="materialSelect" className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Course
                </label>
                <div className="relative">
                  <select
                    id="materialSelect"
                    value={selectedCourse}
                    onChange={handleSelectedQuizCourse}
                    className="w-full bg-white border-2 border-gray-300 rounded-lg p-4 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none pr-10"
                  >
                    <option value="">Pilih Course</option>
                    {materials.map((material) => (
                      <option key={material.id} value={material.id}>
                        {material.nama_kelas}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg text-gray-700 pointer-events-none" />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="numberDropdown" className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Nomor
                </label>
                <button
                  id="numberDropdown"
                  type="button"
                  className="w-full bg-white border-2 border-gray-300 rounded-lg p-4 text-base text-gray-700 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  onClick={toggleQuizNumberDropdown}
                >
                  {selectedQuizNumber || "Pilih Nomor"}
                  <FaChevronDown className="ml-2 text-lg text-gray-700" />
                </button>
                {isQuizNumberDropdownOpen && (
                  <div className="absolute mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg w-full z-10">
                    {numbers.map((number, index) => (
                      <div
                        key={index}
                        className="p-4 text-base text-center cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
                        onClick={() => handleQuizNumberSelect(`No. ${number}`)}
                      >
                        No. {number}
                      </div>
                    ))}
                    <div
                      className="p-4 text-base text-center cursor-pointer hover:bg-gray-100 text-customYellow2 font-bold"
                      onClick={addNewNumber}
                    >
                      Tambah Nomor
                    </div>
                  </div>
                )}
              </div>
              <div className="col-span-2 text-center">
                <button
                  type="button"
                  className="mt-6 px-8 py-3 bg-white text-customYellow2 text-lg rounded-md border-2 border-customYellow1 hover:bg-customYellow1 hover:text-white transition duration-300"
                  onClick={handleQuizSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </UploadLayout>
  );
};

export default UploadQuiz;
