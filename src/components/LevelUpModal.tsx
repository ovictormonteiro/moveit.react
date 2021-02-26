import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContexts';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal(){

    const {level, closeLevelUpModal } = useContext(ChallengeContext)

    return(
        <div className={styles.ModalOverlay}>
            <div className={styles.LevelUpModalContainer}>
                <header>{level}</header>
                <strong>Parabéns!!</strong>
                <p>Você alcançou um novo level.</p>
                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Fechar Modal"/>
                </button>
            </div>            
        </div>
    )
}