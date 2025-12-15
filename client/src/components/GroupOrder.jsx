import { useParams } from "react-router-dom";
import { useStore } from "../store/useStore";
import OrderCard from "./OrderCard";

export default function GroupOrder() {
  const { id } = useParams();

  const groups = useStore((s) => s.groups);
  const orders = useStore((s) => s.orders);

  const group = groups.find((g) => g.id === Number(id));
  if (!group)
    return <div className="mt-20 lg:mt-28 px-14">Группа не найдена</div>;

  // find incoming
  const order = orders.find((o) => o.id === group.id);
  if (!order)
    return <div className="mt-20 lg:mt-28 px-14">Приход не найден</div>;

  return (
    <div className="w-full mt-28 px-14">
      <h2 className="text-neutral-800 font-medium text-xl mb-12">
        Приходы / {orders.length}
      </h2>

      <OrderCard order={order} />
    </div>
  );
}
