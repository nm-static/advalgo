---
title: "Shortest Common Superstring"
description: "Greedy problem"
section: problems
pagefind: true
---

<div class="problem-content" data-problem-id="shortest-common-superstring">
<div class="problem-body"><p>In the Shortest Common Superstring Problem (SCS), one is given a set of strings and needs to find the shortest string that contains all of them as substrings. We denote the set of <span class="katex-inline">$n$</span> input strings by <span class="katex-inline">$\mathcal{S}=\left\{s_1, \ldots, s_n\right\}$</span>.</p>
<p>For a string <span class="katex-inline">$s$</span>, by <span class="katex-inline">$|s|$</span> we denote its length. For non-empty strings <span class="katex-inline">$s$</span> and <span class="katex-inline">$t$</span>, by <span class="katex-inline">$\text{ov}(s, t)$</span> we denote their overlap, that is, the longest string <span class="katex-inline">$y$</span>, such that <span class="katex-inline">$s=xy$</span> and <span class="katex-inline">$t=yz$</span> for some non-empty strings <span class="katex-inline">$x$</span> and <span class="katex-inline">$z$</span>. In this case, the string <span class="katex-inline">$xyz$</span> is called a <em>merge</em> of <span class="katex-inline">$s$</span> and <span class="katex-inline">$t$</span>.</p>
<p><strong>Example 1:</strong> Consider <span class="katex-inline">$\mathcal{S} = \{\texttt{abc}, \texttt{bcd}, \texttt{cde}\}$</span>.</p>
<ul><li><span class="katex-inline">$\text{ov}(\texttt{abc}, \texttt{bcd}) = \texttt{bc}$</span> (length 2)</li><li><span class="katex-inline">$\text{ov}(\texttt{bcd}, \texttt{cde}) = \texttt{cd}$</span> (length 2)</li><li>Merging in order <span class="katex-inline">$(\texttt{abc}, \texttt{bcd}, \texttt{cde})$</span> gives: <span class="katex-inline">$\texttt{abcde}$</span> (length 5)</li><li>Total length = <span class="katex-inline">$3 + 3 + 3 - 2 - 2 = 5$</span></li></ul>
<p><strong>Example 2:</strong> Consider <span class="katex-inline">$\mathcal{S} = \{\texttt{cat}, \texttt{atom}, \texttt{omit}\}$</span>.</p>
<ul><li><span class="katex-inline">$\text{ov}(\texttt{cat}, \texttt{atom}) = \texttt{at}$</span> (length 2)</li><li><span class="katex-inline">$\text{ov}(\texttt{atom}, \texttt{omit}) = \texttt{om}$</span> (length 2)</li><li>Merging in order <span class="katex-inline">$(\texttt{cat}, \texttt{atom}, \texttt{omit})$</span> gives: <span class="katex-inline">$\texttt{catomit}$</span> (length 7)</li><li>The compression is <span class="katex-inline">$2 + 2 = 4$</span></li></ul>
<p><strong>Example 3:</strong> Consider <span class="katex-inline">$\mathcal{S} = \{\texttt{ab}, \texttt{bc}, \texttt{ca}\}$</span>.</p>
<ul><li><span class="katex-inline">$\text{ov}(\texttt{ab}, \texttt{bc}) = \texttt{b}$</span>, <span class="katex-inline">$\text{ov}(\texttt{bc}, \texttt{ca}) = \texttt{c}$</span>, <span class="katex-inline">$\text{ov}(\texttt{ca}, \texttt{ab}) = \texttt{a}$</span></li><li>Order <span class="katex-inline">$(\texttt{ca}, \texttt{ab}, \texttt{bc})$</span> gives: <span class="katex-inline">$\texttt{cabc}$</span> (length 4)</li><li>Order <span class="katex-inline">$(\texttt{ab}, \texttt{bc}, \texttt{ca})$</span> gives: <span class="katex-inline">$\texttt{abca}$</span> (length 4)</li></ul></div>
<div class="problem-part" id="shortest-common-superstring-part-A">
<h4>Part A</h4>
<div class="part-body"><p>Argue that to solve SCS, it is sufficient to find:</p></div>
<form class="problem-options" data-question-id="shortest-common-superstring-part-A" data-correct="A" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="shortest-common-superstring-part-A" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>a permutation <span class="katex-inline">$\pi$</span> of <span class="katex-inline">$[n]$</span> such that when we consider the input strings in the order <span class="katex-inline">$\left(s_{\pi(1)}, \ldots, s_{\pi(n)}\right)$</span>, the length of the string obtained by merging adjacent strings is as small as possible.</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="shortest-common-superstring-part-A" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>a permutation <span class="katex-inline">$\pi$</span> of <span class="katex-inline">$[n]$</span> such that when we consider the input strings in the order <span class="katex-inline">$\left(s_{\pi(1)}, \ldots, s_{\pi(n)}\right)$</span>, the length of the string obtained by merging adjacent strings is as large as possible.</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="shortest-common-superstring-part-A" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>Neither of the above</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="shortest-common-superstring-part-A">
<strong>Solution:</strong> <p>WLOG, there are no repeats. Any solution contains all the input strings in some order; this order corresponds to the desired permutation.</p>
</div>
</div>
<div class="problem-part" id="shortest-common-superstring-part-B">
<h4>Part B</h4>
<div class="part-body"><p>Observe that for a given <span class="katex-inline">$\pi$</span>, the length of the corresponding superstring <span class="katex-inline">$s(\pi)$</span>, which is obtained by writing the input strings in the order <span class="katex-inline">$\left(s_{\pi(1)}, \ldots, s_{\pi(n)}\right)$</span> and merging adjacent strings, is given by:</p>
<p><div class="katex-display">$$
|s(\pi)|=\sum_{i=1}^n\left|s_i\right|-\sum_{i=1}^{n-1}\left|\text{ov}\left(s_{\pi(i)}, s_{\pi(i+1)}\right)\right|
$$</div></p>
<p>The <em>compression</em> of <span class="katex-inline">$\pi$</span> is the sum of the overlaps of adjacent strings in the permutation <span class="katex-inline">$\pi$</span>. Finding a shortest superstring is equivalent to:</p></div>
<form class="problem-options" data-question-id="shortest-common-superstring-part-B" data-correct="A" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="shortest-common-superstring-part-B" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>Finding a permutation <span class="katex-inline">$\pi$</span> that maximizes the compression.</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="shortest-common-superstring-part-B" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>Finding a permutation <span class="katex-inline">$\pi$</span> that minimizes the compression.</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="shortest-common-superstring-part-B" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>Neither of the above</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="shortest-common-superstring-part-B">
<strong>Solution:</strong> <p>Since the sum of string lengths <span class="katex-inline">$\sum_{i=1}^n |s_i|$</span> is fixed, minimizing the superstring length is equivalent to maximizing the sum of overlaps (i.e., the compression).</p>
</div>
</div>
<div class="problem-part" id="shortest-common-superstring-part-C">
<h4>Part C</h4>
<div class="part-body"><p>Consider <span class="katex-inline">$\mathcal{S} = \{\texttt{abc}, \texttt{bca}, \texttt{cab}\}$</span>. What is the length of the shortest common superstring?</p></div>
</div>
<div class="problem-part" id="shortest-common-superstring-part-D">
<h4>Part D</h4>
<div class="part-body"><p>We define an overlap graph <span class="katex-inline">$OG(\mathcal{S})$</span> associated with <span class="katex-inline">$\mathcal{S}$</span> as follows: <span class="katex-inline">$OG(\mathcal{S})$</span> is a complete directed graph <span class="katex-inline">$(V, E)$</span> (that is, for every <span class="katex-inline">$s, t \in V$</span> there are edges <span class="katex-inline">$(s, t)$</span> and <span class="katex-inline">$(t, s)$</span>), where <span class="katex-inline">$V=\mathcal{S}$</span>, and the weight of an edge <span class="katex-inline">$(s, t)$</span> is <span class="katex-inline">$|\text{ov}(s, t)|$</span>.</p>
<p>Let us say that an edge <span class="katex-inline">$(u, v)$</span> <em>dominates</em> another edge <span class="katex-inline">$(u', v')$</span>, if they share head or tail (that is, <span class="katex-inline">$u=u'$</span> or <span class="katex-inline">$v=v'$</span>) and <span class="katex-inline">$|\text{ov}(u, v)| \geq |\text{ov}(u', v')|$</span>.</p>
<p>In terms of the overlap graph, the greedy algorithm goes through a list of all edges in <span class="katex-inline">$OG(\mathcal{S})$</span> in the nonincreasing order of their overlap and includes some of them in a solution. Specifically, the greedy algorithm does not include another edge if and only if:</p>
<ul><li><strong>R1.</strong> it is dominated by an already chosen edge,</li><li><strong>R2.</strong> it is not dominated but it would form a cycle.</li></ul>
<p>What is the structure of the set of edges returned by the greedy algorithm?</p></div>
<form class="problem-options" data-question-id="shortest-common-superstring-part-D" data-correct="B" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="shortest-common-superstring-part-D" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>A Hamiltonian cycle, i.e., a cycle that visits every vertex in the graph exactly once</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="shortest-common-superstring-part-D" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>A Hamiltonian path, i.e., a path that visits every vertex in the graph exactly once</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="shortest-common-superstring-part-D" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>A regular graph, i.e., a graph where every vertex has the same degree</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="shortest-common-superstring-part-D">
<strong>Solution:</strong> <p>The greedy algorithm selects exactly <span class="katex-inline">$n-1$</span> edges (one less than the number of vertices). By R1, each vertex has at most one outgoing and one incoming selected edge. By R2, there are no cycles. Together, this forms a Hamiltonian path.</p>
</div>
</div>
<div class="problem-part" id="shortest-common-superstring-part-E">
<h4>Part E</h4>
<div class="part-body"><p>Does the greedy algorithm always produce the optimal (shortest) superstring?</p></div>
<form class="problem-options" data-question-id="shortest-common-superstring-part-E" data-correct="B" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="shortest-common-superstring-part-E" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>Yes</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="shortest-common-superstring-part-E" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>No</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="shortest-common-superstring-part-E">
<strong>Solution:</strong> <p>The greedy algorithm does not always produce the optimal solution. Consider <span class="katex-inline">$\mathcal{S} = \{\texttt{ab}, \texttt{bb}, \texttt{bc}\}$</span>:</p>
<ul><li>Greedy might pick edge <span class="katex-inline">$(\texttt{ab}, \texttt{bb})$</span> with overlap 1, then <span class="katex-inline">$(\texttt{bb}, \texttt{bc})$</span> with overlap 1, giving <span class="katex-inline">$\texttt{abbc}$</span> (length 4).</li><li>But the optimal is <span class="katex-inline">$(\texttt{ab}, \texttt{bc})$</span> with overlap 1, and <span class="katex-inline">$\texttt{bb}$</span> can overlap with both, giving potentially shorter solutions depending on the tie-breaking.</li></ul>
<p>More generally, the greedy algorithm is known to give a 3.5-approximation for SCS.</p>
</div>
</div>
<details class="problem-hints">
<summary>Hints</summary>
<ol>
<li><p>Try different permutations and compute the overlaps for each adjacent pair.</p></li>
</ol></details>
</div>
