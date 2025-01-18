export async function customFetch({
  url,
  cacheTag,
  body = null,
  method = "GET",
  contentType = "application/json",
}: {
  url: string;
  body?: any;
  method?: string;
  withToken?: boolean;
  contentType?: string;
  cacheTag?: string;
  cacheTime?: number;
}) {
  const hdrs = new Headers();
  const isFromServerComponent = hdrs.get("x-internal-action") === "true";

  // Construct the full URL
  const fullUrl = url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_BASE_URL || ""}/${url}`;

  const response = await fetch(fullUrl, {
    method: method,
    body:
      method !== "GET" && body
        ? contentType === "application/json"
          ? JSON.stringify(body)
          : body
        : undefined,
    next: {
      revalidate: 0,
      ...(cacheTag && { tags: [cacheTag] }),
    },
  });

  if (!response.ok) {
    const errorResponse = response.body ? await response.json() : {};
    console.log(errorResponse);
    const errorMessage = errorResponse.message || "Something went wrong";
    if (isFromServerComponent) {
      throw new Error(errorMessage);
    } else {
      return { error: errorMessage, success: false };
    }
  }
  return response.body ? await response.json() : {};
}
