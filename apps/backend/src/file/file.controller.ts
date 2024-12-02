import {
    Body,
    Controller,
    HttpCode,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { FileService } from './file.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteFileDto } from './dto/delete-file.dto';

@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post()
    @HttpCode(200)
    @Auth('admin')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Query('folder') folder?: string) {
        return this.fileService.saveFiles([file], folder);
    }

    @UsePipes(new ValidationPipe())
    @Post('delete')
    @HttpCode(200)
    @Auth('admin')
    async deleteFile(@Body() dto: DeleteFileDto) {
        await this.fileService.deleteFile(dto.path);

        return `Deleted file ${dto.path} successfully!`;
    }
}
