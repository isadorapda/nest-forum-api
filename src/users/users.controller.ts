import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { UsersService } from './users.service';
import { CreateUserDtoType, createUserSchema } from './types';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create-account')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createAccount(@Body() data: CreateUserDtoType) {
    this.usersService.createAccount(data);
  }
}
