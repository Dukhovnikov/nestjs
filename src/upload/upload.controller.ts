import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Error } from '../shared/error.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { UploadService } from './upload.service';
import { CountDto } from '../shared/count.dto';
import { FileDto, FileUploadDto } from './file.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Upload - File')
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Upload a file' })
  @ApiCreatedResponse({ description: 'Return a file document' })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: FileUploadDto): Promise<FileDto> {
    return this.uploadService.saveFileInfo(file);
  }

  @Get('/files/count')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Retrieve the total number of uploaded files' })
  @ApiOkResponse({ description: 'Retrieve documents count' })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  totalFiles(): Promise<CountDto> {
    return this.uploadService.filesCount();
  }

  @Get('/files')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Retrieve all file documents' })
  @ApiOkResponse({ description: 'Retrieve file documents', type: [FileDto] })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  allFiles(): Promise<FileDto[]> {
    return this.uploadService.findAllFiles();
  }

  @Get('/files/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Retrieve a single file depending on its id' })
  @ApiOkResponse({ description: 'Retrieve file document', type: FileDto })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  findFile(@Param('id') id: string): Promise<FileDto> {
    return this.uploadService.findOneFile(id);
  }

  @Delete('/files/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Delete an uploaded file' })
  @ApiOkResponse({
    description: 'Deletes a single file based on the ID supplied',
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  deleteFile(@Param('id') id: string): Promise<void> {
    return this.uploadService.deleteFile(id);
  }
}
