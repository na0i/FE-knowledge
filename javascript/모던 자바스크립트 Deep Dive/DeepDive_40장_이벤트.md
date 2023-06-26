## 40장 이벤트

### 40.1 이벤트 드리븐 프로그래밍

- **이벤트 핸들러**: 특정 이벤트가 발생했을 때 호출될 함수
- **이벤트 핸들러 등록**: 이벤트가 발생했을 때 브라우저에게 이벤트 핸들러의 호출을 위임하는 것

<br>

Window, Document, HTMLElement 타입의 객체는 onclick과 같이 특정 이벤트에 대응하는 다양한 이벤트 핸들러 프로퍼티를 갖고있고, 이 이벤트 핸들러 프로퍼티에 함수를 할당하면 해당 이벤트가 발생했을 때 할당된 함수가 브라우저에 의해 호출된다.

<br>

##### 이벤트 드리븐 프로그래밍

이처럼 프로그램 흐름을 이벤트 중심으로 제어하는 프로그래밍 방식을 이벤트 드리븐 프로그래밍이라고 한다.

<br>

### 40.2 이벤트 타입

##### 주로 사용되는 이벤트

![스크린샷 2023-06-12 오후 8 24 16](https://github.com/na0i/FE-knowledge/assets/77482972/765bcd43-f841-41f8-b7c2-0c6203f4b3ac)
![스크린샷 2023-06-12 오후 8 24 26](https://github.com/na0i/FE-knowledge/assets/77482972/c3ed92e6-d10e-4f08-80c4-71f158993b6a)
![스크린샷 2023-06-12 오후 8 25 11](https://github.com/na0i/FE-knowledge/assets/77482972/06e6307c-6018-400f-ae89-637fa88c1c21)

<br>

### 40.3 이벤트 핸들러 등록

이벤트 핸들러는 이벤트가 발생하면 브라우저에 의해 호출될 함수로 이벤트 핸들러를 등록하는 방식은 3가지가 있다.

<br>

#### 40.3.1 이벤트 핸들러 어트리뷰트 방식

이벤트 핸들러 어트리뷰트 이름은 `on 접두사`와 `이벤트 타입`으로 이루어져 있다(예시: onclick). 이벤트 핸들러 어트리뷰트 값으로 함수 호출문 등의 문을 할당하면 이벤트 핸들러가 등록된다.

<br>

이벤트 핸들러 등록은 **함수 호출을 브라우저에게 위임하는 것**이기 때문에 이벤트 핸들러를 등록할 때 **함수 참조**를 등록해야 브라우저가 이벤트 핸들러를 호출할 수 있다.

<br>

함수 호출문을 등록하면 함수 호출문의 평가 결과가 이벤트 핸들러로 등록된다. 함수가 아닌 값을 반환하는 함수 호출문을 등록하면 브라우저가 이벤트 핸들러를 호출할 수 없다.

<br>

하지만, 함수 호출문을 할당하게 되면 암묵적으로 생성될 이벤트 핸들러의 함수 몸체를 의미하게 되긴 한다.

```html
<button onclick="sayHi('Lee')">Click me!</button>
<script>
	function sayHi(name) {
		console.log(`Hi! ${name}.`);
	}
</script>
```

위 예시를 보면 함수 호출문이 할당되었지만 이 어트리뷰트는 파싱되어 아래와 같은 함수를 암묵적으로 생성하고 이벤트 핸들러 어트리뷰트 이름과 동일한 키 onclick 이벤트 핸들러 프로퍼티에 할당한다.

```javascript
function onclick(event) {
	sayHi('Lee');
}
```

<br>

위처럼 동작하는 이유는 이벤트 핸들러에 인수를 전달하기 위해서이다. 이벤트 핸들러 어트리뷰트 값으로 함수 참조만 할당해야 한다면 이벤트 핸들러에 인수를 전달하기 어렵기 때문이다.

<br>

이벤트 핸들러 어트리뷰트 방식은 더는 사용하지 않는 것이 좋지만 Angular, React, Svelte, Vue.js 같은 프레임워크/라이브러리는 이벤트 핸들러 어트리뷰트 방식으로 이벤트를 처리한다.

<br>

#### 40.3.2 이벤트 핸들러 프로퍼티 방식

window 객체, Document, HTMLElement 타입의 DOM 노드 객체는 이벤트에 대응하는 이벤트 핸들러 프로퍼티 키를 가지고 있다. 마찬가지로 `on 접두사`와 `이벤트 타입`으로 이루어져 있다(예시: onclick). 이벤트 핸들러 프로퍼티 키에 함수를 바인딩하면 이벤트 핸들러가 등록된다.

```html
<button>Click me!</button>
<script>
	const $button = document.querySelector('button');

	$button.onclick = function () {
		console.log('button click');
	};
</script>
```

<br>

![스크린샷 2023-06-12 오후 9 22 16](https://github.com/na0i/FE-knowledge/assets/77482972/0e0ea6f6-818d-4132-8d0a-dded5f47c6c1)

<br>

이벤트 핸들러는 이벤트를 발생시킬 이벤트 타깃 혹은 전파될 이벤트를 캐치할 DOM 노드 객체에 바인딩한다.

<br>

첫번째 방법이었던 이벤트 핸들러 어트리뷰트 방식도 결국 DOM 노드 객체의 이벤트 핸들러 프로퍼티로 변환되므로 결과적으로 이벤트 핸들러 프로퍼티 방식과 동일하다.

<br>

- 장점: HTML과 자바스크립트가 뒤섞이는 문제를 해결할 수 있다.
- 단점: 이벤트 핸들러 프로퍼티에 하나의 이벤트 핸들러만 바인딩할 수 있다.

<br>

#### 40.3.3 addEventListener 메서드 방식

`EventTarget.prototype.addEventListener` 메서드를 사용하여 이벤트 핸들러를 등록할 수 있다.

![스크린샷 2023-06-12 오후 9 27 29](https://github.com/na0i/FE-knowledge/assets/77482972/9b105a18-9abc-4ffe-9603-f0abcb23cd0e)

- 이벤트 타입을 전달할 때 on 접두사를 붙이지 않아도 된다.
- 마지막 매개변수에는 이벤트 전파 단계를 지정한다.

<br>

```javascript
<button>Click me!</button>
<script>
	const $button = document.querySelector('button');

	$button.addEventListener('click', function () {
		console.log('button click');
	});
</script>
```

<br>

##### 동일한 HTML 요소에서 발생한 동일한 이벤트에 이벤트 핸들러 프로퍼티 방식과 addEventListener 메서드를 모두 사용한다면?

- addEventListener 방식은 이벤트 핸들러 프로퍼티에 바인딩된 이벤트 핸들러에 아무런 영향을 끼치지 않는다.
- 따라서 2개의 이벤트 핸들러가 모두 호출된다.
- **addEventListener 메서드는 하나 이상의 이벤트 핸들러를 등록할 수 있다.**
- 단, addEventListener 메서드로 참조가 동일한 이벤트 핸들러를 중복 등록하면 하나의 이벤트 핸들러만 등록된다.

```html
<button>Click me!</button>
<script>
	const $button = document.querySelector('button');

	// 두개 모두 등록
	$button.addEventListener('click', function () {
		console.log('[1]button click');
	});

	$button.addEventListener('click', function () {
		console.log('[2]button click');
	});

	const handleClick = () => console.log('button click');

	// 하나의 핸들러만 등록
	$button.addEventListener('click', handleClick);
	$button.addEventListener('click', handleClick);
</script>
```

<br>

### 40.4 이벤트 핸들러 제거

addEventListener 메서드로 등록한 이벤트 핸들러를 제거하려면 `Event.prototype.removeEventListener` 메서드를 사용한다. 

- 이벤트 핸들러 프로퍼티 방식으로 등록한 이벤트 핸들러는 removeEventListener 메서드로 제거할 수 없다.
- removeEventListener에 전달하는 인수는 addEventListener과 동일하다.
- 인수가 일치하지 않으면 이벤트 핸들러가 제거되지 않는다. 
- 따라서 무명 함수를 이벤트로 등록한 경우 제거할 수 없다.
- 이벤트 핸들러 내부에서 removeEventListener를 호출하여 제거하는 것은 가능하지만 이 이벤트 핸들러는 한 번만 호출되게 된다.

```javascript
$button.addEventListener('click', function foo() {
  $button.removeEventListener('click', foo);
});
```

<br>

> 이벤트 핸들러 어트리뷰트 방식도 결국 이벤트 핸들러 프로퍼티 방식과 동일하니까 removeEventListener로 제거할 수 없을까?

<br>

### 40.5 이벤트 객체

**이벤트가 발생**하면 이벤트에 관련한 다양한 정보를 담고 있는 **이벤트 객체가 동적으로 생성**된다. 생성된 이벤트 객체는 **이벤트 핸들러의 첫번째 인수로 전달**된다.

<br>

`이벤트 발생 > 이벤트 객체 생성 > 이벤트 핸들러 첫번째 인수로 전달`

<br>

따라서, 이벤트 핸들러를 정의할 때 이벤트 객체를 전달받을 매개변수를 명시적으로 선언해야 한다.<br>

`예: const func = (e) => console.log(e)`

<br>

매개변수 이름으로 다른 이름을 사용하여도 괜찮으나 이벤트 핸들러 어트리뷰트 방식으로 이벤트 핸들러를 등록했다면 매개변수 이름으로 무조건 `event`를 전달해야 한다.

> 이벤트 핸들러 어트리뷰트 방식은 이벤트 핸들러 어트리뷰트 값이 사실 이벤트 핸들러 함수 몸체를 의미하기 떄문이다. 이벤트 핸들러 어트리뷰트 방식은 이는 암묵적으로 함수를 생성하고 전달된 값이 함수 몸체가 되는데 이 때 암묵적으로 생성된 함수의 첫 번째 매개변수 이름은 event로 명명되기 때문이다.

<br>

#### 40.5.1 이벤트 객체의 상속 구조

이벤트가 발생하면 이벤트 타입에 따라 다양한 이벤트 객체가 생성되고 아래와 같은 상속 구조를 갖는다. 

<img width="415" alt="스크린샷 2023-06-18 오후 9 54 41" src="https://github.com/na0i/FE-knowledge/assets/77482972/b5169c1e-eee6-4ef7-ae66-960b5e9b9d43">

- 이벤트 객체는 모두 생성자 함수이므로 생성자 함수를 호출하여 이벤트 객체를 생성할 수 있다.
- 이벤트가 발생하면 암묵적으로 생성되는 이벤트 객체도 생성자 함수에 의해 생성된다.
- 생성된 이벤트 객체는 프로토타입 체인의 일원이 된다.
- 이벤트 객체 중 일부는 사용자 행위에 의해 생성되고 일부는 자바스크립트 코드에 의해 인위적으로 생성된다.
	- 예시로 MouseEvent는 사용자의 마우스 클릭이나 이동에 의해 생성되고
	- CustomEvent는 자바스크립트 코드에 의해 인위적으로 생성된다. 
- Event 인터페이스는 DOM 내에서 발생한 이벤트에 의해 생성되는 이벤트 객체를 나타낸다.
	- Event 인터페이스에는 모든 이벤트 객체의 공통 프로퍼티가 정의된다.
	- Focus, Mouse, Keyboard, Wheel 같은 하위 인터페이스에는 각 이벤트 타입에 따른 고유한 프로퍼티가 정의되어 있다.

##### click 이벤트 예시

click 이벤트가 발생하면 암묵적으로 MouseEvent 타입의 이벤트 객체가 생성되고 이는 프로토 타입 체인의 일원이 된다.

<br>

`click 이벤트 객체 → MouseEvent → UIEvent → Event → Object`

<br>

#### 40.5.2 이벤트 객체의 공통 프로퍼티

Event 인터페이스(Event.prototype)에 정의되어 있는 이벤트 관련 프로퍼티는 모든 파생 이벤트 객체에 상속된다. 즉, **Event 인터페이스의 이벤트 관련 프로퍼티는 모든 이벤트 객체가 상속받는 공통 프로퍼티**다.

##### 이벤트 객체의 공통 프로퍼티
- type: 이벤트 타입
- target: 이벤트를 발생시킨 DOM 요소
- currentTarget: 이벤트 핸들러가 바인딩된 DOM 요소
- eventPhase: 이벤트 전파 단계(0 ~ 3)
	- 0: 이벤트 없음
	- 1: 캡처링 단계
	- 2: 타깃 단계
	- 3: 전파 단계
- bubbles: 이벤트를 버블링으로 전파하는지 여부
- cancelable: preventDefault 메서드를 호출해 이벤트 기본 동작을 취소할 수 있는지 여부
- defaultPrevented: preventDefault 메서드를 호출해 이벤트를 취소했는지 여부
- isTrusted: 사용자 행위에 의해 발생한 이벤트인지 여부
- timeStamp: 이벤트가 발생한 시각

<br>

##### 체크박스의 check 상태를 변경할 때 예시

1. 사용자 입력으로 check 상태 변경
2. onchange 이벤트 발생
3. Event 타입의 이벤트 객체 생성
	- 이 때 target 프로퍼티는 이벤트를 발생시킨 요소이므로 체크박스를 나타냄
	- currentTarget 프로퍼티는 이벤트 핸들러가 바인딩된 요소이므로 이 또한 체크박스를 나타낸다.

<br>

#### 40.5.3 마우스 정보 취득

click, dblclick, mousedown, mouseup, mousemove, mouseenter, mouseleave 이벤트가 발생하면 생성되는 MouseEvent 타입의 이벤트 객체는 아래와 같은 고유 프로퍼티를 갖는다.

- 마우스 포인터 좌표 정보를 갖는 프로퍼티: screenX, screenY, clientX, clientY, pageX, pageY, offsetX, offsetY
- 버튼 정보를 나타내는 프로퍼티: altKey, ctrlKey, shiftKey, button
> 버튼 정보를 나타내는 프로퍼티는 언제 쓰일까?
> 마우스 이벤트는 이벤트가 발생할 때 함께 누른 보조키가 무엇인지를 알려주는 프로퍼티를 지원

<br>

##### Drag 예시

dom 요소를 드래그하여 이동시켜본다고 가정해보자.<br>

드래그는 `mousedown 이벤트가 발생 > mousemove 이벤트 시작 > mouseup 이벤트 시점에 종료` 순서로 이루어지기 때문에 아래와 같이 생각할 수 있다. <br>

- mousedown 이벤트가 발생했을 때의 마우스 포인터 좌표
- mousemove 이벤트 발생중인 마우스 포인터 좌표를 비교
- mouseup 이벤트가 발생하면 드래그 대상 요소를 이동시키는 이벤트 핸들러를 제거

<br>

#### 40.5.4 키보드 정보 취득

keydown, keyup, keypress 이벤트가 발생하면 KeyboardEvent 타입 이벤트 객체가 생성되고 아래와 같은 고유 프로퍼티를 갖는다.

- altKey, ctrlKey, shiftKey, metaKey, key, keyCode

<br>

- key 프로퍼티는 입력한 키 값을 문자열로 반환한다. 엔터 키의 경우 key 프로퍼티는 'Enter'를 반환한다.
- input 요소 입력 필드에 한글을 입력하고 엔터를 누르면 keyup 이벤트가 두 번 호출되므로 Keydown 이벤트를 사용한다.

<br>

### 40.6 이벤트 전파

**이벤트 전파**: 이벤트 전파란 DOM 요소 노드에서 발생한 이벤트가 DOM 트리를 통해 전파되는 것을 의미한다. 

<br>

##### 이벤트 전파 3단계

![스크린샷 2023-06-21 오후 8 48 57](https://github.com/na0i/FE-knowledge/assets/77482972/0bad0fcc-fd22-460c-8c0f-9e53bdc78430)


- 캡처링 단계: 이벤트가 상위 요소에서 하위 요소 방향으로 전파
- 타깃 단계: 이벤트가 이벤트 타깃에 도달
- 버블링 단계: 이벤트가 하위 요소에서 상위 요소 방향으로 전파

<br>

##### 예시

```html
<html>
<body>
  <ul id="fruits">
    <li id="apple">Apple</li>
    <li id="banana">Banana</li>
    <li id="orange">Orange</li>
  </ul>
  <script>
    const $fruits = document.getElementById('fruits');

    $fruits.addEventListener('click', e => {
      console.log(`이벤트 단계: ${e.eventPhase}`); // 3: 버블링 단계
      console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
      console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
    });
  </script>
</body>
</html>
```

1. li 요소 클릭
2. 클릭 이벤트 발생 & 클릭 이벤트 객체 생성, 클릭된 li 요소가 이벤트 타깃이 됨
3. 클릭 이벤트 객체는 window에서 시작해서 이벤트 타깃 방향으로 전파(캡처링 단계)
4. 이벤트 객체는 이벤트를 발생시킨 이벤트 타깃에 도달(타깃 단계)
5. 이벤트 객체는 이벤트 타깃에서 시작해 window 방향으로 전파(버블링 단계)

<br>

- **이벤트 핸들러 어트리뷰트/프로퍼티 방식으로 등록한 이벤트 핸들러** - `타깃 단계와 버블링 단계` 이벤트만 캐치 가능
- **addEventListener 메서드 방식으로 등록한 이벤트 핸들러** - `타깃 단계와 버블링 단계, 선별적으로 캡처링 단계` 까지 캐치 가능, 3번째 인수로 true를 전달해야 함
- 이벤트는 이벤트를 발생시킨 이벤트 타깃은 물론 상위 DOM 요소에서도 캐치할 수 있다.
	- 이벤트 패스(이벤트가 통과하는 DOM 트리 상의 경로)에 위치하는 모든 DOM 요소에서 캐치 가능

> - eventTarget: 이벤트가 발생한 바로 그 요소
> - currentTarget: 이벤트 리스너를 가진 요소

<br>

##### 버블링을 통해 전파되지 않는 이벤트

대부분의 이벤트는 캡처링과 버블링을 통해 전파된다. 하지만 아래 이벤트들은 버블링을 통해 전파되지 않으며 공통 프로퍼티 event.bubbles 값이 false다.

- 포커즈 이벤트: focus / blur
- 리소스 이벤트: load / unload / abort / error
- 마우스 이벤트: mouseenter / mouseleave

위 이벤트들은 버블링되지 않으므로 이벤트 타깃 상위 요소에서 위 이벤트를 캐치하려면 **캡처링 단계의 이벤트**를 캐치해야 한다.(그럴 일이 잘 없긴 하다.) 반드시 위 이벤트를 상위 요소에서 캐치해야 한다면 아래 이벤트로 대체 가능하다.

<br>

- 포커즈 이벤트: focus / blur ←→ focusin / focusout
- 마우스 이벤트: mouseenter / mouseleave ←→ mouseover / mouseout

<br>

##### 예시

```html
<body>
  <p>버블링과 캡처링 이벤트 <button>버튼</button></p>
  <script>
    document.body.addEventListener('click', () => {
      console.log('Handler for body.');
    });
    // 3번째 인자가 생략/false 이므로 버블링 단계에서 이벤트를 처리

    document.querySelector('p').addEventListener('click', () => {
      console.log('Handler for paragraph.');
    }, true);
    // 3번째 인자가 true이므로 캡처링 단게에서 이벤트를 처리

    document.querySelector('button').addEventListener('click', () => {
      console.log('Handler for button.');
    });
    // 타깃 단계에서 캐치
  </script>
</body>
```

- 3번째 인자가 true인 경우 → 캡처링 단계에서 처리
- 3번째 인자가 없거나 false인 경우 → 버블링 단계에서 처리

<br>

따라서, button 요소를 클릭하면 'Handler for paragraph' → 'Handler for button' → 'Handler for body' 순서로 출력된다. 하지만 만약 p 요소를 클릭하면 p 요소는 이벤트 타겟 단계가 되므로 'Handler for paragraph' → 'Handler for body' 순으로 출력된다.

<br>

### 40.7 이벤트 위임

**이벤트 위임**: 이벤트 위임은 여러 개의 하위 DOM 요소에 각각 이벤트 핸들러를 등록하는 대신 하나의 상위 DOM 요소에 이벤트 핸들러를 등록하는 방법을 말한다.

- 이벤트 위임을 통해 상위 DOM 요소에 이벤트 핸들러를 등록하면 여러개의 하위 DOM 요소에 이벤트 핸들러를 등록할 필요가 없으며
- 동적으로 하위 DOM 요소를 추가하더라도 일일이 이벤트 핸들러를 등록할 필요가 없다.

<br>

##### 주의할 점
- 상위 요소에 이벤트 핸들러를 등록하기 때문에 이벤트를 실제로 발생시킨 DOM 요소가 개발자가 기대한 DOM 요소가 아닐 수도 있다.
- ul 하위에 여러 자식 요소들이 있고 ul에 이벤트 핸들러를 등록하면 자기 자신은 물론 모든 하위 요소에 반응한다. → 이벤트 타깃을 검사할 필요가 있다.

```javascript
// bad
function activate({ target }) {
	[...$fruits.children].forEach($fruit => {
		$fruit.classList.toggle('active', $fruit === target);
	});
}

document.getElementById('apple').onclick = activate;
document.getElementById('banana').onclick = activate;
document.getElementById('orange').onclick = activate;


// better
function activate({ target }) {
	if (!target.matches('#fruits > li')) return;

	[...$fruits.children].forEach($fruit => {
		$fruit.classList.toggle('active', $fruit === target);
	});
}

$fruits.onclick = activate;
```

> `Element.prototype.matches` 메서드는 인수로 전달된 선택자에 특정 노드를 탐색 가능한지 확인한다.

<br>

일반적으로 이벤트 객체의 target 프로퍼티와 currentTarget 프로퍼티는 동일한 DOM 요소를 가리키지만 이벤트 위임을 통해 상위 DOM 요소에 바인딩한 경우 target 프로퍼티와 currentTarget 프로퍼티가 다른 DOM 요소를 가리킬 수 있다.

<br>

### 40.8 DOM 요소의 기본 동작 조작

#### 40.8.1 DOM 요소의 기본 동작 중단

DOM 요소는 저마다 기본 동작이 있다.(예: a 요소: href 어트리뷰트에 지정된 링크로 이동 / checkbox 요소: 체크 or 해제)

<br>

**이벤트 객체의 `preventDefault` 메서드는 DOM 요소의 기본 동작을 중단시킨다.**

<br>

#### 40.8.2 이벤트 전파 방지

**이벤트 객체의 `stopPropagation` 메서드는 이벤트 전파를 중지시킨다.**

<br>

```javascript
<div class="container">
	<button class="btn1">Button 1</button>
	<button class="btn2">Button 2</button>
	<button class="btn3">Button 3</button>
</div>

<script>
	document.querySelector('.container').onclick = ({ target }) => {
		if (!target.matches('.container > button')) return;
		target.style.color = 'red';
	};

	document.querySelector('.btn2').onclick = e => {
		e.stopPropagation(); // 이벤트 전파 중단
		e.target.style.color = 'blue';
	};
</script>
```

<br>

상위 요소인 container에 onclick 이벤트, 하위 요소인 btn2에도 onclick 이벤트가 존재하지만 btn2 요소의 onclick 이벤트의 e.stopPropagation()으로 이벤트 전파가 중단되어 자신에게 바인딩된 이벤트 핸들러만 실행된다.

<br>

### 40.9 이벤트 핸들러 내부의 this

#### 40.9.1 이벤트 핸들러 어트리뷰트 방식

이벤트 핸들러 어트리뷰트 값으로 지정한 문자열은 암묵적으로 생성되는 이벤트 핸들러의 문이다.

```
<button onclick="handleClick()">Click me</button>
<script>
	function handleClick() {
		console.log(this); // window
	}
</script>
```

<br>

따라서 위 예시의 handleClick 함수는 이벤트 핸들러에 의해 일반 함수로 호출되고, 일반 함수에서 호출되는 함수 내부의 this는 전역 객체를 가리키므로 window가 된다.

<br>

단, 이벤트 핸들러를 호출할 때 인수로 전달된 this는 이벤트를 바인딩한 DOM 요소를 가리킨다. 아래 예시에서 handleClick에 전달한 this는 암묵적으로 생성된 이벤트 핸들러 내부의 this다.

```javascript
<button onclick="handleClick(this)">Click me</button>
<script>
	function handleClick(button) {
		console.log(button); // 이벤트를 바인딩한 button 요소
		console.log(this);   // window
	}
```

<br>

암묵적으로 생성된 **이벤트 핸들러 내부의 this는 이벤트를 바인딩한 DOM 요소**를 가리킨다.

<br>

#### 40.9.2 이벤트 핸들러 프로퍼티 방식과 addEventListener 메서드 방식

**이벤트 핸들러 프로퍼티 방식과 addEventListener 메서드 방식 모두 이벤트 핸들러 내부의 this는 이벤트를 바인딩한 DOM 요소를 가리킨다.** 따라서, 이벤트 핸들러 내부의 this는 이벤트 객체의 currentTarget 프로퍼티와 같다. 단, 화살표 함수는 함수 자체의 this 바인딩을 갖지 않기 때문에 화살표 함수로 정의한 이벤트 핸들러 내부의 this는 상위 스코프의 this를 가리킨다.

<br>

```javascript
<button class="btn1">0</button>
<button class="btn2">0</button>

<script>
	const $button1 = document.querySelector('.btn1');
	const $button2 = document.querySelector('.btn2');

	// 이벤트 핸들러 프로퍼티 방식
	$button1.onclick = function (e) {
		console.log(this); // $button1
		console.log(e.currentTarget); // $button1
		console.log(this === e.currentTarget); // true
	};

	// addEventListener 메서드 방식
	$button2.addEventListener('click', function (e) {
		console.log(this); // $button2
		console.log(e.currentTarget); // $button2
		console.log(this === e.currentTarget); // true
	});

    // 이벤트 핸들러 프로퍼티 방식
	$button1.onclick = e => {
		// 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
		console.log(this); // window
		console.log(e.currentTarget); // $button1
		console.log(this === e.currentTarget); // false
	};
</script>
```

<br>

클래스에서 이벤트 핸들러를 바인딩하는 경우 메서드 내부의 this는 클래스가 생성할 인스턴스를 가리키지 않는다. 이벤트 핸들러 내부의 this는 동일하게 이벤트를 바인딩할 요소를 가리킨다. 따라서, 메서드를 이벤트 핸들러를 바인딩할 때 클래스가 생성할 인스턴스를 가리키게 하려면 bind 메서드를 사용해 this를 전달해야 한다.

```javascript
class App {
	constructor() {
		this.$button = document.querySelector('.btn');
		this.count = 0;
		this.$button.onclick = this.increase; // x
		this.$button.onclick = this.increase.bind(this); // o
	}

	increase() {
		// 이벤트 핸들러 increase 내부의 this는 DOM 요소(this.$button)를 가리킨다.
		// 따라서 this.$button은 this.$button.$button과 같다.
		this.$button.textContent = ++this.count;
	}

	// 클래스 필드에 할당한 화살표 함수를 이벤트 핸들러로 등록할 수도 있지만 이 때 increase는 프로토타입 메서드가 아니라 인스턴스 메서드가 된다.
	increase = () => this.$button.textContent = ++this.count;

}

new App();
```

<br>

### 40.10 이벤트 핸들러에 인수 전달

??

### 40.11 커스텀 이벤트

#### 40.11.1 커스텀 이벤트 생성

이벤트 객체는 Event, UIEvent, MouseEvent 같은 이벤트 생성자 함수로 생성할 수 있다. 이벤트가 발생하면 생성되는 이벤트 객체는 발생한 이벤트 종류에 따라 이벤트 타입이 결정되지만, 생성자 함수를 호출하여 생성한 이벤트 객체는 임의의 이벤트 타입을 지정할 수 있다.

<br>

##### 이벤트 생성

- 이벤트 생성자 함수의 첫번째 인수로 이벤트 타입을 나타내는 문자열을 전달받는다.
	- 기존 이벤트 타입도 가능하고 임의의 문자열도 가능하다.	
	- 일반적으로 CustomEvent 이벤트 생성자 함수를 사용한다.
- 생성된 커스텀 이벤트 객체는 버블링되지 않고, preventDefault 메서드로 취소할 수도 없다.
	- bubbles, cancelable 프로퍼티 값이 false다.
	- true로 설정하려면 이벤트 생성자 함수 두번째 인수로 bubbles, cancelable 프로퍼티를 갖는 객체를 전달한다.
- 커스텀 이벤트 객체는 이벤트 타입에 따라 가지는 이벤트 고유의 프로퍼티 값을 지정할 수 있다.
- 이벤트 생성자 함수로 생성한 커스텀 이벤트는 isTrusted(사용자 행위에 의해 발생한 이벤트인지 여부) 값이 언제나 false다.
	- 사용자 행위에 의해 발생한 이벤트는 isTrusted 값이 항상 true다.

<br>

#### 40.11.2 커스텀 이벤트 디스팿치

생성된 커스텀 이벤트는 `dispatchEvent` 메서드로 디스패치(이벤트를 발생시키는 행위)할 수 있다. dispatchEvent 메서드에 이벤트 객체를 인수로 전달하면서 호출하면 인수로 전달한 이벤트 타입의 이벤트가 발생한다.

<br>

```javascript
const $button = document.querySelector('.btn');

$button.addEventListener('click', e => {
	console.log(e); // MouseEvent {isTrusted: false, screenX: 0, ...}
	alert(`${e} Clicked!`);
});

const customEvent = new MouseEvent('click');

$button.dispatchEvent(customEvent);
```

<br>

임의의 이벤트 타입을 지정하여 커스텀 이벤트 객체를 생성한 경우 **반드시 addEventListener 메서드 방식으로 이벤트 핸들러를 등록**해야 한다. 
