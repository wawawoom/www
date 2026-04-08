import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { VideoView, useVideoPlayer } from "expo-video";

const videoSource =
  "https://wawawoom.fr/projects/cdn/wawawood/video/cub-peira/cub-peira-v.mp4";

export function HeroVideo() {
  const player = useVideoPlayer(videoSource);

  useEffect(() => {
    player.loop = true;
    player.muted = true;
    player.play();
  }, [player]);

  return (
    <View style={styles.videoContainer}>
      <VideoView
        style={styles.video}
        player={player}
        nativeControls={false}
        fullscreenOptions={{ enable: true }}
        allowsPictureInPicture
      />

      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.bottomGradient}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    width: "100%",
    aspectRatio: 9 / 16,
    position: "absolute",
  },

  video: {
    ...StyleSheet.absoluteFillObject,
  },

  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
});
