import { CreateUserDto } from "./dto/create-users.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() // GET => /user
  findAll(@Query("role") role?: "INTERN" | "EMPLOYEE" | "ADMIN") {
    return this.userService.findAll(role);
  }

  @Get(":id") // GET => /user/:id
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post() // POST => /user
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  @Patch(":id") // PATCH => /user/:id
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) userUpdate: UpdateUserDto,
  ) {
    // return { id, ...userUpdate };
    return this.userService.update(id, userUpdate);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
