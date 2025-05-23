export interface ResizeOptions {
    minWidth?: number;
    minHeight?: number;
    quality?: number;
    format?: 'image/jpeg' | 'image/png' | 'image/webp';
}
export interface ResizeResult {
    file: File | null;
    dataUrl: string | null;
    originalFile: File | null;
    isResized: boolean;
    error: string | null;
}
declare function useImageResize(): {
    resizeImageFile: (file: File, options?: ResizeOptions) => Promise<ResizeResult>;
    isResizing: boolean;
    lastResult: ResizeResult | null;
};
export default useImageResize;
