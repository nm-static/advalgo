---
title: "Rounding for Vertex Cover"
description: "Approximation Algorithms problem"
section: problems
pagefind: true
---

<div class="problem-content" data-problem-id="vertex-cover-rounding">
<div class="problem-body"><p>Recall the LP-rounding algorithm for weighted Vertex Cover:</p>
<p><div class="katex-display">$$
\begin{aligned}
\text{Minimize} \quad & \sum_{i=1}^{n} w(v_i)\,x_i \\
\text{subject to} \quad & x_i + x_j \ge 1 \quad \forall (v_i,v_j) \in E \\
& 0 \le x_i \le 1 \quad \forall i
\end{aligned}
$$</div></p>
<p>Then return <span class="katex-inline">$C = \{v_i \in V : x_i \ge 1/2\}$</span>.</p></div>
<div class="problem-part" id="vertex-cover-rounding-part-A">
<h4>Part A</h4>
<div class="part-body"><p>Suppose we instead include <span class="katex-inline">$v_i$</span> when <span class="katex-inline">$x_i \ge 1/3$</span>. What happens?</p></div>
<form class="problem-options" data-question-id="vertex-cover-rounding-part-A" data-correct="B" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="vertex-cover-rounding-part-A" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>We still get a valid solution, and the algorithm remains a 2-approximation.</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="vertex-cover-rounding-part-A" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>We still get a valid solution, and the algorithm becomes a 3-approximation.</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="vertex-cover-rounding-part-A" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>We may no longer get a valid solution.</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
</div>
<div class="problem-part" id="vertex-cover-rounding-part-B">
<h4>Part B</h4>
<div class="part-body"><p>Suppose we instead include <span class="katex-inline">$v_i$</span> when <span class="katex-inline">$x_i \ge 2/3$</span>. What happens?</p></div>
<form class="problem-options" data-question-id="vertex-cover-rounding-part-B" data-correct="C" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="vertex-cover-rounding-part-B" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>We still get a valid solution, and the algorithm remains a 2-approximation.</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="vertex-cover-rounding-part-B" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>We still get a valid solution, and the algorithm becomes a <span class="katex-inline">$3/2$</span>-approximation.</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="vertex-cover-rounding-part-B" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>We may no longer get a valid solution.</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
</div>
<div class="problem-part" id="vertex-cover-rounding-part-C">
<h4>Part C</h4>
<div class="part-body"><p>Consider this alternative rounding rule: for each edge <span class="katex-inline">$(v_i,v_j)$</span>, include the endpoint with larger LP value (break ties toward larger index). Equivalently,<br /><span class="katex-inline">$C := \{ v_i : \exists (v_i,v_j)\in E \text{ with } (x_i > x_j) \text{ or } (x_i = x_j \text{ and } i > j)\}$</span>.</p>
<p>Which statement is true?</p></div>
<form class="problem-options" data-question-id="vertex-cover-rounding-part-C" data-correct="D" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="vertex-cover-rounding-part-C" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>This does not work, because we might report an invalid solution.</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="vertex-cover-rounding-part-C" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>This gives a valid solution, but the approximation ratio becomes worse.</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="vertex-cover-rounding-part-C" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>This gives a valid solution, and the solution is always exactly the same as in the original rounding scheme.</p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="vertex-cover-rounding-part-C" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p>This gives a valid solution. We sometimes report a better solution than in the original rounding scheme, but the approximation ratio is still strictly greater than 1.999 in the worst case.</p>
</span>
</label>
<label class="option-label" data-label="E">
<input type="radio" name="vertex-cover-rounding-part-C" value="E" />
<span class="option-marker">E</span>
<span class="option-text"><p>This gives a valid solution, and the approximation ratio becomes <span class="katex-inline">$3/2$</span>.</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="vertex-cover-rounding-part-C">
<strong>Solution:</strong> <p><strong>Part A:</strong> Validity is preserved since every edge has <span class="katex-inline">$x_i+x_j\ge 1$</span>, so at least one endpoint is at least <span class="katex-inline">$1/2$</span>, and therefore at least <span class="katex-inline">$1/3$</span>.  <br />The cost bound becomes <span class="katex-inline">$w(C)\le 3\sum_i w(v_i)x_i$</span>, giving a 3-approximation.</p>
<p><strong>Part B:</strong> Validity can fail: if an edge has LP values <span class="katex-inline">$(1/2,1/2)$</span>, neither endpoint is selected by a <span class="katex-inline">$2/3$</span> threshold.</p>
<p><strong>Part C:</strong> This rule always covers each edge (one endpoint is chosen per edge), and selected vertices always satisfy <span class="katex-inline">$x_i\ge 1/2$</span>, so it can improve over standard threshold rounding on some instances.  <br />However, the worst-case approximation guarantee remains essentially 2 (it can still be above 1.999).</p>
</div>
</div>
</div>
