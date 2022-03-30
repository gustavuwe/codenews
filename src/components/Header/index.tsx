import styles from './styles.module.scss';
import { SignInButton } from '../SignInButton'

export function Header() {
    return (
    <>
        <body className={styles.body}>
            <header className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <div className={styles.logo}>
                        <h1>code.news</h1>
                    </div>
                    <nav>
            <a href="http://localhost:3000/"className={styles.active}>Home</a>
            <a href="#">About</a>
          </nav>

          <SignInButton />
                </div>
        </header>
    </body>
    </>
    );
}