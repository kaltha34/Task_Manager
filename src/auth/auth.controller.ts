import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

// Mock user store and OTP store for demonstration
const users: any[] = [];
const otps: Record<string, string> = {};

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('register')
  @ApiOperation({ summary: 'Register a new user (OTP sent to log)' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'OTP sent to log. Use /auth/verify-otp to complete registration.' })
  register(@Body() registerDto: RegisterDto) {
    // Generate OTP and log it
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otps[registerDto.email] = otp;
    Logger.log(`OTP for ${registerDto.email}: ${otp}`);
    return { message: 'OTP sent to log. Use /auth/verify-otp to complete registration.' };
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP and create account' })
  @ApiBody({ schema: { properties: { email: { type: 'string' }, otp: { type: 'string' }, name: { type: 'string' }, password: { type: 'string' } } } })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  verifyOtp(@Body() body: { email: string; otp: string; name: string; password: string }) {
    if (otps[body.email] !== body.otp) {
      return { message: 'Invalid OTP' };
    }
    users.push({ email: body.email, name: body.name, password: body.password });
    delete otps[body.email];
    return { message: 'User registered successfully' };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and get JWT (mock)' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'JWT token returned' })
  login(@Body() loginDto: LoginDto) {
    const user = users.find(u => u.email === loginDto.email && u.password === loginDto.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    // In a real app, return a JWT here
    return { access_token: `mock-jwt-token-for-${user.email}` };
  }
}
