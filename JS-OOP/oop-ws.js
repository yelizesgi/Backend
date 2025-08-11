"use strict";

/* ------------------------------------------------------- *
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
//? Instance * Bir class'tan obje Türetme denemesi//

const MyClothes = new Clothes("Shirt", "Green", "Male", "100$");
console.log(MyClothes);
console.log(MyClothes.getDetails());
/* ------------------------------------------------------- */
//? INHERITANCE: Miras Alma. Başka bir class'ın tüm özeelik/metodlarını devralma. (parent-child ilişkisi kurulur.)
//? SUPER: Parent (Üst) Class - THIS: Child (Alt) Class

class Wear {
  sectionİsActive = true;

  constructor(wearType) {
    this.wearType = wearType;
  }
}

class Clothes extends Wear {
  //Inheritance
  option = true;
  constructor(model, color, genre, price, wearType) {
    super(wearType);
    this.model = model;
    this.color = color;
    this.genre = genre;
    this.price = price;
  }

  selectionMade(param1) {
    this.option = false;
    return "The Men clotheses made";
  }
}

const WomenClothes = new Clothes("Dress", "Pink", "women", "120$");
console.log(WomenClothes);

/* ------------------------------------------------------- */

/* ------------------------------------------------------- */
