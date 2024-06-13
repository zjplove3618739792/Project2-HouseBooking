document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await axios.get('/api/bookings');
      const bookings = response.data;
  
      const calendarElement = document.querySelector('.calendar');
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
      for (let day = startDate.getDate(); day <= endDate.getDate(); day++) {
        const date = new Date(today.getFullYear(), today.getMonth(), day);
        const booking = bookings.find(b => new Date(b.date).toDateString() === date.toDateString());
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        if (booking && booking.status === 'booked') {
          dayElement.classList.add('booked');
        } else {
          dayElement.classList.add('available');
          dayElement.addEventListener('click', () => selectDate(date));
        }
        dayElement.innerText = day;
        calendarElement.appendChild(dayElement);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  });
  
  let selectedDates = [];
  
  function selectDate(date) {
    selectedDates.push(date);
    // Update UI to show selected dates
    // ...
  }
  
  async function bookDates() {
    try {
      await axios.post('/api/bookings', { dates: selectedDates });
      alert('Booking successful!');
      // Reload or update the calendar
    } catch (error) {
      console.error('Error booking dates:', error);
    }
  }
  

  