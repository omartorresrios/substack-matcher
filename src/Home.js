import React, { useState } from 'react';
import axios from 'axios';
import MatchedPostsAndChat from './MatchedPostsAndChat';

function Home() {
  const [substackUrl, setSubstackUrl] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [matchedPosts, setMatchedPosts] = useState(null);

  const validateSubstackUrl = async (url) => {
    try {
      const response = await axios.post('http://localhost:3000/api/validate_url', { url });
      return response.data.is_valid;
    } catch (error) {
      console.error('Error validating URL:', error);
      throw error;
    }
  };

  const fetchMatchedPosts = async (url) => {
    // This is a mock function. Replace with actual API call when available.
    return [
      {
        title: "The Future of AI",
        body: "Artificial Intelligence is rapidly evolving...",
        authorName: "John Doe",
        authorPicture: "https://randomuser.me/api/portraits/men/1.jpg",
        substackLink: "https://johndoe.substack.com/p/future-of-ai",
        connections: [
          { 
            id: 1,
            name: "Jane Smith",
            profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
            substackLink: "https://janesmith.substack.com/p/ai-revolution"
          },
          { 
            id: 2,
            name: "Bob Johnson",
            profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
            substackLink: "https://bobjohnson.substack.com/p/ai-ethics"
          },
        ]
      },
      {
        title: "Blockchain Revolution",
        body: "Blockchain technology is changing the way we think about...",
        authorName: "Alice Brown",
        authorPicture: "https://randomuser.me/api/portraits/women/4.jpg",
        substackLink: "https://alicebrown.substack.com/p/blockchain-revolution",
        connections: [
          {
            id: 3,
            name: "Charlie Davis",
            profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
            substackLink: "https://charliedavis.substack.com/p/crypto-future"
          },
          {
            id: 4,
            name: "Eva Wilson",
            profilePicture: "https://randomuser.me/api/portraits/women/6.jpg",
            substackLink: "https://evawilson.substack.com/p/defi-explained"
          },
        ]
      },
    ];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const valid = await validateSubstackUrl(substackUrl);
      setIsValid(valid);
      if (valid) {
        const posts = await fetchMatchedPosts(substackUrl);
        setMatchedPosts(posts);
      }
    } catch (error) {
      setError('An error occurred while validating the URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setIsValid(null);
    setSubstackUrl('');
    setError(null);
    setMatchedPosts(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Substack Matcher</h1>
      
      {!matchedPosts ? (
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="substackUrl" className="block text-sm font-medium text-gray-700">
                Substack Publication URL
              </label>
              <input
                type="url"
                name="substackUrl"
                id="substackUrl"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="https://yourpublication.substack.com"
                value={substackUrl}
                onChange={(e) => setSubstackUrl(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Substack'}
            </button>
          </form>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
          {isValid === false && (
            <p className="mt-2 text-sm text-red-600">Invalid Substack URL. Please try again.</p>
          )}
        </div>
      ) : (
        <div>
          <button
            onClick={handleRetry}
            className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Analyze Another Substack
          </button>
          <MatchedPostsAndChat matchedPosts={matchedPosts} />
        </div>
      )}
    </div>
  );
}

export default Home;