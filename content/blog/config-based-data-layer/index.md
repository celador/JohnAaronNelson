---
title: "Config Based Data Layer"
date: "2021-10-11T14:10:44"
layout: post
draft: false
path: "/config-based-data-layer/"
description: "Conference notes"
tags:
  - "redux toolkit observable"
---

## Rationale

[The Working Application](https://johnaaronnelson.com/config-based-data-layer)

This is a post about a little pattern I stumbled upon while doing some refactoring, a pattern that's changed how I write React code.

Much of what we do as web-app developers is repetitive.  Get some data and cache it, show some html based on some data, handle click events, repeat.  We use common tools, like `fetch`, Redux, and React.  It can get really repetitive, especially if you use common Redux and React patterns.

A typical React+Redux app will contain a bunch of files that define your actions, thunks, reducers, selectors, store, state, requests, responses, models, components, containers, views, routes, effects, epics, sagas, observables, subscriptions, etc...  Not to mention all the unit tests, integration tests, and end to end tests that go along to verify that the functionality of all those bits of code remains consistent. All of those words are entire concepts unto themselves and have a history of years worth of threads, flame wars, tutorials, articles, and talks about them.  For a beginner, it can feel daunting to even approach the subject, much less write and maintain all the code to implement those concepts.

In practice, building React components can often be quite boring.  Components start simply: `const Foo = () => {return <div>hello world</div>;}`; it's too trite to even make a snippet of.  Bring in `useEffect` and `useState` to change the page, and [draw the rest of the owl](https://buditanrim.co/img/post/2021/03/draw_owl.jpg).

Conversely, there seems to be myriad ways to construct a data layer. In my experience, the data layer of every app I've worked on has been different each time. No one seems to agree. So, here I am, proposing yet another way to make a data layer for your web app.  


Conventionally, you'd start an app with useEffect and useState.  Then, when things got more complicated than a handful of components, you'd add some state management.  Maybe you'll use vanilla [React Context](https://kentcdodds.com/blog/how-to-use-react-context-effectively) or [Unstated](https://github.com/jamiebuilds/unstated).  Maybe you like to be complicated and choose [vanilla Redux](https://redux.js.org/usage/configuring-your-store).  You'll soon notice that not everything you do is synchronous, so you might add [Redux Thunk](https://github.com/reduxjs/redux-thunk), [Redux Saga](https://redux-saga.js.org/), or even (for the very brave) [Redux Observable](https://redux-observable.js.org/).  Your code can start to balloon with terms and phrases you've never seen before, making you feel like you can't even understand your own code, much less explain it to someone else.  Add to all of that, [your app is so slow](https://reactrocket.com/post/react-redux-optimization/).  React seems so complicated!

> Configuration over Convention

I think the word Configuration has gotten a bad wrap.  The term "Convention over Configuration" got to be really popular [about 15 years ago](https://trends.google.com/trends/explore?q=%2Fm%2F03c2qdk&date=all&geo=US) and is still du-jour for open source libraries.  Yet, configuration always creeps in. Your root folder eventually becomes littered with configuration files, regardless of how hard you try to stay in your lane.  I say embrace it.  Let's make our entire apps configuration instead of being conventionally built with code!

> So, what is a config based data layer, and how do I make it?

Let's start with what I mean by "the data layer", using an onion as a metaphor for the architecture of an app.  Onions have layers with distinct boundaries.  A common pattern is to keep API code, or data access code, together.  Above that, you may have some services, controllers, views, and components that all combine to make your app.  Keeping your code organized using layers helps to drive out circular dependencies and allows ["seams"](https://www.linkedin.com/pulse/find-seams-jens-pillgram-larsen) to emerge.

[Show Chalkboard Diagram Here]

The data layer is where all your API access code lives.  It is the class, module, folder, or set of files united by a common naming convention that abstracts away how you access the external world.  It is how you get data into and out of your application.  It can have many different names, and can be implemented using many different patterns, but it's job is really simple.  Call a method, optionally providing some JSON, and get some data in return.  

### Bootstrapping a TODO MVC app

We will create a TODO MVC clone to demonstrate the pattern in action.  We will use "Create React App" to bootstrap the application and [the canonical TODO MVC CSS](https://www.npmjs.com/package/todomvc-app-css) to style our app.  Finally, because this is a story about the data layer, we will implement a GET using an open API: [a list of public apis](https://api.publicapis.org/entries), as the starting point for our list of TODOs.

``` shell
yarn create react-app my-app --template typescript
yarn add todomvc-app-css
yarn add react-redux
yarn add react-router
```

### The Good Bits

Now, on to the good bits.  

### Wrapping it up

#### Deploy your app
