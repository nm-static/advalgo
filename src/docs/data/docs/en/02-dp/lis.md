---
title: "1. Longest Increasing Subsequence"
description: "1. Longest Increasing Subsequence - Advanced Algorithms"
section: main
sidebar:
  order: 1
  label: "1. Longest Increasing Subsequence"
---


<div class="callout callout-note">
<div class="callout-title">Acknowledgements</div>
<div class="callout-body">

Some of this material is borrowed from [Jeff Erickson](http://jeffe.cs.illinois.edu/)'s chapters on [Recursion](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf), [Backtracking](http://jeffe.cs.illinois.edu/teaching/algorithms/book/02-backtracking.pdf), and [Dynamic Programming](http://jeffe.cs.illinois.edu/teaching/algorithms/book/03-dynprog.pdf). Check them out for a more detailed comparison between recursive and memoized implementations.

</div>
</div>

### The Problem

For any sequence $Q$, a subsequence of $Q$ is another sequence obtained from $Q$ by deleting zero or more elements, without changing the order of the remaining elements; the elements of the subsequence need not be contiguous in $Q$.

For example, when you drive down a major street in any city, you drive through a sequence of intersections with traffic lights, but you only have to stop at a subsequence of those intersections, where the traffic lights are red. If you're very lucky, you never stop at all: the empty sequence is a subsequence of $Q$. On the other hand, if you're very unlucky, you may have to stop at every intersection: $Q$ is a subsequence of itself.

Here are some examples:

1. `BOAT` is a subsequence of `BOX-OF-CHOCOLATES`.
2. `OOF` is a subsequence of `BOX-OF-CHOCOLATES`, but `OO-F` is not.
3. `O-O-OOLA` is a subsequence of `BOX-OF-CHOCOLATES`, but `FOX` is not.
4. `FOOL` and `BHOLA` are subsequences of `BOX-OF-CHOCOLATES`, but `LAX` and `BETA` are not.

Now suppose we are given a sequence of integers, and we need to find the length of a longest subsequence whose elements are in increasing order:

- the input is an integer array $A[1 .. n]$, and
- we need to compute the length of a longest possible sequence of indices $1 \leqslant i_1<i_2<\cdots<i_{\ell} \leqslant n$ such that $A\left[i_k\right]<A\left[i_{k+1}\right]$ for all $k$.

We will use `LIS` to refer to the phrase _longest increasing subsequence_. Note that there may be multiple increasing subsequences, and even multiple choices for increasing subsequences that are the longest. The approaches below that work correctly to find the length of a LIS are easily adaptable to finding a LIS as well.

### The Solution --- Take 0 (a dead end)

<details class="callout callout-tip">
<summary class="callout-title">What are the fragments (AKA, what do we want to store)?</summary>
<div class="callout-body">

For any $1 \leqslant i \leqslant n$, let $A[i\ldots]$ denote the subarray of $A$ starting at $A[i]$, and let $T[i]$ denote the length of a LIS of $A[i\ldots]$. The $T$'s will be our fragments.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Are the fragments going to be useful (AKA, where is the final answer)?</summary>
<div class="callout-body">

$T[1]$ is evidently the answer we are looking for!

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Do we have a kickstart (AKA, what are the base cases)?</summary>
<div class="callout-body">

$T[n] = 1$, since there is only one increasing subsequence of $A[n\ldots]$: no competition.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">How do the fragments come together (AKA, how do we compute the values that we have agreed to store)?</summary>
<div class="callout-body">

Consider the issue of computing the value of $T[i]$. Let $S_i$ be the set of all the longest increasing subsequences of $A[i\ldots]$. Let the common length of all the subsequences in $S_i$ be $k$. We want to determine the value of $k$.

Say we know the value of $T[i+1]$ to be $\ell$. Observe that $\ell \leqslant k \leqslant \ell+1$:

- the first inequality follows from the fact that every LIS of $A[i+1\ldots]$ is also an increasing subsequence of $A[i\ldots]$, and
- the second inequality follows from the fact that if there was a LIS of $A[i\ldots]$ of length $\ell + 2$ or more, then the tail of this subsequence would be an increasing subsequence of length at least $\ell + 1$ of $A[i+1\ldots]$, which contradicts $T[i+1] = \ell$.

So all we need to figure out is whether the value of $T[i+1]$ should be incremented or not. Unfortunately, by just staring at the value of $T[i+1]$, we have no way of knowing if $S_{i+1}$ is full of useless subsequences or not.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Can we put the pieces together without getting stuck (AKA, are the dependencies in step #4 acyclic)?</summary>
<div class="callout-body">

Not relevant, since step #4 is unspecified.

</div>
</details>

### The Solution --- Take 1 (building on the bad take)

<details class="callout callout-tip">
<summary class="callout-title">What are the fragments (AKA, what do we want to store)?</summary>
<div class="callout-body">

For any $1 \leqslant i < j \leqslant n$, let $S_{(i,j)}$ denote the set of increasing subsequences of $A[j\ldots]$ that start with an element larger than $A[i]$. Now, let $T[i,j]$ denote the length of a longest sequence in $S_{(i,j)}$. The $T$'s will be our fragments.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Are the fragments going to be useful (AKA, where is the final answer)?</summary>
<div class="callout-body">

$\max_{i \in [n]} T[i,i+1] + 1$ is the answer we are looking for: since we don't know where the first element of an optimal solution is located in an array, we hazard a guess properly by taking a $\max$ over all possibilities.

You could alternatively artificially expand the array to $n+1$ elements, with the last $n$ elements being the same as $A$, and the first element being smaller than $\min_{i \in [n]} A[i]$: then the final answer is simply $T[1,1]$.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Do we have a kickstart (AKA, what are the base cases)?</summary>
<div class="callout-body">

For all $1 \leqslant i < n$, we have:

- $T[i,n] = 1$ if $A[n] > A[i]$.
- $T[i,n] = 0$ if $A[n] \leqslant A[i]$.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">How do the fragments come together (AKA, how do we compute the values that we have agreed to store)?</summary>
<div class="callout-body">

Consider computing $T[i,j]$ for $1 \leqslant i \leqslant n$ and $i+1 \leqslant j \leqslant n-1$.

First, suppose $A[i] \geqslant A[j]$. Then $T[i,j] = T[i,j+1]$.

On the other hand, suppose $A[i] < A[j]$. Then:

$$T(i, j)= \begin{cases} T(i, j+1) & \text{ if } A[i] \geqslant A[j] \\ \max \left(\begin{array}{c} T(i, j+1) \\ 1+T(j, j+1)\end{array}\right) & \text{ otherwise }\end{cases}$$

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Can we put the pieces together without getting stuck (AKA, are the dependencies in step #4 acyclic)?</summary>
<div class="callout-body">

Note that computing $T[i,j]$ involves pinging $T[i,j+1]$ and $T[j,j+1]$. So as long as all $T[\star,j+1]$ entries are computed before we get to $T[i,j]$, we are covered. One valid sequence computes $T[\star,n-1], T[\star,n-2],\ldots$ and so on.

![Sequence of computations for the recurrence above.](https://raw.githubusercontent.com/neeldhara/quartosite/master/materials/algorithms/dp/lis/lis1.png)

</div>
</details>

### The Solution --- Take 2 (a different approach)

<details class="callout callout-tip">
<summary class="callout-title">What are the fragments (AKA, what do we want to store)?</summary>
<div class="callout-body">

Let $S_i$ denote the set of all increasing subsequences of $A$ that start at $A[i]$ and let $T[i]$ denote the length of a LIS in $S_i$. The $T$'s will be our fragments.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Are the fragments going to be useful (AKA, where is the final answer)?</summary>
<div class="callout-body">

$\max_{i \in [n]} T[i]$ is the answer we are looking for.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Do we have a kickstart (AKA, what are the base cases)?</summary>
<div class="callout-body">

Clearly, $T[n] = 1$.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">How do the fragments come together (AKA, how do we compute the values that we have agreed to store)?</summary>
<div class="callout-body">

We know that any optimal sequence of interest starts at $A[i]$. We don't know $i_2$, so we guess it by going over all possible choices: all $j > i$ such that $A[j] > A[i]$.

$$T[i] = 1 + \max_{\{j \mid j > i,\, A[j] > A[i]\}} T[j], \text{ for any } i < n.$$

Note that if the $\max$ is taken over an empty set, then the output of $\max(\cdot)$ is $0$.

</div>
</details>

<details class="callout callout-tip">
<summary class="callout-title">Can we put the pieces together without getting stuck (AKA, are the dependencies in step #4 acyclic)?</summary>
<div class="callout-body">

Computing $T[i]$ involves pinging $T[j]$ for $j > i$. Compute in the order $T[n], T[n-1], \cdots, T[1]$.

</div>
</details>

### Time and Space Complexity

For **Take 1**:

- We filled out $O(n^2)$ entries at $O(1)$ cost each, so the overall running time is $O(n^2)$.
- We store $O(n^2)$ entries, although with a careful implementation the storage can be limited to $O(n)$.

For **Take 2**:

- We filled out $O(n)$ entries at $O(n)$ cost each, so the overall running time is $O(n^2)$ again.
- We store $O(n)$ values.

### Correctness

<details class="callout callout-tip">
<summary class="callout-title">Correctness of the DP (Take 2)</summary>
<div class="callout-body">

**Theorem.** Let $T[i]$ be given by:

$$T[i] = 1 + \max_{\{j \mid j > i,\, A[j] > A[i]\}} T[j], \text{ for any } i \in [n],$$

and let $O[i]$ denote the length of a LIS in $S_i$. Then $T[i] = O[i]$.

_Proof._

**Part 1. The DP stores a value that is achievable.**

We show $O[i] \geqslant T[i]$ by backward induction over $i$. The base case $T[n] = 1$ is witnessed by $\{A[n]\}$. For the induction step, if the set $\{j \mid j > i, A[j] > A[i]\}$ is empty then $T[i] = 1$. Otherwise, let $j^\star$ witness the $\max$. By induction there is a subsequence of length $T[j^\star]$ starting at $A[j^\star]$; prepend $A[i]$ to get a subsequence of length $1 + T[j^\star]$.

**Part 2. The value computed by the DP cannot be beaten.**

We show $O[i] \leqslant T[i]$ by backward induction. Suppose for contradiction there is a subsequence $\sigma^\star \in S_i$ of length $k \geqslant T[i] + 1$. Let $A[\ell]$ be the first element of its tail. Then $\sigma^\star$'s tail belongs to $S_\ell$ with $\ell > i$ and $A[\ell] > A[i]$, so by induction $T[\ell] \geqslant k-1$. Thus:

$$T[i] = 1 + \max_{j} T[j] \geqslant 1 + T[\ell] \geqslant k \geqslant T[i] + 1,$$

a contradiction.

</div>
</details>

