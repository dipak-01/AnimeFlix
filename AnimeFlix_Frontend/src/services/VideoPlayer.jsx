// import { useEffect, useRef } from "react";
// import Hls from "hls.js";
// import Plyr from "plyr";

// const useVideoPlayer = (source) => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const video = videoRef.current;

//     if (!video) return;

//     const defaultOptions = {};

//     if (!Hls.isSupported()) {
//       video.src = source;
//       new Plyr(video, defaultOptions);
//     } else {
//       const hls = new Hls({
//         debug: true,
//       });
//       hls.loadSource(source);

//       hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
//         const availableQualities = hls.levels.map((l) => l.height);
//         availableQualities.unshift(0); // prepend 0 to quality array

//         defaultOptions.quality = {
//           default: 0, // Default - AUTO
//           options: availableQualities,
//           forced: true,
//           onChange: (e) => updateQuality(e),
//         };

//         defaultOptions.i18n = {
//           qualityLabel: {
//             0: "Auto",
//           },
//         };

//         hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
//           const span = document.querySelector(
//             ".plyr__menu__container [data-plyr='quality'][value='0'] span"
//           );
//           if (hls.autoLevelEnabled) {
//             span.innerHTML = `AUTO (${hls.levels[data.level].height}p)`;
//           } else {
//             span.innerHTML = `AUTO`;
//           }
//         });

//         new Plyr(video, defaultOptions);
//       });

//       hls.attachMedia(video);
//       window.hls = hls;

//       function updateQuality(newQuality) {
//         if (newQuality === 0) {
//           window.hls.currentLevel = -1; // Enable AUTO quality if option.value = 0
//         } else {
//           window.hls.levels.forEach((level, levelIndex) => {
//             if (level.height === newQuality) {
//               window.hls.currentLevel = levelIndex;
//             }
//           });
//         }
//       }

//       return () => {
//         if (hls) {
//           hls.destroy();
//         }
//       };
//     }
//   }, [source]);

//   return videoRef;
// };

// export default useVideoPlayer;
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import Plyr from "plyr-react";
 // Assuming you're using a wrapper that supports ref forwarding

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
        videoRef.current.removeAttribute('src'); // Cleanup for native support
      };
    }
  }, [data]);

  return <Plyr ref={videoRef} source={{ type: 'video', sources: [{ src: data, type: 'video/mp4' }] }} />;
}