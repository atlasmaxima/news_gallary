import { ArticleType } from '@/types/Article';
import Image from "next/image";


type HeroType = {
    articles: ArticleType[];
    articleId: string;
  }

export default function Hero( {articles, articleId}: HeroType ) {   

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
        <div className="flex flex-col lg:flex-row h-full">
            <div className="relative md:w-2/3">
                <h1 className="text-3xl">{headElement}</h1>
                <h3 className="text-base pb-6">{teaser}</h3>
                <h3 className="text-base md:absolute md:bottom-0">{bylineText}</h3>
            </div>
            <div className="hero image">
                <Image  src={imgElement} alt="Hero Image" width={1000} height={1000} />  
            </div>
        </div>
    )
  }

  

