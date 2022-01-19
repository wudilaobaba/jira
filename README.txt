1.配置绝对路径：
    tsconfig.json中配置："baseUrl": "./src",
    这样import就不需要频繁的../../../了


2.工程中的格式化 https://prettier.io/
    yarn add -D --exact prettier
    命令行创建文件：echo {}> .prettierrc.json
                 echo > .prettierignore  不需要格式化的文件
    git提交之前进行格式化代码：
        npx mrm lint-staged 执行后package.json会发生变化，如下：
        自己想对哪些文件进行格式化，就自己加格式名称
       "lint-staged": {
           "*.{js,css,md,jsx,tsx,ts}": "prettier --write"
        }
        第二个变化就是加入了eslint
        "eslintConfig": {
            "extends": [
              "react-app",
              "react-app/jest"
            ]
          },
        自己再安装一个依赖：yarn add eslint-config-prettier -D
        package.json中的eslint文件加入以下配置："prettier"
            "eslintConfig": {
                "extends": [
                  "react-app",
                  "react-app/jest",
                  "prettier" // 加入-----------
                ]
              },

    git提交前的commit message规范化, 依次执行：
      yarn add @commitlint/config-conventional @commitlint/cli -D
      echo "module.exports = {extends:['@commitlint/config-conventional']}" > commitlint.config.js
      npx husky add .husky
      npx husky add .husky/commit-msg "yarn commitlint --edit $1"

      massage必须以以下单词开头：
        build chore ci docs feat fix perf refactor revert style test
      提交的格式  git commit -m "ci: 你好"  冒号后面不能用大写字母开头


    git 提交前执行的命令写在了：.husky/pre-commit中


3.mock数据 - json-server
    项目中创建db.json
    运行：npx json-server --watch db.json
    GET http://localhost:3000/users  查
    GET http://localhost:3001/users?name=郑华&id=3
    POST http://localhost:3000/users 增
    DELETE http://localhost:3000/users/2 删
    PATCH / PUT  http://localhost:3000/users/1  部分更新

    项目中安装json-server   yarn add -D json-server
    建立文件夹  __json_server_mock__

4.项目中配置环境变量：
    .env 和 .env.development
    const url = process.env.REACT_APP_API_URL
    当运行npm start时，webpack会读取：.env.development
    当运行npm run build时，webpack会读取：.env

5. <td>{(users.find(user=>user.id === item.personId))?.name || "未知"}</td>
      问号ts语法 也是js语法
      当问号前面有可能是undefined | null | xxx.yyy无意义 的时候才使用❓
        如：23.age  "222".school 等

6. 将对象转为query形式的字符串：yarn add qs
7. 自定义hook util/useMount

8.确定不需要点的时候，就用unknown代替any

9.箭头函数的泛型：const fun = <T>(): T=>{}

10. 删除数组中的值之前，建议copy一下
const [arr,setArr] = useState<C[]>(value)
  const clear: clearFun = ()=>{
    setArr([])
  }
  const removeIndex:removeFun = (index: number)=>{
    const copy = [...arr] // 删除数组中的值之前，建议copy一下
    copy.splice(index,1)
    setArr(copy)
  }


11.typescript是鸭子类型🦆，是面向接口编程，而不是面向对象编程，只要长的像就可以了

12.json-server配置中间件，自定义非restFulAPI
  package.json中：
    "yarn json-server --watch ./__json_server_mock__/db.json --port 3001 --middlewares ./__json_server_mock__/middleware.js"
