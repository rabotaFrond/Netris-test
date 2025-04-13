import {
  EventsActionTypes,
  FETCH_EVENTS_ERROR,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  SET_CURRENT_TIME,
  SET_EVENTS,
} from "./eventsTypes";
import { Event } from "../types/types";
import { RootState } from "./store";

type State = {
  events: Event[];
  loading: boolean;
  error: string | null;
  currentTime: number;
};

const initialState: State = {
  events: [],
  loading: false,
  error: null,
  currentTime: 0,
};

const eventsReducer = (
  state = initialState,
  action: EventsActionTypes
): State => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_EVENTS_SUCCESS:
      return { ...state, loading: false, events: action.payload };
    case FETCH_EVENTS_ERROR:
      return { ...state, loading: false, error: action.error };
    case SET_EVENTS:
      return { ...state, events: action.payload };
    case SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    default:
      return state;
  }
};

export const selectEvents = (state: RootState) => state.events;
export const selectCurrentTime = (state: RootState) => state.currentTime;
export default eventsReducer;
