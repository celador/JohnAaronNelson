---
title: Introducing Generator-SFDC
date: "2016-02-13T22:58:27.215Z"
---
So my last post was all about understanding the fundamentals of Yeoman.  This post will be about the Generator-SFDC Yeoman generator that I created to apply my newly acquired knowledge. I did this to create an easy to use tool that could do more than create single files with dumb code I'd just have to delete.  

To start, go to to the [repo](https://github.com/celador/generator-sfdc) to get the latest and greatest code and directions on how to install the yeoman generator so you can follow along.

####Yeoman + Salesforce?

There are many other options for code templating and scaffolding for Salesforce, but these are the reasons I'm using Yeoman.  

>It's just Javascript

Using Javascript means code is easy to start and simple to write.  Yeoman accordingly uses NodeJS, which means we can use any of the 250,000+ packages available through NPM, not to mention packages from other repositories.

It's opinionated and feature complete.  While there may be other JavaScript scaffolding libraries, Yeoman has an established learning path with opinions.  It provides a recommended structure and thus provides a less mentally taxing starting point.  

There's an established and thriving community. Since Yeoman can utilize other Yeoman generators, we can leverage work the community has created and shared with us, allowing us to integrate complete features with little effort.

>Fantastic, I'm sold. Now what does it do?

###Goals for Generator-SFDC

* Scaffold Salesforce specific files including Apex Controllers and Triggers along with VisualForce Pages and Components.
* Scaffold SPAs for Angular, Angular2, React, and Ember.
* Generate the DAL (Data Access Layer) for an SObject, including Selector, Message, and Service classes.
* Create MavensMate project for ease of integration with Atom and Sublime Text.
* Create Visual Studio Code config information for integrating with the ForceCode extension.
* Ultimately, the guiding principle is to have a single project to generate any and all files needed to work with Salesforce utilizing existing Salesforce metadata to generate code.