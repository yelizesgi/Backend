"use strict"

/* -------------------------------------------------------
    OOP & CLASSES
------------------------------------------------------- *
//? OOP: Object Oriented Programming
//? DRY: Don't Repeat Yourself
//? BLUEPRINT: Taslak (Mimarların kullandığı mavi şablon kağıdı)
//? CLASS: Obje türetmek için kullanılacak şablon.

//* Class Declaration:
// class PascalCaseClassName {
//     ...    
// }

//* Class Expression:
const PascalCaseClassName = class {

    propertyName = 'value' // property, attribute, field
    undefinedProperty // sadece tanımlama yapabiliriz. (değeri undefined olur.)

    methodName1() {
        return 'method'
    }

}

/* ------------------------------------------------------- *
//? INSTANCE * Bir class'tan türetilen objedir.

class Car {

    isRunning = false

    //* Class içine gönderilen parametreleri alabilmek için "contructor" methodu kullanılır.
    constructor(brand, model, year) {
        this.brand = brand
        this.model = model
        this.year = year
    }

    runEngine(param1) {
        this.isRunning = true
        console.log(param1)
        return 'Motor Çalıştı'
    }

}

// const PascalCaseInstanceName = new Car() // Instance
// console.log(PascalCaseInstanceName)
// console.log(PascalCaseInstanceName.isRunning)
// console.log(PascalCaseInstanceName.runEngine('test-value'))

const Ford = new Car('Ford', 'Mustang', 1967)
console.log(Ford)

const Mercedes = new Car('Mercedes', 'CLK200', 2010)
console.log(Mercedes)

// console.log(Ford.isRunning)
// Ford.isRunning = true
// console.log(Ford.isRunning)
// console.log(Mercedes.isRunning)

console.log(Ford.isRunning)
console.log(Ford.runEngine())
console.log(Ford.isRunning)


/* ------------------------------------------------------- *
//? INHERITANCE: Miras Alma. Başka bir class'ın tüm özeelik/metodlarını devralma. (parent-child ilişkisi kurulur.)
//? SUPER: Parent (Üst) Class - THIS: Child (Alt) Class

class Vehicle {

    vehicleIsActive = false

    constructor (vehicleType) {
        this.vehicleType = vehicleType
    }

}

class Car extends Vehicle { // Inheritance

    isRunning = false

    constructor(brand, model, year, vehicleType = 'Car') {
        // super() parametresi parent-class'ı ifade eder. Her zaman üstte olmalı.
        super(vehicleType)
        this.brand = brand
        this.model = model
        this.year = year
    }

    runEngine(param1) {
        this.isRunning = true
        return 'Motor Çalıştı'
    }

}

// const Ford = new Car('Ford', 'Mustang', 1967)
// console.log(Ford)
// const Ford = new Car('Ford', 'Mustang', 1967, 'Car')
// console.log(Ford)

class Accessory extends Car {

    constructor(accessoryName, brand, model, year) {
        super(brand, model, year)
        this.accessoryName = accessoryName
    }

}

const FordClimate = new Accessory('Bosh Climate', 'Ford', 'Mustang', 1967)
console.log(FordClimate)



/* ------------------------------------------------------- *
//? POLYMORPHISM: Miras aldığımız class'ın özellik ve metodlarını yeniden yazılabilmesi.
//? - Override: Üst metodla aynı isim ve yapıda yeni bir method yazma. (ezme / iptal etme / önceliği alma)
//? - Overload: Üst metodla aynı isimde ama farklı yapıda yeni bir method yazma. (her ikisi de aynı anda aktif.) (JS Overload desteklemez.)

class Vehicle {

    vehicleIsActive = false

    constructor(vehicleType) {
        this.vehicleType = vehicleType
    }

    getDetails() {
        console.log('Vehicle içindeki getDetails çalıştı.')
        return this.vehicleType
    }

}

class Car extends Vehicle { // Inheritance

    isRunning = false

    constructor(brand, model, year, vehicleType = 'Car') {
        super(vehicleType)
        this.brand = brand
        this.model = model
        this.year = year
    }

    runEngine(param1) {
        this.isRunning = true
        return 'Motor Çalıştı'
    }

    //? Override: Parent class'daki metodun aynen yeniden yazılabilmesi.
    //? Üstteki getDetails yerine bu çalışacak:
    getDetails() {
        console.log('Car içindeki getDetails çalıştı.')
        return super.getDetails()
        // return this.brand
    }

    //? Overload: Üstteki methodun aynı isim ama farklı parametre adet/tip ile yeniden tanımlanması.
    //? JS Desteklemez. TypeScript destekler.
    //? Çalışma prensibi: Çağrıldığı zaman parametreye göre ilgili method çalışır.
    // getDetails(parametre1, parameter2) {
    //     return this
    // }

}

const Ford = new Car('Ford', 'Mustang', 1967, 'Car')
console.log(Ford)
console.log(Ford.getDetails())


/* ------------------------------------------------------- *
//? Access Modifiers:
//? - PUBLIC: Genel erişime açık. (Parent: Yes, Child: Yes, Instance: Yes)
//? - PROTECTED (_): Sadece tanımlı olduğu class ve inherit edilen class içinden erişilebilir. (Parent: Yes, Child: Yes, Instance: No)
//? - PRIVATE (#): Sadece tanımlı olduğu class içinden erişebilir. (Parent: Yes, Child: No, Instance: No)


class Vehicle {

    vehicleIsActive = false // PUBLIC PROPERTY

    //* JS "protected" desteklemez:
    _protectedProperty = 'protected-value' // PROTECTED PROPERTY
    _protectedMethod() { return this } // PROTECTED METHOD

    #privateProperty = 'private-value' // PRIVATE PROPERTY
    #privateMethod() { return this } // PRIVATE METHOD

    constructor(vehicleType) {
        this.vehicleType = vehicleType
    }

    getDetails() {
        console.log('Vehicle içindeki getDetails çalıştı.')
        return this.vehicleType
    }

}

class Car extends Vehicle {

    isRunning = false

    constructor(brand, model, year, vehicleType = 'Car') {
        super(vehicleType)
        this.brand = brand
        this.model = model
        this.year = year
    }

    runEngine(param1) {
        this.isRunning = true
        return 'Motor Çalıştı'
    }
    
    getDetails() {

        console.log('Public', this.vehicleType) // Public: Class Erişebilir.
        console.log('Protected', this.protectedProperty) // Protected: Class Erişebilir.
        console.log('Protected', this._protectedProperty) // Protected: Class Erişebilir.
        console.log('Private', this.privateProperty) // Private: Class Erişemez.
        // console.log('Private', this.#privateProperty) // Private: Class Erişemez.

        console.log('Car içindeki getDetails çalıştı.')
        return super.getDetails()
    }

}

const Ford = new Car('Ford', 'Mustang', 1967, 'Car')
console.log(Ford)
console.log(Ford.vehicleIsActive) // Public: Instance Erişti.
console.log(Ford.protectedProperty) // Protected: Instance Erişemez.
console.log(Ford.privateProperty) // Private: Instance Erişemez.
console.log(Ford.getDetails())

/* ------------------------------------------------------- */
//? GETTER & SETTER METHODS: Görevi veri getirme (getter) ve veri güncelleme (setter) olan metodlardır.
//? "STATIC" KEYWORD: Class'dan direkt erişim. (Instance erişemez.)


class Car {

    isRunning = false
    #price = 999

    constructor(brand, model, year, vehicleType = 'Car') {
        this.brand = brand
        this.model = model
        this.year = year
    }

    runEngine(param1) {
        this.isRunning = true
        return 'Motor Çalıştı'
    }
    
    getDetails() { // getter method
        console.log('Car içindeki getDetails çalıştı.')
        return super.getDetails()
    }

    get getPrice() {
        console.log('Fiyat görüntülendi.')
        return this.#price
    }

    set setPrice(newPrice) {
        console.log('Fiyat güncellendi.')
        this.#price = newPrice
        return this.#price
    }

    //? Direkt class'tan erişmek için "static" keyword kullanılabilir.
    //? "static" ile tanımlanmış değere instance'dan erişemeyiz.
    static staticProp = 'static-value'
    static staticMethod() {
        return 'static-method'
    }

}

const Ford = new Car('Ford', 'Mustang', 1967, 'Car')

// console.log(Ford.price) // undefined
// console.log(Ford.getPrice) // getter  metodlar property gibi çağrılır.
// Ford.setPrice = 2000 // setter  metodlar property gibi güncellenir.
// // console.log(Ford.setPrice(2000)) // setter methodlar artık bir normal method gibi çalışmaz.
// console.log(Ford.getPrice)

console.log(Car.staticProp) // Direkt class'tan erişim.
console.log(Car.staticMethod())
// console.log(Ford.staticProp) // Instance erişemez. (hata verir)
// console.log(Ford.staticMethod())

/* ------------------------------------------------------- */
//? ABSTRACTION: Soyutlama/Modelleme (Class ile obje üretebilme. Aynı amaç için kullanılan değişken ve methodların bir class içinde yazıyor olması)
//? ENCAPCULLATION: Kapsülleme/Ayrıştırma (Kodların gizliliği, private değişkenlere erişilemiyor olması ve birbirinden bağımsız çalışmaları.)
/* ------------------------------------------------------- */

//* HAPPY CODDING :)