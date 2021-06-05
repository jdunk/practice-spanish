import { useEffect } from 'react';

function usePreloadImgsStatic(srcArray) {
  useEffect(() => {
    srcArray.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        // console.log(`preloaded ${img.src}`);
      };
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

function usePreloadImgsDynamic(srcArray) {
  useEffect(() => {
    srcArray.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        // console.log(`***** DYNAMIC preloaded ${img.src}`);
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(srcArray)]);
}

export {
  usePreloadImgsStatic,
  usePreloadImgsDynamic,
};