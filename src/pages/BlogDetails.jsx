import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BlogDetails() {
  const { state: blog } = useLocation(); 
  const navigate = useNavigate();

  if (!blog) {
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        Blog not found. Please go back and select a blog.
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 animate-fade-in-up">
      <button
        onClick={() => navigate(-1)} 
        className="text-indigo-600 flex items-center gap-2 mb-6 hover:text-indigo-800 transition"
      >
        <ArrowLeft size={18} /> Back to Blogs
      </button>

      <h1 className="text-4xl font-extrabold text-gray-900 mb-3 drop-shadow-sm">
        {blog.title}
      </h1>

      <p className="text-sm text-indigo-500 font-medium mb-1">
        By {blog.user?.name || "Unknown Author"} •{" "}
        {new Date(blog.published_at).toLocaleDateString()}
      </p>

      <hr className="my-4 border-gray-200" />

      {blog.social_image && (
        <img
          src={blog.social_image}
          alt="Featured Blog Image"
          className="w-full h-auto object-cover rounded-lg mb-6"
        />
      )}

      <p className="text-lg text-gray-800 mb-4">{blog.description}</p>

      <div className="prose lg:prose-lg max-w-4xl text-justify text-gray-700">
        <p>{blog.content || "Content is not available."}</p>{" "}
      </div>

      <div className="mt-6">
        <p className="font-medium text-gray-700">Tags:</p>
        <ul className="list-disc pl-6">
          {blog.tag_list?.map((tag, index) => (
            <li key={index} className="text-indigo-600">
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Likes: </span>
          <span className="text-lg font-semibold">
            {blog.positive_reactions_count}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Comments: </span>
          <span className="text-lg font-semibold">{blog.comments_count}</span>
        </div>
      </div>

      {blog.flare_tag && (
        <div
          className="mt-6 inline-block px-4 py-2 rounded-full"
          style={{
            backgroundColor: blog.flare_tag.bg_color_hex,
            color: blog.flare_tag.text_color_hex,
          }}
        >
          {blog.flare_tag.name}
        </div>
      )}
    </div>
  );
}
