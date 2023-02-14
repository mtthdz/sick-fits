import { useState } from 'react';

export default function CreateProduct() {
  const [name, setName] = useState('Wes');

  return (
    <form>
      <label htmlFor="name">
        name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>
    </form>
  );
}
