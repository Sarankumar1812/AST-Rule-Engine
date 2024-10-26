import React from 'react';
import RuleCard from './RuleCard';

function RuleCardContainer({ rules, selectedRuleIds, onSelect }) {
  return (
    <div className="flex flex-wrap justify-start gap-4">
      {rules.map((rule) => (
        <RuleCard
          key={rule._id}
          rule={rule}
          selected={selectedRuleIds.includes(rule._id)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default RuleCardContainer;
