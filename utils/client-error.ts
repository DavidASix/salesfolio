import { FormattedError } from "./types";

const formatClientError = (error: any): FormattedError => {
  let resErr: FormattedError = {
    message: error.message || "An error occured",
    code: error.code || 500,
  };

  if (typeof error === "string") {
    resErr.message = error;
  } else if (error?.response?.data?.message) {
    resErr.message = error?.response?.data?.message;
    resErr.code = error?.response?.data?.code;
  } else if (error?.response?.status) {
    resErr.message = `An error occured with status ${error?.response?.status}`;
    resErr.code = error?.response?.status;
  }

  return resErr;
};

export default formatClientError;
