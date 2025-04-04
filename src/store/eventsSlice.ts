import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "./types";
import { RootState } from "../store/store";

interface EventsState {
  events: Event[];
}

const initialState: EventsState = {
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<Event[]>) {
      state.events = action.payload;
    },
    fetchEventsRequest() {},
  },
});

export const { setEvents, fetchEventsRequest } = eventsSlice.actions;
export const selectEvents = (state: RootState) => state.events.events;
export default eventsSlice.reducer;
