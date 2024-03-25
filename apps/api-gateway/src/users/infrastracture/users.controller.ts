import { User } from '@app/common';
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { USER_SERVICE } from '../../constants';

@Controller('users')
export class UsersController {
  constructor(@Inject(USER_SERVICE) private userService: ClientRMQ) {}

  @Get()
  findUsers(): Observable<User[]> {
    return this.userService.send({ cmd: 'findUsers' }, {});
  }
}
