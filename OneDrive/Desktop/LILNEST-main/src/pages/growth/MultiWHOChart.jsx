import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceDot } from 'recharts';

const DATA = {
  girls: {
    weight: [
      { m: 0, P3: 2.4, P50: 3.3, P97: 4.2 },
      { m: 1, P3: 3.2, P50: 4.2, P97: 5.3 },
      { m: 2, P3: 3.9, P50: 5.1, P97: 6.4 },
      { m: 3, P3: 4.5, P50: 5.8, P97: 7.2 },
      { m: 6, P3: 6.0, P50: 7.3, P97: 8.9 },
      { m: 9, P3: 6.9, P50: 8.2, P97: 9.9 },
      { m: 12, P3: 7.6, P50: 8.9, P97: 10.8 },
      { m: 15, P3: 8.2, P50: 9.6, P97: 11.6 },
      { m: 18, P3: 8.7, P50: 10.2, P97: 12.3 },
      { m: 24, P3: 9.5, P50: 11.5, P97: 13.9 },
    ],
    height: [
      { m: 0, P3: 45.0, P50: 49.1, P97: 53.0 },
      { m: 1, P3: 49.0, P50: 53.7, P97: 58.4 },
      { m: 2, P3: 52.5, P50: 57.1, P97: 62.0 },
      { m: 3, P3: 55.1, P50: 59.8, P97: 64.9 },
      { m: 6, P3: 60.4, P50: 65.7, P97: 71.0 },
      { m: 9, P3: 64.2, P50: 70.1, P97: 75.9 },
      { m: 12, P3: 67.3, P50: 74.0, P97: 79.7 },
      { m: 15, P3: 69.9, P50: 77.3, P97: 83.1 },
      { m: 18, P3: 72.2, P50: 79.9, P97: 86.0 },
      { m: 24, P3: 75.7, P50: 85.7, P97: 93.3 },
    ],
    bmi: [
      { m: 0, P3: 11.6, P50: 13.4, P97: 15.6 },
      { m: 1, P3: 12.4, P50: 14.5, P97: 17.0 },
      { m: 2, P3: 13.0, P50: 15.1, P97: 17.7 },
      { m: 3, P3: 13.4, P50: 15.4, P97: 18.1 },
      { m: 6, P3: 14.2, P50: 16.1, P97: 18.7 },
      { m: 9, P3: 14.3, P50: 16.0, P97: 18.6 },
      { m: 12, P3: 14.1, P50: 15.7, P97: 18.2 },
      { m: 15, P3: 13.9, P50: 15.4, P97: 17.8 },
      { m: 18, P3: 13.7, P50: 15.2, P97: 17.6 },
      { m: 24, P3: 13.5, P50: 15.2, P97: 17.8 },
    ],
  },
  boys: {
    weight: [
      { m: 0, P3: 2.5, P50: 3.5, P97: 4.6 },
      { m: 1, P3: 3.4, P50: 4.5, P97: 5.8 },
      { m: 2, P3: 4.1, P50: 5.6, P97: 6.9 },
      { m: 3, P3: 4.8, P50: 6.4, P97: 7.7 },
      { m: 6, P3: 6.2, P50: 7.9, P97: 9.5 },
      { m: 9, P3: 7.2, P50: 8.9, P97: 10.6 },
      { m: 12, P3: 7.9, P50: 9.6, P97: 11.5 },
      { m: 15, P3: 8.5, P50: 10.3, P97: 12.3 },
      { m: 18, P3: 9.0, P50: 10.9, P97: 13.0 },
      { m: 24, P3: 9.8, P50: 12.2, P97: 14.6 },
    ],
    height: [
      { m: 0, P3: 46.1, P50: 49.9, P97: 53.7 },
      { m: 1, P3: 50.2, P50: 54.7, P97: 59.1 },
      { m: 2, P3: 53.8, P50: 58.4, P97: 62.9 },
      { m: 3, P3: 56.5, P50: 61.4, P97: 66.1 },
      { m: 6, P3: 61.1, P50: 67.6, P97: 74.1 },
      { m: 9, P3: 64.7, P50: 71.1, P97: 78.1 },
      { m: 12, P3: 67.6, P50: 74.0, P97: 80.9 },
      { m: 15, P3: 70.1, P50: 76.5, P97: 83.6 },
      { m: 18, P3: 72.3, P50: 78.9, P97: 86.1 },
      { m: 24, P3: 75.1, P50: 85.0, P97: 93.2 },
    ],
    bmi: [
      { m: 0, P3: 11.9, P50: 13.7, P97: 15.9 },
      { m: 1, P3: 12.7, P50: 14.8, P97: 17.2 },
      { m: 2, P3: 13.3, P50: 15.4, P97: 17.8 },
      { m: 3, P3: 13.7, P50: 15.7, P97: 18.2 },
      { m: 6, P3: 14.4, P50: 16.2, P97: 18.7 },
      { m: 9, P3: 14.5, P50: 16.1, P97: 18.6 },
      { m: 12, P3: 14.3, P50: 15.8, P97: 18.3 },
      { m: 15, P3: 14.1, P50: 15.6, P97: 18.1 },
      { m: 18, P3: 13.9, P50: 15.4, P97: 18.0 },
      { m: 24, P3: 13.7, P50: 15.4, P97: 18.1 },
    ],
  },
};

const LABELS = {
  weight: { title: 'Weight for Age', unit: 'kg' },
  height: { title: 'Height/Length for Age', unit: 'cm' },
  bmi: { title: 'BMI for Age', unit: 'BMI' },
};

const MultiWHOChart = ({ sex = 'girls', type = 'weight', ageMonths = 6, yValue = 7.8 }) => {
  const data = DATA[sex]?.[type] || [];
  const yLabel = LABELS[type]?.unit || '';
  const title = LABELS[type]?.title || '';
  return (
    <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
      <div className="text-lg font-semibold mb-2">WHO Growth Curve — {title} ({sex === 'girls' ? 'Girls' : 'Boys'})</div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: 8, right: 8, top: 10, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="m" tick={{ fontSize: 12 }} label={{ value: 'Months', position: 'insideBottom', dy: 10 }} />
            <YAxis tick={{ fontSize: 12 }} label={{ value: yLabel, angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="P3" stroke="#FCA5A5" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="P50" stroke="#EC4899" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="P97" stroke="#DB2777" dot={false} strokeWidth={2} />
            <ReferenceDot x={Number(ageMonths)} y={Number(yValue)} r={5} fill="#10B981" stroke="none" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-xs text-muted-foreground mt-2">Demo data for visualization only.</div>
    </div>
  );
};

export default MultiWHOChart;
