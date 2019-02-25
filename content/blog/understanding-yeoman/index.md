---
title: Understanding Yeoman
date: "2016-01-20T15:33:39.945Z"
---
#What is Yeoman? 
<sub>_(45 mins)_</sub>
Yeoman is a simple, structured, and powerful code generation tool used to scaffold code of any kind or amount. 


A rich ecosystem of open-source, extensible Yeoman generators, built by the community, is available on the [Yeoman](http://yeoman.io/generators/ "Yeoman Generators") website. Find a generator you're interested in and bootstrap an application quickly, or  read on to learn how to build one yourself.

#How do I use it?  
<sub>Prerequisites: Ensure npm<sup>[1](#1)</sup>, node, and yeoman<sup>[2](#2)</sup> are installed globally</sub>

First, what is a generator?  Well a generator, as simply as possible, is a script that runs with the intention of creating source code files.  It can generate one file or an entire project.  By providing boilerplate code, we can harness learned best practices that serve as a solid foundation for our application.  

But Yeoman isn't just about the beginning of the project.  It can be used during the entire product development lifecycle.  Since Yeoman uses Node, we can harness the full power of the web to generate our code from information gathered from any connected source, including other web servers and services. 

However, before we can run, we must walk.  Lets get those keys clacking and run our first generator.  

##Run a generator
There are thousands of different yeoman generators.  Once you find one you're interested in, getting a complete application up and running is as easy as 1 2 3.

1. Find a generator from the Yeoman website and install it with npm (i.e. `npm install generator-angular -g`) <sup>[3](#3)</sup>
2. Run the generator (i.e. `yo angular`)
3. Follow the prompts...

Sub-generators are just as easy and passing in arguments are a breeze. Simply enter something similar to `yo angular:controller MainController` to scaffold a new Angular controller named MainController. You can see here how easy it is to pass arguments to the generator.

##Create a generator
Yeoman generators are configuration based and creating a Yeoman generator is quite simple.  There are just a few idiosyncratic choices that you need to be aware of, but once you understand a few key concepts, you can create you own code templates and merge them with users' answers to create code files quickly and easily. After that, we'll learn how to persist config values and take advantage of Yeomans virtual file system<sup>[5](#5)</sup> so we can rerun our generators without fear.  Then we'll get to creating sub-generators and finally how to test our generators with Mocha.

###The Generator
Start by creating a directory for your project. We'll call it "HelloYeoman".  Change into your new directory and run `npm init` (a Yeoman script is simply a node script after all) to create your package.json.  The package.json file defines the name of your generator (remember it's prepended with `generator-`.  Make sure you have a "main" property to define the generator entry point (usually index.js).

Next, run `npm install yeoman-generator --save` to bring in the yeoman-generator library. This is the library that makes your script a Yeoman generator.  

By convention, Yeoman uses the `./app` directory to contain the base generator. Create your script at `./app/index.js`. Whenever you run the generator, it will start with this file.

Following is a "Hello World" Yeoman script.  
```
'use strict';

var generator = require('yeoman-generator');

var yeomanConfig = {
  helloWorld: function(){ 
    this.log('Hello World'); 
  }
};

module.exports = generator.Base.extend(yeomanConfig);
``` 
Notice the use of the common.js (Node) Require syntax.

To enable running of your generator we have to make sure Node can find it by running `npm link` in the base directory of the generator.  This "link" command creates a symbolic link for this directory in Node's path.  We can now run our generator `yo HelloYeoman` and you should get "Hello World" in your console. Easy peasy, right?

So all of that code up above should look pretty familiar.  The only bit that's not standard JS is `Base.extend`.  The first part of that "Base" determines what kind of generator we want to use.  The second part allows us to "extend" that "Base" generator.  Yeoman has two basic kinds of generators: `Base` and `NamedBase`.  The only difference is that the NamedBase adds the "name" argument and makes it required.  By convention, the NamedBase base is typically used for sub-generators, where we typically create a named class or file.

####Config Conventions
The most fundamental thing to know about Yeoman is the order of execution.  Every function defined in your Yeoman config will run in top-to-bottom order, however any method prepended with `_` will be considered "private", and some methods are special.  The `constructor` method will run first and serves as the constructor function for your Yeoman script. Next to understand is the "Yeoman Running Context" or "run loop" (even though it's not a loop since it only gets executed once).  There are eight special functions that have a well defined execution order: `initializing`, `prompting`, `configuring`, `default`, `writing`, `conflicts`, `install`, and `end`.  The names are fairly descriptive and you should understand what each of these 8 steps is for by the end of this post, if you don't already. Any method not named one of these names will be executed after "default" (so the 4.5 slot).  As a best practice, you should put these steps in this order in your script file. Each step is a function, or an object with arbitrarily named function members that run sequentially. 

####Code templates
The most useful part of Yeoman are the code templates. They live in the `./app/templates` directory and they are your code, intermingled with variables merged from the answers provided by the user.  

#####Execution Contexts
There are two contexts for Yeoman, the "Template Context".  This is where the templates are stored.  Use `this.templatePath()` to get/set the path. A common convention is to prepend each filename with `_` for a regular file and remove the dot from dot-files like `.gitignore`.

The "Destination Context" is where your application will be scaffolded and can be retrieved with `this.destinationPath()`.

#####Copying Files
To copy a file use `this.copy(templatePath, destinationPath);`. 

To copy a directory use `this.directory(templatePath, destinationPath);`

These are relative paths to the file/directory you want to copy based on the above execution contexts.

#####Templating Syntax
Use `<%= variableName %>` in your code to create a merge variable

Since we're merging values with our template, we don't want to straight copy it, so we have to use a different command: 
```
this.fs.copyTpl({
  this.templatePath('index.html'),
  this.destinatonPath('src/index.html')
    {
      variableName: 'Foo'
    }
})  
```
#####Create JSON Files Programmatically
Create your JS object literal, then use `this.fs.writeJSON(fileName, objectLiteral);`

#####Run `npm install && bower install` automatically.
Inside the "install" step enter `npmInstall(); installBower();` or, simply `installDependencies();`  

Since this can be an expensive task, to skip this step use the `--skip-install` option.  Use it like an option, it's not automatic.

####Arguments
Arguments allow us to pass in variables to our generator.  These arguments manifest as objects on the local scope.  Arguments are typically strings and used for naming<sup>[7](#7)</sup> the file or object.
```
this.argument('name', {
  type: String, 
  required: true
});
```
Use it like `foo = this.name`.

####Options (command line switch)
Options are very similar to arguments, but are typically booleans
```
this.option('includeUtils', {
  desc: 'An optional description',
  type: Boolean,
  default: false
})
```
Use it like `this.options.includeUtils ? foo: bar;`.

####Prompts
Prompts allow us to ask the user questions so we can customize the code that gets generated.  Behind the scenes, Yeoman uses [inquirer.js](https://github.com/sboudrias/Inquirer.js) as the prompting interface.  Checkout their github page for documentation of the prompt syntax

The following code is a basic prompt.  The code belongs inside the `prompting` function.
```
var done = this.async();
this.prompt({
  type: 'input',
  name: 'appName',
  message: 'What is the application name?',
  default: 'app'
}, function callback(answers){
  this.log(answers);
  done();
}.bind(this));
```
####Persist the Config
We can store our prompt responses with the Yeoman storage API.
Simply put the `store: true` property on the prompt config and Yeoman will remember the last answers provided to the prompts.

To get direct access to the Storage API inside the generator use `this.config.set('appName', 'helloWorld');` to set a config variable and `this.config.get('appName');` to get the config variable.

####Generator composition<sup>[8](#8)</sup>
[Generator composition](http://yeoman.io/authoring/composability.html) is a great feature of Yeoman.  We can use another generator as the basis for ours or we can require one as a dependency and include it somewhere else.  

We can take generators already created by someone else and use them as a component of our generator.  It's as simple as using `this.composeWith(namespace, options, settings)` inside any function to make that generator run at that step.  Namespace is the generator name, options are the just that generators options (refer to above options section).  

####Sub-generators
Rhetorically, there are two types of Yeoman generators, a base generator and sub-generators.  However, they're really the same thing.  The difference is that a base generator creates an entire application, whereas sub-generators create application components.  A sub-generator is the same as any base generator.  The only difference between the two are that the base generator lives in the top-level `app` directory whereas sub-generators live in top-level folders named anything else. Run the sub-generator by appending `:[name]` and any options to the base generator (i.e. `yo angular:controller foo`).

####How to Test a Yeoman generator
I like Mocha, so I will use it's BDD style syntax to create my tests.

First, run `npm install mocha --save-dev` to ensure Mocha is installed in your project as a dev dependency.

Next, create a directory named "test" and a file inside it called "test-app.js" with the following code...
```
'use strict';
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('app generator', function(){
  describe('default', function(){
    before(function(){
      helpers.run(path.join(__dirname, '../app'))
        .withArguments(['HelloYeoman'])
        .withOptions({ skipInstall: true })
        .on('end', done);
    });

    // Check creation of files
    it('creates files', function(){
      assert.file([
        'package.json',
        'src/app/app.js'
      ])
    });

    // Check File Contents
    it('sets file content', function(){
      assert.fileContent('src/app/app.js', /angular.module\('app'/);
    });
  });

  // Respond to Prompts
  describe('npapp prompt', function(){
    before(function(){
      helpers.run(path.join(__dirname, '../app'))
        .withArguments(['HelloYeoman'])
        .withOptions({ skipInstall: true })
        .withPrompts({ ngappname: 'fooApp' })
        .on('end', done);
    });

    it('injects custom app name', function(){
      assert.fileContent('src/app/app.js', /angular.module\('fooApp'/);
    });
  });
});
```  
Notice the 'HelloYeoman' generator name in the arguments, and the regular expression in the fileContent check.

We can then run `mocha` on the command line to execute our tests.[^1]



_____________________________________________________________________
###Appendix

1. <a name="1"></a>To use npm and node effectively, we need to ensure that we can run the commands without sudo.  To do that, [follow this guide from John Papa](http://www.johnpapa.net/how-to-use-npm-global-without-sudo-on-osx/ "John Papa npm sudo fix").  For more info, you can read [Stack Overflow](http://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo) or [Sindresorhus](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md) or [Isaacs](https://gist.github.com/isaacs/579814) guide

2. <a name="2"></a>Install Yeoman globally with `npm install yo -g`

3. <a name="3"></a>Yeoman generators are simply node apps with `generator-` prepended to the app (generator) name.  This means that whenever you find a yeoman generator you'd like to install and use, simple prepend generator- to the name of the generator and install it with npm as you would with any other npm package.  The generator will then live in your node package folder for later reuse.

4. <a name="4"></a>`yodoctor` will provide health information about your Yeoman installation.  It is run automatically whenever Yeoman is installed. 

5. <a name="4"></a>Yeoman is intelligent about the way it generates/copies/writes your files in a synchronous manner.  It uses an in-memory file system that allows intelligent diffing of files, so the user will be aware of conflicts and can decide whether to overwrite a file that already exists.  When a generator is run and files are copied the file status is shown next to the file path in the console.

6. <a name="6"></a>Prettify your generator...
`npm install yosay && chalk --save`<br\>
`log(yosay(chalk.yellow('Welcome to the Hello World Generator')))`

7. <a name="7"></a>Use lodash to morph the your arguments to kebab-case, camel case, or title case.

8. <a name="8"></a>Generator-Common is a good candidate for generator composition.  In that case, the settings object should look something like...
```
{
  local: require.resolve('generator-common');
}
```

###Credits
This post was heavily inspired by [Steve Michelotti's Yeoman course on Pluralsight](https://app.pluralsight.com/library/courses/yeoman-fundamentals/table-of-contents).  I recommend you watch Steve's course if anything in this post was confusing.