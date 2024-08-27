import CreatePost_c from "@/components/CreatePost_c";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import Auth from "@/components/auth";

export default function() {
    return(
        <Auth>
            <>
                <Header />
                <CreatePost_c />
                <Footer />
            </>
        </Auth>
    );
}