import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {ArticleData, fetchBlogData} from "../lib/articles";

type Props = {
    data: ArticleData[]
}

export const getStaticProps = async () => {
    const data = await fetchBlogData()
    console.log(data)

    return {
        props: {
            data: JSON.parse(JSON.stringify(data))
        }
    }
}

const Home: NextPage<Props> = ({data}) => {
    return (
        <div className={styles.container}>
            {data.map(e => (
                <div key={e.id}>
                    {e.title}
                </div>
            ))}
        </div>
    )
}

export default Home
