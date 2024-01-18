"use client";
import React, { useState } from "react";

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Aneesh",
      content: "Excellent Services",
      likes: 10,
      comments: [
        { id: 1, user: "User1", text: "Great post!" },
        { id: 2, user: "User2", text: "I agree!" },
      ],
    },
    {
      id: 2,
      user: "Harsh",
      content: "Really helpful",
      likes: 5,
      comments: [{ id: 3, user: "User3", text: "Awesome!" }],
    },
    // Add more posts as needed
  ]);

  // State for tracking comments for each post separately
  const [commentInputs, setCommentInputs] = useState({});
  const [likedUsers, setLikedUsers] = useState({});

  const handleLike = (postId, user) => {
    if (!likedUsers[postId] || !likedUsers[postId][user]) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );

      setLikedUsers((prevLikedUsers) => ({
        ...prevLikedUsers,
        [postId]: { ...prevLikedUsers[postId], [user]: true },
      }));
    }
  };

  const handleComment = (postId, commentText) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: post.comments.length + 1,
                  user: "Harsh",
                  text: commentText,
                },
              ],
            }
          : post
      )
    );
    // Clear the comment input for the current post after submitting the comment
    setCommentInputs((prevCommentInputs) => ({
      ...prevCommentInputs,
      [postId]: "",
    }));
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-28 mb-8 ">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border p-4 rounded-md shadow-md w-full max-w-xl"
        >
          <div className="font-semibold text-green-500">{post.user}</div>
          <div className="text-lg font-semibold mb-2">{post.content}</div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                onClick={() => handleLike(post.id, post.user)}
                className={`${
                  likedUsers[post.id] && likedUsers[post.id][post.user]
                    ? "text-blue-500"
                    : "text-green-500"
                } hover:text-blue-700`}
              >
                Like ({post.likes})
              </button>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="border p-2 rounded-md w-40"
                value={commentInputs[post.id] || ""}
                onChange={(e) =>
                  setCommentInputs((prevCommentInputs) => ({
                    ...prevCommentInputs,
                    [post.id]: e.target.value,
                  }))
                }
              />
              <button
                onClick={() => handleComment(post.id, commentInputs[post.id])}
                className="border-2 border-green-500 text-green-500 rounded-full px-8 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white"
              >
                Comment
              </button>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {post.comments.map((comment) => (
              <p
                key={comment.id}
                className={`text-gray-700 ${
                  post.user === "Aneesh" || post.user === "Harsh"
                    ? "text-black"
                    : ""
                }`}
              >
                <span className="font-semibold">{comment.user}:</span>{" "}
                {comment.text}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Community;