import { serviceRequests as mockRequests } from '~/data/requests'
import type { ServiceRequest } from '~/data/requests'

const requests = ref<ServiceRequest[]>([...mockRequests])

export function useRequests() {
  function createRequest(data: Omit<ServiceRequest, 'id' | 'status' | 'createdAt' | 'offers'>) {
    const newRequest: ServiceRequest = {
      ...data,
      id: `req-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString().split('T')[0],
      offers: []
    }
    requests.value.unshift(newRequest)
    return newRequest
  }

  function getMyRequests(clientId: string) {
    return computed(() => requests.value.filter(r => r.clientId === clientId))
  }

  function getRequestsByCategory(categorySlug: string) {
    return computed(() => requests.value.filter(r => r.category === categorySlug && r.status === 'new'))
  }

  return { requests, createRequest, getMyRequests, getRequestsByCategory }
}
