import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContexts';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){

    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengeContext);    
    const {stopCountdown} = useContext(CountdownContext);

    function handleChallengeSucceded(){
        completeChallenge();
        stopCountdown();
    }

    function handleChallengeFailed(){
        resetChallenge();
        stopCountdown();
    }


    return(
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {`${activeChallenge.amount}xp`}</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="corpo"/>
                        <strong>Novo desafio</strong>
                        <p>{`${activeChallenge.description}`}</p>
                    </main>
                    <footer>
                        <button 
                            className={styles.challengeFailedButton}
                            type="button"
                            onClick={handleChallengeFailed}
                        >Falhei</button>

                        <button
                            className={styles.challengeSuccededButton} 
                            type="button"
                            onClick={handleChallengeSucceded}
                        >Completei</button>
                    </footer>
                </div>
            ) : (
            <div className={styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level up"/>
                    Avance de level completando desafios
                </p>
            </div>       
            )}
         </div>
    )
}