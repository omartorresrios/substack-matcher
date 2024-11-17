import React from 'react';

const PostList = ({ posts, onPostSelect }) => {
  if (!posts || !Array.isArray(posts) || posts.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Matched Posts</h2>
        <p>No matched posts available.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Matched Posts</h2>
      {posts.map((post) => (
        <div
          key={post.id || post.title}
          className="mb-4 p-4 border rounded cursor-pointer hover:bg-gray-100"
          onClick={() => onPostSelect(post)}
        >
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{post.body?.substring(0, 100) || ''}...</p>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Connections:</span>
            <div className="flex -space-x-2 overflow-hidden">
              {post.connections?.map((connection) => (
                <img
                  key={connection.id}
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src={connection.profilePicture}
                  alt={connection.name}
                  title={connection.name}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;