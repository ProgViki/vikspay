import React from "react";
import { FTTHTasks, HomeConnStatus } from "../api/types/types";
import { ticketStatus } from "../hooks/useTicketsStatus";

export const activateNextTask = (order: number, tasks: FTTHTasks[]) => {
  if (order === 1) return true;

  if (!tasks) return false;

  const prevTask = tasks.find((task) => task.order === order - 1);

  return !(
    prevTask && ticketStatus(prevTask.status as HomeConnStatus) === "ongoing"
  );
};
