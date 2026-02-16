'use client';

interface TagFilterProps {
  tags: string[];
  selected: string[];
  onChange: (tags: string[]) => void;
}

export default function TagFilter({ tags, selected, onChange }: TagFilterProps) {
  const handleTag = (tag: string) => {
    onChange(
      selected.includes(tag)
        ? selected.filter((t) => t !== tag)
        : [...selected, tag]
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange([])}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          selected.length === 0
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        すべて
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTag(tag)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected.includes(tag)
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
