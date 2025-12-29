import { getUserGrowthChart } from "../actions/get-data-user-growth-chart";
import { ChartAreaUserGrowthClient } from "./chart-area-user-growth";

export async function ChartAreaUserGrowthServer() {
  const data = await getUserGrowthChart(6);

  return <ChartAreaUserGrowthClient data={data} />;
}
