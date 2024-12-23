import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Line , Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, ArcElement} from "chart.js";
import { FaArrowUp, FaUsers, FaEdit, FaTrash, FaUnlock, FaLock, FaPlus } from "react-icons/fa";
import AdminLayout from "../layout/layout-admin";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement,ArcElement );

const User = () => {
  const materialsId = localStorage.getItem("material_id");
  const [materials, setMaterials] = useState([]);
  const [setProgress] = useState(0); 
  const [courseData, setCourseData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "User Count",
        data: [],
        backgroundColor: "#f59e0b",
      },
    ],
  });

  // Data untuk Doughnut Chart
const doughnutData = {
  labels: materials.map((item) => item.nama_kelas),
    datasets: [
      {
        label: "Users Count",
        data: materials.map((item) => item.users_count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const totalUsers = materials.reduce((total, item) => total + item.users_count, 0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    axios
      .get("http://localhost:8000/admin/materials/user-count", {
        headers: {
          token: token, 
        },
      })
      .then((response) => {
        setMaterials(response.data);
      })
      .catch((error) => {
        console.error("Error fetching material data:", error);
      });
  }, []);

  useEffect(() => {
    if (materials.length > 0) {
      const labels = materials.map(item => item.nama_kelas);  
      const data = materials.map(item => item.users_count);  

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "User Count",
            data: data,
            backgroundColor: "#f59e0b",
            borderColor: "#f59e0b",
            borderWidth: 1,
            fill: false,
          },
        ],
      });
    }
  }, [materials]);

  const [achievements, setAchievements] = useState([]);

  // useEffect(() => {
  //   const materialsId = localStorage.getItem("materialsId");
  //   const token = localStorage.getItem("token");
    

  //   if (!materialsId || !token) {
  //     console.error("Materials ID or Token is missing in localStorage");
  //     return;
  //   }

  //   axios
  //     .get(`http://localhost:8000/admin/materials/${materialsId}/achievements`, {
  //       headers: {
  //         "token" : token
  //       },
  //     })
  //     .then((response) => {
  //       setCourseData(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching course data:", error);
  //     });

  //   axios
  //     .get(`http://localhost:8000/admin/materials/${materialsId}/achievements`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       const data = response.data.data;
  //       setChartData({
  //         labels: data.map((item) => item.name),
  //         datasets: [
  //           {
  //             label: "Capaian Pembelajaran",
  //             data: data.map((item) => item.progress),
  //             backgroundColor: "#f59e0b",
  //           },
  //         ],
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching progress data for chart:", error);
  //     });
  //     const interval = setInterval(() => {
  //     axios
  //       .get(`http://localhost:8000/admin/materials/${materialsId}/achievements`, {
  //         headers: {
  //           "token" :token
  //         },
  //       })
  //       .then((response) => {
  //         setProgress(response.data.progress);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching progress data:", error);
  //       });
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);

  

  const [users, setUsers] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  
  const fetchUsers = (materialsId) => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:8000/admin/materials/${materialsId}/users`, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        console.log("Fetched Users:", response.data); // Debug log
        setUsers(response.data); // Set state dengan data users
        setMessage("Data pengguna berhasil dimuat.");
        setIsError(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setMessage("Gagal memuat data pengguna.");
        setIsError(true);
      });
  };

  useEffect(() => {
    fetchUsers(materialsId);
  }, [materialsId]);;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  

    const handleEdit = (id) => {
      console.log("Editing employee with ID:", id);
    };
    
    const handleDelete = (id) => {
      console.log("Deleting employee with ID:", id);
    };
    
    const [courses, setCourses] = useState([]);

  // const fetchCourses = async () => {
  //   try {
  //     const response = await axios.get("");
  //     setCourses(response.data);
  //   } catch (error) {
  //     console.error("Error fetching courses:", error);
  //   }
  // };

  // const unlockLevel = async (course, name, level) => {
  //   try {
  //     const response = await axios.put("", {
  //       course,
  //       name,
  //       level,
  //     });
  //     if (response.status === 200) {
  //       alert(`Successfully unlocked ${level} for ${name} in ${course}`);
  //       fetchCourses(); 
  //     }
  //   } catch (error) {
  //     console.error("Error unlocking level:", error);
  //   }
  // };

  // const updateStatus = async (course, name, newStatus) => {
  //   try {
  //     const response = await axios.put("", {
  //       course,
  //       name,
  //       status: newStatus,
  //     });
  //     if (response.status === 200) {
  //       alert(`Status updated to "${newStatus}" for ${name} in ${course}`);
  //       fetchCourses(); 
  //     }
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchCourses();
  // }, []);

  const [employees, setEmployees] = useState([]); 
  const [message, setMessage] = useState(""); 
  const [isError, setIsError] = useState(false); 

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/admin/team", {
        headers: {
          "token": token,
        },
      })
      .then((response) => {
        setEmployees(response.data); 
        setMessage("Data berhasil dimuat.");
        setIsError(false); 
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
        setMessage("Gagal memuat data karyawan.");
        setIsError(true);
      });
  }
  return (
    <AdminLayout>
      <div className="relative bg-gradient-to-r from-customYellow1 to-customYellow2 rounded-bl-3xl shadow-lg px-10 py-16 w-full mt-0 mr-0 ml-6">
        <div className="flex flex-col items-start space-y-4">
          <h1 className="text-white text-5xl font-bold mb-12">Hello Admin !</h1>
        </div>
      </div>

      <div className="flex flex-row justify-between items-stretch gap-6 px-8 py-8 bg-gray-50">
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 w-2/3 flex flex-col h-[500px]">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">User Count Chart</h1>
          <div className="flex-grow">
            <Bar
              data={chartData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 w-1/3 h-[500px]">
          <div className="bg-white shadow-md rounded-lg p-8 text-center border border-gray-200 flex flex-col justify-center items-center h-[50%]">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Total Users</h2>
            <div className="text-6xl font-bold text-blue-600 flex items-center justify-center h-full">
              {totalUsers}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-row items-center justify-between h-[50%] w-full">
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-full h-full max-w-[400px] sm:max-w-[450px]">
              <Doughnut
                data={doughnutData}
                options={{
                  maintainAspectRatio: false, // Bebaskan aspect ratio
                  responsive: true, // Chart responsif
                  plugins: {
                    legend: {
                      position: 'bottom', // Posisi legend
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>    

      <div className="mt-12 bg-white shadow rounded-lg p-6 mx-6">
        {/* <h2 className="text-lg font-semibold mb-4">List Users</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{user.user_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.full_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-sm ${
                        user.status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => handleEdit(user.id)}
                    >
                      <FaEdit className="inline-block text-xl" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrash className="inline-block text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}

        {/* <div className="p-4">
          {courses.map((course, courseIndex) => (
            <div key={courseIndex} className="mb-6">
              <h2 className="font-bold text-lg text-orange-600 mb-4">
                {course.course}
              </h2>
              <div className="bg-white rounded-lg shadow-md">
                <table className="table-auto w-full border border-gray-300">
                  <thead className="bg-orange-100">
                    <tr>
                      <th className="border px-4 py-2">Name</th>
                      <th className="border px-4 py-2">Level 1</th>
                      <th className="border px-4 py-2">Level 2</th>
                      <th className="border px-4 py-2">Level 3</th>
                      <th className="border px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.students.map((student, studentIndex) => (
                      <tr key={studentIndex}>
                        <td className="border px-4 py-2">{student.name}</td>
                        <td className="border px-4 py-2 text-center">
                          {student.level1 ? (
                            <FaUnlock className="text-green-500 inline" />
                          ) : (
                            <button
                              className="text-blue-500 hover:underline"
                              onClick={() =>
                                unlockLevel(course.course, student.name, "level1")
                              }
                            >
                              <FaLock className="inline" />
                            </button>
                          )}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {student.level2 ? (
                            <FaUnlock className="text-green-500 inline" />
                          ) : (
                            <button
                              className="text-blue-500 hover:underline"
                              onClick={() =>
                                unlockLevel(course.course, student.name, "level2")
                              }
                            >
                              <FaLock className="inline" />
                            </button>
                          )}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {student.level3 ? (
                            <FaUnlock className="text-green-500 inline" />
                          ) : (
                            <button
                              className="text-blue-500 hover:underline"
                              onClick={() =>
                                unlockLevel(course.course, student.name, "level3")
                              }
                            >
                              <FaLock className="inline" />
                            </button>
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          <span
                            className={`px-3 py-1 rounded text-white ${
                              student.status === "Processing"
                                ? "bg-purple-500"
                                : "bg-yellow-500"
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td className="border px-4 py-2 text-center">
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                            onClick={() =>
                              updateStatus(course.course, student.name, "Processing")
                            }
                          >
                            Processing
                          </button>
                          <button
                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                            onClick={() =>
                              updateStatus(course.course, student.name, "Waiting")
                            }
                          >
                            Waiting
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>*/}
       <div className="container mx-auto mt-8 px-4">
  <h2 className="text-2xl font-bold mb-4 text-center">User</h2>

  {/* Tabel Data */}
  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-customYellow1 text-white">
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2">Email</th>
          <th className="border border-gray-300 px-4 py-2">Username</th>
          <th className="border border-gray-300 px-4 py-2">Full Name</th>
          <th className="border border-gray-300 px-4 py-2">Job Position</th>
          <th className="border border-gray-300 px-4 py-2">Country</th>
          <th className="border border-gray-300 px-4 py-2">City</th>
        </tr>
      </thead>
      <tbody>
        {currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <tr
              key={user.id}
              className="even:bg-gray-100 odd:bg-white hover:bg-gray-200"
            >
              <td className="border border-gray-300 px-4 py-2 text-center">
                {user.id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.username || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.full_name || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.job_position || "Tidak Ada"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.country || "Tidak Ada"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.city || "Tidak Ada"}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="8"
              className="border border-gray-300 px-4 py-2 text-center"
            >
              Tidak ada data pengguna tersedia.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>


      {/* Pagination */}
      <div className="flex justify-center mt-4">
  <nav>
    <ul className="inline-flex items-center space-x-1">
      {/* Tombol Previous */}
      <li>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
         className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
      </li>

      {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
        (_, index) => (
          <li key={index}>
            <button
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 border border-gray-300 rounded-md transition ${
                currentPage === index + 1
                  ? "bg-primary text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          </li>
        )
      )}

      {/* Tombol Next */}
      <li>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(users.length / usersPerPage)
          }
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</div>

    </div> 
    </div> 
        <div className="container mx-auto px-6 py-8">
        <div className="border-b-2 border-gray-200 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 text-left">Team</h1>
        </div>

        <div className="bg-white shadow-lg rounded-md p-8">
          {employees.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {employees.map((employee) => (
                <div
                  key={employee.id}
                  className="bg-gray-100 shadow-md p-6 rounded-lg flex flex-col items-center transition-transform duration-300 transform hover:scale-105"
                  style={{ minWidth: "250px", minHeight: "250px" }}
                >
                  <div className="w-20 h-20 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
                    <span className="text-gray-500 text-2xl font-bold">P</span>
                  </div>

                  <h3 className="text-lg font-semibold text-black mb-2">
                    {employee.nama_lengkap}
                  </h3>
                  <p className="text-gray-700 text-md mb-1">{employee.username}</p>
                  <p className="text-gray-700 text-md">{employee.email}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-black">
              Tidak ada data karyawan untuk ditampilkan.
            </p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default User;
