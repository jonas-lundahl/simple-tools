import z from "zod";

const ErrorSchema = z.object({
  message: z.string(),
});

export function prettifyJson(text: string) {
  let prettified = "";
  let error = "";
  try {
    prettified = JSON.stringify(JSON.parse(text), null, 2);
  } catch (e) {
    if (text) {
      const parsedError = ErrorSchema.safeParse(e);
      if (parsedError.success) {
        error = parsedError.data.message;
      } else {
        error = "An error occurred";
      }
    }
  }
  return [prettified, error] as const;
}
