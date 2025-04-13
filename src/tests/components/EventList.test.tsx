import { render, screen, fireEvent } from "@testing-library/react";
import EventList from "../../components/EventList";

const events = [
  { id: 1, timestamp: 1, duration: 5 },
  { id: 2, timestamp: 10, duration: 3 },
];

describe("EventList", () => {
  it("отображает список событий", () => {
    render(
      <EventList events={events} currentTime={0} onEventClick={() => {}} />
    );
    expect(screen.getAllByText(/⏱/)).toHaveLength(2);
  });

  it("вызывает onEventClick при клике", () => {
    const mockClick = jest.fn();
    render(
      <EventList events={events} currentTime={0} onEventClick={mockClick} />
    );
    fireEvent.click(screen.getAllByRole("listitem")[0]);
    expect(mockClick).toHaveBeenCalledWith(events[0].timestamp);
  });
});
