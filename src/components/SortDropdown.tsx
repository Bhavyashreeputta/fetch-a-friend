export default function SortDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded border px-2 py-1 text-sm"
    >
      <option value="breed:asc">Breed ↑</option>
      <option value="breed:desc">Breed ↓</option>
      <option value="name:asc">Name ↑</option>
      <option value="name:desc">Name ↓</option>
      <option value="age:asc">Age ↑</option>
      <option value="age:desc">Age ↓</option>
    </select>
  );
}
