## 39장 DOM

브라우저의 렌더링 엔진은 HTML 문서를 파싱하여 브라우저가 이해할 수 있는 자료구조인 DOM을 생성한다.
<br>

**DOM은 HTML 문서의 계층적 구조와 정보를 표현하며, 이를 제어할 수 있는 API(프로퍼티와 메서드)를 제공하는 트리 자료구조다.**

<br>

### 39.1 노드

#### 39.1.1 HTML 요소와 노드 객체

HTML 요소는 HTML 문서를 구성하는 개별적인 요소를 의미한다.

![스크린샷 2023-05-17 오후 8 36 04](https://github.com/na0i/FE-knowledge/assets/77482972/442ffa22-47e4-40d0-aa70-90cf73531e30)

<br>

HTML 요소는 렌더링 엔진에 의해 파싱되어 DOM을 구성하는 요소 노드 객체로 변환된다. 
- 어트리뷰트는 어트리뷰트 노드로
- 텍스트 콘텐츠는 텍스트 노드로 변환된다.

<br>

HTML 문서는 HTML 요소들의 집합으로 이뤄지며, HTML 요소는 중첩 관계를 갖는다.(→ HTML 요소의 콘텐츠 영역에 다른 HTML 요소도 포함될 수 있다.)

##### HTML 요소의 중첩 관계
- 중첩 관계에 의해 계층적인 부자 관계가 형성된다.
- 부자 관계를 반영해 HTML 요소를 객체화한 모든 노드 객체를 트리 자료 구조로 구성한다.

<br>

##### 트리 자료 구조

- 트리 자료구조는 노드들의 계층 구조로 이뤄진다. 
- 하나의 최상위 노드(루트 노드)에서 시작해 0개 이상의 자식 노드를 갖는다.
- 자식 노드가 없는 노드는 리프 노드라고 한다.

<br>

**노드 객체들로 구성된 트리 자료구조를 DOM이라 하며, 트리로 구조화 되어 있기 떄문에 DOM 트리라고도 부른다.**

<br>

#### 39.1.2 노드 객체의 타입

노드 객체는 총 12개의 종류(노드 타입)가 있다.

##### 문서 노드
- 문서 노드는 DOM 트리 최상위에 존재하는 루트 노드로
- document 객체를 가리킨다.
	> document 객체: 브라우저가 렌더링한 HTML 문서 전체를 가리키는 객체로 전역 객체 window의 document 프로퍼티에 바인딩되어 있다.

- 자바스크립트 코드는 script 태그에 의해 분리되어 있어도 하나의 전역 객체 window를 공유하기 때문에 모든 자바스크립트 코드는 하나의 document 객체를 바라본다.
- 즉, HTML 문서당 document 객체는 유일하다.
- DOM 트리의 루트 노드이므로 DOM 트리 노드들에 접근하기 위한 진입점 역할을 한다.

<br>

##### 요소 노드
- HTML 요소를 가리키는 객체다.
- 요소 노드는 중첩에 의해 부자 관계를 가진다.
- 문서의 구조를 표현한다고 할 수 있다.

<br>

##### 어트리뷰트 노드
- HTML 요소의 어트리뷰트를 가리키는 객체다.
- 어트리뷰트 노드는 어트리뷰트가 지정된 HTML 요소의 요소 노드와 연결되어 있다.
	- 단, 어트리뷰트 노드는 요소 노드에만 연결되고, 요소 노드가 연결된 부모 노드와는 연결되지 않는다.
	- 즉, 어트리뷰트 노드는 부모 노드가 없다.(요소 노드의 형제 노드도 아니다)
- 어트리뷰트를 참조하거나 변경하려면 먼저 요소 노드에 접근해야 한다.

<br>

##### 텍스트 노드
- HTML 요소의 텍스트를 가리키는 객체다.
- 텍스트 노드는 요소 노드의 자식 노드이고
- 자식을 가질 수 없는 리프 노드다.(DOM 트리의 최종단)
- 텍스트 노드에 접근하려면 부모 노드인 요소 노드에 먼저 접근해야 한다.
- 요소 노드는 문서의 구조를, 텍스트 노드는 문서의 정보를 표현한다고 할 수 있다.

<br>

#### 39.1.3 노드 객체의 상속 구조

DOM을 구성하는 노드 객체는 자신의 구조와 정보를 제어할 수 있는 DOM API를 사용할 수 있다. 

<br>
DOM API로

- 자신의 부모, 형제, 자식을 탐색할 수 있으며 
- 자신의 어트리뷰트와 텍스트를 조작할 수도 있다.

<br>

DOM을 구성하는 노드 객체는 ECMAScript 사양에 정의된 표준 빌트인 객체가 아니라 브라우저 환경에서 추가적으로 제공하는 `호스트 객체`다. 

##### 노드 객체

노드 객체도 자바스크립트 객체이므로 프로토타입에 의한 상속 구조를 갖는다.
 
![스크린샷 2023-05-17 오후 9 33 07](https://github.com/na0i/FE-knowledge/assets/77482972/8326897d-9cd5-4b9c-be9c-23ac5ce302ee)

<br>

예를 들어 Input 요소 노드 객체는 프로토타입 체인에 있는 모든 프로토타입의 프로퍼티나 메서드를 상속받아 사용할 수 있다.

![스크린샷 2023-05-19 오전 10 51 03](https://github.com/na0i/Algorithm-study/assets/77482972/0c069e71-b8a5-4a85-b92b-b080700ab531)


> 노드 객체의 상속 구조는 개발자 도구의 Elements 패널 우측의 Properties 패널에서 확인할 수 있다.

<br>

- 노드 객체에는 모든 노드 객체가 공통적으로 갖는 기능도 있고
	- 이벤트 관련 기능, 트리 탐색 기능, 노드 정보 제공 기능 등
- 노드 타입에 따라 고유한 기능도 있다.

<br>

##### 요소 노드 객체
- HTML 요소가 객체화된 요소 노드 객체는 HTML 요소가 갖는 공통적 기능이 있고 이는 HTMLElement 인터페이스가 제공한다.(예 - style 프로퍼티)
- HTML 요소의 종류에 따라 고유한 기능도 있다.
	- input 요소 노드 객체는 value 프로퍼티가 필요하지만
	- div 요소 노드 객체는 value 프로퍼티가 필요하지 않듯이
	- 즉, HTML 요소 종류에 따라 (필요한 기능을 제공하는) 인터페이스가 다르다.

<br>

**노드 객체는 공통된 기능일수록 프로토타입 체인 상위**에 **개별적인 고유 기능일수록 프로토타입 체인 하위**에 위치하여 프로토타입 체인을 구축하여 노드 객체에 필요한 기능(프로퍼티와 메서드)을 제공하는 상속 구조를 갖는다.

<br>

##### DOM

- DOM은 HTML 문서의 계층적 구조와 정보를 표현하고
- 노드 타입에 따라 필요한 기능을 프로퍼티와 메서드의 집합인 DOM API로 제공한다.
- DOM API를 통해 HTML 구조나 내용 또는 스타일 등을 동적으로 조작할 수 있다.

<br>

### 39.2 요소 노드 취득

HTML의 구조나 내용 또는 스타일을 동적으로 조작하려면 먼저 요소 노드를 취득해야 한다. 

> 텍스트 노드는 요소 노드의 자식 노드이고 어트리뷰트 노드는 요소 노드와 연결되어 있기 때문에 텍스트 노드나 어트리뷰트 노드를 조작할 때도 마찬가지다.

<br>

#### 39.2.1 id를 이용한 요소 노드 취득

`Document.prototype.getElementById` 메서드는 인수로 전달한 id 값을 갖는 **하나의** 요소 노드를 탐색하여 반환한다.

- getElementById 메서드는 Document.prototype의 프로퍼티이므로 반드시 문서 노드인 document를 통해 호출해야한다.
- id는 HTML 문서 내에서 유일한 값이어야 한다. 
	- 다만 여러개 존재한다고 에러가 발생하지는 않는다.
	- 여러개 존재할 경우엔 첫번째 요소 노드를 반환한다.
- 전달된 id값을 갖는 HTML 요소가 존재하지 않을 경우 null을 반환한다.
- HTML 요소에 id 값을 부여하면 id 값과 동일한 이름의 전역 변수가 암묵적으로 선언되고 해당 노드 객체가 할당되는 부수 효과가 있다.
	- 단 동일한 전역 변수가 선언되어 있으면 노드 객체가 재할당되지는 않는다.

<br>

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="foo"></div>
    <script>
      // id 값과 동일한 이름의 전역 변수가 암묵적으로 선언되고 해당 노드 객체가 할당된다.
      console.log(foo === document.getElementById('foo')); // true

      // 암묵적 전역으로 생성된 전역 프로퍼티는 삭제되지만 전역 변수는 삭제되지 않는다.
      delete foo;
      console.log(foo); // <div id="foo"></div>
    </script>
  </body>
</html>
```

<br>

#### 39.2.2 태그 이름을 이용한 요소 노드 취득

`Document.prototype/Element.prototype.getElementsByTagName` 메서드는 인수로 전달한 태그 이름을 갖는 **모든** 요소 노드를 탐색하여 반환한다.

- getElementsByTagName 메서드가 반환하는 HTMLCollection 객체는 유사 배열 객체이자 이터러블이다.
- HTML 문서의 모든 요소 노드를 취득하려면 인수로 `*`를 전달한다.
- Document.prototype.getElementsByTagsName은 document를 통해 호출하며 DOM 전체에서 요소 노드를 탐색해 반환한다.
- Element.getElementsByTagsName은 특정 요소 노드를 통해 호출하며, 그 노드의 자손 노드 중에서 요소 노드를 탐색해 반환한다.
- 전달된 태그 이름을 갖는 요소가 존재하지 않을 경우 빈 HTMLCollection 객체를 반환한다.

<br>

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li>Apple</li>
      <li>Banana</li>
      <li>Orange</li>
    </ul>
    <ul>
      <li>HTML</li>
    </ul>
    <script>
      // DOM 전체에서 태그 이름이 li인 요소 노드를 모두 탐색하여 반환한다.
      const $lisFromDocument = document.getElementsByTagName('li');
      console.log($lisFromDocument); // HTMLCollection(4) [li, li, li, li]

      // #fruits 요소의 자손 노드 중에서 태그 이름이 li인 요소 노드를 모두
      // 탐색하여 반환한다.
      const $fruits = document.getElementById('fruits');
      const $lisFromFruits = $fruits.getElementsByTagName('li');
      console.log($lisFromFruits); // HTMLCollection(3) [li, li, li]
    </script>
  </body>
</html>
```

<br>

#### 39.2.3 class를 이용한 요소 노드 취득

`Document.prototype/Element.prototype.getElementsByClassName` 메서드는 인수로 전달한 class값을 갖는 **모든** 요소 노드들을 탐색하여 반환한다.

- 인수로 전달할 class 값은 공백으로 구분해 여러개 class를 지정할 수 있다.
- getElementByTagName 메서드와 마찬가지로 반환하는 HTMLCollection 객체를 반환한다.
- Document.prototype.getElementsByClassName은 document를 통해 호출하며 DOM 전체에서 요소 노드를 탐색해 반환한다.
- Element.getElementsByClassName은 특정 요소 노드를 통해 호출하며, 그 노드의 자손 노드 중에서 요소 노드를 탐색해 반환한다.
- 전달된 class 값을 갖는 요소가 존재하지 않을 경우 빈 HTMLCollection 객체를 반환한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul>
      <li class="fruit apple">Apple</li>
      <li class="fruit banana">Banana</li>
      <li class="fruit orange">Orange</li>
    </ul>
    <script>
      // class 값이 'fruit'인 요소 노드를 모두 탐색하여 HTMLCollection 객체에 담아 반환한다.
      const $elems = document.getElementsByClassName('fruit');

      // 취득한 모든 요소의 CSS color 프로퍼티 값을 변경한다.
      [...$elems].forEach(elem => { elem.style.color = 'red'; });

      // class 값이 'fruit apple'인 요소 노드를 모두 탐색하여 HTMLCollection 객체에 담아 반환한다.
      const $apples = document.getElementsByClassName('fruit apple');

      // 취득한 모든 요소 노드의 style.color 프로퍼티 값을 변경한다.
      [...$apples].forEach(elem => { elem.style.color = 'blue'; });
    </script>
  </body>
</html>
```

<br>

#### 39.2.4 CSS 선택자를 이용한 요소 노드 취득

`CSS 선택자`는 스타일을 적용하고자 하는 HTML 요소를 특정할 때 사용하는 문법이다.

```css
/* 전체 선택자: 모든 요소를 선택 */
* { ... }

/* 태그 선택자: 모든 p 태그 요소를 모두 선택 */
p { ... }

/* id 선택자: id 값이 'foo'인 요소를 모두 선택 */
#foo { ... }

/* class 선택자: class 값이 'foo'인 요소를 모두 선택 */
.foo { ... }

/* 어트리뷰트 선택자: input 요소 중에 type 어트리뷰트 값이 'text'인 요소를 모두 선택 */
input[type=text] { ... }

/* 후손 선택자: div 요소의 후손 요소 중 p 요소를 모두 선택 */
div p { ... }

/* 자식 선택자: div 요소의 자식 요소 중 p 요소를 모두 선택 */
div > p { ... }

/* 인접 형제 선택자: p 요소의 형제 요소 중에 p 요소 바로 뒤에 위치하는 ul 요소를 선택 */
p + ul { ... }

/* 일반 형제 선택자: p 요소의 형제 요소 중에 p 요소 뒤에 위치하는 ul 요소를 모두 선택 */
p ~ ul { ... }

/* 가상 클래스 선택자: hover 상태인 a 요소를 모두 선택 */
a:hover { ... }

/* 가상 요소 선택자: p 요소의 콘텐츠의 앞에 위치하는 공간을 선택
   일반적으로 content 프로퍼티와 함께 사용된다. */
p::before { ... }
```

<br>

`Document.prototype/Element.prototype.querySelector` 메서드는 인수로 전달한 CSS 선택자를 만족시키는 **하나의** 요소 노드를 탐색하여 반환한다.

- 만족시키는 요소 노드가 여러개인 경우 첫 번째 요소 노드만 반환한다.
- 만족시키는 요소 노드가 존재하지 않을 경우 null을 반환한다.
- 인수로 전달한 CSS 선택자가 문법에 맞지 않을 경우 DOMException이 발생한다.

<br>

`Document.prototype/Element.prototype.querySelectorAll` 메서드는 인수로 전달한 CSS 선택자를 만족시키는 **모든** 요소 노드를 탐색하여 반환한다.

- querySelectorAll 메서드는 유사 배열 객체이면서 이터러블인 NodeList 객체를 반환한다.
- 인수로 전달된 CSS 선택자를 만족시키는 요소가 존재하지 않는 경우 빈 NodeList 객체를 반환한다.
- 인수로 전달된 CSS 선택자가 문법에 맞지 않는 경우 DOMException 에러가 발생한다.
- HTML 문서의 모든 요소 노드를 취득하려면 querySelectorAll 메서드의 인수로 `*`를 전달한다.
- Document.prototype.getElementsByClassName은 document를 통해 호출하며 DOM 전체에서 요소 노드를 탐색해 반환한다.
- Element.getElementsByClassName은 특정 요소 노드를 통해 호출하며, 그 노드의 자손 노드 중에서 요소 노드를 탐색해 반환한다.

<br>

querySelector, querySelectorAll 메서드는 getElementById, getElementsBy*** 메서드보다 느린 것으로 알려져 있지만 좀 더 구체적인 조건이나 일관된 방식으로 요소 노드를 취득할 수 있다는 장점이 있다.

<br>

```html
<!DOCTYPE html>
<html>
  <body>
    <ul>
      <li class="apple">Apple</li>
      <li class="banana">Banana</li>
      <li class="orange">Orange</li>
    </ul>
    <script>
      // class 어트리뷰트 값이 'banana'인 첫 번째 요소 노드를 탐색하여 반환한다.
      const $elem = document.querySelector('.banana');

      // 취득한 요소 노드의 style.color 프로퍼티 값을 변경한다.
      $elem.style.color = 'red';
    </script>
  </body>
</html>

<!DOCTYPE html>
<html>
  <body>
    <ul>
      <li class="apple">Apple</li>
      <li class="banana">Banana</li>
      <li class="orange">Orange</li>
    </ul>
    <script>
      // ul 요소의 자식 요소인 li 요소를 모두 탐색하여 반환한다.
      const $elems = document.querySelectorAll('ul > li');
      // 취득한 요소 노드들은 NodeList 객체에 담겨 반환된다.
      console.log($elems); // NodeList(3) [li.apple, li.banana, li.orange]

      // 취득한 모든 요소 노드의 style.color 프로퍼티 값을 변경한다.
      // NodeList는 forEach 메서드를 제공한다.
      $elems.forEach(elem => { elem.style.color = 'red'; });
    </script>
  </body>
</html>
```

#### 39.2.5 특정 요소 노드를 취득할 수 있는지 확인 

`Element.prototype.matches` 메서드는 인수로 전달한 CSS 선택자를 통해 특정 요소 노드를 취득할 수 있는지 확인한다.

- 이벤트 위임을 사용할 때 유용하다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li class="apple">Apple</li>
      <li class="banana">Banana</li>
      <li class="orange">Orange</li>
    </ul>
  </body>
  <script>
    const $apple = document.querySelector('.apple');

    // $apple 노드는 '#fruits > li.apple'로 취득할 수 있다.
    console.log($apple.matches('#fruits > li.apple'));  // true

    // $apple 노드는 '#fruits > li.banana'로 취득할 수 없다.
    console.log($apple.matches('#fruits > li.banana')); // false
  </script>
</html>
```

<br>

#### 39.2.6 HTMLCollection과 NodeList

HTMLCollection과 NodeList는 DOM API가 여러 개의 결과 값을 반환하기 위한 DOM 컬렉션 객체다. 

- 모두 유사 배열 객체이자 이터러블이다. > for ...of 문으로 순회 가능하며 스프레드 문법으로 배열로 변환할 수 있다.
- HTMLCollection은 언제나 live 객체로 동작하며
- NodeList는 대부분 non-live 객체로 동작하지만 경우에 따라 live 객체로 동작한다.

> live: 노드 객체의 상태 변화를 실시간으로 반영

<br>

##### HTMLCollection과 NodeList 객체를 사용할 때 주의할 점

1. HTMLCollection

```javascript
const $elems = document.getElementsByClassName('red');

for (let i = 0; i < $elems.length; i++) {
	$elems[i].className = 'blue';
}
```

위 예시의 경우 모든 $elems의 className이 blue로 바뀌지 않는다. HTMLCollection은 live 객체이므로 3개의 요소가 있다고 가정했을 때 1번째 요소가 blue로 변하고 난 뒤 배열에는 2개의 요소밖에 남지 않았고 index 1인 요소는 원래 배열의 3번째 요소가 되기 때문이다.

<br>

2. NodeList

HTMLCollection의 문제를 해결하기 위해 NodeList 객체를 반환하는 guerySelectorAll 메서드를 사용할 수도 있다. 하지만 childNodes 프로퍼티가 반환하는 NodeList 객체는 HTMLCollection 객체와 같이 live 객체로 동작한다.

<br>

따라서 **노드 객체의 상태 변경과 상관없이 안전하게 DOM 컬렉션을 사용하려면 HTMLCollection이나 NodeList 객체를 배열로 변환해 사용할 것이 권장된다.**

> Array.from이나 스프레드 문법을 이용해 배열로 변환한다.

<br>

### 39.3 노드 탐색

Node, Element 인터페이스는 DOM 트리 상의 노드를 탐색할 수 있도록 트리 탐색 프로퍼티를 제공한다.

<br>

![스크린샷 2023-05-24 오후 9 20 37](https://github.com/na0i/FE-knowledge/assets/77482972/e17a941b-2179-4dde-9144-80f2ae2ecde9)


- Node.prototype 제공 → parentNode, previousSibling, firstChild, childNodes 프로퍼티
- Element.prototype 제공 → previousElementSibling, nextElementSibling, children

<br>

노드 탐색 프로퍼티는 모두 읽기 전용 접근자 프로퍼티(getter only)다.

<br>

#### 39.3.1 공백 텍스트 노드

![스크린샷 2023-05-24 오후 9 27 24](https://github.com/na0i/FE-knowledge/assets/77482972/8b9b4750-6169-43e5-b16a-34c65f0552c4)


HTML 요소 사이의 스페이스, 탭, 줄바꿈 등의 공백 문자는 텍스트 노드를 생성하고 이를 공백 텍스트 노드라고 한다. 인위적으로 공백 문자를 제거하면 공백 텍스트 노드를 생성하지는 않지만 가독성이 좋지 않다. 

<br>

노드를 탐색할 때는 공백 문자가 생성한 공백 텍스트 노드에 주의한다.

<br>

#### 39.3.2 자식 노드 탐색

##### Node.prototype.childNodes

- 자식 노드를 모두 탐색해 NodeList에 담아 반환
- 요소 노드뿐만 아니라 텍스트 노드도 포함될 수 있다.

<br>

##### Element.prototype.children

- 요소 노드만 모두 탐색해 HTMLCollection에 담아 반환
- 텍스트 노드가 포함되지 않는다.

<br>

##### Node.prototype.firstChild

- 첫번째 자식 노드를 반환
- 텍스트 노드, 요소 노드 모두 가능

<br>

##### Node.prototype.lastChild

- 마지막 자식 노드를 반환
- 텍스트 노드, 요소 노드 모두 가능

<br>

##### Element.prototype.firstElementChild

- 첫번째 자식 요소 노드를 반환
- 요소 노드만 반환

<br>

##### Element.prototype.lastElementChild

- 마지막 자식 요소 노드를 반환
- 요소 노드만 반환

<br>

> Node는 요소 + 텍스트 / Element는 요소만

<br>

#### 39.3.3 자식 노드 존재 확인

`Node.prototype.hasChildsNodes` 메서드를 사용해 자식 노드가 존재하는지 확인할 수 있다.

- boolean 값을 반환한다.
- 텍스트 노드를 포함해 자식 노드의 존재를 확인한다.

<br>

텍스트 노드가 아닌 요소 노드가 존재하는지 확인하려면 children.length 또는 childElementCount를 사용한다.

<br>

#### 39.3.4 요소 노드의 텍스트 노드 탐색

요소 노드의 텍스트 노드는 요소 노드의 자식 노드이므로 `firstChild` 프로퍼티로 접근할 수 있다.


```html
<div id="foo">Hello</div>
<script>
	console.log(document.getElementById('foo').firstChild);
</script>
```

<br>

#### 39.3.5 부모 노드 탐색

`Node.prototype.parentNode` 프로퍼티를 사용하면 부모 노드를 탐색할 수 있다. 

> 텍스트 노드는 리프노드이므로 부모 노드가 텍스트 노드인 경우는 없다.

```javascript
const $banana = document.querySelector('.banana');

console.log($banana.parentNode);
```

<br>

#### 39.3.6 형제 노드 탐색

형제 노드를 탐색하려면 `Node.prototype.previousSibling`, `Node.prototype.nextSibling`, `Element.prototype.previousElementSibling`, `Element.prototype.nextElementSibling` 프로퍼티를 사용한다.

- 어트리뷰트 노드는 요소 노드와 연결되어 있지만 부모 노드가 같은 형제 노드가 아니므로 반환되지 않는다.
- 즉, 텍스트 노드 또는 요소 노드만 반환한다.

<br>

##### Node.prototype.previousSibling

- 자신의 이전 형제 노드를 탐색하여 반환한다.
- 요소 노드, 텍스트 노드 가능

<br>

##### Node.prototype.nextSibling

- 자신의 다음 형제 노드를 탐색하여 반환한다.
- 요소 노드, 텍스트 노드 가능

<br>

##### Element.prototype.previousElementSibling

- 자신의 이전 형제 노드를 탐색하여 반환한다.
- 요소 노드만 가능

<br>

##### Element.prototype.nextElementSibling

- 자신의 다음 형제 노드를 탐색하여 반환한다.
- 요소 노드만 가능

<br>

### 39.4 노드 정보 취득

`Node.prototype.nodeType`, `Node.prototype.nodeName` 프로퍼티로 노드 객체에 대한 정보를 취득할 수 있다.

<br>

##### Node.prototype.nodeType

- 노드 객체의 종류(노드 타입)를 나타내는 상수를 반환
	- Node.ELEMENT_NODE = 1
	- Node.TEXT_NODE = 3
	- Node.DOCUMENT_NODE = 9

<br>

##### Node.prototype.nodeName

- 노드 이름을 문자열로 반환
	- 요소 노드: 태그 이름 반환(대문자로)
	- 텍스트 노드: "#text" 반환
	- 문서 노드: "#document" 반환

<br>

### 39.5 요소 노드의 텍스트 조작

#### 39.5.1 nodeValue

- getter, setter 모두 존재하는 접근자 프로퍼티다.
- nodeValue 프로퍼티를 참조하면 노드 객체 값(텍스트 노드의 텍스트)을 반환한다.
- 텍스트 노드가 아닌 노드의 nodeValue 프로퍼티를 참조하면 null을 반환한다.
- nodeValue 프로퍼티에 값을 할당하면 텍스트(텍스트 노드의 값)를 변경할 수 있다.

> 노드 탐색, 노드 정보 프로퍼티는 모두 읽기 전용 접근자 프로퍼티(only getter)다.

<br>

```javascript
const $textNode = document.getElementById('foo').firstChild;
$textNode.nodeValue = 'World';
```

<br>

#### 39.5.2 textContent

- getter, setter 모두 존재하는 접근자 프로퍼티다. 
- 요소 노드의 텍스트와 모든 자손 노드의 텍스트를 모두 취득하거나 변경한다.
- 요소 노드의 textContent 프로퍼티를 참조하면 요소 노드의 콘텐츠 영역 내 텍스트를 모두 반환한다.(= 요소 노드의 childNodes 프로퍼티가 반환한 모든 노드들의 텍스트 노드 값을 모두 반환)
- nodeValue 프로퍼티로도 텍스트를 취득할 수 있지만 오직 텍스트 노드일 때만 가능하다는 단점이 있다.
- textContent 프로퍼티에 문자열을 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당된 문자열이 텍스트로 추가된다.
	- 이 때, HTML 마크업이 파싱되지 않는다 = 그대로 문자열로 들어간다.
- innerText 프로퍼티가 유사한 동작을 하지만 권장되지 않는다.
	- innerText 프로퍼티는 CSS에 순종적이기 때문에 CSS에 의해 비표시로 지정된 요소 노드의 텍스트를 반환하지 않는다.
	- CSS를 고려해야하기 때문에 textContent보다 느리다.

```javascript
<body>
	<div id="foo">Hello <span>world!</span></div>
</body>
<script>
	console.log(document.getElementById('foo').textContent); // Hello world!

	document.getElementById('foo').textContent = 'Hi <span>there!</span>';
</script>
```

<br>

### 39.6 DOM 조작

**DOM 조작**은 새로운 노드를 생성해 DOM에 추가하거나 기존 노드를 삭제 또는 교체하는 것을 말한다. DOM 조작으로 DOM에 새로운 노드가 추가되거나 삭제되면 리플로우와 리페인트가 발생하므로 성능에 영향을 준다.

<br>

#### 39.6.1 innerHTML

- getter, setter 모두 존재하는 접근자 프로퍼티다.
- HTML 마크업을 취득하거나 변경한다.
- innerHTML 프로퍼티를 참조하면 요소 노드의 콘텐츠 영역 내 포함된 모든 HTML 마크업을 문자열로 반환한다.
	- textContent는 HTML 마크업을 무시하고 텍스트만 반환하지만
	- innerHTML은 HTML 마크업이 포함된 문자열을 그대로 반환한다.
- innerHTML에 문자열을 할당하면 모든 자식 노드가 제거되고 할당한 문자열에 포함된 HTML 마크업이 파싱되어 요소 노드의 자식 노드로 DOM에 반영된다.
- 즉, innerHTML 프로퍼티를 사용하면 HTML 마크업 문자열로 간단히 DOM 조작이 가능하다.

<br>

##### innerHTML의 단점
- innerHTML 프로퍼티를 사용한 DOM 조작은 구현이 간단하고 직관적이지만 크로스 사이트 스크립팅 공격에 취약하다는 단점이 있다.
- innerHTML 프로퍼티에 HTML 마크업 문자열을 할당하는 경우 요소 노드의 모든 자식 노드를 제거한 후 DOM을 변경한다.
	- 자식 요소를 추가한다고 했을 때 새로운 요소만 추가하는 것이 아니라
	- 기존 자식 요소를 제거 후 재생성한 뒤 새로운 요소도 추가한다.
- 새로운 요소를 삽입할 때 삽입할 위치를 지정할 수 없다.

<br>

```html
<html>
	<body>
		<div id="foo">Hello <span>world!</span></div>
		<ul id="fruits">
			<li class="apple">Apple</li>
		</ul>
	</body>
	<script>
		console.log(document.getElementById('foo').innerHTML);
		// "Hello <span>world!</span>"

		document.getElementById('foo').innerHTML = 'Hi <span>there!</span>';

    const $fruits = document.getElementById('fruits');
	
	// 노드 추가 / 교체 / 삭제
	$fruits.innerHTML += '<li class="banana">Banana</li>';
    $fruits.innerHTML = '<li class="orange">Orange</li>';
    $fruits.innerHTML = '';
	</script>
</html>
```

<br>

#### 39.6.2 insertAdjacentHTML 메서드

![스크린샷 2023-05-25 오후 7 37 32](https://github.com/na0i/FE-knowledge/assets/77482972/2857fbab-2cd3-4d56-8d6e-3f5fa6e288f3)


- 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입한다.
- 두 번째 인수로 전달한 HTML 마크업 문자열을 파싱하고
- 첫 번째 인수로 전달한 위치에 삽입하여 DOM에 반영한다.
- 기존 요소에는 영향을 주지 않고 새롭게 삽입될 요소만을 파싱하여 자식 요소로 추가하므로 innerHTML 프로퍼티보다 효율적이고 빠르다.
- insertAdjacentHTML 메서드도 HTML 마크업을 파싱하므로 크로스 사이트 스크립팅 공격에 취약하다.

<br>

#### 39.6.3 노드 생성과 추가

##### 요소 노드 생성

`Document.prototype.createElement(tagName)` 메서드는 요소 노드를 생성하여 반환한다.

- tagName에는 태그 이름을 나타내는 문자열을 인수로 전달한다.
- createElement로 생성한 요소 노드는 기존 DOM에 추가되지 않고 따로 존재하기 때문에 생성된 요소 노드를 DOM에 추가하는 처리가 별도로 필요하다.
- createElement로 생성한 요소 노드는 자식 노드를 갖고 있지 않다.

<br>

##### 텍스트 노드 생성

`Document.prototype.createTextNode(text)` 메서드는 텍스트 노드를 생성하여 반환한다.

- text에는 텍스트 노드 값으로 사용할 문자열을 인수로 전달한다.
- createTextNode 메서드로 생성한 텍스트 노드는 요소 노드의 자식 노드로 추가되지 않고 홀로 존재하는 상태이므로 생성된 텍스트 노드를 요소 노드에 추가하는 처리가 별도로 필요하다.

<br>

##### 텍스트 노드를 요소 노드의 자식 노드로 추가 / 요소 노드를 DOM에 추가

`Node.prototype.appendChild(childNode)` 메서드는 메서드를 호출한 노드의 마지막 자식 노드로 인수로 전달된 childNode를 추가한다.

<br>

```javascript
<body>
	<ul id="fruits">
		<li>Apple</li>
	</ul>
</body>
<script>
	const $fruits = document.getElementById('fruits');

    const $li = document.createElement('li');
    const textNode = document.createTextNode('Banana');
    $li.appendChild(textNode);
    $fruits.appendChild($li);
</script>
```

<br>

#### 39.6.4 복수의 노드 생성과 추가

##### DocumentFragment 노드

- 문서, 요소, 어트리뷰트, 텍스트 노드와 같은 노드 객체의 일종
- 부모 노드가 없이 기존 DOM과 별도로 존재
- 컨테이너 요소처럼 자식 노드들의 부모 노드로서 별도의 서브 DOM을 구성해 기존 DOM에 추가하기 위한 용도로 사용된다.
- DocumentFragment 노드를 DOM에 추가하면 자신은 제거되고 자신의 자식 노드만 DOM에 추가한다.

```html
<html>
	<body>
		<ul id="fruits"></ul>
	</body>
	<script>
		const $fruits = document.getElementById('fruits');

		const $fragment = document.createDocumentFragment();

		['Apple', 'Banana', 'Orange'].forEach(text => {
			const $li = document.createElement('li');
			const textNode = document.createTextNode(text);
			$li.appendChild(textNode);
			$fragment.appendChild($li);
    });
		$fruits.appendChild($fragment);
		// 리플로우와 리페인트가 한 번만 실행되므로 여러 개의 요소 노드를 DOM에 추가하는 경우에 효율적이다.
	</script>
</html>
```

<br>

#### 39.6.5 노드 삽입

##### 마지막 노드로 추가

`Node.prototype.appendChild` 메서드는 인수로 전달받은 노드를 자신을 호출한 노드의 마지막 자식 노드로 DOM에 추가한다. 노드를 추가할 위치를 지정할 수 없고 언제나 마지막 노드로 추가한다.

<br>

##### 지정한 위치에 노드 삽입

`Node.prototype.insertBefore(newNode, childNode)` 메서드는 첫 번째 인수로 전달받은 노드를 두 번째 인수로 전달받은 노드 앞에 삽입한다. 

- 두 번째 인수로 전달받은 노드는 inserBefore 메서드를 호출한 노드의 자식 노드여야한다.
- 그러지 않을 경우 DOMException 에러 발생
- 두 번째 인수로 전달받은 노드가 null이면 insertBefore 메서드를 호출한 노드의 마지막 자식 노드로 추가된다.(appendChild와 동일)

<br>

#### 39.6.6 노드 이동

appendChild, insertBefore 메서드는 현재 위치에서 노드를 제거하고 새로운 위치에 노드를 추가한다. 즉, 노드가 이동한다.

<br>

#### 39.6.7 노드 복사

`Node.prototype.cloneNode([deep: true | false])` 메서드는 노드 사본을 생성해 반환한다.

- deep이 true일 경우 깊은 복사(모든 자손 노드가 포함된 사본)
- deep이 false이거나 생략될 경우 얕은 복사(노드 자신만의 사본, 자식 노드 x 이므로 텍스트 노드도 미포함)

<br>

```html
<html>
	<body>
		<ul id="fruits">
			<li>Apple</li>
		</ul>
	</body>
	<script>
		const $fruits = document.getElementById('fruits');
		const $apple = $fruits.firstElementChild;

		const $shallowClone = $apple.cloneNode();
		$shallowClone.textContent = 'Banana';
		$fruits.appendChild($shallowClone);

		const $deepClone = $fruits.cloneNode(true);
		$fruits.appendChild($deepClone);
  </script>
</html>
```

<br>

#### 39.6.8 노드 교체

`Node.prototype.replaceChild(newChild, oldChild)` 메서드는 자신을 호출한 노드의 자식 노드를 다른 노드로 교체한다.

- newChild: 교체할 새로운 노드
- oldChild: 이미 존재하는 교체될 노드(replaceChild 메서드를 호출한 노드의 자식 노드여야 한다.)
- 즉 자신의 자식인 oldChild를 newChild로 교체한다.
- oldChild는 DOM에서 제거된다.

<br>

```javascript
<script>
	const $fruits = document.getElementById('fruits');

	const $newChild = document.createElement('li');
	$newChild.textContent = 'Banana';

	$fruits.replaceChild($newChild, $fruits.firstElementChild);
</script>
```

<br>

#### 39.6.9 노드 삭제

`Node.prototype.removeChild(child)` 메서드는 child 매개변수에 인수로 전달한 노드를 DOM에서 삭제한다.

- 인수로 전달한 노드는 removeChild 메서드를 호출한 노드의 자식 노드여야 한다.