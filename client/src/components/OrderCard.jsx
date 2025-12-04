export default function OrderCard({ order }) {
  return (
    <div className="animate__animated animate__zoomIn">
      <h3>{order.title}</h3>
      <p>{order.description}</p>
    </div>
  );
}
