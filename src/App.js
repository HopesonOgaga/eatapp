import React from "react";
import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddfriend, setShowAddFriend] = useState(false);
  function handleOnclick() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} />
        {showAddfriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleOnclick}>
          {showAddfriend ? "Close" : "Add friend"}
        </Button>
      </div>
      <FromSplitBill></FromSplitBill>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FriendList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          {" "}
          you owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}
      {/* {} */}
      {friend.balance > 0 && (
        <p className="green">
          {" "}
          your {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      )}
      {/*  */}
      {friend.balance === 0 && (
        <p className=""> you and {friend.name} are even</p>
      )}
      <Button>select</Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newfriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newfriend);

    setName("");
    setImage("https://i.pravatar.cc/");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👯‍♂️ friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>😎 image</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>

      <Button>Add</Button>
    </form>
  );
}

function FromSplitBill() {
  return (
    <form className="form-split-bill">
      <h2 className="">split a bill with {}</h2>
      <label>💵 bill value</label>
      <input type="text"></input>

      <label>😿 your expense</label>
      <input type="text"></input>

      <label>😢 x's expenses</label>
      <input type="text" disabled></input>

      <label>who is paying the bill</label>
      <select>
        <option value="user">you</option>
        <option value="x">friend</option>
      </select>
    </form>
  );
}
