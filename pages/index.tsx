import Hero from '../components/hero'
import { PrismaClient } from '@prisma/client';
import { ArticleType } from '@/types/Article';
import ArticleCard from '@/components/articleCard';
import ArticleCardSmall from '@/components/articleCardSmall';
import FeedCard from '@/components/feedCard';
import FeedCardSmall from '@/components/feedCardSmall';

type HomeProps = {
  articles: ArticleType[]
}

export default function Home({articles}: HomeProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row h-screen">

        {/* Hero container with Hero post*/}
        <div className="grid grid-cols-1 sm:grid-cols-1 sm:w-2/3 lg:w-3/4 xl:w-w-4/5 2xl:w-5/6">
          <div className="border border-gray-500 p-3">
            <Hero articles={articles} articleId="779"></Hero>
          </div>
  
          {/* Bottom container with article posts  */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 h-full">
              <div className="article posts p-3">
                <ArticleCard articles={articles} articleId="509"></ArticleCard>
              </div>
              <div className="article card small p-3">
                <ArticleCardSmall articles={articles} articleId="310"></ArticleCardSmall>
                <div className="mt-16 divide-y">
                  <ArticleCardSmall articles={articles} articleId="001"></ArticleCardSmall>
                </div>
              </div>
              <div className="article card p-3">
                <ArticleCard articles={articles} articleId="204"></ArticleCard>
              </div>
            </div>
        </div>


        {/* Side panel container with feed */}
        <div className="sm:w-1/3 lg:w-1/4 2xl:w-1/6 divide-y-3">
          <div className="grid grid-cols-1 divide-y-2 mx-auto px-4">
            <div className="pb-4">
              <FeedCard articles={articles} articleId="038"></FeedCard>
            </div>
            <div className="pb-4">
              <FeedCardSmall articles={articles} articleId="307"></FeedCardSmall>
            </div>
            <div className="pb-4">
              <FeedCardSmall articles={articles} articleId="596"></FeedCardSmall>
            </div>
            <div className="pb-4">
                <FeedCardSmall articles={articles} articleId="108"></FeedCardSmall>
              </div>
          </div>
        </div>

      </div>
    </>
  )
}

export const getServerSideProps = async ()  => {
  const prisma = new PrismaClient()
  const articles = await prisma.article.findMany({
    include: {
      byline: true, 
    }
  })
  return {
    props: { articles: articles }
  };
};

  