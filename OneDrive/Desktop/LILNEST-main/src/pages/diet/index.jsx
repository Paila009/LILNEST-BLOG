import React from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import FoodSafetyScanner from './FoodSafetyScanner';
import AIDietPlanner from './AIDietPlanner';

const Card = ({ title, desc, children }) => (
  <div className="bg-card rounded-xl p-4 shadow-soft border border-border">
    <div className="text-lg font-semibold mb-1 text-foreground">{title}</div>
    <div className="text-sm text-muted-foreground mb-3">{desc}</div>
    {children}
  </div>
);

const Diet = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Smart Diet Planner</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AIDietPlanner />
          <Card title="Trimester-wise Menu" desc="Iron, folate, DHA-rich Indian meals.">
            <Button size="sm" variant="secondary">Generate Plan</Button>
          </Card>
          <Card title="Condition Specific" desc="Gestational diabetes, anemia friendly menus.">
            <Button size="sm" variant="secondary">Choose Condition</Button>
          </Card>
          <Card title="Regional Indian Diets" desc="Telugu, Tamil, Bengali, Gujarati, Punjabi.">
            <Button size="sm" variant="secondary">Pick Region</Button>
          </Card>
          <FoodSafetyScanner />
          <Card title="Hydration Counter" desc="Smart reminders + warm water prompts.">
            <Button size="sm" variant="secondary" onClick={()=>alert('Reminder set!')}>Start Reminders</Button>
          </Card>
          <Card title="Kids Nutrition" desc="Stage-wise plans (6–9m, 1–3y, 3–8y)." />
        </div>
      </main>
    </div>
  );
};

export default Diet;
