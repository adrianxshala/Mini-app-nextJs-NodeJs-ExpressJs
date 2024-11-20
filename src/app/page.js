"use client";
import "./global.css"
import { useState, useEffect } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    emri: "",
    mbiemri: "",
    mosha: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:4000/api");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Gabim gjatë marrjes së të dhënave:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Të dhënat u shtuan me sukses!");
        setFormData({ emri: "", mbiemri: "", mosha: "" });
       
        const fetchUsers = async () => {
          try {
            const response = await fetch("http://localhost:4000/api");
            const data = await response.json();
            setUsers(data);
          } catch (error) {
            console.error("Gabim gjatë rifreskimit të të dhënave:", error);
          }
        };

        fetchUsers();
      } else {
        alert("Gabim gjatë shtimit të të dhënave.");
      }
    } catch (error) {
      console.error(error);
      alert("Nuk u realizua kërkesa.");
    }
  };

  return (
    <div className="box">
      <h1>Forma për të dhëna</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Emri:
          <input
            type="text"
            name="emri"
            value={formData.emri}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Mbiemri:
          <input
            type="text"
            name="mbiemri"
            value={formData.mbiemri}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Mosha:
          <input
            type="number"
            name="mosha"
            value={formData.mosha}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Dërgo</button>
      </form>
      <h2>Lista e Përdoruesve</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.emri} {user.mbiemri}, mosha: {user.mosha}
          </li>
        ))}
      </ul>
    </div>
  );
}
