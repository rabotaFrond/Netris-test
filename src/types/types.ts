
export interface Event {
  timestamp: number;
  duration: number;
  zone?: {
    left?: number | null;
    top?: number | null;
    width?: number | null;
    height?: number | null;
  };
}
