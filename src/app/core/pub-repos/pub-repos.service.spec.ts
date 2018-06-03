import { TestBed, inject } from '@angular/core/testing';

import { PubReposService } from './pub-repos.service';
import {HttpClient} from "@angular/common/http";

describe('PubReposService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        PubReposService
      ]
    });
  });

  it('should be created', async () => {
    let pubRepos = TestBed.get(PubReposService)
    expect(pubRepos).toBeTruthy()
  });
});
