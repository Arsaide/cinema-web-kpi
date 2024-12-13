import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaService } from '../prisma.service';
import { StreamService } from './stream.service';
import { FileService } from '../file/file.service';

@Module({
    controllers: [MovieController],
    providers: [MovieService, PrismaService, StreamService, FileService],
})
export class MovieModule {}
