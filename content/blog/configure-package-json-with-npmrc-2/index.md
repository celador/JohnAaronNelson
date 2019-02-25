---
title: Configure package.json variables with npmrc
date: "2016-03-11T16:28:57.827Z"
---
With NPM and `package.json` we can unify our script (task) running, which works great for building and deploying code.  But we can't stick our username and password in the `package.json` if we want to keep our password private.  So how do we include a deploy script with `package.json`, keep our information private, but still check in changes to Git?  We use npm config variables...

One of the most overlooked yet important aspects of npm is the config file.  Using npm config to set our npm username and password is required to deploy any packages to npm.  But we don't want to include all of our project specific credentials in one global config file.  It would quickly pollute the global config file.  Coming to the rescue are package-specific `.npmrc` files. 

Create a .npmrc file that resides next to the `package.json` file.  Inside `package.json` use `$npm_package_config_<variable>` to refer to the `config:{varible: ''}` section of `package.json`.  But sticking our credentials in there kind of defeats the purpose of using variables, since they're declared in the same file!  

We can override the local config with a project config in the `.npmrc` file.  Create variables with the syntax `<package>:<variable>=<value>` with the package matching the name in your `package.json`

If we wanted to skip the local and project config files, we can go straight to the global config with `$npm_config_<variable>`. 

Further reading...
[The Ultimate Guide to Configuring NPM](http://stackabuse.com/the-ultimate-guide-to-configuring-npm/)  
[npm config](https://docs.npmjs.com/cli/config)  
[.npmrc](https://docs.npmjs.com/files/npmrc)