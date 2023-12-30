import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import { UsersService } from './users.service';
import { PrismaService } from '@/prisma/prisma.service';

vi.mock('bcryptjs');

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: vi.fn(),
              create: vi.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should create an account', async () => {
    const data = {
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    };

    const prismaSpy = vi
      .spyOn(prismaService.user, 'findUnique')
      .mockResolvedValue(null);

    const createSpy = vi.spyOn(prismaService.user, 'create');
    const hashedPasswordMock = await hash(data.password, 8);
    await service.createAccount(data);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        email: data.email,
      },
    });

    expect(createSpy).toHaveBeenCalledWith({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPasswordMock,
      },
    });
  });
});
