import React from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { Link as LinkTo, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { formRegex } from '../../../helpers';
import { pb } from '../../../server';
import { toast } from 'react-toastify';


export default function SignIn() {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm()

  const onSubmit = async (body) => {
    setIsLoading(true)

    try {
      await pb
        .collection('users')
        .authWithPassword(
          body.email,
          body.password,
        )

      navigate('/')
    } catch (e) {
      toast(e.data.message, {
        position: 'top-center',
        autoClose: 3000,
        type: 'error',
      })

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="example@gmail.com"
                type="email"
                {
                ...register('email', {
                  required: 'Обязательное поле',
                  pattern: {
                    value: formRegex.emailRegex,
                    message: 'Некорректная почта',
                  }
                })
                } />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="******"
                type="password"
                {
                ...register('password', {
                  required: 'Обязательное поле',
                  minLength: {
                    value: 6,
                    message: 'Минимум 6 символов',
                  }
                })
                } />
            </FormControl>
            <Stack spacing={10}>
              <Button
                isLoading={isLoading}
                onClick={handleSubmit(onSubmit)}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
              <Stack>
                <Text align={'center'}>
                  No account ?  <Link color={'blue.400'}>
                    <LinkTo to='/auth/signup'>register</LinkTo>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}