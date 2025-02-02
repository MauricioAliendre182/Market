import { TestBed, waitForAsync } from '@angular/core/testing';
import { ClientService } from './client.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { mockEnvironment } from './../../environments/environment.mock';
import { environment } from './../../environments/environment';
import { mockClient } from './../../mocks/client.mock';
import { Client } from '../models/client.model';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ClientService,
        { provide: environment, useValue: mockEnvironment },
      ],
    });
    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a client', waitForAsync(() => {
    service.createAClient(mockClient).subscribe((response) => {
      expect(response).toEqual(mockClient);
    });

    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/clients/save`
    );
    req.flush(mockClient);
    expect(req.request.method).toBe('POST');
  }));

  it('should get all clients', waitForAsync(() => {
    const mockClients: Client[] = [{ ...mockClient }, { ...mockClient }];

    service.getAllClients().subscribe((clients) => {
      expect(clients.length).toBe(2);
      expect(clients).toEqual(mockClients);
    });

    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/clients`
    );
    req.flush(mockClients);
    expect(req.request.method).toBe('GET');
  }));

  it('should get a client by ID', waitForAsync(() => {
    service.getAClientById('1').subscribe((client) => {
      expect(client).toEqual(mockClient);
    });

    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/clients/1`
    );
    req.flush(mockClient);
    expect(req.request.method).toBe('GET');
  }));

  it('should return an error when client not found (404)', waitForAsync(() => {
    service.getAClientById('1').subscribe({
      error: (error) => {
        expect(error).toBe('The client does not exist');
      },
    });

    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/clients/1`
    );
    // In the flush process, an error should be sent with the message error
    // and the mock error, in this case the message error is Client Not Found and the mock error
    // is an object with the statun and the status text
    req.flush('Client Not Found', { status: 404, statusText: 'Not Found' });
  }));

  it('should delete a client', waitForAsync(() => {
    service.deleteAClientById('1').subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/clients/delete/1`
    );
    req.flush(null);
    expect(req.request.method).toBe('DELETE');
  }));

  it('should return an error when deleting a client fails', waitForAsync(() => {
    service.deleteAClientById('1').subscribe({
      error: (error) => {
        expect(error).toBe('Server is failing');
      },
    });

    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/clients/delete/1`
    );
    req.flush('Delete Failed', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }));
});
