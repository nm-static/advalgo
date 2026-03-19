---
title: "Randomized Min-Cut Analysis"
description: "Randomized Algorithms problem"
section: problems
pagefind: true
---

<div class="problem-content" data-problem-id="randomized-min-cut">
<div class="problem-body"><p><strong>Karger's Min-Cut Algorithm</strong> finds a minimum cut in an undirected multigraph <span class="katex-inline">$G = (V, E)$</span> with <span class="katex-inline">$n$</span> vertices:</p>
<pre><code>while |V| &gt; 2:
    Pick an edge (u, v) uniformly at random
    Contract (u, v): merge u and v into a single vertex
    Remove all self-loops
return the edges between the two remaining vertices</code></pre>
<p>Recall from the analysis that the probability of finding a <em>specific</em> minimum cut <span class="katex-inline">$C$</span> in a single run is at least <span class="katex-inline">$\frac{2}{n(n-1)} = \frac{1}{\binom{n}{2}}$</span>.</p></div>
<div class="problem-part" id="randomized-min-cut-part-A">
<h4>Part A</h4>
<div class="part-body"><p>A graph may have several different minimum cut sets. Using the analysis of the randomized min-cut algorithm, what is the maximum number of distinct min-cut sets that a graph with <span class="katex-inline">$n$</span> vertices can have?</p></div>
<form class="problem-options" data-question-id="randomized-min-cut-part-A" data-correct="C" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="randomized-min-cut-part-A" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>At most <span class="katex-inline">$n$</span></p>
<span class="option-feedback hidden"><p>This bound is too small. Consider the cycle graph <span class="katex-inline">$C_n$</span>, which has more min-cuts than this.</p></span>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="randomized-min-cut-part-A" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>At most <span class="katex-inline">$2^n$</span></p>
<span class="option-feedback hidden"><p>This is way too large. The randomized analysis gives a much tighter bound.</p></span>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="randomized-min-cut-part-A" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>At most <span class="katex-inline">$\binom{n}{2} = \frac{n(n-1)}{2}$</span></p>
<span class="option-feedback hidden"><p>Correct! The probability argument implies this upper bound, and the cycle graph achieves it.</p></span>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="randomized-min-cut-part-A" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p>At most <span class="katex-inline">$n!$</span></p>
<span class="option-feedback hidden"><p>The bound is polynomial, not factorial.</p></span>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="randomized-min-cut-part-A">
<strong>Solution:</strong> <p>Let <span class="katex-inline">$C_1, C_2, \ldots, C_m$</span> be all distinct minimum cut sets in <span class="katex-inline">$G$</span>.</p>
<p><strong>Key observation:</strong> The events &quot;algorithm outputs <span class="katex-inline">$C_i$</span>&quot; are mutually exclusive (only one cut can be output per run).</p>
<p>From the analysis, <span class="katex-inline">$\Pr[\text{output } C_i] \geq \frac{2}{n(n-1)}$</span> for each <span class="katex-inline">$i$</span>.</p>
<p>Since probabilities of disjoint events sum to at most 1:<br /><div class="katex-display">$$\sum_{i=1}^{m} \Pr[\text{output } C_i] \leq 1$$</div><br /><div class="katex-display">$$m \cdot \frac{2}{n(n-1)} \leq 1$$</div><br /><div class="katex-display">$$m \leq \frac{n(n-1)}{2} = \binom{n}{2}$$</div></p>
<p><strong>Tight example:</strong> The cycle graph <span class="katex-inline">$C_n$</span> achieves this bound. Every pair of edges forms a min-cut (of size 2), and there are exactly <span class="katex-inline">$\binom{n}{2}$</span> such pairs.</p>
</div>
</div>
<div class="problem-part" id="randomized-min-cut-part-B">
<h4>Part B</h4>
<div class="part-body"><p>An <strong><span class="katex-inline">$r$</span>-way cut-set</strong> is a set of edges whose removal breaks the graph into <span class="katex-inline">$r$</span> or more connected components. The randomized min-cut algorithm can be adapted to find minimum <span class="katex-inline">$r$</span>-way cut-sets by contracting until <span class="katex-inline">$r$</span> vertices remain (instead of 2).</p>
<p>What is the probability that this adapted algorithm finds a specific minimum <span class="katex-inline">$r$</span>-way cut in one iteration?</p></div>
<form class="problem-options" data-question-id="randomized-min-cut-part-B" data-correct="B" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="randomized-min-cut-part-B" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>At least <span class="katex-inline">$\frac{1}{n^r}$</span></p>
<span class="option-feedback hidden"><p>The bound involves binomial coefficients, not powers.</p></span>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="randomized-min-cut-part-B" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>At least <span class="katex-inline">$\frac{1}{\binom{n}{r}}$</span></p>
<span class="option-feedback hidden"><p>Correct! The analysis generalizes: we need to avoid contracting cut edges for <span class="katex-inline">$n - r$</span> steps.</p></span>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="randomized-min-cut-part-B" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>At least <span class="katex-inline">$\frac{r}{n(n-1)}$</span></p>
<span class="option-feedback hidden"><p>This doesn't correctly generalize the 2-way cut analysis.</p></span>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="randomized-min-cut-part-B" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p>At least <span class="katex-inline">$\frac{2}{n^2}$</span> regardless of <span class="katex-inline">$r$</span></p>
<span class="option-feedback hidden"><p>The bound depends on <span class="katex-inline">$r$</span>; larger <span class="katex-inline">$r$</span> gives higher success probability.</p></span>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="randomized-min-cut-part-B">
<strong>Solution:</strong> <p><strong>Adapted algorithm:</strong> Contract until <span class="katex-inline">$r$</span> vertices remain. The edges between the <span class="katex-inline">$r$</span> remaining super-vertices form an <span class="katex-inline">$r$</span>-way cut.</p>
<p><strong>Analysis:</strong> Let <span class="katex-inline">$C$</span> be a minimum <span class="katex-inline">$r$</span>-way cut of size <span class="katex-inline">$k$</span>. Every vertex has degree <span class="katex-inline">$\geq k$</span> (otherwise removing fewer edges could separate it).</p>
<p>At step <span class="katex-inline">$i$</span> (with <span class="katex-inline">$n - i$</span> vertices remaining), we need <span class="katex-inline">$n - i > r$</span>:<br /><div class="katex-display">$$\Pr[\text{don't cut } C] \geq \frac{n - i - r}{n - i}$$</div></p>
<p>The algorithm runs for <span class="katex-inline">$n - r$</span> contraction steps (reducing from <span class="katex-inline">$n$</span> to <span class="katex-inline">$r$</span> vertices).</p>
<p><strong>Success probability:</strong><br /><div class="katex-display">$$\prod_{i=0}^{n-r-1} \frac{n-i-r}{n-i} = \frac{(n-r)(n-r-1)\cdots 2 \cdot 1}{n(n-1)\cdots(r+1)}$$</div><br /><div class="katex-display">$$= \frac{(n-r)!}{n!/(r!)} \cdot \frac{1}{r!} \cdot r! = \frac{(n-r)! \cdot r!}{n!} = \frac{1}{\binom{n}{r}}$$</div></p>
<p><strong>Note:</strong> For <span class="katex-inline">$r = 2$</span>, this gives <span class="katex-inline">$\frac{1}{\binom{n}{2}} = \frac{2}{n(n-1)}$</span>, matching the original analysis.</p>
<p><strong>Implication:</strong> Larger <span class="katex-inline">$r$</span> means higher success probability (since <span class="katex-inline">$\binom{n}{r}$</span> is largest around <span class="katex-inline">$r = n/2$</span>). Finding 3-way cuts is easier than 2-way cuts!</p>
</div>
</div>
<details class="problem-hints">
<summary>Hints</summary>
<ol>
<li><p>If there were more than <span class="katex-inline">$\binom{n}{2}$</span> distinct min-cuts, what would that imply about the sum of their individual success probabilities?</p></li>
<li><p>Generalize the original analysis: at step <span class="katex-inline">$i$</span>, the probability of not contracting a cut edge is <span class="katex-inline">$\frac{n-i-r}{n-i}$</span> (instead of <span class="katex-inline">$\frac{n-i-2}{n-i}$</span>).</p></li>
</ol></details>
</div>
