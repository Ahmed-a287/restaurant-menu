// src/components/Menu.js
const Menu = ({ menuItems }) => {
  return (
    <div>
      <h1>Restaurant Menu</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
