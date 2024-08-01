// src/utils/generateTicketID.ts

export function generateTicketID(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ticketID = '';
    for (let i = 0; i < 6; i++) {
      ticketID += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return ticketID;
  }
  