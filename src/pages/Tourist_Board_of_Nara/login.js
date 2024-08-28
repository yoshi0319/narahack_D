import styles from '@/styles/login.module.css';
import Login_header from '../../components/Login_header';
import Footer from '../../components/Footer';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const now = new Date();
const expires = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2時間をミリ秒に変換

const Login_user = async (code, router, setError, setErrorMessage) => {
  try {
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
      console.log('ログイン成功:', result);

      // サイトを閉じると失効
      Cookies.set("signedIn", "true");
      Cookies.set("userId", result.userId);
      Cookies.set("showLoginSuccess", "true");

      // クッキーの情報を確認
      const signedIn = Cookies.get("signedIn"); 
      console.log("Signed In Status:", signedIn);
      const userId = Cookies.get("userId");
      console.log("userId:", userId);

      // リダイレクト
      router.replace("/Tourist_Board_of_Nara");

    } else {
      console.error('ログイン失敗:', result.error);
      setError(true);
      setErrorMessage("ログインに失敗しました。コードを確認してください。"); // エラーメッセージを設定
    }
  } catch (error) {
    console.error('Error:', error);
    setError(true);
    setErrorMessage("サーバーエラーが発生しました。もう一度お試しください。"); // サーバーエラーのエラーメッセージ
  }
};

const Login = () => {
  const [code, setCode] = useState("");  // 入力されたコードを保持
  const [error, setError] = useState(false);  // エラーステートを追加
  const [errorMessage, setErrorMessage] = useState("");  // エラーメッセージを保持する状態

  const router = useRouter();

  const handleChange = (e) => { // 入力が変更されたらコードを更新
    setCode(e.target.value);
    setError(false);  // 入力が変更されたらエラーをリセット
    setErrorMessage(""); // エラーメッセージをリセット
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (code.trim() === "") {
      setError(true);
      setErrorMessage("コードを入力してください。");  // エラーメッセージを設定
    } else {
      Login_user(code, router, setError, setErrorMessage);
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
          sx={{
            marginBottom: '30px',
          }}
          id="outlined-basic" 
          label="コードを入力してください" 
          variant="outlined" 
          className={`${styles.inputField} ${error ? styles.inputFieldError : ''}`}  // エラー時に赤枠を適用
          error={error}  // エラー状態をTextFieldに渡す
          helperText={error ? errorMessage : ""}  // エラーメッセージを表示
        />
        <button className={styles.loginButton} onClick={handleLoginClick}>ログイン</button>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
