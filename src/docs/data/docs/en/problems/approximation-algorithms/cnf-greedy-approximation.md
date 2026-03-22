---
title: "CNF Greedy Approximation"
description: "Approximation Algorithms problem"
section: problems
pagefind: true
---

<div class="problem-content" data-problem-id="cnf-greedy-approximation">
<div class="problem-body"><p>We consider monotone 3-CNF formulas (exactly three non-negated literals per clause). Goal: set as few variables to TRUE as possible while satisfying all clauses. Greedy-CNF repeatedly picks any remaining clause, sets one variable in it to TRUE, and removes all clauses containing that variable.</p>
<p>What is the approximation ratio of this algorithm?</p></div>
<form class="problem-options" data-question-id="cnf-greedy-approximation" data-correct="D" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="cnf-greedy-approximation" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>This algorithm is always optimal.</p>
<span class="option-feedback hidden"><p>Consider the instance <span class="katex-inline">$(x,y_1,z_1), \ldots, (x,y_n,z_n)$</span> where the <span class="katex-inline">$z$</span>s are all distinct. What if greedy never picks <span class="katex-inline">$x$</span> or <span class="katex-inline">$y$</span>?</p></span>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="cnf-greedy-approximation" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>This algorithm is a 2-approximation.</p>
<span class="option-feedback hidden"><p>Consider the instance <span class="katex-inline">$(x,y_1,z_1), \ldots, (x,y_n,z_n)$</span> where the <span class="katex-inline">$z$</span>s are all distinct. What if greedy never picks <span class="katex-inline">$x$</span> or <span class="katex-inline">$y$</span>?</p></span>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="cnf-greedy-approximation" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>This algorithm is a <span class="katex-inline">$(n/2)$</span>-approximation.</p>
<span class="option-feedback hidden"><p>Consider the instance <span class="katex-inline">$(x,y_1,z_1), \ldots, (x,y_n,z_n)$</span> where the <span class="katex-inline">$z$</span>s are all distinct. What if greedy never picks <span class="katex-inline">$x$</span> or <span class="katex-inline">$y$</span>?</p></span>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="cnf-greedy-approximation" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p>The approximation ratio could be as bad as <span class="katex-inline">$n - 2$</span>.</p>
<span class="option-feedback hidden"><p>Indeed. Consider the instance <span class="katex-inline">$(x,y_1,z_1), \ldots, (x,y_n,z_n)$</span> where the <span class="katex-inline">$y$</span>s and <span class="katex-inline">$z$</span>s are all distinct. If greedy misses <span class="katex-inline">$x$</span> or <span class="katex-inline">$y$</span> it has to choose <span class="katex-inline">$k = n-2$</span> variables in the solution.</p></span>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="cnf-greedy-approximation">
<strong>Solution:</strong> <p>Correct option: Indeed, the approximation could be as bad as <span class="katex-inline">$n - 2$</span>. Consider the instance <span class="katex-inline">$(x,y,z_1), (x,y,z_2), \ldots, (x,y,z_k),$</span> where the <span class="katex-inline">$z$</span>s are all distinct. The total number of variables here is <span class="katex-inline">$n = k+2$</span>. What if greedy never picks <span class="katex-inline">$x$</span> or <span class="katex-inline">$y$</span>? On the one hand, the optimal solution is to clearly just set the variable <span class="katex-inline">$x$</span> to true, or the variable <span class="katex-inline">$y$</span> to true. On the other hand, the greedy algorithm may end up picking all the <span class="katex-inline">$z$</span> variables, which is a solution of size <span class="katex-inline">$k = n-2$</span>.</p>
</div>
</div>
