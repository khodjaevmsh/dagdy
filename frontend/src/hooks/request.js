import { useContext, useEffect, useState } from 'react'
import { auth, signOut } from '../utils/auth'
import baseAxios from '../utils/request'
import { GlobalContext } from '../contexts/GlobalContext'

export function usePostRequest(options = {}) {
    return useRequest({ method: 'POST', ...options })
}

export function usePutRequest(options = {}) {
    return useRequest({ method: 'PUT', ...options })
}

export function useGetRequest(options = {}) {
    return useRequest({ method: 'GET', ...options })
}

export function useDeleteRequest(options = {}) {
    return useRequest({ method: 'DELETE', ...options })
}

export function useRequest(options = {}) {
    const { lang } = useContext(GlobalContext)
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})

    async function request(overrideOptions = {}, sync = false) {
        setLoading(true)

        try {
            const { data } = await baseAxios({
                ...auth(),
                headers: {
                    'Accept-Language': lang,
                },
                ...options,
                ...overrideOptions,
            })
            if (!sync) setResponse(data)
            return { response: data, success: true }
        } catch (e) {
            setError(e.response)
            if (e.response === undefined) {
                console.log('Проверьте интернет соединение', 'is-danger')
            } else if (e.response.status >= 500) {
                console.log('Ошибка сервера.', 'is-danger')
            } else if (e.response.status === 401) {
                signOut()
            }

            return { error: e.response, success: false }
        } finally {
            if (!sync) setLoading(false)
        }
    }

    return { loading, request, error, response, setResponse, setError, setLoading }
}

export function useLoad(options, dependencies = []) {
    const request = useRequest({ method: 'GET', ...options })

    useEffect(() => {
        request.request()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies)

    return request
}
