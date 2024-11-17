import React, { useState } from 'react';

const InviteAuthor = ({ authorId, onClose }) => {
  // State to manage the invitation message
  const [inviteMessage, setInviteMessage] = useState('');
  // State to manage the sending process
  const [isSending, setIsSending] = useState(false);
  // State to manage the result of the invitation
  const [inviteResult, setInviteResult] = useState(null);

  // Function to handle changes in the invitation message
  const handleMessageChange = (e) => {
    setInviteMessage(e.target.value);
  };

  // Function to send the invitation
  const sendInvitation = async () => {
    setIsSending(true);
    try {
      // Make an API call to send the invitation
      const response = await fetch('/api/send-author-invitation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authorId,
          message: inviteMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send invitation');
      }

      const result = await response.json();
      setInviteResult({ success: true, message: 'Invitation sent successfully!' });
    } catch (error) {
      console.error('Error sending invitation:', error);
      setInviteResult({ success: false, message: 'Failed to send invitation. Please try again.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="invite-author-modal">
      <h2 className="text-xl font-bold mb-4">Invite Author to Join</h2>
      
      {!inviteResult && (
        <>
          <p className="mb-4">
            This author is not yet a member of our platform. Send them an invitation to join!
          </p>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows="4"
            value={inviteMessage}
            onChange={handleMessageChange}
            placeholder="Add a personal message to your invitation (optional)"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
            onClick={sendInvitation}
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send Invitation'}
          </button>
        </>
      )}

      {inviteResult && (
        <div className={`mb-4 ${inviteResult.success ? 'text-green-600' : 'text-red-600'}`}>
          {inviteResult.message}
        </div>
      )}

      <button
        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default InviteAuthor;