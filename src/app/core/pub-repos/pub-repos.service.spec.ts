import { TestBed, inject } from '@angular/core/testing';

import { PubReposService } from './pub-repos.service';

describe('PubReposService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PubReposService]
    });
  });

  it('should be created', inject([PubReposService], (service: PubReposService) => {



  }));
});
