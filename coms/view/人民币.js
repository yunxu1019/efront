// 这里使用的数级换算关系如下：
// 1亿 = 1万万
// 1兆 = 1亿亿
// 1京 = 1兆兆
// 1垓 = 1京京
// 1杼 = 1垓垓
// 1穰 = 1杼杼
// 1沟 = 1穰穰
// 1涧 = 1沟沟
// 1正 = 1涧涧
// 1载 = 1正正 
// 可表示的数字最大为 8192 位
// 元拾佰仟
// 万拾佰仟
// 亿拾佰仟万拾佰仟
// 兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟
// 京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟
// 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟
// 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟
// 穰拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟
// 沟拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 穰拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟
// 涧拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 穰拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 沟拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 穰拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟
// 正拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 穰拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 沟拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 穰拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 涧拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 穰拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 沟拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 穰拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟
// 载拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 穰拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 沟拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 穰拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 涧拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 穰拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 沟拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 穰拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 正拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 穰拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 沟拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 穰拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 涧拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 穰拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 沟拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 穰拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟 杼拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟垓拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟京拾佰仟万拾佰仟亿拾佰仟万拾佰仟兆拾佰仟万拾佰仟亿拾佰仟万拾佰仟
var 数位 = "拾佰仟";
for (var 级 of "万亿兆京垓杼穰沟涧正载") {
    数位 = [数位, 级, 数位].join('');
}
数位 = "元" + 数位;
var 数字 = "零壹贰叁肆伍陆柒捌玖";
var 人民币 = function (n) {
    var [a, b] = n.split('.');
    var res = '';
    if (+b[1] !== 0) res = 数字[b[1]] + "分";
    if (+b[0] !== 0) res = 数字[b[0]] + "角" + res;
    else if (res) res = "零" + res;
    var s = a.split('').reverse().map((a, i, q) => {
        if (+a === 1 && i % 4 === 1 && (i + 1 === q.length || q.length > i + 2 && q[i + 1] === 0 && q[i + 2] === 0)) return 数位[i];
        if (a > 0) return 数字[a] + 数位[i];
        if (i % 4 === 0) return 数位[i];
        return '零';
    }).reverse().filter((m, i) => {
        return !(m === '零' && (a[i + 1] === '零' || (a.length - i) % 4 === 0))
    }).join('');
    if (s.length < 2) {
        if (!res) res = "零元整";
    }
    else {
        if (!res) res = "整";
        res = s + res;
    }
    return res;
};