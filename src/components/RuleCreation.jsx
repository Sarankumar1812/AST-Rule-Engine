import React from 'react';
import axios from 'axios';

function RuleCreation({ rule, setRule, onRuleCreated }) {
  const handleAddRule = async () => {
    if (rule) {
      try {
        const response = await axios.post('https://ast-backend.onrender.com/api/rules/create', { ruleString: rule });
        onRuleCreated(response.data); // Notify parent of new rule
        setRule(''); // Clear input field
      } catch (error) {
        console.error("Error creating rule:", error);
      }
    }
  };

  return (
    <div className="mb-8 p-4 border border-gray-300 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Rule Creation</h2>
      <input
        type="text"
        placeholder="Enter rule (e.g., age > 45 AND department = 'support')"
        value={rule}
        onChange={(e) => setRule(e.target.value)}
        className="w-[580px] flex flex-col p-2 border rounded mb-4"
      />
      <button
        onClick={handleAddRule}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Rule
      </button>
    </div>
  );
}

export default RuleCreation;
