---
title: "Ferrying the Deceased"
description: "NP-Hardness problem"
section: problems
pagefind: true
---

<div class="problem-content" data-problem-id="ferrying-easy">
<div class="problem-body"><p>Betal has picked up a part-time job that involves ferrying <span class="katex-inline">$n$</span> deceased people across a river for a smooth transition into the next phase. Certain pairs of these people are sworn enemies, who cannot be taken together on the ferry because when on water, they can in fact get into a deadly fight, and this will be a distraction to Betal who will be navigating rough waters. It is safe to leave them on the shore because corpses don't fight on land.</p>
<p>The ferry has unlimited capacity, but Betal has limited time.</p>
<p><strong>Input:</strong> Integers <span class="katex-inline">$k$</span> and <span class="katex-inline">$n$</span>, and an <span class="katex-inline">$n$</span>-vertex graph <span class="katex-inline">$G$</span> describing the pairs of enemies (an edge <span class="katex-inline">$(u,v)$</span> means <span class="katex-inline">$u$</span> and <span class="katex-inline">$v$</span> are enemies).</p>
<p><strong>Output:</strong> TRUE if Betal can ferry all <span class="katex-inline">$n$</span> people across the river safely in at most <span class="katex-inline">$k$</span> rounds, FALSE otherwise.</p></div>
<div class="problem-part" id="ferrying-easy-part-A">
<h4>Part A</h4>
<div class="part-body"><p>Consider 5 people: <span class="katex-inline">$A, B, C, D, E$</span> with the following enemy pairs:</p>
<p><div class="katex-display">$$\{A,B\}, \{B,C\}, \{C,D\}, \{D,E\}, \{E,A\}$$</div></p>
<p>(This forms a 5-cycle.)</p>
<p>What is the <strong>minimum</strong> number of ferry trips needed to transport everyone safely?</p></div>
<form class="problem-options" data-question-id="ferrying-easy-part-A" data-correct="B" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="ferrying-easy-part-A" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>2 trips</p>
<span class="option-feedback hidden"><p>With 2 trips, you'd need to partition the 5 people into 2 groups with no enemies in the same group. Try it — you'll find it's impossible for a 5-cycle.</p></span>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="ferrying-easy-part-A" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>3 trips</p>
<span class="option-feedback hidden"><p>Correct! A 5-cycle has chromatic number 3. One valid partition: <span class="katex-inline">$\{A, C\}$</span>, <span class="katex-inline">$\{B, D\}$</span>, <span class="katex-inline">$\{E\}$</span>.</p></span>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="ferrying-easy-part-A" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>4 trips</p>
<span class="option-feedback hidden"><p>You can do better! Look for larger independent sets.</p></span>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="ferrying-easy-part-A" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p>5 trips (one person per trip)</p>
<span class="option-feedback hidden"><p>This is always possible but not optimal. Look for groups of non-enemies.</p></span>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="ferrying-easy-part-A">
<strong>Solution:</strong> <p>The enemy graph is a 5-cycle <span class="katex-inline">$C_5$</span>, which has chromatic number 3.</p>
<p>We cannot do it in 2 trips because <span class="katex-inline">$C_5$</span> is an odd cycle and not bipartite.</p>
<p>We can do it in 3 trips:</p>
<ul><li>Trip 1: <span class="katex-inline">$\{A, C\}$</span> (not enemies)</li><li>Trip 2: <span class="katex-inline">$\{B, D\}$</span> (not enemies)</li><li>Trip 3: <span class="katex-inline">$\{E\}$</span></li></ul>
</div>
</div>
<div class="problem-part" id="ferrying-easy-part-B">
<h4>Part B</h4>
<div class="part-body"><p>Is this decision problem NP-hard in general?</p></div>
<form class="problem-options" data-question-id="ferrying-easy-part-B" data-correct="A" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="ferrying-easy-part-B" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>Yes, it is NP-hard</p>
<span class="option-feedback hidden"><p>Correct! Each ferry trip must carry an independent set, so ferrying in <span class="katex-inline">$k$</span> rounds is equivalent to partitioning the graph into <span class="katex-inline">$k$</span> independent sets — exactly Graph <span class="katex-inline">$k$</span>-Coloring.</p></span>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="ferrying-easy-part-B" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>No, it can be solved in polynomial time</p>
<span class="option-feedback hidden"><p>The problem is equivalent to Graph <span class="katex-inline">$k$</span>-Coloring, which is NP-complete for <span class="katex-inline">$k \geq 3$</span>.</p></span>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="ferrying-easy-part-B" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>It depends on whether <span class="katex-inline">$k$</span> is part of the input or a fixed constant</p>
<span class="option-feedback hidden"><p>While <span class="katex-inline">$k$</span>-Coloring for fixed <span class="katex-inline">$k \geq 3$</span> is still NP-complete, even with <span class="katex-inline">$k$</span> as input, the problem remains NP-hard.</p></span>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="ferrying-easy-part-B" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p>The problem is not in NP</p>
<span class="option-feedback hidden"><p>The problem is in NP: a certificate is a partition of people into <span class="katex-inline">$\leq k$</span> groups, verifiable in polynomial time.</p></span>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="ferrying-easy-part-B">
<strong>Solution:</strong> <p>Each ferry trip must carry an <em>independent set</em> of <span class="katex-inline">$G$</span> (no two enemies together). Ferrying all <span class="katex-inline">$n$</span> people in <span class="katex-inline">$\leq k$</span> rounds means partitioning <span class="katex-inline">$V(G)$</span> into <span class="katex-inline">$\leq k$</span> independent sets — exactly the definition of <span class="katex-inline">$k$</span>-colorability. Since Graph <span class="katex-inline">$k$</span>-Coloring is NP-complete for <span class="katex-inline">$k \geq 3$</span>, this problem is NP-hard.</p>
</div>
</div>
<details class="problem-hints">
<summary>Hints</summary>
<ol>
<li><p>Think about which people can safely travel together (no edge between them).</p></li>
</ol></details>
</div>
