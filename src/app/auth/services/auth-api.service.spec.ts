import { TestBed, inject } from '@angular/core/testing';

import { AuthApiService } from './auth-api.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

describe('AuthApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        JwtModule.forRoot({})
      ],
      providers: [AuthApiService]
    });
  });

  it('should be created', inject([AuthApiService], (service: AuthApiService) => {
    expect(service).toBeTruthy();
  }));
});
