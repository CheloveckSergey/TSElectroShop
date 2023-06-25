import { ArrayParam, useQueryParam, withDefault } from "use-query-params";

export function useMyQueryParam(name: string) {
  const [queryOptions, setQueryOptions] = useQueryParam(name, withDefault(ArrayParam, []));
  return [queryOptions as string[], setQueryOptions];
}