import { useEffect, useState } from "react";
import type { Expense } from "./types.ts";

const ExpensesTable = ({
  participants,
  expenses,
  setExpenses,
}: {
  participants: string[];
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
}) => {
  const addExpense = (expense: Expense) => {
    if (expenses.includes(expense)) {
      return;
    }

    setExpenses([...expenses, expense]);
  };

  const onRemoveExpense = (name: string) => {
    const newExpenses = expenses.filter((expense) => expense.name !== name);

    setExpenses(newExpenses);
  };

  return (
    <div className="container avoid-break">
      <AddExpense onAddExpense={addExpense} participants={participants} />
      <span className="title">Expenses</span>
      <table border={1}>
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Cost</th>
            <th>Paid By</th>
            <th>Participants</th>
            <th className="hide-on-print">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{expense.name}</td>
              <td>{expense.cost}</td>
              <td>{expense.paidBy}</td>
              <td>
                {expense.participants.join(", ")} ({expense.participants.length}
                )
              </td>
              <td className="hide-on-print">
                <button onClick={() => onRemoveExpense(expense.name)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AddExpense = ({
  onAddExpense,
  participants: allParticipants,
}: {
  onAddExpense: (expense: Expense) => void;
  participants: string[];
}) => {
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [participants, setParticipants] = useState<string[]>([]);
  const [paidBy, setPaidBy] = useState<string>("");

  useEffect(() => {
    setPaidBy(allParticipants[0]);
  }, [allParticipants]);

  return (
    <div
      style={{
        width: "100%",
        marginBottom: 15,
        display: "flex",
        flexDirection: "column",
        gap: 15,
        alignItems: "center",
      }}
      className="hide-on-print"
    >
      <div
        style={{
          width: "100%",
          marginBottom: 15,
          display: "flex",
          gap: 15,
          alignItems: "center",
        }}
      >
        <span>Expense: </span>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <span>Cost: </span>
        <input
          value={cost}
          type="number"
          onChange={(e) => setCost(Number(e.target.value))}
        />
        <span>Paid By:</span>
        <select
          id="options"
          name="options"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
        >
          {allParticipants.map((participant) => (
            <option key={participant} value={participant}>
              {participant}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          width: "100%",
          marginBottom: 15,
          display: "flex",
          rowGap: 15,
          columnGap: 5,
          alignItems: "center",
        }}
      >
        {allParticipants.map((participant) => (
          <div>
            <input
              key={participant}
              type="checkbox"
              checked={participants.includes(participant)}
              onChange={(e) => {
                const isChecked = e.target.checked;

                if (isChecked) {
                  setParticipants([...participants, participant]);
                } else {
                  const newParticipants = participants.filter(
                    (value) => value !== participant,
                  );

                  setParticipants(newParticipants);
                }
              }}
            />
            <span>{participant}</span>
          </div>
        ))}
      </div>
      <button
        style={{
          alignSelf: "start",
        }}
        onClick={() => {
          onAddExpense({ name, cost, participants, paidBy });

          setName("");
          setCost(0);
          setParticipants([]);
        }}
      >
        Add Expense
      </button>
    </div>
  );
};

export default ExpensesTable;
