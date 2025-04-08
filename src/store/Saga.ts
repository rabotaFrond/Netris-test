
import {
  call,
  put,
  takeEvery,
  CallEffect,
  PutEffect,
} from "redux-saga/effects";
import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,
} from "./eventsTypes";
import { Event } from "../types/types";

const API_URL = "/events.json"; //тут будет норм ссылка

export function* fetchEventsSaga(): Generator<CallEffect | PutEffect> {
  try {
    const response = yield call(fetch, API_URL);
    if (!response.ok) {
      throw new Error("Ошибка загрузки данных");
    }
    const data: Event[] = yield call([response, "json"]);

    yield put({ type: FETCH_EVENTS_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: FETCH_EVENTS_ERROR,
      error: error instanceof Error ? error.message : "Неизвестная ошибка",
    });
  }
}

export function* rootSaga() {
  yield takeEvery(FETCH_EVENTS_REQUEST, fetchEventsSaga);
}
