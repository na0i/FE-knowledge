### 배열과 ArrayList (1)



배열: 동일한 자료형의 변수를 한꺼번에 순차적으로 관리

- 물리적, 논리적으로 연속되어 있는(중간에 빈값 x) 자료구조
- 이 배열의 길이가 얼마일지 선언하고 시작(1개당 4byte) = fixed length로 시작



##### 배열 선언하기

- 자료형[] 배열이름 = new 자료형[개수]

- 자료형 배열이름[] = new 자료형[개수]

- ```
  int[] arr = new int[10];
  int arr[] = new int[10];
  ```



##### 배열 초기화

```java
// 길이 대신 넣을 값들을 작성해준다
int[] numbers = new int[] {0, 1, 2};

// 하나하나 값을 넣어준다.
int[] numbers = new int[3];
numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;

// 또다른 방법 1
int[] numbers = {1, 2, 3};

// 또다른 방법 2
int[] numbers;
numbers = new int[3];
numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;
```



![image-20210902005643080](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20210902005643080.png)



![image-20210902010329443](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20210902010329443.png)