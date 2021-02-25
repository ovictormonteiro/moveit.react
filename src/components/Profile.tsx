import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContexts';
import styles from '../styles/components/Profile.module.css';

export function Profile(){

    const {level} = useContext(ChallengeContext) 

    return(
        <div className={styles.profileContainer}>
            <img src="https://media-exp1.licdn.com/dms/image/C4E03AQHBeAQIGza9Yw/profile-displayphoto-shrink_800_800/0/1517575685069?e=1619654400&v=beta&t=vX6oZNlx7I9clkCnREgQc3onB7wxKXaTqcUe3esEyoE" alt="Profile Picture"/>
            <div>
                <strong>Victor Monteiro</strong>
                <p>         
                    <img src="icons/level.svg" alt="level"/>           
                    Level {level}
                </p>
            </div>
        </div>
    )
}