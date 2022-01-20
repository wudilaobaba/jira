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


11.typescript是鸭子类型🦆🦆🦆，是面向接口编程，而不是面向对象编程，只要长的像就可以了

12.json-server配置中间件，自定义非restFulAPI
  package.json中：
    "yarn json-server --watch ./__json_server_mock__/db.json --port 3001 --middlewares ./__json_server_mock__/middleware.js"


13.干掉__json_server_mock__ 使用 npx imooc-jira-tool 真实接口
    或：
    1.yarn add jira-dev-tool@latest
    2.npx msw init public
    项目index.tsx中引入 import {loadDevTools} from 'jira-dev-tool'
    loadDevTools(()=>
      ReactDOM.render(...)
    )

14. useContext的使用：
    import React, {createContext, useContext} from 'react'

    // =======================================  STEP01. 定义context数据
    const MyContext = createContext(10)

    // =======================================  STEP03. 子组件中使用数据（前提是Context中必须包含了该子组件）
    function Child() {
      // 数据消费者
      const value = useContext(MyContext);
      return(
        // <MyContext.Consumer>
        //   {
        //     (value: number)=>(<div>{value}</div>)
        //   }
        // </MyContext.Consumer>
        <div>{value}</div>
      )
    }

    // =======================================  STEP02. 父组件中包含自组件并给值
    function ContextPage() {
      return (
        <div>
          <h3>useContext:跨组件层级获取数据时，简化获取数据时的代码</h3>
          <MyContext.Provider value={77}>
            <Child/>
          </MyContext.Provider>
        </div>
      )
    }
    export default ContextPage

15. 组件的props.children是 React.ReactNode类型
    <div>
      <span>22</span>
    </div>
    相当于：
    <div children={<span>22</span>}/>

16.Promise
    const t1 = async ()=>Promise.reject("wronG")
      const t2 = async ()=>{
        // 主要看返回什么状态的Promise
        try{
            //  成功的Promise走这里
          const a = await t1();
        }catch (e) {
            //  失败的Promise走这里
          console.log(e);
        }
      }
    t2()

17. async函数的类型定义：
    login: (param:AuthForm)=>Promise<void>

18.区分非登录状态和登录状态
    unauthenticated-app 和  authenticated-app

19. axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常

20. type和interface
    type是类型别名
    二者区别：
      定义联合类型的时候，只能使用type
      js中的typeof是在运行时运行的
      ts中的typeof是在开发时运行的 typeof 对象，返回一个新的类型
      01. Parameters<typeof fun> 返回值是fun的参数类型
      02. Partial<Person> 相当于把Person接口的所有属性都变成了可选属性
      03. Omit<Person,'name'> 相当于删除了Person接口中的name属性
          Omit<Person,'name'｜'age'> 相当于删除了Person接口中的name和age属性

21.修改antd的主题色
    yarn add @craco/craco craco-less
    修改package.json的script: 将react-scripts替换为craco
    创建craco.config.js

22.Table组件中columns的类型是由dataSource推断出来的

23.Table组件中的render
    // 01. render的第一个参数与dataIndex遥相呼应！！！！！！
    // dataIndex: 'organization',
    // render:(value, project)=><span>{value}</span>
    // 02. 如果没有dataIndex，那么value就是list中的每一条数据
    render:(value, project)=><span>{JSON.stringify(value)}</span>