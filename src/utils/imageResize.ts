import { ResizeOptions } from "../hooks/useImageResize";
/**
 * Resizes an image based on provided options
 * @param dataUrl The data URL of the image
 * @param options Resize options including minWidth, minHeight, quality, and format
 * @returns A Promise that resolves to the resized image data URL
 */
export const resizeImage = async ({
  dataUrl,
  options,
}: {
  dataUrl: string;
  options: ResizeOptions;
}): Promise<string> => {
  const { minWidth = 100, minHeight = 100, quality = 0.92, format } = options;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // If the image is already larger than the minimum dimensions, return the original
      if (img.width >= minWidth && img.height >= minHeight) {
        resolve(dataUrl);
        return;
      }

      const originalImageWidth = img.width;
      const originalImageHeight = img.height;

      // Calculate new dimensions
      const canvasArm = Math.max(minWidth, minHeight) + 100;

      // Create a canvas to draw the resized image
      const canvas = document.createElement("canvas");
      canvas.width = canvasArm;
      canvas.height = canvasArm;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(dataUrl); // Fallback to original if context cannot be created
        return;
      }

      // Use better quality settings for the resize
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const xImageTopLeftCorner = canvas.width / 2 - originalImageWidth / 2;
      const yImageTopLeftCorner = canvas.height / 2 - originalImageHeight / 2;

      // Draw the image at the new size
      ctx.drawImage(
        img,
        xImageTopLeftCorner,
        yImageTopLeftCorner,
        originalImageWidth,
        originalImageHeight
      );

      // Get the MIME type from format or extract from dataUrl
      const mimeType =
        format ||
        dataUrl.substring(dataUrl.indexOf(":") + 1, dataUrl.indexOf(";"));

      // Get the new data URL
      const resizedDataUrl = canvas.toDataURL(mimeType, quality);

      resolve(resizedDataUrl);
    };

    img.onerror = () => {
      resolve(dataUrl); // Return original on error
    };

    img.src = dataUrl;
  });
};
