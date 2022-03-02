import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {ArticleData, fetchBlogData} from "../lib/articles";
import Layout from "../components/Layout";
import BlogCard from "../components/BlogCard";

type Props = {
    data: ArticleData[]
}

export const getStaticProps = async () => {
    const data = await fetchBlogData()

    return {
        props: {
            data: JSON.parse(JSON.stringify(data))
        }
    }
}

const Home: NextPage<Props> = ({data}) => {
    return (
        <Layout>
            <div id={styles.card_grid}>
                {data.map(e => (
                    <BlogCard data={e} key={e.id}/>
                ))}
            </div>
        </Layout>
    )
}

export default Home
