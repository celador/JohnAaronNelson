---
title: Building a Slider Lightning component
---
Due to the limitations introduced by the Lighting Locker Service, all the open source slider components I tried failed in some respect.  Yet again, I am reminded that Lightning that traditional JavaScript development techniques and libraries are rendered ineffective.  We must build Lightning components using the Lightning API if we are to have any confidence that our Lightning app will work.

Starting off, we have to take an inventory of the requirements we will have for this slider component.  We need pager buttons, a pagination, and the ability to slide/swipe a generic div with mouse or finger. It needs the ability to "autoplay" We will use CSS3 translates for the sliding animations and flexbox for the layout.