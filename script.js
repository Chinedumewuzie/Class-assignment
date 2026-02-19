// 1) JS function that accepts variable number of arguments and multiplies through
function multiplyAll(...args) {
  if (args.length === 0) return 0;

  return args.reduce((product, value) => {
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw new TypeError("All arguments must be valid numbers");
    }
    return product * value;
  }, 1);
}

// Display test result on page
document.getElementById("multiplyResult").textContent =
  "multiplyAll(2, 3, 4, 5) = " + multiplyAll(2, 3, 4, 5);

// 2) JS function that makes a remote API call
async function fetchUsers() {
  const url = "https://jsonplaceholder.typicode.com/users";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch users. Status: " + response.status);
  }

  return await response.json();
}

// 3) Transform the retrieved data
function transformUsers(users) {
  // We need something numeric for the chart.
  // We'll use username length as the numeric value.
  return users.map((u) => ({
    label: u.name,
    value: u.username.length
  }));
}

// 4) Plot Bar chart using tfjs-vis
function plotBarChart(data) {
  const surface = { name: "Users Bar Chart", tab: "Charts" };

  tfvis.render.barchart(
    surface,
    data,
    {
      xLabel: "Users",
      yLabel: "Username Length",
      width: 900,
      height: 500
    }
  );
}

// 5) Plot Line chart using tfjs-vis
function plotLineChart(data) {
  const surface = { name: "Users Line Chart", tab: "Charts" };

  // Line chart expects x,y values
  const lineData = data.map((d, index) => ({
    x: index + 1,
    y: d.value
  }));

  tfvis.render.linechart(
    surface,
    { values: lineData },
    {
      xLabel: "User Index",
      yLabel: "Username Length",
      width: 900,
      height: 500
    }
  );
}

// Button functions
async function runBarChart() {
  const users = await fetchUsers();
  const data = transformUsers(users);
  plotBarChart(data);
}

async function runLineChart() {
  const users = await fetchUsers();
  const data = transformUsers(users);
  plotLineChart(data);
}