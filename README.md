# UniD-app and UniD-app-pgbuild

Use this repo to do active development on the UniD app. Once ready to build and submit to the app store, do the following:

```
$ cd UniD-app/ 
$ ionic build
$ cd ../UniD-app-pgbuild/
$ cp -a ../UniD-app/www/* .
$ git add *
$ git commit -m'updates from dev'
$ git push
```

Then, go to [PhoneGap Build for the Project](https://build.phonegap.com/apps/2875972/builds)
The key is montanab, password is montanab
