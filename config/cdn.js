export const CDN = {
  user: "YOUR_USER",
  repo: "YOUR_REPO",
  branch: "main"
};

export function jsDelivr(path) {
  return `https://cdn.jsdelivr.net/gh/${CDN.user}/${CDN.repo}@${CDN.branch}/${path}`;
}
