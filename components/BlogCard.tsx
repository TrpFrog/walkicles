import React from "react";
import styles from "../styles/BlogCard.module.scss";
import {ArticleData} from "../lib/articles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDay, faWalking} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

type Props = {
    data: ArticleData
}

const Card = ({data}: Props) => {
    return (
        <a className={styles.blog_card} href={data.url} target={'_blank'} rel="noreferrer">
            <div className={styles.header}>
                <div className={styles.favicon_and_url}>
                    <img src={data.faviconUrl}/>
                    <span>{data.domain.split('//').slice(-1)[0]}</span>
                </div>
                <span>
                    {data.siteName}
                </span>
            </div>
            {data.thumbnailUrl ? (
                <img
                    className={styles.thumbnail}
                    src={data.thumbnailUrl}
                />
            ) : (
                <div
                    className={styles.thumbnail}
                    style={{background: 'white'}}
                />
            )}
            <div className={styles.main}>
                <div className={styles.title}>
                    <h3>{data.title}</h3>
                    <p className={styles.author}>written by {data.author}</p>
                </div>

                <div className={styles.table}>
                    <div>
                        <FontAwesomeIcon icon={faCalendarDay}/>
                        <span>{dayjs(data.writtenDate).format('YY-MM-DD')}</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faWalking}/>
                        <span>
                            {dayjs(data.walkedDate).format('YY-MM-DD')}
                            {data.distanceKm && (
                                <span style={data.distanceKm > 40 ? {fontWeight: 'bold'} : {}}>
                                    {' '}({data.distanceKm} km)
                                </span>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default Card
