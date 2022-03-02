import type {NextPage} from 'next'
import styles from '../styles/Home.module.scss'
import {ArticleData, fetchBlogData} from "../lib/articles";
import Layout from "../components/Layout";
import BlogCard from "../components/BlogCard";
import {NextSeo} from "next-seo";

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
            <NextSeo
                title="Walkicles"
                description="徒歩記事まとめサイト"
            />
            <div id={styles.card_grid}>
                {data.map(e => (
                    <BlogCard data={e} key={e.id}/>
                ))}
            </div>
        </Layout>
    )
}

export default Home
