import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Auth = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const signedIn = Cookies.get("signedIn");
    if (signedIn !== "true") {
      router.replace("/Tourist_Board_of_Nara/login");
    }
  }, [router]);

  // クライアントサイドでのみレンダリングされる
  return <>{children}</>;
};

export default Auth;
