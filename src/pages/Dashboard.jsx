import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { Newspaper, LayoutDashboard, NotebookPen } from "lucide-react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsData } from "../redux/slice/newsSlice";
import useTheme from "../hooks/useTheme";

const COLORS = ["#6366F1", "#EC4899", "#14B8A6"];
const dummyChartData = [
  { name: "Articles", value: 6 },
  { name: "Blogs", value: 32 },
  { name: "Pending Payouts", value: 18 },
];

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { theme, toggle } = useTheme();

  const { articles } = useSelector((state) => state.news);
  const { blogArticles } = useSelector((state) => state.blogs);
  const { totalPayout, blogPrice, newsPrice } = useSelector(
    (state) => state.payout
  );

  const [authorData, setAuthorData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isMainDashboard = location.pathname === "/dashboard";

  const newsCount = articles.length || 0;
  const blogCount = blogArticles.length || 0;
  const totalPendingPayout = newsCount * newsPrice + blogCount * blogPrice;

  useEffect(() => {
    if (!user || user.isAdmin) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    dispatch(fetchNewsData());
    const interval = setInterval(() => {
      dispatch(fetchNewsData());
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (articles.length > 0) {
      const authorCounts = {};
      const typeCounts = { News: 0, Blog: 32 };
      articles.forEach((item) => {
        const author = item.creator?.[0] || "Unknown";
        authorCounts[author] = (authorCounts[author] || 0) + 1;
        typeCounts["News"] += 1;
      });

      setAuthorData(
        Object.keys(authorCounts).map((name) => ({
          name,
          value: authorCounts[name],
        }))
      );
      setTypeData(
        Object.keys(typeCounts).map((name) => ({
          name,
          value: typeCounts[name],
        }))
      );
    }
  }, [articles]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      className="flex flex-col md:flex-row h-screen font-sans overflow-hidden relative"
      style={{ backgroundColor: "var(--bg-main)", color: "var(--text-main)" }}
    >
      <div
        className="md:hidden flex items-center justify-between p-4 shadow z-50"
        style={{ backgroundColor: "var(--bg-card)" }}
      >
        <h1 className="text-xl font-bold text-indigo-600">Dashboard</h1>
        <button
          className="focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isSidebarOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* <aside
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-color)",
        }}
        className={`fixed md:static top-0 left-0 h-full md:h-screen w-64 border-r shadow-lg z-40 transform  ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 p-4 flex flex-col`}
      >
        <div className="space-y-10 flex-grow mt-14">
          <h2 className="text-3xl font-bold tracking-wide text-indigo-600">
            Dashboard
          </h2>

          <section
            className="flex items-center gap-4 md:flex-col md:items-center md:text-center p-4 rounded-xl border-l-4 border-indigo-500 shadow"
            style={{ backgroundColor: "var(--bg-main)" }}
          >
            <img
              src="/img.jpg"
              alt="User Avatar"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow"
            />
            <div className="flex-1 md:flex-none">
              <h3
                className="text-lg font-bold"
                style={{ color: "var(--text-main)" }}
              >
                {user?.name || "User"}
              </h3>
              <p className="text-sm" style={{ color: "var(--text-subtle)" }}>
                {user?.email || "johndoe@example.com"}
              </p>

              <span className="mt-1 inline-block text-xs px-2 py-1 border border-indigo-200 text-indigo-600 rounded-full">
                Role: {user?.role || "User"}
              </span>
            </div>
          </section>

          <nav className="space-y-2">
            <Link
              to="/dashboard"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all"
            >
              <LayoutDashboard size={20} /> Overview
            </Link>
            <Link
              to="/dashboard/news"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all"
            >
              <Newspaper size={20} /> News
            </Link>
            <Link
              to="/dashboard/blogs"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all"
            >
              <NotebookPen size={20} /> Blogs
            </Link>
          </nav>
        </div>
        <button
          onClick={toggle}
          className="w-full bg-indigo-100 dark:bg-gray-700 hover:bg-indigo-200 dark:hover:bg-gray-600 py-2 rounded-xl text-indigo-600 dark:text-white font-semibold shadow-md transition-all"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        {" "}
        <button
          onClick={handleLogout}
          className="w-full bg-rose-500 hover:bg-rose-600 py-2 rounded-xl text-white font-semibold shadow-md transition-all mt-4"
        >
          Logout
        </button>
      </aside> */}
      <aside
  style={{
    backgroundColor: "var(--bg-card)",
    borderColor: "var(--border-color)",
  }}
  className={`fixed md:static top-0 left-0 h-full md:h-screen w-64 border-r shadow-lg z-40 transform ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-300 ease-in-out md:translate-x-0 p-4 flex flex-col justify-between`}
>
  <div>
    {/* Top content: avatar, nav */}
    <h2 className="text-3xl font-bold tracking-wide text-indigo-600 mt-14">Dashboard</h2>
    <section className="...">{/* Avatar and user info */}</section>
    <nav className="...">{/* Nav links */}</nav>
  </div>

  {/* Bottom fixed buttons */}
  <div className="space-y-2 mt-4">
    <button
      onClick={toggle}
      className="w-full bg-indigo-100 dark:bg-gray-700 hover:bg-indigo-200 dark:hover:bg-gray-600 py-2 rounded-xl text-indigo-600 dark:text-white font-semibold shadow-md transition-all"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
    <button
      onClick={handleLogout}
      className="w-full bg-rose-500 hover:bg-rose-600 py-2 rounded-xl text-white font-semibold shadow-md transition-all"
    >
      Logout
    </button>
  </div>
</aside>


      {/* content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto h-full">
        {isMainDashboard ? (
          <>
            <header className="mb-10 mt-3 animate-fade-in-up">
              <h1
                className="text-4xl font-extrabold drop-shadow-sm"
                style={{ color: "var(--text-main)" }}
              >
                Welcome Back
              </h1>
              <p className="mt-2" style={{ color: "var(--text-subtle)" }}>
                Here's your news overview and analytics.
              </p>
            </header>

            {/* Cards */}
            <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 animate-fade-in-up">
              <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl border-l-4 border-indigo-500">
                <h2 className="text-sm text-gray-500">Total Articles</h2>
                <p className="text-3xl font-bold text-indigo-700 mt-2">
                  {newsCount}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl border-l-4 border-pink-500">
                <h2 className="text-sm text-gray-500">Total Blogs</h2>
                <p className="text-3xl font-bold text-pink-600 mt-2">
                  {blogCount}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl border-l-4 border-teal-500">
                <h2 className="text-sm text-gray-500">Pending Payouts</h2>
                <p className="text-3xl font-bold text-teal-600 mt-2">
                  ₹{totalPendingPayout}
                </p>
              </div>
            </section>

            {/* Graphs Section */}
            <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 animate-fade-in-up">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Payout Distribution
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={dummyChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {dummyChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Articles & Blogs
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dummyChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Trends</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={dummyChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#EC4899"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* News Analytics Section */}
            <section className="space-y-6 animate-fade-in-up">
              <h2
                className="text-2xl font-extrabold drop-shadow-sm"
                style={{ color: "var(--text-main)" }}
              >
                <span>News Analytics</span>
              </h2>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Articles by Author
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={authorData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#14B8A6"
                        label
                      >
                        {authorData.map((entry, index) => (
                          <Cell
                            key={`cell-author-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Articles by Type
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={typeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="value"
                        fill="#EC4899"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
