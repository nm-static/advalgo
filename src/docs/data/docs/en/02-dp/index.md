---
title: "Dynamic Programming"
description: "Dynamic Programming - Advanced Algorithms"
section: main
sidebar:
  order: 0
  label: "Overview"
---


<div class="callout callout-note">
<div class="callout-title">Acknowledgements</div>
<div class="callout-body">

I borrow the phrasing "what to store/how to compute" from my classroom experience at IMSc, specifically in a class taught by Venkatesh Raman. Some of the checklist is inspired by Erik Demaine's treatment of the material in his MIT OCW course. The choice of problems is a subset of Jeff Erickson's chapter on Dynamic Programming, and a lot of the notation is borrowed from there as well.

</div>
</div>

The dynamic programming approach to a problem involves miniaturizing the problem in a way that the pieces fit together to reveal a useful big picture --- i.e, the answer you are after. Here's the checklist:

1. What are the fragments (AKA, what do we want to store)?
2. Are the fragments going to be useful (AKA, where is the final answer)?
3. Do we have a kickstart (AKA, what are the base cases)?
4. How do the fragments come together (AKA, how do we compute the values that we have agreed to store)?
5. Can we put the pieces together without getting stuck (AKA, are the dependencies in step #4 acyclic)?

Let's execute this checklist on a few problems:

1. [Longest Increasing Subsequence](./lis/)
2. [Subset Sum](./ss/)
3. [Set Cover](./set-cover/)
4. [Optimal BSTs](./opt-bsts/)
5. [MIS on Trees](./mis-trees/)
