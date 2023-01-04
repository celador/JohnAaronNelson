---
title: "My Arduino Journey - Part 1: Blink"
date: "2023-01-04T03:11:31.298Z"
layout: post
draft: true
path: "/my-arduino-journey/"
description: "Working through the Freenove tutorial for ESP32 boards"
tags:
  - "Arduino Blink ESP32 "
---

# The Journey begins

I actually started my journey long ago, in fits and starts.  This time, we will start again.  My typical advice for someone starting off learning how to program is: "Find a project you want to build, and find a way to make it happen; you'll learn what you need to know along the way.  It will be frustrating, but that's the journey."  Well, I've tried that a few times with Arduino stuff.  The thing that has stuck more than any has been a couple simple light strips.

Due to the limitations of the ESP8266 platform, and the negligible price difference, I decided to pick the ESP32 board as my platform of choice going forward.  It's the more Arduino compliant board anyhow.

## Day 1

So, day one will start with the classic Blink tutorial.

We open our iPad and go to the site to download the tutorial code.
I read through the intro, preface, and whatnot.  It's an ESP32 WRover board, by Espressif.  The tutorial says that Espressif actually created the ESP32 platform.  Not sure how acurate that is, but whatever.

Looking through the chapter list, I get a little excited that I'm going to do all these different tasks, ending with a web connected device.  I'm gonna use this shit to hack some Pipedream...  Anyways.. let's start.

We read through the tutorial, a lot of it is setting up your environment.  I decide to go ahead and use PlatformIO in VSCode instead of the Arduino IDE, I've wanted to use it properly for a while, and here's my chance.

I open the PlatformIO tab, go to projects, and create a new project.  I call it "Blink", pick my WRover Kit board, and Arduino, and try to create it.  It shows a carousel with some tips about project structure.  Cool..  I want to start... Why is this taking so long?  I see a note about being patient the first time because it has to download frameworks and stuff.  I keep waiting.  I get impatient and click outside the window.  It closes.  Great, I need to start all over.  I do the same thing, this time I walk away from the computer.  Eventually the modal is gone and I see a new project.

I see the project structure, go to main.cpp and start typing.  Magically Copilot already knows what I'm typing and finishes everything for me, just like the tutorial code.  Internet magic...

Anyways, I stumble around the PlatformIO sidebar until I finally find "Build" and "Upload".

...random computer stuff scrolling, looks like it's working...

It's blinking!!!

We're done!

## Debrief

Our breadboard works, our board works, we can read a tutorial, upload the code, and see it do the thing.  We used a resistor, LED, and two wires. Neat!
