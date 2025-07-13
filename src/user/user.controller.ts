import { UserService } from './user.service';
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() // GET => /user
  findAll(@Query('role') role?: 'INTERN' | 'EMPLOYEE' | 'ADMIN') {
    return this.userService.findAll(role);
  }

  @Get(':id') // GET => /user/:id
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post() // POST => /user
  create(
    @Body()
    user: {
      name: string;
      role: 'INTERN' | 'EMPLOYEE' | 'ADMIN';
      email: string;
    },
  ) {
    return this.userService.create(user);
  }

  @Patch(':id') // PATCH => /user/:id
  update(@Param('id') id: string, @Body() userUpdate: {}) {
    return { id, ...userUpdate };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
