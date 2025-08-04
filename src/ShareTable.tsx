import type { Expense } from "./types.ts";

const ShareTable = ({
  expenses,
  participants,
}: {
  expenses: Expense[];
  participants: string[];
}) => {
  const transformedExpenses = expenses.map((expense) => {
    const dividedCost = toDecimal(expense.cost / expense.participants.length);

    return {
      ...expense,
      dividedCost,
      totalOwed: toDecimal(
        computeOwed({
          dividedCost,
          participants: expense.participants.length,
          isPayerIncluded: expense.participants.includes(expense.paidBy),
        }),
      ),
      eachParticipants: participants.map((participant) => ({
        name: participant,
        payment: expense.participants.includes(participant) ? dividedCost : 0,
      })),
    };
  });

  const eachParticipants = participants.map((participant) => {
    return {
      name: participant,
      totalPayment: addAll(
        transformedExpenses
          .filter((expense) => expense.participants.includes(participant))
          .map((expense) => expense.dividedCost),
      ),
    };
  });

  const owedParticipants = participants.map((participant) => {
    const owed = addAll(
      transformedExpenses
        .filter((expense) => expense.paidBy === participant)
        .map((expense) => expense.totalOwed),
    );

    const totalPayment =
      eachParticipants.find(({ name }) => name === participant)?.totalPayment ??
      0;

    return {
      name: participant,
      owed,
      totalPayment: toDecimal(totalPayment),
      toPay: toDecimal(owed - totalPayment),
    };
  });

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
      }}
    >
      <div className="avoid-break">
        <span className="title">Share table</span>
        <table border={1}>
          <thead>
            <tr>
              <th>Expense</th>
              <th>Cost</th>
              <th>Paid by</th>
              <th>Total owed</th>
              {participants.map((participant) => (
                <th key={participant}>{participant}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transformedExpenses.map((expense, i) => {
              return (
                <tr key={i}>
                  <td>{expense.name}</td>
                  <td>{expense.cost}</td>
                  <td>{expense.paidBy}</td>
                  <td>{expense.totalOwed}</td>
                  {participants.map((participant) => (
                    <td key={participant}>
                      {
                        expense.eachParticipants.find(
                          (val) => val.name === participant,
                        )?.payment
                      }
                    </td>
                  ))}
                </tr>
              );
            })}
            <tr>
              <td>TOTAL</td>
              <td>
                {addAll(transformedExpenses.map((expense) => expense.cost))}
              </td>
              <td>-</td>
              <td>-</td>
              {participants.map((participant) => (
                <td key={participant}>
                  {
                    eachParticipants.find(({ name }) => name === participant)
                      ?.totalPayment
                  }
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="avoid-break page-break-before">
        <span className="title">Summary</span>
        <table border={1}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Owed</th>
              <th>Total Payment</th>
              <th>To Receive</th>
              <th>To Pay</th>
            </tr>
          </thead>
          <tbody>
            {owedParticipants.map((participant, i) => {
              return (
                <tr key={i}>
                  <td>{participant.name}</td>
                  <td>{participant.owed}</td>
                  <td>{participant.totalPayment}</td>
                  <td>{participant.toPay > 0 ? participant.toPay : "-"}</td>
                  <td>
                    {participant.toPay <= 0 ? participant.toPay * -1 : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function addAll(costs: number[]) {
  return costs.reduce((acc, val) => acc + val, 0);
}

function toDecimal(cost: number) {
  return parseFloat(cost.toFixed(2));
}

function computeOwed({
  dividedCost,
  participants,
  isPayerIncluded,
}: {
  dividedCost: number;
  participants: number;
  isPayerIncluded: boolean;
}) {
  if (isPayerIncluded) {
    return dividedCost * (participants - 1);
  }

  return dividedCost * participants;
}

export default ShareTable;
