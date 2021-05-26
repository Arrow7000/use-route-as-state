import { renderHook } from "@testing-library/react-hooks";
import { Dispatch, SetStateAction } from "react";
import { getHistoryWrapper } from './RouterWrapper';

export type StateActions<TState> = {
    readonly get: TState | undefined;
    readonly set: Dispatch<SetStateAction<TState>>;
}
type HookAction<TState> = (props: unknown) => [TState | undefined, Dispatch<SetStateAction<TState>>]
const renderer = <TState>(action: HookAction<TState>) => {
    const { wrapper, history } = getHistoryWrapper()
    const { result } = renderHook(action, { wrapper })

    return {
        result,
        history,
        state: {
            get get() {
                return result.current[0]
            },
            get set() {
                return result.current[1]
            }
        }
    }
}

export default renderer
