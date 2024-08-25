// pages/login.js
import styles from '../../styles/login.module.css';
import Login_header from '../../components/Login_header';
import Footer from '../../components/Footer';
import TextField from '@mui/material/TextField';

const Login = () => {
  return (
    <div className={styles.container}>
      <Login_header />
      <div className={styles.loginBox}>
        <h2 className={styles.sentence}>コードを入力してください</h2>
        <TextField
          id="outlined-basic"
          label="コードを入力してください"
          variant="outlined"
          className={styles.inputField}
        />
        <button className={styles.loginButton}>ログイン</button>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
