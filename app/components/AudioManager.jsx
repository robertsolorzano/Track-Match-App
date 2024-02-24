// AudioManager.jsx
import { Audio } from 'expo-av';

let currentSound = null;

export const playSound = async (uri) => {
  if (currentSound) {
    await currentSound.unloadAsync();
    currentSound = null;
  }
  const { sound } = await Audio.Sound.createAsync(
    { uri },
    { shouldPlay: true }
  );
  currentSound = sound;

  sound.setOnPlaybackStatusUpdate(async (status) => {
    if (status.didJustFinish) {
      // Automatically unload the sound once it has finished playing
      await sound.unloadAsync();
      currentSound = null;
    }
  });
};

export const stopSound = async () => {
  if (currentSound) {
    await currentSound.unloadAsync();
    currentSound = null;
  }
};
