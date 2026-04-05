---
title: "Odd Cycle Transversal via Iterative Compression"
description: "Parameterized Algorithms problem"
section: problems
pagefind: true
---

<div class="problem-content" data-problem-id="oct-iterative-compression">
<div class="problem-body"><p>In <strong>Odd Cycle Transversal (OCT)</strong>, we are given an undirected graph <span class="katex-inline">$G$</span> and a positive integer <span class="katex-inline">$k$</span>. The goal is to find a set <span class="katex-inline">$X \subseteq V(G)$</span> with <span class="katex-inline">$|X| \leq k$</span> such that <span class="katex-inline">$G - X$</span> is bipartite, or to conclude that no such set exists. These questions walk through the key ideas behind solving OCT using iterative compression.</p>
<p>Suppose we apply iterative compression and arrive at the following subroutine, called <strong>Disjoint Odd Cycle Transversal</strong>: we are given <span class="katex-inline">$G$</span>, an integer <span class="katex-inline">$k$</span>, and a set <span class="katex-inline">$W$</span> of <span class="katex-inline">$k+1$</span> vertices such that <span class="katex-inline">$G - W$</span> is bipartite. The objective is to find a set <span class="katex-inline">$X \subseteq V(G) \setminus W$</span> of at most <span class="katex-inline">$k$</span> vertices such that <span class="katex-inline">$G - X$</span> is bipartite, or to conclude that no such set exists.</p></div>
<div class="problem-part" id="oct-iterative-compression-part-A">
<h4>Part A</h4>
<div class="part-body"><p>Since <span class="katex-inline">$X \subseteq V(G) \setminus W$</span>, every vertex of <span class="katex-inline">$W$</span> remains in <span class="katex-inline">$G - X$</span>. In particular, <span class="katex-inline">$G[W]$</span> must also be bipartite. Suppose <span class="katex-inline">$G[W]$</span> is indeed bipartite and has <span class="katex-inline">$c$</span> connected components. How many proper <span class="katex-inline">$2$</span>-colorings <span class="katex-inline">$f_W : W \to \{1,2\}$</span> does <span class="katex-inline">$G[W]$</span> admit?</p></div>
<form class="problem-options" data-question-id="oct-iterative-compression-part-A" data-correct="C" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="oct-iterative-compression-part-A" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p><span class="katex-inline">$c$</span></p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="oct-iterative-compression-part-A" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p><span class="katex-inline">$k + 1$</span></p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="oct-iterative-compression-part-A" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p><span class="katex-inline">$2^c$</span></p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="oct-iterative-compression-part-A" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p><span class="katex-inline">$2^{k+1}$</span></p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="oct-iterative-compression-part-A">
<strong>Solution:</strong> <p><span class="katex-inline">$2^c$</span>. A bipartite graph with <span class="katex-inline">$c$</span> connected components admits exactly <span class="katex-inline">$2^c$</span> proper <span class="katex-inline">$2$</span>-colorings, since each component can independently swap its two color classes.</p>
</div>
</div>
<div class="problem-part" id="oct-iterative-compression-part-B">
<h4>Part B</h4>
<div class="part-body"><p>For a fixed proper <span class="katex-inline">$2$</span>-coloring <span class="katex-inline">$f_W$</span> of <span class="katex-inline">$G[W]$</span>, let <span class="katex-inline">$B_1^W = f_W^{-1}(1)$</span> and <span class="katex-inline">$B_2^W = f_W^{-1}(2)$</span>. Consider a vertex <span class="katex-inline">$v \in V(G) \setminus W$</span> that is adjacent to at least one vertex in <span class="katex-inline">$B_1^W$</span> and at least one vertex in <span class="katex-inline">$B_2^W$</span>. What can we conclude about such a vertex <span class="katex-inline">$v$</span>? It is important to note that this question is in the context of a fixed choice of <span class="katex-inline">$f_W$</span>, which is our guess for how the vertices of <span class="katex-inline">$W$</span> get colored in <span class="katex-inline">$G - X$</span>.</p></div>
<form class="problem-options" data-question-id="oct-iterative-compression-part-B" data-correct="D" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="oct-iterative-compression-part-B" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p><span class="katex-inline">$v$</span> must be colored <span class="katex-inline">$1$</span> in <span class="katex-inline">$G - X$</span></p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="oct-iterative-compression-part-B" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p><span class="katex-inline">$v$</span> must be colored <span class="katex-inline">$2$</span> in <span class="katex-inline">$G - X$</span></p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="oct-iterative-compression-part-B" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p><span class="katex-inline">$v$</span> can be colored either <span class="katex-inline">$1$</span> or <span class="katex-inline">$2$</span></p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="oct-iterative-compression-part-B" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p><span class="katex-inline">$v$</span> must be included in <span class="katex-inline">$X$</span> (i.e., deleted)</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="oct-iterative-compression-part-B">
<strong>Solution:</strong> <p><span class="katex-inline">$v$</span> must be included in <span class="katex-inline">$X$</span>. With neighbors in both color classes, no single color from <span class="katex-inline">$\{1,2\}$</span> can be assigned to <span class="katex-inline">$v$</span> without creating a monochromatic edge.</p>
</div>
</div>
<div class="problem-part" id="oct-iterative-compression-part-C">
<h4>Part C</h4>
<div class="part-body"><p>Assume there are no vertices adjacent to both color classes of <span class="katex-inline">$W$</span>. Then the remaining vertices of <span class="katex-inline">$V(G) \setminus W$</span> fall into three categories: those with neighbors only in <span class="katex-inline">$B_1^W$</span> (call this set <span class="katex-inline">$B_2$</span>, since they must receive color <span class="katex-inline">$2$</span> or be deleted), those with neighbors only in <span class="katex-inline">$B_2^W$</span> (call this set <span class="katex-inline">$B_1$</span>, since they must receive color <span class="katex-inline">$1$</span> or be deleted), and those with no neighbors in <span class="katex-inline">$W$</span> at all. </p>
<p>Independently, recall that <span class="katex-inline">$G - W$</span> is bipartite and already has some proper <span class="katex-inline">$2$</span>-coloring. Let us denote this <span class="katex-inline">$2$</span>-coloring by <span class="katex-inline">$f^*: V(G - W) \rightarrow \{1,2\}$</span>.</p>
<p>Such an instance — a bipartite graph with a known <span class="katex-inline">$2$</span>-coloring <span class="katex-inline">$f^*$</span> and prescribed color classes <span class="katex-inline">$B_1, B_2$</span> — the problem is called <strong>Annotated Bipartite Coloring</strong>. Consider the vertices of <span class="katex-inline">$C := (B_1 \cap (f^*)^{-1}(2)) \cup (B_2 \cap (f^*)^{-1}(1))$</span>, i.e., those that must <em>change</em> their color relative to <span class="katex-inline">$f^*$</span>, and the vertices of <span class="katex-inline">$R := (B_1 \cap (f^*)^{-1}(1)) \cup (B_2 \cap (f^*)^{-1}(2))$</span>, i.e., those that must <em>retain</em> their color. </p>
<p>We don't know <span class="katex-inline">$X$</span> yet, but for analysis, we observe that any connected component of <span class="katex-inline">$G \setminus X$</span>, either all vertices keep their <span class="katex-inline">$f^*$</span>-color or all vertices flip (why?). Thus, which of the following must hold?</p></div>
<form class="problem-options" data-question-id="oct-iterative-compression-part-C" data-correct="C" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="oct-iterative-compression-part-C" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>Every vertex of <span class="katex-inline">$C$</span> must be included in <span class="katex-inline">$X$</span></p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="oct-iterative-compression-part-C" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>Every vertex of <span class="katex-inline">$R$</span> must be included in <span class="katex-inline">$X$</span></p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="oct-iterative-compression-part-C" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>No connected component of <span class="katex-inline">$G \setminus X$</span> contains both a vertex of <span class="katex-inline">$C$</span> and a vertex of <span class="katex-inline">$R$</span></p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="oct-iterative-compression-part-C" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p><span class="katex-inline">$|C| \leq |R|$</span></p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="oct-iterative-compression-part-C">
<strong>Solution:</strong> <p>No connected component of <span class="katex-inline">$G \setminus X$</span> contains both a vertex of <span class="katex-inline">$C$</span> and a vertex of <span class="katex-inline">$R$</span>. In a connected component of a bipartite graph, any two proper <span class="katex-inline">$2$</span>-colorings either agree everywhere or disagree everywhere (i.e., one is the flip of the other). So if one vertex must flip and another must stay, they cannot be in the same component.</p>
</div>
</div>
<div class="problem-part" id="oct-iterative-compression-part-D">
<h4>Part D</h4>
<div class="part-body"><p>Based on your answer to the previous question, how will you find the set <span class="katex-inline">$X$</span>?</p></div>
<form class="problem-options" data-question-id="oct-iterative-compression-part-D" data-correct="B" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="oct-iterative-compression-part-D" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>A greedy algorithm that iteratively removes high-degree vertices</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="oct-iterative-compression-part-D" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>A maximum flow / minimum cut computation</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="oct-iterative-compression-part-D" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>Dynamic programming on a tree decomposition</p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="oct-iterative-compression-part-D" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p>A reduction to <span class="katex-inline">$2$</span>-SAT</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="oct-iterative-compression-part-D">
<strong>Solution:</strong> <p>Maximum flow / minimum cut. Finding a minimum vertex separator between two sets is equivalent to a minimum cut problem in an appropriately constructed network (split each vertex into two nodes connected by a unit-capacity edge, add a source connected to all of <span class="katex-inline">$C$</span> and a sink connected to all of <span class="katex-inline">$R$</span>).</p>
</div>
</div>
<div class="problem-part" id="oct-iterative-compression-part-E">
<h4>Part E</h4>
<div class="part-body"><p>Based on your choices above, what is your running time for the <strong>Disjoint</strong> Odd Cycle Transversal problem?</p></div>
<form class="problem-options" data-question-id="oct-iterative-compression-part-E" data-correct="B" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="oct-iterative-compression-part-E" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p><span class="katex-inline">$\mathcal{O}(k(n+m))$</span></p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="oct-iterative-compression-part-E" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p><span class="katex-inline">$\mathcal{O}(2^k \cdot k(n+m))$</span></p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="oct-iterative-compression-part-E" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p><span class="katex-inline">$\mathcal{O}(k^2(n+m))$</span></p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="oct-iterative-compression-part-E" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p><span class="katex-inline">$\mathcal{O}(2^{k^2} \cdot (n+m))$</span></p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="oct-iterative-compression-part-E">
<strong>Solution:</strong> <p><span class="katex-inline">$\mathcal{O}(2^k \cdot k(n+m))$</span>. We iterate over at most <span class="katex-inline">$2^{k+1}$</span> colorings, and for each we solve a min-cut instance in <span class="katex-inline">$\mathcal{O}(k(n+m))$</span> time.</p>
</div>
</div>
<div class="problem-part" id="oct-iterative-compression-part-F">
<h4>Part F</h4>
<div class="part-body"><p>So far we have solved the <strong>disjoint</strong> variant, where <span class="katex-inline">$X \cap W = \emptyset$</span>. For the full compression step, we do not require <span class="katex-inline">$X$</span> to be disjoint from <span class="katex-inline">$W$</span>. Instead, for each vertex <span class="katex-inline">$w \in W$</span>, there are three possibilities: (i) <span class="katex-inline">$w \in X$</span> (deleted), (ii) <span class="katex-inline">$w \notin X$</span> and is colored <span class="katex-inline">$1$</span>, or (iii) <span class="katex-inline">$w \notin X$</span> and is colored <span class="katex-inline">$2$</span>. For a fixed choice of which vertices of <span class="katex-inline">$W$</span> are deleted, the remainder is a Disjoint OCT instance (with a smaller <span class="katex-inline">$W$</span> and adjusted budget). The total number of such choices across all vertices of <span class="katex-inline">$W$</span> is:</p></div>
<form class="problem-options" data-question-id="oct-iterative-compression-part-F" data-correct="B" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="oct-iterative-compression-part-F" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p><span class="katex-inline">$2^{k+1}$</span></p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="oct-iterative-compression-part-F" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p><span class="katex-inline">$3^{k+1}$</span></p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="oct-iterative-compression-part-F" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p><span class="katex-inline">$(k+1)!$</span></p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="oct-iterative-compression-part-F" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p><span class="katex-inline">$\binom{2(k+1)}{k+1}$</span></p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="oct-iterative-compression-part-F">
<strong>Solution:</strong> <p><span class="katex-inline">$3^{k+1}$</span>. Each of the <span class="katex-inline">$k+1$</span> vertices in <span class="katex-inline">$W$</span> independently has three options: be deleted, be colored <span class="katex-inline">$1$</span>, or be colored <span class="katex-inline">$2$</span>. This gives <span class="katex-inline">$3^{k+1}$</span> total scenarios, each of which reduces to an Annotated Bipartite Coloring instance.</p>
</div>
</div>
<div class="problem-part" id="oct-iterative-compression-part-G">
<h4>Part G</h4>
<div class="part-body"><p>Combining everything: each of the <span class="katex-inline">$3^{k+1}$</span> scenarios leads to an Annotated Bipartite Coloring instance solvable in <span class="katex-inline">$\mathcal{O}(k(n+m))$</span> time, giving <span class="katex-inline">$\mathcal{O}(3^k \cdot k(n+m))$</span> per compression step. The iterative compression framework processes vertices one at a time (<span class="katex-inline">$n$</span> iterations total). What is the overall running time for Odd Cycle Transversal?</p></div>
<form class="problem-options" data-question-id="oct-iterative-compression-part-G" data-correct="B" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="oct-iterative-compression-part-G" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p><span class="katex-inline">$\mathcal{O}(2^k \cdot kn(n+m))$</span></p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="oct-iterative-compression-part-G" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p><span class="katex-inline">$\mathcal{O}(3^k \cdot kn(n+m))$</span></p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="oct-iterative-compression-part-G" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p><span class="katex-inline">$\mathcal{O}(4^k \cdot n(n+m))$</span></p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="oct-iterative-compression-part-G" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p><span class="katex-inline">$\mathcal{O}(2^{k^2} \cdot n^2)$</span></p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="oct-iterative-compression-part-G">
<strong>Solution:</strong> <p><span class="katex-inline">$\mathcal{O}(3^k \cdot kn(n+m))$</span>. The iterative compression framework runs <span class="katex-inline">$n$</span> iterations, and each compression step takes <span class="katex-inline">$\mathcal{O}(3^k \cdot k(n+m))$</span> time. This matches Theorem 4.17 from the textbook.</p>
</div>
</div>
<details class="problem-hints">
<summary>Hints</summary>
<ol>
<li><p>In a connected bipartite graph, there are exactly two proper <span class="katex-inline">$2$</span>-colorings (one is the swap of the other). Think about what this means for each connected component independently.</p></li>
<li><p>If <span class="katex-inline">$v \notin X$</span>, then <span class="katex-inline">$v$</span> must receive a color that differs from both a color-<span class="katex-inline">$1$</span> neighbor and a color-<span class="katex-inline">$2$</span> neighbor — which is impossible with only two colors. In other words, if <span class="katex-inline">$v$</span> stays in the graph, it needs a color from <span class="katex-inline">$\{1,2\}$</span>.</p></li>
<li><p>In a connected bipartite graph, if you know the color of one vertex, the coloring of the entire component is determined. So within a component, either every vertex keeps its original color, or every vertex flips. What happens if the component contains one vertex that must flip and another that must stay?</p></li>
<li><p>Think about the relationship between vertex separators and network flows. There is a classical min-max duality at play here.</p></li>
<li><p>For each of the at most <span class="katex-inline">$2^{k+1}$</span> colorings, we solve one min-cut instance. What is the product?</p></li>
<li><p>Think of it combinatorially: choosing a subset <span class="katex-inline">$S \subseteq W$</span> to delete and then a <span class="katex-inline">$2$</span>-coloring of <span class="katex-inline">$W \setminus S$</span> is the same as assigning each vertex of <span class="katex-inline">$W$</span> one of three labels. You can also verify this algebraically: <span class="katex-inline">$\sum_{S \subseteq W} 2^{|W \setminus S|} = 3^{|W|}$</span>.</p></li>
<li><p>Multiply the cost of one compression step by the number of iterations in the framework.</p></li>
</ol></details>
</div>
