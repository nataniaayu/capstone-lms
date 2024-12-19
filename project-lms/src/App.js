import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import './css/App.css';
import './css/output.css';

import LoginPage from './pages/login-user';
import RegisterPage from './pages/register-user';
import LoginPageAdmin from './pages/login-admin';
import ForgotPasswordPage from './pages/forgot-pw';

import Materi from './user/materi';
import KelasSaya from './user/kelas-saya';
import CoursePage from './user/course';
import Catatan from './user/catatan';
import QuizPage from './user/quiz';
import ProfilePage from './user/profile';
import HelpPage from './user/help';
import QuizSuccess from './user/quiz-success';
import FeedbackPage from './user/feedback';
import FeedbackSuccessPage from './user/feedback-success';
import CertificatesPage from './user/certificate';
import ActivityLog from './user/activity-log';

import User from './admin/admin-user';
import UploadCourse from './admin/admin-course';
import Settings from './admin/admin-settings';
import Feedback from './admin/admin-feedback';
import GetHelp from './admin/admin-help';
import UploadVideo from './admin/admin-video';
import MaterialsList from './admin/admin-courses';
import UploadQuiz from './admin/admin-quiz';
import UploadMaterial from './admin/admin-materials';
import Breadcrumbs from './pages/breadcrumbs';

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
          
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login-admin" element={<LoginPageAdmin />} />
          <Route path="/register-user" element={<RegisterPage />} />
          <Route path="/forgot-pw" element={<ForgotPasswordPage />} />

          <Route path="/materi" element={<Materi />} />
          <Route path="/kelas-saya" element={<KelasSaya />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/quiz-success" element={<QuizSuccess />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/feedback-success" element={<FeedbackSuccessPage />} />
          <Route path="/certificate/:id" element={<CertificatesPage />} />
          <Route path="/catatan/:id" element={<Catatan />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/activity-log" element={<ActivityLog />} />

          <Route path="/admin-user" element={<><Breadcrumbs /><User /></>} />
          <Route path="/admin-course" element={<><Breadcrumbs /><UploadCourse /></>} />
          <Route path="/admin-settings" element={<><Breadcrumbs /><Settings /></>} />
          <Route path="/admin-feedback" element={<><Breadcrumbs /><Feedback /></>} />
          <Route path="/admin-help" element={<><Breadcrumbs /><GetHelp /></>} />
          <Route path="/upload-video/:materialId" element={<><Breadcrumbs /><UploadVideo /></>} />
          <Route path="/upload-quiz/:materialId" element={<><Breadcrumbs /><UploadQuiz /></>} />
          <Route path="/admin-courses" element={<><Breadcrumbs /><MaterialsList /></>} />
          <Route path="/upload-materials" element={<><Breadcrumbs /><UploadMaterial /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
