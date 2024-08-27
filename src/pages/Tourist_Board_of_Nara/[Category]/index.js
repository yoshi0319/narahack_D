import PostCard from "@/components/PostCard_c";
import TopHeader from "@/components/topHeader";

import { getDetail } from "@/pages/api/getCategory_post";

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