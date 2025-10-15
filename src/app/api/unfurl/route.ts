import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

const GET = async (req: NextRequest) => {
    //URLからクエリパラメータ(※)を取得 ※URL末尾の'?'に以降追加される文字列
    const url = req.nextUrl.searchParams.get("url");
    if (!url) return NextResponse.json({ error: "url is required" }, { status: 400 });

    try {
        const response = await fetch(url, {
            headers: { "User-Agent": "Mozilla/5.0 (LinkPreviewBot)" },
            next: { revalidate: 60 * 60 * 24 },
        });
        const html = await response.text();
        const $ = cheerio.load(html);

        const pick = (sel: string, attr = "content") => $(sel).attr(attr) ?? "";
        const absolute = (u: string) => (/^https?:\/\//.test(u) ? u : "");

        const data = {
            url,
            title: pick('meta[property="og:title"]') || $("title").text() || "",
            description:
                pick('meta[property="og:description"]') ||
                $('meta[name="description"]').attr("content") ||
                "",
            image: absolute(pick('meta[property="og:image"]')),
            siteName: pick('meta[property="og:site_name"]') || new URL(url).host,
        };

        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: "failed to fetch" }, { status: 500 });
    }
}

export { GET };