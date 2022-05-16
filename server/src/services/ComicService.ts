import { Comic } from "../types";
import { getApiCall } from "../utils/apiHelper";

class ComicService {

    public async getComic(id?: number): Promise<Comic> {
        const url = `${process.env.WEBCOMIC_API}/${id ? `${id}/` : ''}${process.env.COMIC_JSON}`
        const comic = await getApiCall(url) as Comic
        return comic
    }

    public async getComics(latestComicId: number): Promise<Comic[]> {
        const tenLatestComicIds = []
        for (let id = latestComicId; id > latestComicId - 10; id--) {
            tenLatestComicIds.push(id)
        }

        return Promise.all(tenLatestComicIds.map((id) => this.getComic(id)))
    }

}

export default ComicService