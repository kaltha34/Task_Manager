import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  register(@Body() registerDto: RegisterDto) {
    // Registration logic here
    return { message: 'User registered (mock)' };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and get JWT' })
  @ApiResponse({ status: 200, description: 'JWT token returned' })
  login(@Body() loginDto: LoginDto) {
    // Login logic here
    return { access_token: 'mock-jwt-token' };
  }
}
