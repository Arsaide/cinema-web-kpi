import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { PrismaService } from '../prisma.service';
import { FileService } from '../file/file.service';

@Module({
    controllers: [ActorController],
    providers: [ActorService, PrismaService, FileService],
})
export class ActorModule {}
