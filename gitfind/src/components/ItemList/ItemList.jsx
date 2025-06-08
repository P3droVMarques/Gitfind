import './ItemList.css';
// eslint-disable-next-line react/prop-types
function ItemList({ title, description }){ /* This component displays a list item with a title and description.*/

  return (
    <div className="item-list">
      <strong>{title}</strong>
      <p>{description}</p>
      <hr/>
    </div>
  );
}

export default ItemList;