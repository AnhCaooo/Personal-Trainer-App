import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";
import _ from "lodash";

function StatisticsScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch(process.env.REACT_APP_TRAININGS_URL)
      .then((response) => response.json())
      .then((responseData) => setData(responseData))
      .then((err) => console.error(err));
  };

  const statisticsData = _(data)
    .groupBy("activity")
    .map((activity, index) => ({
      activityName: index,
      duration: _.sumBy(activity, "duration"),
    }))
    .value();

  return (
    <>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={statisticsData}
          margin={{
            top: 50,
            right: 30,
            left: 40,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activityName" tick={{ fontSize: 18 }} />

          <YAxis
            label={{
              value: "Duration (minutes)",
              angle: -90,
              position: "insideLeft",
              textAnchor: "middle",
            }}
            tickLine={false}
            tickCount={6}
          />
          <Tooltip />
          <Bar dataKey="duration" fill="#6495ED">
            <LabelList dataKey="duration" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default StatisticsScreen;
