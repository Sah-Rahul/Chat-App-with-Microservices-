class ResponseFormatter {
  static success(data = null, message = "Success", statusCode = 200) {
    return {
      success: true,
      message,
      data,
      statusCode,
      timestamp: new Date().toISOString(),
    };
  }

  static error(message = "Error", statusCode = 500, error = null) {
    return {
      success: false,
      message,
      data: null,
      error,
      statusCode,
      timestamp: new Date().toISOString(),
    };
  }

  static validationError(error = null, message = "Validation failed") {
    return {
      success: false,
      message,
      data: null,
      error,
      statusCode: 400,
      timestamp: new Date().toISOString(),
    };
  }

  static paginated(data = [], page = 1, limit = 10, total = 0) {
    const safeLimit = limit > 0 ? limit : 1;

    return {
      success: true,
      message: "Success",
      data,
      pagination: {
        page,
        limit: safeLimit,
        total,
        totalPages: Math.ceil(total / safeLimit),
      },
      statusCode: 200,
      timestamp: new Date().toISOString(),
    };
  }
}

export default ResponseFormatter;
