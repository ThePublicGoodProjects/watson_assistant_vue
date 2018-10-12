import { mount } from '@vue/test-utils'
import Chat from '@/components/Chat.vue'

describe('Chat.vue', () => {
  it('check that button is rendered', () => {
    const wrapper = mount(Chat, {
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
