---
title: The modern Salesforce development workflow with Visual Studio Code
date: "2015-06-29T01:30:00.000Z"
---
### Modern development happens with Javascript

Functional programming, with its roots in the 50's, is more popular than ever.  JavaScript, a language conceived of and brought to life in less than two weeks, has developed over the last 20 years, into the language du jour for the modern developer. What was once laughable, is now reality.  There are now tools and packages available to do seemingly anything.  JavaScript runs enterprise, "web-scale" servers for the largest corporations in the world, from the database to the pixels.  Yet the language can be so simple and expressive, one can setup up a web server with 10 short lines of code that read like English.

I'm not sure if you can tell yet, but I love JavaScript!  And I'm really excited to be speaking with you today because, in my humble opinion, Salesforce is the best platform for JavaScript development and developers.  And today I'm going to show you how you can use JavaScript to develop beautiful and responsive web applications simpler and faster than you ever have before.

#### JavaScript is a first-class Salesforce language. Development is powerful and using both native and open-source tools

If you follow JavaScript, you know how rapid the pace of change is.  It seems like there's a new library or tool every week, and it doesn't stop with Salesforce.  There are JavaScript tools and libraries available to accomplish virtually anything you wish to do as a Salesforce developer.

* JsForce, nForce, ngForce, Heroku Force, etc...
* Control Salesforce from any environment: Command Line, Server, Browser
* Heroku + Heroku Connect for NodeJS / MEAN Salesforce apps
* Electron Engine underpinning Atom & Visual Studio Code

### What is Visual Studio Code and how does it fit into this picture?

VSCode is an incredible NodeJs development environment.  It provides native NodeJs debugging, something that no other free editor provides.  It's even built on Node.  It uses the electron shell, which interfaces with Node and the V8 engine, but uses Microsoft's Monaco code editor.

I believe VSCode provides a better development environment for JavaScript developers than any other IDE or code editor on the market, free or otherwise.  It's simple and fast to it's core and provides us with the most important tools we need, and very little else.

### So get to the workflow already

#### The Platform:  It all starts with Node

* NodeJS is the foundation JavaScript depends on.  It provides us a powerful platform with which to develop.
* NPM, Bower, JSPM can all be used to retrieve packages.  Most things can be found with NPM.  JSPM is an interesting new alternative.

##### Source Control and Project Management: Keep everyone up to date

* SVN, Mercurial, or Git: Use Git

* When working in a team, proper branch management is a key part of your workflow and special attention should be paid to making the process of branching and merging is as painless as possible.
* Use "GitFlow" as your branching and release management strategy: utilizing separate feature, develop, release, hotfix, and master branches, keeping broken code out of master as much as possible.

* Bitbucket or Github: We like Github because of it's simple interface and better integration with other tools, such as Slack.

* The differences between the two products is mostly aesthetics, with Github costing a bit more
* The combined offering from Atlassian of Bitbucket, Jira, and Jenkins is compelling works better for some enterprises

* Jira, Sprintly, or Zenhub: Mostly a case of personal preference by your project manager, we like Zenhub because of it's dead simple interface and tight integration with Github.

##### Code Generators and CSS pre-processors: Don't Repeat Yourself

* Yeoman or Slush: we like Slush
* Stylus, Less, or Sass: we like Sass

Generally, use the tool that has the content you want.  Each has their benefits, but they're not really important when just starting out.

##### JavaScript pre-processors: ...and what they mean for the future of JavaScript development

ES6 is the new standard for JavaScript.  As developers, we must work to make our code useful for as long as possible.  We can use pre-processors like LiveScript, CoffeeScript, or BabelJs, but I'm going to make the case for TypeScript!

TypeScript allows us to write future-proof code against the ES6 standard, that compiles to ES5, the standard of today, and even to ES3, the standard of yesterday.  But the real differentiator it it's type system.  Using TypeScript, we can optionally assign actual Types to our dynamically typed JavaScript.  With Type Definition Files, we can provide

##### The Build system: The Magic

* Grunt is a task runner.  It's a common tool that is most often misused as a build system.  Don't fall into the trap, since it's a task runner it accomplishes things through reading, transforming, and writing files.  When things go wrong, it can get messy.
* Gulp is a streaming build system.  It transforms source code through a pipeline.  It works great as a modern build system with RequireJS, but it has it's limitations.
* Webpack is what is next.  It uses CommonJS syntax, so you can assemble your client app like your server app.
  * It can import, assemble, bundle, uglify, and minify your code.  And will give you a map!
  * It can optimize, transform, preprocess, and assemble all your front end assets.
  * It can run all your functional and integration tests
  * It can even watch every one of your files and do all of that automatically, any time you save any file it cares about.  It can even deploy all of that code up to Salesforce, automatically, about as fast as you can Alt+tab.  Let me show you.

> #### Demo of Webpack-Salesforce-Auto-Build-Deploy

##### Continuous Integration and Deployment

* Jenkins, CumulusCI, and CircleCI: CircleCI works great with Github
* They can run automated JavaScript and APEX tests
* They can deploy to whatever organization you want.

##### Finally... Other Tools

* Use Slack for integrated team communication.  Integrates well with Git and CircleCI, and many other tools
* GoToMeeting for important internet meetings,
* Gmail and Hangouts for company wide and person to person communication.

### The final word

Make the work you're doing today matter tomorrow.  Lean on JavaScript for your Salesforce development workflow, use TypeScript to modernize your JavaScript, and use Visual Studio Code to write your TypeScript.

It seems like there's a new JavaScript tool or library every week.  So I'm going to That story There is tremendous quantity and quality of options available for using JavaScript with Salesforce.  Interact with

Want to write a full-stack MEAN JavaScript app?  Do it with Salesforce, Heroku, & Heroku Connect.

### We're Agile at CodeScience

The process of development starts before the first bit of code is ever written.  Software development is a complicated process that involves merging abstract concepts contained in the individual minds of team members into a structure that provides value to everyone. Because of this complexity, software development is a time consuming and expensive process.  In order to minimize waste, we need to pay special attention to reducing effort and development time during our build process.

It's virtually impossible to build the right thing the first time.  There will inevitably be incorrect assumptions and miscommunications. To build software properly, we need to have good tools that allow us the flexibility to change our code quickly and easily.  We need to be able to properly debug an application.

### What is Modern?

Modern is minimalist.  Modern is clean.  Modern is now.
To be minimalist, we use fast text editors.  To have clean code, we use MVC.  To be now, we use JavaScript (Node, Angular)

### Design Before development can start

We have to first understand what we're trying to build before we start building it.  We do this through first establishing user personas.  We have to know who we're going to be building the application for in order to know what those users will need the application to do.

Establish the personas that will targeted with the MVP.

Proceed to build scenarios or use cases for each of the personas involved.  We do this so we can establish what the basic requirements are so each persona involved can derive value from the application.

We then proceed to wire-framing where the UX designer creates an initial walk-through of the application.  This allows the team to review a concrete idea to find where the issues are with the design.  We do this so we can figure out how our assumptions are wrong sooner.  It allows the team and product owner to review each aspect of the MVP and create a dialog about what features are missing or possible different ways to accomplish a certain task.

The modern workflow starts with development mockups in [Lucid Charts](https://www.lucidchart.com) or another wire-frame tool that can be easily shared amongst the team.

#### Telling Agile Stories

After we have a good idea about the structure of the application and the needs of the users, we start writing User Stories.  These short sentences, best captured on a Sticky Note, provide  tidbits of functionality that will provide some business value.  We structure our use stories to the business value is always included.

A good practice is to write these user stories directly into Github as issues.  These issues provide our backlog.  We can use Zenhub to organize our backlog into pipelines, sprints, etc...

#### Story Grooming

After we have a collection of user stories that can account for our personas walkthroughs, we begin to groom them, or add acceptance criteria to establish what a tester could do to prove that the user story is satisfied and the business value can be utilized.

#### Story Sizing

We then need to size the stories so we can properly do Sprint Planning.  We use story points to size each story based on it's estimated time, complexity, effort, etc... basically how long might it take to complete.

#### Prioritizing

Then product owner prioritizes the backlog to give an order of what business functionality is most important.  We do this so the team knows which items to pull into the sprint backlog first.

#### The Sprint backlog is built and the Sprint can begin

Once the team has established what features will be delivered during the first spring, the can begin the process of actually implementing the tasks that are requested.

All of the previous steps could all be done using [Lucid Charts](https://www.lucidchart.com), Github, and Zenhub.  Communication amongst the team and with build tools can be consolidated with Slack.

#### TDD and BDD

Once we have the user stories and acceptance criteria, we can establish what tests we will need to run.  These tests should be unit tests, or test a well factored bit of functionality, that should align with the acceptance criteria of the user story.

#### Implement the functionality

Now that we know what we need to build and we can test that it's not built yet, we can start to actually build the code that will drive business value.  It's may seem strange or wasteful to the client that nothing has actually been built until now, but as development is the most expensive and unpredictable part of the process, we need to reduce the risk of wasted time by building the wrong thing.

#### Build the code using a documented build process

#### Deploy the code using Continuous Integration
