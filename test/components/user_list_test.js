import React from "react"
import { shallow } from "enzyme"

import { UserList } from "../../web/static/js/components/user_list"
import UserListItem from "../../web/static/js/components/user_list_item"

describe("passed an array of users", () => {
  const presences = [{
    given_name: "treezy",
    is_facilitator: false,
    id: 5,
    online_at: 803,
    picture: "http://herpderp.com",
    token: "requiredAsUniqueKey",
  }, {
    given_name: "zander",
    is_facilitator: false,
    id: 6,
    online_at: 801,
    picture: "http://herpderp.com",
    token: "requiredAsADifferentUniqueKey",
  }, {
    given_name: "sarah",
    is_facilitator: true,
    id: 8,
    online_at: 1100,
    picture: "http://herpderp.com",
    token: "nekdles3",
  }]

  it("is renders a list item for each user presence", () => {
    const wrapper = shallow(<UserList presences={presences} />)
    expect(wrapper.find(UserListItem)).to.have.length(3)
  })

  it("sorts the presences such that the facilitator is first, followed by users by arrival ascending", () => {
    const wrapper = mountWithConnectedSubcomponents(
      <UserList presences={presences} />
    )
    expect(wrapper.text()).to.match(/sarah.*zander.*treezy/i)
  })

  describe("when none of the users passed is a facilitator", () => {
    const nonFacilitatorPresences = presences.map(presence => ({ ...presence, is_facilitator: false }))

    it("sorts the users solely by their arrival ascending ", () => {
      const wrapper = mountWithConnectedSubcomponents(
        <UserList presences={nonFacilitatorPresences} />
      )

      expect(wrapper.find(UserListItem)).to.have.length(3)
      expect(wrapper.html()).to.match(/zander.*treezy.*sarah/i)
    })
  })

  describe("when the presences list is empty", () => {
    it("executes a null render", () => {
      const wrapper = shallow(<UserList presences={[]} />)
      expect(wrapper.html()).to.equal(null)
    })
  })
})
