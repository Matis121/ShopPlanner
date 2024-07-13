import React from "react";

type CardStatusProps = {
  percentOfCollectedItems: number;
};

const CardStatus: React.FC<CardStatusProps> = ({ percentOfCollectedItems }) => {
  const status =
    percentOfCollectedItems === 0
      ? "New"
      : percentOfCollectedItems < 100
        ? "In progress"
        : "Collected";

  return (
    <span
      className={`mt-6 inline-flex flex-shrink-0 items-center rounded-full ring-1 px-2 py-1 text-xs font-medium ${status == "New" ? "bg-blue-50 text-blue-700 ring-blue-600/20" : status == "In progress" ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20" : "bg-green-50 text-green-700 ring-green-600/20"}`}
    >
      {status}
    </span>
  );
};

export default CardStatus;
