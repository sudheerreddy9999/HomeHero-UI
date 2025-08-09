import { AppDispatch } from "@/store/config/store";
import { fetchStart, fetchFailure } from "@/store/reducers/services";
import { AxiosResponse } from "axios";

type ApiCall<T> = () => Promise<AxiosResponse<{ data?: T }> | undefined>;

export async function handleApiCall<T>(
  dispatch: AppDispatch,
  apiCall: ApiCall<T>,
  onSuccess: (data: T) => void,
  startLoading: boolean = true
) {
  if (startLoading) dispatch(fetchStart());

  try {
    const response = await apiCall();

    if (response?.status === 200 && response.data?.data) {
      onSuccess(response.data.data);
    } else {
      const errorMessage = "Failed to fetch data";
      console.error(errorMessage);
      dispatch(fetchFailure(errorMessage));
    }
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    console.error(errorMessage);
    dispatch(fetchFailure(errorMessage));
  }
}
