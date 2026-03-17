---
title: "3. Set Cover"
description: "3. Set Cover - Advanced Algorithms"
section: main
sidebar:
  order: 3
  label: "3. Set Cover"
---


<div class="callout callout-note">
<div class="callout-title">Acknowledgements</div>
<div class="callout-body">

Some of this material is borrowed from [Jeff Erickson](http://jeffe.cs.illinois.edu/)'s chapters on [Recursion](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf), [Backtracking](http://jeffe.cs.illinois.edu/teaching/algorithms/book/02-backtracking.pdf), and [Dynamic Programming](http://jeffe.cs.illinois.edu/teaching/algorithms/book/03-dynprog.pdf).

</div>
</div>

### The Problem

Let $\mathcal{F}$ be a family of sets over a universe $U$. For a subfamily $\mathcal{F}^{\prime} \subseteq \mathcal{F}$ and a subset $U^{\prime} \subseteq U$, we say that $\mathcal{F}^{\prime}$ covers $U^{\prime}$ if every element of $U^{\prime}$ belongs to some set of $\mathcal{F}^{\prime}$.

The Set Cover problem is the following:

- The input is a family of sets $\mathcal{F}$ over a universe $U$ and a positive integer $k$.
- The task is to check whether there exists a subfamily $\mathcal{F}^{\prime} \subseteq \mathcal{F}$ of size at most $k$ such that $\mathcal{F}^{\prime}$ covers $U$.

We describe here an algorithm for Set Cover that runs in time $2^{|U|}(|U|+|\mathcal{F}|)^{\mathcal{O}(1)}$. In fact, this algorithm does not use the value of $k$, and finds the minimum possible cardinality of a family $\mathcal{F}^{\prime} \subseteq \mathcal{F}$ that covers $U$.

### The Solution

<details class="callout callout-tip">
<summary class="callout-title">What are the fragments (AKA, what do we want to store)?</summary>
<div class="callout-body">

Let us try projection again. Fix a subset $X \subseteq U$ and an integer $0 \leqslant j \leqslant |\mathcal{F}|$.

Define $T[X, j]$ as the minimum possible size of a subset $\mathcal{F}^{\prime} \subseteq\left\{F_1, F_2, \ldots, F_j\right\}$ that covers $X$.

The $T$'s will be our fragments.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Are the fragments going to be useful (AKA, where is the final answer)?</summary>
<div class="callout-body">

By definition, $T[U,m]$, where $m := |\mathcal{F}|$.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Do we have a kickstart (AKA, what are the base cases)?</summary>
<div class="callout-body">

Observe that $T[\emptyset, 0]=0$ while $T[X, 0]=+\infty$ for $X \neq \emptyset$.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">How do the fragments come together (AKA, how do we compute the values that we have agreed to store)?</summary>
<div class="callout-body">

Let $X \subseteq U$ and $0<j \leq|\mathcal{F}|$. We have that:

$$T[X, j]=\min \left(T[X, j-1],\ 1+T\left[X \backslash F_j, j-1\right]\right),$$

depending on whether we decide to include $F_j$ in our solution or not. If we do, we adjust the set of elements that need to be covered, and if we don't, we push the full responsibility of covering $X$ to the smaller subfamily. As usual, we pick the best of both worlds.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Can we put the pieces together without getting stuck (AKA, are the dependencies in step #4 acyclic)?</summary>
<div class="callout-body">

The entries can be computed by processing sets of smaller sizes before larger ones, and for sets of the same size, processing smaller indices before larger ones.

</div>
</details>

### Analysis of Running Time

By using the recurrence, we compute all values $T[X, j]$ for $X \subseteq U$ and $0 \leqslant j \leqslant |\mathcal{F}|$. The running time is therefore $2^{|U|}(|U|+|\mathcal{F}|)^{\mathcal{O}(1)}$.

### Proof of Correctness

<details class="callout callout-tip">
<summary class="callout-title">Correctness of the DP</summary>
<div class="callout-body">

**Theorem.** Given a SET COVER instance $(U, \mathcal{F}, k)$, the minimum possible size of a subfamily $\mathcal{F}^{\prime} \subseteq \mathcal{F}$ that covers $U$ can be found in time $2^{|U|}(|U|+|\mathcal{F}|)^{\mathcal{O}(1)}$.

_Proof._ Let $\mathcal{F}=\left\{F_1, F_2, \ldots, F_{|\mathcal{F}|}\right\}$. We prove the correctness of the recurrence by showing inequalities in both directions.

In one direction, let $\mathcal{F}^{\prime} \subseteq\left\{F_1, F_2, \ldots, F_j\right\}$ be a family of minimum size that covers $X$. We distinguish two cases. If $F_j \notin \mathcal{F}^{\prime}$, then $\mathcal{F}^{\prime}$ is also a valid candidate for the entry $T[X, j-1]$. If $F_j \in \mathcal{F}^{\prime}$, then $\mathcal{F}^{\prime} \backslash\left\{F_j\right\}$ is a valid candidate for the entry $T\left[X \backslash F_j, j-1\right]$.

In the other direction, observe that any valid candidate $\mathcal{F}^{\prime}$ for the entry $T[X, j-1]$ is also a valid candidate for $T[X, j]$ and, moreover, for every valid candidate $\mathcal{F}^{\prime}$ for $T\left[X \backslash F_j, j-1\right]$, the family $\mathcal{F}^{\prime} \cup\left\{F_j\right\}$ is a valid candidate for $T[X, j]$.

This completes the proof.

</div>
</details>

