/**
 * Media detection helpers for project gallery (images, GIFs, videos)
 */

export function isVideoUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  const cleanUrl = url.split("?")[0].toLowerCase();
  return (
    cleanUrl.includes("/video/upload/") ||
    /\.(mp4|webm|ogg|mov|m4v|ogv)$/i.test(cleanUrl)
  );
}

export function isGifUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  const cleanUrl = url.split("?")[0].toLowerCase();
  return (
    cleanUrl.endsWith(".gif") ||
    cleanUrl.includes(".gif") ||
    cleanUrl.includes("/image/upload/f_gif/")
  );
}
