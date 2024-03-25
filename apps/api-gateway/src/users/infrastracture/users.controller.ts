import { User } from '@app/common';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { USER_SERVICE } from '../../constants';
import { ErrorHandlerService } from '../../error/error-handler.service';
import { catchError } from 'rxjs';
@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_SERVICE) private userService: ClientRMQ,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  @Get()
  findUsers(): Observable<User[]> {
    return this.userService.send({ cmd: 'findUsers' }, {});
  }

  @Get(':userId')
  findUser(@Param('userId') userId: string): Observable<User> {
    return this.userService.send({ cmd: 'findUser' }, userId).pipe(
      catchError((val) => {
        this.errorHandlerService.handle(val);

        return val;
      }),
    );
  }
}
