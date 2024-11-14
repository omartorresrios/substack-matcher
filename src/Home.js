import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [substackUrl, setSubstackUrl] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateSubstackUrl = async (url) => {
    try {
      const response = await axios.post('http://localhost:3000/api/validate_url', { url });
      return response.data.is_valid;
    } catch (error) {
      console.error('Error validating URL:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const valid = await validateSubstackUrl(substackUrl);
      setIsValid(valid);
    } catch (error) {
      setError('An error occurred while validating the URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Substack Matcher</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="substackUrl" className="block text-sm font-medium text-gray-700">
                    Substack Publication URL
                  </label>
                  <div className="mt-1">
                    <input
                      type="url"
                      name="substackUrl"
                      id="substackUrl"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2.5"
                      placeholder="https://yourpublication.substack.com"
                      value={substackUrl}
                      onChange={(e) => setSubstackUrl(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Validating...' : 'Add'}
                  </button>
                </div>
              </form>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
              {isValid !== null && !error && (
                <p className={`mt-2 text-sm ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {isValid ? 'Valid Substack URL' : 'Invalid Substack URL'}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;