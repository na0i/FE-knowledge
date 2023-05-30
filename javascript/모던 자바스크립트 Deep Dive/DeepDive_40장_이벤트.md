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

매개변수 이름으로 다른 이름을 사용하여도 괜찮으나 이벤트 핸들러 어트리뷰트 방식으로 이벤트 핸들러를 등록했다면 매개변수 이름으로 무조건 **`event`**를 전달해야 한다.

> 이벤트 핸들러 어트리뷰트 방식은 이벤트 핸들러 어트리뷰트 값이 사실 이벤트 핸들러 함수 몸체를 의미하기 떄문이다. 이벤트 핸들러 어트리뷰트 방식은 이는 암묵적으로 함수를 생성하고 전달된 값이 함수 몸체가 되는데 이 때 암묵적으로 생성된 함수의 첫 번째 매개변수 이름은 event로 명명되기 때문이다.

<br>



