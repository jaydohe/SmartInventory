import { useState, useEffect } from 'react';

interface Dimensions {
  width: number | null;
  height: number | null;
}

const useImageDimensions = (url: string): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: null, height: null });

  useEffect(() => {
    const getImageDimensions = (url: string): Promise<Dimensions> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };
        img.onerror = (error) => {
          reject(error);
        };
        img.src = url;
      });
    };

    const fetchDimensions = async () => {
      try {
        const dimensions = await getImageDimensions(url);
        setDimensions(dimensions);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    if (url) {
      fetchDimensions();
    }
  }, [url]);

  return dimensions;
};

export default useImageDimensions;
