import { watch } from "../watch/watch";

export function mountedHook(fn: () => void) {
    watch(fn)
}
