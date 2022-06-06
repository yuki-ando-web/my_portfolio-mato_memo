# tag-memo
アプリURL
https://tag-memo-app.web.app/

https://user-images.githubusercontent.com/97369008/171793934-e553be39-a6d5-49e0-9d53-f396ce918f7f.mov


## ・アプリ内容
メモ帳アプリで以下の機能を持っています。

1.メモのCRUD機能

2.メモのタグ付け機能

3.メモの検索機能（ワード、タグ、ユーザーで検索可能）

4.ログイン機能

5.全ユーザーのメモ閲覧機能

6.画像挿入機能
## ・作成の背景
前職では私も他の社員も、仕事中によくメモをとっておりました。そんな中で私が欲しいと思った機能が入ったメモアプリを作りたいと思いました。

### 1.メモの整理
仕事をしているとメモをたくさん取る必要がありました。

しかし一概に仕事といっても、商材や社内システム、取引先にビジネスマナーなど、たくさんのカテゴリーあり、メモの量が増えるたびに、それらを整理するのが難しくなりました。

そのため、タグ機能を実装しました。メモにタグを付け、タグ検索を行うことでメモを整理しやすくします。

### 2.メモの共有
先輩が仕事を教えてくれる時は、先輩のメモを見せてくれることがありました。メモには先輩視点で、仕事について気づいたことなど、有益な情報が詰まっていたおり、私はそのとき、メモを共有したいと思いました。


アプリにはログインによるユーザー作成機能があり、全ユーザーのメモを閲覧することができます。

## 使用技術
vue@2.6.14

Nuxt.js 2.15.8

Vuetify 2.6.1

Firebase 8.1.0

eslint@8.9.0

eslint@8.9.0



## ・今後実装したい機能
・メモ毎のメモの公開範囲の設定（全ユーザーに公開するかしないか）
・複数検索機能（ユーザー&タグなど）


#### 閲覧していただきありがとうございました。

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
