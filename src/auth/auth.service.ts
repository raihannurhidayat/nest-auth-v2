import { HttpException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUser = [
  {
    id: 1,
    username: 'john',
    password: '123',
  },
  {
    id: 2,
    username: 'doe',
    password: '123',
  },
];

@Injectable()
export class AuthService {
  constructor(private readonly jwtservice: JwtService) {}

  validateUser({ username, password }: AuthPayloadDto) {
    const findUser = fakeUser.find((user) => user.username == username);
    if (!findUser) return null;
    if (password === findUser.password) {
      const { password, ...user } = findUser;
      return this.jwtservice.sign(user);
    }
  }
}
