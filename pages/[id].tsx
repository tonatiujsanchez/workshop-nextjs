import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from 'next/link'
import api from "../api";
import StoreCard from "../components/StoreCard";
import { Store } from "../types";

interface Props {
    store: Store
}


const StorePage: NextPage<Props> = ({ store }) => {
    
    return (
        <main>
            <StoreCard store={store} />
            <Link href="/">Ir a /</Link>
        </main>
    )
};




export const getStaticPaths: GetStaticPaths = async () => {
    const stores = await api.list();
  
    return {
      paths: stores.map((store) => ({ params: { id: store.id } })),
      fallback: "blocking",
    };
  };
  

export const getStaticProps: GetStaticProps = async ({params}) => {
    const store = await api.fetch(params?.id as string);

    return {
        props: { store },
    };
};

export default StorePage;