# TypeScript #4 함수 - 타입스크립트 강좌

```typescript
function hello(name?: string){
	return `Hello, ${name || 'world'}`;
}

// default 값 주기
function hello(name = 'world'){
	return `Hello, ${name}`;
}

// 필수 매개변수가 먼저 와야한다는 것만 주의
function hello(name: string, age?:number): string {
    if (age !== undefined) {
        return `Hello, ${name}. You are ${age}`;
    } else {
        return `Hello, ${name}`;
    }
}

// 나머지 매개변수 사용해서 함수 정의
function add(...nums: number[]) {
    return nums.reduce((result, num) => result + num, 0);
}

// 오버로드 사용
interface User {
    name: string;
    age: number;
}

function join(name: string, age: number): User;
function join(name: string, age: string): string;
function join(name: string, age: number|string): User | string {
    if (typeof age === 'number'){
        return {
            name,
            age,
        };
    } else {
        return '나이는 숫자로 입력';
    }
}

const sam: User = join('Sam', 30);
```

