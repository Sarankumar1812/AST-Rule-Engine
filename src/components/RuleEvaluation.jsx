import React, { useState } from 'react';
import axios from 'axios';

function RuleEvaluation({ rules }) {
  const [data, setData] = useState({ age: '', department: '' });
  const [selectedRule, setSelectedRule] = useState('');
  const [result, setResult] = useState(null);

  const handleEvaluate = async () => {
    try {
      const response = await axios.post('https://ast-backend.onrender.com/api/rules/evaluate', {
        ruleId: selectedRule,
        data,
      });
      setResult(response.data.eligible ? "Eligible" : "Not Eligible");
    } catch (error) {
      console.error("Error evaluating rule:", error);
    }
  };

  return (
    <div className="mb-8 mt-8 p-4 border border-gray-300 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Evaluate Rules</h2>
      <select value={selectedRule} onChange={(e) => setSelectedRule(e.target.value)} className="w-full p-2 border rounded mb-4">
        <option value="">Select Rule</option>
        {rules.map((rule) => (
          <option key={rule._id} value={rule._id}>
            {rule.ruleString}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Age"
        value={data.age}
        onChange={(e) => setData({ ...data, age: e.target.value })}
        className="w-full p-2 border rounded mb-4"
      />
      <input
        type="text"
        placeholder="Department"
        value={data.department}
        onChange={(e) => setData({ ...data, department: e.target.value })}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleEvaluate}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-purple-600"
      >
        Evaluate Rule
      </button>
      {result && <div className="mt-4 p-2 text-lg font-semibold text-green-600">{result}</div>}
    </div>
  );
}

export default RuleEvaluation;
