import { shallowMount } from '@vue/test-utils'
import Search from '@/components/Search.vue'

describe('Search.vue', () => {
  it('initializes with empty query', () => {
    const wrapper = shallowMount(Search)
    const value = wrapper.find('[data-search]').value

    expect(wrapper.vm.query).toBe('')
    expect(value).toBe(undefined)
  })

  it('calls search when the value is updated', () => {
    const search = jest.fn()
    const wrapper = shallowMount(Search, {
      methods: { search }
    })

    wrapper.find('[data-search]').setValue('kittens')
    wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.vm.searchQuery).toBe('kittens')
    expect(search.mock.calls.length).toBe(1)
  })

  it('shows error when the value is empty', () => {
    const wrapper = shallowMount(Search)

    wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.find('.error-msg').isVisible()).toBeTruthy()
    expect(wrapper.vm.error).not.toBe('')
  })

  it('calls search after sanitizing the value', () => {
    const wrapper = shallowMount(Search)

    wrapper.find('[data-search]').setValue('ki<script> alert("") </script>ttens')
    wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.vm.searchQuery).toBe('ki%3Cscript%3E%20alert(%22%22)%20%3C%2Fscript%3Ettens')
  })

  it('returns true when the query is valid', () => {
    const expectedQuery = 'kittens'
    const wrapper = shallowMount(Search)

    wrapper.find('[data-search]').setValue(expectedQuery)

    expect(wrapper.vm.validateQuery()).toBeTruthy()
    expect(wrapper.vm.searchQuery).toBe(expectedQuery)
  })

  it('returns true and sanitize when the query is valid', () => {
    const actualQuery = '/some valid - query/'
    const expectedQuery = '%2Fsome%20valid%20-%20query%2F'
    const wrapper = shallowMount(Search)

    wrapper.find('[data-search]').setValue(actualQuery)

    expect(wrapper.vm.validateQuery()).toBeTruthy()
    expect(wrapper.vm.searchQuery).toBe(expectedQuery)
  })

  it('returns false when the query is empty', () => {
    const wrapper = shallowMount(Search)

    expect(wrapper.vm.validateQuery()).toBeFalsy()
    expect(wrapper.vm.searchQuery).toBe('')
  })

  it('returns false when the query is null', () => {
    const wrapper = shallowMount(Search)

    wrapper.vm.searchQuery = null

    expect(wrapper.vm.validateQuery()).toBeFalsy()
    expect(wrapper.vm.searchQuery).toBeNull()
  })

  it('returns false when the query is undefined', () => {
    const wrapper = shallowMount(Search)

    wrapper.vm.searchQuery = undefined

    expect(wrapper.vm.validateQuery()).toBeFalsy()
    expect(wrapper.vm.searchQuery).toBeUndefined()
  })
})
