'use client';
import { useBreeds } from '@/hooks/useBreeds';
export default function BreedFilter({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (b: string[]) => void;
}) {
  const { data } = useBreeds();
  if (!data) return null;
  return (
    <select
      multiple
      value={selected}
      onChange={(e) =>
        onChange(Array.from(e.target.selectedOptions, (o) => o.value))
      }
      className="h-32 w-full rounded border p-2 text-sm"
    >
      {data.map((b) => (
        <option key={b}>{b}</option>
      ))}
    </select>
  );
}
