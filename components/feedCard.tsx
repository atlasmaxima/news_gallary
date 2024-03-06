import { ArticleType } from '@/types/Article';
import Image from "next/image";

type FeedCardType = {
    articles: ArticleType[];
    articleId: string;
  }

export default function FeedCard( {articles, articleId}: FeedCardType ) {   

    let headElement: string;
    let imgElement: string;
    let teaser: string;
    let bylineText: string;

    const feedCardElement: ArticleType | undefined = articles.find(item => item.id === articleId)

    if (feedCardElement) {
        headElement = feedCardElement.head
        imgElement = feedCardElement.image
        teaser = feedCardElement.teaser
        bylineText = feedCardElement?.byline.text
    } else {
        throw new Error("No matching element found");
    }
   
    return (
        <div className="feedCard">
            <Image src={imgElement} alt="Feed Card Image" width={800} height={600}/>  
            <h1 className="text-base font-semibold">{headElement}</h1>
            <h3 className="text-sm">{teaser}</h3>
            <h3 className="text-sm">{bylineText}</h3>
        </div>
    )
  }

