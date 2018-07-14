export const getEpochs = () => {
    const currentYear = (new Date()).getFullYear();
    let nextYear = currentYear;
    const currentMonth = (new Date()).getMonth() + 1;
    let lastMonth = currentMonth - 1;
    let lastMonthYear = currentYear;
    if (currentMonth === 1){
      lastMonth = 12;
      lastMonthYear = lastMonthYear - 1;

    }

    const currentDate = (new Date())
    return {
      startOfYear: (new Date(`01-01-${currentYear} 00:00:00`)).getTime(),
      yearRatio: (currentDate.getMonth() +1/ 12),
      startOfLastYear: (new Date(`01-01-${currentYear - 1} 00:00:00`)).getTime(),
      startOfMonth:  (new Date(`${currentMonth}-01-${currentYear} 00:00:00`)).getTime(),
      monthRatio: (currentDate.getDate()/ 30),
      startOfLastMonth:  (new Date(`${lastMonth}-01-${lastMonthYear} 00:00:00`)).getTime(),
      currentDate: currentDate.getTime()
    };
  }
