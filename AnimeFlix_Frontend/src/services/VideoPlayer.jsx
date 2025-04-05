import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { MediaPlayer, MediaProvider, Poster, Track } from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";

// Modify the component to handle CORS for m3u8 files
const VideoPlayer = ({ src, data }) => {
  // Process the URL to handle CORS issues
  const getProxiedUrl = (url) => {
    if (!url) return '';
    
    // Check if it's an m3u8 file
    if (url.includes('.m3u8')) {
      // Use a CORS proxy
      // Option 1: Use a service like cors-anywhere (for development)
      // return `https://cors-anywhere.herokuapp.com/${url}`;
      
      // Option 2: Use your own backend proxy (recommended for production)
      return `/api/proxy?url=${encodeURIComponent(url)}`;
      
      // Option 3: If you're using Cloudflare Workers or similar service
      // return `https://your-worker.your-subdomain.workers.dev/?url=${encodeURIComponent(url)}`;
    }
    
    return url;
  };

  const proxiedSrc = getProxiedUrl(src);

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

export default VideoPlayer;
