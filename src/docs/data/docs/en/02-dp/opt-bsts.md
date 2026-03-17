---
title: "4. Optimal BSTs"
description: "4. Optimal BSTs - Advanced Algorithms"
section: main
sidebar:
  order: 4
  label: "4. Optimal BSTs"
---


<div class="callout callout-note">
<div class="callout-title">Acknowledgements</div>
<div class="callout-body">

Some of this material is borrowed from [Jeff Erickson](http://jeffe.cs.illinois.edu/)'s chapters on [Recursion](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf), [Backtracking](http://jeffe.cs.illinois.edu/teaching/algorithms/book/02-backtracking.pdf), and [Dynamic Programming](http://jeffe.cs.illinois.edu/teaching/algorithms/book/03-dynprog.pdf). Check them out for a more detailed comparison between recursive and memoized implementations.

</div>
</div>

### The Problem

- The input is a sorted array $A[1, \ldots, n]$ of search keys and an array $f[1, \ldots, n]$ of frequency counts, where $f[i]$ is the number of times we will search for $A[i]$.
- Our task is to construct a binary search tree for that set such that the total cost of all the searches is as small as possible, where the cost of a search for a key is the number of ancestors[^1] that the key has multiplied by its frequency.

This can be thought of as a non-linear version of the file storage problem. Food for thought: will a greedy strategy (insert in descending order of frequencies of access) work?

Heads up: Note that the optimal solution may not be balanced at all.

### The Solution

This section is coming soon.

<details class="callout callout-tip">
<summary class="callout-title">What are the fragments (AKA, what do we want to store)?</summary>
<div class="callout-body">

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Are the fragments going to be useful (AKA, where is the final answer)?</summary>
<div class="callout-body">

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Do we have a kickstart (AKA, what are the base cases)?</summary>
<div class="callout-body">

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">How do the fragments come together (AKA, how do we compute the values that we have agreed to store)?</summary>
<div class="callout-body">

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Can we put the pieces together without getting stuck (AKA, are the dependencies in step #4 acyclic)?</summary>
<div class="callout-body">

</div>
</details>

[^1]: The root is the only ancestor of itself, so the cost of access is just one.
