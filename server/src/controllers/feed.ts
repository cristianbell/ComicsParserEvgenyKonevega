import ComicService from "../services/ComicService";
import RssService from "../services/RssService";
import FeedDTO from "../types";

class FeedController {

    private rssService: RssService;

    private comicService: ComicService;

    constructor() {
        this.comicService = new ComicService()
        this.rssService = new RssService()
    }

    public async getFeed(): Promise<any> {
        const latestComic = await this.comicService.getComic()

        const tenLatestComic = await this.comicService.getComics(latestComic.num)

        const poorlyDrawnLinesComics = await this.rssService.parse()

        const parsedComics = await Promise.all(poorlyDrawnLinesComics.items.map(async (item) => {
            const url = await this.rssService.parseHTML(item['content:encoded'])
            return { ...item, url }
        }))

        const feedDto = new FeedDTO()

        return [...feedDto.comicToFeedList(tenLatestComic), ...feedDto.pdlComicToFeedList(parsedComics)]
    }

}

export default FeedController;
