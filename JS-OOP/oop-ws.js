"use strict";

/* ------------------------------------------------------- */
class Clothes {
  option = true;
  constructor(model, color, genre, price) {
    this.model = model;
    this.color = color;
    this.genre = genre;
    this.price = price;
  }
  getDetails() {
    console.log("Clothing selection made");
  }
}

/* ------------------------------------------------------- *
//? Instance * Bir class'tan obje Türetme denemesi

const MyClothes = new Clothes("Shirt", "Green", "Male", "100$");
console.log(MyClothes);
console.log(MyClothes.getDetails());
/* ------------------------------------------------------- */
