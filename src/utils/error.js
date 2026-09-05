class ApiError extends Error {
  /**
   * @param {number} status
   * @param {string} [message]
   */
  constructor(status, message) {
    super(message);
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends ApiError {
  constructor(message) {
    super(404, message);
  }
}

class InternalServerError extends ApiError {
  constructor(message) {
    super(500, message);
  }
}

/**
 * @param {Response} res
 */
export function handleResponseError(res) {
  if (!res.ok) {
    switch (res.status) {
      case 404:
        throw new NotFoundError();
      default:
        throw new InternalServerError();
    }
  }
}
