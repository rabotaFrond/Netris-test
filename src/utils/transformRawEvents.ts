import { RawEvent, Event } from "../store/types";

export const transformRawEvents = (rawEvents: RawEvent[]): Event[] => {
  if (!Array.isArray(rawEvents)) return [];
  return rawEvents.map((rawEvent, index) => ({
    id: index + 1,
    timestamp: rawEvent.timestamp,
    duration: rawEvent.duration,
    x: rawEvent.zone?.left ?? 0,
    y: rawEvent.zone?.top ?? 0,
    width: rawEvent.zone?.width ?? 0,
    height: rawEvent.zone?.height ?? 0,
  }));
};
