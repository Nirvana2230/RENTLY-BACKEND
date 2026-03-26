import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFiles, HttpException, HttpStatus, Query } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PropertiesService } from './properties.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreatePropertyDto } from './dto/create-property.dto';   // ← NUEVO IMPORT

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 3, {
    storage: diskStorage({
      destination: './public/uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      }
    })
  }))
  create(
    @UploadedFiles() files: Array<Express.Multer.File>, 
    @Body() createPropertyDto: CreatePropertyDto   // ← AQUÍ USAMOS EL DTO CON VALIDACIONES
  ) {
    if (files && files.length > 0) {
      createPropertyDto.imageUrl = '/uploads/' + files[0].filename;
      if (files[1]) createPropertyDto.imageUrl2 = '/uploads/' + files[1].filename;
      if (files[2]) createPropertyDto.imageUrl3 = '/uploads/' + files[2].filename;
    }
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  findAll(@Query('term') term?: string, @Query('page') page?: string, @Query('limit') limit?: string) {
    return this.propertiesService.findAll(term, page ? +page : undefined, limit ? +limit : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) { 
    return this.propertiesService.findOne(+id); 
  }

  @Delete(':id')
  remove(@Param('id') id: string) { 
    return this.propertiesService.remove(+id); 
  }

  @Post(':id/reviews')
  async addReview(@Param('id') id: string, @Body() body: any) {
    try { 
      return await this.propertiesService.addReview(+id, body.userId, body.comment, body.rating); 
    } 
    catch (error) { 
      throw new HttpException(error.message, HttpStatus.FORBIDDEN); 
    }
  }

  @Get(':id/chat/:hostId/:userId')
  getChat(@Param('id') id: string, @Param('hostId') hostId: string, @Param('userId') userId: string) {
    return this.propertiesService.getMessages(+id, +hostId, +userId);
  }

  @Post(':id/chat')
  sendMessage(@Param('id') id: string, @Body() body: any) {
    return this.propertiesService.sendMessage(+id, body.senderId, body.receiverId, body.text);
  }
}

