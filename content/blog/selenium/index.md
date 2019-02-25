---
title: Selenium
date: "2015-04-19T01:28:00.000Z"
---
<h5>What is it?</h5>
<a href="http://www.seleniumhq.org/">Selenium </a>is a web automation framework that provides a unified API for manipulating browsers. It can be interactively built with a <a href="http://www.seleniumhq.org/download/">Firefox plugin </a>(<a href="http://release.seleniumhq.org/selenium-ide/2.9.0/selenium-ide-2.9.0.xpi">v 2.9</a>), and also provides a rich architecture to code against using a variety of the most popular programming languages. Its practical purpose is it to replay actions in a browser in an interactive and code based manner and the most popular use is automated testing for web developers.  <a href="https://github.com/ariya/phantomjs">PhantomJS </a>is a very similar technology, running exclusively with <a href="http://phantomjs.org/">JavaScript in Webkit</a>, but we will be talking about Selenium here as it is a<a href="http://www.chrisle.me/2013/08/5-reasons-i-chose-selenium-over-phantomjs/"> broader technology</a>.

Selenium is a relatively mature web technology. Begun in 2004, it currently sits at version 2.45.  The technology has been implemented in many popular languages via "<a href="http://www.seleniumhq.org/download/">Bindings</a>".  Selenium allows us to control any browser, including headless browsers like <a href="http://htmlunit.sourceforge.net/">HtmlUnit</a>, using "<a href="https://sites.google.com/a/chromium.org/chromedriver/">Drivers</a>".  The promise of Selenium is we can write once and test everywhere.  Selenium uses your language of choice on a computer of your choice and communicates with the browser of your choice.  Selenium also includes incredibly good logging so detailed notes about our tests are kept for us.
<h5>Why do we need it?</h5>
<a href="http://en.wikipedia.org/wiki/Regression_testing">Regression </a>hurts.  We don't want to break what we've already built.  The real test of any application is not in the beauty of the code, but that the app works as requested.  We must automate our manual tests so we can get visibility into whether our app works or not. Applications often break in frustratingly simple ways during optimization.  This technology should allow us to break that pattern by making it easier to test.
<h5>Lets get started!</h5>
The Selenium IDE is the easiest way to get started with writing Selenium tests. The IDE is a Firefox plugin, functionally similar to a macro recorder, recording our actions using browser events converted to Selenium commands. The IDE is started by pressing the Ctrl+Shift+S buttons.  Now, everything done in the browser will be recorded for playback.

When Selenium opens, we see the command table. The command table allows us to see the recorded commands.  When an event in the browser fires, it will show up in the table.  The source code bound to this table can be seen by clicking the source tab.  In the source tab, we see <a href="http://www.seleniumhq.org/docs/02_selenium_ide.jsp#selenium-commands-selenese">Selenese,</a> the source language for Selenium tests.  Documentation for Selenese is built into the IDE and displays when a command is clicked.  Double clicking a command will execute it in the browser.
<h5>Understanding Selenium</h5>
Selenese statements are made up of commands, locators, and values.  Commands are the actions to take, <a href="https://thenewcircle.com/static/bookshelf/selenium_tutorial/locators.html">Locators</a> (selectors) allow us to select a DOM element for evaluation. Values allow us to set and check values of the selected element.  It is a simple, yet powerful language and syntax.

The testing part of Selenium is primarily achieved with assert and verify. <a href="http://stackoverflow.com/questions/5743848/assert-vs-verify-in-selenium">Assert and verify</a> allow us to make a test fail. Failing is good, it allows us to test. These commands, and others, can be found in the context (right-click) menu of the IDE.

Moving on to code based automation; using Visual Studio 2013 to write a console application to automate Firefox. The first thing to do after creating the console application is to use Nuget to bring in the Selenium WebDriver package.  A simple sample...
<pre style="color: #5bd1be;"><span style="color: #67adde;">class </span>Program    {
 <span style="color: #67adde;">  static</span> <span style="color: #67adde;">void</span> Main(<span style="color: #67adde;">string</span>[] args)        {
 <span style="color: #c4ddb2;">    IWebDriver</span> driver <span style="color: #c1c1c1;">=</span> <span style="color: #67adde;">new</span> <span style="color: #5bd1be;">FirefoxDriver</span>();
     driver<span style="color: #c1c1c1;">.</span>Url <span style="color: #c1c1c1;">=</span> <span style="color: #dfad97;">"http://www.google.com"</span>;
 <span style="color: #67adde;">    var</span> searchBox <span style="color: #c1c1c1;">=</span> driver<span style="color: #c1c1c1;">.</span>FindElement(<span style="color: #5bd1be;">By</span><span style="color: #c1c1c1;">.</span>Name(<span style="color: #dfad97;">"q"</span>));
     searchBox<span style="color: #c1c1c1;">.</span>SendKeys(<span style="color: #dfad97;">"Hello World"</span>);
     driver<span style="color: #c1c1c1;">.</span>Manage()<span style="color: #c1c1c1;">.</span>Timeouts()<span style="color: #c1c1c1;">.</span>ImplicitlyWait(<span style="color: #5bd1be;">TimeSpan</span><span style="color: #c1c1c1;">.</span>FromSeconds(<span style="color: #c1d6b7;">5</span>));
 <span style="color: #67adde;">    var</span> imageLinks <span style="color: #c1c1c1;">=</span> driver<span style="color: #c1c1c1;">.</span>FindElements(<span style="color: #5bd1be;">By</span><span style="color: #c1c1c1;">.</span>LinkText(<span style="color: #dfad97;">"Images"</span>));
 <span style="color: #c4ddb2;">    IWebElement</span> imageMenuItem <span style="color: #c1c1c1;">=</span> imageLinks<span style="color: #c1c1c1;">.</span>First();
     imageMenuItem<span style="color: #c1c1c1;">.</span>Click();
 <span style="color: #67adde;">    var</span><span style="color: #e3e3e3;"> images </span><span style="color: #c1c1c1;">=</span><span style="color: #e3e3e3;"> driver</span><span style="color: #c1c1c1;">.</span><span style="color: #e3e3e3;">FindElements(</span><span style="color: #5bd1be;">By</span><span style="color: #c1c1c1;">.</span><span style="color: #e3e3e3;">CssSelector(</span>"div.rg_el:nth-child(1) &gt; a:nth-child(1) &gt; img:nth-child(1)"<span style="color: #e3e3e3;">));
 </span><span style="color: #67adde;">    var</span> image <span style="color: #c1c1c1;">=</span> images<span style="color: #c1c1c1;">.</span>First();
     image<span style="color: #c1c1c1;">.</span>Click();
   }
 }</pre>
<h5>Moving on to more advanced stuff...</h5>
Add the "Selenium Webdriver Support Classes" from Nuget to enhance element selection abilities, using "new SelectElement(FindElement(By...))".  Alternatively, use firebug to select the xpath and use the built-in "FindElement(By.XPath(""))".  Alternatively Firefox has a "Copy unique selector" option.

Every time we select an element, Selenium waits using an implicit wait, it polls the DOM every half a second.  As a result of different factors, we may run into selector issues due to an element not being available.  An alternative is "Explicit Waits", using the support classes referenced above.
<pre><span style="color: #e3e3e3;">WebDriverWait wait </span><span style="color: #c1c1c1;">= </span><span style="color: #67adde;">new</span><span style="color: #e3e3e3;"> WebDriverWait(driver, TimeSpan</span><span style="color: #c1c1c1;">.</span><span style="color: #e3e3e3;">FromSeconds(</span><span style="color: #c1d6b7;">5</span><span style="color: #e3e3e3;">));
wait</span><span style="color: #c1c1c1;">.</span><span style="color: #e3e3e3;">Until(e </span><span style="color: #c1c1c1;">=&gt;</span><span style="color: #e3e3e3;"> {
</span><span style="color: #67adde;">var</span><span style="color: #e3e3e3;"> elements </span><span style="color: #c1c1c1;">=</span><span style="color: #e3e3e3;"> driver</span><span style="color: #c1c1c1;">.</span><span style="color: #e3e3e3;">FindElements(By</span><span style="color: #c1c1c1;">.</span><span style="color: #e3e3e3;">ClassName(</span><span style="color: #dfad97;">"qs"</span><span style="color: #e3e3e3;">));
</span>  <span style="color: #67adde;">if</span> (elements<span style="color: #c1c1c1;">.</span>Count <span style="color: #c1c1c1;">&gt;</span> <span style="color: #c1d6b7;">0</span>) {
    <span style="color: #67adde;">return</span> elements[<span style="color: #c1d6b7;">0</span>];
  }
  <span style="color: #67adde;">return</span> <span style="color: #67adde;">null</span>;
});</pre>
<h5>Selenium Server</h5>
Selenium runs in three modes: local, server, and grid. <a href="http://www.seleniumhq.org/docs/03_webdriver.jsp#running-standalone-selenium-server-for-use-with-remotedrivers">Selenium Server</a> operates via HTTP. Its big win is cross-platform testing. The only practical difference is that when we instantiate our IWebDriver we use "RemoteDriver" and give it the server address, optionally specify browser expectations. The Java server provides a remote interface to the same WebDriver drivers as when run locally.  The servers are configured with JSON.

To start the server, Java (JRE) must be installed be in the PATH to run the server.  Browse to the folder containing the Selenium JAR file. Insure Java works by typing "Java" in the terminal. Then execute the JAR.
<pre>$ java -jar selenium-standalone-2.45.0.jar -port 44</pre>
The web server will start at localhost:44/wd/hub.  The default port is 4444.

<a href="http://www.seleniumhq.org/docs/07_selenium_grid.jsp">Grid mode</a> is an alternate server mode which turns the server into a hub (orchestrator).  The hub will communicate with and delegate tests to other servers automagically with JSON.  Grid mode is useful for distribution of resource requirements and running tests under different environments, like Mac or Linux.

To start the server as a hub, run
<pre>$ java -jar selenium-standalone-2.45.0.jar -role hub -port 4444</pre>
The hub server will start at localhost:4444/grid/console. If you browse to the address you will get configuration settings of the hub. This is also where you will see the log

To start the server as a node, run
<pre>$ java -jar selenium-standalone-2.45.0.jar -role node -hub http://localhost:4444/grid/register</pre>
The node server will start at localhost:5555

The grid command is exactly the same as when executing against a regular server, but the hub will delegate the test to another server, depending on requirements and capabilities.  For detailed setups, configuration settings are your friend.  Saucelabs can provide a Selenium grid in the cloud, for a price.