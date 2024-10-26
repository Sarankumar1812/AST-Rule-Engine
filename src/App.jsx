import React, { useState, useEffect } from "react";
import axios from "axios";
import RuleCreation from "./components/RuleCreation";
import RuleCombination from "./components/RuleCombination";
import RuleEvaluation from "./components/RuleEvaluation";
import RuleCardContainer from "./components/RuleCardContainer";

function App() {
  const [rules, setRules] = useState([]);
  const [rule, setRule] = useState("");
  const [selectedRuleIds, setSelectedRuleIds] = useState([]);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get("https://ast-backend.onrender.com/api/rules/all");
        setRules(response.data);
      } catch (error) {
        console.error("Error fetching rules:", error);
      }
    };
    fetchRules();
  }, []);

  const handleRuleCreated = (newRule) => {
    setRules([...rules, newRule]);
  };

  const handleRuleCombined = (combinedRule) => {
    setRules([...rules, combinedRule]);
  };

  const handleRuleSelect = (ruleId) => {
    setSelectedRuleIds((prevSelected) =>
      prevSelected.includes(ruleId)
        ? prevSelected.filter((id) => id !== ruleId)
        : [...prevSelected, ruleId]
    );
  };

  const clearSelection = () => setSelectedRuleIds([]);

  return (
    <div className="p-8 pl-36">
      <h1 className="text-3xl font-bold mb-8 text-center">AST Rule Engine  </h1>
      <div className="flex justify-start gap-10 mb-8 ml-0">
        <RuleCreation rule={rule} setRule={setRule} onRuleCreated={handleRuleCreated} />
        <RuleCombination
          rules={rules}
          selectedRuleIds={selectedRuleIds}
          onRuleCombined={handleRuleCombined}
          clearSelection={clearSelection}
        />
      </div>
      <h2 className="text-2xl font-semibold mb-4">Created Rules</h2>
      <RuleCardContainer rules={rules} selectedRuleIds={selectedRuleIds} onSelect={handleRuleSelect} />
      <RuleEvaluation rules={rules} />
    </div>
  );
}

export default App;
