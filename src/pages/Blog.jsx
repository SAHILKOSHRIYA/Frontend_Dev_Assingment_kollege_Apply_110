import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRightCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchBlogData } from "../redux/slice/blogSlice";

export default function Blogs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogArticles, status, error } = useSelector((state) => state.blogs);

  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    dispatch(fetchBlogData());
  }, [dispatch]);

  useEffect(() => {
    let filteredData = blogArticles;

    if (search)
      filteredData = filteredData.filter((blog) =>
        blog.title?.toLowerCase().includes(search.trim().toLowerCase())
      );
    if (author)
      filteredData = filteredData.filter((blog) =>
        blog.user?.name?.toLowerCase().includes(author.trim().toLowerCase())
      );
    if (dateFrom)
      filteredData = filteredData.filter(
        (blog) => new Date(blog.published_at) >= new Date(dateFrom)
      );
    if (dateTo)
      filteredData = filteredData.filter(
        (blog) => new Date(blog.published_at) <= new Date(dateTo)
      );

    setFiltered(filteredData);
  }, [search, author, dateFrom, dateTo, blogArticles]);

  const handleReadMore = (blog) => {
    navigate(`/dashboard/blogs/${blog.id}`, { state: blog });
  };

  return (
    <div className="p-6 animate-fade-in-up max-w-7xl mx-auto min-h-screen">
      <h1
        className="text-4xl font-bold text-indigo-700 mb-8 text-center tracking-tight drop-shadow-sm"
        style={{ color: "var(--text-main)" }}
      >
        Developer Blogs
      </h1>

      <div className="grid md:grid-cols-4 gap-4 bg-white p-4 rounded-2xl shadow border mb-10">
        <input
          type="text"
          placeholder="🔍 Search title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {status === "loading" && (
        <p className="text-gray-500 animate-pulse text-center">
          Loading blogs...
        </p>
      )}
      {status === "failed" && (
        <p className="text-red-500 text-center">Error: {error}</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered?.map((blog) => (
          <div
            key={blog.id}
            className="bg-gradient-to-br from-white via-slate-50 to-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
              {blog.title}
            </h2>
            <p className="text-sm text-indigo-500 font-medium mb-1">
              By {blog.user?.name || "Unknown Author"}
            </p>
            <p className="text-xs text-gray-400 mb-3">
              {new Date(blog.published_at).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 line-clamp-3 mb-4">
              {blog.description || "No description available."}
            </p>
            <button
              onClick={() => handleReadMore(blog)}
              className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Read More <ArrowRightCircle className="ml-1" size={16} />
            </button>
          </div>
        ))}
        {filtered.length === 0 && status === "succeeded" && (
          <p className="col-span-full text-center text-gray-500">
            No blogs found matching the filters.
          </p>
        )}
      </div>
    </div>
  );
}
