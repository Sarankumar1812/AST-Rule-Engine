import React, { useState } from 'react';
import axios from 'axios';

function RuleCombination({ rules, selectedRuleIds, onRuleCombined, clearSelection }) {
  const [operator, setOperator] = useState("AND");

  const handleCombineRules = async () => {
    if (selectedRuleIds.length < 2) return; // Ensure at least two rules are selected
    try {
      const response = await axios.post('https://ast-backend.onrender.com/api/rules/combine', {
        ruleIds: selectedRuleIds,
        operator,
      });
      onRuleCombined(response.data);
      clearSelection(); // Clear selection after combining
    } catch (error) {
      console.error("Error combining rules:", error);
    }
  };

  const selectedRules = rules.filter((rule) => selectedRuleIds.includes(rule._id));

  return (
    <div className="mb-8 p-4 w-[550px] border border-gray-300 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Combine Rules</h2>
      <div className="flex justify-center gap-20 items-center ">
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          className=" p-2 px-4 border rounded bg-green-200 border-green-200"
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
        <button
          onClick={handleCombineRules}
          className="bg-blue-600 text-white py-2 px-3 text-lg rounded hover:bg-green-600"
        >
          Combine Selected Rules
        </button>
      </div>

      <div className="mb-4 mt-4">
        {selectedRules.length > 0 ? (
          <ul className="list-disc list-inside">
            {selectedRules.map((rule) => (
              <li key={rule._id} className="text-gray-700">
                {rule.ruleString}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No rules selected</p>
        )}
      </div>
    </div>
  );
}

export default RuleCombination;
