import { Controller, Get, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Récupérer tous les utilisateurs
  @Get('users')
  @Roles('admin') 
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  // // Supprimer un utilisateur
  // @Delete('user/:id')
  // @Roles('admin') 
  // deleteUser(@Param('id') id: String) {
  //   return this.adminService.deleteUser(id);
  // }

  // // Donner un rôle d'admin à un utilisateur
  // @Patch('user/:id/assign-admin')
  // @Roles('admin') 
  // assignAdmin(@Param('id') id: String) {
  //   return this.adminService.setAdminRole(id);
  // }

  // // Enlever le rôle d'admin à un utilisateur
  // @Patch('user/:id/remove-admin')
  // @Roles('admin') 
  // removeAdmin(@Param('id') id: String) {
  //   return this.adminService.removeAdminRole(id);
  // }
}
