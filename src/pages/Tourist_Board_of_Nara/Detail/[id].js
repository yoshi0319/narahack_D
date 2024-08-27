import CreatePost_c from "@/components/CreatePost_c";
import Detail from "@/components/Detail_c";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { getDetail } from "@/pages/api/detail-post";


export async function getServerSideProps(context) {
    console.log('きてます？');
    const { id } = context.query;

    console.log({id});
    const response = await getDetail(id);

    // console.log(`title: ${response.title}`);
    // console.log(`category: ${response.category}`);
    // console.log(`explanation: ${response.explanation}`);
    // console.log(`place: ${response.place}`);
    // console.log(`response.ok: ${response.ok}`);
    // console.log(`mainImage: ${response.mainImage}`);
    // console.log(`sun1Image: ${response.sub1Image}`);
    // console.log(`sub2Image: ${response.sub2Image}`);


    
    console.log('いけたわよ');

    const post = response;

    return {
        props: {
            post,
        },
    };
}

export default function(props) {
    // console.log(props.post);
    return(
        <>
            <Header />
            <Detail post={props.post}/>
            <Footer />
        </>
    );
}