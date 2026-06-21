import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const anna = await prisma.user.upsert({
    where: { username: 'anna' },
    update: {},
    create: { username: 'anna', email: 'anna@example.com', role: 'EDITOR' },
  })
  const bjorn = await prisma.user.upsert({
    where: { username: 'bjorn' },
    update: {},
    create: { username: 'bjorn', email: 'bjorn@example.com', role: 'EDITOR' },
  })
  const carl = await prisma.user.upsert({
    where: { username: 'carl' },
    update: {},
    create: { username: 'carl', email: 'carl@example.com', role: 'VIEWER' },
  })

  console.log(`Users: ${anna.username}, ${bjorn.username}, ${carl.username}`)

  const existing = await prisma.trip.findFirst({ where: { name: 'Sommarsemester 2025' } })
  if (existing) {
    console.log('Example trip already exists, skipping.')
    return
  }

  const trip = await prisma.trip.create({
    data: {
      name: 'Sommarsemester 2025',
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-07-14'),
      description: 'Två veckor på västkusten',
      createdBy: anna.id,
    },
  })

  const day1 = await prisma.day.create({
    data: {
      tripId: trip.id,
      date: new Date('2025-07-01'),
      title: 'Avresedag',
      summary: 'Tidig start – lasta bilen och åk mot Göteborg.',
      notes: 'Kom ihåg badväskorna!',
    },
  })
  const day2 = await prisma.day.create({
    data: {
      tripId: trip.id,
      date: new Date('2025-07-02'),
      title: 'Färjedag till Danska sidan',
      summary: 'Färja kl 10:00 från Göteborg, ankomst Fredrikshavn 13:30.',
    },
  })
  const day3 = await prisma.day.create({
    data: {
      tripId: trip.id,
      date: new Date('2025-07-03'),
      title: 'Vila i stugan',
      summary: 'Ingen planering – bara avkoppling och bad.',
    },
  })

  await prisma.agendaItem.createMany({
    data: [
      {
        tripId: trip.id,
        dayId: day1.id,
        type: 'TRAVEL',
        title: 'Åk hemifrån mot Göteborg',
        startTime: '07:00',
        endTime: '10:30',
        locationAddress: 'Stockholm',
        locationLat: 59.3293,
        locationLng: 18.0686,
        order: 0,
      },
      {
        tripId: trip.id,
        dayId: day1.id,
        type: 'CHECKIN',
        title: 'Incheckning hotell Göteborg',
        startTime: '15:00',
        locationAddress: 'Göteborg, Sverige',
        locationLat: 57.7089,
        locationLng: 11.9746,
        order: 1,
      },
      {
        tripId: trip.id,
        dayId: day1.id,
        type: 'MEAL',
        title: 'Middag på Feskekôrka',
        startTime: '18:30',
        locationAddress: 'Feskekôrka, Göteborg',
        locationLat: 57.7033,
        locationLng: 11.9589,
        order: 2,
      },
      {
        tripId: trip.id,
        dayId: day2.id,
        type: 'FERRY',
        title: 'Färja Göteborg → Fredrikshavn',
        startTime: '10:00',
        endTime: '13:30',
        locationAddress: 'Stena Line, Göteborg',
        locationLat: 57.6973,
        locationLng: 11.9608,
        order: 0,
      },
      {
        tripId: trip.id,
        dayId: day2.id,
        type: 'TRAVEL',
        title: 'Kör till stugan',
        startTime: '14:00',
        endTime: '16:30',
        order: 1,
      },
      {
        tripId: trip.id,
        dayId: day3.id,
        type: 'ACTIVITY',
        title: 'Bad och sol',
        startTime: '10:00',
        order: 0,
      },
    ],
  })

  await prisma.accommodation.create({
    data: {
      tripId: trip.id,
      name: 'Strandnära stuga, Skagen',
      address: 'Skagen, Danmark',
      lat: 57.7269,
      lng: 10.5736,
      checkInAt: new Date('2025-07-02T16:00:00'),
      checkOutAt: new Date('2025-07-14T11:00:00'),
      bookingRef: 'STUGA-2025-042',
      rules: 'Inga husdjur. Sopor sorteras. Städning ingår.',
      notes: 'Nyckel i nyckelskåp, kod: 1234',
    },
  })

  await prisma.transportLeg.create({
    data: {
      tripId: trip.id,
      mode: 'FERRY',
      from: 'Göteborg',
      to: 'Fredrikshavn',
      departAt: new Date('2025-07-02T10:00:00'),
      arriveAt: new Date('2025-07-02T13:30:00'),
      bookingRef: 'STENA-87651',
    },
  })

  await prisma.reminder.createMany({
    data: [
      { tripId: trip.id, dayId: day2.id, text: 'Ställ alarm 06:30', type: 'ALARM', triggerHint: 'Kvällen innan' },
      { tripId: trip.id, dayId: day2.id, text: 'Tanka bilen kvällen innan', type: 'FUEL', triggerHint: 'Kvällen 1 juli' },
      { tripId: trip.id, dayId: day1.id, text: 'Packa badväskor och solkräm', type: 'PACK', triggerHint: 'Morgonen 1 juli' },
    ],
  })

  await prisma.todo.createMany({
    data: [
      { tripId: trip.id, text: 'Boka färjebiljetter', done: true, order: 0 },
      { tripId: trip.id, text: 'Packa solkräm SPF 50', done: false, order: 1 },
      { tripId: trip.id, text: 'Ladda ned offline-kartor', done: false, order: 2 },
      { tripId: trip.id, text: 'Köpa euro', done: false, order: 3 },
    ],
  })

  console.log('Seed complete!')
  console.log('Trip ID:', trip.id)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
