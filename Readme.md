## Personal Note Service

BeanNote is a opensource note application. Now it contains a backend RESTful service which persisting note content into mongodb(will support any storage in the future),
but it really designed for adapting any persisten storage(including Dropbox).

---

![bean-note screenshot](http://i.imgur.com/txfnGSK.jpg)


## Why another note app?
Catch is down, a lot of services down recently. I want to have something always be there. And allow people to change the part they
do not like.


## TODO
* supporting SQL storage
* supporting Dropbox sync
* supporting MarkDown format/editor
* offline access
* Chrome plugin to clip any article to bean note

## Run On Heroku
```
# cd to your repo, then create a app
$ heroku create

# add mongodb plugin, choose one is ok
$ heroku addons:add mongolab
$ heroku addons:add mongohq

# push
$ git push heroku master

# the default authentication is **username: bean, password:note**
# you can change that by whatever you want using heroku config
$ heroku config:set USERNAME=mike PASSWORD=123

```

## Thanks To Awesome Projects
* [Node.js](http://nodejs.org/)
* [Express](http://expressjs.com/)
* [AngularJS](http://angularjs.org/)
* [wysihtml5](http://xing.github.io/wysihtml5/)
