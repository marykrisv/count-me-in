import { useState } from "react";

const ParticipantTable = ({
  participants,
  setParticipants,
}: {
  participants: string[];
  setParticipants: (name: string[]) => void;
}) => {
  const addParticipant = (name: string) => {
    if (participants.includes(name)) {
      return;
    }

    setParticipants([...participants, name]);
  };

  const onRemoveParticipant = (name: string) => {
    const newParticipants = participants.filter(
      (participant) => participant !== name,
    );

    setParticipants(newParticipants);
  };

  return (
    <div className="container avoid-break">
      <AddParticipant onAddParticipant={addParticipant} />
      <span className="title">Participants</span>
      <table border={1}>
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th className="hide-on-print">Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{participant}</td>
              <td className="hide-on-print">
                <button onClick={() => onRemoveParticipant(participant)}>
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

const AddParticipant = ({
  onAddParticipant,
}: {
  onAddParticipant: (name: string) => void;
}) => {
  const [name, setName] = useState<string>("");

  return (
    <div
      style={{
        width: "100%",
        marginBottom: 15,
        display: "flex",
        gap: 15,
        alignItems: "center",
      }}
      className="hide-on-print"
    >
      <span>Name: </span>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button
        onClick={() => {
          onAddParticipant(name.trim());
          setName("");
        }}
      >
        Add Participant
      </button>
    </div>
  );
};

export default ParticipantTable;
