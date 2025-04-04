export interface RawEvent {
  timestamp: number;
  duration: number;
  zone?: {
    left?: number | null;
    top?: number | null;
    width?: number | null;
    height?: number | null;
  };
}

export interface Event {
  id: number;
  timestamp: number;
  duration: number;
  x: number;
  y: number;
  width: number;
  height: number;
}
