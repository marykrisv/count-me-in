import { useState } from "react";
import "./App.css";
import ParticipantTable from "./ParticipantTable.tsx";
import ExpensesTable from "./ExpensesTable.tsx";
import type { Expense } from "./types.ts";
import ShareTable from "./ShareTable.tsx";

function App() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  return (
    <>
      <ParticipantTable
        participants={participants}
        setParticipants={setParticipants}
      />
      <ExpensesTable
        participants={participants}
        expenses={expenses}
        setExpenses={setExpenses}
      />
      <ShareTable expenses={expenses} participants={participants} />
      <div
        style={{ marginTop: "50px", display: "flex", flexDirection: "column" }}
      >
        <span>
          If you need to make a payment, please send it to: Mary Kris
          Villacrusis <b>(PAYID: 0492909791)</b>.
        </span>
        <span>If you're supposed to receive, just wait — I'll pay 😄</span>
      </div>
    </>
  );
}

export default App;
