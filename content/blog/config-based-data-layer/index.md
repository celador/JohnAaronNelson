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

## Introduction

[The Working Application](https://johnaaronnelson.com/config-based-data-layer)

This is a post about a little pattern I stumbled upon while doing some refactoring, a pattern that's changed how I write app code.

Much of what we do as web-app developers is repetitive.  Get some data and cache it, show some html based on some data, handle click events, repeat.  We use common tools, like `fetch`, Redux, and React.  It can get really repetitive, especially if you use common Redux and React patterns.

A typical React+Redux app will contain a bunch of files that define your actions, thunks, reducers, selectors, store, state, requests, responses, models, components, containers, views, routes, effects, epics, sagas, observables, subscriptions, et al.  Not to mention all the unit tests, integration tests, and end to end tests that go along to verify all that is working. All of those words are entire concepts unto themselves and have a history of years worth of threads, flame wars, tutorials, articles, and talks about them.  For a beginner, it can feel daunting to even approach the subject, much less write and maintain all the code to implement those concepts.

In practice, building React apps can often be quite boring.  Every component starts with `const Foo = () => {return <div>hello world</div>;}`; it's too trite to even make a snippet of.  Want to render some data?  Add a `useEffect` hook, use `useState` to change the page, [and draw the rest of the owl](https://buditanrim.co/img/post/2021/03/draw_owl.jpg). React is not really _that_ complicated, I promise.

On the other hand, I've often seen the effect/data layer implemented haphazardly. It feels to me as if the data layer of every app I've taken ownership of has been new each time and no one seems to agree.  So, here I am, proposing yet another way to make a data layer for your web app.  

> Configuration over Convention

Conventionally, you'd start an app with useEffect and useState.  Then, when things got more complicated than a handful of components, you'd add some state management.  Maybe you'll use vanilla [React Context](https://kentcdodds.com/blog/how-to-use-react-context-effectively) or [Unstated](https://github.com/jamiebuilds/unstated).  Maybe you like to be complicated and choose [vanilla Redux](https://redux.js.org/usage/configuring-your-store).  Then you'll notice that not everything you do is local to the app and synchronous.  So you might add [Redux Thunk](https://github.com/reduxjs/redux-thunk), [Redux Saga](https://redux-saga.js.org/), or even (for the very brave) [Redux Observable](https://redux-observable.js.org/).  Your code can start to balloon with terms and phrases you've never seen before, making you feel like you can't even understand your own code, much less have someone else understand it.  Add to all of that, [your app is so slow](https://reactrocket.com/post/react-redux-optimization/).  I thought I said it wasn't _that_ complicated?  

I think the word Configuration has gotten a bad wrap.  The term "Convention over Configuration" got to be really popular [about 15 years ago](https://trends.google.com/trends/explore?q=%2Fm%2F03c2qdk&date=all&geo=US) and is still du-jour for open source libraries.  Yet, configuration always creeps in. Your root folder eventually becomes littered with configuration files, regardless of how hard you try to stay in your lane.  I say embrace it.  Let's make our entire apps configuration instead of being conventionally built with code.

> So, what is a config based data layer, and how do I make it?

Let's start with what I mean by "the data layer".  People often use an "onion" as a metaphor for the architecture of an app, in that there are different "layers" to your application.  

## Some Code Examples

### TODO MVC

#### Bootstrapping

#### Create React App

#### CSS

#### API

### Key Bits

### Git

### Deploying
