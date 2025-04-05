/**
 * Service to handle CORS proxy functionality for video streaming
 */

/**
 * Fetches content through a proxy to avoid CORS issues
 * @param {string} url - The URL to proxy
 * @returns {Promise<Response>} - The proxied response
 */
export const fetchWithProxy = async (url) => {
  try {
    // For frontend-only solutions, you can use:
    // return fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    
    // For a backend solution, you would call your own API:
    return fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
  } catch (error) {
    console.error('Error fetching through proxy:', error);
    throw error;
  }
};

/**
 * Processes m3u8 content to fix any relative URLs
 * @param {string} content - The m3u8 content
 * @param {string} baseUrl - The base URL for relative paths
 * @returns {string} - The processed content
 */
export const processM3u8Content = (content, baseUrl) => {
  // Extract the base path from the base URL
  const basePath = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1);
  
  // Replace relative URLs with absolute ones
  return content.replace(/(^[^#].+)/gm, (match) => {
    if (match.startsWith('http')) {
      return match;
    }
    return `${basePath}${match}`;
  });
};
