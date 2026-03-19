---
title: "Split Vertex Deletion"
description: "Parameterized Algorithms problem"
section: problems
pagefind: true
---

<div class="problem-content" data-problem-id="split-vertex-deletion">
<div class="problem-body"><p>A graph is a <strong>split graph</strong> if its vertices can be partitioned into a clique <span class="katex-inline">$C$</span> and an independent set <span class="katex-inline">$I$</span>. In Split Vertex Deletion, we ask whether deleting at most <span class="katex-inline">$k$</span> vertices can turn a given graph into a split graph. Recall the forbidden induced subgraph characterization: <span class="katex-inline">$C_5$</span>, <span class="katex-inline">$2K_2$</span>, and <span class="katex-inline">$C_4$</span>.</p>
<p><img src="/images/problems/parameterized-algorithms/forbidden-subgraphs.CWgqVNLZ_BsqW2.webp" alt="Forbidden induced subgraphs for split graphs" /></p></div>
<div class="problem-part" id="split-vertex-deletion-part-A">
<h4>Part A</h4>
<div class="part-body"><p>What is the running time of the exhaustive search algorithm for Split Vertex Deletion?</p></div>
<form class="problem-options" data-question-id="split-vertex-deletion-part-A" data-correct="D" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="split-vertex-deletion-part-A" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p><span class="katex-inline">$O(2^k \cdot \text{poly}(n))$</span></p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="split-vertex-deletion-part-A" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p><span class="katex-inline">$O(3^k \cdot \text{poly}(n))$</span></p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="split-vertex-deletion-part-A" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p><span class="katex-inline">$O(4^k \cdot \text{poly}(n))$</span></p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="split-vertex-deletion-part-A" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p><span class="katex-inline">$O(5^k \cdot \text{poly}(n))$</span></p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
</div>
<div class="problem-part" id="split-vertex-deletion-part-B">
<h4>Part B</h4>
<div class="part-body"><p>How many split partitions can a split graph on <span class="katex-inline">$n$</span> vertices have? Answer with the tightest bound that you can come up with.</p></div>
<form class="problem-options" data-question-id="split-vertex-deletion-part-B" data-correct="B" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="split-vertex-deletion-part-B" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>At most <span class="katex-inline">$n^2$</span> partitions</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="split-vertex-deletion-part-B" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>At most <span class="katex-inline">$O(n)$</span> partitions</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="split-vertex-deletion-part-B" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>At most <span class="katex-inline">$2^n$</span> partitions</p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="split-vertex-deletion-part-B" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p>At most <span class="katex-inline">$n!$</span> partitions</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
</div>
<div class="problem-part" id="split-vertex-deletion-part-C">
<h4>Part C</h4>
<div class="part-body"><p>What is the running time of the iterative compression algorithm for Split Vertex Deletion?</p></div>
<form class="problem-options" data-question-id="split-vertex-deletion-part-C" data-correct="A" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="split-vertex-deletion-part-C" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p><span class="katex-inline">$O(2^k \cdot \text{poly}(n))$</span></p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="split-vertex-deletion-part-C" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p><span class="katex-inline">$O(3^k \cdot \text{poly}(n))$</span></p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="split-vertex-deletion-part-C" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p><span class="katex-inline">$O(4^k \cdot \text{poly}(n))$</span></p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="split-vertex-deletion-part-C" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p><span class="katex-inline">$O(5^k \cdot \text{poly}(n))$</span></p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="split-vertex-deletion-part-C">
<strong>Solution:</strong> <p><strong>Part A:</strong> <span class="katex-inline">$O(5^k \cdot \text{poly}(n))$</span><br /><strong>Part B:</strong> At most <span class="katex-inline">$O(n)$</span> partitions<br /><strong>Part C:</strong> <span class="katex-inline">$O(2^k \cdot \text{poly}(n))$</span></p>
</div>
</div>
</div>
