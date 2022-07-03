import React, { useRef } from 'react'
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

function AddSiteModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSubmit, register } = useForm()
  const auth = useAuth()
  const toast = useToast()
  const onCreateSite = ({ site, url }) => {
    // console.log({
    //   authorId: auth.user?.uid,
    //   cratedAt: new Date().toLocaleString()
    // })
    createSite({ site, url })

    toast({
      title: `Success!`,
      description: "We've added your site.",
      status: 'success',
      duration: 5000,
      isClosable: true
    })
    onClose()
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
                {...register('site', {
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
            <Button backgroundColor="#99FFFE" type="submit">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddSiteModal
