import { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { useEvent } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import { VideoView, useVideoPlayer } from "expo-video";
import {
  WuiButton,
  WuiButtonColor,
  WuiButtonSize,
  WuiText,
  WuiTextSize,
  WuiTitle,
  WuiTitleLook,
} from "wui-rn";

import { useDb } from "../../store/UseDb";

const videoSource =
  "https://wawawoom.fr/projects/cdn/wawawood/video/cub-peira/cub-peira-v.mp4";

export const HeroSection = () => {
  const { getHeroLamp } = useDb();
  const heroLamp = useMemo(() => getHeroLamp(), [getHeroLamp]);

  const player = useVideoPlayer(videoSource, (videoPlayer) => {
    videoPlayer.loop = true;
    videoPlayer.muted = true;
  });

  const { status } = useEvent(player, "statusChange", {
    status: player.status,
  });
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  useEffect(() => {
    if (!player.playing) {
      player.play();
    }
  }, [player]);

  useEffect(() => {
    if (status === "readyToPlay" && !isPlaying) {
      player.play();

      const replayTimeout = setTimeout(() => {
        if (!player.playing) {
          player.play();
        }
      }, 250);

      return () => clearTimeout(replayTimeout);
    }
  }, [player, status, isPlaying]);

  return (
    <View style={styles.videoContainer}>
      <VideoView
        style={styles.video}
        player={player}
        nativeControls={false}
        fullscreenOptions={{ enable: true }}
        allowsPictureInPicture
      />

      <View style={styles.infosContainer}>
        <WuiTitle look={WuiTitleLook.H4} style={styles.lampName}>
          {heroLamp?.name}
        </WuiTitle>

        {heroLamp?.description && (
          <WuiText size={WuiTextSize.L} style={styles.lampDescription}>
            {heroLamp?.description}
          </WuiText>
        )}

        <WuiButton
          color={WuiButtonColor.SECONDARY}
          size={WuiButtonSize.M}
          label="🔎&nbsp;&nbsp;Détails"
          style={styles.detailsButton}
        />
      </View>

      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.bottomGradient}
        pointerEvents="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: "100%",
    aspectRatio: 9 / 16,
    position: "relative",
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

  infosContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    marginBottom: 64,
    paddingHorizontal: 16,
    alignItems: "flex-start",
  },

  lampName: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
  },

  lampDescription: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "white",
  },

  detailsButton: {
    marginTop: 16,
  },
});
