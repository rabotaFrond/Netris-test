import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,
  SET_EVENTS,
  SET_CURRENT_TIME,
  EventsActionTypes,
} from "./eventsTypes";
import { Event } from "../types/types";

export const setEvents = (events: Event[]): EventsActionTypes => ({
  type: SET_EVENTS,
  payload: events,
});

export const setCurrentTime = (time: number): EventsActionTypes => ({
  type: SET_CURRENT_TIME,
  payload: time,
});

export const fetchEventsRequest = (): EventsActionTypes => ({
  type: FETCH_EVENTS_REQUEST,
});
