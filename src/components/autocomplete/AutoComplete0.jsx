import { useState } from 'react';

/***
basic structure v0:
- 2 elements and 3 states
- one input and one list of items

***/

function AutoComplete0() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-0">
      <input
        className="w-full border-1"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        placeholder="Search..."
      />

      {isOpen && (
        <ul className="border-1 border-t-0">
          {suggestions.map((item) => (
            <li key={item} onClick={() => setQuery(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutoComplete0;
