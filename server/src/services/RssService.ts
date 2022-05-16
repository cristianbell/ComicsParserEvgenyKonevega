import * as Parser from "rss-parser";
import { parse } from 'node-html-parser';

// do not have enough time to refactor this class
class RssService {

    private parser: Parser

    readonly url: string

    constructor() {
        this.url = 'http://feeds.feedburner.com/PoorlyDrawnLines'
        this.parser = new Parser();
    }

    public async parse(): Promise<any> {
        return this.parser.parseURL(this.url);
    }

    // do not have enough time to use figure out with HTML parser
    public async parseHTML(html: string): Promise<string> {
        //
        // const a = await parse(html)
        // console.log(a.childNodes[0].parentNode.childNodes[0].parentNode.childNodes[0])

        const regex = /href=\"(.*?)"/
        return html.match(regex)[0].split('="')[1].slice(0, -1)
    }

}

export default RssService
