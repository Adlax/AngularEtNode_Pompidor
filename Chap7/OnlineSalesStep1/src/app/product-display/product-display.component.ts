import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  public products: any[] = [
  {
    "type":"phone",
    "brand":"Peach",
    "name":"topPhone 8 32G",
    "popularity":4,
    "price":900,
    "picture":"topphone8.jpeg",
    "stock":5
  },
  {
    "type":"phone",
    "brand":"Peach",
    "name":"topPhone 8 64G",
    "popularity":5,
    "price":1000,
    "picture":"topphone8.jpeg",
    "stock":20
  },
  {
    "type":"phone",
    "brand":"Peach",
    "name":"topPhone 8 256G",
    "popularity":4,
    "price":1300,
    "picture":"topphone8.jpeg",
    "stock":18
  },
  {
    "type":"phone",
    "brand":"Threestars",
    "name":"bigPhone 9",
    "popularity":4,
    "price":700,
    "picture":"bigphone9.jpeg",
    "stock":10
  },
  {
    "type": "phone",
    "brand" : "Konia",
    "name" : "Konia4000",
    "picture" : "konia4000.jpeg",
    "stock":0
  },
  {
    "type":"computer",
    "brand":"Vale",
    "name":"Vale 3000",
    "popularity":4,
    "price":700,
    "picture":"vale3000.jpeg",
    "stock":32
  },
  {
    "type":"computer",
    "brand":"Peach",
    "name":"Peach pro",
    "popularity":5,
    "price":1300,
    "picture":"peachpro.jpeg",
    "stock":8
  },
  {
    "type":"tablet",
    "brand":"Threestars",
    "name":"bigTablet",
    "popularity":4,
    "price":200,
    "picture":"tbigablet.jpeg",
    "stock":25
  },
  {
    "type":"headset",
    "brand":"Earlid",
    "name":"Earlid Pro",
    "popularity":5,
    "price":300,
    "picture":"earlidpro.jpeg",
    "stock":21
  },
  {
    "type":"headset",
    "brand":"Earlid",
    "name":"Earlid Studio",
    "popularity":4,
    "price":400,
    "picture":"earlidstudio.jpeg",
    "stock":12
  },
  {
    "type":"game console",
    "brand":"Notendi",
    "name":"3NTD",
    "popularity":5,
    "price":100,
    "picture":"notendi3.jpeg",
    "stock":15
  },
  {
    "type":"game console",
    "brand":"Notendi",
    "name":"4NTD",
    "popularity":4,
    "price":150,
    "picture":"notendi4.jpeg",
    "stock":5
  },
  {
    "type":"game console",
    "brand":"Playgame",
    "name":"Playgame 5",
    "popularity":5,
    "price":300,
    "picture":"pg5.jpeg",
    "stock":15
  },
  {
    "type":"charger",
    "brand":"Peach",
    "name":"Peachcharger",
    "popularity":3,
    "price":50,
    "picture":"peachcharger.jpeg",
    "stock":35
  }
];

  constructor() { }

  ngOnInit(): void {
  }

}
