---
title: "Eternal Vertex Cover Approximation"
description: "Approximation Algorithms problem"
section: problems
pagefind: true
---

<div class="problem-content" data-problem-id="evc-approximation">
<div class="problem-body"><p>In the eternal vertex cover problem, policewomen occupy vertices of a graph (CandyLand). When an edge is attacked, at least one endpoint must currently have a policewoman and one endpoint policewoman must traverse the attacked edge. Other policewomen may move to neighboring vertices (at most one step). Lata succeeds if she can defend forever against any attack sequence.</p>
<p><img src="/images/problems/approximation-algorithms/4-cycle.png" alt="A 4-cycle graph representing CandyLand" /></p></div>
<div class="problem-part" id="evc-approximation-part-A">
<h4>Part A</h4>
<div class="part-body"><p>Suppose Lata figures out a way of placing policemen so that no matter where the Demon attacks, Lata can move the policewomen to protect the city. In other words, Lata has managed to find a configuration that keeps the city safe against one attack. Consider the vertices occupied by policewomen. This subset of vertices forms a:</p></div>
<form class="problem-options" data-question-id="evc-approximation-part-A" data-correct="A" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="evc-approximation-part-A" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>Vertex Cover</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="evc-approximation-part-A" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>Independent Set</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="evc-approximation-part-A" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>Matching</p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="evc-approximation-part-A" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p>Clique</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="evc-approximation-part-A">
<strong>Solution:</strong> <p>This is a vertex cover because if not, then there is an  uncovered edge, which is susceptible to an attack</p>
</div>
</div>
<div class="problem-part" id="evc-approximation-part-B">
<h4>Part B</h4>
<div class="part-body"><p>Suppose the graph of Candyland is a path on seven vertices <span class="katex-inline">$v_1, \ldots, v_7$</span> and Lata places three policewomen on the vertices <span class="katex-inline">$v_2, v_4, v_6$</span>. What is the minimum number of attacks the Demon needs to destroy Candyland?</p></div>
<form class="problem-options" data-question-id="evc-approximation-part-B" data-correct="B" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="evc-approximation-part-B" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>1</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="evc-approximation-part-B" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>2</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="evc-approximation-part-B" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>3</p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="evc-approximation-part-B" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p>4</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
</div>
<div class="problem-part" id="evc-approximation-part-C">
<h4>Part C</h4>
<div class="part-body"><p>Suppose the city of CandyLand has 6 houses which are connected by roads as shown in the image below and Lata has placed the policewomen placed at houses A, D and F (as shown in the image), what is the smallest number of attacks in which the Demon is able to destroy the city?</p>
<p><img src="/images/problems/approximation-algorithms/house-graph.png" alt="Question diagram" /></p></div>
<form class="problem-options" data-question-id="evc-approximation-part-C" data-correct="C" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="evc-approximation-part-C" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>1</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="evc-approximation-part-C" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>2</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="evc-approximation-part-C" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>3</p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="evc-approximation-part-C" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p>4</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
</div>
<div class="problem-part" id="evc-approximation-part-D">
<h4>Part D</h4>
<div class="part-body"><p>Suppose Lata finds a maximal matching <span class="katex-inline">$M$</span> the Candyland graph and places a policewoman on each of the houses corresponding to both endpoints of the edges <span class="katex-inline">$M$</span>. Can she defend attacks from the Demon forever if she does this?</p></div>
<form class="problem-options" data-question-id="evc-approximation-part-D" data-correct="B" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="evc-approximation-part-D" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>Yes</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="evc-approximation-part-D" value="B" />
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
</div>
<div class="problem-part" id="evc-approximation-part-E">
<h4>Part E</h4>
<div class="part-body"><p>Suppose Lata finds a maximum matching <span class="katex-inline">$M$</span> the Candyland graph and places a policewoman on each of the houses corresponding to both endpoints of the edges <span class="katex-inline">$M$</span>. Can she defend attacks from the Demon forever if she does this?</p></div>
<form class="problem-options" data-question-id="evc-approximation-part-E" data-correct="A" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="evc-approximation-part-E" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>Yes</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="evc-approximation-part-E" value="B" />
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
</div>
<div class="problem-part" id="evc-approximation-part-F">
<h4>Part F</h4>
<div class="part-body"><p>Suppose we are interested in the smallest number of policewomen that Lata needs to deploy to keep Candyland safe forever. Then:</p></div>
<form class="problem-options" data-question-id="evc-approximation-part-F" data-correct="C" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="evc-approximation-part-F" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>Having policewomen positioned at both endpoints of a maximal matching is a valid solution and a <span class="katex-inline">$2$</span>-approximation.</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="evc-approximation-part-F" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>Having policewomen positioned at both endpoints of a maximal matching is a valid solution, but this is not a <span class="katex-inline">$2$</span>-approximation.</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="evc-approximation-part-F" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>Having policewomen positioned at both endpoints of a maximum matching is a valid solution and a <span class="katex-inline">$2$</span>-approximation.</p>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="evc-approximation-part-F" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p>Having policewomen positioned at both endpoints of a maximum matching is a valid solution, but this is not a <span class="katex-inline">$2$</span>-approximation.</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
</div>
</div>
