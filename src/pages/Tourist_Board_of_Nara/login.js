// pages/login.js
import styles from '../../styles/login.module.css';
import Login_header from '../../components/Login_header';
import Footer from '../../components/Login_footer';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import router from 'next/router';
import Cookies from 'js-cookie';

const Login = () => {
  const [code, setCode] = useState("");  // 入力されたコードを保持
  const [error, setError] = useState(false);  // エラーステートを追加

  const handleChange = (e) => { // 入力が変更されたらコードを更新
    setCode(e.target.value);
    setError(false);  // 入力が変更されたらエラーをリセット
  };

  const handleLoginClick = (e) => {
    if (code.trim() === "") {
      setError(true);
    } else {
      console.log(code, "でログインしました");
      Cookies.set("signedIn", "true");
      Cookies.set("showLoginSuccess", "true"); // Add this line
      router.replace("/Tourist_Board_of_Nara");
    }
  };

  return (
    <div className={styles.container}>
      <Login_header />
      <div className={styles.loginBox}>
        <h2 className={styles.sentence}>コードを入力してください</h2>
        <TextField 
          onChange={handleChange} 
          type='text' 
          value={code} 
          id="outlined-basic" 
          label="コードを入力してください" 
          variant="outlined" 
          className={styles.inputField}
          error={error}  // エラー状態をTextFieldに渡す
          helperText={error ? "コードを入力してください" : ""}  // エラーメッセージを表示
        />
        <button className={styles.loginButton} onClick={handleLoginClick}>ログイン</button>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
