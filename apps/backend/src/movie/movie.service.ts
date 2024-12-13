import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { returnMovieObject } from './return-movie.object';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { generateSlug } from '../utils/generate-slugs';
import { FileService } from '../file/file.service';
import { path } from 'app-root-path';
import * as fs from 'node:fs';

@Injectable()
export class MovieService {
    constructor(
        private prisma: PrismaService,
        private fileService: FileService,
    ) {}

    async getAll(searchTerm?: string) {
        if (searchTerm) return this.search(searchTerm);

        return this.prisma.movie.findMany({
            select: returnMovieObject,
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    private async search(searchTerm: string) {
        return this.prisma.movie.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: searchTerm,
                            mode: 'insensitive',
                        },
                    },
                    {
                        description: {
                            contains: searchTerm,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        });
    }

    async getBySlug(slug: string) {
        const movie = await this.prisma.movie.findUnique({
            where: {
                slug,
            },
            select: returnMovieObject,
        });

        if (!movie) throw new NotFoundException('Movie not found');

        return movie;
    }

    async getMostPopular() {
        return this.prisma.movie.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                actors: true,
                genres: true,
            },
            take: 8,
        });
    }

    async getByActor(actorId: string) {
        return this.prisma.movie.findMany({
            where: {
                actors: {
                    some: {
                        id: actorId,
                    },
                },
            },
        });
    }

    async getByGenres(genreIds: string[]) {
        return this.prisma.movie.findMany({
            where: {
                genres: {
                    some: {
                        id: {
                            in: genreIds,
                        },
                    },
                },
            },
        });
    }

    async updateCountViews(slug: string) {
        return this.prisma.movie.update({
            where: {
                slug,
            },
            data: {
                views: {
                    increment: 1,
                },
            },
        });
    }

    /* Admin request */

    async getById(id: string) {
        const movie = await this.prisma.movie.findUnique({
            where: {
                id,
            },
            select: returnMovieObject,
        });

        if (!movie) throw new NotFoundException('Movie not found');

        return movie;
    }

    async create() {
        const movie = await this.prisma.movie.create({
            data: {
                title: '',
                slug: '',
                description: '',
                bigPoster: '',
                poster: '',
                videoUrls: [],
                year: 0,
                duration: 0,
                actors: {
                    connect: [],
                },
                genres: {
                    connect: [],
                },
            },
        });

        return movie.id;
    }

    async update(id: string, dto: UpdateMovieDto) {
        let duration = 0;

        if (dto.videoUrls && dto.videoUrls.length > 0) {
            try {
                const uploadFolder = `${path}${dto.videoUrls[0]}`;

                if (fs.existsSync(uploadFolder)) {
                    const videoDuration = await this.fileService.getVideoDuration(uploadFolder);
                    duration = Number(videoDuration);
                } else {
                    duration = 0;
                }
            } catch (error) {
                console.error(`Failed to get video duration for movie ID ${id}:`, error);
                duration = 0;
            }
        }

        return this.prisma.movie.update({
            where: {
                id,
            },
            data: {
                title: dto.title,
                slug: generateSlug(dto.title),
                description: dto.description,
                bigPoster: dto.bigPoster,
                poster: dto.poster,
                country: dto.country,
                videoUrls: dto.videoUrls,
                year: dto.year,
                duration,
                genres: {
                    set: dto.genres?.map(genreId => ({ id: genreId })),
                    disconnect: dto.genres
                        ?.filter(genreId => !dto.genres.includes(genreId))
                        .map(genreId => ({ id: genreId })),
                },
                actors: {
                    set: dto.actors?.map(actorId => ({ id: actorId })),
                    disconnect: dto.actors
                        ?.filter(actorId => !dto.actors.includes(actorId))
                        .map(actorId => ({ id: actorId })),
                },
            },
        });
    }

    async delete(id: string) {
        return this.prisma.movie.delete({
            where: {
                id,
            },
        });
    }
}
