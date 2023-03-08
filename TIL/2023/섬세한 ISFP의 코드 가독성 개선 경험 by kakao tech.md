### 230129

> 이 글은 kakaoTech의 '섬세한 ISFP의 코드 가독성 개선 경험' 영상을 보고 작성되었습니다. 

# 1. 정확한 단어 고르기

## 1-1. 다른 뜻을 가진 단어와 구분하기

### 예시: `load`와 `fetch`

```javascript
const data = await loadData();
```

- load는 가져와서 싣다
- fetch는 가져오다

<br>

즉, loadData는 가져와서 싣는 것까지 완결된 상태이다.<br>
이를 다시 data 변수에 할당하면 가져온다는 뜻이 중복된다.<br>

<br>

**좋은 예시**

```javascript
const data = await fetchData();
const success = await loadData();
```

<br>

**react query 라는 data fetching 라이브러리 예시**

isLoading과 isFetching이라는 변수를 지원한다. 이 때, 데이터가 없을 때 최초로 한 번만 바뀌는 변수는 isLoading이다. isLoading은 가져와서 싣는 것이기 때문에 한 번 isLoading이 true가 되면 계속 true인 상태가 되는 것이다.

<img width="613" alt="스크린샷 2023-02-17 오후 10 51 44" src="https://user-images.githubusercontent.com/77482972/219673293-85c6f6ec-eb3a-4fd3-80c2-47b03c2bd796.png">

<br>

이처럼 용어를 제대로 알고 사용하는 것은 라이브러리 용법을 익히거나 코드를 읽을 때 수월해지도록 도와줄 수 있다.

<br>

### 예시: `get`과 `query`

```javascript
expect(screen.getByText('Username')).toBeInTheDocument();
expect(screen.queryByText('Username')).toBeInTheDocument();
```

- get은 가져오다 
- query는 질문하다

<br>

getByText와 queryByText의 차이는 getByText는 결과가 없으면 Error를 던지고, queryByText는 결과가 없으면 null을 반환한다.

<br>

#### 왜일까?

가져온다는 말은 결과를 당연히 가져올 것으로 기대하지만 질문하는 것은 질문으로 그치기 때문에 결과가 없을 수도 있기 때문이다. 따라서, 결과가 없을 수도 있지만 확인만 해볼 때는 queryByText를 사용하는 것이 적절하다. get은 대상이 필히 존재한다고 가정하므로 가져온 뒤 대상을 활용하는 코드가 이어진다.

<br>

### 컴포넌트 작성 - UI 명칭 이해하기

<img width="800" alt="스크린샷 2023-02-17 오후 11 01 07" src="https://user-images.githubusercontent.com/77482972/219675997-80510c4b-847e-48a8-9e82-8a4b74f21c69.png">

App Bar와 Global Navigation Bar와 Local Navigation Bar의 차이를 이해하는 것, Card와 Box의 차이를 이해하면 컴포넌트 구성 예측이 쉬워진다.

<br>

#### Card
하나의 주제로 묶인 컨텐츠와 액션, 그 모든 것

#### Box
내용물을 감싸는 래퍼의 개념에 가깝게 사용된다.

<br>

### Card 예시

```javascript
const FruitCard = fruit => (
	<div>
		<span>{fruit.name}</span>
		<img src={fruit.img} />
	</div>
);
```

내부 컨텐츠를 포함하므로 FruitBox라는 명칭보다 FruitCard라는 명칭이 잘 어울린다.

<br>

### Box 예시

```javascript
const FruitBox = children => (
	<div>
		{children}
	</div>
)
```

박스라는 이름에 걸맞게 테두리를 담당하는 역할만 맡게 된다.

<br>

### Select와 Search 예시

<img width="865" alt="스크린샷 2023-02-17 오후 11 08 38" src="https://user-images.githubusercontent.com/77482972/219677616-6034ec14-506d-4ef3-8673-77a50838e163.png">

Select는 선택하다<br>
Search는 찾다

<br>

Select는 하나의 결과를 항상 선택하고, Search는 모든 결과를 찾는 것에 그친다. 따라서, Select 컴포넌트가 하이라이팅 되는 것은 당연한 결과였다. Search 컴포넌트를 사용하면 문제도 간단히 해결되고 가독성도 높아진다.

<br>

## 1-2. 보다 구체적인 단어로 바꾸기

코드 작성은 글쓰기와 같다. 광범위한 뜻을 내포하는 단어 대신 보다 원래 의미를 잘 표현할 수 있는 단어를 선택하면 의도나 목적을 명확히 전달해줄 수 있기 때문이다.

### 예시

```javascript
if (expirationTime < PROMOTION_END_TIME) {
	return remainTime / totalTime;
}
```

위 코드가 아쉬운 점은<br>
1. 조건문에서는 값을 비교하고
2. return은 값을 나누고 있다.

<br>

### 어떻게 개선할까?

1. 값을 비교하는 조건문이니까 값에 가까운 단어를 사용하자.
> 조건문은 값을 비교하고 있기 때문에 시간값의 비교에서는 순서가 중요하다. 시간보다는 시각이라는 단어가 더 적절할 것 같다. <br>
> expirationTime, PROMOTION_END_TIME → expirationDate, PROMOTION_END_DATE

<br>

2. 정량적인 값을 return 할 것이라는 것을 보여주자.
> return 값이 나누는 값이기 때문에 나눌 수 있는 양인지를 나타내면 좋겠다. 기간을 의미하는 단어인 Duration을 사용하여 양의 느낌을 명확히 줄 수 있을 것 같다.<br>
> remainTime, totalTime → remainDuration, totalDuration

<br>

### 주로 사용할 수 있는 대체 단어

##### get 
→ extract(추출하다), parse(분해하다), aggregate(합치다)

##### number
→ limit(제한이 되는 수), count(총계)

##### change
→ convert(변환하다), filter(거르다), override(덮어쓰다)

##### changed
→ dirty(더러운 = 수정이 이루어진)

<br>

### 정확하지 않은게 더 좋은 경우도 있지 않을까?

**아쉬운 예시**

```javascript
const MIN_TO_SEC = 60;
const HOUR_TO_SEC = MIN_TO_SEC * 60;
const DAY_TO_SEC = HOUR_TO_SEC * 24;

convertSecondToText(3 * DAY_TO_SEC + 12 * HOUR_TO_SEC + 30 * MIN_TO_SEC).toEqual('3.5days');
```

**좀 더 나은 예시**

```javascript
const MIN = 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;

convertSecondToText(3 * DAY + 12 * HOUR + 30 * MIN).toEqual('3.5days');
```

MIN, HOUR, DAY가 좀 더 모호하지만 아래가 좀 더 잘 읽힌다. 따라서, 항상 정확한 표현을 찾기 보다는 문맥에 맞추어 가독성을 고민해보는 것이 효과적이다.

<br>

# 2. 잘 보이는 형태로 작성하기

## 2-1. 표

**아쉬운 예시**

```javascript
const type = 
exception
	? undefined
	: condA
	? 'A'
	: condB
	? condC
		? 'BC'
		: 'BD'
	: 'A'; 
```

직관적으로 코드가 눈에 들어오지 않는다.

<br>

<img width="403" alt="스크린샷 2023-02-20 오전 12 28 03" src="https://user-images.githubusercontent.com/77482972/219957803-68676c66-a255-4714-bf8f-32f640c6d31c.png">

표처럼 원하는 행과 열에만 시선을 두어 인과관계를 파악하기 좋을 것이다.

<br>

**let과 if문 사용한 예시**

```javascript
let type = 'A';
if (exception) type = undefined;
if (condA) type = 'A';
if (condB) {
	if (condC) type = 'BC';
	else type = 'BD';
}
```

<br>

**즉시 실행함수와 early return의 활용**
```javascript
const type = (function () {
	if (exception) return undefined;
	if (condA) return 'A';
	if (condB && condC) return 'BC';
	if (condB && !condC) return 'BD';
	return 'A';
})();
```

<br>

**아쉬운 예시**

```javascript
let str = '';

switch (type) {
	case 'apple':
		str = '사과';
		break;
	case 'banana':
		str = '바나나';
		break;
	default:
		str = '포도';
}
```

직관적이긴 하나, 더 좋은 형태(표)로 개선할 수 있을 것 같다.

<br>

**대응 관계를 일직선 상에 가깝게 위치한 예시**
```javascript
const FRUIT_MAP = {
	apple: '사과',
	banana: '바나나',
	DEFAULT: '포도',
}

const str = FRUIT_MAP[type] || FRUIT_MAP.DEFAULT;
```

<br>

## 2-2. 목차

**예시 상황**<br>

모달 A, 모달 B, 모달 C가 존재하고 z-index가 아래와 같은 상황이다.
- 모달 A의 z-index: 100
- 모달 B의 z-index: 300
- 모달 C의 z-index: 500

<br>

모달 A를 모달 B 위에 띄우기 위해 A의 z-index를 1000으로 수정하면 의도치 않게 모달 C보다 위에 위치하게 되어 버린다.

<br>

**목차 작성을 응용한다면?**

```javascript
export const ZINDEX_USAGES = {
	HEADER_DROPDOWN: 900,
	HEADER: 1000,
	MODAL_A: 100,
	MODAB_B: 300,
	ALERT_SNACKBAR: 9999,
}
```

앱 내에서 사용한 모든 z-index를 한 곳에서 확인할 수 있어 가독성이 좋아진다.

<br>

## 2-3. 용어 정리

**아쉬운 예시**

```javascript
if (accessType === 'kakao') {
	return Array.from(data)
		.filter(item => !(item.sugar > 5000))
		.sort((a, b) => a.energy - b.energy);
}
```

동작 과정을 이해하는 데 문제는 없지만 다른 개발자가 의도를 이해하지 못할 수도 있지 않을까?

<br>

**개선한 예시**
```javascript
const shouldDisplay = accessType === 'kakao'; // 보여줘야 할지 말지의 기준이었다.

if (shouldDisplay) {
	const foods = Array.from(data); // data는 사실 foods 였다.
	const healthyFoods = foods.filter(menu => {
		const isUnhealthy = food.sugar > 5000; // 5000은 사실 건강함의 척도였다는 것을 삽입
		return !isUnhealthy;
	})

	const calorieOrderedFoods = healthyFoods.sort((a, b) => a.energy - b.energy);
	return calorieOrderedFoods;
}
```

코드는 길어졌을 지라도 용어를 정리하듯 의도를 명확히 함으로써 좀 더 가독성이 좋아졌다.

<br>

## 2-4. 각주

이 부분은 HOC 기법을 사용해서 설명해주셨는데 아직 HOC를 잘 사용하지 못해 감이 오질 않는다. 나중에 다시 볼 예정이다.

<br>

> '섬세한 ISFP의 코드 가독성 개선 경험' 다시보기
> https://www.youtube.com/watch?v=emGLxi0LvNI