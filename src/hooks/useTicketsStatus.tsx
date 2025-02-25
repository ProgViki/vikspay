import { TicketStatus } from "../api/types/types";

export const ticketStatus = (status: TicketStatus) => {
  switch (status) {
    case TicketStatus.CLOSED:
    case TicketStatus.RESOLVED:
    case TicketStatus.COMPLETED:
      return TicketStatus.CLOSED; // or return status if needed
    default:
      return "ongoing";
  }
};
