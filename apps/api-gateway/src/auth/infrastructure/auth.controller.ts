import { Body, Controller, Inject, Param, Put } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { AUTH_SERVICE } from '../../constants';
import { CreateUserDto } from '@app/common';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from '../../error/error-handler.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private authService: ClientRMQ,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  @Put('signup/:userId')
  signup(
    @Param('userId') userId: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.authService
      .send({ cmd: 'createUser' }, { userId, createUserDto })
      .pipe(
        catchError((val) => {
          this.errorHandlerService.handle(val);

          return val;
        }),
      );
  }
}
