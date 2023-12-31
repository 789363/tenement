// jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || '789363',
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.user_name,
      isadmin: payload.isadmin // 确保 JWT payload 中包含此字段
    };
  }
}


