import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { AuthModule } from './auth/auth.module';
import { EnvModule } from './env/env.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    EnvModule,
    UsersModule,
  ],
  //   controllers: [UsersController],
  //   providers: [UsersService, PrismaService],
})
export class AppModule {}
