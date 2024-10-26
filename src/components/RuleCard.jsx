import React from 'react';

function RuleCard({ rule, selected, onSelect }) {
  return (
    <div
      className={`border rounded-lg p-4 m-2 shadow cursor-pointer transition duration-200 ease-in-out ${
        selected ? 'bg-green-100 border-green-200' : 'hover:shadow-lg'
      }`}
      onClick={() => onSelect(rule._id)}
      style={{ width: '280px', height: '200px' }} // Fixed width and height
    >
      
      <div className="text-left flex flex-col gap-6 justify-center items-left pt-2">
        <p className="text-gray-600 font-semibold">Rule: <span className="text-gray-700 mb-1">{rule.ruleString}</span> </p>
        <p className="text-gray-600 font-semibold">ID:  <span className="text-gray-700 mb-1">{rule._id}</span></p>
        <p className="text-gray-600 font-semibold">Operator: <span className="text-gray-700 mb-1">{rule.ast.value}</span></p>
        
      </div>
    </div>
  );
}

export default RuleCard;
