import { formatTime } from "../utils/formatTime";

interface EventListProps {
  events: any[];
  currentTime: number;
  onEventClick: (timestamp: number) => void;
}

const EventList = ({ events, currentTime, onEventClick }: EventListProps) => {
  const isActive = (event: { timestamp: number; duration: number }) =>
    currentTime >= event.timestamp &&
    currentTime <= event.timestamp + event.duration;

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
