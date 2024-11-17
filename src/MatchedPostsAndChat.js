import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import PostDetail from './PostDetail';
import Chat from './Chat';
import InviteAuthor from './InviteAuthor';

const MatchedPostsAndChat = ({ matchedPosts, currentUserId }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [connectionUserStatus, setConnectionUserStatus] = useState({});
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);

  useEffect(() => {
    checkAuthorsUserStatus(matchedPosts);
  }, [matchedPosts]);

  const checkAuthorsUserStatus = async (posts) => {
    const connectionIds = [...new Set(posts.flatMap(post => post.connections.map(conn => conn.id)))];
    try {
      const response = await fetch('/api/check-connections-user-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ connectionIds }),
      });
      const data = await response.json();
      setConnectionUserStatus(data.connectionStatus);
    } catch (error) {
      console.error('Error checking connections user status:', error);
    }
  };

  const handlePostSelect = (post) => {
    setSelectedPost(post);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
  };

  // Updated to handle both chat and invite actions
  const handleConnectClick = (connectionId) => {
    setSelectedAuthorId(connectionId);
    setShowModal(true);
  };

  // New function to handle invite action
  const handleInviteAuthor = (connectionId) => {
    setSelectedAuthorId(connectionId);
    setShowModal(true);
  };

  return (
    <div className="flex h-screen">
      <div className="w-full p-4 overflow-y-auto">
        {selectedPost ? (
          <div>
            <button
              onClick={handleBackToList}
              className="mb-4 flex items-center text-blue-600 hover:underline"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Matched Posts
            </button>
            <PostDetail 
              post={selectedPost} 
              onStartChat={handleConnectClick}
              onInviteAuthor={handleInviteAuthor}
              connectionUserStatus={connectionUserStatus}
            />
          </div>
        ) : (
          <PostList 
            posts={matchedPosts} 
            onPostSelect={handlePostSelect} 
          />
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            {connectionUserStatus[selectedAuthorId] ? (
              <Chat
                authorId={selectedAuthorId}
                onClose={() => setShowModal(false)}
              />
            ) : (
              <InviteAuthor
                authorId={selectedAuthorId}
                onClose={() => setShowModal(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchedPostsAndChat;