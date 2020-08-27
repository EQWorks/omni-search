const searchIndexLevelMap = {
  'White Labels': 'wl',
  Customers: 'cu',
  Campaigns: 'offer',
  Flights: 'flight',
  'Media Buys': 'mb',
}

const searchIndexLevelToRouteMap = {
  wl: 'whitelabel',
  cu: 'customer',
  offer: 'campaign',
  flight: 'campaign',
  mb: 'campaign',
}

export { searchIndexLevelMap, searchIndexLevelToRouteMap }
