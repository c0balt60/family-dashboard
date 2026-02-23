import { View, Text, Pressable } from 'react-native'
import type { Todo } from '@pkg/types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
}

export function TodoItem({ todo, onToggle }: Props) {
  return (
    <Pressable onPress={() => onToggle(todo.id)} className="flex-row items-center p-3 border-b border-gray-200">
      <View className={`w-5 h-5 rounded-full border-2 mr-3 ${todo.completed ? 'bg-blue-500 border-blue-500' : 'border-gray-400'}`} />
      <Text className={`text-base ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
        {todo.title}
      </Text>
    </Pressable>
  )
}
