import { createContext, useContext, useEffect, useState } from "react";
import API from "../Utils/API";
import { LoadingContext } from "./LoadingContext";
import { UserContext } from "./UserContext";

export const FeedContext = createContext();

export const FeedProvider = ({ children, userData }) => {
  const { setLoading } = useContext(LoadingContext);
  const { setUserData } = useContext(UserContext);

  const [feedPosts, setFeedPosts] = useState(null);

  useEffect(() => {
    setFeedPosts(null);
  }, [userData]);

  const getPost = async (postId) => {
    try {
      setLoading(true);
      const res = await API.get("/posts/get-post", {
        params: {
          postId,
        },
      });
      if (res.data.success) {
        return { success: true, post: res.data.post };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error,
      };
    } finally {
      setLoading(false);
    }
  };

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

  const purchase = async (postId) => {
    try {
      setLoading(true);
      const res = await API.post("/posts/purchase", {
        postId,
      });

      if (res.data?.success) {
        // redirect to stripe checkout
        window.location.href = res.data.url;
        return { success: true };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error,
      };
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (sessionId, postId) => {
    try {
      setLoading(true);
      const res = await API.post("/posts/verify-payment", {
        sessionId,
        postId,
      });
      if (res.data?.success) {
        setUserData((userData) => ({
          ...userData,
          paidForPosts: [...userData.paidForPosts, postId],
        }));
        return { success: true };
      } else {
        throw new Error(res.data?.message);
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error,
      };
    } finally {
      setLoading(false);
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
        setUserData((userData) => ({
          ...userData,
          posts: [...userData.posts, res.data.postId],
        }));
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
        setUserData((userData) => ({
          ...userData,
          posts: userData.posts.filter((post) => post._id !== postId),
        }));
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

  const deleteComment = async (postId, commentId) => {
    try {
      setLoading(true);
      const res = await API.delete(`/posts/delete-comment`, {
        data: {
          postId,
          commentId,
        },
      });
      if (res.data.success) {
        getPosts();
        return { success: true };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const likeOrDislikePost = async (postId) => {
    try {
      const res = await API.patch(`/posts/like-or-dislike`, {
        postId,
      });

      if (res.data?.success) {
        getPosts();
        return { success: true };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    }
  };

  const searchPosts = async (query) => {
    try {
      setLoading(true);
      const res = await API.get(`/posts/search`, {
        params: {
          query,
        },
      });

      if (res.data.success) {
        setFeedPosts(res.data.posts || []);
        return { success: true };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const getMyPosts = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/posts/get-my-posts`);

      if (res.data.success) {
        setFeedPosts(res.data.posts || []);
        return { success: true };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const getUserPosts = async (userId) => {
    try {
      setLoading(true);
      const res = await API.get(`/posts/get-user-posts`, {
        params: {
          userId,
        },
      });

      if (res.data.success) {
        setFeedPosts(res.data.posts || []);
        return { success: true, user: res.data?.user };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  return (
    <FeedContext.Provider
      value={{
        createPost,
        deletePost,
        getPost,
        getPosts,
        purchase,
        verifyPayment,
        addComment,
        deleteComment,
        likeOrDislikePost,
        searchPosts,
        getUserPosts,
        getMyPosts,
        feedPosts,
        setFeedPosts,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};
