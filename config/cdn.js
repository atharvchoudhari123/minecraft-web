export const CDN = {
  user: "atharvchoudhari123",
  repo: "minecraft-web",
  branch: "main"
};

export function jsDelivr(path) {
  return `https://cdn.jsdelivr.net/gh/${CDN.user}/${CDN.repo}@${CDN.branch}/${path}`;
}
