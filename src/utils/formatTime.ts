export const formatTime = (timestamp: number): string => {
  const minutes = Math.floor(timestamp / 60000);
  const seconds = Math.floor((timestamp % 60000) / 1000);
  const milliseconds = timestamp % 1000;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}:${String(milliseconds).padStart(3, "0")}`;
};
