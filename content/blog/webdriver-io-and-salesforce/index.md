---
title: Using Webdriver.io with JSForce, Mocha and Chai for fluent BDD on SFDC
date: "2016-01-16T06:52:00.000Z"
---
[*Companion Github repo with the code used in this post*](https://github.com/celador/webdriverio-intro)

First, what is Webdriver.io?  Webdriver.io is a NodeJS library for creating End-to-end tests using a Selenium server[^1].  There are a lot of Selenium libraries out there.  There are even a lot of JavaScript Selenium libraries out there.   Webdriver.io is a relative newcomer and is hardly most popular JavaScript Selenium testing library (but it's popularity is growing). So why Webdriver.io?  The simplest answer is the minimalistic Fluent/Promise based syntax, eliminating callback hell and making tests easier to read and write.

####The coffee shop
[Mocha](https://mochajs.org/#getting-started) is the most popular JavaScript BDD testing framework. People love it because of its modularity and extensibility.  But the best things about Mocha are the nice `describe('test', () => {})` and `it('should...', () => {})` functions and the abundance of documentation and tutorials.  

[Chai](http://chaijs.com/) is an assertion (micro)library whose primary purpose is to provide the `assert()` function. 

These three functions are the main functions we use for testing. But really, it doesn't matter so much what BDD and assertion libraries you pick, so use Mocha or don't... maybe use Karma+Jasmine or NightwatchJS...  

For a more in depth comparison of JavaScript e2e testing frameworks, check out [this blog post](http://watirmelon.com/2015/12/08/comparison-of-javascript-browser-automation-and-test-specification-libraries/) by [Alister Scott](http://watirmelon.com/about/)

#####What about mocks?
To get started with end to end testing, it's not really necessary to use a mocking library, but more advanced users will want mocks. For Salesforce mocks, we can use a combination of jsr-mocks,  faker.js, and json-server to mock our Salesforce api requests.  For non-Salesforce, [sinon.js](http://sinonjs.org/) works great with Mocha and Chai.  But if you're worried about this you probably already have your own opinions, so use what you're comfortable with.

####Install Webdriver.io
You should probably install webdriver globally.
```
$ npm install webdriverio -g
```
[Review the official install guide](http://webdriver.io/guide/getstarted/install.html)

####WDIO
WDIO is the test runner for webdriver.io.  It's kind of like Karma, but not.  
Lets figure out what it can do...
```
$ wdio --help
```
[Review the testrunner documentation](http://webdriver.io/guide/testrunner/gettingstarted.html)
 

#### Create the test
>We haven't written any code yet, just done a bunch of talking, so lets get to it.  

Whoa, hold on, wait a minute... Before we start writing tests, we need to tell webdriver a little bit about how we want to configure our tests.  To create the test file, run the config command.
```
$ wdio config
```
It will step you through a series of questions (about a dozen), after which it will spit out a `wdio.conf.js`, which is your config file. It's kind of like `npm init` or `bower init`, but not. 

> Let's write some code already!

During configuration, you defined the specs blob (path) to search when running tests.  So create a file in that path, maybe something like `./tests/main.spec.js`

Stick the following code at the top of your test file to include the dependencies.
```
var chai = require('chai'),
    assert = chai.assert,
    webdriverio = require('webdriverio'),
    remote = webdriverio.remote({ desiredCapabilities: { browserName: 'chrome' } });
```

####Login to Salesforce
Finally, we're doing something.
```
describe('Salesforce E2E', function () {

    this.timeout(30000);

    before(function () {
        return remote.init();
    });

    it('should login', login);

    after(function () {
        return remote.end();
    });

});

function login() {
    var username = '{Username}',
        password = '{Password}',
        loginUrl = 'https://login.salesforce.com';

    return remote.url(loginUrl)
        .setValue('#username', username)
        .setValue('#password', password)
        .click('#Login');
}

```

Notice the `before` and `after` functions.  These do the setup and teardown of our tests, basically opening and closing the browser, which is done with init() and end(). We then provide a test spec with the `it` function and run some code.  

######Async
Notice the return statements.  Since Webdriver.io is Promise based, we can simply return the Promise to the test spec.  The next test will run when this one has resolved.  To accomplish async without using Promises, we can use `done`.  We'd pass in the done callback to each spec function, then run the done function at the end of the tests, using `.call(done)`. Alternatively, use `.then(done)`, since it's a Promise.  It's a lot easier to just return the Promises, eliminating `.call(done)` and all the other places `done` would have to be used.   

####Run It
To run your test, simply use `$ wdio` or, alternatively `$ wdio wdio.config.js`, but we can leave off the name since we're using the default config name. Pretty nice eh?

######prereqs
* [Install the standalone Selenium Server](https://www.npmjs.com/package/selenium-standalone)
* Make sure your Selenium server is running
 * The command is `$ Selenium-Standalone start`

###Do something more, add some assertions
We started with nothing. Now we have automation, from just a little JavaScript.  We've got a great start.  Let's do a little more...
```
function login() {
    var username = '{username}',
        password = '{password}',
        loginUrl = 'https://login.salesforce.com';

    return remote.url(loginUrl)
        .getTitle((err, title) => {
            assert.strictEqual(title, 'Login | Salesforce');
        })
        .setValue('#username', username)
        .setValue('#password', password)
        .saveScreenshot('./errorShots/login.png')
        .click('#Login')
        .waitForVisible('#tsidButton', 10000) // The SF App Switcher
        .then(goToApp)
        .getTitle((err, title) => {
            assert.strictEqual(title, 'Awesome App');
        });
}

function goToApp() {
    return getRoot().then( root => remote.url(root + 'apex\/myApp'));
}

function getRoot() {
    return remote.getUrl().then(url => {
        var parts = url.split('//'); 
        var host = parts[0];
        var site = parts[1].split('/')[0];
        var root = `${host}\/\/${site}\/`;
        return root;
    })
}
```
You should get a failing test... which is good, because it means our assertions are working. Ohhh, pretty spec runner with a red error message!

Moving on... Since we're using Node, we can use ES6, hence the fluent syntax.  The code isn't very complicated.  The most complicated part is figuring out what the base url is for the app we're in.  Since Salesforce may move your application between domains, we must get the current url and use it as the basis for the root of our page url.   

Oh, and you might also have gotten an error about a missing errorShots directory.  Go ahead and add it, since that's where we'll put our snapshots.  I almost forgot!  You can take snapshots!  `:)` 

###Let's refactor this to use JSForce
We have a decent start.  We can see how easy it is to spin up a new test, pass in a url, fill out some textblocks, click a button, wait for an element, and use assertions to check for values.  But so far, we've only gotten a taste of the fluent syntax.  Let's use JSForce to establish our connection and see if we can trim this code a bit. 
```
var chai = require('chai'),
    assert = chai.assert,
    jsforce = require('jsforce'),
    conn = new jsforce.Connection(),
    webdriverio = require('webdriverio'),
    remote = webdriverio.remote({ desiredCapabilities: { browserName: 'chrome' } });

describe('Salesforce E2E', function () {

    this.timeout(30000);

    before(function () {
        return remote.init().then(login);
    });

    it('should make a new account', () => {
        return goToNewAccount().then(p => remote.debug());
    });

    after(function () {
        return remote.end();
    });

});

function login() {
    return conn.login(username, password)
        .then(userInfo => `${conn.instanceUrl}/secur/frontdoor.jsp?sid=${conn.accessToken}`)
        .then(url => remote.url(url));
}

function goToNewAccount() {
    return conn.describe("Account")
        .then(meta => meta.urls['uiNewRecord'])
        .then(url => remote.url(url));
}
```
I've included all the code here so you can see the new requires at the top (you should also `npm install --save-dev` these new dependencies).  

Checkout those lamdas! Woo Fluent...

Other highlights: we've refactored the login promise and moved it to the before function, so we're not testing the login functionality.  Take note of that login url, which allows you to login simply using an access token.  We're also using a describe to get the proper url for a new Account without having to open an application or find the right element to click. 

###Where's The BDD
Up until now, we've just logged in and gone to a page.  That's not a whole lot, but it's the foundation we need to do some BDD.

Lets imagine we're going to create a new App called DogTracker.  The app will be used by groomers and kennels to keep track of the dogs in their office. 

####Agile Time!
Let's write some user stories and acceptance criteria.

> As a dog groomer I want an application that I can use to keep track of the dogs in my office. Information should include `name`, `owner`, `weight`, `coloring`, `height`, `haircut style`, `special requests`, `other notes`, `discount`.  

AC 1: There's an application for Dog Groomers called DogTracker   

**Test:** Open DogTracker Application  
It Should go to the the homepage for a Dog Groomer
Login as User with Kennel Owner Profile
Verify that the Dogs tab/list is visible and selected.
Verify that the list contains the required fields

AC 2: The dog groomer can edit all fields.

**Test:** Create Dog record  
It should create a new Dog record
Go to the new Dog page
Verify the proper fields are present
Verify that the fields can be filled out
Verify that the form can be saved
Then Verify the new Dog is created.

> As a kennel owner, I want different page layouts when viewing information about dogs.  Information should include `diet`, `sleeping habits`, `toys provided` in addition to the groomer fields, but not `haircut style`.

AC 1: Kennel Owners can use DogTracker, with a default "Dogs" tab and list view with relevant fields.

**Test:** Open DogTracker Application  
It Should go to the homepage
Login as User with Kennel Owner Profile
Verify that the Dogs tab/list is visible and selected.
Verify that the list contains the required fields

AC 2: Kennel owner can edit fields

**Test:** Create Dog record  
It should create a new Dog record
Go to the new Dog page
Verify the proper fields are present
Verify that the fields can be filled out
Verify that the form can be saved
Then Verify the new Dog is created.

####The BDD Process
The BDD process is somewhat reliant on the Agile process of creating User Stories and Acceptance Criteria for those stories. Here we can apply the Red/Green refactor methodology to the BDD process.

######Make a failing test (Red)
 * Stub out our tests and assertions
 * Use the Arrange-Act-Assert structure
 * Assertions should fail

######Make the test pass (Green)
 * Use Declarative UI, APEX + VF code, or other web technologies to satisfy the client's AC.  
 * Assertions should pass

####Applying the BDD Process to SFDC
Let's stub out our tests.  Create a new file called dogGroomer.spec.js with the following code.
```
var chai = require('chai'),
    assert = chai.assert,
    webdriverio = require('webdriverio'),
    remote = webdriverio.remote({ desiredCapabilities: { browserName: 'chrome' } }),
    login = require('../../utils/login');

describe('Dog Groomer E2E', function () {

    this.timeout(30000);

    before(function () {
        return remote.init()
            .then(res => login(remote, username, password));
    });

    it('Should open the DogTracker Application', () => {
        return goToDogTracker();
    });

    after(function () {
        return remote.end();
    });

});

function goToDogTracker() {
    return Promise.reject('No Test Yet');
}
```

First thing to note is we factored out the login code to another file to make it more reusable.  If you run this, you should get a failing test.  Congrats, you're on your way to BDD success. 

Now, just to make it pass...
```
    it('Should open the DogTracker Application', () => {
        return goToDogTracker()
            .then(res => goToListView())
            .then(res => makeListViewAssertions());
    });
```
```
function goToListView(){
    // Click Go
    return remote
        .waitForExist('#tsidButton')
        .click('[name="go"]');
}

function makeListViewAssertions() {
    return Promise.all([
        remote.isExisting('[title="Dogs Tab - Selected"]'),
        remote.isExisting('[title="Dog Name"]'),
        remote.isExisting('[title="Height"]'),
        remote.isExisting('[title="Weight"]'),
        remote.isExisting('[title="Coloring"]'),
    ]).then(res => {
        assert(res[0], 'Dogs tab is not selected');
        assert(res[1], 'Name column doesn\'t exist');
        assert(res[2], 'Height column doesn\'t exist');
        assert(res[3], 'Weight column doesn\'t exist');
        assert(res[4], 'Coloring column doesn\'t exist');
    });
}
```

Easy eh?  The most difficult part was getting the selectors for the assertions .

######The second test
```
    it('Should create a new Dog', () => {
       return Promise.reject('No Test Yet'); 
    });
```
It fails.  Perfect! Now to make it pass. First, let's write some pseudo-code
```
    it('Should create a new Dog', () => {
        return goToEditPage()                   // Go to edit page
            .then(fillOutDogEditPageForGroomer) // Fill out page
            .then(makeCreatedDogAssertions);    // Assert dog was created
    });
```
And the completed functions...
```
function fillOutDogEditPageForGroomer(){
    return remote
        .setValue('input#Name', 'Fido').keys('Tab')
        .keys('John Nelson').keys('Tab')
        .keys('110').keys('Tab')
        .keys('Brindle').keys('Tab')
        .keys('23').keys('Tab')
        .keys('Standard').keys('Tab')
        .keys('Give him a mohawk').keys('Tab')
        .keys('Likes morning appointments').keys('Tab')
        .keys('10%').keys('Tab').keys('Enter');
}
function makeCreatedDogAssertions(){
    return Promise.all([
        remote.isExisting('.pbTitle .mainTitle'),
    ]).then(res => {
        assert(res[0], 'Dog not successfully created');
    });
}
```

I'll save the second ticket for you...
 
######Footnotes...
[^1]: As we learned in [Selenium](http://johnaaronnelson.com/2015/04/18/selenium/), there are many different ways to implement a Selenium server.  