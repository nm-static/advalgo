---
title: "Marbles Elimination"
description: "NP-Hardness problem"
section: problems
pagefind: true
---

<div class="problem-content" data-problem-id="marbles">
<div class="problem-body"><p><em>Marbles</em> is a solitaire game played on an undirected graph <span class="katex-inline">$G$</span>, where each vertex has zero or more marbles. A single move in this game consists of removing two marbles from a vertex <span class="katex-inline">$v$</span> and adding one marble to an arbitrary neighbor of <span class="katex-inline">$v$</span>. Note that the vertex <span class="katex-inline">$v$</span> must have at least two marbles on it before the move.</p>
<p>The <strong>Marbles Elimination</strong> problem asks: given a graph <span class="katex-inline">$G=(V, E)$</span> and a marble count <span class="katex-inline">$p(v)$</span> for each vertex <span class="katex-inline">$v$</span>, is there a sequence of valid moves that removes all but one marble?</p>
<p><strong>Example:</strong> Consider a triangle graph with vertices <span class="katex-inline">$A, B, C$</span> and edges <span class="katex-inline">$\{A,B\}, \{B,C\}, \{C,A\}$</span>.</p>
<p>If we start with marbles <span class="katex-inline">$A=2, B=1, C=1$</span> (total = 4):</p>
<ol><li>Move from <span class="katex-inline">$A$</span> to <span class="katex-inline">$B$</span>: now <span class="katex-inline">$A=0, B=2, C=1$</span></li><li>Move from <span class="katex-inline">$B$</span> to <span class="katex-inline">$C$</span>: now <span class="katex-inline">$A=0, B=0, C=2$</span></li><li>Move from <span class="katex-inline">$C$</span> to <span class="katex-inline">$A$</span>: now <span class="katex-inline">$A=1, B=0, C=0$</span></li></ol>
<p>We end with exactly 1 marble.</p></div>
<div class="problem-part" id="marbles-part-A">
<h4>Part A</h4>
<div class="part-body"><p>Consider a <strong>path graph</strong> <span class="katex-inline">$P_4$</span> with vertices <span class="katex-inline">$A - B - C - D$</span> (edges <span class="katex-inline">$\{A,B\}, \{B,C\}, \{C,D\}$</span>).</p>
<p>Starting configuration: <span class="katex-inline">$A=1, B=2, C=1, D=1$</span> (total = 5 marbles).</p>
<p>Can the game be won (reduced to exactly 1 marble)?</p></div>
<form class="problem-options" data-question-id="marbles-part-A" data-correct="B" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="marbles-part-A" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>Yes</p>
<span class="option-feedback hidden"><p>Try simulating the moves. After a few moves, you'll find yourself stuck with multiple marbles but no vertex having 2 or more.</p></span>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="marbles-part-A" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>No</p>
<span class="option-feedback hidden"><p>Correct! The path <span class="katex-inline">$P_4$</span> has no Hamiltonian cycle. Any move sequence eventually leaves marbles stranded on vertices with no way to combine them.</p></span>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="marbles-part-A">
<strong>Solution:</strong> <p>No matter how we play, we get stuck. For example:</p>
<ul><li>Move <span class="katex-inline">$B \to C$</span>: <span class="katex-inline">$A=1, B=0, C=2, D=1$</span></li><li>Move <span class="katex-inline">$C \to D$</span>: <span class="katex-inline">$A=1, B=0, C=0, D=2$</span></li><li>Move <span class="katex-inline">$D \to C$</span>: <span class="katex-inline">$A=1, B=0, C=1, D=0$</span></li></ul>
<p>Now we have 2 marbles but no vertex has <span class="katex-inline">$\geq 2$</span> marbles — stuck! The path graph has no Hamiltonian cycle, which is essential for the elimination to work.</p>
</div>
</div>
<div class="problem-part" id="marbles-part-B">
<h4>Part B</h4>
<div class="part-body"><p>Consider a <strong>cycle graph</strong> <span class="katex-inline">$C_4$</span> with vertices <span class="katex-inline">$A - B - C - D - A$</span> (edges <span class="katex-inline">$\{A,B\}, \{B,C\}, \{C,D\}, \{D,A\}$</span>).</p>
<p>Starting configuration: <span class="katex-inline">$A=2, B=1, C=1, D=1$</span> (total = 5 marbles).</p>
<p>Can the game be won (reduced to exactly 1 marble)?</p></div>
<form class="problem-options" data-question-id="marbles-part-B" data-correct="A" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="marbles-part-B" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>Yes</p>
<span class="option-feedback hidden"><p>Correct! The cycle <span class="katex-inline">$C_4$</span> has a Hamiltonian cycle, so we can &quot;push&quot; the marbles around the cycle until only one remains.</p></span>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="marbles-part-B" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>No</p>
<span class="option-feedback hidden"><p>The cycle graph does have a Hamiltonian cycle. Try following the cycle with your moves.</p></span>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="marbles-part-B">
<strong>Solution:</strong> <p>Yes! Follow the Hamiltonian cycle:</p>
<ol><li>Move <span class="katex-inline">$A \to B$</span>: <span class="katex-inline">$A=0, B=2, C=1, D=1$</span></li><li>Move <span class="katex-inline">$B \to C$</span>: <span class="katex-inline">$A=0, B=0, C=2, D=1$</span></li><li>Move <span class="katex-inline">$C \to D$</span>: <span class="katex-inline">$A=0, B=0, C=0, D=2$</span></li><li>Move <span class="katex-inline">$D \to A$</span>: <span class="katex-inline">$A=1, B=0, C=0, D=0$</span></li></ol>
<p>We end with exactly 1 marble on <span class="katex-inline">$A$</span>.</p>
</div>
</div>
<div class="problem-part" id="marbles-part-C">
<h4>Part C</h4>
<div class="part-body"><p>Consider the general <strong>Marbles Elimination</strong> decision problem with the following setup:</p>
<ul><li><strong>Input:</strong> A graph <span class="katex-inline">$G$</span> with <span class="katex-inline">$n$</span> vertices, where one designated vertex <span class="katex-inline">$w$</span> has 2 marbles and all other vertices have 1 marble each.</li><li><strong>Output:</strong> TRUE if we can reduce to exactly 1 marble, FALSE otherwise.</li></ul>
<p>What is the complexity of this problem?</p></div>
<form class="problem-options" data-question-id="marbles-part-C" data-correct="B" data-type="mcq">
<div class="options-list">
<label class="option-label" data-label="A">
<input type="radio" name="marbles-part-C" value="A" />
<span class="option-marker">A</span>
<span class="option-text"><p>The problem is solvable in polynomial time</p>
<span class="option-feedback hidden"><p>This would imply Hamiltonian Cycle is in P, which is unlikely.</p></span>
</span>
</label>
<label class="option-label" data-label="B">
<input type="radio" name="marbles-part-C" value="B" />
<span class="option-marker">B</span>
<span class="option-text"><p>The problem is NP-complete</p>
<span class="option-feedback hidden"><p>Correct! It reduces from Hamiltonian Cycle: the game can be won if and only if the graph has a Hamiltonian cycle starting and ending at <span class="katex-inline">$w$</span>.</p></span>
</span>
</label>
<label class="option-label" data-label="C">
<input type="radio" name="marbles-part-C" value="C" />
<span class="option-marker">C</span>
<span class="option-text"><p>The problem is in P but not known to be NP-complete</p>
<span class="option-feedback hidden"><p>The reduction from Hamiltonian Cycle shows it's NP-hard.</p></span>
</span>
</label>
<label class="option-label" data-label="D">
<input type="radio" name="marbles-part-C" value="D" />
<span class="option-marker">D</span>
<span class="option-text"><p>The problem is not in NP</p>
<span class="option-feedback hidden"><p>The problem is in NP: a certificate is the sequence of moves, verifiable in polynomial time.</p></span>
</span>
</label>
</div>
<div class="problem-actions">
<button type="button" class="check-answer-btn">Check Answer</button>
<span class="answer-feedback"></span>
</div>
</form>
<div class="solution hidden" data-for="marbles-part-C">
<strong>Solution:</strong> <p><strong>NP-completeness proof:</strong></p>
<p><em>In NP:</em> A certificate is the sequence of moves. We can verify in polynomial time that each move is valid and that we end with 1 marble.</p>
<p><em>NP-hard (reduction from Hamiltonian Cycle):</em> Given graph <span class="katex-inline">$G$</span>, pick any vertex <span class="katex-inline">$w$</span> and set <span class="katex-inline">$p(w)=2$</span>, <span class="katex-inline">$p(v)=1$</span> for all <span class="katex-inline">$v \neq w$</span>.</p>
<p><strong>If <span class="katex-inline">$G$</span> has a Hamiltonian cycle</strong> <span class="katex-inline">$w = v_1, v_2, \ldots, v_n, v_1$</span>: Move from <span class="katex-inline">$v_1$</span> to <span class="katex-inline">$v_2$</span>, from <span class="katex-inline">$v_2$</span> to <span class="katex-inline">$v_3$</span>, etc. After <span class="katex-inline">$n$</span> moves, exactly 1 marble remains at <span class="katex-inline">$w$</span>.</p>
<p><strong>If we can eliminate to 1 marble:</strong> Each move reduces the count by 1 and transfers a marble along an edge. Starting with <span class="katex-inline">$n+1$</span> marbles, we need <span class="katex-inline">$n$</span> moves. The sequence of moves traces a walk that visits each vertex (to collect its marble) and returns to <span class="katex-inline">$w$</span> — a Hamiltonian cycle.</p>
</div>
</div>
<details class="problem-hints">
<summary>Hints</summary>
<ol>
<li><p>Try a few move sequences. What happens when marbles get pushed to the endpoints?</p></li>
<li><p>Follow the cycle: move from <span class="katex-inline">$A$</span> to <span class="katex-inline">$B$</span>, then from <span class="katex-inline">$B$</span> to <span class="katex-inline">$C$</span>, and so on.</p></li>
</ol></details>
</div>
