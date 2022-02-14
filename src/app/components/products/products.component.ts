import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {

  public productList: any = [];
  searchKey: string = '';

  constructor(private api: ApiService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.api.getProducts()
      .subscribe(res => {
        this.productList = res;
        this.productList.forEach((a: any) => {
          Object.assign(a, {quantity: 1, total: a.price});
        });
      }, err => {
        alert("There was a problem getting data from the server!")
      });
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  filterElectronics() {
    this.productList.filter((item:any) => item.category === "electronics");
  }

}
