export const getEpochs = () => {
    const currentYear = (new Date()).getFullYear();
    let nextYear = currentYear;
    const currentMonth = (new Date()).getMonth() + 1;
    return {
      startOfYear: (new Date(`01-01-${currentYear} 00:00:00`)).getTime(),
      startOfMonth:  (new Date(`${currentMonth}-01-${currentYear} 00:00:00`)).getTime(),
      endOfMonth:  new Date().getTime()
    }
}