import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserType } from "../types/user";

const User = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  const fetchUser = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/users");
      setUsers(res.data.users);
      console.log(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="flex flex-wrap gap-4 justify-center p-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="max-w-sm rounded-xl shadow-md p-4 bg-white border border-gray-200 flex flex-col items-center"
        >
          <img
            src={user.image}
            alt={user.firstName}
            className="w-24 h-24 rounded-full object-cover mb-2"
          />
          <h2 className="text-xl font-semibold text-center">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-center text-gray-500">{user.company.title}</p>
          <p className="text-center text-sm text-gray-400">
            {user.company.name}
          </p>
          <div className="mt-4 text-sm text-gray-700 flex flex-col gap-1 items-start w-full px-4">
            <p>📧 {user.email}</p>
            <p>📞 {user.phone}</p>
            <p>
              📍 {user.address.city}, {user.address.state}
            </p>
            <p>
              🧓 Age: {user.age} | 🚻 {user.gender}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default User;
