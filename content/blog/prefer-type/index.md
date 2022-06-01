---
title: "Prefer type over interface"
date: "2022-06-01T19:33:20Z"
layout: post
draft: false
path: "/prefer-type/"
description: "Prefer Type over Interface"
tags:
  - "Typescript"
---

# Don't jump to conclusions

Head on over to [https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections](The official Typescript Wiki) and the first thing you'll read is that you should prefer `interface` over `type`.
Look at the section heading and you'll see it says "Writing Easy-to-Compile Code". 
Look at the top of the page and you'll see it says "Read carefully before you jump to conclusions on this page!"
Read carefully indeed.

# Different conclusions

In my 8 years of writing Typescript code, I've come to the conclusion that you should pretty much never user `interface`.
Actually, you should avoid it like the plague.
I must be crazy.  
How can I advocate so strongly for a position so obviously against official wisdom?

## Why to use `interface`.  

Interfaces have a long history in the programming world and exist in almost every OO language.  
The "I" in SOLID is all about how great interfaces are.  
Wisdom states you should think of your application as a combination of interfaces rather than classes or methods.
Interfaces are great when you want to create a class that implements some combination of different signatures. 
Interfaces are great when you're looking through a debugger and you can see the name of the instance.
But most importantly: they speed up the compiler, after all, this advice is under the "Writing Easy-to-Compile Code" section
Oh goodie.  
I feel so warm and fuzzy inside knowing my code is structured for optimal compilation!

## Why interfaces in Typescript are a footgun

Interfaces are great to use when creating classes.  
I hate classes.  
Why must people hate on classes?  
Hasn't Object Oriented code proven to be the kind of development paradigms over the last 40+ years? 

One of the major discoveries the React team did during their decade plus of development is the people in general hate classes.
First, they're way more confusing than functions.  
Why do we need a constructor, and call super.  
Why are there things like `static` and `abstract`?

> Well, dear noob, there are many reasons.  
You are obviously too ignorant to understand why these things exist.  
Go back to your kiddie pool and let the big kids do the real work

Poppycock.  Programming is for everyone.  The simpler the code, the better the code.  
Code is written for people first.
If the choice is me or the compiler, I pick me, every day of the week.  
Maybe it would matter if you're working on a codebase that is millions of lines long.  
But in that case, you probably have more important things to worry about.  
Like, should you find a different job.

I'll admit, there are some cases where having a `class` is a nice thing.  
Your domain model would be a good example here.  
Sometimes it's nice to have a `Car` instead of a `{ drive: () => void; honk: () => ...}`
So then there are good examples of using `class` and obviously `interface` must be better sometimes, right?
Gotcha! 

No. 
Even your domain model shouldn't really be a `class`. 
Your model should be a POCO, for the same reasons that classes suck.  
Make a class and your immediately tempted to subclass it, extract an interface, etc... 
OO is so much ceremony, so much distraction, so much unnecessary BS.

Ignore all that crap.  Declare a shape to be a type, and use that type 

Even if you want to user a class, you can still use `implements` with a type.  

Union and Intersection types in Typescript are amazingly effective at getting across the exact relationship between the subtypes and effectively create an anonymous base type.
It's just as easy to create a named base `type` as it is to create a base interface, and then extend that interface in your other interfaces. 
When creating a base type and then extending that type in the subtypes, you have to modify both interfaces to establish the relationship.  
With `type` you just establish the relationship
Types are amazingly composable.  Using boolean logic, you can express your type tree.

Types are able to made "ambient" where they live in a `*.d.ts` file and simply used whereever they're needed.  
When you don't have to export and import the interface everywhere you want to use it (probably a lot of places) it becomes much easier to use types, and type your code.
It's amazingly delightful when I'm writing code, I see a variable name, I give it a type, and see the syntax validate... I don't have to do anything else.
No checking what path the file lives at, making sure you get the relative path right, sorting the imports right... so much unneeded BS is removed by using ambient types.

There are so many signals pointing us to use `type`
Type is the fundamental thing that makes Typescript great, even if it's not intended to be.  

Pure functions rock.
They're easily testable.
They're easier to grok.
They're easier to use, because you can refactor them to their fundamental component, thus easier to refactor/move/rename/export/import/etc... 
They're composable.
You get to use awesome functional libraries like Ramda or Lodash. 
Pure functions are so good.

The only good reason at all to use interface over type, is that it's easier on the compiler.
There are many reasons to hate interface and love type.  
For those reasons, you should always prefer type over interface.  

When I see `interface` used regularly in a codebase, I immediately get scared the author hasn't had *that* much experience with TS, and things might get gnarly.
They should have learned all of those lessons years ago.

