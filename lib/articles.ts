import {readdirSync, readFileSync} from "fs";
import jsYaml from "js-yaml";
import path from "path";

const articleDataDirectory = 'articles'

export type ArticleData = {
    id: string
    siteName: string
    title: string
    author: string
    url: string
    domain: string
    faviconUrl: string
    walkedDate: Date
    writtenDate: Date
    description?: string
    thumbnailUrl?: string
    distanceKm?: number
}

const fetchOGP = async (data: ArticleData) => {
    const ogs = require('open-graph-scraper');
    const fetchedProps = await ogs({url: data.url}).then((e: any) => {
        const { result } = e;
        const domain = result?.ogUrl?.split('//').slice(-1)[0].split('/')[0];
        const faviconUrl = result?.favicon.startsWith('/')
            ? 'https://' + domain + result?.favicon
            : result?.favicon
        return {
            domain,
            faviconUrl,
            description: result?.ogDescription,
            thumbnailUrl: result?.ogImage?.url
        }
    })

    return {
        ...data,
        ...fetchedProps
    } as ArticleData
}

export const fetchBlogData = async () => {
    const articleDataList = readdirSync(articleDataDirectory)
        .map(fileName => {
            const yamlPath = path.join(articleDataDirectory, fileName);
            return {
                text: readFileSync(yamlPath, 'utf-8'),
                id: fileName
            }
        })
        .map(({text, id}) => ({
            ...(jsYaml.load(text) as ArticleData),
            id
        }))
        .map(fetchOGP)

    const ret = await Promise.all(articleDataList);

    return ret.sort((a, b) => b.walkedDate.getTime() - a.walkedDate.getTime())
}
