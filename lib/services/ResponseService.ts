// deno-lint-ignore no-explicit-any
export function handleResponse<T = any>({
  message,
  status = 200,
  data,
}: {
  message: string;
  status: 500 | 400 | 200;
  data: T;
}) {
  return new Response(
    JSON.stringify(
      {
        status,
        message,
        data,
      },
      null,
      2,
    ),
    {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
