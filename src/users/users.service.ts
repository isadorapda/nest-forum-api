import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDtoType } from './types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createAccount(data: CreateUserDtoType): Promise<void> {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new HttpException(
        'There is a user with that email already',
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await hash(data.password, 8);

    await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
  }
}
