import { useEffect, useState } from "react";
import { api } from "../api";

const Settings = ({ user, setUser }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user]);

  const handleSave = async () => {
    try {
      const updated = await api.updateUser(user._id, { name });

      setUser(updated); // 🔥 instant UI update
      alert("Updated successfully");

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <>
      <h1>Settings</h1>
      <p className="subtitle">Manage your profile</p>

      <div className="card settings-card">
        <div className="form-group">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <button className="btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </>
  );
};

export default Settings;