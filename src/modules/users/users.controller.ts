import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get("/list")
    getAll() {
        return this.usersService.findAll();
    }

    @Get("/:id")
    getOne(@Param("id") id: string) {
        return this.usersService.findOne(id);
    }
}
