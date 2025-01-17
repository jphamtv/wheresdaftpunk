class AudioService {
  private backgroundMusic: HTMLAudioElement | null = null;

  constructor() {
    this.backgroundMusic = new Audio('/src/assets/audio/background-music.mp3');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.10; // Set initial volume to 10%
  }

  playBackgroundMusic(): void {
    this.backgroundMusic?.play()
      .catch((error) => {
        console.error('Error playing background music:', error);
      });
  }

  stopBackgroundMusic(): void {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }
}

export const audioService = new AudioService();