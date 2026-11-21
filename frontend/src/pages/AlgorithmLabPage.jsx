import React, { useState, useEffect } from 'react';
import {
  Cpu,
  ArrowUpDown,
  Search,
  FileCode,
  Zap,
  Layers,
  LineChart as ChartIcon,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  AlertCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { api } from '../services/api';
import Badge from '../components/common/Badge';

export default function AlgorithmLabPage() {
  const [activeTab, setActiveTab] = useState('sorting');
  const [complexityTable, setComplexityTable] = useState([]);

  // --- 1. Sorting Tab State ---
  const [sortSize, setSortSize] = useState(500);
  const [sortResult, setSortResult] = useState(null);
  const [sortingLoading, setSortingLoading] = useState(false);

  // --- 2. Searching Tab State ---
  const [searchTarget, setSearchTarget] = useState(45000);
  const [searchDatasetSize, setSearchDatasetSize] = useState(1000);
  const [searchMode, setSearchMode] = useState('exact');
  const [minSalaryRange, setMinSalaryRange] = useState(30000);
  const [maxSalaryRange, setMaxSalaryRange] = useState(65000);
  const [searchResult, setSearchResult] = useState(null);
  const [searchingLoading, setSearchingLoading] = useState(false);

  // --- 3. String Matching Tab State ---
  const [matchPattern, setMatchPattern] = useState('React');
  const [matchText, setMatchText] = useState(
    'Seeking a Senior Full Stack Engineer proficient in React, Node.js, and modern React components. Hands-on experience with React Hooks is required.'
  );
  const [stringMatchResult, setStringMatchResult] = useState(null);
  const [stringMatchLoading, setStringMatchLoading] = useState(false);

  // --- 4. Greedy Selection State ---
  const [greedyBudget, setGreedyBudget] = useState(180); // minutes
  const [greedyStrategy, setGreedyStrategy] = useState('ratio'); // 'score', 'ratio', 'deadline'
  const [greedyResult, setGreedyResult] = useState(null);
  const [greedyLoading, setGreedyLoading] = useState(false);

  // --- 5. Dynamic Programming Tab State ---
  const [dpCapacity, setDpCapacity] = useState(180); // minutes
  const [dpResult, setDpResult] = useState(null);
  const [dpLoading, setDpLoading] = useState(false);

  // --- 6. Performance Benchmarking State ---
  const [benchmarkResults, setBenchmarkResults] = useState(null);
  const [benchmarkLoading, setBenchmarkLoading] = useState(false);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const res = await api.getMetrics();
        if (res.success) setComplexityTable(res.data);
      } catch (e) {
        console.error(e);
      }
    }
    loadMetrics();
  }, []);

  // --- Algorithm Handlers ---
  const runSortingExperiment = async () => {
    try {
      setSortingLoading(true);
      const res = await api.runSort({ datasetSize: sortSize, algorithm: 'both' });
      if (res.success) setSortResult(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setSortingLoading(false);
    }
  };

  const runSearchingExperiment = async () => {
    try {
      setSearchingLoading(true);
      const res = await api.runSearch({
        datasetSize: searchDatasetSize,
        targetSalary: searchTarget,
        mode: searchMode,
        minSalary: minSalaryRange,
        maxSalary: maxSalaryRange
      });
      if (res.success) setSearchResult(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setSearchingLoading(false);
    }
  };

  const runStringMatchExperiment = async () => {
    try {
      setStringMatchLoading(true);
      const res = await api.runStringMatch({ text: matchText, pattern: matchPattern });
      if (res.success) setStringMatchResult(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setStringMatchLoading(false);
    }
  };

  const runGreedyExperiment = async () => {
    try {
      setGreedyLoading(true);
      const res = await api.runGreedy({ timeBudgetMinutes: greedyBudget, strategy: greedyStrategy });
      if (res.success) setGreedyResult(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setGreedyLoading(false);
    }
  };

  const runKnapsackExperiment = async () => {
    try {
      setDpLoading(true);
      const res = await api.runKnapsack({ capacityMinutes: dpCapacity, compareWithGreedy: true });
      if (res.success) setDpResult(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setDpLoading(false);
    }
  };

  const runBenchmarkSuite = async () => {
    try {
      setBenchmarkLoading(true);
      const res = await api.runBenchmark({ type: 'all' });
      if (res.success) setBenchmarkResults(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setBenchmarkLoading(false);
    }
  };

  const tabs = [
    { id: 'sorting', label: '1. Sorting', icon: ArrowUpDown },
    { id: 'searching', label: '2. Searching', icon: Search },
    { id: 'stringMatching', label: '3. String Matching (KMP)', icon: FileCode },
    { id: 'greedy', label: '4. Greedy Selection', icon: Zap },
    { id: 'dp', label: '5. Dynamic Programming', icon: Layers },
    { id: 'benchmark', label: '6. Performance Analysis', icon: ChartIcon }
  ];

  return (
    <div className="space-y-6 animate-in fade-in pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 lg:p-8 shadow-xl relative overflow-hidden">
        <div className="space-y-2 z-10 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Algorithmic Laboratory</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
            Design and Analysis of Algorithms (DAA) Lab
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Live empirical verification of Merge Sort $O(n \log n)$ vs Bubble Sort $O(n^2)$, Binary
            Search $O(\log n)$ vs Linear Search $O(n)$, Knuth-Morris-Pratt $O(n+m)$ vs Naive string
            matching, and 0/1 Knapsack Dynamic Programming vs Greedy Heuristics.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-all ${
                isActive
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: SORTING (Bubble Sort vs Merge Sort) */}
      {/* ========================================================= */}
      {activeTab === 'sorting' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Sorting Algorithm Experiment</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Compare Merge Sort (Divide-and-Conquer) against Bubble Sort on identical synthetic job datasets.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700">Dataset Size (N):</span>
                <select
                  value={sortSize}
                  onChange={(e) => setSortSize(parseInt(e.target.value, 10))}
                  className="px-3 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-xl"
                >
                  <option value="100">N = 100 jobs</option>
                  <option value="500">N = 500 jobs</option>
                  <option value="1000">N = 1,000 jobs</option>
                  <option value="2500">N = 2,500 jobs</option>
                  <option value="4000">N = 4,000 jobs (O(n²) divergence)</option>
                </select>
              </div>

              <button
                onClick={runSortingExperiment}
                disabled={sortingLoading}
                className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{sortingLoading ? 'Executing Sorts...' : 'Run Live Experiment'}</span>
              </button>
            </div>

            {sortResult && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Merge Sort Card */}
                  <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-emerald-950">Merge Sort (Manual)</span>
                      <Badge variant="success" size="xs">O(n log n)</Badge>
                    </div>
                    <div className="space-y-1.5 text-xs text-emerald-900">
                      <div className="flex justify-between">
                        <span>Execution Time:</span>
                        <strong className="text-emerald-700 text-sm font-black">
                          {sortResult.mergeSort.executionTimeMs} ms
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Comparisons Count:</span>
                        <strong>{sortResult.mergeSort.comparisons.toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Merge Operations:</span>
                        <strong>{sortResult.mergeSort.mergeOperations?.toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Bubble Sort Card */}
                  <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-rose-950">Bubble Sort (Baseline)</span>
                      <Badge variant="danger" size="xs">O(n²)</Badge>
                    </div>
                    <div className="space-y-1.5 text-xs text-rose-900">
                      <div className="flex justify-between">
                        <span>Execution Time:</span>
                        <strong className="text-rose-700 text-sm font-black">
                          {sortResult.bubbleSort.executionTimeMs} ms
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Comparisons Count:</span>
                        <strong>{sortResult.bubbleSort.comparisons.toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Swaps Count:</span>
                        <strong>{sortResult.bubbleSort.swaps?.toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sorted Sample Output Preview */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Top 5 Sorted Jobs Sample (Ranked Descending)
                  </h4>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono space-y-1 overflow-x-auto">
                    {sortResult.mergeSort.sorted?.slice(0, 5).map((j, i) => (
                      <div key={i} className="text-slate-700">
                        #{i + 1} | Score: <strong>{j.score}</strong> | {j.title} ({j.companyName}) — Salary: ₹{j.salaryMin}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: SEARCHING (Linear vs Binary Search) */}
      {/* ========================================================= */}
      {activeTab === 'searching' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Searching Algorithm Experiment</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Demonstrates logarithmic search efficiency: Binary Search $O(\log n)$ cuts search space in half each step compared to Linear Search $O(n)$.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Search Mode</label>
                <select
                  value={searchMode}
                  onChange={(e) => setSearchMode(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl font-medium"
                >
                  <option value="exact">Exact Salary Target</option>
                  <option value="range">Salary Range [Min, Max]</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Dataset Size (N)</label>
                <select
                  value={searchDatasetSize}
                  onChange={(e) => setSearchDatasetSize(parseInt(e.target.value, 10))}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl font-medium"
                >
                  <option value="500">N = 500</option>
                  <option value="2000">N = 2,000</option>
                  <option value="5000">N = 5,000</option>
                  <option value="10000">N = 10,000</option>
                </select>
              </div>

              {searchMode === 'exact' ? (
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Target Salary (₹)</label>
                  <input
                    type="number"
                    step="5000"
                    value={searchTarget}
                    onChange={(e) => setSearchTarget(parseInt(e.target.value, 10))}
                    className="w-full p-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Min Salary (₹)</label>
                    <input
                      type="number"
                      step="5000"
                      value={minSalaryRange}
                      onChange={(e) => setMinSalaryRange(parseInt(e.target.value, 10))}
                      className="w-full p-2 bg-white border border-slate-200 rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Max Salary (₹)</label>
                    <input
                      type="number"
                      step="5000"
                      value={maxSalaryRange}
                      onChange={(e) => setMaxSalaryRange(parseInt(e.target.value, 10))}
                      className="w-full p-2 bg-white border border-slate-200 rounded-xl font-bold"
                    />
                  </div>
                </>
              )}

              <div className="flex items-end">
                <button
                  onClick={runSearchingExperiment}
                  disabled={searchingLoading}
                  className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Execute Search</span>
                </button>
              </div>
            </div>

            {searchResult && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Linear Search Card */}
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-amber-950">Linear Search</span>
                    <Badge variant="warning" size="xs">O(n)</Badge>
                  </div>
                  <div className="space-y-1.5 text-xs text-amber-900">
                    <div className="flex justify-between">
                      <span>Comparisons Required:</span>
                      <strong className="text-amber-800 text-sm font-black">
                        {(searchResult.linearSearch?.comparisons || searchResult.linearRangeSearch?.comparisons)} ops
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Execution Time:</span>
                      <strong>{(searchResult.linearSearch?.executionTimeMs || searchResult.linearRangeSearch?.executionTimeMs)} ms</strong>
                    </div>
                  </div>
                </div>

                {/* Binary Search Card */}
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-emerald-950">Binary Search</span>
                    <Badge variant="success" size="xs">O(log n)</Badge>
                  </div>
                  <div className="space-y-1.5 text-xs text-emerald-900">
                    <div className="flex justify-between">
                      <span>Comparisons Required:</span>
                      <strong className="text-emerald-700 text-sm font-black">
                        {(searchResult.binarySearchIterative?.comparisons || searchResult.binaryRangeSearch?.comparisons)} ops
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Execution Time:</span>
                      <strong>{(searchResult.binarySearchIterative?.executionTimeMs || searchResult.binaryRangeSearch?.executionTimeMs)} ms</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: STRING MATCHING (KMP vs Naive) */}
      {/* ========================================================= */}
      {activeTab === 'stringMatching' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Knuth-Morris-Pratt (KMP) String Matching
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                KMP precomputes the Longest Proper Prefix which is also Suffix (LPS array) in $O(m)$ time, eliminating redundant character comparisons during search.
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Search Pattern (P)</label>
                <input
                  type="text"
                  value={matchPattern}
                  onChange={(e) => setMatchPattern(e.target.value)}
                  placeholder="e.g. React, Python, Algorithm..."
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Corpus Text (T)</label>
                <textarea
                  value={matchText}
                  onChange={(e) => setMatchText(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800"
                />
              </div>

              <button
                onClick={runStringMatchExperiment}
                disabled={stringMatchLoading}
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run String Matching Comparison</span>
              </button>
            </div>

            {stringMatchResult && (
              <div className="space-y-5">
                {/* LPS Array Construction Visual */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
                  <h4 className="font-bold text-xs text-indigo-950 uppercase tracking-wider">
                    LPS Array Precomputed for "{matchPattern}":
                  </h4>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {matchPattern.split('').map((char, idx) => (
                      <div key={idx} className="flex flex-col items-center bg-white border border-indigo-200 rounded-lg px-2.5 py-1">
                        <span className="text-xs font-bold text-slate-800">{char}</span>
                        <span className="text-[10px] text-indigo-600 font-black">
                          {stringMatchResult.kmp.lps[idx] ?? 0}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comparison Result */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-emerald-950">KMP Algorithm</span>
                      <Badge variant="success" size="xs">O(n + m)</Badge>
                    </div>
                    <p className="text-xs text-emerald-900">
                      Comparisons: <strong className="text-sm font-black">{stringMatchResult.kmp.comparisons}</strong> ops
                    </p>
                    <p className="text-xs text-emerald-900">
                      Matches Found: <strong>{stringMatchResult.kmp.matchCount}</strong>
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-rose-950">Naive String Matching</span>
                      <Badge variant="danger" size="xs">O(n × m)</Badge>
                    </div>
                    <p className="text-xs text-rose-900">
                      Comparisons: <strong className="text-sm font-black">{stringMatchResult.naive.comparisons}</strong> ops
                    </p>
                    <p className="text-xs text-rose-900">
                      Matches Found: <strong>{stringMatchResult.naive.matchCount}</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: GREEDY SELECTION */}
      {/* ========================================================= */}
      {activeTab === 'greedy' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Greedy Job Application Selection</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Students have limited weekly hours. The greedy strategy sorts eligible jobs by heuristic priority and packs them until capacity is reached.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Time Budget: {greedyBudget} mins ({(greedyBudget / 60).toFixed(1)} hrs)
                </label>
                <input
                  type="range"
                  min="60"
                  max="480"
                  step="30"
                  value={greedyBudget}
                  onChange={(e) => setGreedyBudget(parseInt(e.target.value, 10))}
                  className="w-48 accent-brand-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Greedy Heuristic Strategy</label>
                <select
                  value={greedyStrategy}
                  onChange={(e) => setGreedyStrategy(e.target.value)}
                  className="p-2 bg-white border border-slate-200 rounded-xl font-bold"
                >
                  <option value="ratio">Strategy B: Score-per-Minute Ratio (V/W)</option>
                  <option value="score">Strategy A: Highest Recommendation Score First</option>
                  <option value="deadline">Strategy C: Deadline Urgency Priority</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={runGreedyExperiment}
                  disabled={greedyLoading}
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Execute Greedy Selection</span>
                </button>
              </div>
            </div>

            {greedyResult && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Total Score</span>
                    <p className="text-xl font-black text-brand-600">{greedyResult.totalScore} pts</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Jobs Selected</span>
                    <p className="text-xl font-black text-slate-900">{greedyResult.selectedCount} jobs</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Time Used</span>
                    <p className="text-xl font-black text-indigo-600">{greedyResult.timeSpentMinutes} / {greedyResult.timeBudgetMinutes} m</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Sort Comparisons</span>
                    <p className="text-xl font-black text-slate-800">{greedyResult.sortComparisons} ops</p>
                  </div>
                </div>

                {/* Selected Jobs Table */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-2">
                  <h4 className="font-bold text-xs text-slate-700">Selected Opportunity Portfolio:</h4>
                  <div className="space-y-2">
                    {greedyResult.selectedJobs.map((j, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                        <div>
                          <span className="font-bold text-slate-900">{idx + 1}. {j.title}</span>
                          <span className="text-slate-500 ml-2">({j.companyName})</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500">Duration: {j.estimatedApplicationMinutes} min</span>
                          <span className="font-bold text-brand-700">Score: {j.recommendationScore}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: DYNAMIC PROGRAMMING (0/1 KNAPSACK) */}
      {/* ========================================================= */}
      {activeTab === 'dp' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                0/1 Knapsack Dynamic Programming vs Greedy
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Constructs a 2D table $DP[i][w]$ guaranteeing a mathematically optimal selection of opportunities within your weekly preparation time budget.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Time Budget: {dpCapacity} mins ({(dpCapacity / 60).toFixed(1)} hrs)
                </label>
                <input
                  type="range"
                  min="60"
                  max="420"
                  step="30"
                  value={dpCapacity}
                  onChange={(e) => setDpCapacity(parseInt(e.target.value, 10))}
                  className="w-48 accent-brand-600"
                />
              </div>

              <button
                onClick={runKnapsackExperiment}
                disabled={dpLoading}
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Calculate Global Optimum</span>
              </button>
            </div>

            {dpResult && (
              <div className="space-y-6">
                {/* Comparison Cards: DP vs Greedy */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-emerald-950">Dynamic Programming (0/1)</span>
                      <Badge variant="success" size="xs">Optimal</Badge>
                    </div>
                    <p className="text-2xl font-black text-emerald-700">
                      {dpResult.dpOptimal.totalScore} pts
                    </p>
                    <p className="text-xs text-emerald-800">
                      {dpResult.dpOptimal.selectedCount} jobs in {dpResult.dpOptimal.timeSpentMinutes}m
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-xs text-slate-600">Greedy (Score First)</span>
                    <p className="text-2xl font-black text-slate-800">
                      {dpResult.greedyHighestScore.totalScore} pts
                    </p>
                    <p className="text-xs text-slate-500">
                      {dpResult.greedyHighestScore.selectedCount} jobs in {dpResult.greedyHighestScore.timeSpentMinutes}m
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-xs text-slate-600">Greedy (Ratio First)</span>
                    <p className="text-2xl font-black text-slate-800">
                      {dpResult.greedyRatio.totalScore} pts
                    </p>
                    <p className="text-xs text-slate-500">
                      {dpResult.greedyRatio.selectedCount} jobs in {dpResult.greedyRatio.timeSpentMinutes}m
                    </p>
                  </div>
                </div>

                {/* Explanation */}
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 space-y-1">
                  <p className="font-bold">Algorithmic Tradeoff Proof:</p>
                  <p>{dpResult.explanation}</p>
                </div>

                {/* DP Table Matrix Preview */}
                {dpResult.dpOptimal.tablePreview && (
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">
                      Constructed 2D DP Table Preview (Sample Capacities in Minutes):
                    </h4>
                    <div className="overflow-x-auto bg-slate-900 text-slate-200 p-4 rounded-2xl text-[11px] font-mono">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-slate-700 text-slate-400">
                            <th className="py-1 px-2">Subproblem (Item)</th>
                            <th className="py-1 px-2">W(m)</th>
                            <th className="py-1 px-2">V(pts)</th>
                            {dpResult.dpOptimal.tablePreview.sampleCapacities.map((c, i) => (
                              <th key={i} className="py-1 px-2 text-right">{c}m</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {dpResult.dpOptimal.tablePreview.matrix.map((row, rIdx) => (
                            <tr key={rIdx}>
                              <td className="py-1 px-2 font-bold text-brand-300">{row.label}</td>
                              <td className="py-1 px-2">{row.weight}</td>
                              <td className="py-1 px-2">{row.value}</td>
                              {row.values.map((v, cIdx) => (
                                <td key={cIdx} className="py-1 px-2 text-right text-emerald-400">
                                  {v}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: PERFORMANCE BENCHMARK & CHARTS */}
      {/* ========================================================= */}
      {activeTab === 'benchmark' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Empirical Performance Benchmark</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Generate real measured datasets ($N=100$ to $N=5,000$) and plot theoretical complexity curves vs actual runtimes.
                </p>
              </div>

              <button
                onClick={runBenchmarkSuite}
                disabled={benchmarkLoading}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{benchmarkLoading ? 'Benchmarking On Backend...' : 'Run Benchmark Suite'}</span>
              </button>
            </div>

            {/* Asymptotic Complexity Reference Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase">
                  <tr>
                    <th className="py-2.5 px-4">Algorithm</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Best Case</th>
                    <th className="py-2.5 px-3">Average Case</th>
                    <th className="py-2.5 px-3">Worst Case</th>
                    <th className="py-2.5 px-3">Space Complexity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {complexityTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 font-medium">
                      <td className="py-2.5 px-4 font-bold text-slate-900">{row.algorithm}</td>
                      <td className="py-2.5 px-3 text-slate-600">{row.category}</td>
                      <td className="py-2.5 px-3 text-emerald-700">{row.bestCase}</td>
                      <td className="py-2.5 px-3 text-brand-700">{row.averageCase}</td>
                      <td className="py-2.5 px-3 text-rose-700">{row.worstCase}</td>
                      <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">{row.spaceComplexity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Render Charts if benchmark run */}
            {benchmarkResults && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                {/* Chart 1: Sorting Time vs Input Size */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-xs text-slate-800">
                    Sorting Execution Time vs Input Size (N)
                  </h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={benchmarkResults.sorting.map(s => ({
                          N: s.inputSize,
                          MergeSort: s.mergeSort.timeMs,
                          BubbleSort: s.bubbleSort.timeMs
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="N" fontSize={11} />
                        <YAxis fontSize={11} unit="ms" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="MergeSort" stroke="#10b981" strokeWidth={2} />
                        <Line type="monotone" dataKey="BubbleSort" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 2: Searching Comparisons (O(n) vs O(log n)) */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-xs text-slate-800">
                    Search Comparisons: Linear O(n) vs Binary O(log n)
                  </h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={benchmarkResults.searching.map(s => ({
                          N: s.inputSize,
                          Linear: s.linearSearch.comparisons,
                          Binary: s.binarySearch.comparisons
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="N" fontSize={11} />
                        <YAxis fontSize={11} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Linear" stroke="#f59e0b" strokeWidth={2} />
                        <Line type="monotone" dataKey="Binary" stroke="#6366f1" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
