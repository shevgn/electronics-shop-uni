export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

class ServerError extends Error {
  public status: number;
  public details?: any;

  constructor(message: string, status: number = 500, details?: any) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

class NotFoundError extends ServerError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

class ValidationError extends ServerError {
  constructor(message = "Validation Error") {
    super(message, 400);
  }
}

class UnauthorizedError extends ServerError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export { ServerError, NotFoundError, ValidationError, UnauthorizedError };
