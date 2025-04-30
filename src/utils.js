/**
 * Generates a URL-friendly slug from a Substack post URL.
 * Example: https://winthenight.substack.com/p/my-awesome-post -> my-awesome-post
 * @param {string | undefined} url The Substack post URL.
 * @returns {string} The generated slug or a default fallback.
 * @deprecated This function was designed for Substack URLs and may not be needed with WordPress slugs.
 */
export function generateSlugFromUrl(url) {
  if (!url) {
    return 'untitled-post-' + Date.now(); // Fallback for missing URL
  }
  try {
    const parsedUrl = new URL(url);
    // Get the last part of the pathname, assuming it's the slug
    const pathParts = parsedUrl.pathname.split('/').filter(part => part); // Filter out empty strings
    const potentialSlug = pathParts[pathParts.length - 1];

    if (potentialSlug && pathParts[0] === 'p') { // Check if it looks like a post path
      // Basic sanitization (replace non-alphanumeric with hyphen, lowercase)
      return potentialSlug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    }
  } catch (e) {
    console.error(`Error generating slug from URL: ${url}`, e);
  }
  // Fallback if URL parsing or slug extraction fails
  return 'post-' + Date.now();
}

/**
 * Helper function to format date strings.
 * @param {string | undefined} dateString The date string to format (expects ISO 8601 format like YYYY-MM-DDTHH:mm:ss).
 * @returns {string} Formatted date or fallback text.
 */
export function formatDate(dateString) {
  if (!dateString) return 'Date unavailable';
  try {
    // Use UTC date parsing to avoid timezone issues if dateString is GMT/UTC
    const date = new Date(dateString);
    // Check if the date is valid
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date value");
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC' // Specify timezone if input is UTC/GMT
    });
  } catch (e) {
    console.error("Error formatting date:", dateString, e);
    return 'Invalid date';
  }
}
