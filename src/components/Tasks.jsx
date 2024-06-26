import { useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useTasks, useAddTasks, useUpdateTasks, useDeleteTasks } from '../integrations/supabase/index.js';

const Tasks = () => {
  const { data: tasks, isLoading } = useTasks();
  const addTask = useAddTasks();
  const updateTask = useUpdateTasks();
  const deleteTask = useDeleteTasks();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentTask, setCurrentTask] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    addTask.mutate({ task_name: taskName, task_description: taskDescription });
    onClose();
  };

  const handleUpdateTask = () => {
    updateTask.mutate({ id: currentTask.id, task_name: taskName, task_description: taskDescription });
    onClose();
  };

  const handleDeleteTask = (id) => {
    deleteTask.mutate(id);
  };

  const openModal = (task = null) => {
    setCurrentTask(task);
    setTaskName(task ? task.task_name : '');
    setTaskDescription(task ? task.task_description : '');
    onOpen();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box>
      <Button onClick={() => openModal()} colorScheme="teal" mb={4}>Add Task</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Task Name</Th>
            <Th>Task Description</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map(task => (
            <Tr key={task.id}>
              <Td>{task.task_name}</Td>
              <Td>{task.task_description}</Td>
              <Td>
                <Button size="sm" onClick={() => openModal(task)} mr={2}>Edit</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentTask ? 'Edit Task' : 'Add Task'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Task Name</FormLabel>
              <Input value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Task Description</FormLabel>
              <Input value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={currentTask ? handleUpdateTask : handleAddTask}>
              {currentTask ? 'Update' : 'Add'}
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Tasks;