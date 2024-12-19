import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import logoImage from "../assets/logo.png";
import heroImage from "../assets/hero-1.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Semua field harus diisi.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password baru harus minimal 8 karakter.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/change-password",
        {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password berhasil diperbarui! Anda akan diarahkan ke halaman login.");
        setTimeout(() => {
          navigate("/login-admin");
        }, 3000); 
      } else {
        setError("Terjadi kesalahan saat memperbarui password.");
      }
    } catch (err) {
      console.error("Kesalahan koneksi:", err);
      setError("Terjadi kesalahan saat menghubungi server.");
    }
  };

  const handleNavigateBack = () => {
    navigate("/login-admin");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center">
      {/* Left Section */}
      <div className="md:w-1/2 bg-white flex flex-col justify-center items-center p-8 relative animate-slideIn min-h-screen">
        <button
          onClick={handleNavigateBack}
          className="absolute top-8 left-8 text-gray-600 focus:outline-none"
        >
          <FaChevronLeft size={24} />
        </button>

        <img src={logoImage} alt="Deus Code Logo" className="mb-6 w-48 md:w-56" />

        <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
          Ganti Password
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Masukkan password baru untuk mengakses akun Anda.
        </p>

        {error && (
          <div className="flex items-center max-w-md w-auto mb-4 p-3 text-sm text-red-700 border-l-4 border-red-600 rounded-lg bg-red-100">
            <p className="flex-1 font-medium">{error}</p>
          </div>
        )}

        <form className="w-full max-w-sm space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-gray-700 font-medium mb-1 text-left"
            >
              Password Saat Ini<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="currentPassword"
              placeholder="Masukkan password saat ini"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-gray-700 font-medium mb-1 text-left"
            >
              Password Baru<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Masukkan password baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-1 text-left"
            >
              Konfirmasi Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Konfirmasi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-black font-semibold rounded-lg hover:bg-primary-hover transition duration-300"
          >
            Ganti Password
          </button>
        </form>
      </div>

      <div className="md:w-1/2 bg-primary relative flex items-center justify-center overflow-hidden min-h-screen">
        <img
          src={heroImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default ForgotPasswordPage;
