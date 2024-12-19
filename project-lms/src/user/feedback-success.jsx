import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; 
import CourseLayout from "../layout/layout-course";

const FeedbackSuccessPage = () => { 
  const navigate = useNavigate();

  const materialId = localStorage.getItem("material_id");

  const handleCertificate = () => {
    navigate(`/certificate/${materialId}`);  
  };

  return (
    <CourseLayout>
      <div className="h-screen flex flex-col items-center justify-start bg-secondary-light px-6 pt-12">
        <div className="bg-white shadow-lg rounded-lg py-12 px-8 text-center max-w-3xl w-full">
          <h2 className="text-3xl font-bold text-secondary-dark mb-4">
            Thank you for your feedback
          </h2>

          <div className="flex justify-center mb-8">
            <div className="bg-yellow-100 rounded-full p-8">
              <FaCheckCircle className="text-yellow-500 text-5xl" />
            </div>
          </div>

          <p className="text-lg text-secondary-dark mb-8">
            Your feedback has been submitted successfully
          </p>

          <button
            onClick={() => handleCertificate(materialId)}
            className="bg-customYellow1 text-black font-bold text-lg px-8 py-3 rounded-lg hover:bg-customYellow2 transition duration-300"
          >
            Get Certificate
          </button>
        </div>
      </div>
    </CourseLayout>
  );
};

export default FeedbackSuccessPage;
