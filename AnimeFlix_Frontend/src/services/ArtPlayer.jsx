import { useState, useEffect, useRef } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import {Loader} from "../components/Loading";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";

export default function Player({ source, data, getInstance, ...rest }) {
  const artRef = useRef();
  const [loading, setLoading] = useState(true);

  const subtitles = data?.tracks;

  useEffect(() => {
    if (!artRef.current) {
      console.error("Artplayer container not found.");
      return;
    }

    const art = new Artplayer({
      container: artRef.current,
      settings: [
        {
          html: "Subtitle",
          tooltip: "English",
          selector: subtitles.map((sub) => ({
            default: sub.label === "English",
            html: sub.label,
            url: sub.file,
          })),
          onSelect: function (item) {
            art.subtitle.switch(item.url, {
              name: item.html,
            });
            return item.html;
          },
        },
      ],
      url: source,
      volume: 0.5,
      isLive: false,
      muted: false,
      autoplay: false,
      pip: true,
      autoSize: true,
      autoMini: false,
      screenshot: true,
      setting: true,
      loop: true,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      autoOrientation: true,
      fullscreenWeb: false,
      subtitleOffset: false,
      hotkey: true,
      miniProgressBar: false,
      mutex: true,
      backdrop: true,
      playsInline: true,
      autoPlayback: true,
      airplay: true,
      theme: "#23ade5",
      customType: {
        m3u8: function playM3u8(video, url, art) {
          if (Hls.isSupported()) {
            if (art.hls) art.hls.destroy();
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            art.hls = hls;
            art.on("destroy", () => hls.destroy());
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = url;
          } else {
            art.notice.show = "Unsupported playback format: m3u8";
          }
        },
      },
      lang: navigator.language.toLowerCase(),
      plugins: [
        artplayerPluginHlsQuality({
          control: true,
          getResolution: (level) => level.height + "p",
          title: "Quality",
          auto: "Auto",
        }),
      ],
      moreVideoAttr: {
        crossOrigin: "anonymous",
      },
      subtitle: {
        url:
          typeof subtitles !== "undefined"
            ? subtitles.find((sub) => sub.label === "English")?.file || ""
            : "",
        type: "vtt",
        style: {
          color: "#fff",
        },
        encoding: "utf-8",
      },
    });

    art.on("ready", () => {
      const video = art.template.video;
      if (video) {
        playM3u8(video, source, art);
      }

      // Video has been loaded
      setLoading(false);
    });

    if (getInstance && typeof getInstance === "function") {
      getInstance(art);
    }

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, [source, data, getInstance]);

  return (
    <div>
       
      <div ref={artRef} {...rest} className="video aspect-video"></div>
    </div>
  );
}
