import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsData } from "../redux/slice/newsSlice";
import { ArrowRightCircle } from "lucide-react";

const News = () => {
  const dispatch = useDispatch();
  const { articles, status, error } = useSelector((state) => state.news);

  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    dispatch(fetchNewsData());
  }, [dispatch]);

  useEffect(() => {
    let data = articles;

    if (search)
      data = data.filter((a) =>
        a.title?.toLowerCase().includes(search.trim().toLowerCase())
      );
    if (author)
      data = data.filter((a) =>
        a.creator?.[0]?.toLowerCase().includes(author.trim().toLowerCase())
      );
    if (dateFrom)
      data = data.filter((a) => new Date(a.pubDate) >= new Date(dateFrom));
    if (dateTo)
      data = data.filter((a) => new Date(a.pubDate) <= new Date(dateTo));

    setFiltered(data);
  }, [articles, search, author, dateFrom, dateTo]);

  return (
    <div className="p-6 animate-fade-in-up max-w-7xl mx-auto min-h-screen">
      <h1
        className="text-4xl font-bold text-indigo-700 mb-8 tracking-tight drop-shadow-sm text-center"
        style={{ color: "var(--text-main)" }}
      >
        Trending News Highlights
      </h1>

      {status === "loading" && (
  <p className="text-gray-500 text-center animate-pulse mb-8 text-lg">
    🔄 Fetching latest news...
  </p>
)}

      <div className="grid md:grid-cols-4 gap-4 bg-white p-4 rounded-2xl shadow border mb-10">
        <input
          type="text"
          placeholder="Search title..."
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

      {
        status === "loading" && (
        <p className="text-gray-500 animate-pulse text-center">
          Loading news...
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white via-slate-50 to-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 border border-gray-200"
          >
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            )}
            <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
              {article.title}
            </h2>
            <p className="text-sm text-indigo-500 font-medium mb-1">
              By {article.creator?.[0] || "Unknown"}
            </p>
            <p className="text-xs text-gray-400 mb-3">
              {new Date(article.pubDate).toLocaleDateString()}
            </p>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-all"
            >
              Read More <ArrowRightCircle className="ml-1" size={16} />
            </a>
          </div>
        ))}
        {filtered.length === 0 && status === "succeeded" && (
          <p className="col-span-full text-center text-gray-500">
            No articles found matching filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default News;
