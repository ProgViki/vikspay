import { useRoute } from "@react-navigation/native";
import { useMemo } from "react";
import { useListHomeConnQuery } from "../api/services/taskApi";

const useOrderedPredefinedTasks = () => {
  const route = useRoute<{
    key: string;
    name: string;
    params: { id: string };
  }>();
  const { id } = route.params;
  const { data: tickets, isFetching, isLoading } = useListHomeConnQuery();
  const ticket = tickets?.find((item) => item.id === id);

  const orderedTasks = useMemo(() => {
    if (!ticket?.tasks) return [];

    const taskOrder: Record<string, number> = {
      "materials and transit": 1,
      installation: 2,
      configuration: 3,
      activation: 4,
      testing: 5,
    };

    return ticket.tasks
      .map((task) => ({
        ...task,
        order: taskOrder[task.title.toLowerCase()] ?? 999,
      }))
      .sort((a, b) => a.order - b.order);
  }, [ticket?.tasks]);

  return { isLoading, isFetching, orderedTasks, ticket };
};

export default useOrderedPredefinedTasks;
