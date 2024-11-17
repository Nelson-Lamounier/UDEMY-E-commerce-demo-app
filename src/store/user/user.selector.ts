import { createSelector } from "reselect";
import { UserState } from "./user.slice";
import { RootState } from "../store";

export const selectUserSlice = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  selectUserSlice,
  (user) => user.currentUser
);
