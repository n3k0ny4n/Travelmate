import { z } from 'zod'

// Enums
export const RoleSchema = z.enum(['EDITOR', 'VIEWER'])
export type Role = z.infer<typeof RoleSchema>

export const AgendaItemTypeSchema = z.enum(['TRAVEL', 'FERRY', 'CHECKIN', 'CHECKOUT', 'MEAL', 'ACTIVITY', 'NOTE'])
export type AgendaItemType = z.infer<typeof AgendaItemTypeSchema>

export const TransportModeSchema = z.enum(['CAR', 'FERRY', 'OTHER'])
export type TransportMode = z.infer<typeof TransportModeSchema>

export const TicketKindSchema = z.enum(['QR', 'BARCODE', 'PDF', 'IMAGE'])
export type TicketKind = z.infer<typeof TicketKindSchema>

export const ReminderTypeSchema = z.enum(['ALARM', 'FUEL', 'PACK', 'OTHER'])
export type ReminderType = z.infer<typeof ReminderTypeSchema>

// User
export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  role: RoleSchema,
  createdAt: z.coerce.date(),
})
export type User = z.infer<typeof UserSchema>

export const CreateUserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  role: RoleSchema.optional(),
})
export type CreateUser = z.infer<typeof CreateUserSchema>

// Trip
export const TripSchema = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  description: z.string().nullable().optional(),
  coverImageId: z.string().nullable().optional(),
  createdBy: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Trip = z.infer<typeof TripSchema>

export const CreateTripSchema = z.object({
  name: z.string().min(1),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  description: z.string().optional(),
  coverImageId: z.string().optional(),
})
export type CreateTrip = z.infer<typeof CreateTripSchema>

export const UpdateTripSchema = CreateTripSchema.partial()
export type UpdateTrip = z.infer<typeof UpdateTripSchema>

// Day
export const DaySchema = z.object({
  id: z.string(),
  tripId: z.string(),
  date: z.coerce.date(),
  title: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
})
export type Day = z.infer<typeof DaySchema>

export const CreateDaySchema = z.object({
  date: z.coerce.date(),
  title: z.string().optional(),
  summary: z.string().optional(),
  notes: z.string().optional(),
})
export type CreateDay = z.infer<typeof CreateDaySchema>

export const UpdateDaySchema = CreateDaySchema.partial()
export type UpdateDay = z.infer<typeof UpdateDaySchema>

// AgendaItem
export const AgendaItemSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  dayId: z.string(),
  type: AgendaItemTypeSchema,
  title: z.string(),
  startTime: z.string().nullable().optional(),
  endTime: z.string().nullable().optional(),
  locationAddress: z.string().nullable().optional(),
  locationLat: z.number().nullable().optional(),
  locationLng: z.number().nullable().optional(),
  description: z.string().nullable().optional(),
  order: z.number(),
  updatedAt: z.coerce.date(),
})
export type AgendaItem = z.infer<typeof AgendaItemSchema>

export const CreateAgendaItemSchema = z.object({
  dayId: z.string(),
  type: AgendaItemTypeSchema,
  title: z.string().min(1),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  locationAddress: z.string().optional(),
  locationLat: z.number().optional(),
  locationLng: z.number().optional(),
  description: z.string().optional(),
  order: z.number().optional(),
})
export type CreateAgendaItem = z.infer<typeof CreateAgendaItemSchema>

export const UpdateAgendaItemSchema = CreateAgendaItemSchema.partial()
export type UpdateAgendaItem = z.infer<typeof UpdateAgendaItemSchema>

// Accommodation
export const AccommodationSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  name: z.string(),
  address: z.string().nullable().optional(),
  lat: z.number().nullable().optional(),
  lng: z.number().nullable().optional(),
  checkInAt: z.coerce.date().nullable().optional(),
  checkOutAt: z.coerce.date().nullable().optional(),
  bookingRef: z.string().nullable().optional(),
  bookingUrl: z.string().nullable().optional(),
  hostName: z.string().nullable().optional(),
  hostEmail: z.string().nullable().optional(),
  hostPhone: z.string().nullable().optional(),
  rules: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  updatedAt: z.coerce.date(),
})
export type Accommodation = z.infer<typeof AccommodationSchema>

export const CreateAccommodationSchema = z.object({
  name: z.string().min(1),
  address: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  checkInAt: z.coerce.date().optional(),
  checkOutAt: z.coerce.date().optional(),
  bookingRef: z.string().optional(),
  bookingUrl: z.string().optional(),
  hostName: z.string().optional(),
  hostEmail: z.string().optional(),
  hostPhone: z.string().optional(),
  rules: z.string().optional(),
  notes: z.string().optional(),
})
export type CreateAccommodation = z.infer<typeof CreateAccommodationSchema>

export const UpdateAccommodationSchema = CreateAccommodationSchema.partial()
export type UpdateAccommodation = z.infer<typeof UpdateAccommodationSchema>

// TransportLeg
export const TransportLegSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  mode: TransportModeSchema,
  from: z.string(),
  to: z.string(),
  departAt: z.coerce.date().nullable().optional(),
  arriveAt: z.coerce.date().nullable().optional(),
  bookingRef: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  updatedAt: z.coerce.date(),
})
export type TransportLeg = z.infer<typeof TransportLegSchema>

export const CreateTransportLegSchema = z.object({
  mode: TransportModeSchema,
  from: z.string().min(1),
  to: z.string().min(1),
  departAt: z.coerce.date().optional(),
  arriveAt: z.coerce.date().optional(),
  bookingRef: z.string().optional(),
  notes: z.string().optional(),
})
export type CreateTransportLeg = z.infer<typeof CreateTransportLegSchema>

export const UpdateTransportLegSchema = CreateTransportLegSchema.partial()
export type UpdateTransportLeg = z.infer<typeof UpdateTransportLegSchema>

// Ticket
export const TicketSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  transportLegId: z.string().nullable().optional(),
  linkedType: z.string().nullable().optional(),
  linkedId: z.string().nullable().optional(),
  kind: TicketKindSchema,
  label: z.string(),
  value: z.string().nullable().optional(),
  fileId: z.string().nullable().optional(),
  updatedAt: z.coerce.date(),
})
export type Ticket = z.infer<typeof TicketSchema>

export const CreateTicketSchema = z.object({
  transportLegId: z.string().optional(),
  linkedType: z.string().optional(),
  linkedId: z.string().optional(),
  kind: TicketKindSchema,
  label: z.string().min(1),
  value: z.string().optional(),
  fileId: z.string().optional(),
})
export type CreateTicket = z.infer<typeof CreateTicketSchema>

export const UpdateTicketSchema = CreateTicketSchema.partial()
export type UpdateTicket = z.infer<typeof UpdateTicketSchema>

// Todo
export const TodoSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  text: z.string(),
  done: z.boolean(),
  dueDate: z.coerce.date().nullable().optional(),
  order: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Todo = z.infer<typeof TodoSchema>

export const CreateTodoSchema = z.object({
  text: z.string().min(1),
  dueDate: z.coerce.date().optional(),
  order: z.number().optional(),
})
export type CreateTodo = z.infer<typeof CreateTodoSchema>

export const UpdateTodoSchema = z.object({
  text: z.string().optional(),
  done: z.boolean().optional(),
  dueDate: z.coerce.date().optional(),
  order: z.number().optional(),
})
export type UpdateTodo = z.infer<typeof UpdateTodoSchema>

// Reminder
export const ReminderSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  dayId: z.string().nullable().optional(),
  text: z.string(),
  type: ReminderTypeSchema,
  triggerHint: z.string().nullable().optional(),
})
export type Reminder = z.infer<typeof ReminderSchema>

export const CreateReminderSchema = z.object({
  dayId: z.string().optional(),
  text: z.string().min(1),
  type: ReminderTypeSchema,
  triggerHint: z.string().optional(),
})
export type CreateReminder = z.infer<typeof CreateReminderSchema>

export const UpdateReminderSchema = CreateReminderSchema.partial()
export type UpdateReminder = z.infer<typeof UpdateReminderSchema>

// Media
export const MediaSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  fileId: z.string(),
  caption: z.string().nullable().optional(),
  linkedType: z.string().nullable().optional(),
  linkedId: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
})
export type Media = z.infer<typeof MediaSchema>

export const CreateMediaSchema = z.object({
  fileId: z.string(),
  caption: z.string().optional(),
  linkedType: z.string().optional(),
  linkedId: z.string().optional(),
})
export type CreateMedia = z.infer<typeof CreateMediaSchema>

export const UpdateMediaSchema = CreateMediaSchema.partial()
export type UpdateMedia = z.infer<typeof UpdateMediaSchema>

// File
export const FileSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  mimeType: z.string(),
  size: z.number(),
  storageKey: z.string(),
  originalName: z.string(),
  createdAt: z.coerce.date(),
})
export type File = z.infer<typeof FileSchema>
