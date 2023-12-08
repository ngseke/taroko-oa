import { sortContacts } from './sort'

describe('sort', () => {
  test('sortContacts', () => {
    expect(sortContacts([], 'asc')).toMatchObject([])

    const list = [{
      id: 0,
      first_name: 'b',
      last_name: 'z',
      job: 'job',
      description: 'description',
    }, {
      id: 1,
      first_name: 'a',
      last_name: 'z',
      job: 'job',
      description: 'description',
    }, {
      id: 1,
      first_name: 'c',
      last_name: 'z',
      job: 'job',
      description: 'description',
    }, {
      id: 1,
      first_name: 'a',
      last_name: 'a',
      job: 'job',
      description: 'description',
    }]

    const listSortSpy = vi.spyOn(list, 'sort')

    expect(sortContacts(list, 'asc')).toMatchObject([
      { first_name: 'a', last_name: 'a' },
      { first_name: 'a', last_name: 'z' },
      { first_name: 'b', last_name: 'z' },
      { first_name: 'c', last_name: 'z' },
    ])

    expect(sortContacts(list, 'desc')).toMatchObject([
      { first_name: 'c', last_name: 'z' },
      { first_name: 'b', last_name: 'z' },
      { first_name: 'a', last_name: 'z' },
      { first_name: 'a', last_name: 'a' },
    ])

    expect(listSortSpy).not.toBeCalled()
  })
})
