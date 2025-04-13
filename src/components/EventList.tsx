import { formatTime } from "../utils/formatTime";

interface EventListProps {
  events: any[];
  currentTime: number;
  onEventClick: (timestamp: number) => void;
}

const EventList = ({ events, currentTime, onEventClick }: EventListProps) => {
  const isActive = (event: { timestamp: number; duration: number }) => {
    const tolerance = 0.01;
    const roundedCurrentTime = Math.round(currentTime * 1000) / 1000;
    const roundedEventTimestamp = Math.round(event.timestamp * 1000) / 1000;
    const endTime = roundedEventTimestamp + event.duration;

    return (
      roundedCurrentTime >= roundedEventTimestamp - tolerance &&
      roundedCurrentTime <= endTime + tolerance
    );
  };

  const sortedEvents = [...events].sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div className="events-wrapper">
      <h3>События:</h3>
      <ul className="events-list">
        {sortedEvents.map((event) => (
          <li
            key={event.timestamp}
            className={`event-item ${
              isActive(event) ? "event-item-active" : ""
            }`}
            onClick={() => onEventClick(event.timestamp)}
          >
            ⏱ {formatTime(Math.round(event.timestamp * 1000))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
