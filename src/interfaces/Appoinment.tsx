export interface AppoinmentResponse {
  edges: AppoinmentModal[]
  pageInfo: PaginationInfo
}

export interface AppoinmentModal {
  node: Node
  cursor: string
}

export interface Node {
  id: string
  paymentId: string
  userId: string
  duration: number
  scheduledTime: string
  status: string
  workOrder: WorkOrder
}

export interface WorkOrder {
  service: string
}

export interface PaginationInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  previousCursor: string
  nextCursor: string
}