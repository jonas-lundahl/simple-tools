type ParseResult = SuccessResult | FailureResult;

type SuccessResult = {
  success: true;
  content: object;
};

type FailureResult = {
  success: false;
  error: string;
};

export function safeParseJSON(str: string): ParseResult {
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
