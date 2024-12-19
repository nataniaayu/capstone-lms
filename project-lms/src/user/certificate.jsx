import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CourseLayout from "../layout/layout-course";
import { FaCertificate } from "react-icons/fa";

const CertificatePage = () => {
  const navigate = useNavigate(); // Inisialisasi navigasi
  const materialsId = localStorage.getItem("material_id");
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCertificate = async () => {
    if (!materialsId) {
      setError("Materials ID is missing.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Auth token is missing.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:8000/generate-certificate/${materialsId}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      setCertificate(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred while fetching the certificate."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificate();
  }, [materialsId]);

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Auth token is missing.");
        return;
      }

      if (!certificate || !certificate.certificate_id) {
        setError("Certificate ID is missing.");
        return;
      }

      const response = await axios.get(
        `http://localhost:8000/certificates/${certificate.certificate_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          responseType: "blob",
        }
      );

      if (response.headers["content-type"] !== "application/pdf") {
        setError("Failed to download PDF, server returned an unexpected type.");
        return;
      }

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${certificate.certificate_id}.pdf`;
      link.click();
    } catch (error) {
      console.error("Error fetching certificate:", error.response?.data || error.message);
      setError("An error occurred while downloading the certificate.");
    }
  };

  if (loading) {
    return (
      <CourseLayout>
        <div className="h-screen flex items-center justify-center bg-secondary-light">
          <h2 className="text-3xl font-bold text-secondary-dark">Loading certificate...</h2>
        </div>
      </CourseLayout>
    );
  }

  if (error) {
    return (
      <CourseLayout>
        <div className="h-screen flex items-center justify-center bg-red-50">
          <h2 className="text-2xl font-semibold text-red-600">{error}</h2>
        </div>
      </CourseLayout>
    );
  }

  if (!certificate) {
    return (
      <CourseLayout>
        <div className="h-screen flex items-center justify-center bg-secondary-light">
          <h2 className="text-3xl font-bold text-secondary-dark">Certificate not found</h2>
        </div>
      </CourseLayout>
    );
  }

  return (
    <CourseLayout>
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="relative bg-white shadow-2xl rounded-xl p-10 max-w-4xl w-full text-center border-4 border-yellow-500">
          <div className="absolute top-0 left-0 right-0 h-2 bg-yellow-500 rounded-t-xl"></div>
          <div className="flex justify-center mb-6">
            <FaCertificate className="text-yellow-500 text-8xl" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6 uppercase">
            Sertifikat Penyelesaian
          </h1>
          <p className="text-2xl text-gray-600 italic mb-4">
            Dengan bangga diberikan kepada
          </p>
          <p className="text-4xl font-bold text-gray-900 mb-6">{certificate.full_name}</p>
          <p className="text-lg text-gray-600 mb-2">
            Telah berhasil menyelesaikan course:
          </p>
          <p className="text-2xl font-semibold text-gray-800 mb-6">
            "{certificate.nama_kelas}"
          </p>
          <p className="text-md text-gray-600 mb-8">
            ID Sertifikat:
            <span className="font-bold text-gray-800 ml-2">{certificate.certificate_id}</span>
          </p>
          <div className="border-t-2 border-gray-200 w-full mb-6"></div>
          <div className="flex justify-between items-center text-gray-700 text-sm">
            <p className="font-medium">Dikeluarkan pada: {certificate.issued_date}</p>
            <p className="font-medium">Tanda Tangan</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-yellow-500 rounded-b-xl"></div>
          <button
            onClick={handleDownload}
            className="bg-customYellow1 text-black font-bold text-lg px-8 py-3 rounded-lg hover:bg-customYellow2 transition duration-300 mt-8"
          >
            Download Certificate
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/kelas-saya")} 
          className="bg-gray-500 text-white font-bold text-lg px-8 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
        >
          Back 
        </button>
      </div>
    </CourseLayout>
  );
};

export default CertificatePage;
