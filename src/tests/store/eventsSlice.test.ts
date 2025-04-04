import eventsReducer, {
  setEvents,
  fetchEventsRequest,
} from "../../store/eventsSlice";
import { Event } from "../../store/types";

describe("eventsSlice", () => {
  const initialState = { events: [] };

  const mockEvents: Event[] = [
    { id: 1, timestamp: 10, duration: 5, x: 10, y: 20, width: 50, height: 60 },
    { id: 2, timestamp: 20, duration: 5, x: 15, y: 25, width: 55, height: 65 },
  ];

  it("должен возвращать начальное состояние", () => {
    expect(eventsReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("должен обработать setEvents", () => {
    const nextState = eventsReducer(initialState, setEvents(mockEvents));
    expect(nextState.events).toEqual(mockEvents);
    expect(nextState.events).toHaveLength(2);
  });

  it("должен возвращать состояние без изменений для fetchEventsRequest", () => {
    const stateWithEvents = { events: mockEvents };
    const nextState = eventsReducer(stateWithEvents, fetchEventsRequest());
    expect(nextState).toEqual(stateWithEvents);
  });
});
