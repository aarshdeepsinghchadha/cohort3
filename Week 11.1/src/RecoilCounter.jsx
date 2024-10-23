import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom } from "./store/atoms/counter";



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

function CurrentCounter() {

    const count = useRecoilValue(counterAtom);

    return <div>
        {count}
    </div>
}

function Increase() {

    const setCount = useSetRecoilState(counterAtom);

    function increase() {
        setCount(x => x + 1)
    }
    return <div>
        <button onClick={increase}>Increase</button>
    </div>
}

function Decrease() {

    const setCount = useSetRecoilState(counterAtom);

    function decrease() {
        setCount(x => x - 1)
    }
    return <div>
        <button onClick={decrease}>Decrease</button>
    </div>
}


export default RecoilCounter