// pages/login.js
import styles from '@/styles/login.module.css';
import Login_header from '../../components/Login_header';
import Footer from '../../components/Footer';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const Login_user = async (code) => {
  try{
    console.log(code);
    const response = await fetch('/api/login_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),  // body に code を含める
    });

    const result = await response.json();
    if (response.ok) {
      console.log('ログイン成功したわよ:', result);
      // 成功時の処理（リダイレクトなど）
    } else {
      console.error('ログイン失敗したわよ。なんで失敗したか明日までに考えてきなさいよね!', result.error);
      // 失敗時の処理（エラーメッセージの表示など）
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const Login = () => {
  const [code, setCode] = useState("");  // 入力されたコードを保持
  const [error, setError] = useState(false);  // エラーステートを追加

  const handleChange = (e) => { // 入力が変更されたらコードを更新
    setCode(e.target.value);
    setError(false);  // 入力が変更されたらエラーをリセット
  };

  const handleLoginClick = (e) => {
    e.preventDefault()
    if (code.trim() === "") {  // 入力が空欄の場合
      setError(true);  // エラーを表示
    } else {
      
    }

    Login_user(code);
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