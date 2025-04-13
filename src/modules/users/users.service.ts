import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Interest } from '../interests/entities/interest.entity';
import { In } from 'typeorm';


@Injectable()
export class UsersService {
  [x: string]: any;

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Interest)
    private interestsRepository: Repository<Interest>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return plainToInstance(User, users);
  }

  async findOne(id: string): Promise<User | null> {
    if (!id) {
      return null;
    }
    const user = await this.usersRepository.findOne({ where: { id } });
    return plainToInstance(User, user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    const newUser = this.usersRepository.create({ ...createUserDto, password: hashPassword });
    const savedUser = await this.usersRepository.save(newUser);
    return plainToInstance(User, savedUser);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }






async getUserInterests(userId: string): Promise<Interest[]> {
  const user = await this.usersRepository.findOne({
    where: { id: userId },
    relations: ['interests'],
  });

  if (!user) {
    throw new ConflictException('User not found');
  }

  return user.interests;
}

async addInterestsToUser(userId: string, interestNames: string[]) {
  const user = await this.usersRepository.findOne({
    where: { id: userId },
    relations: ['interests'],
  });

  if (!user) {
    throw new Error('User not found');
  }

  const interests = await this.interestsRepository.findBy({
    name: In(interestNames),
  });

  user.interests = interests;

   await this.usersRepository.save(user);

  return user;
}

}