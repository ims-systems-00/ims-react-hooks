import { useState, useCallback } from 'react';
import { resizeImage } from '../utils/imageResize';

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

function useImageResize (): {
  resizeImageFile: (file: File, options?: ResizeOptions) => Promise<ResizeResult>;
  isResizing: boolean;
  lastResult: ResizeResult | null;
} {
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<ResizeResult | null>(null);

  const validateImage = (file: File): string | null => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      return 'File is not an image';
    }

    // Check file size (10MB limit)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      return 'Image is too large (max 10MB)';
    }

    return null;
  };

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const resizeImageFile = useCallback(async (
    file: File,
    options: ResizeOptions = {}
  ): Promise<ResizeResult> => {
    setIsResizing(true);
    
    try {
      // Validate the image
      const validationError = validateImage(file);
      if (validationError) {
        return {
          file: null,
          dataUrl: null,
          originalFile: file,
          isResized: false,
          error: validationError
        };
      }
      const { format } = options;
      // Convert file to data URL
      const dataUrl = await readFileAsDataUrl(file);
      
      // Resize the image with all options
      const resizedDataUrl = await resizeImage({ dataUrl, options });
      
      // Check if image was actually resized
      const isResized = resizedDataUrl !== dataUrl;
      
      if (isResized) {
        // Convert data URL back to File
        const resizedBlob = await fetch(resizedDataUrl).then(r => r.blob());
        const resizedFile = new File([resizedBlob], file.name, { 
          type: format || file.type, 
          lastModified: file.lastModified 
        });
        
        const result = {
          file: resizedFile,
          dataUrl: resizedDataUrl,
          originalFile: file,
          isResized: true,
          error: null
        };
        
        setLastResult(result);
        return result;
      } else {
        // No resize needed
        const result = {
          file: file,
          dataUrl: dataUrl,
          originalFile: file,
          isResized: false,
          error: null
        };
        
        setLastResult(result);
        return result;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error during image resize';
      const result = {
        file: null,
        dataUrl: null,
        originalFile: file,
        isResized: false,
        error: errorMessage
      };
      
      setLastResult(result);
      return result;
    } finally {
      setIsResizing(false);
    }
  }, []);

  return {
    resizeImageFile,
    isResizing,
    lastResult
  };
};

export default useImageResize;
