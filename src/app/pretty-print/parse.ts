type ParseResult<T> = SuccessResult<T> | FailureResult;

type SuccessResult<T> = {
  success: true;
  content: T;
};

type FailureResult = {
  success: false;
  error: string;
};

export function safeParseJSON(str: string): ParseResult<object> {
  try {
    const json = JSON.parse(str);
    return {
      success: true,
      content: json,
    };
  } catch (e) {
    if (e instanceof SyntaxError) {
      return {
        success: false,
        error: e.message,
      };
    } else {
      return {
        success: false,
        error: "An unknown error occurred during JSON parsing.",
      };
    }
  }
}
