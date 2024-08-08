import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { MediaPlayer, MediaProvider, Poster, Track } from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";

export default function ({ src, data }) {
  return (
    <>
      <MediaPlayer
        src={src}
        viewType="video"
        streamType="on-demand"
        logLevel="warn"
        crossOrigin
        playsInline
        // autoPlay
      >
        <MediaProvider>
          {/* <Poster className="vds-poster" /> */}
          {data.tracks.map((track, index) => (
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
}
