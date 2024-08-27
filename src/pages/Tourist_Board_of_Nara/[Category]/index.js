import dynamic from "next/dynamic";
// import PostCard from "@/components/PostCard_c";z
import { getDetail } from "@/pages/api/getCategory_post";

const TopHeader = dynamic(() => import('@/components/topHeader'),{ssr:false});
const PostCard = dynamic(() => import('@/components/PostCard_c'));

export async function getServerSideProps(context) {
    const { id } = context.query;
    console.log({id});

    const response = await getDetail(id);

    console.log('いけたわよ');

    const post = response;

    return {
        props: {
            post,
        },
    };
}

export default function Top (props) {
    return(
        <>
            <TopHeader />
            <PostCard props={props.post}/>
        </>
    );
}