import { Error as MongooseError } from "mongoose";
import { FormattedError } from "./types";

const formatServerError = (error: any): FormattedError => {
  let resErr: FormattedError = {
    message: error.message || "",
    code: error.code || 500,
  };

  // Handle custom validation errors
  if (error instanceof MongooseError.ValidationError) {
    const errorList = Object.values(
      error.errors
    ) as MongooseError.ValidatorError[];
    resErr.message = errorList[0]?.properties?.message || error.message;
    resErr.code = 400;
  }

  if (error?.errorResponse?.code === 11000) {
    resErr.message = "Value already recorded";
    resErr.code = 400;
  }

  if (error?.name === "CastError") {
    resErr.message = "Value in incorrect format";
    resErr.code = 400;
  }

  return resErr;
};

export default formatServerError;
