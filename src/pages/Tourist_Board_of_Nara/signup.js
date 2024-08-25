import styles from '@/styles/login.module.css';
import Login_header from '../../components/Login_header';
import Footer from '../../components/Footer';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const postData_user = async (code) => {
  try {
    console.log(code);
    const response = await fetch('/api/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      },
        body: JSON.stringify({ code }),
    });

    const result = await response.json();
    console.log(result);
  } catch (error) {
      console.error('Error:', error);
  }
};

const Signup = () => {
    const [code, setCode] = useState("");  // 入力されたコードを保持
    const [error, setError] = useState(false);  // エラーステートを追加
  
    const handleChange = (e) => { // 入力が変更されたらコードを更新
      setCode(e.target.value);
      setError(false);  // 入力が変更されたらエラーをリセット
    };
  
    const handleSignupClick = (e) => {
      if (code.trim() === "") {  // 入力が空欄の場合
        setError(true);  // エラーを表示
      } else {
        console.log(code);
      }

      postData_user(code);
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
          <button className={styles.loginButton} onClick={handleSignupClick}>サインアップ</button>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default Signup;