import { Action } from "redux";
import { Event } from "../types/types";

export const SET_EVENTS = "SET_EVENTS";
export const SET_CURRENT_TIME = "SET_CURRENT_TIME";
export const FETCH_EVENTS_REQUEST = "FETCH_EVENTS_REQUEST";
export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const FETCH_EVENTS_ERROR = "FETCH_EVENTS_ERROR";

export type SetEventsAction = Action<typeof SET_EVENTS> & { payload: Event[] };
export type SetCurrentTimeAction = Action<typeof SET_CURRENT_TIME> & {
  payload: number;
};
export type FetchEventsRequestAction = Action<typeof FETCH_EVENTS_REQUEST>;
export type FetchEventsSuccessAction = Action<typeof FETCH_EVENTS_SUCCESS> & {
  payload: Event[];
};
export type FetchEventsErrorAction = Action<typeof FETCH_EVENTS_ERROR> & {
  error: string;
};

export type EventsActionTypes =
  | SetEventsAction
  | SetCurrentTimeAction
  | FetchEventsRequestAction
  | FetchEventsSuccessAction
  | FetchEventsErrorAction;
