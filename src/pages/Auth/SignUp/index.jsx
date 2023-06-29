import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
} from '@chakra-ui/react';
import { IconContext } from 'react-icons';
import { useNavigate, Link as LinkTo } from "react-router-dom"
import { useForm } from "react-hook-form"
import { pb } from "../../../server"
import { toast } from "react-toastify"
import { GrFormView, GrFormViewHide } from 'react-icons/gr';
import { formRegex } from '../../../helpers';

export default function Signup() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()

  const onSubmit = async (body) => {
    setIsLoading(true)
    try {
      await pb
        .collection('users')
        .create(body)

      navigate('/auth/signin')
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

  const {
    register,
    handleSubmit,
    getValues,
    formState: {
      errors,
    },
  } = useForm()

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
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
            <HStack>
              <Box>
                <FormControl id="nickName" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input placeholder="Alex"
                    type="text"
                    {
                    ...register('name', {
                      required: 'Обязательное поле',
                      maxLength: {
                        value: 25,
                        message: 'Максимум 25 символов',
                      }
                    })
                    } />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="sername">
                  <FormLabel>Username</FormLabel>
                  <Input placeholder="Username"
                    type="text"
                    {
                    ...register('username', {
                      required: 'Обязательное поле',
                      pattern: {
                        value: formRegex.usernameRegex,
                        message: `Имя пользователя должно состоять только из маленьких латинских букв, цифр или символа '_'`,
                      },
                      maxLength: {
                        value: 10,
                        message: 'Максимум 10 символов',
                      },
                      minLength: {
                        value: 3,
                        message: 'Минимум 3 символа',
                      }
                    })
                    } />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input placeholder="example@gmail.com"
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
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} placeholder="******"
                  {
                  ...register('password', {
                    required: 'Обязательное поле',
                    minLength: {
                      value: 8,
                      message: 'Минимум 8 символов',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Максимум 72 символов',
                    }
                  })
                  } />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>

                    {showPassword ? <GrFormView /> : <GrFormViewHide />}


                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="repeat_password" isRequired>
              <FormLabel>Repeat password</FormLabel>
              <InputGroup>
                <Input placeholder="******"
                  type="password"
                  {
                  ...register('passwordConfirm', {
                    required: 'Обязательное поле',
                    minLength: {
                      value: 6,
                      message: 'Минимум 6 символов',
                    },
                    validate: {
                      match: value => getValues().password === value || 'Пароли не совпадают',
                    }
                  })
                  } />
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                isLoading={isLoading}
                onClick={handleSubmit(onSubmit)}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}>
                  <LinkTo to='/auth/signin'>Login</LinkTo>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}