### 클래스와 객체2(3) - static 변수



인스턴스는 각각이 가지고 있는 동적인 heap 메모리를 사용한다

static 변수는 그 인스턴스들이 공유하는 부분

이러한 static 변수가 사용하는 메모리를 `data 영역`, `정적 영역`, `상수 영역` 등이라고 불림



인스턴스의 힙메모리는 new 라고 했을 때 할당됨

static은 다름

전체 프로그래밍이 메모리에 load될 때 할당받음



##### static

![image-20210901165734029](https://user-images.githubusercontent.com/77482972/131691629-60fd626b-5cf2-48cf-8b6e-32d2c695e324.png)

![image-20210901165807846](https://user-images.githubusercontent.com/77482972/131691632-cf765f14-5c1c-4d98-b759-a6f6c89ff4ff.png)





학생 두명이 있다고 했을때 

한명은 학번이 10001번, 나머지 한명은 10002번이라고 한다.

이때 이 학생들의 학번의 기준 숫자를 어디서 받아와야할까?

했을 때 그게 바로 static 변수(클래스변수라고도 함)



student가 입학할때마다 **자동으로 학번이 올라가게** 해보자

```java
package staticex;

public class Student {
    
    // 학번 기준값을 10000으로 준다.
    static int serialNum = 10000;
    
    int studentID;
    String studentName;
    
    // 학생이 증가한다 = constructor가 호출된다
    public Student() {
        // 호출될 때마다 serialNum 증가시키고 그것을 학번으로 부여해보자
        serialNum ++;
        studentID = serialNum
    }
}
```





![image-20210901175000444](https://user-images.githubusercontent.com/77482972/131691636-6df0871a-8088-4a44-9169-56c4fba6bb8b.png)

![image-20210901175115812](https://user-images.githubusercontent.com/77482972/131691637-8c8de451-fbbb-4eab-8800-e25133008544.png)



static 변수를 함부로 건드리게 할 수 없으니까 private으로 막아보자

그러면 외부에서 접근이 불가능하니까 getters를 이용해 만들어보자

(값 변경을 막기 위해 setter는 X)

![image-20210901175422716](https://user-images.githubusercontent.com/77482972/131691638-4da4a722-c0bd-46d2-93ca-2a82e20950d1.png)



외부에서 접근은 이렇게

![image-20210901175527889](https://user-images.githubusercontent.com/77482972/131691643-fce8e6af-e77e-45e3-9315-50b85647ba2a.png)



2번째 경우에 노란줄(warning) 이 발생한 이유는 무엇일까?

`static 메서드는 클래스 이름으로 참조해서 사용하는 것이 권장된다.`





단, static 메서드 안에

지역변수는 사용가능하지만

멤버변수(인스턴스 변수)는 사용 불가능

![image-20210901175830924](https://user-images.githubusercontent.com/77482972/131691649-bd0bd16e-7d5c-425c-bf86-79e5e98e61a7.png)



why?

지역변수는 메서드가 끝나면 사라짐

static 메서드는 인스턴스 생성과 관계없이 사용됨

하지만 인스턴스 변수는 new 될때 생성됨

그래서 static 메서드에 인스턴스 변수를 넣게 되면

생성되지도 않은 인스턴스 변수가 사용될 가능성이 있기 때문

![image-20210901180110845](https://user-images.githubusercontent.com/77482972/131691652-7e6d200f-767b-4211-8c8c-3a998f7bbcc2.png)





##### 변수의 유효 범위s

![image-20210901180134640](https://user-images.githubusercontent.com/77482972/131691656-164fa33b-cf98-46d6-a0e2-349790d5cbaf.png)

static에 너무 큰 메모리를 차지하는 변수를 선언하는 것은 자제하자