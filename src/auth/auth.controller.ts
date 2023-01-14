import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInRequestDto, SignInResponseDto, SignUpRequestDto } from './dtos';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse()
  signUp(@Body() createUserDto: SignUpRequestDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  @ApiCreatedResponse({ type: SignInResponseDto })
  signIn(@Body() createUserDto: SignInRequestDto): Promise<SignInResponseDto> {
    return this.authService.signIn(createUserDto);
  }
}
