import React from 'react';

const PostDetail = ({ post, onStartChat, onInviteAuthor, connectionUserStatus }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <div className="flex items-center mb-4">
        <img src={post.authorPicture} alt={post.authorName} className="w-10 h-10 rounded-full mr-3" />
        <p className="font-semibold">{post.authorName}</p>
      </div>
      <p className="mb-4">{post.body}</p>
      <a 
        href={post.substackLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 hover:underline"
      >
        View on Substack
      </a>
      <h3 className="font-semibold mt-6 mb-2">Matched Connections:</h3>
      {post.connections.map((connection) => (
        <div key={connection.id} className="flex items-center mb-2">
          <img src={connection.profilePicture} alt={connection.name} className="w-8 h-8 rounded-full mr-2" />
          <div>
            <p className="font-semibold">{connection.name}</p>
            <button 
              onClick={() => connectionUserStatus[connection.id] 
                ? onStartChat(connection.id) 
                : onInviteAuthor(connection.id)
              } 
              className="text-blue-600 hover:underline text-sm"
            >
              {connectionUserStatus[connection.id] ? 'Chat' : 'Invite'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDetail;