import { Comic, PDLComic } from "../comic";

export interface FeedData {
    id: number
    title: string
    description: string
    date: Date
    url: string
    link: string
}

export class FeedDTO {
    public comicToSingle(comic: Comic): FeedData {
        return {
            id: comic.num,
            title: comic.title,
            description: comic.transcript ? comic.transcript : comic.alt,
            date: new Date(Number(comic.year), Number(comic.month), Number(comic.day)),
            url: comic.img,
            link: `https://xkcd.com/${comic.num}`
        };
    }

    public pdlComicToSingle(comic: PDLComic): FeedData {
        return {
            id: Number(comic.guid.split('?p=')[1]),
            title: comic.title,
            description: comic.content,
            date: new Date(comic.pubDate),
            url: comic.url,
            link: comic.link,
        };
    }

    public comicToFeedList(comics: Comic[]): FeedData[] {
        return comics.map(comic => this.comicToSingle(comic))
    }

    public pdlComicToFeedList(comic: PDLComic[]): FeedData[] {
        return comic.map(comic => this.pdlComicToSingle(comic))
    }

}
