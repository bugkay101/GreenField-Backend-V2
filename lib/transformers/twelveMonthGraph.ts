interface Transaction {
  time: number;
  cost: string;
}

export function twelveMonthGraph(data: Transaction[]): number[] {
  // Initialize an array to hold the total cost for each month
  let monthlyCosts: number[] = Array(12).fill(0);

  // Get the current year
  let currentYear: number = new Date().getFullYear();
  if (data) {
    for (let transaction of data) {
      // Convert the time to a Date object
      let date: Date = new Date(transaction.time);

      // Get the year and month of the transaction
      let year: number = date.getFullYear();
      let month: number = date.getMonth();

      // If the transaction is from the current year, add its cost to the total for that month
      if (year === currentYear) {
        monthlyCosts[month] += parseFloat(transaction.cost);
      }
    }
  } else {
    console.log("data is undefined or null");
  }

  // Convert the monthly costs to numbers with 3 decimal places
  let monthlyCostsFormatted: number[] = monthlyCosts.map((cost) =>
    parseFloat(cost.toFixed(3))
  );

  return monthlyCostsFormatted;
}
