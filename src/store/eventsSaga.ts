import { put, takeEvery } from "redux-saga/effects";
import { setEvents, fetchEventsRequest } from "./eventsSlice";
import eventsData from "../assets/events.json";
import { transformRawEvents } from "../utils/transformRawEvents";

export function* fetchEventsSaga() {
  try {
    const transformedEvents = transformRawEvents(eventsData);
    yield put(setEvents(transformedEvents));
  } catch (error) {
    console.error("Ошибка при загрузке событий:", error);
  }
}

export default function* rootSaga() {
  yield takeEvery(fetchEventsRequest.type, fetchEventsSaga);
}
