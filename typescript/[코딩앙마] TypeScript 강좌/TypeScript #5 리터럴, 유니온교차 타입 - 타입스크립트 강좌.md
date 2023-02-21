# TypeScript #5 리터럴, 유니온/교차 타입 - 타입스크립트 강좌

```typescript
// const는 변할수 없는 값
// let은 변할 수 있는 값

const username1 = 'Bob'; // Bob
let username2 = 'Tom'; // string

type Job = 'police' | 'developer' | 'teacher';

interface User {
    name: string;
    job: Job;
}

const user: User = {
    name: 'Nayoung',
    job: 'developer',
}

interface HighSchoolStudent {
    name: number | string;
    grade: 1 | 2 | 3;
}


// UnionType : or
interface Car{
    name: 'car';
    color: string;
    start(): void;
}

interface Mobile{
    name: 'mobile';
    color: string;
    call(): void;
}

function getGift(gift: Car | Mobile) {
    console.log(gift.color);
    gift.start(); // 오류
}

function getGift(gift: Car | Mobile) {
    console.log(gift.color);
    if (gift.name === 'car') {
        gift.start();
    } else {
        gift.call();
    }
}

// Intersection Types : and
interface Car{
    name: 'car';
    start(): void;
}

interface Toy{
    name: string
    color: string;
    price: number;
}

const toyCar: Toy & Car = {
    name: '타요',
    color: 'blue',
    price: 1000,
    start() {}
}
```

