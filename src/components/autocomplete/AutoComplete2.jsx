import { useEffect, useState } from 'react';

/***
v2: adding keyboard navigation

v1: adding search functionality
 
basic structure v0:
- 2 elements and 3 states
- one input and one list of items

***/

// mock data
const mockItems = [
  'React',
  'Redux',
  'Vue',
  'Angular',
  'Svelte',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Next.js',
];

function AutoComplete2() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // state for keyboard
  const [selectedIdx, setSelectedIdx] = useState(-1);
  // function to handle different key situation
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        setSelectedIdx((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        setSelectedIdx((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        if (selectedIdx > -1) {
          setQuery(suggestions[selectedIdx]);
          setIsOpen(false);
          setSelectedIdx(-1);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIdx(-1);
        break;
      case 'Tab':
        setIsOpen(false);
        setSelectedIdx(-1);
        break;
    }
  };

  // add debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        // simulate api call
        const filtered = mockItems.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-0">
      <input
        className="w-full border-1"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedIdx(-1);
          setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />

      {isOpen && (
        <ul className="border-1 border-t-0">
          {suggestions.map((item, idx) => (
            <li
              key={item}
              onClick={() => setQuery(item)}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                idx === selectedIdx ? 'bg-blue-100' : ''
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutoComplete2;
