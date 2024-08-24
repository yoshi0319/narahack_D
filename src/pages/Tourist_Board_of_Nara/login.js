// pages/login.js
import styles from '../../styles/login.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backButton}>&larr; 戻る</button>
        <h1 className={styles.titlename}>Tourist Board of Nara</h1>
        <div className={styles.headerPlaceholder}></div>
      </header>
      <div className={styles.loginBox}>
        <h2 className={styles.sentence}>コードを入力してください</h2>
        <input type="text" placeholder="コードを入力してください" className={styles.input} />
        <button className={styles.loginButton}>ログイン</button>
      </div>
      <footer className={styles.footer}>
        &copy; 山岳部
      </footer>
    </div>
  );
};

export default Login;
