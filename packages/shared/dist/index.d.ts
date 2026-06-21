import { z } from 'zod';
export declare const RoleSchema: z.ZodEnum<["EDITOR", "VIEWER"]>;
export type Role = z.infer<typeof RoleSchema>;
export declare const AgendaItemTypeSchema: z.ZodEnum<["TRAVEL", "FERRY", "CHECKIN", "CHECKOUT", "MEAL", "ACTIVITY", "NOTE"]>;
export type AgendaItemType = z.infer<typeof AgendaItemTypeSchema>;
export declare const TransportModeSchema: z.ZodEnum<["CAR", "FERRY", "OTHER"]>;
export type TransportMode = z.infer<typeof TransportModeSchema>;
export declare const TicketKindSchema: z.ZodEnum<["QR", "BARCODE", "PDF", "IMAGE"]>;
export type TicketKind = z.infer<typeof TicketKindSchema>;
export declare const ReminderTypeSchema: z.ZodEnum<["ALARM", "FUEL", "PACK", "OTHER"]>;
export type ReminderType = z.infer<typeof ReminderTypeSchema>;
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    username: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<["EDITOR", "VIEWER"]>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    username: string;
    email: string;
    role: "EDITOR" | "VIEWER";
    createdAt: Date;
}, {
    id: string;
    username: string;
    email: string;
    role: "EDITOR" | "VIEWER";
    createdAt: Date;
}>;
export type User = z.infer<typeof UserSchema>;
export declare const CreateUserSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<["EDITOR", "VIEWER"]>>;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    role?: "EDITOR" | "VIEWER" | undefined;
}, {
    username: string;
    email: string;
    role?: "EDITOR" | "VIEWER" | undefined;
}>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export declare const TripSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    startDate: z.ZodDate;
    endDate: z.ZodDate;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    coverImageId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdBy: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    name: string;
    startDate: Date;
    endDate: Date;
    createdBy: string;
    updatedAt: Date;
    description?: string | null | undefined;
    coverImageId?: string | null | undefined;
}, {
    id: string;
    createdAt: Date;
    name: string;
    startDate: Date;
    endDate: Date;
    createdBy: string;
    updatedAt: Date;
    description?: string | null | undefined;
    coverImageId?: string | null | undefined;
}>;
export type Trip = z.infer<typeof TripSchema>;
export declare const CreateTripSchema: z.ZodObject<{
    name: z.ZodString;
    startDate: z.ZodDate;
    endDate: z.ZodDate;
    description: z.ZodOptional<z.ZodString>;
    coverImageId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    startDate: Date;
    endDate: Date;
    description?: string | undefined;
    coverImageId?: string | undefined;
}, {
    name: string;
    startDate: Date;
    endDate: Date;
    description?: string | undefined;
    coverImageId?: string | undefined;
}>;
export type CreateTrip = z.infer<typeof CreateTripSchema>;
export declare const UpdateTripSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodDate>;
    endDate: z.ZodOptional<z.ZodDate>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    coverImageId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    description?: string | undefined;
    coverImageId?: string | undefined;
}, {
    name?: string | undefined;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    description?: string | undefined;
    coverImageId?: string | undefined;
}>;
export type UpdateTrip = z.infer<typeof UpdateTripSchema>;
export declare const DaySchema: z.ZodObject<{
    id: z.ZodString;
    tripId: z.ZodString;
    date: z.ZodDate;
    title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    summary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    tripId: string;
    date: Date;
    title?: string | null | undefined;
    summary?: string | null | undefined;
    notes?: string | null | undefined;
}, {
    id: string;
    tripId: string;
    date: Date;
    title?: string | null | undefined;
    summary?: string | null | undefined;
    notes?: string | null | undefined;
}>;
export type Day = z.infer<typeof DaySchema>;
export declare const CreateDaySchema: z.ZodObject<{
    date: z.ZodDate;
    title: z.ZodOptional<z.ZodString>;
    summary: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    date: Date;
    title?: string | undefined;
    summary?: string | undefined;
    notes?: string | undefined;
}, {
    date: Date;
    title?: string | undefined;
    summary?: string | undefined;
    notes?: string | undefined;
}>;
export type CreateDay = z.infer<typeof CreateDaySchema>;
export declare const UpdateDaySchema: z.ZodObject<{
    date: z.ZodOptional<z.ZodDate>;
    title: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    summary: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    date?: Date | undefined;
    title?: string | undefined;
    summary?: string | undefined;
    notes?: string | undefined;
}, {
    date?: Date | undefined;
    title?: string | undefined;
    summary?: string | undefined;
    notes?: string | undefined;
}>;
export type UpdateDay = z.infer<typeof UpdateDaySchema>;
export declare const AgendaItemSchema: z.ZodObject<{
    id: z.ZodString;
    tripId: z.ZodString;
    dayId: z.ZodString;
    type: z.ZodEnum<["TRAVEL", "FERRY", "CHECKIN", "CHECKOUT", "MEAL", "ACTIVITY", "NOTE"]>;
    title: z.ZodString;
    startTime: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    endTime: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    locationAddress: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    locationLat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    locationLng: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    order: z.ZodNumber;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    type: "TRAVEL" | "FERRY" | "CHECKIN" | "CHECKOUT" | "MEAL" | "ACTIVITY" | "NOTE";
    id: string;
    updatedAt: Date;
    tripId: string;
    title: string;
    dayId: string;
    order: number;
    description?: string | null | undefined;
    startTime?: string | null | undefined;
    endTime?: string | null | undefined;
    locationAddress?: string | null | undefined;
    locationLat?: number | null | undefined;
    locationLng?: number | null | undefined;
}, {
    type: "TRAVEL" | "FERRY" | "CHECKIN" | "CHECKOUT" | "MEAL" | "ACTIVITY" | "NOTE";
    id: string;
    updatedAt: Date;
    tripId: string;
    title: string;
    dayId: string;
    order: number;
    description?: string | null | undefined;
    startTime?: string | null | undefined;
    endTime?: string | null | undefined;
    locationAddress?: string | null | undefined;
    locationLat?: number | null | undefined;
    locationLng?: number | null | undefined;
}>;
export type AgendaItem = z.infer<typeof AgendaItemSchema>;
export declare const CreateAgendaItemSchema: z.ZodObject<{
    dayId: z.ZodString;
    type: z.ZodEnum<["TRAVEL", "FERRY", "CHECKIN", "CHECKOUT", "MEAL", "ACTIVITY", "NOTE"]>;
    title: z.ZodString;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    locationAddress: z.ZodOptional<z.ZodString>;
    locationLat: z.ZodOptional<z.ZodNumber>;
    locationLng: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: "TRAVEL" | "FERRY" | "CHECKIN" | "CHECKOUT" | "MEAL" | "ACTIVITY" | "NOTE";
    title: string;
    dayId: string;
    description?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    locationAddress?: string | undefined;
    locationLat?: number | undefined;
    locationLng?: number | undefined;
    order?: number | undefined;
}, {
    type: "TRAVEL" | "FERRY" | "CHECKIN" | "CHECKOUT" | "MEAL" | "ACTIVITY" | "NOTE";
    title: string;
    dayId: string;
    description?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    locationAddress?: string | undefined;
    locationLat?: number | undefined;
    locationLng?: number | undefined;
    order?: number | undefined;
}>;
export type CreateAgendaItem = z.infer<typeof CreateAgendaItemSchema>;
export declare const UpdateAgendaItemSchema: z.ZodObject<{
    dayId: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["TRAVEL", "FERRY", "CHECKIN", "CHECKOUT", "MEAL", "ACTIVITY", "NOTE"]>>;
    title: z.ZodOptional<z.ZodString>;
    startTime: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    endTime: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    locationAddress: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    locationLat: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    locationLng: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    order: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    type?: "TRAVEL" | "FERRY" | "CHECKIN" | "CHECKOUT" | "MEAL" | "ACTIVITY" | "NOTE" | undefined;
    description?: string | undefined;
    title?: string | undefined;
    dayId?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    locationAddress?: string | undefined;
    locationLat?: number | undefined;
    locationLng?: number | undefined;
    order?: number | undefined;
}, {
    type?: "TRAVEL" | "FERRY" | "CHECKIN" | "CHECKOUT" | "MEAL" | "ACTIVITY" | "NOTE" | undefined;
    description?: string | undefined;
    title?: string | undefined;
    dayId?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    locationAddress?: string | undefined;
    locationLat?: number | undefined;
    locationLng?: number | undefined;
    order?: number | undefined;
}>;
export type UpdateAgendaItem = z.infer<typeof UpdateAgendaItemSchema>;
export declare const AccommodationSchema: z.ZodObject<{
    id: z.ZodString;
    tripId: z.ZodString;
    name: z.ZodString;
    address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    lat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    lng: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    checkInAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    checkOutAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    bookingRef: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bookingUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    hostName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    hostEmail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    hostPhone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    rules: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    updatedAt: Date;
    tripId: string;
    notes?: string | null | undefined;
    address?: string | null | undefined;
    lat?: number | null | undefined;
    lng?: number | null | undefined;
    checkInAt?: Date | null | undefined;
    checkOutAt?: Date | null | undefined;
    bookingRef?: string | null | undefined;
    bookingUrl?: string | null | undefined;
    hostName?: string | null | undefined;
    hostEmail?: string | null | undefined;
    hostPhone?: string | null | undefined;
    rules?: string | null | undefined;
}, {
    id: string;
    name: string;
    updatedAt: Date;
    tripId: string;
    notes?: string | null | undefined;
    address?: string | null | undefined;
    lat?: number | null | undefined;
    lng?: number | null | undefined;
    checkInAt?: Date | null | undefined;
    checkOutAt?: Date | null | undefined;
    bookingRef?: string | null | undefined;
    bookingUrl?: string | null | undefined;
    hostName?: string | null | undefined;
    hostEmail?: string | null | undefined;
    hostPhone?: string | null | undefined;
    rules?: string | null | undefined;
}>;
export type Accommodation = z.infer<typeof AccommodationSchema>;
export declare const CreateAccommodationSchema: z.ZodObject<{
    name: z.ZodString;
    address: z.ZodOptional<z.ZodString>;
    lat: z.ZodOptional<z.ZodNumber>;
    lng: z.ZodOptional<z.ZodNumber>;
    checkInAt: z.ZodOptional<z.ZodDate>;
    checkOutAt: z.ZodOptional<z.ZodDate>;
    bookingRef: z.ZodOptional<z.ZodString>;
    bookingUrl: z.ZodOptional<z.ZodString>;
    hostName: z.ZodOptional<z.ZodString>;
    hostEmail: z.ZodOptional<z.ZodString>;
    hostPhone: z.ZodOptional<z.ZodString>;
    rules: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    notes?: string | undefined;
    address?: string | undefined;
    lat?: number | undefined;
    lng?: number | undefined;
    checkInAt?: Date | undefined;
    checkOutAt?: Date | undefined;
    bookingRef?: string | undefined;
    bookingUrl?: string | undefined;
    hostName?: string | undefined;
    hostEmail?: string | undefined;
    hostPhone?: string | undefined;
    rules?: string | undefined;
}, {
    name: string;
    notes?: string | undefined;
    address?: string | undefined;
    lat?: number | undefined;
    lng?: number | undefined;
    checkInAt?: Date | undefined;
    checkOutAt?: Date | undefined;
    bookingRef?: string | undefined;
    bookingUrl?: string | undefined;
    hostName?: string | undefined;
    hostEmail?: string | undefined;
    hostPhone?: string | undefined;
    rules?: string | undefined;
}>;
export type CreateAccommodation = z.infer<typeof CreateAccommodationSchema>;
export declare const UpdateAccommodationSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    lat: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    lng: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    checkInAt: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    checkOutAt: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    bookingRef: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    bookingUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    hostName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    hostEmail: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    hostPhone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    rules: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    notes?: string | undefined;
    address?: string | undefined;
    lat?: number | undefined;
    lng?: number | undefined;
    checkInAt?: Date | undefined;
    checkOutAt?: Date | undefined;
    bookingRef?: string | undefined;
    bookingUrl?: string | undefined;
    hostName?: string | undefined;
    hostEmail?: string | undefined;
    hostPhone?: string | undefined;
    rules?: string | undefined;
}, {
    name?: string | undefined;
    notes?: string | undefined;
    address?: string | undefined;
    lat?: number | undefined;
    lng?: number | undefined;
    checkInAt?: Date | undefined;
    checkOutAt?: Date | undefined;
    bookingRef?: string | undefined;
    bookingUrl?: string | undefined;
    hostName?: string | undefined;
    hostEmail?: string | undefined;
    hostPhone?: string | undefined;
    rules?: string | undefined;
}>;
export type UpdateAccommodation = z.infer<typeof UpdateAccommodationSchema>;
export declare const TransportLegSchema: z.ZodObject<{
    id: z.ZodString;
    tripId: z.ZodString;
    mode: z.ZodEnum<["CAR", "FERRY", "OTHER"]>;
    from: z.ZodString;
    to: z.ZodString;
    departAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    arriveAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    bookingRef: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    updatedAt: Date;
    tripId: string;
    mode: "FERRY" | "CAR" | "OTHER";
    from: string;
    to: string;
    notes?: string | null | undefined;
    bookingRef?: string | null | undefined;
    departAt?: Date | null | undefined;
    arriveAt?: Date | null | undefined;
}, {
    id: string;
    updatedAt: Date;
    tripId: string;
    mode: "FERRY" | "CAR" | "OTHER";
    from: string;
    to: string;
    notes?: string | null | undefined;
    bookingRef?: string | null | undefined;
    departAt?: Date | null | undefined;
    arriveAt?: Date | null | undefined;
}>;
export type TransportLeg = z.infer<typeof TransportLegSchema>;
export declare const CreateTransportLegSchema: z.ZodObject<{
    mode: z.ZodEnum<["CAR", "FERRY", "OTHER"]>;
    from: z.ZodString;
    to: z.ZodString;
    departAt: z.ZodOptional<z.ZodDate>;
    arriveAt: z.ZodOptional<z.ZodDate>;
    bookingRef: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    mode: "FERRY" | "CAR" | "OTHER";
    from: string;
    to: string;
    notes?: string | undefined;
    bookingRef?: string | undefined;
    departAt?: Date | undefined;
    arriveAt?: Date | undefined;
}, {
    mode: "FERRY" | "CAR" | "OTHER";
    from: string;
    to: string;
    notes?: string | undefined;
    bookingRef?: string | undefined;
    departAt?: Date | undefined;
    arriveAt?: Date | undefined;
}>;
export type CreateTransportLeg = z.infer<typeof CreateTransportLegSchema>;
export declare const UpdateTransportLegSchema: z.ZodObject<{
    mode: z.ZodOptional<z.ZodEnum<["CAR", "FERRY", "OTHER"]>>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
    departAt: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    arriveAt: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    bookingRef: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    notes?: string | undefined;
    bookingRef?: string | undefined;
    mode?: "FERRY" | "CAR" | "OTHER" | undefined;
    from?: string | undefined;
    to?: string | undefined;
    departAt?: Date | undefined;
    arriveAt?: Date | undefined;
}, {
    notes?: string | undefined;
    bookingRef?: string | undefined;
    mode?: "FERRY" | "CAR" | "OTHER" | undefined;
    from?: string | undefined;
    to?: string | undefined;
    departAt?: Date | undefined;
    arriveAt?: Date | undefined;
}>;
export type UpdateTransportLeg = z.infer<typeof UpdateTransportLegSchema>;
export declare const TicketSchema: z.ZodObject<{
    id: z.ZodString;
    tripId: z.ZodString;
    transportLegId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    linkedType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    linkedId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    kind: z.ZodEnum<["QR", "BARCODE", "PDF", "IMAGE"]>;
    label: z.ZodString;
    value: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    updatedAt: Date;
    tripId: string;
    kind: "QR" | "BARCODE" | "PDF" | "IMAGE";
    label: string;
    value?: string | null | undefined;
    transportLegId?: string | null | undefined;
    linkedType?: string | null | undefined;
    linkedId?: string | null | undefined;
    fileId?: string | null | undefined;
}, {
    id: string;
    updatedAt: Date;
    tripId: string;
    kind: "QR" | "BARCODE" | "PDF" | "IMAGE";
    label: string;
    value?: string | null | undefined;
    transportLegId?: string | null | undefined;
    linkedType?: string | null | undefined;
    linkedId?: string | null | undefined;
    fileId?: string | null | undefined;
}>;
export type Ticket = z.infer<typeof TicketSchema>;
export declare const CreateTicketSchema: z.ZodObject<{
    transportLegId: z.ZodOptional<z.ZodString>;
    linkedType: z.ZodOptional<z.ZodString>;
    linkedId: z.ZodOptional<z.ZodString>;
    kind: z.ZodEnum<["QR", "BARCODE", "PDF", "IMAGE"]>;
    label: z.ZodString;
    value: z.ZodOptional<z.ZodString>;
    fileId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    kind: "QR" | "BARCODE" | "PDF" | "IMAGE";
    label: string;
    value?: string | undefined;
    transportLegId?: string | undefined;
    linkedType?: string | undefined;
    linkedId?: string | undefined;
    fileId?: string | undefined;
}, {
    kind: "QR" | "BARCODE" | "PDF" | "IMAGE";
    label: string;
    value?: string | undefined;
    transportLegId?: string | undefined;
    linkedType?: string | undefined;
    linkedId?: string | undefined;
    fileId?: string | undefined;
}>;
export type CreateTicket = z.infer<typeof CreateTicketSchema>;
export declare const UpdateTicketSchema: z.ZodObject<{
    transportLegId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    linkedType: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    linkedId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    kind: z.ZodOptional<z.ZodEnum<["QR", "BARCODE", "PDF", "IMAGE"]>>;
    label: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    fileId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    value?: string | undefined;
    transportLegId?: string | undefined;
    linkedType?: string | undefined;
    linkedId?: string | undefined;
    kind?: "QR" | "BARCODE" | "PDF" | "IMAGE" | undefined;
    label?: string | undefined;
    fileId?: string | undefined;
}, {
    value?: string | undefined;
    transportLegId?: string | undefined;
    linkedType?: string | undefined;
    linkedId?: string | undefined;
    kind?: "QR" | "BARCODE" | "PDF" | "IMAGE" | undefined;
    label?: string | undefined;
    fileId?: string | undefined;
}>;
export type UpdateTicket = z.infer<typeof UpdateTicketSchema>;
export declare const TodoSchema: z.ZodObject<{
    id: z.ZodString;
    tripId: z.ZodString;
    text: z.ZodString;
    done: z.ZodBoolean;
    dueDate: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    order: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    tripId: string;
    order: number;
    text: string;
    done: boolean;
    dueDate?: Date | null | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    tripId: string;
    order: number;
    text: string;
    done: boolean;
    dueDate?: Date | null | undefined;
}>;
export type Todo = z.infer<typeof TodoSchema>;
export declare const CreateTodoSchema: z.ZodObject<{
    text: z.ZodString;
    dueDate: z.ZodOptional<z.ZodDate>;
    order: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    text: string;
    order?: number | undefined;
    dueDate?: Date | undefined;
}, {
    text: string;
    order?: number | undefined;
    dueDate?: Date | undefined;
}>;
export type CreateTodo = z.infer<typeof CreateTodoSchema>;
export declare const UpdateTodoSchema: z.ZodObject<{
    text: z.ZodOptional<z.ZodString>;
    done: z.ZodOptional<z.ZodBoolean>;
    dueDate: z.ZodOptional<z.ZodDate>;
    order: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    order?: number | undefined;
    text?: string | undefined;
    done?: boolean | undefined;
    dueDate?: Date | undefined;
}, {
    order?: number | undefined;
    text?: string | undefined;
    done?: boolean | undefined;
    dueDate?: Date | undefined;
}>;
export type UpdateTodo = z.infer<typeof UpdateTodoSchema>;
export declare const ReminderSchema: z.ZodObject<{
    id: z.ZodString;
    tripId: z.ZodString;
    dayId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    text: z.ZodString;
    type: z.ZodEnum<["ALARM", "FUEL", "PACK", "OTHER"]>;
    triggerHint: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type: "OTHER" | "ALARM" | "FUEL" | "PACK";
    id: string;
    tripId: string;
    text: string;
    dayId?: string | null | undefined;
    triggerHint?: string | null | undefined;
}, {
    type: "OTHER" | "ALARM" | "FUEL" | "PACK";
    id: string;
    tripId: string;
    text: string;
    dayId?: string | null | undefined;
    triggerHint?: string | null | undefined;
}>;
export type Reminder = z.infer<typeof ReminderSchema>;
export declare const CreateReminderSchema: z.ZodObject<{
    dayId: z.ZodOptional<z.ZodString>;
    text: z.ZodString;
    type: z.ZodEnum<["ALARM", "FUEL", "PACK", "OTHER"]>;
    triggerHint: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "OTHER" | "ALARM" | "FUEL" | "PACK";
    text: string;
    dayId?: string | undefined;
    triggerHint?: string | undefined;
}, {
    type: "OTHER" | "ALARM" | "FUEL" | "PACK";
    text: string;
    dayId?: string | undefined;
    triggerHint?: string | undefined;
}>;
export type CreateReminder = z.infer<typeof CreateReminderSchema>;
export declare const UpdateReminderSchema: z.ZodObject<{
    dayId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    text: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["ALARM", "FUEL", "PACK", "OTHER"]>>;
    triggerHint: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type?: "OTHER" | "ALARM" | "FUEL" | "PACK" | undefined;
    dayId?: string | undefined;
    text?: string | undefined;
    triggerHint?: string | undefined;
}, {
    type?: "OTHER" | "ALARM" | "FUEL" | "PACK" | undefined;
    dayId?: string | undefined;
    text?: string | undefined;
    triggerHint?: string | undefined;
}>;
export type UpdateReminder = z.infer<typeof UpdateReminderSchema>;
export declare const MediaSchema: z.ZodObject<{
    id: z.ZodString;
    tripId: z.ZodString;
    fileId: z.ZodString;
    caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    linkedType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    linkedId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    tripId: string;
    fileId: string;
    linkedType?: string | null | undefined;
    linkedId?: string | null | undefined;
    caption?: string | null | undefined;
}, {
    id: string;
    createdAt: Date;
    tripId: string;
    fileId: string;
    linkedType?: string | null | undefined;
    linkedId?: string | null | undefined;
    caption?: string | null | undefined;
}>;
export type Media = z.infer<typeof MediaSchema>;
export declare const CreateMediaSchema: z.ZodObject<{
    fileId: z.ZodString;
    caption: z.ZodOptional<z.ZodString>;
    linkedType: z.ZodOptional<z.ZodString>;
    linkedId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    fileId: string;
    linkedType?: string | undefined;
    linkedId?: string | undefined;
    caption?: string | undefined;
}, {
    fileId: string;
    linkedType?: string | undefined;
    linkedId?: string | undefined;
    caption?: string | undefined;
}>;
export type CreateMedia = z.infer<typeof CreateMediaSchema>;
export declare const UpdateMediaSchema: z.ZodObject<{
    fileId: z.ZodOptional<z.ZodString>;
    caption: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    linkedType: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    linkedId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    linkedType?: string | undefined;
    linkedId?: string | undefined;
    fileId?: string | undefined;
    caption?: string | undefined;
}, {
    linkedType?: string | undefined;
    linkedId?: string | undefined;
    fileId?: string | undefined;
    caption?: string | undefined;
}>;
export type UpdateMedia = z.infer<typeof UpdateMediaSchema>;
export declare const FileSchema: z.ZodObject<{
    id: z.ZodString;
    tripId: z.ZodString;
    mimeType: z.ZodString;
    size: z.ZodNumber;
    storageKey: z.ZodString;
    originalName: z.ZodString;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    tripId: string;
    mimeType: string;
    size: number;
    storageKey: string;
    originalName: string;
}, {
    id: string;
    createdAt: Date;
    tripId: string;
    mimeType: string;
    size: number;
    storageKey: string;
    originalName: string;
}>;
export type File = z.infer<typeof FileSchema>;
