import { Repository } from "typeorm";
import { Article } from "../entity/Article";
import { AppDataSource } from "../data-source";

export default new class ArticleService {
    private readonly ArticleRepository: Repository<Article> = AppDataSource.getRepository(Article)
    async find(): Promise<object> {
        try {
            const articles = await this.ArticleRepository
                .createQueryBuilder("articles")
                .getMany()

            const contentArticles = articles.map(articles => {
                return {
                    id: articles.id,
                    gambar: articles.gambar,
                    articleDate: articles.articleDate,
                    title: articles.title,
                    author: articles.author
                }
            })

            return contentArticles

        } catch (error) {
            throw error
        }
    }

    async getAll(): Promise<object | string> {
        try {
            const response = await this.ArticleRepository.find({
                relations: {
                    author: true,
                },
                select: {
                    author: {
                        fullName: true,
                    },
                },
            });
            return {
                message: "success getting all Articles",
                data: response,
            };
        } catch (error) {
            return "message: something error while getting all Articles";
        }
    }
    async getOne(id: number): Promise<object | string> {
        try {
            const response = await this.ArticleRepository.findOne({
                where: { id },
                relations: {
                    author: true,
                },
                select: {
                    author: {
                        fullName: true,
                    },
                },
            });

            return {
                message: "success getting a Articles",
                data: response,
            };
        } catch (error) {
            return "message: something error while getting a Articles";
        }
    }

    async create(reqBody: object): Promise<object> {
        try {
            const article = await this.ArticleRepository.save(reqBody)

            return {
                message: "success",
                data: article
            }
        } catch (error) {
            throw error
        }
    }

    async update(id: number, data: any): Promise<object | string> {
        try {
            if (typeof data.gambar === "undefined") {
                const gambarDb = await this.ArticleRepository.findOneBy({ id });
                data.gambar = gambarDb[0].gambar;
            }
            const response = await this.ArticleRepository.update(id, {
                ...data
            });
            console.log("ini response", response);

            return {
                message: "success updating a Articles",
                data: response,
            };
        } catch (error) {
            return "message: something error while updating a Articles";
        }
    }
    async delete(id: number): Promise<object | string> {
        try {
            const response = await this.ArticleRepository.delete(id);

            return {
                message: "success deleting a Articles",
            };
        } catch (error) {
            return "message: something error while deleting a Articles";
        }
    }

}