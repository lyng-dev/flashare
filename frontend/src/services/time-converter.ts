const convertExpirationChoice = (choice: string): number => {
  if (choice === '5m') return 5
  else if (choice === '30m') return 30
  else if (choice === '1hr') return 60
  else if (choice === '3hr') return 180
  else if (choice === '12hr') return 720
  else if (choice === '1d') return 1440
  else if (choice === '3d') return 4320
  else return 10080
}

const expirationChoices = [
  { Value: '5m', Title: '5 minutes' },
  { Value: '30m', Title: '30 minutes' },
  { Value: '1hr', Title: '1 hour' },
  { Value: '3hr', Title: '3 hours' },
  { Value: '12hr', Title: '12 hours' },
  { Value: '1d', Title: '1 day' },
  { Value: '3d', Title: '3 days' },
  { Value: '7d', Title: '1 week' },
]

export { convertExpirationChoice, expirationChoices } 