### 220222

#### useNavigate

useHistory가 사라지고, useNavigate 등장했다.

```javascript
const navigate = useNavigate();

navigate('/');
navigate(-1);
navigate(-2);
navigate(`/user/${user._id}`);
navigate('routename', parameters)
```