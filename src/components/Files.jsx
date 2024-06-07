import { useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useUserFiles, useAddUserFiles, useUpdateUserFiles, useDeleteUserFiles } from '../integrations/supabase/index.js';

const Files = () => {
  const { data: files, isLoading } = useUserFiles();
  const addFile = useAddUserFiles();
  const updateFile = useUpdateUserFiles();
  const deleteFile = useDeleteUserFiles();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentFile, setCurrentFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileDescription, setFileDescription] = useState('');

  const handleAddFile = () => {
    addFile.mutate({ file_name: fileName, file_description: fileDescription });
    onClose();
  };

  const handleUpdateFile = () => {
    updateFile.mutate({ id: currentFile.id, file_name: fileName, file_description: fileDescription });
    onClose();
  };

  const handleDeleteFile = (id) => {
    deleteFile.mutate(id);
  };

  const openModal = (file = null) => {
    setCurrentFile(file);
    setFileName(file ? file.file_name : '');
    setFileDescription(file ? file.file_description : '');
    onOpen();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box>
      <Button onClick={() => openModal()} colorScheme="teal" mb={4}>Add File</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>File Name</Th>
            <Th>File Description</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {files.map(file => (
            <Tr key={file.id}>
              <Td>{file.file_name}</Td>
              <Td>{file.file_description}</Td>
              <Td>
                <Button size="sm" onClick={() => openModal(file)} mr={2}>Edit</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteFile(file.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentFile ? 'Edit File' : 'Add File'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>File Name</FormLabel>
              <Input value={fileName} onChange={(e) => setFileName(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>File Description</FormLabel>
              <Input value={fileDescription} onChange={(e) => setFileDescription(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={currentFile ? handleUpdateFile : handleAddFile}>
              {currentFile ? 'Update' : 'Add'}
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Files;