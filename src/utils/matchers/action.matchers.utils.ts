import { Action, ActionCreator } from "@reduxjs/toolkit";

type ActionCreatorWithType = {
  (...args: any[]): Action;
  type: string;
};
function isArrayOfActionCreators(
    actionCreators: ActionCreatorWithType | readonly ActionCreatorWithType[]
  ): actionCreators is readonly ActionCreatorWithType[] {
    return Array.isArray(actionCreators);
  }

/**
 * Utility function to check if an action matches a given action creator.
 * It can handle single or multiple action creators.
 *
 * @param actionCreators - One or more action creators to match against.
 * @returns A type guard function that checks if the action matches any of the provided action creators.
 */

// Overload for a single action creator
export function isActionOf<AC extends ActionCreatorWithType>(
  actionCreators: AC
): (action: Action) => action is ReturnType<AC>;

// Overload for an array of action creators
export function isActionOf<AC extends readonly ActionCreatorWithType[]>(
  actionCreators: AC
): (action: Action) => action is ReturnType<AC[number]>;

// Implementation
export function isActionOf(
  actionCreators: ActionCreatorWithType | readonly ActionCreatorWithType[]
) {
  return (action: Action) => {
    if (isArrayOfActionCreators(actionCreators)) {
      return actionCreators.some(
        (actionCreator) => action.type === actionCreator.type
      );
    } else {
      return action.type === actionCreators.type;
    }
  };
}
