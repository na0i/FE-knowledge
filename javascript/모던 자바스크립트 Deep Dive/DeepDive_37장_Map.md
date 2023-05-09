## 37장 Set과 Map

### 37.2 Map

Map 객체는 키와 값의 쌍으로 이루어진 컬렉션이다.

|         특징        |          객체         |     Map 객체    |
|--------------------|----------------------|----------------|
| 키로 사용할 수 있는 값  |    문자열 또는 심벌 값   | 객체를 포함한 모든 값|
| 이터러블             |          X           |        ㅇ       |
| 요소 개수 확인        |  Object.keys.length  |     map.size    |


<br>

#### 37.2.1 Map 객체의 생성

Map 객체는 Map 생성자 함수로 생성한다. 인수를 전달하지 않으면 빈 Map 객체가 생성된다.

<br>

##### Map 생성자 함수
- 이터러블을 인수로 전달받아 Map 객체를 생성
- 인수로 전달되는 이터러블은 키와 값의 쌍으로 이루어져야 한다.
- 인수로 전달된 이터러블에 키가 중복되면 값이 덮어 씌워진다.
- 즉, Map 객체에는 중복된 키를 갖는 요소가 존재할 수 X

<br>

```javascript
const map = new Map(); // Map(0) {}

const map = new Map([['key1', 'value1'], ['key2', 'value2']]); // Map(2) {"key1" => "value1", "key2" => "value2"}
```

<br>

#### 37.2.2 요소 개수 확인

`Map.prototype.size` 프로퍼티로 Map 객체의 요소 개수를 확인할 수 있다.

```javascript
const { size } = new Map([['key1', 'value1'], ['key2', 'value2']]); // 2
```

##### size 프로퍼티
- getter만 존재한다(setter X)
- 즉, size 프로퍼티에 숫자 할당해 Map 객체의 요소 개수 변경 불가능

<br>

#### 37.2.3 요소 추가

`Map.prototype.set` 메서드로 Map 객체에 요소를 추가한다.

##### set 메서드
- 새로운 요소가 추가된 Map 객체를 반환한다.
- 따라서 연속적으로 set 메서드를 호출할 수 있다.

```javascript
const map = new Map(); // Map(0) {}

map.set('key1', 'value1'); // Map(1) {"key1" => "value1")

map
	.set('key2', 'value2')
	.set('key3', 'value3'); // Map(3) {"key1" => "value1", "key2" => "value2", "key3" => "value3")
```

<br>

Map 객체는 NaN과 NaN을 같다고 평가해 중복 평가를 허용하지 않는다.

> NaN === NaN // (false)

```javascript
const map = new Map();

map.set(NaN, 'value1').set(NaN, 'value2'); // Map(1) { NaN => 'value2' }
```

<br>

Map 객체는 키 타입에 제한이 없기 때문에 객체를 포함한 모든 값을 키로 사용할 수 있다.

```javascript
const map = new Map();

const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

map.set(lee, 'developer').set(kim, 'designer');
// Map(2) { { name: 'Lee' } => 'developer', { name: 'Kim' } => 'designer' }
```

<br>

#### 37.2.4 요소 취득

특정 요소를 취득하려면 `Map.prototype.get` 메서드를 사용한다.

##### get 메서드
- get 메서드 인수로 key를 전달하면 해당 key를 갖는 값을 반환
- 전달된 key에 해당하는 요소가 없으면 undefined 반환

```javascript
const map = new Map();

const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

map.set(lee, 'developer').set(kim, 'designer');

console.log(map.get(lee)); // developer
console.log(map.get('park')); // undefined
```

<br>

#### 37.2.5 요소 존재 여부 확인

`Map.prototype.has` 메서드를 사용하여 Map 객체에 특정 요소가 존재하는지 확인할 수 있다. 불리언 값을 반환한다.

```javascript
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

console.log(map.has(lee)); // true
```

<br>

#### 37.2.6 요소 삭제

`Map.prototype.delete` 메서드를 사용하여 Map 객체의 요소를 삭제할 수 있다. 불리언 값(삭제 성공 여부)을 반환한다.

##### delete 메서드
- 존재하지 않는 키로 삭제하려하면 에러 없이 무시된다.
- 불리언 값을 반환하므로 연속적으로 호출할 수 없다.

```javascript
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

map.delete(lee); // Map(1) { {name: 'Kim'} => 'designer' }

map.delete(park); // 무시됨

map.delete(lee).delete(kim); // TypeError
```

<br>

#### 37.2.7 요소 일괄 삭제

`Map.prototype.clear` 메서드를 사용하면 Map 객체 요소를 일괄 삭제할 수 있다. 언제나 undefined를 반환한다.

```javascript
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

map.clear(); // Map(0) {}
```

<br>

#### 37.2.8 요소 순회

`Map.prototype.forEach`를 사용하여 Map 객체 요소를 순회할 수 있다.

##### forEach 메서드(Map)
- 콜백함수로 3가지 인수를 전달받는다.
	- 첫번째 인수: 현재 순회중인 요소값
	- 두번째 인수: 현재 순회중인 요소키
	- 세번째 인수: 현재 순회중인 Map 객체 자체