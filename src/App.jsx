import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./firebase/ProtectedRoute";
import News from "./pages/News";
import Blogs from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import AdminPayout from "./pages/Admin/AdminPayout";
import AdminPanel from "./pages/AdminPanel";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
// Dummy change to trigger redeploy

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowed="user">
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="news" element={<News />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:id" element={<BlogDetails />} />
          </Route>

          <Route path="/admin" element={<AdminPanel />}>
            <Route path="payout" element={<AdminPayout />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
