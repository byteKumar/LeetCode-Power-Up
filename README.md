
# LeetCode Power-Up

This extension injects a sidebar on LeetCode problem pages with:
1. Top 3–5 YouTube video solution links (via YouTube Data API)
2. A per-problem scratchpad (notes saved in chrome.storage)

## Setup & Installation

1. **Clone or unzip this folder.**
2. **API Key Setup:**
	- Create a `.env` file in the project root:
	  ```
	  VITE_YT_API_KEY=your_youtube_api_key_here
	  ```
	- In `src/content.js`, use:
	  ```js
	  // const API_KEY = import.meta.env.VITE_YT_API_KEY;
	  const API_KEY = 'YOUR_ACTUAL_API_KEY_HERE';
	  ```
	- For development, you can hardcode your API key. For production, use Vite to inject the key at build time.
3. **Load the extension in Chrome:**
	- Go to `chrome://extensions/`, enable “Developer mode”, click “Load unpacked” and select this folder.
4. **Usage:**
	- Navigate to any LeetCode problem (e.g. https://leetcode.com/problems/two-sum/) and enjoy!

## Using Environment Variables with Vite

Environment variables from `.env` files are not available natively in browser extensions. To use them:

1. Store your API key in `.env` as `VITE_YT_API_KEY`.
2. Reference it in your code as `import.meta.env.VITE_YT_API_KEY`.
3. Ensure your content script is bundled with Vite so the variable is replaced at build time.
	- See [Vite documentation](https://vitejs.dev/guide/env-and-mode.html) for details.

**Note:** If you do not bundle your content script, you must hardcode the API key in `content.js`.

## Security Warning

Never share your API key publicly. Always keep your `.env` file private and avoid committing it to version control.