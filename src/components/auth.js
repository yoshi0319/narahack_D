import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Auth = ({ children }) => {

    //router
    const router = useRouter();

    //Cookieのチェック（これをいろいろ認証タイプにより変更）
    const signedIn = Cookies.get("signedIn");
    //signedInがtrueじゃなければ/loginへ
    if (signedIn !== "true") router.replace("/login");

    //何もなければ次へ（そのまま処理）
    return children;
}

export default Auth;
