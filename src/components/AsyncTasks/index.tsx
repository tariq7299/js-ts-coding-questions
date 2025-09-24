import React, { useState } from "react";
import "./asyncTasks.css";

// Sample async functions for testing
const createAsyncTask = (name: string, delay: number, shouldFail = false) => {
  return async (): Promise<string> => {
    console.log(`Starting ${name}...`);

    // Simulate async work with delay
    await new Promise((resolve) => setTimeout(resolve, delay));

    if (shouldFail) {
      throw new Error(`${name} failed!`);
    }

    const result = `${name} completed after ${delay}ms`;
    console.log(result);
    return result;
  };
};

// Sample array of async functions for testing
const sampleTasks = [
  createAsyncTask("Task 1", 1000),
  createAsyncTask("Task 2", 1500),
  createAsyncTask("Task 3", 800),
  createAsyncTask("Task 4", 1200),
];

// TODO: Implement this function
const executeInParallel = async (
  tasks: Array<() => Promise<any>>
): Promise<any[]> => {
  // Your implementation here
  // Hint: Use Promise.all with map
  const results = await Promise.all(tasks.map((task) => task()));
  console.log("results", results);
  return results;
};

// TODO: Implement this function
const executeInSeries = async (
  tasks: Array<() => Promise<any>>
): Promise<any[]> => {
  // Your implementation here
  // Hint: Use for...of loop with await OR Array.reduce with promise chain
  const results = [];
  for (const task of tasks) {
    const result = await task();
    results.push(result);
  }
  return results;
};

const AsyncTasks: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [executionTime, setExecutionTime] = useState<number>(0);

  const handleExecuteParallel = async () => {
    setLoading(true);
    setError("");
    setResults([]);

    const startTime = Date.now();

    try {
      const taskResults = await executeInParallel(sampleTasks);
      setResults(taskResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setExecutionTime(Date.now() - startTime);
      setLoading(false);
    }
  };

  const handleExecuteSeries = async () => {
    setLoading(true);
    setError("");
    setResults([]);

    const startTime = Date.now();

    try {
      const taskResults = await executeInSeries(sampleTasks);
      setResults(taskResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setExecutionTime(Date.now() - startTime);
      setLoading(false);
    }
  };

  return (
    <div className="async-tasks-container">
      <h2>Async Tasks Processor</h2>
      <p>This demo shows parallel vs series execution of async tasks.</p>

      <div className="task-info">
        <h3>Sample Tasks:</h3>
        <ul>
          <li>Task 1: 1000ms delay</li>
          <li>Task 2: 1500ms delay</li>
          <li>Task 3: 800ms delay</li>
          <li>Task 4: 1200ms delay</li>
        </ul>
      </div>

      <div className="controls">
        <button
          onClick={handleExecuteParallel}
          disabled={loading}
          className="parallel-btn"
        >
          Execute in Parallel
        </button>

        <button
          onClick={handleExecuteSeries}
          disabled={loading}
          className="series-btn"
        >
          Execute in Series
        </button>
      </div>

      {loading && (
        <div className="loading">
          <p>Executing tasks...</p>
          <div className="spinner"></div>
        </div>
      )}

      {executionTime > 0 && (
        <div className="execution-time">
          <strong>Total execution time: {executionTime}ms</strong>
        </div>
      )}

      {error && (
        <div className="error">
          <p>Error: {error}</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="results">
          <h3>Results:</h3>
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AsyncTasks;
