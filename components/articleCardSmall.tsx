import { ArticleType } from '@/types/Article';

type ArticleCardSmallType = {
  articles: ArticleType[];
  articleId: string;
}

/**
 * @param a list of articles
 * @returns small article card without image
 */
export default function ArticleCardSmall({ articles, articleId }: ArticleCardSmallType) {

  let headElement: string;
  let imgElement: string;
  let teaser: string;
  let bylineText: string;

  const articleElement: ArticleType | undefined = articles.find(item => item.id === articleId)

  if (articleElement) {
      headElement = articleElement.head
      imgElement = articleElement.image
      teaser = articleElement.teaser
      bylineText = articleElement?.byline.text
  } else {
      throw new Error("No matching element found");
  }
    return (
        <div className="articleCardSmall">
          <h1 className="text-base font-semibold">{headElement}</h1>
          <h3 className="text-sm">{teaser}</h3>
          <h3 className="text-sm">{bylineText}</h3>
        </div>
    )
  }
  