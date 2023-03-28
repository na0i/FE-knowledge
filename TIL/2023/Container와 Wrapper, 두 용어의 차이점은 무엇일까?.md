### 230328

# Container와 Wrapper, 두 용어의 차이점은 무엇일까?

나는 보통 styled-components를 사용하면서 어떤 요소를 감쌀 때 Container와 Wrapper를 혼용해서 사용하곤 했었다.

<br>

사소한 네이밍 개선이 코드 가독성을 높여준다고 생각해서 Container와 Wrapper의 네이밍 차이를 알아보았다!

<br>

### Container와 Wrapper를 사용하는 경우

일반적으로 두 용어 다 요소를 포함한다는 의미를 지니며, 클래스 용어로 자주 사용된다. 기본적으로 차이를 두지 않고서 사용해도 무방하지만, 엄격하게 구분을 한다고 하면 프로그래밍 관행 상으로 container와 wrapper의 차이를 파악하는 것이 가능하다고 한다.

<br>

### 원론적인 의미 구분

#### container : 하나 이상의 요소
#### wrapper: 하나의 요소를 포함


프로그래밍 세계에서 일반적으로 container는 하나 이상의 요소를 포괄하는 개체를 지칭하는 의미를 지니며,<br>
wrapper는 하나의 개체만을 포함하는 것을 뜻한다고 한다. 특히 wrapper는 소프트웨어 공학 측면의 `Adapter pattern`을 참고해 더 잘 이해할 수 있는데 간단하게 얘기해보면 하나의 요소를 다른 데 적용할 수 있도록 adapter 역할을 하는 것을 wrapper라고 한다는 것을 알 수 있다.

<br>

### 예시

```html
<ul class="items-container">
    <li class="item-wrapper">
        <div class="item">...</div>
    </li>
    <li class="item-wrapper">
        <div class="item">...</div>
    </li>
    <li class="item-wrapper">
        <div class="item">...</div>
    </li>
    <li class="item-wrapper">
        <div class="item">...</div>
    </li>
    <li class="item-wrapper">
        <div class="item">...</div>
    </li>
</ul>
```

위 예시는 다른 글에서 가져온 예시다.

<br>

위 예시처럼 wrapper는 하나의 요소를 감싸며 그 요소에 padding 등의 속성을 줄 경우 사용하는 것이 좋고, container는 여러 요소를 묶을 때 사용하는 것이 좋을 것 같다.

<br>

##### 참고한 글

> https://uxdev.org/entry/CSS-%ED%81%B4%EB%9E%98%EC%8A%A4-%EB%84%A4%EC%9D%B4%EB%B0%8D-%EC%8B%9C-container-vs-wrapper-%EC%B0%A8%EC%9D%B4-%EA%B5%AC%EB%B6%84%ED%95%98%EA%B8%B0

<br>