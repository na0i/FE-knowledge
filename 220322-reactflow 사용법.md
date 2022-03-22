### 220322

#### React-Flow Docs


##### Basic Functionality

위치정보 외에는 state 업데이트를 하지않는다.<br>
이는 node를 연결 혹은 삭제할 때, functions를 pass 해야함을 의미한다.<br>
직접 구현해도 되고, 라이브러리에 딸린 helper functions 이용해도 된다.<br>
helper Functions 예시: removeElements, addEdge 등

```
const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
const onConnect = (params) => setElements((els) => addEdge(params, els));
```

- onElementsRemove
  - 삭제할 elements를 인자로 받아
  - setElements로 elements를 update하는데
  - helper function인 removeElements에 **삭제할 elements**와 **원래 elements 배열**을 인자로 삼는다. 
- onConnect
  - 추가할 params를 인자로 받아
  - setElements로 elements를 update하는데
  - helper function인 addEdge에 **추가할 elements(source)**와 **원래 elements 배열(target)**을 인자로 삼는다.

<br>

##### Overview Source Code
- snapToGrid
  - true: 격자에 맞추어 이동
  - false: 격자 상관없이 이동
<br>
