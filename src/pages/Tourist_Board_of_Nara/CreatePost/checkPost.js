import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CheckPost_c from "@/components/CheckPost_c";

import Auth from "@/components/auth";

export default function check() {
    return(
        <Auth>
            <>
                <Header />
                <CheckPost_c />
                <Footer />
            </>
        </Auth>
    );
}