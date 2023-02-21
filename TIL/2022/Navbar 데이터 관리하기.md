### 220729

#### navbar 데이터 관리하기

<br>

##### 원래 내가 짠 코드

```typescript
export interface NavTreeData {
  nodeId: string;
  label: JSX.Element | string;
  children?: {
    nodeId: string;
    label: string;
  }[];
}

// label 추후에 component로 수정 예정
export const adminTreeData: NavTreeData[] = [
  {
    nodeId: "builder",
    label: (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box component={ShareOutlinedIcon} sx={{ mr: 1 }} />
        <Typography>빌더</Typography>
      </Box>
    ),
    children: [
      {
        nodeId: "flow",
        label: "플로우",
      },
      {
        nodeId: "keyword",
        label: "키워드",
      },
      {
        nodeId: "trash-bin",
        label: "휴지통",
      },
      {
        nodeId: "history",
        label: "기록",
      },
    ],
  },
  {
    nodeId: "",
    label: (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box component={SendOutlinedIcon} sx={{ mr: 1 }} />
        <Typography>빌드 & 배포</Typography>
      </Box>
    ),
    children: [
      {
        nodeId: "build",
        label: "빌드",
      },
      {
        nodeId: "deploy",
        label: "배포",
      },
    ],
  },
  {
    nodeId: "statistics",
    label: (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box component={AddchartRoundedIcon} sx={{ mr: 1 }} />
        <Typography>통계</Typography>
      </Box>
    ),
  },
];

export const userTreeData: NavTreeData[] = [
  {
    nodeId: "builder",
    label: (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box component={ShareOutlinedIcon} sx={{ mr: 1 }} />
        <Typography>빌더</Typography>
      </Box>
    ),
    children: [
      {
        nodeId: "flow",
        label: "플로우",
      },
      {
        nodeId: "keyword",
        label: "키워드",
      },
      {
        nodeId: "trash-bin",
        label: "휴지통",
      },
      {
        nodeId: "history",
        label: "기록",
      },
    ],
  },
  {
    nodeId: "statistics",
    label: (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box component={AddchartRoundedIcon} sx={{ mr: 1 }} />
        <Typography>통계</Typography>
      </Box>
    ),
  },
];

export const settingTreeData: NavTreeData[] = [
  {
    nodeId: "setting",
    label: (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box component={SettingsOutlinedIcon} sx={{ mr: 1 }} />
        <Typography>관리자 편집</Typography>
      </Box>
    ),
  },
];
```

<br>
코드 재사용성도 떨어지고, 똑같은 코드도 너무 많이 작성되어 있고, 가독성도 안좋음
<br>

##### 팀장님 아이디어

- data를 depth 없이 flat하게 구성
- data 객체 프로퍼티에 authorization을 추가한 후 auth type에 따라 filtering해서 data를 보여주자.
- 장점: 똑같은 코드 반복을 피할 수 있음, data가 추가되었을 때 그 data에 대해서 하나만 추가하면 되고, auth를 편집한다고 해도 그 data에 해당하는 auth만 수정하면 됨
- 단점: 어떤 auth가 어떤 data를 가졌는지 알기 위해서는 data를 들어와서 해당 auth를 포함하고 있는 data를 전부 확인해봐야함

<br>

##### 창우님 아이디어

- data 각각을 컴포넌트로 만들어서
- userType에 따라 컴포넌트를 조합한 treedata를 생성
- 장점: 뛰어난 가독성, props도 수정 안해봐도 됨
- 단점: 큰 단점은 아니긴 한데, 메뉴가 하나 추가되면 메뉴 추가, 해당 auth에 메뉴 추가
