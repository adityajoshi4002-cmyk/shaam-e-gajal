export interface Song {
  id: string;
  title: string;
  singer: string;
  album?: string;
  audioUrl: string;
  artworkUrl: string;
  backgroundImage: string;
  durationLabel?: string; // e.g. "5:04"
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentIndex: number;
}