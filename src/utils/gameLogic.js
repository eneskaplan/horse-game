const COLORS = [
  'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Cyan',
  'Brown', 'Black', 'White', 'Grey', 'Magenta', 'Lime', 'Navy', 'Teal',
  'Maroon', 'Olive', 'Silver', 'Gold'
]

export function generateHorses(count = 20) {
  const horses = []
  const usedColors = new Set()
  
  for (let i = 0; i < count; i++) {
    let color
    let attempts = 0
    do {
      color = COLORS[i % COLORS.length]
      attempts++
    } while (usedColors.has(color) && attempts < 100)
    
    if (usedColors.has(color)) {
      // Fallback: use color with index
      color = `Color${i + 1}`
    }
    usedColors.add(color)
    
    const condition = Math.floor(Math.random() * 100) + 1
    
    const name = `Horse ${i + 1}`
    
    horses.push({
      id: i + 1,
      name,
      color,
      condition
    })
  }
  
  return horses
}

export function generateRaceSchedule(horses, distances) {
  if (horses.length < 10) {
    throw new Error('Need at least 10 horses to generate schedule')
  }
  
  const schedule = []
  
  for (let i = 0; i < 6; i++) {
    const shuffled = [...horses].sort(() => Math.random() - 0.5)
    const selectedHorses = shuffled.slice(0, 10)
    
    schedule.push({
      round: i + 1,
      distance: distances[i],
      horses: selectedHorses
    })
  }
  
  return schedule
}

export function calculateRaceResult(horses, distance) {
  const results = horses.map(horse => {
    const baseSpeed = 0.1;
    const randomValue = 0.80 + Math.random() * 0.1;
    const horseSpeed = baseSpeed * (horse.condition / 10) * randomValue;
    const baseTime = distance / horseSpeed
    
    return {
      ...horse,
      time: baseTime
    }
  })

  results.sort((a, b) => a.time - b.time)
  
  return results.map((result, index) => ({
    ...result,
    position: index + 1
  }))
}

