import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInRequestDto, SignInResponseDto, SignUpRequestDto } from './dtos';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() createUserDto: SignUpRequestDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signIn(@Body() createUserDto: SignInRequestDto): Promise<SignInResponseDto> {
    return this.authService.signIn(createUserDto);
  }
}
