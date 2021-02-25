import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContexts";


interface CountdownContextData{
    minutes: number,
    seconds: number,
    active: boolean,
    hasFinished:  boolean,
    startCountdown:  () => void,
    stopCountdown:  () => void,
}

interface CountdownProviderProps{
    children: ReactNode
}



export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({children}:CountdownProviderProps){

    // ==================Constantes====================

    const {startNewChallenge} = useContext(ChallengeContext)

    let countdownTimeout;

    const [time, setTime] = useState(0.1 * 60);
    const [active,setActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // ====================Constantes==================

    // ==============Funções=============

    const startCountdown = function(){        
        setActive(true);           
    }

    const stopCountdown = function(){
        clearTimeout(countdownTimeout);
        setActive(false);
        setTime(0.1 * 60);
        setHasFinished(false)
    }

    useEffect(()=>{
        if(active && time > 0){
            countdownTimeout = setTimeout(()=>{
                setTime(time - 1)
            },1000)
        } else if (active && time == 0){
            setHasFinished(true);
            setActive(false);
            startNewChallenge();
        }
    },[active, time]);

    // ================Funções==================

    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            active,
            hasFinished,
            startCountdown,
            stopCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}