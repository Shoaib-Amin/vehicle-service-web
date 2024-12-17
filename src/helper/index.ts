export function getCookie(name: string) {
    // Get all cookies as a string
    const cookies = document.cookie;
  
    // Create a regex to match the cookie with the given name
    const match = cookies.match('(^|;)\\s*' + name + '=([^;]*)');
  
    // If the cookie is found, return its value. Otherwise, return null.
    return match ? decodeURIComponent(match[2]) : null;
  }