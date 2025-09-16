import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { MediaPlayer, MediaProvider, Poster, Track } from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";

// Use backend proxy for m3u8 files
const TEST_VIDEO = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
const VideoPlayer = ({ src, data }) => {
  console.log(data)
  let proxiedSrc = src;
  if (!src || src.includes("dotstream.buzz") || src.includes("403")) {
    proxiedSrc = TEST_VIDEO;
  } else if (src && src.includes(".m3u8")) {
    proxiedSrc = `/api/proxy?url=${encodeURIComponent(src)}`;
  }
  console.log("VideoPlayer src:", proxiedSrc);
  return (
    <>
      <MediaPlayer
        src={proxiedSrc}
        viewType="video"
        streamType="on-demand"
        logLevel="warn"
        crossOrigin
        playsInline
        // autoPlay
      >
        <MediaProvider>
          {/* <Poster className="vds-poster" /> */}
          {data.tracks &&
            Array.isArray(data.tracks) &&
            data.tracks.map((track, index) => (
              <Track
                src={track.file}
                kind={track.kind}
                label={track.label}
                key={index}
                default={track.default === true}
              />
            ))}
        </MediaProvider>
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </>
  );
};

export default VideoPlayer;
