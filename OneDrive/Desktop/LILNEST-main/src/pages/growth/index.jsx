import React from 'react';
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import MultiWHOChart from './MultiWHOChart';

const Stat = ({ label, value }) => (
  <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
    <div className="text-xs text-muted-foreground">{label}</div>
    <div className="text-xl font-semibold">{value}</div>
  </div>
);

const Growth = () => {
  const [sex, setSex] = React.useState('girls');
  const [type, setType] = React.useState('weight'); // weight | height | bmi
  const [age, setAge] = React.useState(6);
  const [weight, setWeight] = React.useState(7.8);
  const [height, setHeight] = React.useState(68);
  const [bmi, setBmi] = React.useState(16.8);

  React.useEffect(() => {
    // Auto-calc BMI if weight/height present (height in cm)
    if (type !== 'bmi' && height > 0) {
      const h = Number(height) / 100;
      const val = h > 0 ? Number(weight) / (h * h) : 0;
      if (isFinite(val)) setBmi(Number(val.toFixed(1)));
    }
  }, [weight, height, type]);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Child Growth & Milestones</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Weight" value="7.8 kg" />
          <Stat label="Length/Height" value="68 cm" />
          <Stat label="Head Circ." value="43 cm" />
          <Stat label="BMI" value="16.8" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <MultiWHOChart sex={sex} type={type} ageMonths={Number(age)} yValue={Number(type==='weight'?weight:type==='height'?height:bmi)} />
          </div>
          <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
            <div className="text-lg font-semibold mb-2">Child Inputs</div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <select value={sex} onChange={(e)=>setSex(e.target.value)} className="bg-input px-3 py-2 rounded-lg outline-none">
                <option value="girls">Girls</option>
                <option value="boys">Boys</option>
              </select>
              <select value={type} onChange={(e)=>setType(e.target.value)} className="bg-input px-3 py-2 rounded-lg outline-none">
                <option value="weight">Weight</option>
                <option value="height">Height/Length</option>
                <option value="bmi">BMI</option>
              </select>
            </div>
            <div className="space-y-3">
              <Input label="Age (months)" type="number" value={age} onChange={(e)=>setAge(e.target.value)} />
              {type === 'weight' && (
                <Input label="Weight (kg)" type="number" value={weight} onChange={(e)=>setWeight(e.target.value)} />
              )}
              {type === 'height' && (
                <Input label="Height/Length (cm)" type="number" value={height} onChange={(e)=>setHeight(e.target.value)} />
              )}
              {type === 'bmi' && (
                <Input label="BMI" type="number" step="0.1" value={bmi} onChange={(e)=>setBmi(e.target.value)} />
              )}
              <div className="text-xs text-muted-foreground">Your point will show on the curve.</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
            <div className="font-semibold mb-2">Feeding</div>
            <div className="text-sm text-muted-foreground">Breastfeed / formula / solids stage</div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
            <div className="font-semibold mb-2">Milestones</div>
            <div className="text-sm text-muted-foreground">First smile, rolling, crawling, babbling</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Growth;
