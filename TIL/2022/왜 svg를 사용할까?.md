### 220331

#### SVG

##### SVG란?

'Scalable Vector Graphics' 의 약어<br>
SVG는 결국 xml 이라는 마크업 언어의 종류이므로 css와 javascript로 수정이 가능

<br>

##### 개발에 SVG를 사용하는 이유는?

깨지지 않고, 용량이 적고, 출력이 빠르며, 수정과 애니메이션이 가능 하기 때문

> SVG는 벡터 기반으로 각 좌표에 점을 이어서 만들어지기 때문에 벡터 기반의 아이콘은 확대나 축소를 해도 깨지지 않고 선명하게 볼 수 있습니다. 또한 코드로 이뤄져 있기 때문에 위에서도 언급했 듯 코드를 수정함으로써 크기와 색깔 등을 쉽게 변경할 수 있고 용량 또한 png나 jpg를 여럿 첨부하는 것 보다 훨씬 적게 가져갈 수 있습니다.

<br>

##### React에서 SVG 사용하기

svg를 React 컴포넌트로 사용한다.<br>
이 방법은 하나의 svg 파일로 다양한 크기, 색상을 가진 아이콘으로 이용 가능<br>

<br>
```
import { ReactComponent as Cookie } from 'assets/cookie_icon.svg';

<Cookie width="10" height="10" fill="orange"/>
```
