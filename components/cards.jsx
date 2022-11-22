/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Cards.module.css'

export default function Cards({name, src, desc, link, code}) {
    return (
        <>
            <div className={styles.child}>
                <img src={src} alt={name} className={styles.bgImg}/>
                <h1 className={styles.title}>{name}</h1>
                <p className={styles.desc}>{desc}</p>
                <p className={styles.link}>Use code {code}{" "}<a href={link}>Here!</a></p>
            </div>
        </>
    );
}