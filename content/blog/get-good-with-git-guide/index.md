---
title: Get good with Git guide
date: "2015-04-19T01:27:00.000Z"
---
###What is Git?

The short answer.. a code versioning tool for hipster web dev.  

The long answer.. <a href="http://git-scm.com" target="_blank">Git</a> is a technology, created by Linus Torvalds, for versioning any kind of data, even pictures, but most often for application source code.  Git defines an interface, or contract, that can be implemented in <a href="http://en.wikipedia.org/wiki/Git_(software)" target="_blank">any language</a> and run on any kind of computer.  <a href="http://git-scm.com/downloads/guis" target="_blank">Many applications</a> are built to use it.  Git supports secure <a href="http://en.wikipedia.org/wiki/Open_standard">open</a> internet protocols such as <a href="http://en.wikipedia.org/wiki/Secure_Shell" target="_blank">ssh</a> and https.  It also has one of the most elegant models ever developed for allowing developers to manage the pain that can come with teams of developers working together.  Specifically, Git allows thousands of developers around the world to collaborate on the Linux kernel, which was, unsurprisingly, Git's original purpose. 

Technically speaking, Git uses a simple, cryptographically inspired branching tree object model. With [four simple objects](http://schacon.github.io/gitbook/1_the_git_object_model.html) (blob, tree, commit, and tag) we represent and store the code for millions of developers supporting trillions of dollars in software. It heavily uses checksums (SHA1) to  accomplish efficient storage of code.

Best practice is to use ssh via the <a href="http://en.wikipedia.org/wiki/Shell_(computing)#Text_.28CLI.29_shells" target="_blank">command line</a>, on whichever platform you choose, to securely interact with the Git server.  Get good with ssh from the <a href="http://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key" target="_blank">official resource</a>, <a href="https://help.github.com/articles/generating-ssh-keys/" target="_blank">Github</a> or <a href="https://confluence.atlassian.com/display/BITBUCKET/Set+up+SSH+for+Git" target="_blank">Bitbucket</a>.  If you're still having trouble, try importing your ssh key with an app like <a href="http://www.git-tower.com/learn/ebook/command-line/advanced-topics/ssh-public-keys" target="_blank">Tower</a>.  You should probably do the initial configuration below before attempting to setup ssh.

#####Other resources...

<a href="https://github.com/" target="_blank">Github</a> is the unofficial home of <a href="https://github.com/git/git" target="_blank">Git</a> on the internet. 

Probably the most useful resource available for learning Git is the open-source ebook <span style="text-decoration: underline;"><a href="http://git-scm.com/book/en/v2" target="_blank">Pro Git</a></span>.  You can download it to your pad of choice or read it online.  It is where most of the content here originates.

* [Think like a Git](http://think-like-a-git.net/sections/rebase-from-the-ground-up/a-helpful-mnemonic-for-git-rebase-arguments.html)
* [Git Cheat Sheet](https://github.com/ArslanBilal/Git-Cheat-Sheet/blob/master/pdf/git-cheat-sheet.pdf)
* <a href="http://nuclearsquid.com/writings/git-tricks-tips-workflows/">Tips and Tricks (2011)</a></li>
* <a href="http://www.git-tower.com/">Tower App</a>

<h3>Setup and config</h3>
Before you really get started, you should have a Github account, <a href="http://git-scm.com/book/en/v2/Getting-Started-Installing-Git">have Git installed</a> on your machine, and <a href="http://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup">configure it</a> for your account.

Git Config is an often overlooked command that should be run before using Git for any non-trivial work.  Setup your [merge/diff tool](http://www.kaleidoscopeapp.com) and your credentials, and other stuff in your config file.
<h3>Basic Commands</h3>
<h5>Clone</h5>
When you've found a repository you want to work with on your machine, copy it to your machine with the "git clone" command.  The following command will get the Git project from Github and copy it to your machine inside a new git folder from your current location.
<pre>&gt; git clone git@github.com:git/git.git</pre>
You now have every version of every file ever saved in the git project.  Yes, the entire Git project is now your machine.  Yes, the entire thing.  It lives inside a ".git" folder in the root of the repository folder.
<h5>Add</h5>
<pre>&gt; git add .</pre>
When you have changes to file(s) and you want to save those changes, you must add those changes to a staging area.  This is done so we can be selective about which files we want to save and send to the server.
<h5>Commit</h5>
Commit is like the save button.  When you commit your changes, you're telling git "save this version of this project."  When you commit you can always go back to that point.
<pre>&gt; git commit -m "My nice and detailed commit message."</pre>
Commit whenever you want to save your work.  When you commit your changes, you can get the exact state of any file in your project at the time of your commit.  It's like a snapshot of your project in time.  This is the core of what git means.  Your git index, or history, is simply a tree of commits.
<h5>Pull</h5>
`git pull origin master` will take the changes that are in your local copy of the master branch from the origin remote and attempt to apply them to your current branch.

`git merge origin/master` is usually what is preferred as it will do a `git fetch` and `git pull` in one go.  
<h5>Push</h5>
`git push` will push your changes to the remote branch that is currently assigned to the branch you are working with.

You will likely run into the issue of your branch not being published to the remote.  In that case, use `git push -u origin develop` will publish the current branch to the remote with a name of develop. You should probably not use develop though, use your current branch name to keep your local and remote branch names in sync.
    
<h3>Branching and Merging commands</h3>
<h5>Stash</h5>
If you have any changes doing `git stash` will put your changes on the stash stack. 

You can then do `git stash pop` to un-stash your changes, applying them to your current branch, and remove the stash from the stash stack.  

`git stash apply` is the safe version as it will keep the stash on the stash stack.  It might be handy to use this if you're doing an interactive rebase, you will keep a history of your current changes.

<h5><a href="https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase">Rebase</a></h5>

**Use Rebase with caution**

Rebase is useful when the another branch has acquired changes you want to implement in your current branch.  Rebasing attempts to replay your changes onto whatever commit, or label, you request.

Use `git rebase master` to move (or re-home) your current branch.  

Use `git rebase HEAD~2 -i` to do an interactive rebase on your own current branch.  Interactive rebasing allows you to completely rewrite your commit history, squashing commits together or rewording commit messages. Let's consider the following scenario: You branch from master, make a bunch of changes, test your code, and commit it because it looks good.  Five minutes later, you realize you have a bug in your code.  So you fix the bug and label the commit `fixup` to denote that this is a bug fix commit.  You can then do `git rebase HEAD~2 -i` to rewrite your history and make those two commits one, as they should have been.  You'll get into the rebase screen which will show you the commits you're working with and has instructions on what to do.  Keep in mind that `fixup` will simple merge two commits, using the first commit message as the new commit message.  `squash` allows you to merge two commits, and then reword the commit message.  Rebasing is commonly used on open source projects where the history is less important than the clean code.  In enterprise environments, rebasing is not used as much, because history is more important.  

This is one of the more complex and dangerous features of Git, as it allows one to rewrite history, and thus you can lose valuable information about code changes. If you do a rebase, which causes merge conflicts, and you don't merge the code perfectly, you may destroy your perfectly working code.  


<h5><a title="Merge" href="https://www.atlassian.com/git/tutorials/using-branches/git-merge">Merge</a></h5>
Merge will attempt to combine the contents of one branch into your working tree.  When you want to bring the changes from your feature into your master, or maybe a fix into your release branch, you do a merge.  You bring the changes from one into another.  If a linear history can be made, there is no merge conflict.  If there is a 3-way merge (most of the time) there is a high chance for merge conflicts.  If this happens, we use a merge tool, such as as <a href="http://www.kaleidoscopeapp.com">Kaleidoscope</a> ($$).   Set it up as your primary git merge tool, following the directions, and ask someone how to use it.  It's an incredible time and stress saver if used properly.
<pre>&gt; git checkout master
&gt; git merge feature/xx</pre>


<!--<h3>Roll your own Git server</h3>
Maybe you want to do it yourself for some crazy reason.  Just use Github.
<h3>The distributed workflow</h3>
Put stuff about Gitflow here.
<h3>Github.com in detail</h3>
Use Zenhub.  Use it as your project management tool.  Integrate it with Slack.
<h3>Advanced git</h3>
<h3>Automate and enforce standards</h3>
<h3>Internal Git Anatomy</h3> -->