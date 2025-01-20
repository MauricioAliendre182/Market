import { TestBed, waitForAsync } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { mockEnvironment } from './../../environments/environment.mock';
import { environment } from './../../environments/environment';
import {
  mockCreateProductRequest,
  mockProductResponse,
  mockUpdateProductRequest
} from './../../mocks/product.mock';
import { Product } from '../models/product.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // This is to override the default environment object used in your Angular application with a mocked version (mockEnvironment) during testing.
      //provide: Specifies the token to be overridden (environment in this case).
      // useValue: Supplies the value to use instead of the original (mockEnvironment).
      providers: [
        ProductsService,
        { provide: environment, useValue: mockEnvironment },
      ],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures no pending HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get product list by category', waitForAsync(() => {
    // Arrange
    // I want to know the price in thic case
    const mockProductData: Product[] = [
      {
        ...mockProductResponse,
        name: "Product 1",
        categoryId: 1
      },
      {
        ...mockProductResponse,
        name: "Product 2",
        categoryId: 1
      },
      {
        ...mockProductResponse,
        name: "Product 3",
        categoryId: 2
      },
    ];

    // Act
    service.getProductByCategory("1").subscribe((response) => {
      // Assert
      expect(response.length).toEqual(2);
      expect(response[0].name).toEqual("Product 1");
      expect(response[0].categoryId).toEqual(1);
      expect(response[1].name).toEqual("Product 2");
      expect(response[1].categoryId).toEqual(1);
    })

    // http config
    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/products/category/1`
    );

    // with req.flush we return the data that we want
    mockProductData.pop()
    req.flush(mockProductData); // Mock the response

    expect(req.request.method).toBe('GET');
  }));

  it('should get product list by category with one product', waitForAsync(() => {
    // Arrange
    // I want to know the price in thic case
    const mockProductData: Product[] = [
      {
        ...mockProductResponse,
        name: "Product 1",
        categoryId: 1
      },
      {
        ...mockProductResponse,
        name: "Product 2",
        categoryId: 1
      },
      {
        ...mockProductResponse,
        name: "Product 3",
        categoryId: 2
      },
    ];

    // Act
    service.getProductByCategory("1", 1, 0).subscribe((response) => {
      // Assert
      expect(response.length).toEqual(1);
      expect(response[0].name).toEqual("Product 1");
      expect(response[0].categoryId).toEqual(1);
      expect(response[1]).toBeUndefined();
      expect(response[1]).toBeUndefined();
    })

    // http config
    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/products/category/1?limit=1&offset=0`
    );

    // with req.flush we return the data that we want
    mockProductData.pop();
    mockProductData.pop();
    req.flush(mockProductData); // Mock the response

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('limit')).toBe('1');
    expect(req.request.params.get('offset')).toBe('0');
  }));

  it('should NOT get a product list when the category ID is incorrect', waitForAsync(() => {
    // Act
    service.getProductByCategory("3").subscribe({
      error: (error) => {
        // Assert
        expect(error).toBe("Products not found")
      }
    })

    // http config
    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/products/category/3`
    );

    // with req.flush we return the data that we want
    req.flush(null, { status: 404, statusText: 'Products not found' }); // Mock the response

    expect(req.request.method).toBe('GET');
  }));

  it('should get product list with only one product', waitForAsync(() => {
    // Arrange
    // I want to know the price in thic case
    const mockProductData: Product[] = [
      {
        ...mockProductResponse,
        name: "Product 1",
      },
      {
        ...mockProductResponse,
        name: "Product 2",
      },
    ];

    // Act
    service.getAllProducts(1, 0).subscribe((response) => {
      // Assert
      expect(response.length).toEqual(1);
      expect(response[0].name).toEqual("Product 1");
      expect(response[1]).toBeUndefined();
    })

    // http config
    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/products?limit=1&offset=0`
    );

    // with req.flush we return the data that we want
    mockProductData.pop();
    req.flush(mockProductData); // Mock the response

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('limit')).toBe('1');
    expect(req.request.params.get('offset')).toBe('0');
  }));

  it('should get product list with taxes', waitForAsync(() => {
    // Arrange
    // I want to know the price in thic case
    const mockProductData: Product[] = [
      {
        ...mockProductResponse,
        price: 100, // 100 * .19 = 19
      },
      {
        ...mockProductResponse,
        price: 200, // 200 * .19 = 38
      },
    ];

    // Act
    service.getAllProducts(2, 0).subscribe((response) => {
      // Assert
      expect(response.length).toEqual(mockProductData.length);
      expect(response[0].taxes).toEqual(19);
      expect(response[1].taxes).toEqual(38);
    })

    // http config
    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/products?limit=2&offset=0`
    );

    // with req.flush we return the data that we want
    req.flush(mockProductData); // Mock the response

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('limit')).toBe('2');
    expect(req.request.params.get('offset')).toBe('0');
  }));

  it('should get product list with taxes equals to 0 in case negative prices', waitForAsync(() => {
    // Arrange
    // I want to know the price in thic case
    const mockProductData: Product[] = [
      {
        ...mockProductResponse,
        price: -100,
      },
      {
        ...mockProductResponse,
        price: -200,
      },
    ];

    // Act
    service.getAllProducts(2, 0).subscribe((response) => {
      // Assert
      expect(response.length).toEqual(mockProductData.length);
      expect(response[0].taxes).toEqual(0);
      expect(response[1].taxes).toEqual(0);
    })

    // http config
    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/products?limit=2&offset=0`
    );

    // with req.flush we return the data that we want
    req.flush(mockProductData); // Mock the response

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('limit')).toBe('2');
    expect(req.request.params.get('offset')).toBe('0');
  }));

  it('should send a POST request to create a product', waitForAsync(() => {
    // mockReponseAdminUser is what BE is supposed to return
    service.createProduct(mockCreateProductRequest).subscribe((response) => {
      expect(response).toEqual(mockProductResponse);
    });

    // http config
    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/products/save`
    );

    // with req.flush we return the data that we want
    req.flush(mockProductResponse); // Mock the response

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCreateProductRequest);
  }));

  it('should send a PUT request to update a product', waitForAsync(() => {
    // mockReponseAdminUser is what BE is supposed to return
    service.updateProduct(mockUpdateProductRequest, 1).subscribe((response) => {
      expect(response).toEqual(mockProductResponse);
    });

    // http config
    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/products/update/1`
    );

    // with req.flush we return the data that we want
    req.flush(mockProductResponse); // Mock the response

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockUpdateProductRequest);
  }));

  it('should send a DELETE request to delete a product', waitForAsync(() => {
    // mockReponseAdminUser is what BE is supposed to return
    service.deleteProduct(1).subscribe((response) => {
      expect(response).toBeNull(); //DELTE returns void
    });

    // http config
    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/products/delete/1`
    );

    // with req.flush we return the data that we want
    req.flush(null); // Mock the response

    expect(req.request.method).toBe('DELETE');
  }));

  it('should successfully fetch products by page with limit and offset', () => {
    const mockProductData: Product[] = [
      {
        ...mockProductResponse,
        name: "Product 1",
      },
      {
        ...mockProductResponse,
        name: "Product 2",
      },
      {
        ...mockProductResponse,
        name: "Product 3",
      },
    ];
    const limit = 2;
    const offset = 0;

    service.getProductByPage(limit, offset).subscribe((products) => {
      expect(products.length).toEqual(2);
      expect(products[0].name).toEqual("Product 1");
      expect(products[1].name).toEqual("Product 2");
    });

    // Mock GET request with query params
    mockProductData.pop();
    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/products?limit=2&offset=0`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProductData);
  });

  it('should return an empty array when no products are found in the page', () => {
    const limit = 2;
    const offset = 0;

    service.getProductByPage(limit, offset).subscribe((products) => {
      expect(products).toEqual([]);
    });

    // Mock GET request with an empty response
    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/products?limit=2&offset=0`
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should return an error if the request to request a product by page fails', () => {
    const limit = 2;
    const offset = 0;

    service.getProductByPage(limit, offset).subscribe({
      next: (products) => {
        // This should not be called
      },
      error: (error) => {
        expect(error).toBe('Ups..something was wrong');
      }
    });

    // Mock GET request with error response
    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/products?limit=2&offset=0`
    );
    expect(req.request.method).toBe('GET');
    req.flush('Something went wrong', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should successfully get a product', () => {
    service.getProduct(1).subscribe((product) => {
      expect(product).toEqual(mockProductResponse);
    });

    // Mock GET request
    const req = httpMock.expectOne(`${mockEnvironment.API_URL}/market/api/products/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProductResponse);
  });

  it('should return error if product not found (404)', () => {
    service.getProduct(1).subscribe({
      error: (error) => {
        expect(error).toBe('The product does not exist');
      }
    });

    // Mock GET request with 404 error
    const req = httpMock.expectOne(`${mockEnvironment.API_URL}/market/api/products/1`);
    req.flush('Product Not Found', { status: 404, statusText: 'Not Found' });
  });

  it('should return error if server fails (500)', () => {
    service.getProduct(1).subscribe({
      error: (error) => {
        expect(error).toBe('Server is failing');
      }
    });

    // Mock GET request with 500 error
    const req = httpMock.expectOne(`${mockEnvironment.API_URL}/market/api/products/1`);
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should return error if access is forbidden (403)', () => {
    service.getProduct(1).subscribe({
      error: (error) => {
        expect(error).toBe('The access is forbidden');
      }
    });

    // Mock GET request with 403 error
    const req = httpMock.expectOne(`${mockEnvironment.API_URL}/market/api/products/1`);
    req.flush('Forbidden', { status: 403, statusText: 'Forbidden' });
  });

  it('should return generic error for other errors', () => {
    service.getProduct(1).subscribe({
      error: (error) => {
        expect(error).toBe('Ups..something was wrong');
      }
    });

    // Mock GET request with a different error
    const req = httpMock.expectOne(`${mockEnvironment.API_URL}/market/api/products/1`);
    req.flush('Something went wrong', { status: 400, statusText: 'Bad Request' });
  });

  it('should fetch product and update it simultaneously', () => {
    service.fetchReadAndUpdate(1, mockUpdateProductRequest).subscribe(([product, updatedProduct]) => {
      expect(product).toEqual(mockProductResponse);
      expect(updatedProduct).toEqual(mockProductResponse);
    });

    // Mock the GET request
    const req1 = httpMock.expectOne(`${mockEnvironment.API_URL}/market/api/products/1`);
    expect(req1.request.method).toBe('GET');
    req1.flush(mockProductResponse);

    // Mock the PUT request
    const req2 = httpMock.expectOne(`${mockEnvironment.API_URL}/market/api/products/update/1`);
    expect(req2.request.method).toBe('PUT');
    req2.flush(mockProductResponse);
  });

  it('should fetch product first and update it afterward', () => {
    service.fetchFirstReadAndLastlyUpdate(1, mockUpdateProductRequest).subscribe((updatedProduct) => {
      expect(updatedProduct).toEqual(mockProductResponse);
    });

    // Mock the GET request
    const req1 = httpMock.expectOne(`${mockEnvironment.API_URL}/market/api/products/1`);
    expect(req1.request.method).toBe('GET');
    req1.flush(mockProductResponse);

    // Mock the PUT request
    const req2 = httpMock.expectOne(`${mockEnvironment.API_URL}/market/api/products/update/${mockProductResponse.productId}`);
    expect(req2.request.method).toBe('PUT');
    req2.flush(mockProductResponse);
  });

  it('should return error if product is not found before updating (404)', () => {
    service.fetchFirstReadAndLastlyUpdate(999, mockUpdateProductRequest).subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        // Simulate 404 error
        expect(error).toBeUndefined();
      }
    });

    // Mock GET request with a 404 error
    const req = httpMock.expectOne(`${mockEnvironment.API_URL}/market/api/products/999`);
    expect(req.request.method).toBe('GET');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });

  it('should return error if update fails (500)', () => {
    service.fetchReadAndUpdate(1, mockUpdateProductRequest).subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('Ups..something was wrong');
      },
    });

    // Mock the GET request
    const req1 = httpMock.expectOne(`${mockEnvironment.API_URL}/market/api/products/1`);
    expect(req1.request.method).toBe('GET');
    req1.flush(mockProductResponse);

    // Mock the PUT request
    const req2 = httpMock.expectOne(`${mockEnvironment.API_URL}/market/api/products/update/1`);
    expect(req2.request.method).toBe('PUT');
    req2.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });

});
