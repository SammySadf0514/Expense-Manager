import { useState } from "react";
import { api } from "../api";

const Auth = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔁 Toggle mode safely
  const toggleMode = () => {
    setIsLogin((prev) => !prev);

    // reset form (IMPORTANT)
    setForm({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("MODE:", isLogin ? "LOGIN" : "REGISTER");
    console.log("DATA:", form);

    // ✅ basic validation
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      alert("Please fill all fields");
      return;
    }

    try {
      let res;

      if (isLogin) {
        res = await api.login(form);
      } else {
        res = await api.register(form);
      }

      console.log("RESPONSE:", res);

      if (res.user) {
        setUser(res.user);
      } else {
        alert(res.error || "Something went wrong");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="auth">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button type="submit" className="btn">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="auth-switch" onClick={toggleMode}>
          {isLogin ? "Create account" : "Already have account?"}
        </p>
      </div>
    </div>
  );
};

export default Auth;