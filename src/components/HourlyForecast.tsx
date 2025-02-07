import {
  LineChart,
  Line,
  XAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { FaTint } from "react-icons/fa";

interface HourlyWeatherData {
  time: string;
  temp_c: number;
  humidity: number;
  condition: {
    icon: string;
  };
}

interface HourlyForecastProps {
  hourlyWeather: HourlyWeatherData[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyWeather }) => {
  const graphData = hourlyWeather.map((hour) => ({
    time: new Date(hour.time).toLocaleTimeString([], { hour: "2-digit" }),
    temp: hour.temp_c,
    humidity: hour.humidity,
    icon: hour.condition.icon,
  }));

  const graphDataMap = new Map(graphData.map((item) => [item.time, item]));

  const CustomTopTick: React.FC<{
    x?: number;
    y?: number;
    payload?: { value: string };
  }> = ({ x = 0, y = 0, payload }) => {
    if (!payload) return null;
    const { value } = payload;
    const dataItem = graphDataMap.get(value);

    if (!dataItem) return null;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={-15} textAnchor="middle" fontSize="12" fill="#fff">
          {value}
        </text>
        <foreignObject x={-15} y={-60} width={30} height={30}>
          <img
            src={dataItem.icon || "/default-icon.png"}
            alt="Weather Icon"
            style={{ width: "100%", height: "100%" }}
          />
        </foreignObject>
      </g>
    );
  };

  const CustomBottomTick: React.FC<{
    x?: number;
    y?: number;
    payload?: { value: string };
  }> = ({ x = 0, y = 0, payload }) => {
    if (!payload) return null;
    const { value } = payload;
    const dataItem = graphDataMap.get(value);

    if (!dataItem) return null;

    return (
      <g transform={`translate(${x},${y})`}>
        <FaTint style={{ fontSize: 16, marginRight: 5, fill: "#38bdf8" }} />
        <text x={-10} y={10} textAnchor="middle" fontSize="12" fill="#fff">
          {dataItem.humidity}%
        </text>
      </g>
    );
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={graphData}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 50,
          }}
        >
          {/* Top X-Axis with Time and Weather Icon */}
          <XAxis
            dataKey="time"
            xAxisId="top"
            orientation="top"
            tick={(props) => <CustomTopTick {...props} />}
            interval={0}
            axisLine={false}
            tickLine={false}
          />
          {/* Bottom X-Axis with Humidity Percentage */}
          <XAxis
            dataKey="time"
            xAxisId="bottom"
            orientation="bottom"
            tick={(props) => <CustomBottomTick {...props} />}
            interval={0}
            axisLine={false}
            tickLine={false}
          />
          {/* Temperature Line */}
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#8884d8"
            strokeWidth={2}
            xAxisId="top"
          >
            <LabelList
              dataKey="temp"
              position="top"
              style={{
                fontSize: 12,
                fill: "#fff",
                fontWeight: "bold",
              }}
            />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyForecast;
