import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UserLogged } from 'src/common/decorators/auth.decorator';
import { User } from 'src/entities/user-entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly customerService: UserService) {}

  @Get('my-infor')
  getMyInfo(
    @UserLogged() user: User,
  ) {
    return this.customerService.getMyInfo(user.id);
  }


}
