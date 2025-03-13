import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return plainToInstance(User, users);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    return plainToInstance(User, user);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {

    //verification que l'email n'existe pas en bdd
    const existingUser = await this.userRepository.findOneBy({email : createUserDto.email,});
    if(existingUser){
      throw new ConflictException('cet email est déja utilisé');
    }

    //Hash du mdp
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(createUserDto.password,saltRounds);

    //inserer et return user
    const newUser = this.userRepository.create({ ...createUserDto });
    const savedUser = await this.userRepository.save(newUser);
    return plainToInstance(User, savedUser); //pour exclure le mdp 
  }
}