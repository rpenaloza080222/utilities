// deno-lint-ignore-file
export function validateZodSchema(schema: any, values: any) {
  const result = schema.safeParse(values);
  if (!result.success) {
    const formatted = result.error.issues;
    const messages: Record<string, string> = {};
    for (const iterator of formatted) {
      const { path: [key], message } = iterator;
      messages[key] = message;
    }

    return {
      success: false,
      messages,
    };
  }
  return {
    success: true,
    messages: null,
  };
}
