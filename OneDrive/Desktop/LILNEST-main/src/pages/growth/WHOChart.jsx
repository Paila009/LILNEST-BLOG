import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceDot } from 'recharts';

// Simplified WHO weight-for-age (0–24 months), girls (kg). Values are illustrative for demo.
const WHO_GIRLS = [
  { m: 0, P3: 2.4, P50: 3.3, P97: 4.2 },
  { m: 1, P3: 3.2, P50: 4.2, P97: 5.3 },
  { m: 2, P3: 3.9, P50: 5.1, P97: 6.4 },
  { m: 3, P3: 4.5, P50: 5.8, P97: 7.2 },
  { m: 4, P3: 5.1, P50: 6.4, P97: 7.9 },
  { m: 5, P3: 5.6, P50: 6.9, P97: 8.5 },
  { m: 6, P3: 6.0, P50: 7.3, P97: 8.9 },
  { m: 9, P3: 6.9, P50: 8.2, P97: 9.9 },
  { m: 12, P3: 7.6, P50: 8.9, P97: 10.8 },
  { m: 15, P3: 8.2, P50: 9.6, P97: 11.6 },
  { m: 18, P3: 8.7, P50: 10.2, P97: 12.3 },
  { m: 24, P3: 9.5, P50: 11.5, P97: 13.9 },
];

const WHOChart = ({ childAgeMonths = 6, childWeightKg = 7.8 }) => {
  return (
    <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
      <div className="text-lg font-semibold mb-2">WHO Growth Curve — Weight for Age (Girls)</div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={WHO_GIRLS} margin={{ left: 8, right: 8, top: 10, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="m" tick={{ fontSize: 12 }} label={{ value: 'Months', position: 'insideBottom', dy: 10 }} />
            <YAxis tick={{ fontSize: 12 }} label={{ value: 'kg', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="P3" stroke="#FCA5A5" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="P50" stroke="#EC4899" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="P97" stroke="#DB2777" dot={false} strokeWidth={2} />
            <ReferenceDot x={childAgeMonths} y={childWeightKg} r={5} fill="#10B981" stroke="none" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-xs text-muted-foreground mt-2">Note: Demo data for visualization only.</div>
    </div>
  );
};

export default WHOChart;
