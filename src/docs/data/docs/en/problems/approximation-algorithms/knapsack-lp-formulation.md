---
title: "Knapsack LP Formulation"
description: "Approximation Algorithms problem"
section: problems
pagefind: true
---

<div class="problem-content" data-problem-id="knapsack-lp-formulation">
<div class="problem-body"><p>A student proposes a 0/1-LP for knapsack using decision variables <span class="katex-inline">$y_i \in \{0,1\}$</span>, constraint <span class="katex-inline">$\sum_i \text{weight}(x_i) y_i \le W$</span>, and objective <span class="katex-inline">$\min \sum_i \text{value}(x_i) y_i$</span>. Determine whether this correctly models knapsack.</p>
<p>Does this 0/1-linear program correctly model the knapsack problem?</p></div>
<form class="problem-options" data-question-id="knapsack-lp-formulation" data-correct="B" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="knapsack-lp-formulation" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>Yes.</p>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="knapsack-lp-formulation" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>No, but if we maximize the objective function instead of minimizing it, we get a correct 0/1-LP formulation of the knapsack problem.</p>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="knapsack-lp-formulation" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>No, and changing the minimization to maximization does not help because the constraints are not linear.</p>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="knapsack-lp-formulation">
<strong>Solution:</strong> <p>Correct option: No, but if we maximize the objective function instead of minimizing it, we get a correct 0/1-LP formulation of the knapsack problem.</p>
</div>
</div>
