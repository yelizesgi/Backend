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
/* ------------------------------------------------------- *
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

/* ------------------------------------------------------- *
class Materials extends Clothes{

  constructor(materialsName, model, color, genre, price){
    super(model, color, genre, price )
    this.materialsName = materialsName
  }
}

const womenCloth = new Materials('Thick Cloth', 'Dress', 'Purple', 'Women', '140$');

console.log(womenCloth);

/* ------------------------------------------------------- *

//? POLYMORPHISM: Miras aldığımız class'ın özellik ve metodlarını yeniden yazılabilmesi.
//? - Override: Üst metodla aynı isim ve yapıda yeni bir method yazma. (ezme / iptal etme / önceliği alma)
//? - Overload: Üst metodla aynı isimde ama farklı yapıda yeni bir method yazma. (her ikisi de aynı anda aktif.) (JS Overload desteklemez.)

class Wear {
  sectionİsActive = true;

  constructor(wearType) {
    this.wearType = wearType;
  }
  getSelection() {
    console.log("Clothing new selection made");
  }
}

class Clothes extends Wear {
  // Inheritance

  option = true;
  constructor(model, color, genre, price, wearType = "shirt") {
    super(wearType);
    this.model = model;
    this.color = color;
    this.genre = genre;
    this.price = price;
  }
  getWearSelection(param1) {
    console.log("Wear new selection made");
  }
}

const menWear = new Clothes("T-shirt", "Darkblue", "Men", "130$");
console.log(menWear);
console.log(menWear.getWearSelection());

/* ------------------------------------------------------- */
