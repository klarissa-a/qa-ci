
import axios from 'axios'
import config from '../config/config'

const client = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true,
})

const createBook = async ({ userId, isbn, token }) => {
  const response = await client.post(`/BookStore/v1/Books`, {
    userId,
    collectionOfIsbns: [{
      isbn
    }]
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const deleteBook = async ({ userId, isbn, token }) => {
  const response = await client.delete(`/BookStore/v1/Book`, {
    data: {
      userId,
      isbn
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const updateBook = async ({ userId, isbn, newIsbn, token }) => {
  const response = await client.put(`/BookStore/v1/Books/`+ isbn, {
    userId,
    isbn: newIsbn
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const getBook = async ({ isbn, token }) => {
  const response = await client.get(`/BookStore/v1/Book?ISBN=` + isbn, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}


export default {
  create: createBook,
  delete: deleteBook,
  update: updateBook,
  get: getBook,
  
}