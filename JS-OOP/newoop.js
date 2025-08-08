"use strict"

/* -------------------------------------------------------
    OOP -> Object Oriented Programming
------------------------------------------------------- */

/* -------------------------------------------------------
    OBJECTS
------------------------------------------------------- *

// JS'de direkt obje oluşturabilirim (Class'a ihtiyaç duymadan.)
// Obje isimlendirmede PascalCase veya camelCase isimledirme yapabiliriz.

const exampleObject = {

    propertyName: 'value', // property, attribute, field

    methodName: function () { // method
        return "bu bir method'dur"
    },

    methodNameAlternative() {
        return "bu da bir method'dur"
    }
}
// Nokta ile içerdeki dataya ulaşabilirim. (Dot Notaion)
console.log( exampleObject.propertyName  )
console.log( exampleObject.methodName()  )
console.log( exampleObject.methodNameAlternative()  )

/* ------------------------------------------------------- *

const Car = {

    brand: 'Ford',
    model: 'Mustang',
    year: 1967,
    isAutoGear: true,
    colors: ['White', 'Red'],
    details: {
        color1: 'white',
        color2: 'red',
        engineSize: 4900
    },
    startEngine: function(parametre = 'default') {
        console.log(parametre)
        return 'Engine started.'
    }
}

// console.log( Car.brand )
// console.log( Car.colors )
// console.log( Car.colors[0] )
// console.log( Car.details )
// console.log( Car.details.engineSize )
// console.log( Car.startEngine() )
// console.log( Car.startEngine('ok') )

// Alternative Style:
console.log( Car['brand'] )
console.log( Car['colors'] )
console.log( Car['colors'][0] )
console.log( Car['details'] )
console.log( Car['details']['engineSize'] )
console.log( Car['startEngine']() )


/* ------------------------------------------------------- *
//? 'THIS' KEYWORD

const Car = {

    brand: 'Ford',
    model: 'Mustang',
    year: 1967,
    isAutoGear: true,
    colors: ['White', 'Red'],
    details: {
        color1: 'white',
        color2: 'red',
        engineSize: 4900
    },
    startEngine: function (parametre = 'default') {
        console.log(parametre)
        return 'Engine started.'
    },
    getDetails() {
        // return this.details
        // return this
        return this.startEngine()
    },
    arrowFunction: () => {
        //* Arrow functions is globalScope. (Not working this keyword in here.)
        return this
    }
}


// console.log( Car.getDetails() ) // Functions are in localScope.
console.log( Car.arrowFunction() ) // ArrowFunctions ara in globalScope.

/* ------------------------------------------------------- *
//? ARRAY DESTRUCTURING

const testArray = ['value0', 'value1', 'value2', 'value3', 'value4']

// const var0 = testArray[0]
// const var1 = testArray[1]
// const var2 = testArray[2]
// const varOther = testArray.slice(3, 5)
// console.log(var0, var1, var2, varOther)

//? Sıralama Önemli.
// const [var0, var1, var2, ...varOther] = testArray
// console.log(var0, var1, var2, varOther)

//? Rest Operatör (Toplayıcı) (Eşittirin sol tarafında) (En sonda olmak zorunda)
const [firstItem, secondItem, ...others] = testArray
console.log(firstItem, secondItem, others)

//? Spread Operatör (Dağıtıcı) (Eşittirin sağ tarafında)
const newArray = [...testArray, 'value5', 'value6']


/* ------------------------------------------------------- *
//? OBJECT DESTRUCTURING

const Car = {

    brand: 'Ford',
    model: 'Mustang',
    year: 1967,
    isAutoGear: true,
    colors: ['White', 'Red'],
    details: {
        color1: 'white',
        color2: 'red',
        engineSize: 4900
    },
    startEngine: function(parametre = 'default') {
        console.log(parametre)
        return 'Engine started.'
    }
}

//? Sıralama önemli değil, key isimleri önemli.
//? Rest Operator:
// const { year, model, brand, ...others } = Car
// console.log(year, model, brand, others)
//? İsim değişikliği yapma:
// const { year, model: newName, brand, ...others } = Car
// console.log(year, newName, brand, others)
//? Default değer atama:
// const { year, model: newName, brand, type = 'default-value', ...others } = Car
// console.log(year, newName, brand, type, others)

//? Spread Operatör:
// const newObj = {
//     ...Car,
//     newKey: 'new-value'
// }
// console.log(newObj)

//? Object to JSON:
// console.log(typeof Car, Car)
// const json = JSON.stringify(Car)
// console.log(typeof json, json)

//? JSON to Object: objelerin içerisinde tanımlı olan methodar(function lar) stringe çevirilemediği için çıktıda görünmez
// const obj = JSON.parse(json)
// console.log(typeof obj, obj)

//? Object to Array:
//* Keys:
const arrKeys = Object.keys(Car)
console.log(arrKeys)
//* Values:
const arrValues = Object.values(Car)
console.log(arrValues)
//* Entries:
const arrEntries = Object.entries(Car)
console.log(arrEntries)

/* ------------------------------------------------------- *
//? CONSTRUCTOR FUNCTIONS:

const constructorFunction = function () {

    this.property1 = 'value1'
    this.property2 = 'value2'

}

/* ------------------------------------------------------- */
//? 'NEW' KEYWORD:

const carConstructor = function (brand, model, year) {

    this.brand = brand
    this.model = model
    this.year = year
    this.isAutoGear = true
    this.colors = ['White', 'Red']

    this.startEngine = function (methodParam) {
        return ('Engine started.')
    }
}

const Ford = new carConstructor('Ford', 'Mustang', 1967)
console.log(typeof Ford, Ford)
console.log(Ford.brand)
console.log(Ford.startEngine())

const Mercedes = new carConstructor('Mercedes', 'CLK200', 2001)
console.log(Mercedes)

/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */