import {createContext, useState, ReactNode, useEffect} from 'react';
import Challenges from '../../challenges.json';

// ==============Início das Interfaces TypeScript=====================

interface ChallengesProviderProps{
    children: ReactNode 
}

interface Challenge{
    type: 'body' | 'eye',
    description: string,
    amount: number
}

interface ChallengesContextData {
    level: number,    
    currentExperience: number,
    challengesComputed: number,
    levelUp: ()=> void,
    startNewChallenge: () => void,
    activeChallenge: Challenge,
    resetChallenge: () => void,
    experienceToNextLevel: number,
    completeChallenge: () => void
}

// ===============Fim das Interfaces====================

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children}:ChallengesProviderProps){
    
    // =====================Início das Constantes=======================
    
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesComputed, setChallengesComputed] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4,2);

    // ===============FIM DAS CONSTANTES=================

    // ================Início das Funções===============


    useEffect(()=>{
        Notification.requestPermission();        
    },[])


    function resetChallenge(){
        setActiveChallenge(null);
    }

    function levelUp(){
        setLevel(level + 1 );        
    }      

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * Challenges.length);
        const challenge = Challenges[randomChallengeIndex];

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio!',{
                body: `Valendo ${challenge.amount}xp`,
            })
        }


        setActiveChallenge(challenge);
    }    

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }
        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesComputed(challengesComputed + 1);
        
    }

    // ===========Fim das Funções===============

    return(
        <ChallengeContext.Provider 
            value={{
                level, 
                levelUp,
                currentExperience,
                challengesComputed,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge
            }}
        >
            {children}
        </ChallengeContext.Provider>
    )
}