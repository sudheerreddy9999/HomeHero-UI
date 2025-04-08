import { getIncreaseCountValue } from "../reducers/auth";

export const increaseCountValue = () => async (dispatch: any) => {
  try {
    dispatch(getIncreaseCountValue());
  } catch (error) {
    console.error(error);
  }
};
