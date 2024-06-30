 
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import Plyr from "plyr-react";
 
export default function VideoPlayer({ data }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls({ debug: true });
      hls.loadSource(data); // Corrected usage
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoRef.current.play();
      });

      return () => {
        hls.destroy(); // Cleanup
      };
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = data;
      videoRef.current.addEventListener('loadedmetadata', function () {
        videoRef.current.play();
      });

      return () => {
        videoRef.current.removeAttribute('src'); 
      };
    }
  }, [data]);

  return <Plyr ref={videoRef} source={{ type: 'video', sources: [{ src: data, type: 'video/mp4' }] }} />;
}