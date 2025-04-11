import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class AdminService {
  constructor(private readonly usersService: UsersService) {}

  // Consultation de tous les utilisateurs
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll(); 
  }

//   // Suppression d'un utilisateur par ID
//   async deleteUser(userId: String): Promise<void> {
//     await this.usersService.remove(userId); 
//   }

//   // Donner un rôle d'admin à un utilisateur
//   async setAdminRole(userId: String): Promise<void> {
//     const user = await this.usersService.findOne(userId);
//     if (user) {
//       user.role = 'admin'; 
//       await this.usersService.update(user); 
//     }
//   }

//  // Enlever le rôle d'admin à un utilisateur
//   async removeAdminRole(userId: String): Promise<void> {
//     const user = await this.usersService.findOne(userId);
//     if (user) {
//       user.role = 'user'; // Enlève le rôle d'admin
//       await this.usersService.update(user);
//     }
//   }
}
