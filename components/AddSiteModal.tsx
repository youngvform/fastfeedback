import React from 'react'
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useToast
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { createSite } from '@/lib/db'
import { useAuth } from '@/lib/auth'
import { formatISO } from 'date-fns'

function AddSiteModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSubmit, register, reset } = useForm()
  const auth = useAuth()
  const toast = useToast()

  const onCreateSite = ({ name, url }) => {
    createSite({
      name,
      url,
      authorId: auth.user!.uid,
      createdAt: formatISO(new Date())
    })

    toast({
      title: `Success!`,
      description: "We've added your site.",
      status: 'success',
      duration: 5000,
      isClosable: true
    })
    onClose()
    reset()
  }

  return (
    <>
      <Button fontWeight="bold" maxW="200px" onClick={onOpen}>
        Add Your First Site!
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="My Site"
                {...register('name', {
                  required: 'Required'
                })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://mywebsite.com"
                {...register<'url'>('url', {
                  required: 'Required'
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button backgroundColor="#4470ff" textColor="white" type="submit">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddSiteModal
