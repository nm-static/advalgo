---
title: "Hitting Set Iterative Compression"
description: "Parameterized Algorithms problem"
section: problems
pagefind: true
---

<div class="problem-content" data-problem-id="hitting-set-iterative-compression">
<div class="problem-body"><p>In <strong><span class="katex-inline">$d$</span>-Hitting Set</strong>, we are given a universe <span class="katex-inline">$S$</span>, a family <span class="katex-inline">$C$</span> of subsets of size at most <span class="katex-inline">$d$</span>, and a budget <span class="katex-inline">$k$</span>. The task is to decide whether there is a hitting set <span class="katex-inline">$H \subseteq S$</span> with <span class="katex-inline">$|H| \le k$</span>. These questions explore iterative compression assuming a solver for <span class="katex-inline">$(d-1)$</span>-Hitting Set.</p></div>
<div class="problem-part" id="hitting-set-iterative-compression-part-A">
<h4>Part A</h4>
<div class="part-body"><p>Let <span class="katex-inline">$S = \{1,2,3,4,5,6,7,8,9\}$</span> be a set of elements, and let <span class="katex-inline">$C$</span> be the collection of subsets: <div class="katex-display">$$C = \{ \{1,2,3\}, \{2,3,4\}, \{3,4,5\}, \{1,4,5\}, \{2,6,7\}, \{1,7,8\}, \{3,8,9\}, \{2,5,9\}, \{1,6,9\}, \{3,6,8\}, \{2,4,8\}, \{1,5,7\} \}$$</div> Now, suppose we are given <span class="katex-inline">$X = \{1,2,3,7\}$</span> as a Hitting Set of size <span class="katex-inline">$4$</span> and we want to know if there is a hitting set <span class="katex-inline">$Y$</span> of size <span class="katex-inline">$3$</span>. Let us assume that <span class="katex-inline">$Y \cap X = \{1,2\}$</span>. Then we can throw away the sets that contain <span class="katex-inline">$1$</span> or <span class="katex-inline">$2$</span> from <span class="katex-inline">$C$</span>. What is the collection that remains?</p></div>
<form class="problem-options" data-question-id="hitting-set-iterative-compression-part-A" data-correct="C" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="hitting-set-iterative-compression-part-A" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p><span class="katex-inline">$\{\{3,4,5\}, \{2,6,7\}, \{3,4,8\}, \{3,5,7\}\}$</span></p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="hitting-set-iterative-compression-part-A" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p><span class="katex-inline">$\{\{3,4,5\}, \{3,6,7\}, \{3,7,8\}\}$</span></p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="hitting-set-iterative-compression-part-A" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p><span class="katex-inline">$\{\{3,4,5\}, \{3,8,9\}, \{3,6,8\}\}$</span></p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="hitting-set-iterative-compression-part-A" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p><span class="katex-inline">$\{\{3,4,5\}, \{3,8,9\}\}$</span></p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
</div>
<div class="problem-part" id="hitting-set-iterative-compression-part-B">
<h4>Part B</h4>
<div class="part-body"><p>Continuing from the example in the previous question, recall that we have <span class="katex-inline">$Y \cap X = \{1,2\}$</span>. Now, we want to know if there is a hitting set <span class="katex-inline">$Y$</span> of size <span class="katex-inline">$3$</span> overall. This will be the case if and only if:</p></div>
<form class="problem-options" data-question-id="hitting-set-iterative-compression-part-B" data-correct="B" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="hitting-set-iterative-compression-part-B" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>The family that remains after throwing away sets that contain either <span class="katex-inline">$1$</span> or <span class="katex-inline">$2$</span> must have a hitting set of size <span class="katex-inline">$1$</span>.</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="hitting-set-iterative-compression-part-B" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>The family that remains after throwing away sets that contain either <span class="katex-inline">$1$</span> or <span class="katex-inline">$2$</span> must have a hitting set of size <span class="katex-inline">$1$</span> that does not contain either <span class="katex-inline">$3$</span> or <span class="katex-inline">$7$</span>.</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="hitting-set-iterative-compression-part-B" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>The family that remains after throwing away sets that contain either <span class="katex-inline">$1$</span> or <span class="katex-inline">$2$</span> must have a hitting set of size <span class="katex-inline">$1$</span> that contains at most one of <span class="katex-inline">$3$</span> or <span class="katex-inline">$7$</span>.</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
</div>
<div class="problem-part" id="hitting-set-iterative-compression-part-C">
<h4>Part C</h4>
<div class="part-body"><p>Based on your answer to the previous question, simplify the leftover family from the first question to observe that solving the remaining problem is now equivalent to:</p></div>
<form class="problem-options" data-question-id="hitting-set-iterative-compression-part-C" data-correct="C" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="hitting-set-iterative-compression-part-C" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>Vertex Cover</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="hitting-set-iterative-compression-part-C" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p><span class="katex-inline">$d$</span>-Hitting Set on a smaller family</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="hitting-set-iterative-compression-part-C" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p><span class="katex-inline">$(d-1)$</span>-Hitting Set on a smaller family</p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="hitting-set-iterative-compression-part-C" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p><span class="katex-inline">$(d+1)$</span>-Hitting Set on a smaller family</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
</div>
<div class="problem-part" id="hitting-set-iterative-compression-part-D">
<h4>Part D</h4>
<div class="part-body"><p>For the example in the first question, we can extend the solution <span class="katex-inline">$\{1,2\}$</span> to a complete solution of size at most three if and only if:</p></div>
<form class="problem-options" data-question-id="hitting-set-iterative-compression-part-D" data-correct="A" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="hitting-set-iterative-compression-part-D" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>The sets <span class="katex-inline">$\{4,5\}$</span>, <span class="katex-inline">$\{8,9\}$</span> and <span class="katex-inline">$\{6,8\}$</span> have a single common element.</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="hitting-set-iterative-compression-part-D" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>The sets <span class="katex-inline">$\{4,5\}$</span>, <span class="katex-inline">$\{8,9\}$</span> and <span class="katex-inline">$\{6,8\}$</span> have a hitting set of size at most two</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
</div>
<div class="problem-part" id="hitting-set-iterative-compression-part-E">
<h4>Part E</h4>
<div class="part-body"><p>If we know how to solve <span class="katex-inline">$(d-1)$</span>-Hitting Set in time <span class="katex-inline">$O(c^k \cdot \text{poly}(n))$</span>, then we can solve <span class="katex-inline">$d$</span>-Hitting Set in time:</p></div>
<form class="problem-options" data-question-id="hitting-set-iterative-compression-part-E" data-correct="C" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="hitting-set-iterative-compression-part-E" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p><span class="katex-inline">$O(c^k \cdot \text{poly}(n))$</span></p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="hitting-set-iterative-compression-part-E" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p><span class="katex-inline">$O((c-1)^k \cdot \text{poly}(n))$</span></p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="hitting-set-iterative-compression-part-E" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p><span class="katex-inline">$O((c+1)^k \cdot \text{poly}(n))$</span></p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="hitting-set-iterative-compression-part-E">
<strong>Solution:</strong> <p><strong>Part A:</strong> <span class="katex-inline">$\{\{3,4,5\}, \{3,8,9\}, \{3,6,8\}\}$</span><br /><strong>Part B:</strong> The family that remains after throwing away sets that contain either <span class="katex-inline">$1$</span> or <span class="katex-inline">$2$</span> must have a hitting set of size <span class="katex-inline">$1$</span> that does not contain either <span class="katex-inline">$3$</span> or <span class="katex-inline">$7$</span>.<br /><strong>Part C:</strong> <span class="katex-inline">$(d-1)$</span>-Hitting Set on a smaller family<br /><strong>Part D:</strong> The sets <span class="katex-inline">$\{4,5\}$</span>, <span class="katex-inline">$\{8,9\}$</span> and <span class="katex-inline">$\{6,8\}$</span> have a single common element.<br /><strong>Part E:</strong> <span class="katex-inline">$O((c+1)^k \cdot \text{poly}(n))$</span></p>
</div>
</div>
</div>
