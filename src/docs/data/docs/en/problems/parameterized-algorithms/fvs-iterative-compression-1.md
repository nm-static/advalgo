---
title: "FVS Iterative Compression"
description: "Parameterized Algorithms problem"
section: problems
pagefind: true
---

<div class="problem-content" data-problem-id="fvs-iterative-compression-1">
<div class="problem-body"><p>In <strong>Feedback Vertex Set</strong>, we ask whether deleting at most <span class="katex-inline">$k$</span> vertices makes the graph acyclic. These questions focus on iterative compression and the disjoint forest subproblem, especially the degree-two reduction rule.</p>
<p><img src="/images/problems/parameterized-algorithms/graph.png" alt="FVS Iterative Compression Example" /></p></div>
<div class="problem-part" id="fvs-iterative-compression-1-part-A">
<h4>Part A</h4>
<div class="part-body"><p>How many times will the degree two rule be invoked, resulting in the removal of a vertex from the graph without including it in the solution?</p></div>
<form class="problem-options" data-question-id="fvs-iterative-compression-1-part-A" data-correct="D" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="fvs-iterative-compression-1-part-A" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>1</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="fvs-iterative-compression-1-part-A" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>2</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="fvs-iterative-compression-1-part-A" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>3</p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="fvs-iterative-compression-1-part-A" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p>4</p>
</span>
</label>
<label class="option-label" data-label="E">
<input type="radio" name="fvs-iterative-compression-1-part-A" value="E" />
<span class="option-marker">E</span>
<span class="option-text"><p>5</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
</div>
<div class="problem-part" id="fvs-iterative-compression-1-part-B">
<h4>Part B</h4>
<div class="part-body"><p>How many times will the degree two rule be invoked, resulting in the inclusion of the vertex involved in the solution?</p></div>
<form class="problem-options" data-question-id="fvs-iterative-compression-1-part-B" data-correct="A" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="fvs-iterative-compression-1-part-B" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>1</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="fvs-iterative-compression-1-part-B" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>2</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="fvs-iterative-compression-1-part-B" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>3</p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="fvs-iterative-compression-1-part-B" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p>4</p>
</span>
</label>
<label class="option-label" data-label="E">
<input type="radio" name="fvs-iterative-compression-1-part-B" value="E" />
<span class="option-marker">E</span>
<span class="option-text"><p>5</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
</div>
<div class="problem-part" id="fvs-iterative-compression-1-part-C">
<h4>Part C</h4>
<div class="part-body"><p>Assuming we process lower-indexed leaves first, which vertex is included in the final solution output by the algorithm?</p></div>
<form class="problem-options" data-question-id="fvs-iterative-compression-1-part-C" data-correct="E" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="fvs-iterative-compression-1-part-C" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>3</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="fvs-iterative-compression-1-part-C" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>4</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="fvs-iterative-compression-1-part-C" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>5</p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="fvs-iterative-compression-1-part-C" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p>6</p>
</span>
</label>
<label class="option-label" data-label="E">
<input type="radio" name="fvs-iterative-compression-1-part-C" value="E" />
<span class="option-marker">E</span>
<span class="option-text"><p>7</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
</div>
<div class="problem-part" id="fvs-iterative-compression-1-part-D">
<h4>Part D</h4>
<div class="part-body"><p>Does the algorithm encounter any branching in its run on this instance?</p></div>
<form class="problem-options" data-question-id="fvs-iterative-compression-1-part-D" data-correct="B" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="fvs-iterative-compression-1-part-D" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>Yes</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="fvs-iterative-compression-1-part-D" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>No</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="fvs-iterative-compression-1-part-D" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>Depends on the sequence in which leaves are processed</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="fvs-iterative-compression-1-part-D">
<strong>Solution:</strong> <p><strong>Part A:</strong> 4<br /><strong>Part B:</strong> 1<br /><strong>Part C:</strong> 7<br /><strong>Part D:</strong> No</p>
</div>
</div>
</div>
