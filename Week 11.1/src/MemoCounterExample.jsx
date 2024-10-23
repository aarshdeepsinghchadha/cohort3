import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom } from "./store/atoms/counter";
import { memo } from "react";

function RecoilCounter() {
    return (
        <RecoilRoot>
            <Counter />
        </RecoilRoot>
    )
}

function Counter() {
    return <div>
        <CurrentCounter />
        <Increase />
        <Decrease />
    </div>
}

const CurrentCounter = memo(function () {
    const count = useRecoilValue(counterAtom);
    return <div>{count}</div>;
});


CurrentCounter.displayName = "CurrentCounter";

const Increase = memo(function () {
    const setCount = useSetRecoilState(counterAtom);
    function increase() {
        setCount(x => x + 1);
    }
    return <div>
        <button onClick={increase}>Increase</button>
    </div>
});


Increase.displayName = "Increase";

const Decrease = memo(function () {
    const setCount = useSetRecoilState(counterAtom);
    function decrease() {
        setCount(x => x - 1);
    }
    return <div>
        <button onClick={decrease}>Decrease</button>
    </div>
});


Decrease.displayName = "Decrease";

export default RecoilCounter;
