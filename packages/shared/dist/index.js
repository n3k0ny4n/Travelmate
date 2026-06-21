"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSchema = exports.UpdateMediaSchema = exports.CreateMediaSchema = exports.MediaSchema = exports.UpdateReminderSchema = exports.CreateReminderSchema = exports.ReminderSchema = exports.UpdateTodoSchema = exports.CreateTodoSchema = exports.TodoSchema = exports.UpdateTicketSchema = exports.CreateTicketSchema = exports.TicketSchema = exports.UpdateTransportLegSchema = exports.CreateTransportLegSchema = exports.TransportLegSchema = exports.UpdateAccommodationSchema = exports.CreateAccommodationSchema = exports.AccommodationSchema = exports.UpdateAgendaItemSchema = exports.CreateAgendaItemSchema = exports.AgendaItemSchema = exports.UpdateDaySchema = exports.CreateDaySchema = exports.DaySchema = exports.UpdateTripSchema = exports.CreateTripSchema = exports.TripSchema = exports.CreateUserSchema = exports.UserSchema = exports.ReminderTypeSchema = exports.TicketKindSchema = exports.TransportModeSchema = exports.AgendaItemTypeSchema = exports.RoleSchema = void 0;
const zod_1 = require("zod");
// Enums
exports.RoleSchema = zod_1.z.enum(['EDITOR', 'VIEWER']);
exports.AgendaItemTypeSchema = zod_1.z.enum(['TRAVEL', 'FERRY', 'CHECKIN', 'CHECKOUT', 'MEAL', 'ACTIVITY', 'NOTE']);
exports.TransportModeSchema = zod_1.z.enum(['CAR', 'FERRY', 'OTHER']);
exports.TicketKindSchema = zod_1.z.enum(['QR', 'BARCODE', 'PDF', 'IMAGE']);
exports.ReminderTypeSchema = zod_1.z.enum(['ALARM', 'FUEL', 'PACK', 'OTHER']);
// User
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string(),
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    role: exports.RoleSchema,
    createdAt: zod_1.z.coerce.date(),
});
exports.CreateUserSchema = zod_1.z.object({
    username: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    role: exports.RoleSchema.optional(),
});
// Trip
exports.TripSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    startDate: zod_1.z.coerce.date(),
    endDate: zod_1.z.coerce.date(),
    description: zod_1.z.string().nullable().optional(),
    coverImageId: zod_1.z.string().nullable().optional(),
    createdBy: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
exports.CreateTripSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    startDate: zod_1.z.coerce.date(),
    endDate: zod_1.z.coerce.date(),
    description: zod_1.z.string().optional(),
    coverImageId: zod_1.z.string().optional(),
});
exports.UpdateTripSchema = exports.CreateTripSchema.partial();
// Day
exports.DaySchema = zod_1.z.object({
    id: zod_1.z.string(),
    tripId: zod_1.z.string(),
    date: zod_1.z.coerce.date(),
    title: zod_1.z.string().nullable().optional(),
    summary: zod_1.z.string().nullable().optional(),
    notes: zod_1.z.string().nullable().optional(),
});
exports.CreateDaySchema = zod_1.z.object({
    date: zod_1.z.coerce.date(),
    title: zod_1.z.string().optional(),
    summary: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
});
exports.UpdateDaySchema = exports.CreateDaySchema.partial();
// AgendaItem
exports.AgendaItemSchema = zod_1.z.object({
    id: zod_1.z.string(),
    tripId: zod_1.z.string(),
    dayId: zod_1.z.string(),
    type: exports.AgendaItemTypeSchema,
    title: zod_1.z.string(),
    startTime: zod_1.z.string().nullable().optional(),
    endTime: zod_1.z.string().nullable().optional(),
    locationAddress: zod_1.z.string().nullable().optional(),
    locationLat: zod_1.z.number().nullable().optional(),
    locationLng: zod_1.z.number().nullable().optional(),
    description: zod_1.z.string().nullable().optional(),
    order: zod_1.z.number(),
    updatedAt: zod_1.z.coerce.date(),
});
exports.CreateAgendaItemSchema = zod_1.z.object({
    dayId: zod_1.z.string(),
    type: exports.AgendaItemTypeSchema,
    title: zod_1.z.string().min(1),
    startTime: zod_1.z.string().optional(),
    endTime: zod_1.z.string().optional(),
    locationAddress: zod_1.z.string().optional(),
    locationLat: zod_1.z.number().optional(),
    locationLng: zod_1.z.number().optional(),
    description: zod_1.z.string().optional(),
    order: zod_1.z.number().optional(),
});
exports.UpdateAgendaItemSchema = exports.CreateAgendaItemSchema.partial();
// Accommodation
exports.AccommodationSchema = zod_1.z.object({
    id: zod_1.z.string(),
    tripId: zod_1.z.string(),
    name: zod_1.z.string(),
    address: zod_1.z.string().nullable().optional(),
    lat: zod_1.z.number().nullable().optional(),
    lng: zod_1.z.number().nullable().optional(),
    checkInAt: zod_1.z.coerce.date().nullable().optional(),
    checkOutAt: zod_1.z.coerce.date().nullable().optional(),
    bookingRef: zod_1.z.string().nullable().optional(),
    bookingUrl: zod_1.z.string().nullable().optional(),
    hostName: zod_1.z.string().nullable().optional(),
    hostEmail: zod_1.z.string().nullable().optional(),
    hostPhone: zod_1.z.string().nullable().optional(),
    rules: zod_1.z.string().nullable().optional(),
    notes: zod_1.z.string().nullable().optional(),
    updatedAt: zod_1.z.coerce.date(),
});
exports.CreateAccommodationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    address: zod_1.z.string().optional(),
    lat: zod_1.z.number().optional(),
    lng: zod_1.z.number().optional(),
    checkInAt: zod_1.z.coerce.date().optional(),
    checkOutAt: zod_1.z.coerce.date().optional(),
    bookingRef: zod_1.z.string().optional(),
    bookingUrl: zod_1.z.string().optional(),
    hostName: zod_1.z.string().optional(),
    hostEmail: zod_1.z.string().optional(),
    hostPhone: zod_1.z.string().optional(),
    rules: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
});
exports.UpdateAccommodationSchema = exports.CreateAccommodationSchema.partial();
// TransportLeg
exports.TransportLegSchema = zod_1.z.object({
    id: zod_1.z.string(),
    tripId: zod_1.z.string(),
    mode: exports.TransportModeSchema,
    from: zod_1.z.string(),
    to: zod_1.z.string(),
    departAt: zod_1.z.coerce.date().nullable().optional(),
    arriveAt: zod_1.z.coerce.date().nullable().optional(),
    bookingRef: zod_1.z.string().nullable().optional(),
    notes: zod_1.z.string().nullable().optional(),
    updatedAt: zod_1.z.coerce.date(),
});
exports.CreateTransportLegSchema = zod_1.z.object({
    mode: exports.TransportModeSchema,
    from: zod_1.z.string().min(1),
    to: zod_1.z.string().min(1),
    departAt: zod_1.z.coerce.date().optional(),
    arriveAt: zod_1.z.coerce.date().optional(),
    bookingRef: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
});
exports.UpdateTransportLegSchema = exports.CreateTransportLegSchema.partial();
// Ticket
exports.TicketSchema = zod_1.z.object({
    id: zod_1.z.string(),
    tripId: zod_1.z.string(),
    transportLegId: zod_1.z.string().nullable().optional(),
    linkedType: zod_1.z.string().nullable().optional(),
    linkedId: zod_1.z.string().nullable().optional(),
    kind: exports.TicketKindSchema,
    label: zod_1.z.string(),
    value: zod_1.z.string().nullable().optional(),
    fileId: zod_1.z.string().nullable().optional(),
    updatedAt: zod_1.z.coerce.date(),
});
exports.CreateTicketSchema = zod_1.z.object({
    transportLegId: zod_1.z.string().optional(),
    linkedType: zod_1.z.string().optional(),
    linkedId: zod_1.z.string().optional(),
    kind: exports.TicketKindSchema,
    label: zod_1.z.string().min(1),
    value: zod_1.z.string().optional(),
    fileId: zod_1.z.string().optional(),
});
exports.UpdateTicketSchema = exports.CreateTicketSchema.partial();
// Todo
exports.TodoSchema = zod_1.z.object({
    id: zod_1.z.string(),
    tripId: zod_1.z.string(),
    text: zod_1.z.string(),
    done: zod_1.z.boolean(),
    dueDate: zod_1.z.coerce.date().nullable().optional(),
    order: zod_1.z.number(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
exports.CreateTodoSchema = zod_1.z.object({
    text: zod_1.z.string().min(1),
    dueDate: zod_1.z.coerce.date().optional(),
    order: zod_1.z.number().optional(),
});
exports.UpdateTodoSchema = zod_1.z.object({
    text: zod_1.z.string().optional(),
    done: zod_1.z.boolean().optional(),
    dueDate: zod_1.z.coerce.date().optional(),
    order: zod_1.z.number().optional(),
});
// Reminder
exports.ReminderSchema = zod_1.z.object({
    id: zod_1.z.string(),
    tripId: zod_1.z.string(),
    dayId: zod_1.z.string().nullable().optional(),
    text: zod_1.z.string(),
    type: exports.ReminderTypeSchema,
    triggerHint: zod_1.z.string().nullable().optional(),
});
exports.CreateReminderSchema = zod_1.z.object({
    dayId: zod_1.z.string().optional(),
    text: zod_1.z.string().min(1),
    type: exports.ReminderTypeSchema,
    triggerHint: zod_1.z.string().optional(),
});
exports.UpdateReminderSchema = exports.CreateReminderSchema.partial();
// Media
exports.MediaSchema = zod_1.z.object({
    id: zod_1.z.string(),
    tripId: zod_1.z.string(),
    fileId: zod_1.z.string(),
    caption: zod_1.z.string().nullable().optional(),
    linkedType: zod_1.z.string().nullable().optional(),
    linkedId: zod_1.z.string().nullable().optional(),
    createdAt: zod_1.z.coerce.date(),
});
exports.CreateMediaSchema = zod_1.z.object({
    fileId: zod_1.z.string(),
    caption: zod_1.z.string().optional(),
    linkedType: zod_1.z.string().optional(),
    linkedId: zod_1.z.string().optional(),
});
exports.UpdateMediaSchema = exports.CreateMediaSchema.partial();
// File
exports.FileSchema = zod_1.z.object({
    id: zod_1.z.string(),
    tripId: zod_1.z.string(),
    mimeType: zod_1.z.string(),
    size: zod_1.z.number(),
    storageKey: zod_1.z.string(),
    originalName: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
});
