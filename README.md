

## Meituan



Goal: 
1.click the food, then show the food details 

git build new branch

Problem solving:
I.Food Dtailed Component buid(UI):
1.set the the v-show = hide the page
2.CSS change


II.Functions:
1.refs , use the function in the Childe Component(food ), to control open or close the food details tab;

2.Props send to the Food details
1) Good get the data
2) send it into the food, in the component


## Dev server lost
[why there is no dev-client.js and dev-server.js in the project's builder folder?](https://www.udemy.com/course/vuejs-app/learn/lecture/8476936#questions/3675486)  

[vue-cli没有dev-server.js文件该怎么办](https://blog.csdn.net/Merciwen/article/details/79482309)

[vue创建项目找不到dev-server.js文件](https://blog.csdn.net/qq_42256836/article/details/89195098)
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## The Reason why you can not render the app.vue component in the dev eneviroment,

You need to change the  the this value in index.js to this assetsPublicPath: '/',

[Vue项目启动后页面为空白解决方案](https://blog.csdn.net/weixin_43254676/article/details/89446174?spm=1001.2101.3001.6650.10&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-10.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-10.pc_relevant_default&utm_relevant_index=13)
[：router.config.js](https://segmentfault.com/q/1010000008144091)
[Simple vue app doesn't show anything](https://stackoverflow.com/questions/43244003/simple-vue-app-doesnt-show-anything)

You can deploy the sell app with the node server, no need to involve the nginx:

Just cd to the deploy directory, then run the code below:
```
node pro.server.js
```
then you input the code below to see the result in the browser， you need to git branch to the 
main branch first.
