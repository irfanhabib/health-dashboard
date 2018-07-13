export const getEpochs = () => {
    const currentYear = (new Date()).getFullYear();
    let nextYear = currentYear;
    const currentMonth = (new Date()).getMonth() + 1;
    let nextMonth = currentMonth;
    if (currentMonth === 12){
      nextMonth = 1;
      nextYear += 1;
    } else {
      nextMonth = currentMonth + 1;
    }
    return {
      startOfYear: (new Date(`01-01-${currentYear} 00:00:00`)).getTime(),
      startOfMonth:  (new Date(`${currentMonth}-01-${currentYear} 00:00:00`)).getTime(),
      endOfMonth:  (new Date(`${nextMonth}-01-${nextYear} 00:00:00`)).getTime()
    }
}