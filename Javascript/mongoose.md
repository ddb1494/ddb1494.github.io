### 连接数据库

```javascript
const mongoose=require('mongoose')
const Schema=mongoose.Schema;
mongoose.connect('mongodb://0.0.0.0:3717/test',{useNewUrlParser:true});
let db=mongoose.connection;
```

