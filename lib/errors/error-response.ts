import { ApiErrorCode } from "./error-codes";
import { ERROR_DEFINITIONS } from "./error-definitions";

export function errorResponse(code: ApiErrorCode) {
  const { status, message } = ERROR_DEFINITIONS[code];

  return Response.json({ error: message }, { status });
}
