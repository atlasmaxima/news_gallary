import { ArticleType } from '@/types/Article';
import Image from "next/image";

type ArticleCardType = {
    articles: ArticleType[];
    articleId: string;
  }

export default function ArticleCard( {articles, articleId}: ArticleCardType ) {   
    let headElement: string;
    let imgElement: string;
    let teaser: string;
    let bylineText: string;

    const heroElement: ArticleType | undefined = articles.find(item => item.id === articleId)
    if (heroElement) {
        headElement = heroElement.head
        imgElement = heroElement.image
        teaser = heroElement.teaser
        bylineText = heroElement?.byline.text
    } else {
        throw new Error("No matching element found");
    }

    return (
        <div className="h-full flex flex-col">
        <div className="article card image">
            <Image src={imgElement} alt="Article Post Image"  width={800} height={400}/>  
        </div>
        <div className="article card test">
            <h1 className="text-base font-semibold">{headElement}</h1>
            <h3 className="text-sm">{teaser}</h3>
            <h3 className="text-sm">{bylineText}</h3>
        </div>
        </div>
    )
}