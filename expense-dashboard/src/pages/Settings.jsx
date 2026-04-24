import { useState } from 'react';

const Settings = ({ user }) => {
const [name, setName] = useState(user.name);

  return (
    <div className="card settings-card">
      <label>Name</label>
      <input value={name} onChange={(e)=>setName(e.target.value)} />

      <button className="btn">Save Changes</button>
    </div>
  );
};

export default Settings;