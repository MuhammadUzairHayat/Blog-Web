import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, incrementByAmount, reset } from "./counterSlice";
import { useState } from "react";


const Counter = ()=> {
    const count = useSelector((state)=> state.counter.count)
    const name = useSelector((state)=> state.counter.name)
    const [incrementValue, updateIncrementValue] = useState(0);

    const dispatch = useDispatch()

    const addValue = (event)=> {
       updateIncrementValue(+event.target.value)
    }

    const byAmountIncrement = ()=> {
        if (incrementValue != 0 && typeof incrementValue === 'number') {
            dispatch(incrementByAmount(incrementValue));
        }     
    }


    return (
        <section className="w-full">
            <div className="counter-div">
                <p className="text-8xl font-bold font-mono"> {count} </p>
                <button className="text-2xl font-bold bg-gray-500 ml-2 px-5 pb-1 text-center text-white rounded" onClick={()=> dispatch(increment())}>+</button>
                <button className="text-2xl font-bold bg-gray-500 ml-2 px-6 pb-1 text-center text-white rounded" onClick={()=> dispatch(decrement())}>-</button>
            </div>
            <div className="counter-div">
                <input 
                    value={incrementValue}
                    onChange={addValue}
                    className="text-8xl font-bold font-mono border-2 border-gray-400 w-1/2 mb-3 text-center py-4" /> <br></br>
                <button 
                    className="text-2xl font-semibold bg-gray-500 ml-2 px-5 pb-1 text-center text-white rounded" 
                    onClick={byAmountIncrement}
                      > Increment By Amount </button>
                <button className="text-2xl font-semibold bg-gray-500 ml-2 px-6 pb-1 text-center text-white rounded" onClick={()=> dispatch(reset())}> Reset </button>
            </div>
        </section>
    )
}

export default Counter