const mockEvents = Array.from({ length: 50 }, (_, i) => ({
  id: `event-${i + 1}`,
  title: `Event ${i + 1}`
}))

export async function getEventsPaginated(page, perPage) {
  const start = (page - 1) * perPage
  const end = start + perPage

  const data = mockEvents.slice(start, end)

  return {
    data,
    total: mockEvents.length
  }
}