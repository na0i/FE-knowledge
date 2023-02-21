### 220510

#### ERD 설계하기

##### 참고한 사이트

> https://velog.io/@jcinsh/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%8A%A4%ED%83%80%EB%B2%85%EC%8A%A4-%EA%B3%BC%EC%A0%9C
>
> https://mslilsunshine.tistory.com/164

<br>

##### ERD란

- Entity Relationship Diagram의 약어
- DB를 개발하기 전에 보다 많은 아이디어를 도출하고, 데이터베이스 설계의 이해를 높이기 위해 데이터 모델링을 실시

<br>

##### Entity

##### Relationship

##### Attribute

1. 요구사항 분석하기

> 메뉴 카테고리는 상품 카테고리를 가진다.
>
> 상품 카테고리는 상품(음료)를 가진다.
>
> 테마 상품은 일부 상품을 가진다.
>
> 상품(음료)는 이름, 섬네일, 설명문구, 보유 성분 등을 가진다.
>
> 상품(음료)는 알레르기 물질을 가질 수 있다. 등등

작성한 요구사항을 바탕으로 데이터베이스를 구성하는데 필요한 개체, 속성, 개체간의 관계를 추출

<br>

2. 개체(Entity)와 속성(Attribute) 추출하기

- 속성들이 모여 하나의 정보 단위를 이루는 것이 개체<br>

- 위의 요구사항에 기반해서 아래와 같이 개체와 속성을 추출

![img](https://velog.velcdn.com/images%2Fjcinsh%2Fpost%2Ffc94593f-ddb8-49de-baf6-5c76740dd269%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202020-05-15%2017.22.23.png)

<br>

3. 개체(Entity)간의 관계 추출하기

- 일대일(1:1)
- 일대다(1:N)
- 다대다(N:N)
- 관계 : 선택적인 관계, 필수적인 관계

![img](https://velog.velcdn.com/images%2Fjcinsh%2Fpost%2Ffc4267f7-0f9b-4d58-9483-2eead6d8a55d%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202020-05-15%2017.22.31.png)