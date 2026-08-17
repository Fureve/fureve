"use client";

export type VariantOption = {
  value: string;
  priceAdjustment: number;
};

function OptionGroup({
  label,
  placeholder,
  enabled,
  onToggle,
  options,
  onChange,
}: {
  label: string;
  placeholder: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  options: VariantOption[];
  onChange: (options: VariantOption[]) => void;
}) {
  function addOption() {
    onChange([...options, { value: "", priceAdjustment: 0 }]);
  }

  function updateOption(index: number, field: keyof VariantOption, value: string) {
    const updated = [...options];
    if (field === "priceAdjustment") {
      updated[index] = { ...updated[index], priceAdjustment: parseFloat(value) || 0 };
    } else {
      updated[index] = { ...updated[index], value };
    }
    onChange(updated);
  }

  function removeOption(index: number) {
    onChange(options.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => {
            onToggle(e.target.checked);
            if (e.target.checked && options.length === 0) {
              onChange([{ value: "", priceAdjustment: 0 }]);
            }
          }}
        />
        <span className="font-sans text-sm text-charcoal">{label}</span>
      </label>

      {enabled && (
        <div className="flex flex-col gap-2 pl-6">
          {options.map((opt, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder={placeholder}
                value={opt.value}
                onChange={(e) => updateOption(index, "value", e.target.value)}
                className="flex-1 bg-transparent border border-charcoal/20 px-3 py-2 font-sans text-sm text-charcoal focus:outline-none focus:border-gold transition-colors"
              />
              <span className="font-sans text-xs text-charcoal/50 shrink-0">+₦</span>
              <input
                type="number"
                step="0.01"
                placeholder="0"
                value={opt.priceAdjustment || ""}
                onChange={(e) => updateOption(index, "priceAdjustment", e.target.value)}
                className="w-24 bg-transparent border border-charcoal/20 px-3 py-2 font-sans text-sm text-charcoal focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="text-red-600 hover:text-red-800 text-sm px-2"
                aria-label="Remove option"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="font-sans text-xs text-gold hover:text-charcoal transition-colors self-start mt-1"
          >
            + Add another option
          </button>
        </div>
      )}
    </div>
  );
}

export default function VariantOptionsEditor({
  hasSizes,
  setHasSizes,
  sizeOptions,
  setSizeOptions,
  hasLengths,
  setHasLengths,
  lengthOptions,
  setLengthOptions,
  hasColors,
  setHasColors,
  colorOptions,
  setColorOptions,
  hasFonts,
  setHasFonts,
  fontOptions,
  setFontOptions,
}: {
  hasSizes: boolean;
  setHasSizes: (v: boolean) => void;
  sizeOptions: VariantOption[];
  setSizeOptions: (v: VariantOption[]) => void;
  hasLengths: boolean;
  setHasLengths: (v: boolean) => void;
  lengthOptions: VariantOption[];
  setLengthOptions: (v: VariantOption[]) => void;
  hasColors: boolean;
  setHasColors: (v: boolean) => void;
  colorOptions: VariantOption[];
  setColorOptions: (v: VariantOption[]) => void;
  hasFonts?: boolean;
  setHasFonts?: (v: boolean) => void;
  fontOptions?: VariantOption[];
  setFontOptions?: (v: VariantOption[]) => void;
}) {
  return (
    <div className="border border-charcoal/10 p-5 flex flex-col gap-6">
      <p className="font-sans text-xs tracking-widest text-charcoal/70 uppercase">
        Variant Options
      </p>
      <p className="font-sans text-xs text-charcoal/50 -mt-4">
        Leave price at 0 for options that don't change the price.
      </p>

      <OptionGroup
        label="This item comes in different sizes"
        placeholder="e.g. Large"
        enabled={hasSizes}
        onToggle={setHasSizes}
        options={sizeOptions}
        onChange={setSizeOptions}
      />

      <OptionGroup
        label="This item comes in different lengths"
        placeholder="e.g. 18in"
        enabled={hasLengths}
        onToggle={setHasLengths}
        options={lengthOptions}
        onChange={setLengthOptions}
      />

      <OptionGroup
        label="This item comes in different colors"
        placeholder="e.g. Gold"
        enabled={hasColors}
        onToggle={setHasColors}
        options={colorOptions}
        onChange={setColorOptions}
      />

      {hasFonts !== undefined && setHasFonts && fontOptions && setFontOptions && (
        <OptionGroup
          label="This item offers different fonts for engraving"
          placeholder="e.g. Script"
          enabled={hasFonts}
          onToggle={setHasFonts}
          options={fontOptions}
          onChange={setFontOptions}
        />
      )}
    </div>
  );
}
