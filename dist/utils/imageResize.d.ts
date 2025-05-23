import { ResizeOptions } from "../hooks/useImageResize";
/**
 * Resizes an image based on provided options
 * @param dataUrl The data URL of the image
 * @param options Resize options including minWidth, minHeight, quality, and format
 * @returns A Promise that resolves to the resized image data URL
 */
export declare const resizeImage: ({ dataUrl, options, }: {
    dataUrl: string;
    options: ResizeOptions;
}) => Promise<string>;
