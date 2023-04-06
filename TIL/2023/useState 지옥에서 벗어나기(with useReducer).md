### 230406

# useState 지옥에서 벗어나기(with useReducer)

### useReducer란?

리액트 상태 관리로 가장 많이 사용되는 훅은 useState일 것입니다. 하지만 상태를 관리할 때 useState를 사용하는 것 말고도 useReducer를 사용하는 방법이 있습니다.

<br>

`const [state, dispatch] = useReducer(reducer, initialState);
`

- state는 사용할 상태, dispatch는 액션을 발생시키는 함수입니다.
- 첫번째 파라미터는 reducer 함수
- 두번째 파라미터는 초기 상태입니다.

<br>

### useState 남용의 문제점

개발을 하다보면 한 컴포넌트에 수많은 useState를 작성하게 되는 경우가 있습니다.

```javascript
import { useState } from "react";

function EditCalendarEvent() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState();
  const [attendees, setAttendees] = useState([]);

  return (
    <>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      {/* ... */}
    </>
  );
}
```

위 예시는 달력 이벤트를 업데이트하는 컴포넌트입니다.
<br>

이 컴포넌트의 문제는 아래와 같습니다.

- useState가 남용되어 어떤 상태를 관리하고 있는지 한 눈에 알기 어렵고
- 세이프가드가 없습니다.
	- 종료 날짜를 시작 날짜 이후로 선택할 수 있다든가
	- 제목이나 설명에 글자 수 제한을 건다든가

<br>


### useState를 어떻게 대체할 수 있을까?

`useReducer` 를 사용하면 위와 같은 문제를 해결할 수 있습니다.

<br>

useReducer를 사용하면 A에서 B로의 변환을 제어할 수 있기 때문입니다. 위 예시 코드는 아래와 같은 형태로 개선될 수 있습니다.

```javascript
import { useReducer } from "react";

function EditCalendarEvent() {
  const [event, updateEvent] = useReducer(
    (prev, next) => {
    // 이벤트를 검증하고 변환하여 상태가 항상 유효할 것을 한 곳에서 관리하며 보장합니다.
      return { ...prev, ...next };
    },
    { title: "", description: "", attendees: [] }
  );

  return (
    <>
      <input
        value={event.title}
        onChange={(e) => updateEvent({ title: e.target.value })}
      />
      {/* ... */}
    </>
  );
}
```

useReducer를 사용하면 상태를 한 곳에서 관리하며 상태 변환을 제어할 수 있는 함수를 추가함으로써 언제나 유효하다는 것을 보장한다는 이점을 갖습니다.

<br>

아까 언급했던 **useState로 상태를 따로따로 관리할 경우 세이프 가드가 없다**는 문제를 useReducer로 해결해봅시다!

<br>

```javascript
import { useReducer } from "react";

function EditCalendarEvent() {
  const [event, updateEvent] = useReducer(
    (prev, next) => {
      const newEvent = { ...prev, ...next };
      // 시작 날짜가 종료 날짜 이후가 될 수 없음을 보장
      if (newEvent.startDate > newEvent.endDate) {
        newEvent.endDate = newEvent.startDate;
      }
      // 제목이 100자를 넘을 수 없음을 보장
      if (newEvent.title.length > 100) {
        newEvent.title = newEvent.title.substring(0, 100);
      }
      return newEvent;
    },
    { title: "", description: "", attendees: [] }
  );

  return (
    <>
      <input
        value={event.title}
        onChange={(e) => updateEvent({ title: e.target.value })}
      />
      {/* ... */}
    </>
  );
}
```

<br>

### 언제 useState를 useReducer로 대체해야할까?

useState를 사용하는 곳 대부분은 useReducer로 대체될 수 있습니다. 하지만 보통의 경우 useState를 사용해도 괜찮기 때문에 관리하는 상태 값이 적다면 useState를, 관리하는 값이 많아지고 상태의 구조가 복잡해진다면 useReducer를 사용하는 것도 하나의 방법일 것 같습니다.

<br>

결국은 우리의 선택!

<br>

이 글은 다음 글을 참고하여 작성되었습니다.
>https://react.vlpt.us/basic/20-useReducer.html

> https://velog.io/@eunbinn/a-cure-for-react-useState-hell