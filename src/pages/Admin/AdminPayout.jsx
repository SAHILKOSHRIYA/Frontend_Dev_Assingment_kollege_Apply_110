import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toPng } from "html-to-image";
import download from "downloadjs";
import {
  FileDown,
  ImageIcon,
  FileSpreadsheet,
  IndianRupee,
  Info,
  Settings2,
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchBlogData } from "../../redux/slice/blogSlice";
import { fetchNewsData } from "../../redux/slice/newsSlice";
import {
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const AdminPayout = () => {
  const dispatch = useDispatch();
  const { blogArticles } = useSelector((state) => state.blogs);
  const { articles } = useSelector((state) => state.news);
  const { totalPayout } = useSelector((state) => state.payout);

  const [rateBlog, setRateBlog] = useState("");
  const [rateNews, setRateNews] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const authorCounts = {};
  const key = "payoutRates";

  useEffect(() => {
    dispatch(fetchBlogData());
    dispatch(fetchNewsData());
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved) {
      setRateBlog(saved.blog || "");
      setRateNews(saved.news || "");
    }
  }, [dispatch]);

  const handleSaveRates = () => {
    localStorage.setItem(
      key,
      JSON.stringify({ blog: rateBlog, news: rateNews })
    );
    toast.success("Payout rates saved!");
  };

  const blogCount = blogArticles?.length || 0;
  const newsCount = articles?.length || 0;
  const total = blogCount * (rateBlog || 0) + newsCount * (rateNews || 0);

  const exportPNG = async () => {
    if (isDownloading)
      return toast.error("Please wait for the previous export to complete.");
    setIsDownloading(true);
    const node = document.getElementById("payout-summary");

    if (!node) {
      toast.error("Could not find payout summary section to export.");
      setIsDownloading(false);
      return;
    }

    try {
      const dataUrl = await toPng(node, { cacheBust: true });
      download(dataUrl, "payout_summary.png");
      toast.success("PNG exported successfully!");
    } catch (error) {
      console.error("Export PNG failed:", error);
      toast.error("PNG export failed. Try again.");
    } finally {
      setTimeout(() => setIsDownloading(false), 500);
    }
  };

  const exportCSV = () => {
    if (isDownloading)
      return toast.error("Please wait for the previous export to complete.");
    setIsDownloading(true);

    try {
      const csvContent =
        "Type,Count,Rate,Subtotal\n" +
        `Blogs,${blogCount},${rateBlog},${blogCount * rateBlog}\n` +
        `News,${newsCount},${rateNews},${newsCount * rateNews}\n` +
        `Total,,,${total}`;

      const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      download(blob, "payout_report.csv");
      toast.success("CSV exported!");
    } catch (err) {
      console.error("CSV export error:", err);
      toast.error("CSV export failed.");
    } finally {
      setTimeout(() => setIsDownloading(false), 500);
    }
  };

  const openGoogleSheets = () => {
    if (isDownloading)
      return toast.error("Please wait for the previous action to complete.");
    setIsDownloading(true);
    try {
      window.open(
        "https://docs.google.com/spreadsheets/create?usp=sheets_home",
        "_blank"
      );
      toast.success("Google Sheets opened!");
    } catch (err) {
      toast.error("Could not open Google Sheets.");
    } finally {
      setTimeout(() => setIsDownloading(false), 500);
    }
  };

  articles.forEach((article) => {
    let author = article?.creator;
    if (!author || author === "null") author = "Sahil";
    authorCounts[author] = (authorCounts[author] || 0) + 1;
  });

  const authorData = Object.entries(authorCounts).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <div
      id="payout-summary"
      className="max-w-7xl mx-auto rounded-2xl shadow-xl p-6 md:p-10 space-y-10"
      style={{
        backgroundColor: "var(--bg-main)",
        color: "var(--text-main)",
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <IndianRupee className="w-7 h-7" />
            Payout Calculator (Admin Panel)
          </h1>
          <p className="text-sm" style={{ color: "var(--text-subtle)" }}>
            Total payout:{" "}
            <span className="font-semibold text-indigo-700 dark:text-indigo-300">
              ₹{totalPayout}
            </span>
          </p>
        </div>
        <button
          onClick={handleSaveRates}
          className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
        >
          <Settings2 className="w-4 h-4" /> Save Rates
        </button>
      </div>

      <div
        className="border rounded-xl p-4 flex items-start gap-3 text-sm"
        style={{
          backgroundColor: "var(--bg-box)",
          borderColor: "var(--border)",
        }}
      >
        <Info className="text-indigo-600 mt-0.5" />
        <p>
          Total payout is calculated based on current article counts and rate
          settings.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-1">
            Blog Article Rate (₹)
          </label>
          <input
            type="number"
            value={rateBlog}
            onChange={(e) => setRateBlog(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
            style={{
              backgroundColor: "var(--bg-input)",
              color: "var(--text-main)",
              borderColor: "var(--border)",
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            News Article Rate (₹)
          </label>
          <input
            type="number"
            value={rateNews}
            onChange={(e) => setRateNews(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
            style={{
              backgroundColor: "var(--bg-input)",
              color: "var(--text-main)",
              borderColor: "var(--border)",
            }}
          />
        </div>
      </div>

      <div
        className="overflow-x-auto border rounded-lg"
        style={{ borderColor: "var(--border)" }}
      >
        <table className="w-full min-w-[400px] text-left text-sm">
          <thead className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
            <tr>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Count</th>
              <th className="p-3 border">Rate (₹)</th>
              <th className="p-3 border">Subtotal (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border">Blogs</td>
              <td className="p-3 border">{blogCount}</td>
              <td className="p-3 border">{rateBlog}</td>
              <td className="p-3 border">{blogCount * rateBlog}</td>
            </tr>
            <tr>
              <td className="p-3 border">News</td>
              <td className="p-3 border">{newsCount}</td>
              <td className="p-3 border">{rateNews}</td>
              <td className="p-3 border">{newsCount * rateNews}</td>
            </tr>
            <tr className="font-bold bg-indigo-50 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100">
              <td className="p-3 border">Total</td>
              <td className="p-3 border"></td>
              <td className="p-3 border"></td>
              <td className="p-3 border">{total}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-full h-[300px]">
        <h2 className="text-lg font-semibold mb-2">News Analytics by Author</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={authorData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-4 pt-2">
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <FileSpreadsheet className="w-4 h-4" /> Export CSV
        </button>
        <button
          onClick={exportPNG}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <ImageIcon className="w-4 h-4" /> Export PNG
        </button>
        <button
          onClick={openGoogleSheets}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          <FileDown className="w-4 h-4" /> Open Google Sheets
        </button>
      </div>
    </div>
  );
};

export default AdminPayout;
