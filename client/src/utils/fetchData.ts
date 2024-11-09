import axios from 'axios'

export const getDataAPI = async(url: string, token?: string) => {
  const res = await axios.get(`http://localhost:5000${url}`, {
    headers: {
      Authorization: `${token}`
    },
    withCredentials: true
  })

  return res
}

export const postDataAPI = async(url: string, data: object, token?: string) => {
  const res = await axios.post(`http://localhost:5000${url}`, data, {
    headers: {
      Authorization: `${token}`
    },
    withCredentials: true
  })

  return res
}

export const patchDataAPI = async(url: string, data: object, token?: string) => {
  const res = await axios.patch(`http://localhost:5000${url}`, data, {
    headers: {
      Authorization: `${token}`
    },
    withCredentials: true
  })

  return res
}

export const deleteDataAPI = async(url: string, token?: string) => {
  const res = await axios.delete(`http://localhost:5000${url}`, {
    headers: {
      Authorization: `${token}`
    },
    withCredentials: true
  })

  return res
}