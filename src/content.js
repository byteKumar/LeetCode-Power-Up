// == Content Script for LeetCode Power-Up ==

// Your YouTube Data API key here:
// const API_KEY = import.meta.env.VITE_YT_API_KEY;
const API_KEY = 'YOUR_ACTUAL_API_KEY_HERE';

// Utility: slug → Title Case
function slugToTitle(slug) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// 1) Determine problem slug and title
const pathParts = window.location.pathname.split('/');
const slug = pathParts[2] || 'unknown';
const title = slugToTitle(slug);

// 2) Build sidebar UI
const sidebar = document.createElement('div');
sidebar.id = 'leetcode-power-up-sidebar';
sidebar.innerHTML = `
  <h2>YouTube Solutions</h2>
  <ul id="yt-results"><li>Loading...</li></ul>
  <h2>Notes</h2>
  <textarea id="scratchpad" placeholder="Type your notes..."></textarea>
`;
document.body.appendChild(sidebar);

// 3) Load & save notes
const textarea = document.getElementById('scratchpad');
chrome.storage.local.get([slug], res => {
  textarea.value = res[slug] || '';
});
textarea.addEventListener('input', () => {
  const data = {};
  data[slug] = textarea.value;
  chrome.storage.local.set(data);
});

// 4) Fetch YouTube videos
const ul = document.getElementById('yt-results');
const query = encodeURIComponent(`${title} LeetCode solution`);
const url = `https://www.googleapis.com/youtube/v3/search`
  + `?part=snippet&type=video&maxResults=5`
  + `&q=${query}&key=${API_KEY}`;

fetch(url)
  .then(r => r.json())
  .then(data => {
    ul.innerHTML = '';
    if (!data.items) {
      ul.innerHTML = '<li>No results.</li>';
      return;
    }
    data.items.forEach(item => {
      const vid = item.id.videoId;
      const txt = item.snippet.title;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `https://www.youtube.com/watch?v=${vid}`;
      a.target = '_blank';
      a.textContent = txt;
      li.appendChild(a);
      ul.appendChild(li);
    });
  })
  .catch(err => {
    console.error('YouTube API error', err);
    ul.innerHTML = '<li>Error loading videos.</li>';
  });