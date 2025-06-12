import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen flex flex-col justify-center items-center text-center px-4"
      style={{
        backgroundColor: "var(--bg-main)",
        color: "var(--text-main)",
      }}
    >
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl mb-2">Oops! Page not found.</p>
      <p className="text-lg text-yellow-500 font-semibold mb-6">
        Currently, I'm working on it!
      </p>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all"
      >
        <ArrowLeftCircle size={20} />
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
