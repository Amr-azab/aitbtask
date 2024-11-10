import { TestBed } from '@angular/core/testing';

import { ListOfItemsService } from './list-of-items.service';

describe('ListOfItemsService', () => {
  let service: ListOfItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOfItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
