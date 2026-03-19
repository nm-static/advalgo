---
title: "Vertex Cover LP Matrix Notation"
description: "Approximation Algorithms problem"
section: problems
pagefind: true
---

<div class="problem-content" data-problem-id="vertex-cover-lp-matrix-notation">
<div class="problem-body"><p>For weighted vertex cover, each edge <span class="katex-inline">$(v_i,v_j)$</span> contributes a constraint <span class="katex-inline">$x_i + x_j \ge 1$</span>. Suppose constraints are written as <span class="katex-inline">$A[x_1\ x_2\ x_3\ x_4\ x_5]^T \ge b$</span>, with row <span class="katex-inline">$i$</span> corresponding to edge <span class="katex-inline">$e_i$</span>.</p>
<p><img src="/images/problems/approximation-algorithms/graph.png" alt="Graph with 5 vertices and 6 edges showing vertex weights and edge labels" /></p>
<p>If row <span class="katex-inline">$i$</span> in matrix <span class="katex-inline">$A$</span> corresponds to the constraint created for edge <span class="katex-inline">$e_i$</span>, what would be the correct values of row 5?</p></div>
<form class="problem-options" data-question-id="vertex-cover-lp-matrix-notation" data-correct="A" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="vertex-cover-lp-matrix-notation" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p><span class="katex-inline">$0,1,0,0,1$</span></p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="vertex-cover-lp-matrix-notation" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p><span class="katex-inline">$0,4,0,0,10$</span></p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="vertex-cover-lp-matrix-notation" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p><span class="katex-inline">$1,1,0,0,0$</span></p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="vertex-cover-lp-matrix-notation" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p><span class="katex-inline">$5,4,0,0,0$</span></p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="vertex-cover-lp-matrix-notation">
<strong>Solution:</strong> <p>Correct option: <span class="katex-inline">$0,1,0,0,1$</span></p>
</div>
</div>
