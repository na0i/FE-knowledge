## 48장 모듈

### 48.1 모듈의 일반적인 의미

##### 모듈
- 애플리케이션을 구성하는 개별적 요소로서 재사용 가능한 코드 조각
- 모듈이 성립하려면 자신만의 파일 스코프가 필요
	- 자신만의 파일 스코프를 갖는 모듈의 자산은 캡슐화되어 다른 모듈에서 접근이 불가능하다
- 모듈은 다른 모듈이나 애플리케이션에 의해 재사용 되어야 의미가 있다
	- 공개가 필요한 자산에 한정하여 명시적으로 선택적 공개가 가능(`export`)
	- 공개된(exported) 모듈은 다른 모듈에서 재사용 가능
	- 모듈 사용자는 공개된 자산 중 일부나 전체를 선택해 재사용 가능(`import`)

<br>

### 48.2 자바스크립트와 모듈

클라이언트 사이드 자바스크립트는 파일마다 독립적인 파일 스코프를 갖지 않는다.

<br>

따라서 자바스크립트 파일을 여러 개의 파일로 분리해 로드해도 **하나의 자바스크립트 파일 내**에 있는 것처럼 동작한다.

- 하나의 전역을 공유
- 전역 변수가 중복되는 등의 문제가 발생 가능

<br>

이를 위해 제안된 것이 `CommonJS`와 `AMD`다.<br>

Node.js는 CommonJS를 채택하였고 따라서 Node.js 환경에서는 파일별로 독립적인 파일 스코프를 갖는다.

<br>

### 48.3 ES6 모듈(ESM)

ESM = ES6 모듈

<br>

- script 태그에 `type="module"` 어트리뷰트를 추가하면 자바스크립트 파일은 모듈로서 동작한다.
- ESM임을 명시하기 위해 파일 확장자는 `mjs`를 사용할 것이 권장된다.

<br>

#### 48.3.1 모듈 스코프

ESM은 독자적인 모듈 스코프를 갖는다.

```javascript
// foo.js
var x = 'foo';
```

```javascript
// bar.js
var x = 'bar'; // 중복 선언되어 bar로 덮어씌워짐
```

<br>

```javascript
// foo.mjs
const x = 'foo';
```

```javascript
// bar.mjs
console.log(x); // ReferenceError
```

<br>

### 48.3.2 export 키워드

모듈은 독자적인 모듈 스코프를 갖기 때문에 모듈 내부의 식별자는 해당 모듈 내부에서만 참조 가능하다.

<br>

모듈 내부에 선언한 식별자를 외부에 공개해 다른 모듈들이 재사용 가능하도록 하려면 `export` 키워드를 사용한다,

<br>

##### export

- export 키워드는 선언문 앞에 사용한다.
- 매번 export 키워드를 붙이는 것이 번거롭다면 하나의 객체로 구성하여 한 번에 export 한다.

```javascript
export ppi = Math.PI;

export { pi, square };
```

<br>

### 48.3.3 import 키워드

다른 모듈에서 export한 식별자를 모듈 스코프 내부로 로드하려면 `import` 키워드를 사용한다.

- 기본적으로 다른 모듈이 export 한 식별자 이름으로 import 해야하며
- ESM의 경우 파일 확장자를 생략할 수 없다.
- 식별자 이름을 일일이 지정하지 않고 하나의 이름으로 import 할 수 있고 이때 `as` 뒤에 지정한 이름의 객체에 프로퍼티로 할당한다.
- 모듈이 export한 식별자 이름을 변경해 import 가능
- 모듈에서 하나의 값만 export 한다면 `default` 키워드 사용 가능 = 한 가지 값을 export

```javascript
import { pi, square } from './lib.mjs';
import * as lib from "./lib.mjs";
import { pi as PI, square as sq, Person as P } from './lib.mjs';

console.log(pi); // 3.14xxx
```

