---
title: "2. Subset Sum"
description: "2. Subset Sum - Advanced Algorithms"
section: main
sidebar:
  order: 2
  label: "2. Subset Sum"
---


<div class="callout callout-note">
<div class="callout-title">Acknowledgements</div>
<div class="callout-body">

Some of this material is borrowed from [Jeff Erickson](http://jeffe.cs.illinois.edu/)'s chapters on [Recursion](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf), [Backtracking](http://jeffe.cs.illinois.edu/teaching/algorithms/book/02-backtracking.pdf), and [Dynamic Programming](http://jeffe.cs.illinois.edu/teaching/algorithms/book/03-dynprog.pdf). Check them out for a more detailed comparison between recursive and memoized implementations.

</div>
</div>

### The Problem

- The Subset Sum problem takes as input an array $X$ of $n$ positive integers and a target $Y > 0$.
- The output is `YES` if there is a subset of the array $X[1 .. n]$ that sums to $Y$, and `NO` otherwise.

### The Solution

<details class="callout callout-tip">
<summary class="callout-title">What are the fragments (AKA, what do we want to store)?</summary>
<div class="callout-body">

Let us try to project this problem on a prefix of the input array and a generic target.

For $1 \leq i \leq n$ and $1 \leq j \leq Y$, let:

$T[i,j] = $ TRUE if some subset of $X[1,\ldots,i]$ sums to $j$, and FALSE otherwise.

The $T$-values are our fragments.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Are the fragments going to be useful (AKA, where is the final answer)?</summary>
<div class="callout-body">

Indeed, when the projection covers the original input, we are done! So the answer we are looking for is the value of $T[n,Y]$.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Do we have a kickstart (AKA, what are the base cases)?</summary>
<div class="callout-body">

Note that $T[1,j]$ is TRUE if and only if $X[1] = j$.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">How do the fragments come together (AKA, how do we compute the values that we have agreed to store)?</summary>
<div class="callout-body">

**If $A[i] > j$:** then $T[i,j]$ is TRUE if and only if $T[i-1,j]$ is TRUE. Indeed, $A[i]$ cannot participate in any solution here, since the array $X$ only has positive integers, so we piggy back on whether a sum of $j$ can be obtained from $X[1,\ldots,i-1]$.

**If $A[i] = j$:** return TRUE already --- we have a solution comprising just $A[i]$.

**Otherwise:** $T[i,j]$ is TRUE if and only if $(T[i-1,j-A[i]] \lor T[i-1,j])$ is TRUE. Here, we take the best of both worlds by speculating on whether $A[i]$ contributes to the solution or not. If it does, we update the target to $j - A[i]$ --- and notice that this is a legitimate index since $j > A[i]$. If it does not, we fall back entirely on $A[1,\ldots,i-1]$.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Can we put the pieces together without getting stuck (AKA, are the dependencies in step #4 acyclic)?</summary>
<div class="callout-body">

It is straightforward to check that these dependencies are indeed acyclic.

</div>
</details>

