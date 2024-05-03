import styles from "./Home.module.css";
import { useEffect } from "react";
import { fetchAllBlogs } from "../../redux/api/BlogApiCall";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Sidebar from "../Sidebar/Sidebar";
import HomeTextItem from "./HomeTextItem";

const Home = () => {
  const dispatch = useAppDispatch();
  const { blogs } = useAppSelector((state) => state.blog);

  useEffect(() => {
    getAllBlogs();
  }, []);

  const getAllBlogs = () => {
    fetchAllBlogs(dispatch);
  };

  // tüm content'i değil de sadece 100 kelimesini gösteren helper func yaz

  console.log(blogs);

  return (
    <div className="flex">
      <div className="flex-none w-64">
        <Sidebar />
      </div>
      <div className={`flex-1 w-32 ${styles["card-container"]}`}>
        {blogs.map((blog) => (
          <HomeTextItem blog={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
