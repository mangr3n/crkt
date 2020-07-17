###Time
* Change == Time
* ~~Change~~ == ~~Time~~

In the origins of computing single processor and a single addressable memory space, there is effectively a single 
source of truth, and a single source of change to that truth.
However, we now have processors with multiple cores; we have computers with multiple processors.  We have programs with 
multiple threads. We have paged and virtual memory, we have processes with their own memory spaces.  

Givens of the Modern Computing Landscape
* There is no single source of truth.
* There is no single source of change.

So let's look back at the human.  We act and speak as if there is one "real" reality that we all interact with.  But 
though that appears to be true, it's actually a inference, not a fact.  We assume it's true, and it's a useful and 
seemingly valid assumption, but it's not someething experienced first hand.  We actually interact with the model of 
reality in our heads.  For all intents and purposes, the model in my head is indistinguishable from reality.  
In fact, one might say that it is in fact reality.  I cannot jump across the boundary and experience reality directly.  
I can only experience my internal representation of reality. 

Back to the computer.  State is a representation of "reality".  Again, for all intents and purposes, 
as far as your program is concerned the state accessible to your program is the entirety of the universe.  We know from 
experience that sharing state is difficult.  It amplifies complexity by an order of magnitude.  So we want to limit, or 
eliminate shared state.

Crkt is an attempt to isolate components into miniature models of reality that are self-contained, and I do mean 
miniature.  As far as any component is concerned.  Time starts when a signal(data value) appears on an input port, and 
ends when the processing of that signal terminates inside the component.  Before "time ends" the component may, mutate 
internal persistent state, transform data, and it may expose a signal (data value) to the outside world.  For practical 
purposes, it may also interact with artifacts of the programming runtime (browser, server, network) that are not 
actually **Crkt** components.  We call these  side effects.  

If we model the world this way, we now have a way to reconstitute a shared reality, by appointing a single component to 
manage that shared reality.  It becomes the source of truth for that shared reality.  But we stop acting as if it's **THE**
truth, and recognize that it is a shared model of reality that is rhetorically constructed and has a set of transactional
and contractual semantics around it's evolution.  Every program we have worked on that had multiple processes, 
or threads, or had multiple users, and stored mutating state was evolving a shared reality, that was rhetorically 
constructed and that had contractual and transactional semantics around it's evolution.  But we've been fighting to act
as if we are back in that single source of truth, single agent of change world, when it's no longer the reality we live 
in computationally.

In **Crkt** we will be rebuilding these views of the world, and working to reconstitute various patterns of sharing reality.
At it's core, we send signals, and mutate our internal state.  We will rebuild a pattern of use that models traditional
client-server semantics with a transactional database.  But we will also build systems that allow reality to branch, and resolve.
we will build systems that branch and don't resolve.  We will build systems that support multiple components having a 
different experience of the sequence of events in the system.
