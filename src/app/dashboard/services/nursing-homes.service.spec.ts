import { TestBed, inject } from '@angular/core/testing';
import { NursingHomesService } from './nursing-homes.service';
import { HttpClientModule } from '@angular/common/http';

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [NursingHomesService]
    });
  });

  it('should be created', inject([NursingHomesService], (service: NursingHomesService) => {
    expect(service).toBeTruthy();
  }));
});
