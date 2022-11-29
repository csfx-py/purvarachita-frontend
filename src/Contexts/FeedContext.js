import { createContext, useContext, useEffect, useState } from "react";
import API from "../Utils/API";
import { LoadingContext } from "./LoadingContext";

export const FeedContext = createContext();

export const FeedProvider = ({ children, userData }) => {
  const { setLoading } = useContext(LoadingContext);
  const [feedPosts, setFeedPosts] = useState(null);

  useEffect(() => {
    setFeedPosts(null);
  }, [userData]);

  const getPosts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/posts/get-all-posts");
      if (res.data.success) {
        setFeedPosts(res.data.posts || []);
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setFeedPosts([]);
      setLoading(false);
      return {
        success: false,
        error: error.response?.data || error,
      };
    }
  };

  const createPost = async (formData) => {
    try {
      setLoading(true);
      formData.append("user", userData._id);
      const res = await API.post("/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        getPosts();
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        throw new Error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.response?.data || error };
    }
  };

  const deletePost = async (postId) => {
    try {
      setLoading(true);
      const res = await API.delete("/posts/delete", {
        data: {
          postId,
        },
      });
      if (res.data.success) {
        getPosts();
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        throw new Error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.response?.data || error };
    }
  };

  const addComment = async (postId, comment) => {
    try {
      setLoading(true);
      const res = await API.post(`/posts/add-comment`, {
        postId,
        text: comment,
        user: userData._id,
        date: new Date(),
      });
      if (res.data.success) {
        getPosts();
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        throw new Error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.response?.data || error };
    }
  };

  return (
    <FeedContext.Provider
      value={{
        createPost,
        deletePost,
        getPosts,
        addComment,
        feedPosts,
        setFeedPosts,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};
