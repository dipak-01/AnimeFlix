import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import Plyr from 'plyr';

const useVideoPlayer = (source) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const defaultOptions = {};

    if (!Hls.isSupported()) {
      video.src = source;
      new Plyr(video, defaultOptions);
    } else {
      const hls = new Hls();
      hls.loadSource(source);

      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        const availableQualities = hls.levels.map((l) => l.height);
        availableQualities.unshift(0); // prepend 0 to quality array

        defaultOptions.quality = {
          default: 0, // Default - AUTO
          options: availableQualities,
          forced: true,
          onChange: (e) => updateQuality(e),
        };

        defaultOptions.i18n = {
          qualityLabel: {
            0: 'Auto',
          },
        };

        hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
          const span = document.querySelector(".plyr__menu__container [data-plyr='quality'][value='0'] span");
          if (hls.autoLevelEnabled) {
            span.innerHTML = `AUTO (${hls.levels[data.level].height}p)`;
          } else {
            span.innerHTML = `AUTO`;
          }
        });

        new Plyr(video, defaultOptions);
      });

      hls.attachMedia(video);
      window.hls = hls;

      function updateQuality(newQuality) {
        if (newQuality === 0) {
          window.hls.currentLevel = -1; // Enable AUTO quality if option.value = 0
        } else {
          window.hls.levels.forEach((level, levelIndex) => {
            if (level.height === newQuality) {
              window.hls.currentLevel = levelIndex;
            }
          });
        }
      }

      return () => {
        if (hls) {
          hls.destroy();
        }
      };
    }
  }, [source]);

  return videoRef;
};

export default useVideoPlayer;
