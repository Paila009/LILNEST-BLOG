import React from "react";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import { CATEGORIES, FORMS } from "../data";

const categoryOptions = [{ label: "All Categories", value: "all" }, ...CATEGORIES.map(c => ({ label: c, value: c }))];
const formOptions = [{ label: "All Forms", value: "all" }, ...FORMS.map(f => ({ label: f, value: f }))];

const trimesterOptions = [
  { label: "All Trimesters", value: "all" },
  { label: "Trimester 1", value: "T1" },
  { label: "Trimester 2", value: "T2" },
  { label: "Trimester 3", value: "T3" },
  { label: "Postpartum", value: "PP" },
];

const ageOptions = [
  { label: "All Ages", value: "all" },
  { label: "0 - 6 months", value: "0-6m" },
  { label: "6 - 12 months", value: "6-12m" },
  { label: "1 - 2 years", value: "1-2y" },
  { label: "2 - 5 years", value: "2-5y" },
  { label: "5 - 10 years", value: "5-10y" },
];

const FilterBar = ({
  activeTab,
  query,
  onQueryChange,
  category,
  onCategoryChange,
  form,
  onFormChange,
  trimester,
  onTrimesterChange,
  ageGroup,
  onAgeGroupChange,
  sortAlpha,
  onToggleSort,
  onClear
}) => {
  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="lg:col-span-2">
          <Input
            label="Search"
            placeholder="Search by name, category, or symptom"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label="Search medicines"
          />
        </div>
        <Select
          label="Category"
          options={categoryOptions}
          value={category}
          onChange={onCategoryChange}
          searchable
          clearable
          aria-label="Filter by category"
        />
        <Select
          label="Form"
          options={formOptions}
          value={form}
          onChange={onFormChange}
          searchable
          clearable
          aria-label="Filter by form"
        />

        {activeTab === 'mother' ? (
          <Select
            label="Trimester"
            options={trimesterOptions}
            value={trimester}
            onChange={onTrimesterChange}
            aria-label="Filter by trimester"
          />
        ) : (
          <Select
            label="Age Group"
            options={ageOptions}
            value={ageGroup}
            onChange={onAgeGroupChange}
            aria-label="Filter by age group"
          />
        )}

        <div className="flex items-end gap-2">
          <Button
            variant={sortAlpha ? 'secondary' : 'ghost'}
            onClick={onToggleSort}
            aria-label="Toggle A to Z sorting"
          >
            Sort A–Z
          </Button>
          <Button variant="outline" onClick={onClear} aria-label="Clear filters">Clear</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
