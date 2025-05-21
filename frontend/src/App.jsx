import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, Bounce } from 'react-toastify';
import Dashboard from './pages/Dashboard';
import About from './pages/about';
import Page404 from './pages/Page404';
import Contact from './pages/Contact';
import CaesPage from './pages/CaesPage';
import CaseDetails from './pages/CaseDetails';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
// import CasesPage from './pages/CasesPage/CasesPage';
import FilterPage from './pages/FilterPage/FilterPage';
import SchoolProfile from './pages/SchoolProfile/SchoolProfile';
import SchoolsPage from './pages/SchoolsPage/SchoolsPage';
import AddStudentPage from './pages/AddStudentPage/AddStudentPage';
import AddSchoolPage from './pages/AddSchoolPage/AddSchoolPage';
import StudentProfilePage from './pages/StudentProfilePage/StudentProfilePage';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Schools from './pages/Schools/Schools';
import StudentAdminProfile from './pages/StudentAdminProfile/StudentAdminProfile';
import SponsershipPage from './pages/SponsershipPage';
import SchoolAdminProfile from './pages/SchoolAdminProfile/SchoolAdminProfile';
import DonorAdminPage from './pages/DonorAdminProfile/donorAdminProfile';
import ParhoPakistanAdmin from './pages/ParhoPakistanAdmin/ParhoPakistanAdmin';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import SchoolDetails from './pages/SchoolDetails/SchoolDetails';
import StudentProfile from './pages/StudentProfile';
import StudentAdminPage from './pages/StudentAdminPage';
import SchoolAdmin from './pages/SchoolAdmin';
import Test from './components/Test';
function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={<SplashScreen isLoggedIn={isAuthenticated} />}
          />

          <Route path="/dashboard" element={<Dashboard />} />

          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <SignupPage />
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/casedetails" element={<CaseDetails />} /> */}
          <Route path="/cases" element={<FilterPage />} />
          <Route path="/casedetails/:id" element={<CaseDetails />} />

          <Route
            path="/school"
            element={
              isAuthenticated ? <SchoolsPage /> : <Navigate to={'/login'} />
            }
          />
          <Route path="/schools" element={<Schools />} />
          <Route
            path="/addstudent"
            element={
              <ProtectedRoute>
                <AddStudentPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addschool"
            element={
              <ProtectedRoute>
                <AddSchoolPage />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/studentprofile"
            element={
              isAuthenticated ? (
                <StudentProfilePage />
              ) : (
                <Navigate to={'/login'} />
              )
            }
          /> */}
          <Route
            path="/sponsership"
            element={
              isAuthenticated ? <SponsershipPage /> : <Navigate to={'/login'} />
            }
          />
          <Route
            path="/school/:id"
            element={
              <ProtectedRoute>
                <SchoolDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/:id"
            element={
              <ProtectedRoute>
                <StudentProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/student/id"
            element={
              <StudentAdminPage />
              // <StudentAdminProfile />
            }
          />
          <Route
            path="/admin/school/:id"
            element={
              // <SchoolAdmin />
              <SchoolAdminProfile />
            }
          />
          <Route path="/test" element={<Test />} />
          <Route path="/admin/donor/id" element={<DonorAdminPage />} />
          {/* <Route path="/admin/school/id" element={<DonorAdminPage />} /> */}
          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <ParhoPakistanAdmin />
              ) : (
                <Navigate to={'/login'} />
              )
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
