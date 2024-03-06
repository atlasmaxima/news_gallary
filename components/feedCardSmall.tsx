import { ArticleType } from '@/types/Article';

type FeedCardSmallType = {
    articles: ArticleType[];
    articleId: string;
  }

export default function FeedCardSmall( {articles, articleId}: FeedCardSmallType ) {   

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
        <div className="feed card small">
            <h3 className="text-font-semibold">{headElement}</h3>
            <h3 className="text-sm">{teaser}</h3>
            <div className="pt-4">
                <h3 className="text-sm">{bylineText}</h3>
            </div>
        </div>
    )
  }

