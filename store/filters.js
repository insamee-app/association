export const state = () => ({
  pagination: {
    profiles: {
      limit: 6,
      page: 1,
    },
    associations: {
      limit: 10,
      page: 1,
    },
  },
  filters: {
    associations: {
      name: '',
      thematics: '[]',
      tags: '[]',
      schools: '[]',
    },
  },
})

export const mutations = {
  setPagination(state, { pagination, name, value }) {
    // Avoid unwanted value from url
    if (Object.keys(state.pagination[pagination]).includes(name))
      state.pagination[pagination][name] = value
  },
  setFilters(state, { filter, name, value }) {
    // Avoid unwanted value from url
    if (Object.keys(state.filters[filter]).includes(name)) {
      if (typeof value !== 'string')
        state.filters[filter][name] = JSON.stringify(value)
      else state.filters[filter][name] = value
    }
  },
  resetFilters(state) {
    state.filters.associations = {
      name: '',
      thematics: '[]',
      tags: '[]',
      schools: '[]',
    }
  },
}

export const getters = {
  getProfilesSearchParams({ pagination: { profiles } }) {
    const data = {}
    for (const property in profiles) {
      if (profiles[property]) data[property] = profiles[property]
    }
    const searchParams = new URLSearchParams(data)
    return searchParams.toString()
  },
  getAssociationsSearchParams({
    pagination: { associations: associationsPagination },
    filters: { associations: associationsFilters },
  }) {
    const data = {}
    for (const property in associationsPagination) {
      const value = associationsPagination[property]
      if (value) data[property] = value
    }
    for (const property in associationsFilters) {
      const value = associationsFilters[property]
      if (property === 'name' && value) data[property] = value
      else if (value.length > 2) data[property] = value
    }
    const searchParams = new URLSearchParams(data)
    return searchParams.toString()
  },
  name({ filters: { associations } }) {
    return associations.name
  },
  thematics({ filters: { associations } }) {
    return JSON.parse(associations.thematics)
  },
  tags({ filters: { associations } }) {
    return JSON.parse(associations.tags)
  },
  schools({ filters: { associations } }) {
    return JSON.parse(associations.schools)
  },
}
