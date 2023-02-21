# TypeScript #3 인터페이스(interface) - 타입스크립트 강좌

프로퍼티를 정해서 객체를 표현하고자 할 때 인터페이스를 사용

```typescript
type Score = 'A' | 'B' | 'C' | 'F';

interface User {
	name: string;
	age: number;
    gender? : string;
    readonly birthYear; number; // 생성할 때만 할당 가능하고 수정은 불가능
    [grade: number] : string;
    // grade라는 단어에 의미가 있는 것은 아님
    // number를 key로 하고 string을 value로 하는 프로퍼티를 여러개 가질 수 있다는 의미
    [grade: number] : Score;
}

let user: User = {
	name: 'xx',
	age: 30,
    birthYear: 2000,
}
```

 <br>

인터페이스로 함수도 정의 가능

```typescript
interface Add {
	(num1: number, num2: number): number;
}

const add: Add = function(X, y){
    return x + y;
}

add(10, 20);


interface IsAdult {
    (age:number): boolean;
}

const checkIsAdult: IsAdult = (age) => {
    return age > 19;
}

checkIsAdult(33);
```

<br>

클래스도 정의가능

```typescript
interface Car {
	color: string;
	wheels: number;
	start(): void;
}

class Bmw implements Car{
	color = 'red';
	wheels = 4;
	start() {
		console.log('start');
	}
}

class Bmw implements Car{
    color;
	wheels = 4;
    
    constructor(c: string){
    	this.color = c;    
    }
    
	start() {
		console.log('start');
	}
}

const b = new Bmw('green');

// 확장(extends)
interface Benz extends Car{
    door: number;
    stop(): void;
}

const benz: Benz = {
    door: 5,
    stop(){
        console.log('stop');
    },
    color: 'black',
    wheels: 4,
    start(){
        console.log('start');
    }
}

// 확장 여러개도 가능
interface Toy {
    name: string;
}

interface ToyCar extends Toy, Car{
    price: number;
}
```

