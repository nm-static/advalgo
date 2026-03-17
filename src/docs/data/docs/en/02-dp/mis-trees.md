---
title: "5. Maximum Independent Set on Trees"
description: "5. Maximum Independent Set on Trees - Advanced Algorithms"
section: main
sidebar:
  order: 5
  label: "5. Maximum Independent Set on Trees"
---


<div class="callout callout-note">
<div class="callout-title">Acknowledgements</div>
<div class="callout-body">

Some of this material is borrowed from [Jeff Erickson](http://jeffe.cs.illinois.edu/)'s chapters on [Recursion](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf), [Backtracking](http://jeffe.cs.illinois.edu/teaching/algorithms/book/02-backtracking.pdf), and [Dynamic Programming](http://jeffe.cs.illinois.edu/teaching/algorithms/book/03-dynprog.pdf). The fun factor at a party formulation can be found in an exercise of Erickson as well as [these slides](https://www.mpi-inf.mpg.de/fileadmin/inf/d1/teaching/summer20/paraalg/Lectures/lecture_7.pdf) by [Dàniel Marx](https://cispa.de/en/people/c01dama). Thanks to Arya for pointing out a correction.

</div>
</div>

### The Problem

You are planning a corporate party. Every employee $e$ has an amount $f(e) \geqslant 0$ of fun that they will bring to the party if invited. The total fun in the party is the sum of $f(e)$ over all invited employees $e$. You want your party to be very fun. In fact, as fun as possible. However, it turns out that if you invite a manager and their direct report together, the party will be absolutely no fun, not for anyone. What's the best you can do?

Concretely, the problem is the following.

- We are given a graph $G = (V,E)$ that is a rooted tree on $n$ vertices with a weight function $w: V \longrightarrow \mathbb{N}$ and root $r$.
- We want to output the weight of a max-weight independent set in $G$.

### The Solution

<details class="callout callout-tip">
<summary class="callout-title">What are the fragments (AKA, what do we want to store)?</summary>
<div class="callout-body">

For $v \in V$, let $T[v]$ denote the weight of a max-weight independent set in $G_v$, which is the subtree of $G$ rooted at $v$.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Are the fragments going to be useful (AKA, where is the final answer)?</summary>
<div class="callout-body">

Indeed, $T[r]$ is what we want!

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Do we have a kickstart (AKA, what are the base cases)?</summary>
<div class="callout-body">

If $v$ is a leaf node, then $T[v] = w(v)$.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">How do the fragments come together (AKA, how do we compute the values that we have agreed to store)?</summary>
<div class="callout-body">

For the sake of analysis, fix a max-weight independent set $S$ of $G_v$. We have to wonder: does $S$ contain $v$?

- If the answer is **no**, then $S$ can be viewed as a union of optimal solutions in all the subtrees rooted at the children of $v$.
- If the answer is **yes**, then $S$ can be viewed as a union of optimal solutions in all the subtrees rooted at the grandchildren of $v$ (since the children are now forbidden), and the vertex $v$ itself.

As always, we take the best of both worlds when we pen down our recurrence:

$$\operatorname{T}(v)=\max \left(\sum_{w \downarrow v} \operatorname{T}(w),\ w(v)+\sum_{w \downarrow v} \sum_{x \downarrow w} \operatorname{T}(x)\right),$$

where the notation $w \downarrow v$ means "$w$ is a child of $v$".

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Can we put the pieces together without getting stuck (AKA, are the dependencies in step #4 acyclic)?</summary>
<div class="callout-body">

Proceed from the leaves of the tree upwards.

</div>
</details>

