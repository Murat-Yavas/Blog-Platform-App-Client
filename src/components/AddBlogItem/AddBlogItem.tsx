import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import styles from "./AddBlogItem.module.css";
import { createOneBlog } from "../../redux/api/BlogApiCall";

const AddBlogItem = () => {
  const [showInputMessage, setShowInputMessage] = useState("");
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");

  const handleAddBlog = () => {
    if (
      title === "" ||
      topic === "Select input" ||
      topic === "" ||
      content === ""
    ) {
      setShowInputMessage("Inputs cannot be left blank");
    } else {
      setShowInputMessage("");
      const body = {
        title,
        topic,
        content,
        userId: +localStorage.getItem("currentUser")!,
        comment: null,
        username: localStorage.getItem("username")!,
        createDate: new Date().toISOString().slice(0, 10),
      };
      createOneBlog(dispatch, body);
      setTitle("");
      setTopic("");
      setContent("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={`${styles["add-blog-item"]}`}>
        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-custom-blue text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="React"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Topic
            </label>
            <select
              id="category"
              className="bg-gray-50 border border-custom-blue text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
              onChange={(e) => setTopic(e.target.value)}
              value={topic}
            >
              <option defaultValue="">Select input</option>
              <option value="techonology">Technology</option>
              <option value="nature">Nature</option>
              <option value="engineering">Engineering</option>
              <option value="science">Science</option>
              <option value="gaming">Gaming</option>
              <option value="trip">Trip</option>
            </select>
          </div>
        </div>
        <div className="col-span-2">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Content
          </label>
          <textarea
            id="description"
            rows={3}
            className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-custom-blue focus:ring-custom-blue focus:border-custom-blue "
            placeholder="Say something"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
        </div>

        <div
          className={`flex justify-between items-center ${styles["add-blog-button"]}`}
        >
          <div className="text-red-600">{showInputMessage}</div>
          <button
            className="text-white inline-flex items-center mt-2 bg-custom-blue hover:text-black duration-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => handleAddBlog()}
            disabled={
              localStorage.getItem("currentUser") !== null ? false : true
            }
            style={{
              cursor:
                localStorage.getItem("currentUser") !== null
                  ? ""
                  : "not-allowed",
            }}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogItem;
