# Screeps AI

## Config

配置 `./config/config.example.json` 并另存为 `config.json`

```json
{
  "email": "private server only",
  "password": "private server only",
  "serverPassword": "private server only",
  "token": "account token",
  "serverUrl": "https://screeps.com",
  "branch": "dev",
  "winPath": "local path on windows",
  "macPath": "local path on mac"
}
```

## Dev

```bash
# 本地服务器测试
$ yarn start

# 官方服务器测试
$ yarn start:remote

# 打包上传至官方服务器
$ yarn build

# 生成API文档
$ yarn doc
```

## Third Party Tools

* [ScreepsPlus Grafana](https://screepspl.us/services/grafana)
* [ScreepsSC Chrome extension](https://github.com/stybbe/Screeps-SC)

## Docs Link

* [Screeps Doc](http://docs.screeps.com/index.html)
* [Screeps Api](http://docs.screeps.com/api/)
* [Lodash](https://lodash.com/docs/4.17.5)
* [ES6](http://es6.ruanyifeng.com/#docs/class)
* [TypeScript](https://ts.xcatliu.com/basics/index.html)
* [TypeDoc](http://typedoc.org/guides/doccomments/)
