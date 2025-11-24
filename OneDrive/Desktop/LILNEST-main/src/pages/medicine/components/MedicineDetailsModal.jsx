import React, { useEffect } from "react";
import Button from "../../../components/ui/Button";

const Section = ({ title, children }) => (
  <section className="space-y-2">
    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">{children}</div>
  </section>
);

const RedBox = ({ children }) => (
  <div className="rounded-md p-3 bg-red-50 border border-red-300 text-red-800 dark:bg-red-950/40 dark:border-red-600 dark:text-red-100">
    {children}
  </div>
);

const Modal = ({ open, onClose, title, children }) => {
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose?.();
    if (open) document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-0 flex items-end md:items-center justify-center p-3">
        <div className="w-full max-w-2xl rounded-xl border border-border bg-card shadow-lg transform transition-all duration-200 translate-y-0 opacity-100">
          <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
            <h2 className="text-base md:text-lg font-semibold">{title}</h2>
            <Button variant="ghost" size="icon" aria-label="Close details" onClick={onClose}>×</Button>
          </div>
          <div className="p-4 md:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const MedicineDetailsModal = ({ item, kind = 'mother', open, onClose }) => {
  if (!item) return null;
  return (
    <Modal open={open} onClose={onClose} title={item.name}>
      {/* A. Overview */}
      <Section title="A. Medicine Overview">
        <div className="grid grid-cols-2 gap-3 text-[13px]">
          <div className="bg-background rounded-md p-3 border border-border">
            <div className="text-xs text-gray-600 dark:text-gray-400">Category</div>
            <div className="font-medium text-foreground">{item.category}</div>
          </div>
          <div className="bg-background rounded-md p-3 border border-border">
            <div className="text-xs text-gray-600 dark:text-gray-400">Form</div>
            <div className="font-medium text-foreground">{item.form}</div>
          </div>
          <div className="bg-background rounded-md p-3 border border-border">
            <div className="text-xs text-gray-600 dark:text-gray-400">For whom</div>
            <div className="font-medium text-foreground">{kind === 'mother' ? 'Pregnant Mother' : 'Baby / Child'}</div>
          </div>
          <div className="bg-background rounded-md p-3 border border-border">
            <div className="text-xs text-gray-600 dark:text-gray-400">Safety</div>
            <div className="font-medium text-foreground">{item.safety_level || 'Doctor Required'}</div>
          </div>
        </div>
      </Section>

      {/* B. Use-Case */}
      <Section title="B. Use-Case">
        <p>{item.condition}</p>
      </Section>

      {/* C. Doctor-Entered Dosage */}
      <Section title="C. Doctor-Entered Dosage">
        <div className="bg-background rounded-md p-3 border border-border text-[13px]">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            Only a qualified doctor can enter dosage, frequency & duration. LILNEST does not auto-generate doses.
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Dose</div>
              <div className="font-medium text-foreground">—</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Frequency / day</div>
              <div className="font-medium text-foreground">—</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Duration</div>
              <div className="font-medium text-foreground">—</div>
            </div>
            {kind === 'baby' ? (
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Weight & Age</div>
                <div className="font-medium text-foreground">Doctor will enter (kg, months/years)</div>
              </div>
            ) : (
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Trimester Guidance</div>
                <div className="font-medium text-foreground">{item.trimester_safety || 'Per obstetrician advice'}</div>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* D. Important Precautions */}
      <Section title="D. Important Precautions">
        <ul className="list-disc pl-5 space-y-1">
          {(item.precautions || []).map((p, idx) => (
            <li key={idx}>{p}</li>
          ))}
        </ul>
      </Section>

      {/* E. Emergency Red-Flags */}
      <Section title="E. Emergency Red-Flags">
        <RedBox>
          <ul className="list-disc pl-5 text-[13px] space-y-1">
            {(item.emergency_flags || []).map((f, idx) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
          <div className="mt-2 text-[12px] font-medium">
            Seek emergency care immediately if any of these appear.
          </div>
        </RedBox>
      </Section>

      {/* F. Safe Usage Tips */}
      <Section title="F. Safe Usage Tips">
        <ul className="list-disc pl-5 space-y-1">
          <li>Do not reuse old prescriptions.</li>
          <li>Do not mix with unknown home remedies.</li>
          <li>Use proper measuring tools for liquids.</li>
          <li>Track doses in the LILNEST app.</li>
        </ul>
      </Section>
    </Modal>
  );
};

export default MedicineDetailsModal;
