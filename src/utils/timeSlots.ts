export const generateTimeSlots = (start: string, end: string, interval: number = 30) => {
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
    const slots = [];
  
    while (startTime < endTime) {
      slots.push(startTime.toTimeString().substr(0, 5));
      startTime.setMinutes(startTime.getMinutes() + interval);
    }
  
    return slots;
  };
  