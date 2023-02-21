# TypeScript #2 기본 타입 - 타입스크립트 강좌

- string

- number

- boolean

- number[] 

- Array<number>

- string[]

- Array<string>

- null

- undefined

- let a: [string, number];

- void: 함수에서 아무것도 반환하지 않을 때 사용

- never: 항상 에러를 반환하거나 영원히 끝나지 않는 타입

- enum: 비슷한 것들끼리 묶음

  - 특정값만 입력하도록 강제하고 싶고
  - 그 값들이 뭔가 공통점이 있을 때 사용
  - 양방향 매핑이 가능

  ```typescript
  // 1
  enum Os {
  	Window,
  	Ios,
  	Android
  }
  
  // 2
  enum Os {
  	Window = 'win',
  	Ios = 'ios',
  	Android = 'and',
  }
  
  // 3
  enum Os {
      Window = 3,
      Ios = 10,
      Android
  }
  
  let myOs: Os;
  
  myOs = Os.Window;
  ```

  