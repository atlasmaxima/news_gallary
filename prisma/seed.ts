// Populate database with news.json

import { PrismaClient } from '@prisma/client';
import { ArticleType } from '../types/Article'
import * as fs from 'fs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import logger from '../logger';

const prisma = new PrismaClient();
const filePath = './public/news.json';
const imageDirPath = './public/images';

function readJsonFile<T>(filePath: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) {
                reject(error);
            } else {
                try {
                    const json = JSON.parse(data)
                    resolve(json.articles)
                } catch (parseError) {
                    reject(parseError)
                }
            }
        })
    })
}

async function seedData() {
    try {
        createArticleImageData()
        logger.info('Data seeding started');
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            logger.error('Data seeding failed', error.message);
        }
    }
}

/**
 * encode each image based on file path containing the jgp image from the imageDirPath
 * @param filePath each image file path in imageDirPath
 * @returns a promise of base64 image data
 */
function encodeImageFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, { encoding: 'base64' }, (error, data) => {
        if (error) {
          reject(error);
        } else {
          const base64 = `data:image/jpeg;base64,${data}`;
          resolve(base64);
        }
      });
    });
  }


/**
 * asynchronously reads the image files from imageDirPath,
 * encodes each image, and upserts the image data and file name to the database.
 */
async function createArticleImageData() {
    fs.readdir(imageDirPath, (error, imageFiles) => {
        if (error) {
            console.error(error);
        } else {
            imageFiles.forEach((imageFile) => {
                // construct the image path file
                const imagePath = `${imageDirPath}/${imageFile}`;
                encodeImageFile(imagePath).then((imageData) => {
                    insertData(imageData, imageFile)
                })
            })
        }
    })
}

async function createData(newArticle: ArticleType): Promise<string[]> {
    const createdIds: string[] = [];
    const createArticle = await prisma.article.create({
        data: {
            id: newArticle.id,
            byline: { create: { text: newArticle.byline.text } },
            head: newArticle.head,
            teaser: newArticle.teaser,
            image: newArticle.image
        }
    });
    createdIds.push(newArticle.id)
    logger.info(`Created article with ID: ${createArticle.id}`);
    return createdIds;
}

async function insertData(imageData: string, imageFile: string): Promise<string[]> {
    const jsonData: ArticleType[] = await readJsonFile<ArticleType>(filePath);
    const upsertedIds: string[] = [];
    for (const article of jsonData) {
        if (article.image === imageFile) {
            const upsertArticle = await prisma.article.upsert({
                where: { id: article.id },
                update: {
                    byline: { update: { text: article.byline.text } },
                    head: article.head,
                    teaser: article.teaser,
                    image: imageData
                },
                create: {
                    id: article.id,
                    byline: { create: { text: article.byline.text } },
                    head: article.head,
                    teaser: article.teaser,
                    image: imageData
                }
            });
            upsertedIds.push(article.id);
            logger.info(`Upserted article with ID: ${upsertArticle.id}`);
        }
    }
    return upsertedIds;
}



seedData().catch((error) => {
    console.error(error);
}).finally(() => {
    prisma.$disconnect();
})