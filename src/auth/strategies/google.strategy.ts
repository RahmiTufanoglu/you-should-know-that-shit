import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

//TODO
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
}
