import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Link from 'next/link'
import { Store } from "../types";
import StoreCard from '../components/StoreCard';
import api from "../api";


interface Props {
    stores: Store[]
}


const HomePage: NextPage<Props> = ({stores}) => {

    
    return (
        <main>
            <p>HEllo index</p>
            { stores.map( store => (
                <Link key={ store.id } passHref href={`/${store.id}`}>
                    <a>
                        <StoreCard store={store} />
                    </a>
                </Link>
            ))
            }
        </main>
    )
};


// export const getServerSideProps: GetServerSideProps = async () => {
//     const stores = await api.list();
  
//     return {
//       props: { stores },
//     };
// };


export const getStaticProps: GetStaticProps = async () => {
    const stores = await api.list();
  
    return {
        props: { stores },
        revalidate: 60   //Segundos
    };
  };
  


export default HomePage;
