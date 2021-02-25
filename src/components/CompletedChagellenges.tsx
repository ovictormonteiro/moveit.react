import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContexts';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges(){

    const {challengesComputed} = useContext(ChallengeContext);

    return(
        <div className={styles.completedChallengesContainer}>
            <span>Desafios Completos</span>
            <span>{challengesComputed}</span>
        </div>
    )
}