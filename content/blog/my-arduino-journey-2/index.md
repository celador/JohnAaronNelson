---
title: "My Arduino Journey - Part 2: Button Click"
date: "2023-01-05T02:33:08.879Z"
layout: post
draft: true
path: "/my-arduino-journey-2/"
description: "Working through the Freenove tutorial for ESP32 boards"
tags:
  - "Arduino Blink ESP32 "
---

## Day 2

Lots of confidence going in to this today.  We nailed yesterday's sketch.  We read through the component list and see a button.  Awesome!  Something new! We start reading through the Component Knowledge section where it talks about the circuit inside the button.  Cool. I'm still a little confused about which way is up. I go through and build the circuit.  Push the button.  Nada.

GREAT!

I spend a while checking the circuit, trying ti figure out what's going wrong.  After I've taken everything off the board and put it back on, I realize, my resistor was one column off.  OOF.

We fix the circuit, and click the button.  Light!  Ok.  That's it?  hmm.  I thought there would be a little more... oh what's this.. section 2.2.

This is exactly the section I was thinking about when going through the first part.  We need to make the button a toggle instead of the thing that closes the circuit.  So we read through.. there's some debounce stuff...

Great. Let me type this in.. Shit doesn't work.  After 15 minutes of it not doing anything, I relent and attempt Copilot.  Garbage!  I go search google and see a couple promising posts.  One on Arduino.com, that looks promising.  I copypasta that shit... No dice!  AHHH!!

So I try another example, no dice.  So I go back to the official one, do some reading and realize they flipped the ports, they button the button on 2 and the led on 13.  The tutorial I'm using flipped that.  Dang.  So I change the port numbers.  Woo!  Working button!

## Debrief

We learned again that simple things aren't simple.  You can't trust code you get off the internet.  There's always debugging.  And, most importantly, I can do this.
