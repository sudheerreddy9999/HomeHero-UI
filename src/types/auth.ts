export interface SendOtpPayload {
  headers: {
    email: string;
  };
}

export interface VerifyOtpPayload {
    email: string;
    otp: string;
}
export interface GoogleCredentialResponse {
  body: {
    googletoken: string;
  };
}

export interface ApiResponse<T> {
  status: number;
  data: T;
}
