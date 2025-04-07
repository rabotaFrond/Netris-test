import { setEvents, setCurrentTime, fetchEventsRequest } from "../../store/Actions";
import { SET_EVENTS, SET_CURRENT_TIME, FETCH_EVENTS_REQUEST } from "../../store/eventsTypes";
import { Event } from "../../types/types";

describe("Actions", () => {
  it("должен создать action для SET_EVENTS", () => {
    const mockEvents: Event[] = [
      {
        timestamp: 6.160356073346696,
        duration: 0.8361136523432808,
        zone: {
          left: 113.299598661696,
          top: 195.3639952425215,
          width: 126.18979937751924,
          height: 46.23090211142281,
        },
      },
    ];

    const expectedAction = {
      type: SET_EVENTS,
      payload: mockEvents,
    };

    expect(setEvents(mockEvents)).toEqual(expectedAction);
  });

  it("должен создать action для SET_CURRENT_TIME", () => {
    const mockTime = 12;

    const expectedAction = {
      type: SET_CURRENT_TIME,
      payload: mockTime,
    };

    expect(setCurrentTime(mockTime)).toEqual(expectedAction);
  });

  it("должен создать action для FETCH_EVENTS_REQUEST", () => {
    const expectedAction = {
      type: FETCH_EVENTS_REQUEST,
    };

    expect(fetchEventsRequest()).toEqual(expectedAction);
  });
});