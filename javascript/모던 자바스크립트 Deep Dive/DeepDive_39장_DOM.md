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