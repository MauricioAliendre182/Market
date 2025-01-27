import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CreatePurchaseDTO, Purchase } from 'src/app/models/purchase.model';
import { ProductsService } from 'src/app/services/products.service';
import { PurchasesService } from 'src/app/services/purchases.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss'],
})
export class MycartComponent {
  cartProducts: Product[] = [];
  purchase: CreatePurchaseDTO = {
    clientId: '',
    date: new Date(),
    paymentMethod: 'cash',
    comment: '',
    state: 'failed',
    items: [
      {
        productId: 0,
        quantity: 0,
        total: 0,
        active: false,
      },
    ],
  };

  constructor(
    private storeService: StoreService,
    private purchasesServices: PurchasesService,
    private productsServices: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.cartProducts = products;
      this.purchase.items = products.map((product) => ({
        productId: product.productId,
        quantity: this.storeService.getQuantityPerItem(product.productId),
        total: this.storeService.getTotalPricePerItem(product.productId),
        active: product.active,
      }));
    });

    // this.storeService.userId$.subscribe((userId) => {
    //   this.purchase.clientId = userId;
    // });
    this.purchase.clientId = '2552243'
  }

  backProducts() {
    this.router.navigate(['/home']);
  }

  // TODO Correct the values produced here and in quantity
  getTotalProductsForAPurchase() {
    console.log(this.purchase.items
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      }))
    return this.purchase.items
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
      .reduce((sum, item) => sum + item.total, 0);
  }

  getQuantityProductsForAPurchase() {
    return this.purchase.items.length;
  }

  submitPurchase() {
    console.log('Purchase Submitted:', this.purchase);

    // Create the purchase request
    const purchaseRequest = this.purchasesServices.createAPurchase(
      this.purchase
    );

    // Fetch the full product details for each item in the purchase
    const productDetailRequests = this.purchase.items.map((item) =>
      this.productsServices.getProduct(item.productId).pipe(
        map((product: Product) => ({
          ...product,
          stock: product.stock - item.quantity,
        }))
      )
    );

    // Use forkJoin to make both the purchase creation and product updates concurrently
    forkJoin([purchaseRequest, ...productDetailRequests]).subscribe({
      next: (responses) => {
        // First response will be the purchase creation, rest will be product updates
        const [purchaseResponse, ...productUpdates] = responses;

        // Send product update requests
        productUpdates.forEach((product: Product) => {
          this.productsServices
            .updateProduct(product, product.productId)
            .subscribe({
              next: (updateResponse) => {
                console.log('Product updated:', updateResponse);
              },
              error: (err) => {
                console.error('Error updating product:', err);
              },
            });
        });

        console.log(
          'Purchase and product updates completed:',
          purchaseResponse
        );
        alert('🎉 Purchase placed successfully!');
        this.storeService.clearCart();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error in purchase or product update:', err);
        alert('❌ Something went wrong. Please try again!');
      },
    });
  }
}
