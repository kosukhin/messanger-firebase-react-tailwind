import { useLoaderData } from "react-router-dom";

export function router<T = {}>() {
    return useLoaderData() as T;
}
