# TypeScript #7 제네릭 Generics

```typescript
const arr1 = [1, 2, 3];
const arr2 = ['a', 'b', 'c'];
const arr3 = [false, true, true];
const arr4 = [{}, {}, {name : 'Tim'}]

function getSize(arr: number[] | string [] | boolean [] | object[]): number {
	return arr.length
}
getSize(arr1);
getSize(arr2);
getSize(arr3);
getSize(arr4);


// generic 사용하기
// T를 주로 사용
// 사용하는 쪽에서 T를 결정
function getSize<T>(arr: T[]): number {
	return arr.length
}
getSize<number>(arr1);
getSize<string>(arr2);
getSize<boolean>(arr3);
getSize<object>(arr4);
```

<br>

```typescript
interface Mobile<T> {
	name: string;
	price: number;
	option: T;
}

const m1: Mobile<object> = {
    name: 's21',
    price: 1000,
    option: {
        color: 'red',
        coupon: false,
    }
}

const m11: Mobile<{color: string, coupon: boolean}> = {
    name: 's21',
    price: 1000,
    option: {
        color: 'red',
        coupon: false,
    }
}

const m2: Mobile<string> = {
    name: 's20',
    price: 900,
    option: 'good';
}
```

<br>

```typescript
interface User {
    name: string;
    age: number;
}

interface Car {
    name: string;
    color: string;
}

interface Book {
    price: number;
}

const user: User = {name: 'a', age: 10};
const car: Car = {name: 'bmw', color: 'red'};
const book: Book = {price: 3000};

// data에 빨간줄 발생
function showName<T>(data: T): string {
    return data.name;
}

// showName(book)에 빨간줄 발생
function showName<T extends {name: string}>(data: T): string {
    return data.name;
}


showName(user);
showName(car);
showName(book);
```

