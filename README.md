# webpack + react

```sh
# node-sass 无权限
sudo npm install node-sass --unsafe-perm -D
```

## 目录结构
 ```
 project
 ├── README.md
 ├── package.json
 ├── src                             # src: 应用的源代码目录
 │   ├── assets                      # src/assets: 公共资源目录（公共的 less/image 等）
 │   │   ├── common.less
 │   │   └── index.html
 │   ├── common                      # src/common: 公共代码目录，比如公共的工具函数
 │   ├── components                  # src/components: 公用组件目录
 │   │   └── Title
 │   │       ├── ViewModel.js
 │   │       ├── index.js
 │   │       └── index.less
 │   ├── index.js                    # src/index.js: 应用入口文件
 │   ├── layouts                     # src/loayouts: 应用布局组件目录
 │   │   └── Frame
 │   │       ├── ViewModel.js
 │   │       ├── index.js
 │   │       └── index.less
 │   ├── pages                       # src/pages: 页面目录
 │   │   ├── Home
 │   │   │   ├── ViewModel.js
 │   │   │   ├── index.js
 │   │   │   └── index.less
 │   │   └── routes.js               # src/routes.js: 页级路由注册
 │   └── services                    # src/services: 和后端 API 对应的 service 封装目录
 │       └── DemoService
 │           ├── index.faked.js
 │           └── index.js
 └── test                            # test: 单元测试目录
     └── unit
         └── demo.js
 ```