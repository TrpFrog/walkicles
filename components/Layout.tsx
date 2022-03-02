import React from "react";
import styles from "../styles/Layout.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
    return (
        <div id={styles.grid}>
            <div style={{background: '#5f9df8', height: '5em'}}/>
            <header id={styles.header}>
                <div style={{width: '1.5em'}}/>
                <h1>WALKICLES</h1>
                <a id={styles.github_icon} href={'https://github.com/TrpFrog/walkicles'}>
                    <FontAwesomeIcon icon={faGithub}/>
                </a>
            </header>
            <div style={{background: '#5f9df8', height: '5em'}}/>
            <div id={styles.description}>
                <p>
                    徒歩記事のまとめページです。<br/>
                    ここに記事を追加したい方は GitHub リポジトリに直接 Pull Request を送るか、
                    管理人 (<a href={'https://twitter.com/TrpFrog'}>@TrpFrog</a>) までご連絡ください。
                </p>
            </div>
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout
